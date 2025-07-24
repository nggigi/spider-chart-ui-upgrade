import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SpiderChartComponent, ISpiderChartConfig, IDataset, ISpiderChartAttribute, IPolygonColor, defaultSpiderConfig, demoPolygonColors } from 'ngx-spider-chart';
import { HighlightCodeModule } from '../../highlight.code.module';

@Component({
  selector: 'app-spider-chart-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpiderChartComponent, HighlightCodeModule],
  templateUrl: './spider-chart-demo.component.html',
  styleUrls: ['./spider-chart-demo.component.scss'],
})
export class SpiderChartDemoComponent implements OnInit {
  public datasets: IDataset[] = [];
  public config: ISpiderChartConfig = defaultSpiderConfig;
  public polygon_colors: IPolygonColor[] = demoPolygonColors;
  public showChartInfo: boolean = true;

  // Form controls for demo
  public newDatasetControl = new FormControl('');
  public configOptionsControl = new FormControl('');

  // Demo attributes for the spider chart - 8 options as shown in the reference
  public attributes: ISpiderChartAttribute[] = [
    { key: 'option1', text: 'OPTION 1', titleAlertPopup: 'Option 1', descriptionAlertPopup: 'First attribute measurement' },
    { key: 'option2', text: 'OPTION 2', titleAlertPopup: 'Option 2', descriptionAlertPopup: 'Second attribute measurement' },
    { key: 'option3', text: 'OPTION 3', titleAlertPopup: 'Option 3', descriptionAlertPopup: 'Third attribute measurement' },
    { key: 'option4', text: 'OPTION 4', titleAlertPopup: 'Option 4', descriptionAlertPopup: 'Fourth attribute measurement' },
    { key: 'option5', text: 'OPTION 5', titleAlertPopup: 'Option 5', descriptionAlertPopup: 'Fifth attribute measurement' },
    { key: 'option6', text: 'OPTION 6', titleAlertPopup: 'Option 6', descriptionAlertPopup: 'Sixth attribute measurement' },
    { key: 'option7', text: 'OPTION 7', titleAlertPopup: 'Option 7', descriptionAlertPopup: 'Seventh attribute measurement' },
    { key: 'option8', text: 'OPTION 8', titleAlertPopup: 'Option 8', descriptionAlertPopup: 'Eighth attribute measurement' },
  ];

  // Code examples for display
  public htmlExample = `<lib-spider-chart
  [datasets]="datasets"
  [config]="config"
  [polygon_colors]="polygon_colors"
  [showChartInfo]="showChartInfo">
</lib-spider-chart>`;

  public tsExample = `import { SpiderChartComponent, ISpiderChartConfig, IDataset, IPolygonColor } from 'ngx-spider-chart';

export class MyComponent {
  datasets: IDataset[] = [
    {
      label: 'Character 1',
      keys: ['power', 'speed', 'agility', 'intelligence', 'strength', 'defense'],
      values: { power: 8, speed: 9, agility: 7, intelligence: 6, strength: 8, defense: 7 },
      polygon_color: { value: '#FF6B9D', label: '#character1Gradient' }
    }
  ];

  config: ISpiderChartConfig = {
    w: 300,
    h: 300,
    maxValue: 10,
    levels: 5,
    fullScreen: false,
    attributes: [
      { key: 'power', text: 'Power' },
      { key: 'speed', text: 'Speed' },
      // ... more attributes
    ]
  };
}`;

  ngOnInit() {
    this.initializeDefaultData();
    this.setupConfig();
  }

