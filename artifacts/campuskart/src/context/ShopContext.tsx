import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'New' | 'Like New' | 'Used';
  seller: string;
  description: string;
  location: string;
  distance: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isUrgent: boolean;
  whatsapp: string;
  coords: [number, number];
};

export type CartItem = Product & { quantity: number };

type ShopContextType = {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  recentlyViewed: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addProduct: (product: Omit<Product, 'id' | 'imageUrl' | 'rating' | 'reviewCount' | 'isVerified' | 'isUrgent' | 'distance' | 'whatsapp'>) => void;
  trackView: (product: Product) => void;
};

const initialProducts: Product[] = [
  { id: '1', title: "Engineering Mathematics Textbook", price: 450, category: "Books", condition: "Used", seller: "Rahul Sharma", description: "Standard textbook for first-year engineering. Slight highlights on a few pages but otherwise in great condition.", location: "Main Campus North", distance: "0.2 km away", imageUrl: "https://picsum.photos/400/300?random=1", rating: 4.8, reviewCount: 24, isVerified: true, isUrgent: true, whatsapp: "919876543210", coords: [28.5458, 77.1918] },
  { id: '2', title: "Physics Notes (Complete)", price: 150, category: "Notes", condition: "New", seller: "Priya Patel", description: "Comprehensive handwritten notes for Sem 2 Physics. Includes all derivations and important formulas.", location: "Hostel Block A", distance: "0.5 km away", imageUrl: "https://picsum.photos/400/300?random=2", rating: 5.0, reviewCount: 18, isVerified: true, isUrgent: false, whatsapp: "919876543211", coords: [28.5445, 77.1930] },
  { id: '3', title: "Casio FX-991 Calculator", price: 800, category: "Gadgets", condition: "Like New", seller: "Amit Kumar", description: "Fully functional scientific calculator. Required for most exams. Used for 2 semesters.", location: "Library Cafe", distance: "Same Campus", imageUrl: "https://picsum.photos/400/300?random=3", rating: 4.2, reviewCount: 9, isVerified: false, isUrgent: false, whatsapp: "919876543212", coords: [28.5452, 77.1925] },
  { id: '4', title: "Noise Cancelling Headphones", price: 1200, category: "Gadgets", condition: "New", seller: "Sneha Verma", description: "Brand new, unopened box. Great for studying in noisy hostels.", location: "South Campus", distance: "1.2 km away", imageUrl: "https://picsum.photos/400/300?random=4", rating: 4.9, reviewCount: 31, isVerified: true, isUrgent: true, whatsapp: "919876543213", coords: [28.5435, 77.1910] },
  { id: '5', title: "Data Structures Book", price: 350, category: "Books", condition: "Used", seller: "Karan Singh", description: "Classic DSA book. Good condition, no missing pages.", location: "CS Department", distance: "Same Campus", imageUrl: "https://picsum.photos/400/300?random=5", rating: 4.5, reviewCount: 16, isVerified: true, isUrgent: false, whatsapp: "919876543214", coords: [28.5460, 77.1935] },
  { id: '6', title: "Chemistry Lab Manual", price: 200, category: "Notes", condition: "New", seller: "Anjali Gupta", description: "Clean lab manual, never written in. Needed for Chem 101.", location: "Hostel Block C", distance: "0.8 km away", imageUrl: "https://picsum.photos/400/300?random=6", rating: 4.7, reviewCount: 12, isVerified: false, isUrgent: true, whatsapp: "919876543215", coords: [28.5440, 77.1940] },
  { id: '7', title: "Dell Laptop (i5)", price: 25000, category: "Gadgets", condition: "Used", seller: "Rohit Joshi", description: "8GB RAM, 256GB SSD. Works perfectly for coding and basic tasks. Battery lasts ~3 hours.", location: "Main Campus Gate", distance: "0.3 km away", imageUrl: "https://picsum.photos/400/300?random=7", rating: 4.1, reviewCount: 7, isVerified: true, isUrgent: false, whatsapp: "919876543216", coords: [28.5450, 77.1905] },
  { id: '8', title: "Scientific Calculator", price: 400, category: "Gadgets", condition: "New", seller: "Meera Nair", description: "Basic scientific calculator, unopened.", location: "Student Center", distance: "Same Campus", imageUrl: "https://picsum.photos/400/300?random=8", rating: 4.6, reviewCount: 5, isVerified: false, isUrgent: false, whatsapp: "919876543217", coords: [28.5455, 77.1915] },
  { id: '9', title: "English Literature Notes", price: 100, category: "Notes", condition: "Used", seller: "Vijay Kumar", description: "Photocopies of class notes for 2nd year English lit.", location: "Arts Block", distance: "1.5 km away", imageUrl: "https://picsum.photos/400/300?random=9", rating: 4.0, reviewCount: 8, isVerified: false, isUrgent: true, whatsapp: "919876543218", coords: [28.5430, 77.1945] },
  { id: '10', title: "Laptop Bag", price: 600, category: "Accessories", condition: "New", seller: "Aisha Rao", description: "Waterproof laptop backpack. Fits up to 15.6 inch laptops.", location: "Hostel Block B", distance: "0.6 km away", imageUrl: "https://picsum.photos/400/300?random=10", rating: 4.9, reviewCount: 22, isVerified: true, isUrgent: false, whatsapp: "919876543219", coords: [28.5448, 77.1932] },
  { id: '11', title: "USB Study Light", price: 250, category: "Accessories", condition: "New", seller: "Dev Malhotra", description: "Flexible USB LED light. Perfect for late night studying without waking roommates.", location: "Library", distance: "Same Campus", imageUrl: "https://picsum.photos/400/300?random=11", rating: 4.4, reviewCount: 13, isVerified: true, isUrgent: false, whatsapp: "919876543220", coords: [28.5452, 77.1920] },
  { id: '12', title: "Organic Chemistry Textbook", price: 500, category: "Books", condition: "Like New", seller: "Pooja Sharma", description: "Slightly worn cover but pages are completely intact.", location: "Science Block", distance: "0.4 km away", imageUrl: "https://picsum.photos/400/300?random=12", rating: 4.3, reviewCount: 11, isVerified: true, isUrgent: false, whatsapp: "919876543221", coords: [28.5443, 77.1928] },
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        toast({ title: "Removed from wishlist", description: `${product.title} removed.` });
        return prev.filter(item => item.id !== product.id);
      } else {
        toast({ title: "Added to wishlist ❤️", description: `${product.title} saved for later.` });
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(item => item.id === productId);

  const trackView = useCallback((product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 4);
    });
  }, []);

  const addProduct = (newProductData: Omit<Product, 'id' | 'imageUrl' | 'rating' | 'reviewCount' | 'isVerified' | 'isUrgent' | 'distance' | 'whatsapp'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: `https://picsum.photos/400/300?random=${products.length + 1}`,
      rating: 5.0,
      reviewCount: 0,
      isVerified: false,
      isUrgent: false,
      distance: "Same Campus",
      whatsapp: "919876543210",
      coords: [28.5450 + (Math.random() - 0.5) * 0.01, 77.1921 + (Math.random() - 0.5) * 0.01] as [number, number],
    };
    setProducts([newProduct, ...products]);
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      recentlyViewed,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      isInWishlist,
      addProduct,
      trackView,
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
