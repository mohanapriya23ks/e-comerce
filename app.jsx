
import React from "react";
import AppRouter from "./AppRouter";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;