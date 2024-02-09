import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import DashboardLayout from "./layouts/Dashboard/index.jsx";

export default function Router () {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
};