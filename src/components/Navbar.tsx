import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ShoppingCart, Calendar, Brain } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Home", href: "/", icon: null },
    { name: "Dashboard", href: "/dashboard", icon: Brain },
    { name: "Store", href: "/store", icon: ShoppingCart },
    { name: "Appointments", href: "/appointments", icon: Calendar },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full"></div>
            <span className="font-bold text-xl text-foreground">ArogyaMix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth">
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to="/auth">
                Sign Up
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button variant="default" size="sm" className="w-full" asChild>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;