import { useState } from "react";
import { Header, Footer } from "./components/";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="section-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
