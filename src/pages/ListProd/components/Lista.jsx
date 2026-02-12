import { Link, useNavigate, useParams } from "react-router-dom";
import useGetJoyas from "../../../hooks/GET";
import { Cart } from "../../../layout/components/RedesSociales";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/contexto";
import { Precio } from "../../../utils/precioUtils";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Search, ArrowUpDown, ArrowDownUp } from "lucide-react";
import { motion } from "framer-motion";

export const Lista = () => {
  const { categoria } = useParams();
  const { handleAddCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "price-asc", "price-desc"

  const categoriaSinS = categoria.endsWith("s")
    ? categoria.slice(0, -1)
    : categoria;

  const { elementos, loading, error } = useGetJoyas(
    categoriaSinS.toLowerCase(),
  );

  const filteredAndSortedItems = elementos
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "price-asc") {
        return a.precio_unidad - b.precio_unidad;
      } else if (sortOrder === "price-desc") {
        return b.precio_unidad - a.precio_unidad;
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-light-50 dark:bg-dark-900">
        <div className="wrapper">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl h-[400px] bg-gray-200 dark:bg-dark-800 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center pt-32 pb-20 min-h-screen bg-light-50 dark:bg-dark-900 text-dark-800 dark:text-white">
        <h2 className="mb-4 font-serif text-3xl">Lo sentimos</h2>
        <p className="mb-6 text-lg opacity-70">
          No pudimos cargar los productos.
        </p>
        <Button onClick={() => window.location.reload()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen transition-colors duration-300 bg-light-50 dark:bg-dark-900">
      <div className="wrapper">
        <div className="flex flex-col gap-6 justify-between items-center mb-12 md:flex-row">
          <div>
            <span className="block mb-2 text-xs font-bold tracking-widest uppercase text-gold-500 md:text-sm">
              Colección
            </span>
            <h1 className="font-serif text-4xl capitalize md:text-6xl text-dark-800 dark:text-white">
              {categoria}
            </h1>
          </div>

          <div className="flex flex-col gap-4 w-full sm:flex-row md:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setSortOrder((prev) =>
                    prev === "price-asc" ? "" : "price-asc",
                  )
                }
                className={`p-3 rounded-xl border transition-all ${
                  sortOrder === "price-asc"
                    ? "bg-gold-500 text-white border-gold-500"
                    : "bg-white/50 dark:bg-black/40 border-gray-200 dark:border-white/10 text-gray-500 hover:border-gold-300"
                }`}
                title="Menor precio">
                <ArrowDownUp className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setSortOrder((prev) =>
                    prev === "price-desc" ? "" : "price-desc",
                  )
                }
                className={`p-3 rounded-xl border transition-all ${
                  sortOrder === "price-desc"
                    ? "bg-gold-500 text-white border-gold-500"
                    : "bg-white/50 dark:bg-black/40 border-gray-200 dark:border-white/10 text-gray-500 hover:border-gold-300"
                }`}
                title="Mayor precio">
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedItems.length > 0 ? (
            filteredAndSortedItems.map((item) => (
              <Link
                to={`/${categoriaSinS.toLowerCase()}/${item.id}`}
                key={item.id}
                className="block h-full">
                <Card
                  className={`h-full p-0 overflow-hidden group flex flex-col ${
                    item.cantUnidades == 0 ? "opacity-60 grayscale" : ""
                  }`}>
                  <div className="overflow-hidden relative aspect-square bg-light-100 dark:bg-dark-800">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />

                    {item.cantUnidades == 0 && (
                      <div className="flex absolute inset-0 z-10 justify-center items-center backdrop-blur-sm bg-black/40">
                        <span className="px-4 py-1 font-bold tracking-wider text-white bg-red-500 shadow-lg transform -rotate-12">
                          AGOTADO
                        </span>
                      </div>
                    )}

                    {item.cantUnidades > 0 && (
                      <div className="absolute right-4 bottom-4 z-10 opacity-0 transition-all duration-300 translate-y-12 group-hover:translate-y-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddCart(item, categoriaSinS.toLowerCase());
                          }}
                          className="flex justify-center items-center w-10 h-10 bg-white rounded-full shadow-lg transition-colors text-dark-900 hover:bg-gold-400 hover:text-white"
                          title="Añadir al carrito">
                          <Cart className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 gap-2 p-4 bg-white dark:bg-dark-800/50">
                    <div className="flex gap-2 justify-between items-start">
                      <h2 className="font-serif text-lg leading-tight transition-colors text-dark-800 dark:text-white group-hover:text-gold-500">
                        {item.name}
                      </h2>
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-auto border-t border-gray-100 dark:border-white/10">
                      <span className="text-xl font-bold text-dark-900 dark:text-gold-300">
                        <Precio precio={item.precio_unidad} />
                      </span>
                      {item.cantUnidades > 0 && item.cantUnidades < 5 && (
                        <span className="text-xs font-medium text-orange-500">
                          ¡Solo quedan {item.cantUnidades}!
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="flex flex-col col-span-full justify-center items-center py-20 opacity-50">
              <p className="font-serif text-xl">No se encontraron productos.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
