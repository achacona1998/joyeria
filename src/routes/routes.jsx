import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { Error } from "../pages/Error/error";
import Home from "../pages/Home/Home";
import { AnimatePresence } from "framer-motion";
import Productos from "../pages/Products/Products";
import Compra from "../pages/Carrito/Compra";
import ListProd from "../pages/ListProd/ListProd";
import Datalle from "../pages/Detalle/Detalle";

export default function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/*Home Display*/}
        <Route path="/" element={<Home />} />

        {/*Products Display*/}
        <Route path="/Catalogos" element={<Productos />} />

        {/*Cart Display*/}
        <Route path="/Compra" element={<Compra />} />

        {/* Ruta dinámica para los catálogos */}
        <Route path="/:categoria" element={<ListProd />} />

        {/* Ruta dinámica para los productos */}
        <Route path="/:categoria/:id" element={<Datalle />} />

        {/*Error Display*/}
        <Route path="*" element={<Error />} />
      </Routes>
    </AnimatePresence>
  );
}
