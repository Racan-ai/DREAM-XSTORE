import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { LandingPage } from "./screens/LandingPage";
import { ServicesPage } from "./screens/ServicesPage";
import { ProductPage } from "./screens/ProductPage";
import { CartPage } from "./screens/CartPage";
import { LoginPage } from "./screens/LoginPage";
import Callback from "./screens/LoginPage/Callback";
import SignupPage from "./screens/SignupPage/SignupPage";
import VerifyEmailTokenPage from "./screens/SignupPage/VerifyEmailTokenPage";
import VerificationLinkSentPage from "./screens/SignupPage/VerificationLinkSentPage";
import ProfilePage from "./screens/ProfilePage/ProfilePage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<LandingPage />} />
          <Route path="/contact" element={<LandingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:productSlug" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailTokenPage />} />
          <Route path="/verification-link-sent" element={<VerificationLinkSentPage />} />
          <Route path="/verify-email-token" element={<VerifyEmailTokenPage />} />
          <Route path="/api/auth/google/callback" element={<Callback />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Fallback route for any unmatched paths */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;