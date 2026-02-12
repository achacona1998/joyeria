import Footer from "../../layout/footer";
import Layout from "../../layout/layout";
import Navbar from "../../layout/navbar";
import { Braz } from "./sections/Braz";
import { Dijes } from "./sections/Dijes";
import { Hero } from "./sections/Hero";
import { Seleccion } from "./sections/Seleccion";

export default function Home() {
  return (
    <Layout>
      <Navbar />
      <Hero />
      <Seleccion />
      <Braz />
      <Dijes />
      <Footer />
    </Layout>
  );
}
