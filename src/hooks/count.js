import { useState, useEffect } from "react";
import { getProductsByCategory } from "../data/products";

export default function useCounts(joya) {
  const [count, setcount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Simulate API delay slightly faster than list
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const products = getProductsByCategory(joya);
        setcount(products.length);
      } catch (error) {
        console.log("Error counting products", error);
        setcount(0);
      }
    };

    fetchCount();
  }, [joya]);

  return { count };
}
