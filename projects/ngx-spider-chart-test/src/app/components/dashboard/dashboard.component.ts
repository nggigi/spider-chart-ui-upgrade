import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ControlsPanelComponent } from '../controls-panel/controls-panel.component';

export interface DataPoint {
  x: number;
  y: number;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlsPanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  radialLines = new Array(12);
  concentricCircles = new Array(5);

  private presetData: Map<string, number[][]> = new Map([
    [
      '20/20',
      [
        [9, 8, 9, 7, 8, 9, 8, 7, 9, 8, 9, 8],
        [8, 7, 8, 9, 7, 8, 9, 9, 8, 7, 8, 9],
      ],
    ],
    [
      '30/40',
      [
        [3, 4, 5, 2, 6, 4, 5, 3, 7, 5, 4, 6],
        [4, 5, 3, 6, 2, 5, 3, 4, 6, 4, 5, 3],
        [5, 2, 6, 3, 7, 4, 6, 2, 5, 3, 6, 4],
      ],
    ],
    ['5/5', [[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]]],
    ['3/3', [[3, 3, 3]]],
  ]);

  // Dynamic data
  datasets: number[][] = [];
  newDatasetControl = new FormControl('');
  hudDataPoints: DataPoint[] = [];
  barChartData: number[] = [];
  statsData: { label: string; value: number }[] = [];
  progressData: { label: string; value: number }[] = [];

  // Data for all widgets, with initial empty/default states
  lineChartPath: string = 'M0 50 L100 50';
  areaChartPath: string = 'M0 50 L100 50 L0 50 Z';
  scatterPlotPoints: { x: number; y: number }[] = [];
  radarChartPath: string = 'M50,50';
  reticlePosition: { x: number; y: number } = { x: 50, y: 50 };
  lineChartLabel: string | number = 'N/A';
  radialChartLabel: string | number = 'N/A';
  dataMedian: string | number = 'N/A';
  systemStatus = { sets: 0, length: 0 };
  anomalyData: string | number = 'N/A';

  // UI State
  isPanelOpen = false;
  showCoreElements = true;
  showLabels = true;
  showWidgets = true;
  showBackground = true;
  showStarfield = true;
  showNebula = true;
  showParticles = true;

  constructor() {
    // Initialize with empty states
    this.updateDynamicWidgets();
  }

  addDataset() {
    const value = this.newDatasetControl.value;
    if (value && /^[0-9]+$/.test(value)) {
      const newSet = value.split('').map(Number);
      this.datasets.push(newSet);
      this.newDatasetControl.reset();
      this.updateDynamicWidgets();
    }
  }

