import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Minus, Plus, Trash2, CreditCard, Banknote, Package } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartSheetProps {
  cartItems: Record<number, number>;
  products: Product[];
  updateCartQuantity: (productId: number, change: number) => void;
  getTotalItems: () => number;
}

const CartSheet = ({ cartItems, products, updateCartQuantity, getTotalItems }: CartSheetProps) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const cartProducts = products.filter(product => cartItems[product.id] > 0);
  
  const calculateSubtotal = () => {
    return cartProducts.reduce((sum, product) => 
      sum + (product.price * cartItems[product.id]), 0
    );
  };

  const deliveryFee = 50;
  const subtotal = calculateSubtotal();
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }

    if (!deliveryAddress.trim()) {
      toast({
        title: "Address required",
        description: "Please enter your delivery address",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      toast({
        title: "Phone number required",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order placed successfully!",
      description: `Your order of ₹${total} will be delivered soon. ${paymentMethod === 'cod' ? 'Pay on delivery.' : 'Payment link sent to your phone.'}`,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart ({getTotalItems()})
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            Review your items and complete your order
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {cartProducts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cartProducts.map((product) => (
                  <div key={product.id} className="flex gap-4 border-b pb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                      <p className="text-sm font-bold text-primary mt-1">₹{product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 p-0"
                          onClick={() => updateCartQuantity(product.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {cartItems[product.id]}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 p-0"
                          onClick={() => updateCartQuantity(product.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 ml-auto text-destructive"
                          onClick={() => updateCartQuantity(product.id, -cartItems[product.id])}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">₹{deliveryFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              <Separator />

              {/* Delivery Details */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Delivery Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="address" className="text-sm">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete delivery address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-sm">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special delivery instructions..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="cod" className="cursor-pointer flex items-center gap-2 font-medium">
                        <Banknote className="w-5 h-5 text-primary" />
                        Cash on Delivery
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pay with cash when your order arrives
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="online" id="online" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="online" className="cursor-pointer flex items-center gap-2 font-medium">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Online Payment
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pay securely using UPI, Card, or Net Banking
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Checkout Button */}
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Place Order - ₹{total}
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
