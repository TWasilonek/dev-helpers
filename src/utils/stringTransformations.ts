export function sanitizeSpaces(str: string): string {
  return str.trim().replace(/\s\s+/g, ' ');
}

export function toUpperCase(str: string): string {
  return str.trim().toUpperCase();
};

export function toLowerCase(str: string): string {
  return str.trim().toLowerCase();
};

export function capitalize(str: string): string {
  const trimmed = str.trim();
  return trimmed.substr(0, 1).toUpperCase() + trimmed.substr(1);
};

export function capitalizeAll(str: string): string {
  const words = str.trim().split(' ');
  return words.map(word => capitalize(word)).join(' ');
};

export function snakeCase(str: string): string {
  const words = sanitizeSpaces(str.trim()).split(' ');
  return words.map(word => word.toLowerCase()).join('_');
};

export function camelCase(str: string): string {
  const [firstWord, ...restWords] = sanitizeSpaces(str.trim()).split(' ');
  return [
    firstWord.toLowerCase(),
    ...restWords.map(word => capitalize(word.toLowerCase()))
  ].join('');
};

export function pascalCase(str: string): string {
  const words = sanitizeSpaces(str.trim()).split(' ');
  return words.map(word => capitalize(word.toLowerCase())).join('');
};

export function createConstant(str: string, endingSign: string = '', isObjectProp: boolean = false): string {
  const words = sanitizeSpaces(str.trim()).split(' ');
  const key = words.map(word => word.toUpperCase()).join('_');
  const value = camelCase(str);
  const joiner = isObjectProp ? ':' : ' =';

  return `${key}${joiner} '${value}'${endingSign}`;
};

export function tranformsLinesToConstants(str: string, endingSign: string = '', isObjectProp: boolean = false): string {
  return str
    .split('\n')
    .map(line => createConstant(line, endingSign, isObjectProp))
    .join('\n');

}
