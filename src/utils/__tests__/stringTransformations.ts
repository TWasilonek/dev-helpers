import { sanitizeSpaces, toUpperCase, toLowerCase } from "../stringTransformations";

describe('String transformations', () => {
  describe('sanitizeSpaces', () => {
    test('removes all duplicated spaces', () => {
      const input = '  Lorem    ipsum   dolor sit amet   ';
      const output = ' Lorem ipsum dolor sit amet ';

      expect(sanitizeSpaces(input)).toEqual(output);
    });

    test('removes line breakes', () => {
      const input = 'Lorem ipsum \ndolor sit amet';
      const output = 'Lorem ipsum dolor sit amet';

      expect(sanitizeSpaces(input)).toEqual(output);
    });
  });

  describe('toUpperCase', () => {
    test('transforms string to uppercase', () => {
      const input = 'Lorem ipsum';
      const output = 'LOREM IPSUM';

      expect(toUpperCase(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   Lorem ipsum  ';
      const output = 'LOREM IPSUM';

      expect(toUpperCase(input)).toEqual(output);
    });
  });

  describe('toLowerCase', () => {
    test('transforms string to uppercase', () => {
      const input = 'LOREM IPSUM';
      const output = 'lorem ipsum';

      expect(toLowerCase(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   LOREM IPSUM  ';
      const output = 'lorem ipsum';

      expect(toLowerCase(input)).toEqual(output);
    });
  });
});

