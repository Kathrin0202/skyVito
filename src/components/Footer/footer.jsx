import { Link } from "react-router-dom";
import * as S from "./footer.styled";
export const Footer = () => {
  return (
    <S.Footer>
      <S.FooterContainer>
        <S.FooterImg>
          <Link to={"/"}>
            <S.Img src="img/icon_01.png" alt="home" />
          </Link>
        </S.FooterImg>
        <S.FooterImg>
          <Link to={"/login"}>
            <S.Img src="img/icon_02.png" alt="add" />
          </Link>
        </S.FooterImg>
        <S.FooterImg>
          <Link to={"/login"}>
            <S.Img src="img/icon_03.png" alt="login" />
          </Link>
        </S.FooterImg>
      </S.FooterContainer>
    </S.Footer>
  );
};
