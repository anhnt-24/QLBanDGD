export function calculateDiscount(originalPrice: number, salePrice: number) {
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return `-${Math.round(discount)}%`;
}
