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
  const { isLoading } = useGetAllAdsQuery();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <S.Wrapper>
      <S.Container>
        <S.StyLeGlobal />
        <UserContext.Provider value={{ user: user, setUser }}>
          <AppRoutes isLoading={isLoading}/>
        </UserContext.Provider>
      </S.Container>
    </S.Wrapper>
  );
}

export default App;
