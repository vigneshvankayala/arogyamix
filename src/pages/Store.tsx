import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Star, 
  Heart, 
  ShoppingCart, 
  Plus,
  Minus,
  Package,
  Truck,
  Shield
} from "lucide-react";
import CartSheet from "@/components/CartSheet";
import foxtailMilletImg from "@/assets/product-foxtail-millet.jpg";
import himalayanAlmondsImg from "@/assets/product-himalayan-almonds.jpg";
import brownRiceImg from "@/assets/product-brown-rice.jpg";
import datesImg from "@/assets/product-dates.jpg";
import ragiImg from "@/assets/product-ragi.jpg";
import mixedDryFruitsImg from "@/assets/product-mixed-dryfruits.jpg";

const Store = () => {
  const [cartItems, setCartItems] = useState<Record<number, number>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Products", count: 45 },
    { id: "millets", name: "Millets", count: 12 },
    { id: "grains", name: "Grains", count: 15 },
    { id: "dryfruits", name: "Dry Fruits", count: 18 },
  ];

  const products = [
    {
      id: 1,
      name: "Organic Foxtail Millet",
      category: "millets",
      price: 180,
      originalPrice: 220,
      rating: 4.8,
      reviews: 124,
      image: foxtailMilletImg,
      description: "Premium quality foxtail millet, rich in protein and fiber",
      benefits: ["High Protein", "Gluten-Free", "Rich in Iron"],
      farmerName: "Ravi Kumar",
      location: "Andhra Pradesh",
      inStock: true,
      discount: 18
    },
    {
      id: 2,
      name: "Himalayan Almonds",
      category: "dryfruits", 
      price: 850,
      originalPrice: 950,
      rating: 4.9,
      reviews: 89,
      image: himalayanAlmondsImg,
      description: "Premium Himalayan almonds, naturally sweet and nutritious",
      benefits: ["Vitamin E", "Healthy Fats", "Brain Health"],
      farmerName: "Suresh Patel",
      location: "Kashmir",
      inStock: true,
      discount: 11
    },
    {
      id: 3,
      name: "Organic Brown Rice",
      category: "grains",
      price: 120,
      originalPrice: 140,
      rating: 4.7,
      reviews: 156,
      image: brownRiceImg, 
      description: "Organically grown brown rice with complete nutrition",
      benefits: ["High Fiber", "Magnesium", "Complex Carbs"],
      farmerName: "Lakshmi Devi",
      location: "Tamil Nadu",
      inStock: true,
      discount: 14
    },
    {
      id: 4,
      name: "Premium Dates",
      category: "dryfruits",
      price: 400,
      originalPrice: 480,
      rating: 4.6,
      reviews: 92,
      image: datesImg,
      description: "Medjool dates - natural sweetener packed with nutrients",
      benefits: ["Natural Energy", "Potassium", "Antioxidants"],
      farmerName: "Ahmed Khan",
      location: "Rajasthan",
      inStock: false,
      discount: 17
    },
    {
      id: 5,
      name: "Finger Millet (Ragi)",
      category: "millets",
      price: 160,
      originalPrice: 190,
      rating: 4.8,
      reviews: 203,
      image: ragiImg,
      description: "Calcium-rich finger millet for strong bones",
      benefits: ["High Calcium", "Gluten-Free", "Iron Rich"],
      farmerName: "Geetha Rao",
      location: "Karnataka",
      inStock: true,
      discount: 16
    },
    {
      id: 6,
      name: "Mixed Dry Fruits",
      category: "dryfruits",
      price: 1200,
      originalPrice: 1400,
      rating: 4.9,
      reviews: 67,
      image: mixedDryFruitsImg,
      description: "Premium mix of almonds, cashews, walnuts, and raisins",
      benefits: ["Complete Nutrition", "Heart Health", "Brain Power"],
      farmerName: "Collective",
      location: "Multiple States",
      inStock: true,
      discount: 14
    }
  ];

  const updateCartQuantity = (productId: number, change: number) => {
    setCartItems(prev => {
      const current = prev[productId] || 0;
      const newQuantity = Math.max(0, current + change);
      
      if (newQuantity === 0) {
        const { [productId]: removed, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [productId]: newQuantity };
    });
  };

  const getCartQuantity = (productId: number): number => cartItems[productId] || 0;
  const getTotalItems = (): number => Object.values(cartItems).reduce((sum: number, qty: number) => sum + qty, 0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Organic Store
              </h1>
              <p className="text-lg text-muted-foreground">
                Fresh from farmers to your doorstep
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <CartSheet 
                cartItems={cartItems} 
                products={products}
                updateCartQuantity={updateCartQuantity}
                getTotalItems={getTotalItems}
              />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for millets, grains, dry fruits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Categories */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts
                  .filter(product => category.id === "all" || product.category === category.id)
                  .map((product) => (
                    <Card key={product.id} className="overflow-hidden shadow-soft hover:shadow-glow transition-all duration-300 group">
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="aspect-square w-full object-cover"
                        />
                        
                        {product.discount > 0 && (
                          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                            {product.discount}% OFF
                          </Badge>
                        )}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <Badge variant="destructive">Out of Stock</Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="mb-2">
                          <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <span className="text-sm text-foreground ml-1">{product.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.benefits.slice(0, 2).map((benefit) => (
                            <Badge key={benefit} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            <span>From {product.farmerName}, {product.location}</span>
                          </div>
                        </div>
                        
                        {product.inStock ? (
                          <div className="flex items-center gap-2">
                            {getCartQuantity(product.id) === 0 ? (
                              <Button 
                                className="flex-1"
                                onClick={() => updateCartQuantity(product.id, 1)}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 flex-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCartQuantity(product.id, -1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="flex-1 text-center font-medium">
                                  {getCartQuantity(product.id)}
                                </span>
                                <Button
                                  size="sm"
                                  onClick={() => updateCartQuantity(product.id, 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Button disabled className="w-full">
                            Out of Stock
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">100% Organic</h3>
            <p className="text-sm text-muted-foreground">Certified organic products directly from farmers</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">Fresh products delivered within 2-3 days</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Fair Trade</h3>
            <p className="text-sm text-muted-foreground">Supporting farmers with fair pricing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;