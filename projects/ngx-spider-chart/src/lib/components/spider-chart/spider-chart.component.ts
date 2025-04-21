import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { SharedModule } from 'nextsapien-component-lib';
import { AlertStatusFields } from '../../enums/alert-status-fields.enum';
import { ICircleData } from '../../interfaces/chart-data-circle.interface';
import { IDefsF } from '../../interfaces/chart-data-defs-f.interface';
import { IDefsLG } from '../../interfaces/chart-data-defs-lg.interface';
import { IDefsRG } from '../../interfaces/chart-data-defs-rg.interface';
import { ISpiderChartConfig } from '../../interfaces/config.interface';
import { IDataset } from '../../interfaces/dataset.interface';
import { IPolygonColor } from '../../interfaces/polygon-color.interface';
import { ISpiderChartAttribute } from '../../interfaces/spider-chart-attribute.interface';
import { circleData, defsF, defsLG, defsRG } from '../../lookup/svg-config.lookup';
import { InitialsPipe } from '../../pipes/initials/initials.pipe';
import { PipeModule } from '../../pipes/pipe.module';

@Component({
  selector: 'lib-spider-chart',
  templateUrl: './spider-chart.component.html',
  styleUrl: './spider-chart.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, PipeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpiderChartComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('D3Chart') d3Chart: ElementRef;
  @Input() datasets: IDataset[] = [];
  @Input() config: ISpiderChartConfig;
  @Input() polygon_colors: IPolygonColor[] = [];
  @Input() showChartInfo: boolean = true;

  public alertStatusFields = AlertStatusFields;
  public titleAlertPopup = '';
  public descriptionAlertPopup = '';
  public isAlertPopupClosing = false;
  public timeStateAlertPopup = 0;
  public numberAlertPopup: number;

  public svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>;
  public defsRG: IDefsRG[] = [];
  public defsF: IDefsF[] = [];
  public defsLG: IDefsLG[] = [];
  public circleData: ICircleData[] = [];
  public readonly initialsPipe: InitialsPipe = inject(InitialsPipe);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['datasets'] || changes['config']) && this.svg) {
      if (this.datasets.length && this.config) {
        this.createRadarChart();
      } else if (changes['config'].currentValue['fullScreen'] !== changes['config'].previousValue['fullScreen']) {
        this.createRadarChart();
      }
    }
  }

  ngAfterViewInit(): void {
    this.defsRG = defsRG;
    this.defsF = defsF;
    this.defsLG = defsLG;
    this.circleData = circleData;
    this.initializeChart();
  }

  ngOnDestroy(): void {
    if (this.svg) {
      this.svg.remove();
      this.svg = null;
    }
  }

  public onClosedAlert(data: { event: boolean; field: AlertStatusFields }): void {
    // TODO: Implement this
  }

  private initializeChart(): void {
    this.svg = this.createSvgObject();
    const defsGroup = this.svg.append('g');

    this.defsLG.forEach((defData) => {
      this.createDefsAndLinearGradient(defsGroup, defData);
    });

    this.defsF.forEach((defData) => {
      this.createDefsAndFilter(defsGroup, defData);
    });

    this.defsRG.forEach((defData) => {
      this.createDefsAndRadialGradient(defsGroup, defData);
    });

    const circleGroup = this.svg.append('g');
    this.createCircle(circleGroup, this.circleData);
    if (!this.config) return;
    this.createRadarChart();
  }

  private createSvgObject(): d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown> {
    return d3.select(this.d3Chart?.nativeElement).append('svg').attr('class', 'svg').attr('height', 300).attr('width', 300);
  }

  private createLine(
    group: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
    data: ISpiderChartAttribute[],
    MaxValue: number,
    angleSlice: number,
    rScale: d3.ScaleLinear<number, number>,
  ): void {
    group.selectAll('line').remove();
    return group
      .selectAll('line')
      .data(data)
      .enter()
      .append('g')
      .append('line')
      .attr('class', 'line')
      .attr('class', 'line-group')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (_d, i) => rScale(MaxValue * 1.4) * Math.cos(angleSlice * i + 0.01 - Math.PI / 2))
      .attr('y2', (_d, i) => rScale(MaxValue * 1.4) * Math.sin(angleSlice * i + 0.01 - Math.PI / 2))
      .attr('stroke', 'url(#needleRadiant)')
      .attr('transform', 'translate(150,150)');
  }

  private createCircle(group: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>, data: ICircleData[]): void {
    data?.forEach((datum) => {
      const g = group.append('circle');
      Object.keys(datum).forEach((key) => {
        g.attr(key, datum[key]);
      });
    });
    return group;
  }

  private createText(
    group: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
    data: ISpiderChartAttribute[],
    rScale: d3.ScaleLinear<number, number>,
    MaxValue: number,
    angleSlice: number,
  ) {
    const toolTip = d3.select('#tooltip');
    group.selectAll('text').remove();

    const isFullScreenActive: boolean = this.config.fullScreen;

    // TODO left based on position of modal
    const left = isFullScreenActive ? 0 : 0;
    const top = isFullScreenActive ? -80 : -220;
    return group
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => this.initialsPipe.transform(d.text))
      .attr('x', (_d, i) => {
        const x2 = rScale(MaxValue * 1.2) * Math.cos(angleSlice * i + 0.1 - Math.PI / 2);
        return x2;
      })
      .attr('y', (_d, i) => {
        const y2 = rScale(MaxValue * 1.2) * Math.sin(angleSlice * i + 0.1 - Math.PI / 2);
        return y2;
      })
      .attr('dy', '0.35em')
      .attr('transform', 'translate(150,150)')
      .style('fill', '#FE3C72')
      .style('text-shadow', '1px 2px 1px #000')
      .attr('class', 'line-label')
      .on('pointerdown', (event, d: ISpiderChartAttribute) => {
        const { titleAlertPopup, descriptionAlertPopup } = d;
        this.titleAlertPopup = titleAlertPopup;
        this.descriptionAlertPopup = descriptionAlertPopup;
        this.isAlertPopupClosing = false;
        this.timeStateAlertPopup = new Date().getTime();
        this.numberAlertPopup = Math.floor(Math.random() * 10);
        this.cdr.detectChanges();
        toolTip
          .style('display', 'block')
          .style('left', event.pageX + left + 'px')
          .style('top', event.pageY + top < 0 ? 0 : event.pageY + top + 'px');
      })
      .on('pointerup', (event, d: ISpiderChartAttribute) => {});
  }

  private createPolygons(group: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>, datasets: IDataset[], rScale: d3.ScaleLinear<number, number>, angleSlice: number): void {
    group.selectAll('polygon').remove();
    group.selectAll('.radarCircle').remove();

    const polygonPoints = (data) => {
      const points = data?.keys?.map((key, i) => {
        const r = rScale(data?.values[key] * 1);
        const x = r * Math.cos(angleSlice * i + 0.01 - Math.PI / 2);
        const y = r * Math.sin(angleSlice * i + 0.01 - Math.PI / 2);
        return `${x},${y}`;
      });
      return points.join(' ');
    };
    group
      .selectAll('polygon')
      .data(datasets)
      .enter()
      .append('polygon')
      .attr('points', (d) => polygonPoints(d))
      .attr('stroke', (_, i) => _.polygon_color?.value)
      .attr('transform', 'translate(150,150)')

      .attr('fill', (_, i) => `url(${this.polygon_colors?.[i].label})`);
    datasets.forEach((data, j) => {
      const allValuesAreZero = data.keys.every((key) => data.values[key] === 0);
      if (!allValuesAreZero) {
        group
          .append('g')
          .selectAll('circle')
          .data(data.keys)
          .enter()
          .append('circle')
          .attr('class', 'radarCircle')
          .attr('r', 3)
          .attr('cx', (key, i) => rScale(data.values[key]) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('cy', (key, i) => rScale(data.values[key]) * Math.sin(angleSlice * i - Math.PI / 2))
          .style('fill', 'white')
          .style('stroke', () => this.polygon_colors?.[j]?.value) // Using stroke colors from the strokeColors array
          .attr('transform', 'translate(150,150)')
          .attr('filter', 'blur(1px)')
          .style('stroke-width', 2)
          .style('fill-opacity', 0.8);
      }
    });
  }

  private createDefsAndLinearGradient(group: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>, data: IDefsLG): void {
    const defs = group.append('defs').append('linearGradient').attr('id', data.id).attr('x1', data.x1).attr('y1', data.y1).attr('x2', data.x2).attr('y2', data.y2);

    data.stopTags.forEach((elem) => {
      defs.append('stop').attr('offset', elem.offset).attr('style', elem.style);
    });
  }

  private createDefsAndFilter(group: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>, data: IDefsF): void {
    const defs = group.append('defs').append('filter').attr('id', data.id).attr('x', data.x).attr('y', data.y).attr('height', data.height).attr('width', data.width);

    data.feGaussianTags.forEach((elem) => {
      defs.append('feGaussianBlur').attr('in', elem.in).attr('stdDeviation', elem.stdDeviation);
    });
  }

  private createDefsAndRadialGradient(group: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>, data: IDefsRG): void {
    const defs = group.append('defs').append('radialGradient').attr('id', data.id).attr('cx', data.cy).attr('cy', data.cx).attr('r', data.r);

    data.stopTags.forEach((elem) => {
      defs.append('stop').attr('offset', elem.offset).attr('style', elem.style);
    });
  }

  private createRadarChart(): void {
    const { maxValue, datasets, attributes } = this.config;
    const allAxis = [...new Set(attributes)].map((i) => i);
    const total = allAxis.length;
    const angleSlice = (Math.PI * 2) / total;
    let MaxValue =
      datasets.length > 0
        ? Math.max(
            ...datasets.reduce((a, i) => {
              return [...a, ...Object.values(i.values)];
            }, []),
          )
        : maxValue;
    MaxValue = MaxValue > 0 ? MaxValue : 25;

    const rScale = d3.scaleLinear().range([0, 100]).domain([0, MaxValue]);

    this.createLine(this.svg, allAxis, MaxValue, angleSlice, rScale);
    this.createText(this.svg, allAxis, rScale, MaxValue, angleSlice);
    this.createPolygons(this.svg, datasets, rScale, angleSlice);
  }
}
