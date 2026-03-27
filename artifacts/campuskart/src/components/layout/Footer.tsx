import { Link } from "wouter";
import { Store, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 text-primary p-2 rounded-xl">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Campus<span className="text-primary">Kart</span></span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The premier marketplace designed exclusively for college students to buy, sell, and save on campus essentials.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/products?category=Books" className="text-sm text-muted-foreground hover:text-primary transition-colors">Textbooks</Link></li>
              <li><Link href="/products?category=Notes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Study Notes</Link></li>
              <li><Link href="/products?category=Gadgets" className="text-sm text-muted-foreground hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=Accessories" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dorm Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/sell" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sell an Item</Link></li>
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Browse All</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ & Help</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Get the latest campus deals directly to your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Student email..." 
                className="flex-1 px-3 py-2 text-sm bg-muted rounded-lg border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 CampusKart. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
