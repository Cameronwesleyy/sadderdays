import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import crossLogo from "@/assets/cross-logo.png";

const CornerNavigation = () => {
  const location = useLocation();
  const { items, setIsOpen } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide on Enter page
  if (location.pathname === "/") {
    return null;
  }

  const navLinks = [
    { name: "SHOP", path: "/merch" },
    { name: "MUSIC", path: "/music" },
    { name: "TOUR", path: "/tour" },
    { name: "LAB", path: "/lab" },
    { name: "MEMBERS", path: "/members" },
    { name: "ABOUT", path: "/about" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-background/30" : ""
      }`}
    >
      {/* Pink glow background */}
      <div className="absolute inset-0 -z-10 overflow-visible">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full h-24 bg-sd-pink/50 blur-[60px] rounded-full" />
        <div className="absolute -top-2 left-1/4 w-48 h-16 bg-sd-pink/40 blur-[40px] rounded-full" />
        <div className="absolute -top-2 right-1/4 w-48 h-16 bg-sd-pink/40 blur-[40px] rounded-full" />
      </div>
      
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo - Left */}
        <Link to="/home" className="editorial-link">
          <span className="text-[10px] font-medium tracking-widest-custom text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            SADDER DAYS
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="flex items-center gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] md:text-xs tracking-widest-custom editorial-link drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] ${
                location.pathname === link.path
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Cart - Right */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] hover:opacity-70 transition-opacity"
        >
          <img src={crossLogo} alt="Cart" className="h-10 w-auto invert" />
          {cartCount > 0 && (
            <span className="absolute -bottom-1 -right-2 text-[8px] font-medium tracking-widest-custom">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </motion.header>
  );
};

export default CornerNavigation;
