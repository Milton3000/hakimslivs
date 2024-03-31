import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Categories from "./pages/Categories";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
            {/* Kanske behöver en till Route?  */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
