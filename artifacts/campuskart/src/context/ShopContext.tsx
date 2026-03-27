import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'New' | 'Used';
  seller: string;
  description: string;
  location: string;
  imageUrl: string;
  rating: number;
  isVerified: boolean;
};

export type CartItem = Product & { quantity: number };

type ShopContextType = {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addProduct: (product: Omit<Product, 'id' | 'imageUrl' | 'rating' | 'isVerified'>) => void;
};

const initialProducts: Product[] = [
  { id: '1', title: "Engineering Mathematics Textbook", price: 450, category: "Books", condition: "Used", seller: "Rahul Sharma", description: "Standard textbook for first-year engineering. Slight highlights on a few pages but otherwise in great condition.", location: "Main Campus North", imageUrl: "https://picsum.photos/400/300?random=1", rating: 4.8, isVerified: true },
  { id: '2', title: "Physics Notes (Complete)", price: 150, category: "Notes", condition: "New", seller: "Priya Patel", description: "Comprehensive handwritten notes for Sem 2 Physics. Includes all derivations and important formulas.", location: "Hostel Block A", imageUrl: "https://picsum.photos/400/300?random=2", rating: 5.0, isVerified: true },
  { id: '3', title: "Casio FX-991 Calculator", price: 800, category: "Gadgets", condition: "Used", seller: "Amit Kumar", description: "Fully functional scientific calculator. Required for most exams. Used for 2 semesters.", location: "Library Cafe", imageUrl: "https://picsum.photos/400/300?random=3", rating: 4.2, isVerified: false },
  { id: '4', title: "Noise Cancelling Headphones", price: 1200, category: "Gadgets", condition: "New", seller: "Sneha Verma", description: "Brand new, unopened box. Great for studying in noisy hostels.", location: "South Campus", imageUrl: "https://picsum.photos/400/300?random=4", rating: 4.9, isVerified: true },
  { id: '5', title: "Data Structures Book", price: 350, category: "Books", condition: "Used", seller: "Karan Singh", description: "Classic DSA book. Good condition, no missing pages.", location: "CS Department", imageUrl: "https://picsum.photos/400/300?random=5", rating: 4.5, isVerified: true },
  { id: '6', title: "Chemistry Lab Manual", price: 200, category: "Notes", condition: "New", seller: "Anjali Gupta", description: "Clean lab manual, never written in. Needed for Chem 101.", location: "Hostel Block C", imageUrl: "https://picsum.photos/400/300?random=6", rating: 4.7, isVerified: false },
  { id: '7', title: "Dell Laptop (i5)", price: 25000, category: "Gadgets", condition: "Used", seller: "Rohit Joshi", description: "8GB RAM, 256GB SSD. Works perfectly for coding and basic tasks. Battery lasts ~3 hours.", location: "Main Campus Gate", imageUrl: "https://picsum.photos/400/300?random=7", rating: 4.1, isVerified: true },
  { id: '8', title: "Scientific Calculator", price: 400, category: "Gadgets", condition: "New", seller: "Meera Nair", description: "Basic scientific calculator, unopened.", location: "Student Center", imageUrl: "https://picsum.photos/400/300?random=8", rating: 4.6, isVerified: false },
  { id: '9', title: "English Literature Notes", price: 100, category: "Notes", condition: "Used", seller: "Vijay Kumar", description: "Photocopies of class notes for 2nd year English lit.", location: "Arts Block", imageUrl: "https://picsum.photos/400/300?random=9", rating: 4.0, isVerified: false },
  { id: '10', title: "Laptop Bag", price: 600, category: "Accessories", condition: "New", seller: "Aisha Rao", description: "Waterproof laptop backpack. Fits up to 15.6 inch laptops.", location: "Hostel Block B", imageUrl: "https://picsum.photos/400/300?random=10", rating: 4.9, isVerified: true },
  { id: '11', title: "USB Study Light", price: 250, category: "Accessories", condition: "New", seller: "Dev Malhotra", description: "Flexible USB LED light. Perfect for late night studying without waking roommates.", location: "Library", imageUrl: "https://picsum.photos/400/300?random=11", rating: 4.4, isVerified: true },
  { id: '12', title: "Organic Chemistry Textbook", price: 500, category: "Books", condition: "Used", seller: "Pooja Sharma", description: "Slightly worn cover but pages are completely intact.", location: "Science Block", imageUrl: "https://picsum.photos/400/300?random=12", rating: 4.3, isVerified: true },
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
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
        toast({ title: "Added to wishlist", description: `${product.title} saved for later.` });
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const addProduct = (newProductData: Omit<Product, 'id' | 'imageUrl' | 'rating' | 'isVerified'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: `https://picsum.photos/400/300?random=${products.length + 1}`,
      rating: 5.0,
      isVerified: false,
    };
    setProducts([newProduct, ...products]);
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      isInWishlist,
      addProduct
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
