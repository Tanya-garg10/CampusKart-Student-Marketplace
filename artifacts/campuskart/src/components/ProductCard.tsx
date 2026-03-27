import { Link } from "wouter";
import { Heart, ShieldCheck, MapPin, Star, Flame, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShop, type Product } from "@/context/ShopContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const conditionColors: Record<string, string> = {
  "New": "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "Like New": "bg-blue-100 text-blue-700 border border-blue-200",
  "Used": "bg-amber-100 text-amber-700 border border-amber-200",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useShop();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
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

        {/* Urgent Badge */}
        {product.isUrgent && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
            <Flame className="w-3 h-3" />
            Urgent Sale
          </div>
        )}

        {/* Condition Badge (bottom left if not urgent) */}
        {!product.isUrgent && (
          <div className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${conditionColors[product.condition] ?? "bg-white text-foreground"}`}>
            {product.condition}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm ${wishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-muted-foreground hover:bg-white hover:text-red-500'}`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Category pill */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="default" className="bg-primary/90 backdrop-blur-sm text-white text-xs">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors mb-1">
          <h3 className="font-semibold text-foreground line-clamp-2 leading-snug text-sm">{product.title}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map(s => (
            <Star key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{product.rating} ({product.reviewCount})</span>
        </div>

        <div className="font-bold text-lg text-primary mb-3">
          ₹{product.price.toLocaleString('en-IN')}
        </div>

        <div className="mt-auto space-y-2">
          {/* Distance */}
          <div className="flex items-center text-xs text-muted-foreground gap-1.5">
            <Navigation className="w-3 h-3 text-primary/70 shrink-0" />
            <span className="font-medium text-primary/80">{product.distance}</span>
            <span className="text-muted-foreground/60">·</span>
            <MapPin className="w-3 h-3 shrink-0 opacity-70" />
            <span className="truncate">{product.location}</span>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                {product.seller.charAt(0)}
              </div>
              <span className="text-xs font-medium text-foreground truncate max-w-[80px]">
                {product.seller}
              </span>
              {product.isVerified && (
                <div className="flex items-center gap-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  <span>Verified</span>
                </div>
              )}
            </div>

            <Link href={`/products/${product.id}`}>
              <Button size="sm" variant="secondary" className="rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors text-xs h-7 px-3">
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
