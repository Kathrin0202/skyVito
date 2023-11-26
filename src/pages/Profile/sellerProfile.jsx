import { useState } from "react";
import { ContentCard } from "../../components/Cards/cards";
import { Footer } from "../../components/Footer/footer";
import { HeaderAuth } from "../../components/Header/header";
import { MainMenu } from "../../components/Menu/menu";
import * as S from "../../style/App.style";
import * as T from "./sellerProfile.style";
export const SellerProfile = ({userProfile, setUserProfile}) => {
  const [showPhone, setShowPhone] = useState(false);
  const clickShowPhone = () => {
    setShowPhone(true);
  };
  
  return (
    <>
      <HeaderAuth/>
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
                      <T.SellerImgImg
                        src={`http://localhost:8090/${userProfile?.avatar}`}
                        alt="avatar"
                      />
                    </T.SellerImg>
                  </T.SellerLeft>
                  <T.SellerRight>
                    <T.SellerTitle>{userProfile?.name}</T.SellerTitle>
                    <T.SellerCity>{userProfile?.city}</T.SellerCity>
                    <T.SellerInf>
                      Продает товары с{" "}
                      {new Date(userProfile?.sells_from).toLocaleString("ru", {
                        year: "numeric",
                        month: "long",
                      })}
                    </T.SellerInf>

                    <T.SellerImgMobBlock>
                      <T.SellerImgMob>
                        <a href="" target="_self">
                          <T.SellerImgMobImg src="#" alt="" />
                        </a>
                      </T.SellerImgMob>
                    </T.SellerImgMobBlock>

                    <T.ArticleBtn onClick={clickShowPhone}>
                      Показать&nbsp;телефон
                      <T.ArticleBtnSpan>
                        {!showPhone ? `+7 XXX XXX XX XX` : userProfile?.phone}
                      </T.ArticleBtnSpan>
                    </T.ArticleBtn>
                  </T.SellerRight>
                </T.ProfileSellSeller>
              </T.ProfileSellContent>
            </T.MainProfileSell>

            <T.MainTitle>Товары продавца</T.MainTitle>
          </T.MainCenterBlock>
          <T.MainContent>
            <ContentCard userId={userProfile?.id} />
          </T.MainContent>
        </T.MainContainer>
      </S.Main>
      <Footer />
    </>
  );
};
