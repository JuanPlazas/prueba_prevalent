export function formatValue(value) {
  if (typeof value === 'string') {
    return `"${value}"`;
  } else {
    return value;
  }
}

export function formatCash(cash: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(cash)
}