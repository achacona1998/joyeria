import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./routes/routes";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster richColors expand={false} position="bottom-right" />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
