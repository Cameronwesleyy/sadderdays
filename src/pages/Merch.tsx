import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useCart } from "@/context/CartContext";
import merchTeeBlack from "@/assets/merch-tee-black.jpg";
import merchTeeCream from "@/assets/merch-tee-cream.jpg";
import merchHoodieBlack from "@/assets/merch-hoodie-black.jpg";
import merchHoodieGrey from "@/assets/merch-hoodie-grey.jpg";

const products = [
  {
    id: "tee-haze-black",
    name: "HAZE TEE",
    variant: "Black",
    price: 45,
    image: merchTeeBlack,
  },
  {
    id: "tee-haze-cream",
    name: "HAZE TEE",
    variant: "Cream",
    price: 45,
    image: merchTeeCream,
  },
  {
    id: "hoodie-fog-black",
    name: "FOG HOODIE",
    variant: "Black",
    price: 95,
    image: merchHoodieBlack,
  },
  {
    id: "hoodie-fog-grey",
    name: "FOG HOODIE",
    variant: "Charcoal",
    price: 95,
    image: merchHoodieGrey,
  },
  {
    id: "cap-shadow",
    name: "SHADOW CAP",
    variant: "One Size",
    price: 35,
    image: merchTeeBlack, // Reusing image as placeholder
  },
  {
    id: "poster-yinyang",
    name: "YIN/YANG POSTER",
    variant: "18x24",
    price: 25,
    image: merchTeeCream, // Reusing image as placeholder
  },
];

const Merch = () => {
  const { addItem, setIsOpen } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      variant: product.variant,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-widest-custom text-muted-foreground mb-4">
              OFFICIAL STORE
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter-custom mb-6">
              MERCH
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Every purchase includes the digital album. Wear the haze.
            </p>
          </motion.div>

          {/* Bundle Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-ethereal p-6 mb-12 text-center"
          >
            <p className="text-xs tracking-widest-custom text-muted-foreground">
              BUNDLE & SAVE — DIGITAL ALBUM ($1.99) INCLUDED WITH EVERY ORDER
            </p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="card-ethereal overflow-hidden">
                  {/* Image */}
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-4 right-4 p-3 bg-foreground text-background opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ShoppingBag size={16} />
                    </motion.button>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium tracking-tight">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.variant}</p>
                      </div>
                      <p className="font-medium">${product.price}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAddToCart(product)}
                      className="w-full mt-4 py-3 border border-border text-xs tracking-widest-custom hover:bg-foreground hover:text-background transition-colors"
                    >
                      ADD TO CART
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cart Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 p-4 bg-foreground text-background rounded-full shadow-lg hover:scale-105 transition-transform md:hidden"
          >
            <ShoppingBag size={20} />
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
};

export default Merch;
