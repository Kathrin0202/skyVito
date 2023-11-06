import { Route, Routes } from "react-router-dom";
import { MyArticle } from "./pages/Article/article";
import { Login } from "./pages/Login/login";
import { MainPage } from "./pages/Main/main";
import { NotFound } from "./pages/NotFound/notFound";
import { Profile } from "./pages/Profile/profile";
import { SellerProfile } from "./pages/SellerProfile/sellerProfile";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/myarcticle" element={<MyArticle />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sellerprofile" element={<SellerProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
