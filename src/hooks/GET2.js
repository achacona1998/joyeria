import { useState, useEffect } from "react";
import { getProductById } from "../data/products";

export default function useGetJoya(joya, id) {
  const [elemento, setElemento] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoya = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const data = getProductById(id);
        if (!data) {
          throw new Error("Producto no encontrado");
        }
        setElemento(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJoya();
  }, [joya, id]);

  return { elemento, error, loading };
}
