import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import crossLogo from "@/assets/cross-logo.png";

const CornerNavigation = () => {
  const location = useLocation();
  const { items, setIsOpen } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      {/* Menu Button - Centered at top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        {/* Pink glow behind button */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-12 bg-sd-pink/60 blur-[30px] rounded-full" />
        </div>
        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[10px] font-medium tracking-widest-custom text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] hover:opacity-70 transition-opacity"
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </motion.div>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-md bg-sd-pink/20"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {/* Logo */}
              <Link 
                to="/home" 
                onClick={() => setMenuOpen(false)}
                className="editorial-link mb-8"
              >
                <span className="text-xs font-medium tracking-widest-custom text-foreground">
                  SADDER DAYS
                </span>
              </Link>

              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`text-2xl md:text-4xl font-display tracking-tighter-custom transition-all duration-200 hover:text-sd-pink hover:scale-105 ${
                        location.pathname === link.path
                          ? "text-sd-pink"
                          : "text-foreground/80"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Cart Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setMenuOpen(false);
                  setIsOpen(true);
                }}
                className="relative mt-8 text-foreground hover:opacity-70 transition-opacity"
              >
                <img src={crossLogo} alt="Cart" className="h-12 w-auto invert" />
                {cartCount > 0 && (
                  <span className="absolute -bottom-2 -right-2 text-[10px] font-medium tracking-widest-custom">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CornerNavigation;
