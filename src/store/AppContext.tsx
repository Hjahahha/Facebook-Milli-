import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, User, CartItem, Order, Address, MerchantApplication, Ad, Message, Category, Notification, Transaction, DailyReward } from '../types';
import { sampleProducts, sampleCategories, sampleAds } from '../utils/sampleData';

interface AppState {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  orders: Order[];
  addresses: Address[];
  favorites: string[];
  merchantApplications: MerchantApplication[];
  ads: Ad[];
  messages: Message[];
  notifications: Notification[];
  transactions: Transaction[];
  dailyRewards: DailyReward[];
  searchQuery: string;
  appSettings: AppSettings;
}

interface AppSettings {
  appName: string;
  currency: string;
  deliveryFee: string;
  minOrderAmount: string;
  whatsappNumber: string;
  email: string;
  location: string;
}

type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'REMOVE_ADDRESS'; payload: string }
  | { type: 'SUBMIT_MERCHANT_APPLICATION'; payload: MerchantApplication }
  | { type: 'UPDATE_MERCHANT_APPLICATION'; payload: { id: string; status: 'approved' | 'rejected' } }
  | { type: 'ADD_AD'; payload: Ad }
  | { type: 'REMOVE_AD'; payload: string }
  | { type: 'TOGGLE_AD'; payload: string }
  | { type: 'UPDATE_AD'; payload: Ad }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'REMOVE_CATEGORY'; payload: string }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'SEND_MESSAGE'; payload: Message }
  | { type: 'MARK_MESSAGE_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'COLLECT_DAILY_REWARD'; payload: number }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'ADD_BALANCE'; payload: number }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'CANCEL_ORDER'; payload: string }
  | { type: 'DELETE_USER_ACCOUNT' };

const defaultSettings: AppSettings = {
  appName: 'متجر العراق',
  currency: 'دينار عراقي (IQD)',
  deliveryFee: 'مجاني',
  minOrderAmount: '10,000 دينار',
  whatsappNumber: '+9647506747685',
  email: 'admin@iraqstore.com',
  location: 'بغداد، العراق',
};

const defaultState: AppState = {
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  products: sampleProducts,
  categories: sampleCategories,
  cart: [],
  orders: [],
  addresses: [],
  favorites: [],
  merchantApplications: [],
  ads: sampleAds,
  messages: [],
  notifications: [
    { id: '1', title: 'مرحباً بك!', message: 'مرحباً بك في متجر العراق. تصفح المنتجات واستمتع بالعروض الحصرية', type: 'system', read: false, createdAt: new Date().toISOString() },
    { id: '2', title: 'عروض اليوم', message: 'خصومات تصل إلى 50% على الإلكترونيات', type: 'promo', read: false, createdAt: new Date().toISOString() },
  ],
  transactions: [],
  dailyRewards: [
    { day: 1, points: 250, collected: false, available: true },
    { day: 2, points: 500, collected: false, available: false },
    { day: 3, points: 750, collected: false, available: false },
  ],
  searchQuery: '',
  appSettings: defaultSettings,
};

function loadState(): AppState {
  try {
    const saved = localStorage.getItem('iraq-store-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        searchQuery: '',
        appSettings: { ...defaultSettings, ...(parsed.appSettings || {}) },
      };
    }
  } catch {
    // ignore parse errors
  }
  return defaultState;
}

function saveState(state: AppState) {
  try {
    const toSave = { ...state, searchQuery: '' };
    localStorage.setItem('iraq-store-state', JSON.stringify(toSave));
  } catch {
    // ignore quota errors
  }
}

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isLoggedIn: true, isAdmin: action.payload.role === 'admin' };
    case 'LOGOUT':
      return { ...state, user: null, isLoggedIn: false, isAdmin: false, cart: [], favorites: [] };
    case 'UPDATE_USER':
      return { ...state, user: state.user ? { ...state.user, ...action.payload } : null };
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.product.id === action.payload.id);
      if (existing) {
        return { ...state, cart: state.cart.map(item => item.product.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item) };
      }
      return { ...state, cart: [...state.cart, { product: action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload) };
    case 'UPDATE_CART_QUANTITY':
      return { ...state, cart: state.cart.map(item => item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item).filter(item => item.quantity > 0) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_FAVORITE':
      return { ...state, favorites: state.favorites.includes(action.payload) ? state.favorites.filter(id => id !== action.payload) : [...state.favorites, action.payload] };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'ADD_ADDRESS':
      return { ...state, addresses: [...state.addresses, action.payload] };
    case 'REMOVE_ADDRESS':
      return { ...state, addresses: state.addresses.filter(a => a.id !== action.payload) };
    case 'SUBMIT_MERCHANT_APPLICATION':
      return { ...state, merchantApplications: [...state.merchantApplications, action.payload] };
    case 'UPDATE_MERCHANT_APPLICATION':
      return {
        ...state,
        merchantApplications: state.merchantApplications.map(app =>
          app.id === action.payload.id ? { ...app, status: action.payload.status } : app
        ),
      };
    case 'ADD_AD':
      return { ...state, ads: [...state.ads, action.payload] };
    case 'REMOVE_AD':
      return { ...state, ads: state.ads.filter(ad => ad.id !== action.payload) };
    case 'TOGGLE_AD':
      return { ...state, ads: state.ads.map(ad => ad.id === action.payload ? { ...ad, active: !ad.active } : ad) };
    case 'UPDATE_AD':
      return { ...state, ads: state.ads.map(ad => ad.id === action.payload.id ? action.payload : ad) };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'REMOVE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    case 'UPDATE_PRODUCT':
      return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'REMOVE_CATEGORY':
      return { ...state, categories: state.categories.filter(c => c.id !== action.payload) };
    case 'UPDATE_CATEGORY':
      return { ...state, categories: state.categories.map(c => c.id === action.payload.id ? action.payload : c) };
    case 'SEND_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'MARK_MESSAGE_READ':
      return { ...state, messages: state.messages.map(m => m.id === action.payload ? { ...m, read: true } : m) };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n) };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'COLLECT_DAILY_REWARD': {
      const newRewards = state.dailyRewards.map((r) => {
        if (r.day === action.payload) return { ...r, collected: true };
        if (r.day === action.payload + 1) return { ...r, available: true };
        return r;
      });
      const reward = state.dailyRewards.find(r => r.day === action.payload);
      return {
        ...state,
        dailyRewards: newRewards,
        user: state.user ? { ...state.user, points: state.user.points + (reward?.points || 0) } : null,
      };
    }
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'ADD_BALANCE':
      return { ...state, user: state.user ? { ...state.user, walletBalance: state.user.walletBalance + action.payload } : null };
    case 'UPDATE_ORDER_STATUS':
      return { ...state, orders: state.orders.map(o => o.id === action.payload.orderId ? { ...o, status: action.payload.status } : o) };
    case 'UPDATE_SETTINGS':
      return { ...state, appSettings: { ...state.appSettings, ...action.payload } };
    case 'CANCEL_ORDER':
      return { ...state, orders: state.orders.map(o => o.id === action.payload ? { ...o, status: 'cancelled' } : o) };
    case 'DELETE_USER_ACCOUNT':
      return { ...state, user: null, isLoggedIn: false, isAdmin: false, cart: [], favorites: [], orders: [], addresses: [] };
    default:
      return state;
  }
}

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
