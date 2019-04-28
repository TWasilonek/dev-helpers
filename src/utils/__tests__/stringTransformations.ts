import {
  sanitizeSpaces,
  toUpperCase,
  toLowerCase,
  capitalizeAll,
  snakeCase,
  camelCase,
  pascalCase,
  createConstant,
  tranformsLinesToConstants,
} from '../stringTransformations';

describe('String transformations', () => {
  describe('sanitizeSpaces', () => {
    const output = 'Lorem ipsum dolor sit amet';

    test('removes all duplicated spaces', () => {
      const input = '  Lorem    ipsum   dolor sit amet   ';
      expect(sanitizeSpaces(input)).toEqual(output);
    });

    test('removes line breakes', () => {
      const input = 'Lorem ipsum \ndolor sit amet';
      expect(sanitizeSpaces(input)).toEqual(output);
    });
  });

  describe('toUpperCase', () => {
    const output = 'LOREM IPSUM';

    test('transforms string to uppercase', () => {
      const input = 'Lorem ipsum';
      expect(toUpperCase(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   Lorem ipsum  ';
      expect(toUpperCase(input)).toEqual(output);
    });
  });

  describe('toLowerCase', () => {
    const output = 'lorem ipsum';

    test('transforms string to lowercase', () => {
      const input = 'LOREM IPSUM';
      expect(toLowerCase(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   LOREM IPSUM  ';
      expect(toLowerCase(input)).toEqual(output);
    });
  });

  describe('capitalizeAll', () => {
    const output = 'Lorem Ipsum Dolor';

    test('capitalizes all words in a string', () => {
      const input = 'lorem ipsum dolor';
      expect(capitalizeAll(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   lorem ipsum dolor  ';
      expect(capitalizeAll(input)).toEqual(output);
    });
  });

  describe('snakeCase', () => {
    const output = 'lorem_ipsum_dolor';

    test('transforms strings to camel case', () => {
      const input = 'Lorem ipsum dolor';
      expect(snakeCase(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   Lorem ipsum dolor  ';
      expect(snakeCase(input)).toEqual(output);
    });
  });

  describe('camelCase', () => {
    const output = 'loremIpsumDolor';

    test('transforms string into camel case', () => {
      const input = 'Lorem ipsum dolor';
      expect(camelCase(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   Lorem ipsum dolor  ';
      expect(camelCase(input)).toEqual(output);
    });
  });

  describe('pascalCase', () => {
    const output = 'LoremIpsumDolor';

    test('transforms string into pascal case', () => {
      const input = 'Lorem ipsum dolor';
      expect(pascalCase(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   Lorem ipsum dolor  ';
      expect(pascalCase(input)).toEqual(output);
    });
  });

  describe.only('createConstant', () => {
    const output = 'LOREM_IPSUM = \'loremIpsum\'';

    test('transforms string into a constant key=value pair', () => {
      const input = 'Lorem ipsum';
      expect(createConstant(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   Lorem ipsum  ';
      expect(createConstant(input)).toEqual(output);
    });

    test('transforms string into a constant key=value pair as an object prop', () => {
      const input = 'Lorem ipsum';
      const output = 'LOREM_IPSUM: \'loremIpsum\'';

      expect(createConstant(input, '', true)).toEqual(output);
    });

    test('transforms string into a constant key=value pair with a custom endline', () => {
      const input = 'Lorem ipsum';
      const output = 'LOREM_IPSUM: \'loremIpsum\';';

      expect(createConstant(input, ';', true)).toEqual(output);
    });
  });

  describe('tranformsLinesToConstants', () => {
    const output = 'LOREM_IPSUM = \'loremIpsum\'\nDOLOR_SIT_AMET = \'dolorSitAmet\'';

    test('transforms each line into constant key=value pair', () => {
      const input = 'Lorem ipsum\nDolor sit amet';
      expect(tranformsLinesToConstants(input)).toEqual(output);
    });

    test('trims spaces in the string', () => {
      const input = '   Lorem ipsum  \n  Dolor sit amet    ';
      expect(tranformsLinesToConstants(input)).toEqual(output);
    });

    test('transforms each line into constant key=value pair as object props', () => {
      const input = 'Lorem ipsum\nDolor sit amet';
      const output = 'LOREM_IPSUM: \'loremIpsum\',\nDOLOR_SIT_AMET: \'dolorSitAmet\',';

      expect(tranformsLinesToConstants(input, ',', true)).toEqual(output);
    });
  });
});
