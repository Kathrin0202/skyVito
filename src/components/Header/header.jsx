import { Link, useNavigate } from "react-router-dom";
import * as S from "./header.styled";
import img from "../../img/logo.png";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <S.Header>
      <S.HeaderNav>
        <S.HeaderBtnMainEnter onClick={() => navigate("/login")}>
          Вход в личный кабинет
        </S.HeaderBtnMainEnter>
      </S.HeaderNav>
    </S.Header>
  );
};

export const HeaderAuth = () => {
  const navigate = useNavigate();
  return (
    <S.Header>
      <S.HeaderNav>
        <S.HeaderLogo>
          <S.LogoMobLink>
            <Link to="/">
              <S.LogoMobImg src={img} alt="logo" />
            </Link>
          </S.LogoMobLink>
        </S.HeaderLogo>
        <S.HeaderBtnPutAd>Разместить объявление</S.HeaderBtnPutAd>
        <S.HeaderBtnLk onClick={() => navigate("/profile")}>
          Личный кабинет
        </S.HeaderBtnLk>
      </S.HeaderNav>
    </S.Header>
  );
};
