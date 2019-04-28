export function toUpperCase(value: string) {
  return value.toUpperCase();
}

export function toLowerCase(value: string) {
  return value.toLowerCase();
}

export function capitalize(value: string) {
  return value.substr(0, 1).toUpperCase() + value.substr(1);
}

export function capitalizeAll(value: string) {
  const words = value.split(' ');
  return words.map(word => capitalize(word)).join(' ');
}
