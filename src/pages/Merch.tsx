import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useCart } from "@/context/CartContext";
import merch01 from "@/assets/merch-01.jpg";
import merch02 from "@/assets/merch-02.jpg";
import merch03 from "@/assets/merch-03.jpg";
import merch04 from "@/assets/merch-04.jpg";
import merch05 from "@/assets/merch-05.jpg";
import merch06 from "@/assets/merch-06.jpg";

const products = [
  { id: "lw-01", name: "LOUNGEWEAR PACK", variant: "01", price: 28, image: merch01 },
  { id: "lw-02", name: "LOUNGEWEAR PACK", variant: "02", price: 28, image: merch02 },
  { id: "lw-03", name: "LOUNGEWEAR PACK", variant: "03", price: 28, image: merch03 },
  { id: "lw-04", name: "LOUNGEWEAR PACK", variant: "04", price: 28, image: merch04 },
  { id: "lw-05", name: "LOUNGEWEAR PACK", variant: "05", price: 28, image: merch05 },
  { id: "lw-06", name: "LOUNGEWEAR PACK", variant: "06", price: 28, image: merch06 },
];

const digitalAlbum = {
  id: "digital-album",
  name: "YIN/YANG DIGITAL",
  price: 1.99,
  image: "",
};

const Merch = () => {
  const { addItem, setIsOpen } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    // Add product
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      variant: product.variant,
    });

    // Auto-bundle digital album
    addItem({
      id: digitalAlbum.id,
      name: digitalAlbum.name,
      price: digitalAlbum.price,
      quantity: 1,
      image: "",
      variant: "Digital",
    });

    setIsOpen(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Massive heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-massive font-display tracking-tighter-custom mb-4 sticky-heading"
          >
            SHOP
          </motion.h1>

          {/* Bundle notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[10px] tracking-widest-custom text-muted-foreground mb-16"
          >
            DIGITAL ALBUM ($1.99) INCLUDED WITH EVERY ORDER
          </motion.p>

          {/* Dense grid - Cargo style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => handleAddToCart(product)}
                className="cursor-pointer group"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info - minimal */}
                <div className="py-2 flex justify-between items-baseline">
                  <span className="text-[9px] tracking-widest-custom">
                    {product.variant}
                  </span>
                  <span className="text-[9px] tracking-widest-custom text-muted-foreground">
                    ${product.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Merch;
