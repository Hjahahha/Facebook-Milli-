export function formatPrice(price: number): string {
  return price.toLocaleString('ar-IQ') + ' دينار';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-IQ', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

export function sendWhatsAppNotification(merchantName: string, tier: string, phone: string): void {
  const message = encodeURIComponent(
    `طلب انضمام تاجر جديد\n` +
    `الاسم: ${merchantName}\n` +
    `الباقة: ${tier === 'premium' ? 'المميزة (99,000 دينار)' : 'العادية (25,000 دينار)'}\n` +
    `الهاتف: ${phone}\n` +
    `التاريخ: ${new Date().toLocaleDateString('ar-IQ')}`
  );
  window.open(`https://wa.me/9647506747685?text=${message}`, '_blank');
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending': return 'text-yellow-600 bg-yellow-50';
    case 'approved': case 'confirmed': case 'delivered': return 'text-green-600 bg-green-50';
    case 'rejected': case 'cancelled': return 'text-red-600 bg-red-50';
    case 'shipped': return 'text-blue-600 bg-blue-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getStatusText(status: string): string {
  const map: Record<string, string> = {
    pending: 'قيد الانتظار',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    confirmed: 'مؤكد',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    cancelled: 'ملغي',
  };
  return map[status] || status;
}
