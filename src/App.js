import * as S from "./style/App.style";
import { AppRoutes } from "./routes";
import { useEffect, useState } from "react";
import { getAllAds, getTokenFromLocalStorage, getUser } from "./api";
import { useDispatch } from "react-redux";
import { setAuth} from "./store/slices/auth";
import { store } from "./store/store";
import { setUserId } from "./store/services/auth";

export const saveUserIdToState = (token) => {
  if (token) {
      getUser(token)
          .then((data) => {
              store.dispatch(setUserId(data.id));
          })
          .catch((error) => console.error(error));
  }
};
function App() {
  saveUserIdToState(getTokenFromLocalStorage());
  const [ads, setAds] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllAds()
      .then((ads) => {
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
