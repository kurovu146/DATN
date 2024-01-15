import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Verify from "../pages/verify";
import NotFound from "../components/NotFound";

const RouterDom = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<Home />} />
        <Route path="/questions" element={<Home />} />
        <Route path="/questions/:questionId" element={<Home />} />
        <Route path="/questions/tag/:tagName" element={<Home />} />
        <Route path="/tags" element={<Home />} />
        <Route path="/companies" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterDom;
