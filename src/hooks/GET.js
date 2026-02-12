import { useState, useEffect } from "react";
import { getProductsByCategory } from "../data/products";

export default function useGetJoyas(joya) {
  const [elementos, setElementos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoyas = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const data = getProductsByCategory(joya);
        setElementos(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchJoyas();
  }, [joya]);

  return { elementos, error, loading };
}
