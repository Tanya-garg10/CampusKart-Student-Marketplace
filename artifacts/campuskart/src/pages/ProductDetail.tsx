import { useRoute } from "wouter";
import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, MessageCircle, MapPin, ShieldCheck, Star, ChevronLeft, Share2 } from "lucide-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === params?.id);
  
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">This item might have been removed or sold.</p>
        <Link href="/products">
          <Button>Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "Product link copied to clipboard." });
  };

  return (
    <div className="bg-muted/20 min-h-screen pb-20">
      {/* Breadcrumb & Back */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to listings
          </Link>
          <div className="flex gap-2 text-sm text-muted-foreground hidden sm:flex">
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
          
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2 p-6 md:p-10 bg-muted/30 flex items-center justify-center relative">
            <div className="absolute top-6 left-6 flex gap-2 z-10">
              <Badge variant="default" className="text-sm px-3 py-1 shadow-md bg-primary">
                {product.category}
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1 shadow-md bg-white text-foreground">
                {product.condition}
              </Badge>
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
              className="w-full max-w-md h-auto rounded-2xl object-cover shadow-xl mix-blend-multiply"
            />
          </div>

          {/* Right: Details */}
          <div className="lg:w-1/2 p-6 md:p-10 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-end gap-4 mb-6 pb-6 border-b border-border/60">
              <span className="text-4xl font-display font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground mb-1.5 line-through">
                ₹{Math.round(product.price * 1.5).toLocaleString()}
              </span>
              <Badge variant="outline" className="mb-1.5 ml-2 text-accent border-accent/30 bg-accent/5">
                Save 33%
              </Badge>
            </div>

            <div className="prose prose-sm text-muted-foreground mb-8">
              <p className="text-base leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Location</div>
                  <div className="font-medium text-sm text-foreground">{product.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Safety</div>
                  <div className="font-medium text-sm text-foreground">Meet on Campus</div>
                </div>
              </div>
            </div>

            {/* Seller Profile Mini */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-border mb-8 bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-lg font-bold shadow-md">
                  {product.seller.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    {product.seller}
                    {product.isVerified && <ShieldCheck className="w-4 h-4 text-secondary" />}
                  </div>
                  <div className="flex items-center text-sm text-amber-500 font-medium">
                    <Star className="w-3.5 h-3.5 fill-current mr-1" />
                    {product.rating} <span className="text-muted-foreground font-normal ml-1">(12 reviews)</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">View Profile</Button>
            </div>

            {/* Actions */}
            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="h-14 rounded-xl text-base shadow-lg shadow-primary/20 gap-2"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="flex-1 h-14 rounded-xl text-base gap-2 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white"
                  onClick={() => {
                    toast({ title: "Chat Opened", description: `Starting conversation with ${product.seller}...` })
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className={`h-14 w-14 p-0 shrink-0 rounded-xl transition-colors ${wishlisted ? 'border-accent bg-accent/10 text-accent' : 'text-muted-foreground'}`}
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`w-6 h-6 ${wishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

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
      </div>
    </div>
  );
}
