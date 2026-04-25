export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  subcategory?: string;
  description: string;
  merchantId: string;
  merchantName: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
  image?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  parentId: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  birthday?: string;
  gender: 'male' | 'female' | 'other';
  location?: string;
  points: number;
  walletBalance: number;
  inviteCode: string;
  role: 'user' | 'merchant' | 'admin';
  merchantTier?: 'standard' | 'premium';
  merchantStatus?: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface MerchantApplication {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  businessName: string;
  businessType: string;
  businessAddress: string;
  businessDescription: string;
  tier: 'standard' | 'premium';
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  nationalId: string;
  city: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  address: Address;
}

export interface Address {
  id: string;
  label: string;
  fullAddress: string;
  city: string;
  area: string;
  phone: string;
  isDefault: boolean;
}

export interface Ad {
  id: string;
  title: string;
  image: string;
  link?: string;
  active: boolean;
  position: 'banner' | 'popup' | 'sidebar';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

export interface DailyReward {
  day: number;
  points: number;
  collected: boolean;
  available: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'system' | 'promo' | 'merchant';
  read: boolean;
  createdAt: string;
}
