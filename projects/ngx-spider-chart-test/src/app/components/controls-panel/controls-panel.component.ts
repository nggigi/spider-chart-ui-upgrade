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
    const parsedDataset = this.parseDatasetInput(value);
    if (parsedDataset) {
      this.datasetAdded.emit(JSON.stringify(parsedDataset));
      this.newDatasetControl.reset('');
    } else {
      alert('Invalid dataset format. Supported formats: "1, 3, 4, 6, 7" or "1 3 4 6 7" or "13467"');
    }
  }

  // Reusing parsing logic from dashboard component
  private parseDatasetInput(input: string): number[] | null {
    if (!input || !input.trim()) {
      return null;
    }

    const trimmedInput = input.trim();

    try {
      if (trimmedInput.startsWith('[') && trimmedInput.endsWith(']')) {
        const parsed = JSON.parse(trimmedInput);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'number' && !isNaN(item))) {
          return parsed;
        }
      }

      if (trimmedInput.includes(',')) {
        const values = trimmedInput
          .split(',')
          .map((val) => {
            const num = parseFloat(val.trim());
            return isNaN(num) ? null : num;
          })
          .filter((val) => val !== null) as number[];

        if (values.length > 0) {
          return values;
        }
      }

      if (trimmedInput.includes(' ')) {
        const values = trimmedInput
          .split(/\s+/)
          .map((val) => {
            const num = parseFloat(val.trim());
            return isNaN(num) ? null : num;
          })
          .filter((val) => val !== null) as number[];

        if (values.length > 0) {
          return values;
        }
      }

      if (/^[0-9]+$/.test(trimmedInput)) {
        if (trimmedInput.length > 1) {
          return trimmedInput.split('').map(Number);
        } else {
          return [Number(trimmedInput)];
        }
      }

      const singleNum = parseFloat(trimmedInput);
      if (!isNaN(singleNum)) {
        return [singleNum];
      }
    } catch (error) {

    }

    alert(
      `Invalid dataset format. Supported formats: \n• Comma-separated: "1, 3, 4, 6, 7"\n• Space-separated: "1 3 4 6 7"\n• Consecutive digits: "13467"\n• JSON array: "[1, 3, 4, 6, 7]"`,
    );
    return null;
  }

  onToggle(emitter: EventEmitter<boolean>, event: Event) {
    emitter.emit((event.target as HTMLInputElement).checked);
  }
}
