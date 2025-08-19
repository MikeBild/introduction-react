import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./components/AuthProvider.tsx";
import { StoreProvider } from "./components/StoreProvider.tsx";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import About from "./pages/About.tsx";
import App from "./pages/App.tsx";
import Login from "./pages/Login.tsx";
import AddTodo from "./pages/AddTodo.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter>
          <Link to="/about">About</Link>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todos/add" element={<AddTodo />} />
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  </StrictMode>
);
