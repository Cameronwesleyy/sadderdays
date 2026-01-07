import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import crossLogo from "@/assets/cross-logo.png";

const CornerNavigation = () => {
  const location = useLocation();
  const { items, setIsOpen } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Hide on Enter page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <>
      {/* Top Left - Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="corner-nav corner-nav-tl"
      >
        <Link to="/home" className="editorial-link">
          <span className="text-[10px] font-medium tracking-widest-custom text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            SADDER DAYS
          </span>
        </Link>
      </motion.div>

      {/* Top Right - Cart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="corner-nav corner-nav-tr"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="relative text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] hover:opacity-70 transition-opacity"
        >
          <img src={crossLogo} alt="Cart" className="h-6 w-auto invert" />
          {cartCount > 0 && (
            <span className="absolute -bottom-1 -right-2 text-[8px] font-medium tracking-widest-custom">
              {cartCount}
            </span>
          )}
        </button>
      </motion.div>

      {/* Bottom Left - Primary Nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="corner-nav corner-nav-bl"
      >
        <div className="absolute -inset-6 -z-10 rounded-full bg-secondary/80 blur-2xl" />
        <nav className="flex flex-col gap-2">
          {[
            { name: "SHOP", path: "/merch" },
            { name: "MUSIC", path: "/music" },
            { name: "TOUR", path: "/tour" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs tracking-widest-custom editorial-link drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] ${
                location.pathname === link.path
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Bottom Right - Secondary Nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="corner-nav corner-nav-br"
      >
        <div className="absolute -inset-6 -z-10 rounded-full bg-secondary/80 blur-2xl" />
        <nav className="flex flex-col gap-2 text-right">
          {[
            { name: "LAB", path: "/lab" },
            { name: "MEMBERS", path: "/members" },
            { name: "ABOUT", path: "/about" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs tracking-widest-custom editorial-link drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] ${
                location.pathname === link.path
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default CornerNavigation;
