import * as S from "./style/App.style";
import { AppRoutes } from "./routes";

function App() {
  return (
      <S.Wrapper>
        <S.Container>
        <S.StyLeGlobal />
          <AppRoutes />
        </S.Container>
      </S.Wrapper>
  );
}

export default App;
