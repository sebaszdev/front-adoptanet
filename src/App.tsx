import { Route, Routes } from "react-router";
import Layout from "@/Layout";
import Catalog from "@/pages/Catalog";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Signup from "@/pages/Signup";
import ProtectedRoute from "./context/ProtectedRoute";
import Animals from "./pages/Animals";
import Profile from "./pages/Profile";

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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
