import { Route, Routes } from "react-router-dom";
import { Article } from "./pages/Article/article";
import { MyArticle } from "./pages/Article/myarticle";
import { Login, Registration } from "./pages/Login/login";
import { MainPage } from "./pages/Main/main";
import { NotFound } from "./pages/NotFound/notFound";
import { MyProfile } from "./pages/Profile/myprofile";
import { Profiled } from "./pages/Profile/profile";
import { ProtectedRoute } from "./protector-router";

export const AppRoutes = ({ ads, isLoading }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<MainPage ads={ads} isLoading={isLoading} />} />
      <Route
        path="/ads/:id"
        element={<Article ads={ads} isLoading={isLoading} />}
      />
      <Route path="/profile/:id" element={<Profiled ads={ads} />} />
      <Route
        element={
          <ProtectedRoute isAllowed={Boolean(localStorage.getItem("user"))} />
        }
      >
        <Route path="/ads/me" element={<MyArticle />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
