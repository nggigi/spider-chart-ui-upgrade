import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  pure: true,
})
export class InitialsPipe implements PipeTransform {
  transform(fullName: string, numChars: number = 2): string {
    if (!fullName?.trim()) {
      return '';
    }
    return fullName
      .trim()
      .split(/\s+/)
      .slice(0, numChars)
      .map((n) => n.substring(0, 2).toUpperCase())
      .join('');
  }
}
