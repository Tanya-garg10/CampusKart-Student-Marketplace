import { useRoute } from "wouter";
import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIRecommendations } from "@/components/AIRecommendations";
import {
  Heart, ShoppingCart, MessageCircle, MapPin, ShieldCheck, Star,
  ChevronLeft, Share2, Flame, Navigation, GraduationCap, Clock
} from "lucide-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const conditionColors: Record<string, string> = {
  "New": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Like New": "bg-blue-100 text-blue-700 border-blue-200",
  "Used": "bg-amber-100 text-amber-700 border-amber-200",
};

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const { products, addToCart, toggleWishlist, isInWishlist, trackView } = useShop();
  const { toast } = useToast();

  const product = products.find(p => p.id === params?.id);

  useEffect(() => {
    if (product) trackView(product);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">This item might have been removed or sold.</p>
        <Link href="/products"><Button>Back to Marketplace</Button></Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isTrustedSeller = product.rating >= 4.5 && product.isVerified;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "Product link copied to clipboard." });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi! I'm interested in your listing on CampusKart: "${product.title}" for ₹${product.price}. Is it still available?`);
    window.open(`https://wa.me/${product.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-muted/20 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to listings
          </Link>
          <div className="hidden sm:flex gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-foreground">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col lg:flex-row">

          {/* Left: Image */}
          <div className="lg:w-1/2 p-6 md:p-10 bg-muted/30 flex items-center justify-center relative">
            <div className="absolute top-6 left-6 flex gap-2 z-10 flex-wrap">
              {product.isUrgent && (
                <div className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-pulse">
                  <Flame className="w-3.5 h-3.5" /> Urgent Sale
                </div>
              )}
              <Badge variant="default" className="text-sm px-3 py-1 shadow-md bg-primary">
                {product.category}
              </Badge>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border shadow-sm ${conditionColors[product.condition] ?? "bg-white text-foreground border-border"}`}>
                {product.condition}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/80 backdrop-blur shadow-sm text-muted-foreground hover:text-foreground hover:scale-105 transition-all z-10"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full max-w-md h-auto rounded-2xl object-cover shadow-xl"
            />
          </div>

          {/* Right: Details */}
          <div className="lg:w-1/2 p-6 md:p-10 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 leading-tight">
              {product.title}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
              <span className="font-semibold text-sm">{product.rating}</span>
              <span className="text-muted-foreground text-sm">({product.reviewCount} reviews)</span>
              {isTrustedSeller && (
                <span className="ml-1 flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> Trusted Seller
                </span>
              )}
            </div>

            <div className="flex items-end gap-4 mb-6 pb-6 border-b border-border/60">
              <span className="text-4xl font-display font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground mb-1.5 line-through">
                ₹{Math.round(product.price * 1.5).toLocaleString()}
              </span>
              <Badge variant="outline" className="mb-1.5 text-accent border-accent/30 bg-accent/5">
                Save 33%
              </Badge>
            </div>

            <p className="text-muted-foreground text-base leading-relaxed mb-8">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                <Navigation className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Distance</div>
                  <div className="font-semibold text-sm text-primary">{product.distance}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                <MapPin className="w-5 h-5 text-foreground/60" />
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Meetup</div>
                  <div className="font-medium text-sm text-foreground">{product.location}</div>
                </div>
              </div>
            </div>

            {/* Seller Profile */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-border mb-6 bg-muted/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-lg font-bold shadow-md">
                  {product.seller.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground flex items-center gap-1.5 flex-wrap">
                    {product.seller}
                    {product.isVerified && (
                      <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-blue-200">
                        <GraduationCap className="w-3 h-3" /> Verified Student
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-amber-500 font-medium">
                    <Star className="w-3.5 h-3.5 fill-current mr-1" />
                    {product.rating} <span className="text-muted-foreground font-normal ml-1">({product.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">View Profile</Button>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="h-12 rounded-xl text-base shadow-lg shadow-primary/20 gap-2"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl text-base gap-2 border-2 hover:bg-muted/50"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  {wishlisted ? 'Wishlisted' : 'Wishlist'}
                </Button>
              </div>

              {/* WhatsApp Chat Button */}
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 h-12 rounded-xl bg-[#25D366] hover:bg-[#20bc5a] text-white font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </button>

              <button
                onClick={() => {
                  toast({ title: "Chat Opened", description: `Starting in-app conversation with ${product.seller}...` })
                }}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-secondary/30 text-secondary hover:bg-secondary/10 font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat in App
              </button>
            </div>

            {/* Urgency strip */}
            {product.isUrgent && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                <Clock className="w-4 h-4 shrink-0" />
                Limited time listing — Seller wants to sell quickly!
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">More like this</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        <AIRecommendations currentProduct={product} variant="detail" maxItems={4} />
      </div>
    </div>
  );
}
