import { Link } from "wouter";
import { Heart, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShop, type Product } from "@/context/ShopContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useShop();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Link href={`/products/${product.id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-foreground hover:bg-white">
            {product.condition}
          </Badge>
          <Badge variant="default" className="bg-primary/90 backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${wishlisted ? 'bg-accent text-white shadow-md' : 'bg-white/80 text-muted-foreground hover:bg-white hover:text-accent'}`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-4">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">{product.title}</h3>
          </Link>
        </div>
        
        <div className="font-display font-bold text-xl text-primary mb-4">
          ₹{product.price.toLocaleString('en-IN')}
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            <span className="truncate">{product.location}</span>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                {product.seller.charAt(0)}
              </div>
              <span className="text-sm font-medium text-foreground truncate max-w-[100px]">
                {product.seller}
              </span>
              {product.isVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              )}
            </div>
            
            <Link href={`/products/${product.id}`}>
              <Button size="sm" variant="secondary" className="rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors">
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
