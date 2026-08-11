import React, { useState } from 'react';
import { User, CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  cartItems: CartItem[];
  totalAmount: number;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  cartItems,
  totalAmount,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    customer_name: currentUser?.name || '',
    address: '',
    phone: '',
    payment_method: 'cod',
    card_number: '',
    expiry_date: '',
    cvv: '',
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      user_id: 1, // Usually you'd get this from currentUser or backend session
      customer_name: formData.customer_name,
      address: formData.address,
      phone: formData.phone,
      payment_method: formData.payment_method,
      total_amount: totalAmount,
      ...(formData.payment_method === 'card' && {
        card_number: formData.card_number,
        expiry_date: formData.expiry_date,
        cvv: formData.cvv,
      }),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        if (formData.payment_method === 'cod') {
          alert(`Order Placed Successfully! (SMS: Your order has been received and will be delivered via Cash on Delivery)`);
        } else {
          alert('Payment Successful! Your order is being processed.');
        }
        onOrderSuccess();
        onClose();
      } else {
        const data = await response.json();
        alert(data.message || 'Error placing order');
      }
    } catch (error) {
      alert('Connection error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h3 className="text-xl font-bold text-[#191c1e]">Secure Checkout</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-black">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] outline-none"
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Shipping Address</label>
              <textarea
                required
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#3525cd] outline-none"
                placeholder="House #, Street, City"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, payment_method: 'cod' })}
                  className={`flex items-center justify-center gap-2 p-3 border rounded-xl text-sm font-bold transition-all ${
                    formData.payment_method === 'cod'
                      ? 'border-[#3525cd] bg-[#3525cd]/5 text-[#3525cd]'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="material-symbols-outlined">payments</span>
                  Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, payment_method: 'card' })}
                  className={`flex items-center justify-center gap-2 p-3 border rounded-xl text-sm font-bold transition-all ${
                    formData.payment_method === 'card'
                      ? 'border-[#3525cd] bg-[#3525cd]/5 text-[#3525cd]'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="material-symbols-outlined">credit_card</span>
                  Card Payment
                </button>
              </div>
            </div>

            {formData.payment_method === 'card' && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Card Number</label>
                  <input
                    type="text"
                    required
                    value={formData.card_number}
                    onChange={(e) => setFormData({ ...formData, card_number: e.target.value })}
                    className="w-full border-b border-gray-300 bg-transparent py-1.5 text-sm focus:border-[#3525cd] outline-none"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={formData.expiry_date}
                      onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                      className="w-full border-b border-gray-300 bg-transparent py-1.5 text-sm focus:border-[#3525cd] outline-none"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">CVV</label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="w-full border-b border-gray-300 bg-transparent py-1.5 text-sm focus:border-[#3525cd] outline-none"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#f7f9fb] p-4 rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Total Payable</p>
                <p className="text-xl font-black text-[#191c1e]">${totalAmount.toFixed(2)}</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#3525cd] hover:bg-[#4f46e5] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#3525cd]/20 transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
