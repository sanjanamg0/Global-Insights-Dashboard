import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem("token"))
  );

  return isAuth ? (
    <Dashboard setIsAuth={setIsAuth} />
  ) : (
    <Login setIsAuth={setIsAuth} />
  );
}