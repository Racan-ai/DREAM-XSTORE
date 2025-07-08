import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  selectedSize?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id && item.selectedSize === product.selectedSize && item.category === product.category);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id && item.selectedSize === product.selectedSize && item.category === product.category
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        updatedCart = [
          ...prevCart,
          {
            _id: product._id,
            title: product.title,
            price: product.price,
            quantity: product.quantity || 1,
            image: product.image || (product.images?.[0] ?? ""),
            category: product.category || '',
            selectedSize: product.selectedSize || '',
          },
        ];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}