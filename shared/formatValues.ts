export function formatValue(value) {
  if (typeof value === 'string') {
    return `"${value}"`;
  } else {
    return value;
  }
}