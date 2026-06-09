import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Chocolate Cake",
    description: "Rich chocolate cake made with premium cocoa.",
    price: 45,
    image: "/products/chocolate-cake.jpg",
    category: "Cakes",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Butter Croissant",
    description: "Fresh buttery croissant baked daily.",
    price: 3.5,
    image: "/products/croissant.jpg",
    category: "Viennoiseries",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Cookies Box",
    description: "A box of homemade cookies, perfect for sharing.",
    price: 18,
    image: "/products/cookies-box.jpg",
    category: "Cookies",
    isAvailable: true,
  },
];