import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Laptop, Headphones, Backpack, ArrowRight, ShieldCheck, Zap, Users, Tag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";

const testimonials = [
  { name: "Arjun Mehta", college: "IIT Delhi", text: "Sold my old textbooks in 2 days! CampusKart is way better than posting in WhatsApp groups.", avatar: "A" },
  { name: "Simran Kaur", college: "Delhi University", text: "Found all my first-year books at half the price. Saved ₹3,000 in one go!", avatar: "S" },
  { name: "Rohan Verma", college: "BITS Pilani", text: "The verified student badge makes me trust sellers so much more. Great platform!", avatar: "R" },
];

export default function Home() {
  const { products, recentlyViewed } = useShop();

  const categories = [
    { name: "Books", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
    { name: "Notes", icon: Backpack, color: "bg-orange-100 text-orange-600" },
    { name: "Gadgets", icon: Laptop, color: "bg-purple-100 text-purple-600" },
    { name: "Accessories", icon: Headphones, color: "bg-emerald-100 text-emerald-600" }
  ];

  const topDeals = products.slice(0, 4);
  const recentlyAdded = products.slice(4, 8);
  const underFiveHundred = products.filter(p => p.price <= 500).slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-20">

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-mesh.png`}
            alt="Background"
            className="w-full h-full object-cover opacity-60 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/40 dark:border-white/10 text-sm font-medium mb-8 shadow-sm text-primary"
          >
            <Zap className="w-4 h-4 fill-current text-accent" />
            <span>Over 5,000+ items sold this semester</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight"
          >
            Buy, Sell, and Save on <span className="text-gradient">Campus</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Your exclusive student marketplace for textbooks, notes, electronics, and dorm essentials. Safe, local, and student-budget friendly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-base shadow-lg shadow-primary/25 group">
                Shop Deals Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/sell">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-base border-2 bg-white/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black">
                Start Selling
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/products?category=${cat.name}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-muted/50 border border-border/50 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${cat.color} group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <span className="font-semibold text-foreground">{cat.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Deals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">🔥 Top Deals on Campus</h2>
              <p className="text-muted-foreground mt-2">Hurry, these won't last long!</p>
            </div>
            <Link href="/products" className="hidden sm:flex text-primary font-medium hover:underline items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDeals.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals Under ₹500 */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full mb-3 border border-emerald-200">
                <Tag className="w-3.5 h-3.5" /> Budget Friendly
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground">Best Deals Under ₹500</h2>
              <p className="text-muted-foreground mt-2">Great finds that won't break your budget</p>
            </div>
            <Link href="/products" className="hidden sm:flex text-primary font-medium hover:underline items-center gap-1">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {underFiveHundred.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="p-4">
              <Users className="w-10 h-10 mx-auto mb-4 opacity-80" />
              <div className="text-5xl font-display font-bold mb-2">5K+</div>
              <div className="text-primary-foreground/80 font-medium">Active Students</div>
            </div>
            <div className="p-4">
              <Laptop className="w-10 h-10 mx-auto mb-4 opacity-80" />
              <div className="text-5xl font-display font-bold mb-2">1,200+</div>
              <div className="text-primary-foreground/80 font-medium">Products Listed</div>
            </div>
            <div className="p-4">
              <ShieldCheck className="w-10 h-10 mx-auto mb-4 opacity-80" />
              <div className="text-5xl font-display font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80 font-medium">Verified Sellers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">Recently Added</h2>
              <p className="text-muted-foreground mt-2">Fresh listings from your peers</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyAdded.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium mb-2">
                  <Eye className="w-4 h-4" /> Your browsing history
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground">Recently Viewed</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold text-foreground">What Students Say</h2>
            <p className="text-muted-foreground mt-2">Real stories from real campus students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex mb-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-muted-foreground italic mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.college}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
