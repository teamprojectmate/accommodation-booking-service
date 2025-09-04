import api from '../axios';

// ----- Створити платіж -----
export const createPayment = async (bookingId, paymentType = 'PAYMENT') => {
  const response = await api.post('/payments', null, {
    params: { bookingId, paymentType }
  });
  return response.data;
};

// ----- Отримати платежі користувача -----
export const fetchPaymentsByUser = async (userId, pageable) => {
  const response = await api.get('/payments', {
    params: { userId, ...pageable }
  });
  return response.data;
};

// ----- Скасувати платіж -----
export const cancelPayment = async (paymentId) => {
  const response = await api.post(`/payments/${paymentId}/cancel`);
  return response.data;
};

const paymentService = {
  createPayment,
  fetchPaymentsByUser,
  cancelPayment
};

export default paymentService;
