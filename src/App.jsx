import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Author from "./pages/Author";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:itemId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
