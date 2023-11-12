import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/footer";
import { HeaderAuth } from "../../components/Header/header";
import { MainMenu } from "../../components/Menu/menu";
import * as S from "../../style/App.style";
import * as T from "./sellerProfile.style";
export const SellerProfile = () => {
  return (
    <>
      <HeaderAuth />
      <S.Main>
        <T.MainContainer>
          <T.MainCenterBlock>
            <MainMenu />
            <T.MainH2>Профиль продавца</T.MainH2>
            <T.MainProfileSell>
              <T.ProfileSellContent>
                <T.ProfileSellSeller>
                  <T.SellerLeft>
                    <T.SellerImg>
                      <a href="" target="_self">
                        <T.SellerImgImg src="#" alt="" />
                      </a>
                    </T.SellerImg>
                  </T.SellerLeft>
                  <T.SellerRight>
                    <T.SellerTitle>Кирилл Матвеев</T.SellerTitle>
                    <T.SellerCity>Санкт-Петербург</T.SellerCity>
                    <T.SellerInf>Продает товары с августа 2021</T.SellerInf>

                    <T.SellerImgMobBlock>
                      <T.SellerImgMob>
                        <a href="" target="_self">
                          <T.SellerImgMobImg src="#" alt="" />
                        </a>
                      </T.SellerImgMob>
                    </T.SellerImgMobBlock>

                    <T.ArticleBtn>
                      Показать&nbsp;телефон
                      <T.ArticleBtnSpan>999999</T.ArticleBtnSpan>
                    </T.ArticleBtn>
                  </T.SellerRight>
                </T.ProfileSellSeller>
              </T.ProfileSellContent>
            </T.MainProfileSell>

            <T.MainTitle>Товары продавца</T.MainTitle>
          </T.MainCenterBlock>
          <T.MainContent>
            <T.ContentCards>
              <T.CardsItem>
                <T.CardsCard>
                  <T.CardImage>
                    <a href="" target="_blank">
                      <T.CardImageImg src="#" alt="picture" />
                    </a>
                  </T.CardImage>
                  <T.CardContent>
                    <a href="" target="_blank">
                      <T.CardTitle>
                        Ракетка для большого тенниса Triumph Pro ST
                      </T.CardTitle>
                    </a>
                    <T.CardPrice>2&nbsp;200&nbsp;₽</T.CardPrice>
                    <T.CardPlace>Санкт Петербург</T.CardPlace>
                    <T.CardDate>Сегодня в&nbsp;10:45</T.CardDate>
                  </T.CardContent>
                </T.CardsCard>
              </T.CardsItem>
            </T.ContentCards>
          </T.MainContent>
        </T.MainContainer>
      </S.Main>
      <Footer />
    </>
  );
};
