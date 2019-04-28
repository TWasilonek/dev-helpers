export function sanitizeSpaces(str: string): string {
  return str.replace(/\s\s+/g, ' ');
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
