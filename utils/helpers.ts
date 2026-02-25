export function formatNumber(value: number, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(value);
}