import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  let pipe: InitialsPipe;

  beforeEach(() => {
    pipe = new InitialsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return initials for a full name with default number of characters', () => {
    const result = pipe.transform('John Doe');
    expect(result).toBe('JO');
  });

  it('should return initials with custom number of characters', () => {
    const result = pipe.transform('John Michael Doe', 3);
    expect(result).toBe('JOMI');
  });

  it('should handle single word names correctly', () => {
    const result = pipe.transform('Madonna');
    expect(result).toBe('MA');
  });

  it('should return empty string for an empty input', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should handle names with extra spaces', () => {
    const result = pipe.transform('  John   Doe  ');
    expect(result).toBe('JO');
  });

  it('should return uppercase initials regardless of input case', () => {
    const result = pipe.transform('john doe');
    expect(result).toBe('JO');
  });

  it('should handle null or undefined input gracefully', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should truncate initials if numChars is less than name parts', () => {
    const result = pipe.transform('John Michael Doe', 2);
    expect(result).toBe('JOMI');
  });

  it('should return all initials if numChars exceeds name parts', () => {
    const result = pipe.transform('John Michael Doe', 5);
    expect(result).toBe('JOMIDO');
  });

  it('should handle single-character names', () => {
    const result = pipe.transform('A B');
    expect(result).toBe('AB');
  });

  it('should handle names with non-alphabet characters', () => {
    const result = pipe.transform("John O'Connor");
    expect(result).toBe('JO');
  });
});
