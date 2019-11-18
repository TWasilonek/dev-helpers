export const sanitizeSpaces = (str: string): string => {
  return str.trim().replace(/\s\s+/g, ' ');
};

export const toUpperCase = (str: string): string => {
  return str.trim().toUpperCase();
};

export const toLowerCase = (str: string): string => {
  return str.trim().toLowerCase();
};

export const capitalize = (str: string): string => {
  const trimmed = str.trim();
  return trimmed.substr(0, 1).toUpperCase() + trimmed.substr(1).toLowerCase();
};

export const capitalizeAll = (str: string): string => {
  const words = str.trim().split(' ');
  return words.map(word => capitalize(word)).join(' ');
};

export const snakeCase = (str: string): string => {
  const words = sanitizeSpaces(str.trim()).split(' ');
  return words.map(word => word.toLowerCase()).join('_');
};

export const camelCase = (str: string): string => {
  const [firstWord, ...restWords] = sanitizeSpaces(str.trim()).split(' ');
  return [
    firstWord.toLowerCase(),
    ...restWords.map(word => capitalize(word.toLowerCase()))
  ].join('');
};

export const pascalCase = (str: string): string => {
  const words = sanitizeSpaces(str.trim()).split(' ');
  return words.map(word => capitalize(word.toLowerCase())).join('');
};

export const createConstant = (
  str: string,
  endingSign: string = '',
  isObjectProp: boolean = false
): string => {
  const words = sanitizeSpaces(str.trim()).split(' ');
  const key = words.map(word => word.toUpperCase()).join('_');
  const value = camelCase(str);
  const joiner = isObjectProp ? ':' : ' =';

  return `${key}${joiner} '${value}'${endingSign}`;
};

export const addQuotes = (str: string, quotes: string): string => {
  const trimmed = str.trim();
  return `${quotes}${trimmed}${quotes}`;
};

export const transformLines = (
  transformation: Function,
  str: string,
  ...args: any
) => {
  return str
    .split('\n')
    .map(line => transformation(line, ...args))
    .join('\n');
};
