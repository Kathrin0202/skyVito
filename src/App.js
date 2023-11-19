import * as S from "./style/App.style";
import { AppRoutes } from "./routes";
import { createContext, useEffect, useState } from "react";
import { getAllAds } from "./api";
import { useDispatch } from "react-redux";
import { setAuth } from "./store/slices/auth";
export const UserContext = createContext("");
function App() {
  const [ads, setAds] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllAds()
      .then((ads) => {
        console.log(ads);
        setAds(ads);
        dispatch(
          setAuth({
            id: JSON.parse(sessionStorage.getItem("user"))?.id,
            email: JSON.parse(sessionStorage.getItem("user"))?.email,
            token: JSON.parse(sessionStorage.getItem("user"))?.access_token,
            name: JSON.parse(sessionStorage.getItem("user"))?.name,
          })
        );
      })
      .catch((error) => alert(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <S.Wrapper>
      <S.Container>
        <S.StyLeGlobal />
        <AppRoutes ads={ads} isLoading={isLoading} />
      </S.Container>
    </S.Wrapper>
  );
}

export default App;
