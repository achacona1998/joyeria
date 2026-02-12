import Footer from "../../layout/footer";
import Layout from "../../layout/layout";
import { Contenido } from "./sections/contenido";
import Navbar from "../../layout/navbar";

export default function Productos() {
  return (
    <Layout>
      <Navbar />
      <Contenido />
      <Footer />
    </Layout>
  );
}