  private initializeDefaultData() {
    // Create sample datasets with 8 attributes matching the reference image
    this.datasets = [
      {
        title: 'Dataset 1',
        label: 'Dataset 1',
        keys: ['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7', 'option8'],
        values: {
          option1: 8,
          option2: 6,
          option3: 9,
          option4: 4,
          option5: 7,
          option6: 5,
          option7: 8,
          option8: 6,
        },
        polygon_color: { value: '#FF6B9D', label: 'url(#firstGraphColor)' },
      },
      {
        title: 'Dataset 2',
        label: 'Dataset 2',
        keys: ['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7', 'option8'],
        values: {
          option1: 6,
          option2: 8,
          option3: 5,
          option4: 9,
          option5: 4,
          option6: 7,
          option7: 6,
          option8: 8,
        },
        polygon_color: { value: '#4ECDC4', label: 'url(#secondGraphColor)' },
      },
      {
        title: 'Dataset 3',
        label: 'Dataset 3',
        keys: ['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7', 'option8'],
        values: {
          option1: 7,
          option2: 5,
          option3: 8,
          option4: 6,
          option5: 9,
          option6: 4,
          option7: 7,
          option8: 5,
        },
        polygon_color: { value: '#FFD700', label: 'url(#thirdGraphColor)' },
      },
    ];
  }

  private setupConfig() {
    this.config = {
      w: 300,
      h: 300,
      maxValue: 10,
      levels: 5,
      fullScreen: false,
      attributes: this.attributes,
      datasets: this.datasets,
    };
  }

  // Demo interaction methods
  public addDataset() {
    const value = this.newDatasetControl.value;
    if (value) {
      try {
        const newDataset = JSON.parse(value);
        if (this.isValidDataset(newDataset)) {
          this.datasets.push(newDataset);
          this.updateConfig();
          this.newDatasetControl.reset();
        }
      } catch (e) {
        alert('Invalid JSON format for dataset');
      }
    }
  }

  public removeDataset(index: number) {
    this.datasets.splice(index, 1);
    this.updateConfig();
  }

  public toggleFullScreen() {
    this.config = {
      ...this.config,
      fullScreen: !this.config.fullScreen,
      w: this.config.fullScreen ? 400 : 600,
      h: this.config.fullScreen ? 400 : 600,
    };
  }

  public toggleChartInfo() {
    this.showChartInfo = !this.showChartInfo;
  }

  private updateConfig() {
    this.config = {
      ...this.config,
      datasets: this.datasets,
    };
  }

  private isValidDataset(dataset: any): boolean {
    return dataset && dataset.label && dataset.keys && Array.isArray(dataset.keys) && dataset.values && typeof dataset.values === 'object';
  }

  public resetToDefault() {
    this.initializeDefaultData();
    this.setupConfig();
  }

  // Preset data for quick testing
  public loadPreset(presetName: string) {
    switch (presetName) {
      case 'heroes':
        this.initializeDefaultData();
        break;
      case 'single':
        this.datasets = [
          {
            label: 'Solo Character',
            keys: ['power', 'speed', 'agility', 'intelligence', 'strength', 'defense'],
            values: {
              power: 9,
              speed: 8,
              agility: 8,
              intelligence: 7,
              strength: 9,
              defense: 6,
            },
            polygon_color: { value: '#FF9500', label: '#soloGradient' },
          },
        ];
        break;
      case 'team':
        this.datasets = [
          {
            label: 'Tank',
            keys: ['power', 'speed', 'agility', 'intelligence', 'strength', 'defense'],
            values: { power: 7, speed: 4, agility: 5, intelligence: 6, strength: 9, defense: 10 },
            polygon_color: { value: '#FF6B9D', label: '#tankGradient' },
          },
          {
            label: 'DPS',
            keys: ['power', 'speed', 'agility', 'intelligence', 'strength', 'defense'],
            values: { power: 10, speed: 8, agility: 9, intelligence: 7, strength: 6, defense: 4 },
            polygon_color: { value: '#4ECDC4', label: '#dpsGradient' },
          },
          {
            label: 'Support',
            keys: ['power', 'speed', 'agility', 'intelligence', 'strength', 'defense'],
            values: { power: 5, speed: 6, agility: 7, intelligence: 10, strength: 4, defense: 8 },
            polygon_color: { value: '#45B7D1', label: '#supportGradient' },
          },
        ];
        break;
    }
    this.updateConfig();
  }
}
