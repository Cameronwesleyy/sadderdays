import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import crossLogo from "@/assets/cross-logo.png";
import yinyangLogo from "@/assets/yinyang-menu-logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const CornerNavigation = () => {
  const location = useLocation();
  const { items, setIsOpen } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide on Enter page and Home page
  if (location.pathname === "/" || location.pathname === "/home") {
    return null;
  }

  const navLinks = [
    { name: "MUSIC", path: "/music" },
    { name: "TOUR", path: "/tour" },
    { name: "LAB", path: "/lab" },
    { name: "MEMBERS", path: "/members" },
    { name: "ABOUT", path: "/about" },
    { name: "SHOP", path: "/merch" },
  ];

  return (
    <>
      {/* Menu Button - Centered at top (only when menu is closed) */}
      {!menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
          {/* Pink glow behind button - #FFEBF5 */}
          <div className="absolute inset-0 -z-10">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-16 rounded-full blur-[40px]"
              style={{ backgroundColor: "rgba(255, 235, 245, 0.8)" }}
            />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-10 rounded-full blur-[20px]"
              style={{ backgroundColor: "rgba(255, 235, 245, 1)" }}
            />
          </div>
          
          <button
            onClick={() => setMenuOpen(true)}
            className="text-[10px] font-medium tracking-widest-custom text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] hover:opacity-70 transition-opacity"
          >
            MENU
          </button>
        </motion.div>
      )}

      {/* Cart/Bag Button and Theme Toggle - Fixed top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 right-6 z-50 flex items-center gap-3"
      >
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(true)}
          className="relative text-foreground hover:opacity-70 transition-opacity"
        >
          <img src={crossLogo} alt="Cart" className="h-[60px] w-auto invert dark:invert-0" />
          {cartCount > 0 && (
            <span className="absolute -bottom-1 -right-2 text-[8px] font-medium tracking-widest-custom">
              {cartCount}
            </span>
          )}
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
            className="fixed inset-0 z-40 backdrop-blur-lg"
            style={{ backgroundColor: "rgba(255, 235, 245, 0.25)" }}
          >
            {/* Multiple pink glow orbs for ambient effect */}
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-60"
              style={{ backgroundColor: "#FFEBF5" }}
            />
            <div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-50"
              style={{ backgroundColor: "#FFEBF5" }}
            />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-40"
              style={{ backgroundColor: "#FFEBF5" }}
            />

            <div className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
              {/* Close button - centered with navigation */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.15, 
                  duration: 0.4, 
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
                onClick={() => setMenuOpen(false)}
                className="text-[10px] font-medium tracking-widest-custom text-foreground hover:opacity-70 transition-opacity mb-4"
              >
                CLOSE
              </motion.button>

              {/* Logo */}
              <Link 
                to="/home" 
                onClick={() => setMenuOpen(false)}
                className="hover:opacity-70 transition-opacity"
              >
                <img src={yinyangLogo} alt="Sadder Days" className="h-16 md:h-20 w-auto" />
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
                    {link.name === "SHOP" ? (
                      <div className="relative text-center group cursor-pointer">
                        <span className="text-2xl md:text-4xl font-display tracking-tighter-custom text-foreground/70 line-through decoration-2 group-hover:hidden">
                          SHOP
                        </span>
                        <span className="text-2xl md:text-4xl font-display tracking-tighter-custom text-foreground hidden group-hover:inline-block">
                          NOTIFY ME
                        </span>
                        <motion.span 
                          initial={{ opacity: 0, y: -8, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            delay: 0.3 + index * 0.05, 
                            duration: 0.5,
                            type: "spring",
                            bounce: 0.5
                          }}
                          className="block text-[10px] md:text-xs tracking-widest-custom whitespace-nowrap mt-2 text-foreground text-center"
                        >
                          FEB 2026
                        </motion.span>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`text-2xl md:text-4xl font-display tracking-tighter-custom transition-all duration-200 hover:scale-105 ${
                          location.pathname === link.path
                            ? "text-foreground"
                            : "text-foreground/70 hover:text-foreground"
                        }`}
                        style={{ 
                          textShadow: location.pathname === link.path ? "0 0 20px rgba(255, 235, 245, 0.8)" : "none"
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CornerNavigation;
