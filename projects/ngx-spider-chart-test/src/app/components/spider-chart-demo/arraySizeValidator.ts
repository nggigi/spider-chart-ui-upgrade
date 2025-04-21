import { AbstractControl, ValidatorFn } from '@angular/forms';

export function arraySizeValidator(minSize: number, maxSize: number): ValidatorFn {
  if (minSize < 0 || maxSize < 0) {
    throw new Error('Size parameters cannot be negative');
  }
  if (minSize > maxSize) {
    throw new Error('Minimum size cannot be greater than maximum size');
  }
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';

    const array = value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => {
        return item !== '' && !isNaN(item);
      });
    if (array.length < minSize || array.length > maxSize) {
      return { arraySize: { min: minSize, max: maxSize } };
    }
    return null;
  };
}
