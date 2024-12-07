import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileNavigation from './components/MobileNavigation';
import Hero from './components/Hero';
import TrendingNow from './components/TrendingNow';
import ValueStore from './components/ValueStore';
import Bestsellers from './components/Bestsellers';
import ShopByPrice from './components/ShopByPrice';
import GiftSection from './components/GiftSection';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import WishlistPage from './pages/WishlistPage';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsExchange from './pages/ReturnsExchange';
import RingSizeGuide from './pages/RingSizeGuide';
import OurStory from './pages/OurStory';
import Sustainability from './pages/Sustainability';
import StoreLocator from './pages/StoreLocator';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import AdminBlog from './pages/AdminBlog';
import EditBlog from './pages/EditBlog';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import ScrollToTop from './components/ScrollToTop';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AddressForm from './pages/AddressForm';
import Settings from './pages/Settings';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen bg-black">
              <ScrollToTop />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections/:category" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/returns" element={<ReturnsExchange />} />
                <Route path="/size-guide" element={<RingSizeGuide />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/stores" element={<StoreLocator />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/address" element={<AddressForm />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/blog/edit/:id" element={<EditBlog />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <MobileNavigation />
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;