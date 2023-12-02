import * as S from "./style/App.style";
import { AppRoutes } from "./routes";
import { createContext, useEffect, useState } from "react";
import { getTokenFromLocalStorage, getUser } from "./api";
import { store } from "./store/store";
import { setUserId, useGetAllAdsQuery } from "./store/services/auth";

export const UserContext = createContext("");

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
  const [ads, setAds] = useState(null);
  const { data, isLoading } = useGetAllAdsQuery();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    if (data) {
      setAds(data);
    }
  }, [data]);

  return (
    <S.Wrapper>
      <S.Container>
        <S.StyLeGlobal />
        <UserContext.Provider value={{ user: user, setUser }}>
          <AppRoutes ads={ads} isLoading={isLoading} setAds={setAds} />
        </UserContext.Provider>
      </S.Container>
    </S.Wrapper>
  );
}

export default App;
