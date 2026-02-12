import Footer from "../../layout/footer";
import Layout from "../../layout/layout";
import Navbar from "../../layout/navbar";
import { Lista } from "./components/Lista";

export default function ListProd() {
  return (
    <Layout>
      <Navbar />
      <Lista />
      <Footer />
    </Layout>
  );
}
