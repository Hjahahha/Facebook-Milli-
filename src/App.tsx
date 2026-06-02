import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import DealsPage from './pages/DealsPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import MessagesPage from './pages/MessagesPage';
import AddressesPage from './pages/AddressesPage';
import InvitePage from './pages/InvitePage';
import TransactionsPage from './pages/TransactionsPage';
import BusinessPlansPage from './pages/BusinessPlansPage';
import FavoritesPage from './pages/FavoritesPage';
import OrdersPage from './pages/OrdersPage';
import NotificationsPage from './pages/NotificationsPage';
import MyStorePage from './pages/MyStorePage';
import MyAdsPage from './pages/MyAdsPage';
import SearchPage from './pages/SearchPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import MerchantJoinPage from './pages/merchant/MerchantJoinPage';
import MerchantSuccessPage from './pages/merchant/MerchantSuccessPage';
import MerchantDashboardPage from './pages/merchant/MerchantDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CarsPage from './pages/CarsPage';
import RealEstatePage from './pages/RealEstatePage';
import ServicesPage from './pages/ServicesPage';
import ChatPage from './pages/ChatPage';

function AppContent() {
  const location = useLocation();
  const hideNav = ['/login', '/register', '/merchant-join', '/merchant-success'].includes(location.pathname);

  return (
    <div className="max-w-lg mx-auto min-h-screen shadow-xl relative" style={{ background: '#050505' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/addresses" element={<AddressesPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/business-plans" element={<BusinessPlansPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/my-store" element={<MyStorePage />} />
        <Route path="/my-ads" element={<MyAdsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
        <Route path="/category/:categoryId/:subId" element={<CategoryDetailPage />} />
        <Route path="/merchant-join" element={<MerchantJoinPage />} />
        <Route path="/merchant-success" element={<MerchantSuccessPage />} />
        <Route path="/merchant-dashboard" element={<MerchantDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/sell" element={<MyStorePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/realestate" element={<RealEstatePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/language" element={<LanguagePlaceholder />} />
        <Route path="/section/:id" element={<SectionPlaceholder />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </div>
  );
}

function LanguagePlaceholder() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#050505' }}>
      <p className="text-4xl mb-4">🌐</p>
      <h2 className="text-lg font-bold mb-2" style={{ color: '#F5F5F5' }}>اللغة</h2>
      <p style={{ color: '#707070' }} className="text-center">العربية هي اللغة الافتراضية</p>
      <div className="mt-6 space-y-3 w-full max-w-xs">
        {['العربية', 'English', 'کوردی'].map(lang => (
          <button key={lang} className="w-full py-3 rounded-xl border text-sm font-semibold" style={lang === 'العربية' ? { background: '#00D4FF', color: '#050505', borderColor: '#00D4FF' } : { background: '#111', color: '#B0B0B0', borderColor: 'rgba(255,255,255,0.06)' }}>
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#050505' }}>
      <p className="text-4xl mb-4">🏗️</p>
      <h2 className="text-lg font-bold" style={{ color: '#F5F5F5' }}>قريباً</h2>
      <p className="text-center mt-2" style={{ color: '#707070' }}>هذا القسم قيد التطوير</p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#050505' }}>
      <p className="text-6xl mb-4" style={{ color: '#00D4FF' }}>404</p>
      <h2 className="text-lg font-bold" style={{ color: '#F5F5F5' }}>الصفحة غير موجودة</h2>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
