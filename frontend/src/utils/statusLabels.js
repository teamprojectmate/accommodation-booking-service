// src/utils/statusLabels.js

// Єдина мапа статусів → текст + CSS клас
export const statusLabels = {
  PENDING: { text: 'Очікує', className: 'badge-status-pending' },
  PAID: { text: 'Оплачено', className: 'badge-status-paid' },
  CANCELLED: { text: 'Скасовано', className: 'badge-status-cancelled' },
  CONFIRMED: { text: 'Підтверджено', className: 'badge-status-confirmed' },
  EXPIRED: { text: 'Прострочено', className: 'badge-status-expired' },
  REQUIRES_VERIFICATION: {
    text: 'Очікує перевірки',
    className: 'badge-status-requires-verification'
  },
  PERMITTED: { text: 'Дозволено', className: 'badge-status-permitted' },
  REJECTED: { text: 'Відхилено', className: 'badge-status-rejected' }
};

export const getStatusLabel = (status) =>
  statusLabels[status] || { text: status, className: '' };
