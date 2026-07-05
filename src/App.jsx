import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Project from "./pages/Project";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/project/zomato"
          element={<Project />}
        />
        <Route
          path="/project/ipl"
          element={<Project />}
        />

      </Routes>

    </BrowserRouter>

  );

}