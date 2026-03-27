import { useMemo } from "react";
import { Link } from "wouter";
import { Sparkles, Brain, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useShop, type Product } from "@/context/ShopContext";

interface AIRecommendationsProps {
  currentProduct?: Product;
  maxItems?: number;
  variant?: "home" | "detail";
}

function scoreProduct(candidate: Product, context: {
  recentlyViewed: Product[];
  wishlist: Product[];
  currentProduct?: Product;
}): number {
  let score = 0;
  const { recentlyViewed, wishlist, currentProduct } = context;

  if (currentProduct && candidate.id === currentProduct.id) return -999;

  // Category match with current product
  if (currentProduct && candidate.category === currentProduct.category) score += 30;

  // Category frequency from recently viewed
  const viewedCategories = recentlyViewed.map(p => p.category);
  const categoryCount = viewedCategories.filter(c => c === candidate.category).length;
  score += categoryCount * 15;

  // In wishlist category
  const wishlistCategories = wishlist.map(p => p.category);
  if (wishlistCategories.includes(candidate.category)) score += 10;

  // Price range proximity (±30% of current product price)
  if (currentProduct) {
    const priceDiff = Math.abs(candidate.price - currentProduct.price) / currentProduct.price;
    if (priceDiff < 0.3) score += 20;
    else if (priceDiff < 0.6) score += 10;
  }

  // Rating boost
  score += candidate.rating * 5;

  // Verified seller bonus
  if (candidate.isVerified) score += 8;

  // Urgent deals get slight boost
  if (candidate.isUrgent) score += 5;

  // Newly added products (lower id = older, higher random id = newer in mock data)
  // Give slight boost to higher-numbered products
  score += Math.random() * 3; // tiny randomness for variety

  return score;
}

export function AIRecommendations({ currentProduct, maxItems = 4, variant = "home" }: AIRecommendationsProps) {
  const { products, recentlyViewed, wishlist } = useShop();

  const recommendations = useMemo(() => {
    const scored = products
      .filter(p => p.id !== currentProduct?.id)
      .map(p => ({
        product: p,
        score: scoreProduct(p, { recentlyViewed, wishlist, currentProduct }),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, maxItems)
      .map(s => s.product);

    return scored;
  }, [products, recentlyViewed, wishlist, currentProduct]);

  if (recommendations.length === 0) return null;

  const reasons: Record<string, string> = {};
  recommendations.forEach(p => {
    if (currentProduct && p.category === currentProduct.category) {
      reasons[p.id] = "Same category as this item";
    } else if (recentlyViewed.some(r => r.category === p.category)) {
      reasons[p.id] = "Based on your browsing";
    } else if (wishlist.some(w => w.category === p.category)) {
      reasons[p.id] = "Matches your wishlist";
    } else if (p.rating >= 4.7) {
      reasons[p.id] = "Top rated on campus";
    } else if (p.isUrgent) {
      reasons[p.id] = "Urgent deal — act fast!";
    } else {
      reasons[p.id] = "Popular this week";
    }
  });

  return (
    <section className={`${variant === "detail" ? "mt-12" : "py-20 bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20"}`}>
      <div className={variant === "detail" ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-display font-bold text-foreground">AI Picks for You</h2>
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" /> Smart
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Personalized based on your browsing, wishlist & campus trends
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendations.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="group bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 flex flex-col"
            >
              {/* AI reason tag */}
              <div className="absolute-none">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-violet-50 to-indigo-50 border-b border-violet-100 text-[11px] font-semibold text-violet-700">
                  <TrendingUp className="w-3 h-3" />
                  {reasons[product.id]}
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full px-2 py-1 text-xs font-bold text-primary">
                  #{idx + 1}
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-primary/90 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
                  <h3 className="font-semibold text-foreground text-sm line-clamp-2 leading-snug mb-2">{product.title}</h3>
                </Link>

                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                  <span className="font-bold text-base text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                  <Link href={`/products/${product.id}`}>
                    <button className="text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-violet-200 hover:border-violet-600">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it works note */}
        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-violet-500" />
          <span>Recommendations update as you browse, wishlist, and view products on CampusKart</span>
        </div>
      </div>
    </section>
  );
}
