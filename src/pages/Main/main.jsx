import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/footer";
import { Header } from "../../components/Header/header";
import * as S from "./main.style";
export const MainPage = () => {
  return (
    <>
      <Header />
      <S.MainSearch>
        <S.SearchLogoLink href="#" target="_blank">
          <S.SearchLogoImg src="img/logo.png" alt="logo" />
        </S.SearchLogoLink>
        <S.SearchLogoMobLink href="#" target="_blank">
          <S.SearchLogoMobImg src="img/logo-mob.png" alt="logo" />
        </S.SearchLogoMobLink>
        <S.SearchForm action="#">
          <S.SearchText
            type="search"
            placeholder="Поиск по объявлениям"
            name="search"
          />
          <S.SearchTextMob
            type="search"
            placeholder="Поиск"
            name="search-mob"
          />
          <S.SearchBtn>Найти</S.SearchBtn>
        </S.SearchForm>
      </S.MainSearch>
      <S.MainContainer>
        <S.MainH2>Объявления</S.MainH2>
        <S.MainContent>
          <S.ContentCards>
            <S.CardsItem>
              <S.CardsCard>
                <S.CardImage>
                  <Link to="/">
                    <S.Img src="#" alt="picture" />
                  </Link>
                </S.CardImage>
                <S.CardContent>
                  <Link to="/">
                    <S.CardTitle>
                      Ракетка для большого тенниса Triumph Pro ST
                    </S.CardTitle>
                  </Link>
                  <S.CardPrice>2&nbsp;200&nbsp;₽</S.CardPrice>
                  <S.CardPlace>Санкт Петербург</S.CardPlace>
                  <S.CardDate>Сегодня в&nbsp;10:45</S.CardDate>
                </S.CardContent>
              </S.CardsCard>
            </S.CardsItem>
          </S.ContentCards>
        </S.MainContent>
      </S.MainContainer>
      <Footer />
    </>
  );
};
