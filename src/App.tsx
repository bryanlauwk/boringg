import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

export default function App() {
  return window.location.pathname === "/" ? <Index /> : <NotFound />;
}
