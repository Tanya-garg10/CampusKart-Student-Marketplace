import { Link, useLocation } from "wouter";
import { ShoppingCart, Heart, Menu, PlusCircle, Store, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/ShopContext";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const { cart, wishlist } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  const NavLinks = () => (
    <>
      <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-foreground/70'}`}>
        Home
      </Link>
      <Link href="/products" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/products' ? 'text-primary' : 'text-foreground/70'}`}>
        Browse Products
      </Link>
      <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/contact' ? 'text-primary' : 'text-foreground/70'}`}>
        Contact & Help
      </Link>
    </>
  );

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'glass-panel border-b bg-background/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Store className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Campus<span className="text-primary">Kart</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <NavLinks />
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-muted"
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Link href="/sell">
            <Button variant="outline" className="hidden sm:flex gap-2 rounded-xl border-primary/20 hover:bg-primary/5 text-primary hover:text-primary">
              <PlusCircle className="w-4 h-4" />
              <span>Sell Item</span>
            </Button>
          </Link>

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-accent/10 hover:text-accent">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge variant="default" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] bg-red-500 border-0">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge variant="default" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px]">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] flex flex-col gap-8 pt-12">
                <nav className="flex flex-col gap-4">
                  <NavLinks />
                </nav>
                <div className="flex flex-col gap-3 mt-auto pb-8">
                  <Button variant="outline" className="w-full gap-2 rounded-xl" onClick={toggleDarkMode}>
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                  <Link href="/sell">
                    <Button className="w-full gap-2 rounded-xl" size="lg">
                      <PlusCircle className="w-4 h-4" />
                      Start Selling
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
