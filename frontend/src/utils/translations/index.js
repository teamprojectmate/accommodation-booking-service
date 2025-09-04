// src/utils/translations/index.js

// -----------------------------
// 🏠 Типи житла
// -----------------------------
export const typeTranslations = {
  HOUSE: { label: 'Будинок', icon: '🏠', color: '#16a34a' },
  APARTMENT: { label: 'Квартира', icon: '🏢', color: '#2563eb' },
  HOTEL: { label: 'Готель', icon: '🏨', color: '#9333ea' },
  VACATION_HOME: { label: 'Дім для відпочинку', icon: '🌴', color: '#f59e0b' },
  HOSTEL: { label: 'Хостел', icon: '🛏️', color: '#06b6d4' },
  COTTAGE: { label: 'Котедж', icon: '🏡', color: '#8b5cf6' }
};

// -----------------------------
// 🔧 Зручності (з alias-ами)
// -----------------------------
export const amenityTranslations = {
  wifi: {
    label: 'Wi-Fi',
    icon: '📶',
    slug: 'wifi',
    color: '#3b82f6',
    aliases: ['wi-fi', 'wifi', 'вайфай']
  },
  kitchen: {
    label: 'Кухня',
    icon: '🍳',
    slug: 'kitchen',
    color: '#f97316',
    aliases: ['кухня', 'kitchen']
  },
  ac: {
    label: 'Кондиціонер',
    icon: '❄️',
    slug: 'ac',
    color: '#06b6d4',
    aliases: ['кондиціонер', 'air conditioner', 'ac']
  },
  parking: {
    label: 'Парковка',
    icon: '🅿️',
    slug: 'parking',
    color: '#16a34a',
    aliases: ['парковка', 'parking']
  },
  washer: {
    label: 'Пральна машина',
    icon: '🧺',
    slug: 'washer',
    color: '#8b5cf6',
    aliases: ['пральна машина', 'washer', 'laundry']
  }
};

// -----------------------------
// 📌 Статуси
// -----------------------------
export const statusTranslations = {
  // 🔹 Платежі
  PENDING: { label: 'Очікує', color: '#f59e0b', slug: 'pending' },
  PAID: { label: 'Оплачено', color: '#16a34a', slug: 'paid' },

  // 🔹 Бронювання
  CONFIRMED: { label: 'Підтверджено', color: '#16a34a', slug: 'confirmed' },
  CANCELED: { label: 'Скасовано', color: '#dc2626', slug: 'canceled' },
  EXPIRED: { label: 'Прострочено', color: '#9ca3af', slug: 'expired' },

  // 🔹 Житло
  REQUIRES_VERIFICATION: {
    label: 'Очікує перевірки',
    color: '#f59e0b',
    slug: 'requires-verification'
  },
  PERMITTED: { label: 'Дозволено', color: '#16a34a', slug: 'permitted' },
  REJECTED: { label: 'Відхилено', color: '#dc2626', slug: 'rejected' }
};

// Мапер
export const mapStatus = (status = '') => {
  const normalized = status?.toUpperCase();
  return (
    statusTranslations[normalized] || {
      label: status,
      color: '#6b7280',
      slug: 'unknown'
    }
  );
};

// -----------------------------
// ⚙️ Universal Mapper
// -----------------------------
export const mapType = (type = '') => {
  const normalized = type?.toUpperCase();
  return typeTranslations[normalized] || { label: type, icon: '🏘️', color: '#0f766e' };
};

export const mapAmenity = (amenity = '') => {
  const lower = amenity.toLowerCase();

  for (const key in amenityTranslations) {
    const { aliases, ...rest } = amenityTranslations[key];
    if (aliases.some((alias) => lower.includes(alias))) {
      return rest;
    }
  }

  return { label: amenity, icon: '✨', slug: 'other', color: '#6b7280' };
};
