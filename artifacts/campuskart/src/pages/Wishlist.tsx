import { Link } from "wouter";
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useShop();

  return (
    <div className="bg-muted/20 min-h-[calc(100vh-64px)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-accent/10 rounded-2xl text-accent">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Your Wishlist</h1>
            <p className="text-muted-foreground mt-1">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later</p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl border border-border p-12 text-center flex flex-col items-center justify-center min-h-[50vh] shadow-sm">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Your wishlist is empty</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
              Save items you're interested in so you don't lose track of them.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 h-14 shadow-md shadow-primary/20">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
