export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isSale?: boolean;
  image: string;
  galleryImages: string[];
  description: string;
  sku: string;
  colors: { name: string; value: string }[];
  status: 'Active' | 'Draft' | 'Out of Stock';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Cancelled';
  items: OrderItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  joinDate: string;
  status: 'Active' | 'VIP' | 'Inactive';
}

export type ViewMode =
  | 'home'
  | 'shop'
  | 'category'
  | 'deals'
  | 'new-arrivals'
  | 'product-detail'
  | 'admin-overview'
  | 'admin-products'
  | 'admin-categories'
  | 'admin-brands'
  | 'admin-orders'
  | 'admin-customers'
  | 'admin-analytics'
  | 'admin-settings'
  | 'auth';

export interface User {
  name: string;
  email: string;
  role: 'Customer' | 'Super Admin';
  avatarUrl: string;
}
