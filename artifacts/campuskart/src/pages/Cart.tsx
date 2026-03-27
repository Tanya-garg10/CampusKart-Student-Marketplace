import { Link } from "wouter";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/ShopContext";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useShop();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const platformFee = cart.length > 0 ? 25 : 0;
  const total = subtotal + platformFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      toast({
        title: "Order Placed Successfully!",
        description: "The sellers have been notified to arrange meetups.",
      });
      // In a real app, we'd clear cart here
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md text-center">Looks like you haven't added anything to your cart yet. Discover great deals from other students.</p>
        <Link href="/products">
          <Button size="lg" className="rounded-full px-8 h-14">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
            {cart.map((item, index) => (
              <div key={item.id} className={`p-6 flex flex-col sm:flex-row gap-6 ${index !== cart.length - 1 ? 'border-b border-border/50' : ''}`}>
                
                <div className="w-full sm:w-32 h-32 shrink-0 bg-muted rounded-xl overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors leading-tight">{item.title}</h3>
                    </Link>
                    <div className="font-display font-bold text-lg text-primary whitespace-nowrap">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-4">
                    Seller: <span className="font-medium text-foreground">{item.seller}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center bg-muted/50 rounded-lg p-1 border border-border/50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-foreground"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-foreground"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-border shadow-sm p-6 sm:p-8 sticky top-24">
            <h3 className="font-bold text-xl mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                <span className="font-medium text-foreground">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-medium text-foreground">₹{platformFee}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Student Discount</span>
                <span>Applied</span>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-display font-bold text-3xl text-primary">₹{total.toLocaleString()}</span>
            </div>
            
            <Button 
              size="lg" 
              className="w-full h-14 rounded-xl text-base shadow-lg shadow-primary/20 group"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              {!isCheckingOut && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              Secure payments powered by CampusKart
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
