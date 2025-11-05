import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateWebForm from "./pages/CreateWeb.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crear-web" element={<CreateWebForm />} />
    </Routes>
  );
}

export default App;
