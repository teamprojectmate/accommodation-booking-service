// src/api/accommodations/accommodationService.js
import api from '../axios';

// 🔹 Отримати житло з фільтрами (пошук)
export const fetchAccommodations = async (filters) => {
  // Формуємо searchParameters
  const searchParams = {
    city: filters.city?.length ? filters.city.map((c) => c.trim()) : [],
    type: filters.type?.length
      ? filters.type.map((t) => t.trim().toUpperCase())
      : [],
    size: filters.size?.length
      ? filters.size.map((s) => s.trim().toUpperCase())
      : [],
    minDailyRate:
      filters.minDailyRate !== undefined ? Number(filters.minDailyRate) : null,
    maxDailyRate:
      filters.maxDailyRate !== undefined ? Number(filters.maxDailyRate) : null,
  };

  // 🔹 Видаляємо порожні ключі
  Object.keys(searchParams).forEach((key) => {
    if (
      searchParams[key] === undefined ||
      searchParams[key] === null ||
      (Array.isArray(searchParams[key]) && searchParams[key].length === 0)
    ) {
      delete searchParams[key];
    }
  });

  // Формуємо body для POST
  const body = {
    searchParameters: searchParams,
    pageable: {
      page: filters.page ?? 0,
      size: filters.sizePage ?? 10,
      sort: filters.sort || [],
    },
  };

  console.log('📤 Відправляю на бекенд (body):', JSON.stringify(body, null, 2));

  try {
    const response = await api.post('/accommodations/search', body);
    console.log('✅ Відповідь від бекенду:', response.data);
    return response.data;
  } catch (err) {
    console.error(
      '❌ Помилка при запиті /accommodations/search:',
      err.response?.data || err.message
    );
    throw err;
  }
};

// 🔹 Отримати деталі житла
export const getAccommodationById = async (id) => {
  const response = await api.get(`/accommodations/${id}`);
  return response.data;
};

// 🔹 Створити житло
export const createAccommodation = async (formData, token) => {
  const response = await api.post('/accommodations', formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 🔹 Оновити житло
export const updateAccommodation = async (id, formData, token) => {
  const response = await api.put(`/accommodations/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 🔹 Для адміна (список без фільтрів, пагінація)
export const fetchAdminAccommodations = async (token, page = 0, size = 10) => {
  const response = await api.get('/accommodations', {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, size },
  });
  return response.data;
};