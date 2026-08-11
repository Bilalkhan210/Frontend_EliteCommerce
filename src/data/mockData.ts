import { Product, Order, Customer } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Noise Cancelling Pro Headphones',
    brand: 'Auraudio',
    category: 'Electronics',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewsCount: 128,
    inStock: true,
    stockCount: 142,
    isSale: true,
    sku: 'HW-ANC-882',
    status: 'Active',
    colors: [
      { name: 'Obsidian Black', value: '#1a1a1a' },
      { name: 'Arctic White', value: '#e8e8e8' },
      { name: 'Midnight Blue', value: '#3d4b68' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEU4_bWfiaH1aJ0inbpUucyfdq6o5ys5iFJ6GQW5tX0bHlhQMPIq_aqQSeB-nLkidGXPc1GzZngBUk5Yw_xrAprLP11EnrS_R3FLq5KmLfyxLdllKwmlXw5lKWBWzLerMEIkGDlqHv15YaH2MHtTAT2zUra1e_1HjE2VHbVSo5ucwMFoSdsGZRACfqoCocTnjz59CNQXk0R1bik2saWM84DZmbQVLuKY05CzluROX8uexDRhAokjFN',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEpY49F247F_bYwgS6wFx6Id7jPG36LrUcWFtkiHmJWRRHQt3zgVzZGgvcFRMVtVGTUUdIgvAsKDYYhQcFR4n7Z5lnUqn6gi7OKih4giUdEwf_CXz-e0MDjvVhSlSXM04qGn5DH9SpAURP4JkxHX3FIQ72e82xZTZ-PcbUK-xfg0NkhEEcosPtAW2wm9Qg5qWyQbWCdo5lKLl9mvaPy8UNR7luMAR1zwQ1GJ9koeR6kLwSRNpeVabu',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEkYYmPAn3bVNxaesgSENWRWPt2IotA04Ct8uv8aEwr_HtayIxW2d_NlYS9OcRi_vuP963dkGHxVBCcnuBOS09SzaWjYVFIr7_6i1yDVNzpGjlhd4yQLN3XiCnc2W2StxDbZAlwt108YCCbd6LRz7uISD0taqR-pcYL2mIYPFXLOr9hnjsL89vXy54N_gCW5bdeCdrOodPIsL33Epec9M-raDXpZRXsGPaXKxpE7z8KSYZwfjdhX1t',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD91I_LL30IZFYVAORJDcxvY7SCsVuP2L7rAA1eyPuEW4yOPqAsPDTOzD-74LxHxwFTODi7c6aIRVHUzxP3JflZhKg84OehigFiRV-GtrpwVUq25B_jtX4bScKK3akFUZ4vVo9LPalykzLZMFS46oCl5YSk8qln9IKDh2y9Mkc7pgc5V1nHEJZJFQOM6T-Rn2Ai1de61rpp4SO4vpPSHWTB6eGjFAfG0r5nOP8uKz1unWn46oaXQMGW',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMkzc8UiJYJsuGRtY80U_sf2Y0j_QO4KdrPKFzNscAij7pwh7wdJJgDvs2auDwawC8xPWfN9eZs7bxtRo1yVlSYo1G_y9_EB8W_nmyzXCFdUgJ4Bm-IUISArk755goEozlH-JBuNvseo_Qkiwj6mWN9XihtGnkh7xPSS8zRQdAW2sAJ1WLWMckq3cEDZWbveO1-0PEQy01vWpNRYYJPSHWiz5kt_zse-vUQK6_8wNaGLx-qsStRDVM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC-E2iffa60X7oh_K6gKYQ-gX3LWu-bCsox5z0Wc4fz8fj1j7ECAv98PrO0q2M2I80TNzzLHd1DMgCmHN8nHwm_SOIGji5GClcxXy5nIxN0AuNQAi6KoqgGd6T7mfDo7gFTMdx0FZlqXTeNWZYgHQQ2SDzWCh2TMUNm_uYQKFOHQATBptP3_kiZqt0_3AJVqLQ93125DWXx6qoGTggbkVg7iunpDrfNfomlDg0iLRJ4m0ddz8-Bv24J'
    ],
    description: 'Immerse yourself in pure clarity with industry-leading active noise cancellation, custom 40mm drivers, and 40 hours of playtime.'
  },
  {
    id: 'prod-2',
    name: 'Quantum Smartwatch Series 5',
    brand: 'NexusTech',
    category: 'Electronics',
    price: 199.00,
    rating: 4.5,
    reviewsCount: 84,
    inStock: true,
    stockCount: 65,
    sku: 'NT-SMC-501',
    status: 'Active',
    colors: [
      { name: 'Matte Black', value: '#222222' },
      { name: 'Silver Steel', value: '#cccccc' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQWUQdGhwq5TC-Wu_-eSc9LkEgRVidruPp3S2rp7Jg1aecKgly8BgKSIu0EyU3oq9Bz28Rf7ziTwLDmLRgbRzgsNHFQTee3UJZlQswOzr2sfBwXHgwDtIxWXqICZtIw-n5KjUowr3s3BV78wOf1aQgw3F79liFG3OU-VkUMGFOgsZpDNbovgEmHLadwh0I8uGWoXbTMUV8VIq2wspXUbLkn_8EBq6_AxH4fcgugnANrIqpekIVzx07',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQWUQdGhwq5TC-Wu_-eSc9LkEgRVidruPp3S2rp7Jg1aecKgly8BgKSIu0EyU3oq9Bz28Rf7ziTwLDmLRgbRzgsNHFQTee3UJZlQswOzr2sfBwXHgwDtIxWXqICZtIw-n5KjUowr3s3BV78wOf1aQgw3F79liFG3OU-VkUMGFOgsZpDNbovgEmHLadwh0I8uGWoXbTMUV8VIq2wspXUbLkn_8EBq6_AxH4fcgugnANrIqpekIVzx07'
    ],
    description: 'Track your health metrics in real-time with continuous ECG monitoring, sleek AMOLED display, and multi-day battery endurance.'
  },
  {
    id: 'prod-3',
    name: 'Tactile Mechanical Keyboard V2',
    brand: 'Vanguard',
    category: 'Electronics',
    price: 149.50,
    rating: 5.0,
    reviewsCount: 42,
    inStock: true,
    stockCount: 38,
    isNew: true,
    sku: 'VG-KB-202',
    status: 'Active',
    colors: [
      { name: 'Slate Gray', value: '#4a5568' },
      { name: 'Deep Indigo', value: '#3525cd' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB0TwWHtalfpltJCX1djpbwQnZuOfZf1m44kf9UVbDn1WsxT0_BbfkZXePzb8r6sti6qQ-gK8_vxse1Xof9IzXCHxaI7srF5oHDNK6R_zK3Y3R0FiyU5idV0YiwXiRnw_q0WQnb5YPnstTuFQVyrDMf8zWmehZegCDiV9sh0mmefOt3oEOJP9IX53Gh4HqPYLi7W3yJyfvTvmMT35f8Yir3cbHusXvii3sRZge_HwHS3PHXab9CuyT',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCB0TwWHtalfpltJCX1djpbwQnZuOfZf1m44kf9UVbDn1WsxT0_BbfkZXePzb8r6sti6qQ-gK8_vxse1Xof9IzXCHxaI7srF5oHDNK6R_zK3Y3R0FiyU5idV0YiwXiRnw_q0WQnb5YPnstTuFQVyrDMf8zWmehZegCDiV9sh0mmefOt3oEOJP9IX53Gh4HqPYLi7W3yJyfvTvmMT35f8Yir3cbHusXvii3sRZge_HwHS3PHXab9CuyT'
    ],
    description: 'Custom hot-swappable tactile switches, CNC aluminum casing, and programmable per-key RGB backlighting designed for ultimate productivity.'
  },
  {
    id: 'prod-4',
    name: 'Artisan Ceramic Mug Set',
    brand: 'HomeGoods',
    category: 'Home & Garden',
    price: 34.00,
    rating: 4.2,
    reviewsCount: 18,
    inStock: true,
    stockCount: 8,
    sku: 'HM-MUG-105',
    status: 'Active',
    colors: [
      { name: 'Speckled Cream', value: '#f4f1ea' },
      { name: 'Terracotta', value: '#c86d51' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4k0WX27wNkEUFBMarcwxw0Wn6beAFQGekBGXMuQbdX7SuLntrEjQ6cGQRlt9s97fMptaR3sTkq7JBzz730LqHwOek2w7tWfGm4jVkBanMZUL5TE4I99Up5mm79bigAFnzPWHiQbosCogKbEVtPR07BGB4DI-kQ4IJ5V3toKy205_Q86goVGQDMfAx1tTOF8o8mv_KMEdBF-wvYV-e2WqV0FJwlhqwzDvxJOea77X8fC6yKk6URDWV',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4k0WX27wNkEUFBMarcwxw0Wn6beAFQGekBGXMuQbdX7SuLntrEjQ6cGQRlt9s97fMptaR3sTkq7JBzz730LqHwOek2w7tWfGm4jVkBanMZUL5TE4I99Up5mm79bigAFnzPWHiQbosCogKbEVtPR07BGB4DI-kQ4IJ5V3toKy205_Q86goVGQDMfAx1tTOF8o8mv_KMEdBF-wvYV-e2WqV0FJwlhqwzDvxJOea77X8fC6yKk6URDWV'
    ],
    description: 'Handcrafted stoneware ceramic mugs featuring a ergonomic hold and minimalist speckled finish.'
  },
  {
    id: 'prod-5',
    name: 'Ergonomic Office Chair',
    brand: 'NexusTech',
    category: 'Home & Garden',
    price: 349.00,
    rating: 4.7,
    reviewsCount: 56,
    inStock: true,
    stockCount: 3,
    sku: 'NT-CHR-800',
    status: 'Active',
    colors: [{ name: 'Slate Gray', value: '#464555' }],
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&q=80&w=800',
    galleryImages: ['https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&q=80&w=800'],
    description: 'Breathable mesh lumbar support chair with multi-angle tilt lock and adjustable 3D armrests.'
  },
  {
    id: 'prod-6',
    name: 'USB-C Hub Pro 10-in-1',
    brand: 'NexusTech',
    category: 'Electronics',
    price: 79.99,
    rating: 4.6,
    reviewsCount: 92,
    inStock: false,
    stockCount: 0,
    sku: 'NT-HUB-101',
    status: 'Out of Stock',
    colors: [{ name: 'Space Gray', value: '#5c647a' }],
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=800',
    galleryImages: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=800'],
    description: 'Dual 4K HDMI ports, 100W Power Delivery pass-through, SD card reader, and Gigabit Ethernet.'
  },
  {
    id: 'prod-7',
    name: 'Organic Cotton T-Shirt',
    brand: 'Vanguard',
    category: 'Clothing',
    price: 35.00,
    rating: 4.3,
    reviewsCount: 31,
    inStock: false,
    stockCount: 0,
    sku: 'AP-TEE-201',
    status: 'Draft',
    colors: [{ name: 'Navy Blue', value: '#1a237e' }],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    galleryImages: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800'],
    description: '100% GOTS certified organic heavyweight cotton with a tailored relaxed fit.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#ORD-9082',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    date: 'Today, 10:42 AM',
    amount: 129.00,
    status: 'Completed',
    items: [{ productId: 'prod-1', productName: 'Noise Cancelling Pro Headphones', quantity: 1, price: 129.00 }]
  },
  {
    id: '#ORD-9081',
    customerName: 'Michael Chen',
    customerEmail: 'm.chen@example.com',
    date: 'Today, 09:15 AM',
    amount: 45.50,
    status: 'Processing',
    items: [{ productId: 'prod-4', productName: 'Artisan Ceramic Mug Set', quantity: 1, price: 45.50 }]
  },
  {
    id: '#ORD-9080',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily.r@example.com',
    date: 'Yesterday, 04:30 PM',
    amount: 340.00,
    status: 'Completed',
    items: [{ productId: 'prod-2', productName: 'Quantum Smartwatch Series 5', quantity: 1, price: 199.00 }, { productId: 'prod-3', productName: 'Tactile Mechanical Keyboard V2', quantity: 1, price: 141.00 }]
  },
  {
    id: '#ORD-9079',
    customerName: 'David Kim',
    customerEmail: 'david.k@example.com',
    date: 'Yesterday, 02:10 PM',
    amount: 89.99,
    status: 'Cancelled',
    items: [{ productId: 'prod-6', productName: 'USB-C Hub Pro 10-in-1', quantity: 1, price: 89.99 }]
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c-1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', ordersCount: 12, totalSpent: 2450.00, joinDate: '2023-11-12', status: 'VIP' },
  { id: 'c-2', name: 'Michael Chen', email: 'm.chen@example.com', ordersCount: 5, totalSpent: 620.50, joinDate: '2024-01-05', status: 'Active' },
  { id: 'c-3', name: 'Emily Rodriguez', email: 'emily.r@example.com', ordersCount: 8, totalSpent: 1890.00, joinDate: '2023-09-18', status: 'VIP' },
  { id: 'c-4', name: 'David Kim', email: 'david.k@example.com', ordersCount: 2, totalSpent: 179.98, joinDate: '2024-03-22', status: 'Active' }
];

export const REVENUE_SALES_DATA = [
  { month: 'Jan', revenue: 18400, sales: 1200 },
  { month: 'Feb', revenue: 22100, sales: 1450 },
  { month: 'Mar', revenue: 29800, sales: 1900 },
  { month: 'Apr', revenue: 26400, sales: 1720 },
  { month: 'May', revenue: 34200, sales: 2200 },
  { month: 'Jun', revenue: 41000, sales: 2800 },
  { month: 'Jul', revenue: 38900, sales: 2600 },
  { month: 'Aug', revenue: 45600, sales: 3429 }
];
