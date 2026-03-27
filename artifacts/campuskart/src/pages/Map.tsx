import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "wouter";
import { useShop, type Product } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, ShoppingCart, MapPin, Flame, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "leaflet/dist/leaflet.css";

// Fix leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const createCustomIcon = (color: string, isUrgent: boolean) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        background:${color};
        width:36px;height:36px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.35);
        display:flex;align-items:center;justify-content:center;
        ${isUrgent ? 'animation:pulse 1.5s infinite;' : ''}
      ">
        <div style="transform:rotate(45deg);font-size:14px">
          ${isUrgent ? '🔥' : '📍'}
        </div>
      </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

const categoryColors: Record<string, string> = {
  Books: "#3b82f6",
  Notes: "#f97316",
  Gadgets: "#8b5cf6",
  Accessories: "#10b981",
};

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(center, 16); }, [center]);
  return null;
}

export default function Map() {
  const { products, addToCart } = useShop();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["All", "Books", "Notes", "Gadgets", "Accessories"];

  const filteredProducts = products.filter(p =>
    selectedCategory === "All" || p.category === selectedCategory
  );

  const campusCenter: [number, number] = [28.5450, 77.1921];

  return (
    <div className="min-h-screen bg-muted/20 pb-0">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Campus Deal Map
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Showing <strong className="text-primary">{filteredProducts.length}</strong> listings around your campus — click any pin!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white text-foreground border-border hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)]">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-80 shrink-0 bg-white border-r border-border overflow-y-auto">
          <div className="p-4 border-b border-border bg-muted/20">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {filteredProducts.length} listings nearby
            </p>
          </div>
          <div className="divide-y divide-border">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`w-full text-left p-4 hover:bg-primary/5 transition-colors flex gap-3 ${selectedProduct?.id === product.id ? 'bg-primary/10 border-l-2 border-primary' : ''}`}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-14 h-14 object-cover rounded-xl shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    {product.isUrgent && <Flame className="w-3 h-3 text-red-500 shrink-0" />}
                    <p className="text-sm font-semibold text-foreground truncate">{product.title}</p>
                  </div>
                  <p className="font-bold text-primary text-sm">₹{product.price.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Navigation className="w-3 h-3" />
                    {product.distance}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={campusCenter}
            zoom={16}
            className="w-full h-full z-0"
            style={{ height: "100%" }}
          >
            {selectedProduct && (
              <MapController center={selectedProduct.coords} />
            )}

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredProducts.map(product => (
              <Marker
                key={product.id}
                position={product.coords}
                icon={createCustomIcon(
                  categoryColors[product.category] ?? "#6366f1",
                  product.isUrgent
                )}
                eventHandlers={{ click: () => setSelectedProduct(product) }}
              >
                <Popup maxWidth={260} className="campuskart-popup">
                  <div className="p-1 min-w-[220px]">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-28 object-cover rounded-lg mb-3"
                    />
                    <div className="flex gap-1.5 mb-2 flex-wrap">
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        product.condition === 'New' ? 'bg-emerald-100 text-emerald-700' :
                        product.condition === 'Like New' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'}`}>
                        {product.condition}
                      </span>
                      {product.isUrgent && (
                        <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Flame className="w-3 h-3" /> Urgent
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight mb-1">{product.title}</h3>
                    <p className="font-bold text-lg text-indigo-600 mb-1">₹{product.price.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                      <Navigation className="w-3 h-3" /> {product.distance} · {product.location}
                    </p>
                    <div className="flex gap-2">
                      <Link href={`/products/${product.id}`} className="flex-1">
                        <button className="w-full text-xs font-semibold bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                          View Details
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          addToCart(product);
                          toast({ title: "Added!", description: `${product.title} added to cart.` });
                        }}
                        className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-border p-3 z-[1000]">
            <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">Legend</p>
            <div className="space-y-1.5">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                  <span className="text-xs text-muted-foreground">{cat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1 border-t border-border/50 mt-1">
                <Flame className="w-3 h-3 text-red-500" />
                <span className="text-xs text-muted-foreground">Urgent Sale</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
