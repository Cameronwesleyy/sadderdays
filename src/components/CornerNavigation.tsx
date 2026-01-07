import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

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
          <span className="text-[10px] font-medium tracking-widest-custom">
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
          className="text-[10px] font-medium tracking-widest-custom editorial-link"
        >
          BAG {cartCount > 0 && `(${cartCount})`}
        </button>
      </motion.div>

      {/* Bottom Left - Primary Nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="corner-nav corner-nav-bl"
      >
        <nav className="flex flex-col gap-1">
          {[
            { name: "SHOP", path: "/merch" },
            { name: "MUSIC", path: "/music" },
            { name: "TOUR", path: "/tour" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] tracking-widest-custom editorial-link ${
                location.pathname === link.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
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
        <nav className="flex flex-col gap-1 text-right">
          {[
            { name: "LAB", path: "/lab" },
            { name: "MEMBERS", path: "/members" },
            { name: "ABOUT", path: "/about" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] tracking-widest-custom editorial-link ${
                location.pathname === link.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
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