  updateDynamicWidgets() {
    this.updateHudPoints();
    this.updateBarCharts();
    this.updateStats();
    this.updateProgressBars();
    this.updateLineAndAreaCharts();
    this.updateScatterPlot();
    this.updateRadarAndReticle();
    this.updateCreativeWidgets();
  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  // --- CONTROL PANEL EVENT HANDLERS ---

  onDatasetAdded(newDatasetStr: string) {
    try {
      const newArr = JSON.parse(newDatasetStr);
      if (Array.isArray(newArr) && newArr.every((item) => typeof item === 'number')) {
        this.datasets.push(newArr);
        this.updateDynamicWidgets();
      } else {
        alert('Invalid data format in dataset string.');
      }
    } catch (e) {
      alert(`Error parsing dataset string: ${e}`);
    }
  }

  onPresetClicked(preset: string) {
    if (this.presetData.has(preset)) {
      // Deep copy to avoid issues with shared references if we modify datasets later
      this.datasets = JSON.parse(JSON.stringify(this.presetData.get(preset)!));
      this.updateDynamicWidgets();
    }
  }

  onCoreElementsToggled(visible: boolean) {
    this.showCoreElements = visible;
  }

  onLabelsToggled(visible: boolean) {
    this.showLabels = visible;
  }

  onWidgetsToggled(visible: boolean) {
    this.showWidgets = visible;
  }

  onBackgroundToggled(visible: boolean) {
    this.showBackground = visible;
  }

  onStarfieldToggled(visible: boolean) {
    this.showStarfield = visible;
  }

  onNebulaToggled(visible: boolean) {
    this.showNebula = visible;
  }

  onParticlesToggled(visible: boolean) {
    this.showParticles = visible;
  }

  onEnableAllClicked() {
    this.showCoreElements = true;
    this.showLabels = true;
    this.showWidgets = true;
    this.showBackground = true;
    this.showStarfield = true;
    this.showNebula = true;
    this.showParticles = true;
  }

  onDisableAllClicked() {
    this.showCoreElements = false;
    this.showLabels = false;
    this.showWidgets = false;
    this.showBackground = false;
    this.showStarfield = false;
    this.showNebula = false;
    this.showParticles = false;
  }

  // --- WIDGET DATA UPDATE LOGIC ---

  updateHudPoints() {
    this.hudDataPoints = [];
    if (this.datasets.length === 0) return;

    const maxRadius = 45;
    const angleStep = 360 / 12;

    this.datasets.forEach((dataset) => {
      dataset.forEach((value, index) => {
        if (index < 12) {
          const radius = (value / 9) * maxRadius;
          const angle = index * angleStep;
          const angleRad = (angle - 90) * (Math.PI / 180);
          const x = 50 + radius * Math.cos(angleRad);
          const y = 50 + radius * Math.sin(angleRad);
          this.hudDataPoints.push({ x, y, value });
        }
      });
    });
  }

  updateBarCharts() {
    if (this.datasets.length === 0) {
      this.barChartData = Array(7).fill(0);
      return;
    }
    const lastSet = this.datasets[this.datasets.length - 1];
    this.barChartData = lastSet.slice(0, 7).map((v) => (v / 9) * 100);
    while (this.barChartData.length < 7) {
      this.barChartData.push(0);
    }
  }

  updateStats() {
    if (this.datasets.length === 0) {
      this.statsData = [
        { label: 'SUM', value: 0 },
        { label: 'AVG', value: 0 },
        { label: 'MIN', value: 0 },
        { label: 'MAX', value: 0 },
      ];
      return;
    }
    const lastSet = this.datasets[this.datasets.length - 1];
    const sum = lastSet.reduce((a, b) => a + b, 0);
    const avg = lastSet.length > 0 ? Math.round(sum / lastSet.length) : 0;
    const min = lastSet.length > 0 ? Math.min(...lastSet) : 0;
    const max = lastSet.length > 0 ? Math.max(...lastSet) : 0;
    this.statsData = [
      { label: 'SUM', value: sum },
      { label: 'AVG', value: avg },
      { label: 'MIN', value: min },
      { label: 'MAX', value: max },
    ];
  }

  updateProgressBars() {
    if (this.datasets.length === 0) {
      this.progressData = [
        { label: 'QUEET', value: 0 },
        { label: 'ENEANCIE', value: 0 },
        { label: 'SUPERCZS', value: 0 },
        { label: 'COHERENCE', value: 0 },
      ];
      return;
    }
    const lastSet = this.datasets[this.datasets.length - 1];
    this.progressData = [
      { label: 'QUEET', value: (lastSet[0] || 0) * 11 },
      { label: 'ENEANCIE', value: (lastSet[1] || 0) * 11 },
      { label: 'SUPERCZS', value: (lastSet[2] || 0) * 11 },
      { label: 'COHERENCE', value: (lastSet[3] || 0) * 11 },
    ];
  }

  updateLineAndAreaCharts() {
    if (this.datasets.length === 0) {
      this.lineChartPath = 'M0 50 L100 50';
      this.areaChartPath = 'M0 50 L100 50 L0 50 Z';
      this.lineChartLabel = 'N/A';
      return;
    }
    const data = this.datasets[this.datasets.length - 1];
    const points = data.slice(0, 10).map((p, i) => ({ x: i * 11, y: 50 - (p / 9) * 40 }));
    this.lineChartPath = points.map((p, i) => (i === 0 ? 'M' : 'L') + `${p.x} ${p.y}`).join(' ');
    this.areaChartPath = this.lineChartPath + ' L100 50 L0 50 Z';
    this.lineChartLabel = data[data.length - 1] || 0;
  }

  updateScatterPlot() {
    if (this.datasets.length === 0) {
      this.scatterPlotPoints = [];
      return;
    }
    const data = this.datasets[this.datasets.length - 1];
    this.scatterPlotPoints = [];
    for (let i = 0; i < data.length - 1; i += 2) {
      this.scatterPlotPoints.push({ x: (data[i] / 9) * 100, y: (data[i + 1] / 9) * 100 });
    }
  }

  updateRadarAndReticle() {
    if (this.datasets.length === 0) {
      this.radarChartPath = 'M50,50';
      this.reticlePosition = { x: 50, y: 50 };
      this.radialChartLabel = 'N/A';
      return;
    }
    const data = this.datasets[this.datasets.length - 1];
    const radarPoints = data.slice(0, 6).map((p, i) => {
      const angle = (i * 60 - 90) * (Math.PI / 180);
      const radius = (p / 9) * 45;
      return `${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`;
    });
    this.radarChartPath = 'M' + radarPoints.join('L') + 'Z';
    this.reticlePosition = { x: ((data[0] || 0) / 9) * 100, y: ((data[1] || 0) / 9) * 100 };
    this.radialChartLabel = data.reduce((sum, a) => sum + a, 0) % 100;
  }

  updateCreativeWidgets() {
    if (this.datasets.length === 0) {
      this.dataMedian = 'N/A';
      this.systemStatus = { sets: 0, length: 0 };
      this.anomalyData = 'N/A';
      return;
    }
    const lastSet = this.datasets[this.datasets.length - 1];
    this.systemStatus = { sets: this.datasets.length, length: lastSet.length };
    const sorted = [...lastSet].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    this.dataMedian = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const frequency = lastSet.reduce(
      (acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      },
      {} as { [key: number]: number },
    );

    if (Object.keys(frequency).length > 0) {
      this.anomalyData = Object.keys(frequency).reduce((a, b) => (frequency[+a] > frequency[+b] ? a : b));
    } else {
      this.anomalyData = 'N/A';
    }
  }
}
