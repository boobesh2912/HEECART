import { couponDiscount, formatINR, unitPrice } from './pricing';

export const productUrl = id => `${window.location.origin}/p/${id}`;

export const whatsappLink = (number, text) =>
  `https://wa.me/${String(number).replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export function openWhatsApp(number, text) {
  window.open(whatsappLink(number, text), '_blank', 'noopener');
}

function itemLines(item, index) {
  const { product, qty, printText } = item;
  const price = unitPrice(product, qty);
  const lines = [
    `${index + 1}. ${product.name} (${product.set_type})`,
    price ? `   Qty: ${qty} × ${formatINR(price)} = ${formatINR(price * qty)}` : `   Qty: ${qty}`,
  ];
  if (printText) lines.push(`   Name/text to print: ${printText}`);
  lines.push(`   ${productUrl(product.id)}`);
  return lines;
}

export function buildEnquiryMessage({ items, coupon, customer = {} }) {
  const subtotal = items.reduce((sum, i) => sum + (unitPrice(i.product, i.qty) || 0) * i.qty, 0);
  const discount = couponDiscount(coupon, subtotal);

  const lines = ['Hi Heecart! I would like to order:', ''];
  items.forEach((item, i) => lines.push(...itemLines(item, i), ''));

  if (subtotal) {
    lines.push(`Estimated total: ${formatINR(subtotal)}`);
    if (discount) {
      lines.push(`Coupon ${coupon.code}: -${formatINR(discount)}`);
      lines.push(`After coupon: ${formatINR(subtotal - discount)}`);
    }
    lines.push('(GST & shipping extra)');
  }

  const details = [
    customer.name && `Name: ${customer.name}`,
    customer.company && `Company: ${customer.company}`,
    customer.city && `Delivery city: ${customer.city}`,
    customer.notes && `Notes: ${customer.notes}`,
  ].filter(Boolean);
  if (details.length) lines.push('', ...details);

  return lines.join('\n');
}
