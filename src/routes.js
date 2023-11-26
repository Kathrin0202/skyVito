import { Route, Routes } from "react-router-dom";
import { Article } from "./pages/Article/article";
import { MyArticle } from "./pages/Article/myarticle";
import { Login, Registration } from "./pages/Login/login";
import { MainPage } from "./pages/Main/main";
import { NotFound } from "./pages/NotFound/notFound";
import { MyProfile } from "./pages/Profile/myprofile";
import { Profiled } from "./pages/Profile/profiled";
import { SellerProfile } from "./pages/Profile/sellerProfile";
import { ProtectedRoute } from "./protector-router";

export const AppRoutes = ({ ads, isLoading, setAds }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route
        path="/"
        element={<MainPage ads={ads} isLoading={isLoading} setAds={setAds} />}
      />
      <Route
        path="/ads/:id"
        element={<Article ads={ads} isLoading={isLoading} setAds={setAds} />}
      />
      <Route
        path="/profile/:id"
        element={<Profiled ads={ads} setAds={setAds} />}
      />
      <Route path="/ads/me" element={<MyArticle ads={ads} setAds={setAds} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
