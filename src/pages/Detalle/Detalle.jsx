import Footer from "../../layout/footer";
import Layout from "../../layout/layout";
import Navbar from "../../layout/navbar";
import { Contenido } from "./components/contenido";

export default function Datalle() {
  return (
    <Layout>
      <Navbar />
      <Contenido />
      <Footer />
    </Layout>
  );
}
