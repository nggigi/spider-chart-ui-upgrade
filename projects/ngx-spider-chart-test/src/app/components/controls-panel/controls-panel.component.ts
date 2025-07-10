import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controls-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.scss'],
})
export class ControlsPanelComponent {
  @Input() datasets: number[][] = [];
  @Output() datasetAdded = new EventEmitter<string>();
  @Output() presetClicked = new EventEmitter<string>();
  @Output() coreElementsToggled = new EventEmitter<boolean>();
  @Output() labelsToggled = new EventEmitter<boolean>();
  @Output() widgetsToggled = new EventEmitter<boolean>();
  @Output() backgroundToggled = new EventEmitter<boolean>();
  @Output() starfieldToggled = new EventEmitter<boolean>();
  @Output() nebulaToggled = new EventEmitter<boolean>();
  @Output() particlesToggled = new EventEmitter<boolean>();
  @Output() enableAllClicked = new EventEmitter<void>();
  @Output() disableAllClicked = new EventEmitter<void>();

  newDatasetControl = new FormControl('');

  addDataset() {
    const value = this.newDatasetControl.value;
    if (value && /^\s*\[\s*\d+(\s*,\s*\d+)*\s*\]\s*$/.test(value)) {
      this.datasetAdded.emit(value);
      this.newDatasetControl.reset('');
    } else {
      // TODO: Implement user-facing error feedback for invalid dataset format
      alert('Invalid dataset format. Please use a comma-separated array of numbers, e.g., [1, 2, 3]');
    }
  }

  onToggle(emitter: EventEmitter<boolean>, event: Event) {
    emitter.emit((event.target as HTMLInputElement).checked);
  }
}
