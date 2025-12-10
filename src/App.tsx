import { Route, Routes } from "react-router";
import ProtectedRoute from "@/context/ProtectedRoute";
import Layout from "@/Layout";
import Animals from "@/pages/Animals";
import Catalog from "@/pages/Catalog";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Signup from "@/pages/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route
          path="/animals"
          element={
            <ProtectedRoute>
              <Animals />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
