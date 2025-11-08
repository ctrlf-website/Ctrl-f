import { Routes, Route } from "react-router-dom";
import { Preview, Home, CreateWeb, Login } from "./pages/index";
import { useAuthListener } from "./hooks/useAuthListener";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
   useAuthListener();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/crear-web" element={<CreateWeb />} />
      <Route path="/vista-previa" element={<Preview />} />
      <Route
  path="/create-web"
  element={
    <ProtectedRoute>
      <CreateWeb />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default App;
