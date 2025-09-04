// src/pages/User/Payment.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createPayment } from '../../store/slices/paymentsSlice';
import Notification from '../../components/Notification';
import '../../styles/components/_payment-checkout.scss';

const Payment = () => {
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const { payment, createStatus, error } = useSelector((s) => s.payments);

  const handlePay = () => {
    dispatch(createPayment({ bookingId, paymentType: 'PAYMENT' }));
  };

  useEffect(() => {
    if (payment?.sessionUrl) {
      window.location.href = payment.sessionUrl;
    }
  }, [payment]);

  return (
    <div className="payment-page">
      <div className="payment-card payment-checkout">
        <h2 className="payment-title">Оплата бронювання</h2>
        <p className="payment-subtitle">
          Будь ласка, перевірте інформацію нижче та натисніть кнопку для переходу на
          захищену сторінку оплати.
        </p>

        {error && <Notification type="danger" message={error} />}

        <div className="payment-info">
          <p>
            <strong>ID бронювання:</strong> {bookingId}
          </p>
          {payment?.amountToPay && (
            <p>
              <strong>Сума до сплати:</strong> {payment.amountToPay} ₴
            </p>
          )}
        </div>

        <button
          className="btn btn-primary btn-lg"
          onClick={handlePay}
          disabled={createStatus === 'loading'}
        >
          {createStatus === 'loading' ? 'Обробка...' : 'Оплатити'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
