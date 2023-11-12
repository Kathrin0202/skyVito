import * as S from "./style/App.style";
import { AppRoutes } from "./routes";
import { createContext, useEffect, useState } from "react";
import { getAllAds } from "./api";
export const UserContext = createContext("");
function App() {
  const [ads, setAds] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    getAllAds()
      .then((ads) => {
        console.log(ads);
        setAds(ads);
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
        <UserContext.Provider value={{ user: user, setUser }}>
          <AppRoutes ads={ads} isLoading={isLoading} />
        </UserContext.Provider>
      </S.Container>
    </S.Wrapper>
  );
}

export default App;
