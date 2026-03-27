import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";

export default function Products() {
  const { products } = useShop();
  
  // Parse URL query params for initial category
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get('category') || 'All';

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [condition, setCondition] = useState("All");
  const [priceRange, setPriceRange] = useState([5000]);

  const categories = ["All", "Books", "Notes", "Gadgets", "Accessories"];
  const conditions = ["All", "New", "Like New", "Used"];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                            p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === "All" || p.category === category;
      const matchesCond = condition === "All" || p.condition === condition;
      const matchesPrice = p.price <= priceRange[0];
      return matchesSearch && matchesCat && matchesCond && matchesPrice;
    });
  }, [products, search, category, condition, priceRange]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setCondition("All");
    setPriceRange([5000]);
  };

  const activeFilterCount = (category !== "All" ? 1 : 0) + (condition !== "All" ? 1 : 0) + (priceRange[0] < 5000 ? 1 : 0) + (search ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-muted-foreground hover:text-destructive">
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-foreground">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <Badge 
              key={c}
              variant={category === c ? "default" : "outline"}
              className={`cursor-pointer px-3 py-1.5 text-sm ${category === c ? 'bg-primary shadow-md shadow-primary/20' : 'hover:border-primary/50'}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-foreground">Condition</label>
        <Select value={condition} onValueChange={setCondition}>
          <SelectTrigger className="w-full rounded-xl">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            {conditions.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Max Price</label>
          <span className="text-sm font-bold text-primary">₹{priceRange[0]}</span>
        </div>
        <Slider 
          value={priceRange} 
          max={5000} 
          step={100} 
          onValueChange={setPriceRange} 
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹0</span>
          <span>₹5000+</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-muted/30 min-h-[calc(100vh-64px)] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Browse Marketplace</h1>
            <p className="text-muted-foreground mt-2 text-lg">Find what you need from fellow students.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, notes..." 
                className="pl-10 h-12 rounded-xl bg-white border-border shadow-sm focus-visible:ring-primary"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 w-12 md:hidden rounded-xl relative bg-white">
                  <SlidersHorizontal className="w-5 h-5" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <FilterContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-border shadow-sm">
              <FilterContent />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  We couldn't find anything matching your current filters. Try adjusting your search or clearing filters.
                </p>
                <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-4 text-sm text-muted-foreground font-medium">
                  Showing {filteredProducts.length} results
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
}
