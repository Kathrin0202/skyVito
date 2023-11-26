import { Footer } from "../../components/Footer/footer";
import { Link, useParams } from "react-router-dom";
import { HeaderAuth } from "../../components/Header/header";
import { MainMenu } from "../../components/Menu/menu";
import * as S from "../../style/App.style";
import * as T from "./article.styled";
import { useState } from "react";
import noPhoto from "../../img/no-photo.avif";
import { useGetAdsByIdQuery } from "../../store/services/auth";
import { useAuthSelector } from "../../store/slices/auth";
import { EditAds } from "../../modal/AddAds/editAds";
export const Article = () => {
  const adsId = parseInt(useParams().id);
  const { data, isLoading } = useGetAdsByIdQuery(adsId);
  const [showPhone, setShowPhone] = useState(false);
  const clickShowPhone = () => {
    setShowPhone(true);
  };
  const auth = useAuthSelector();
  const [openFormEditAds, setOpenFormEditAds] = useState(false);
  return (
    <>
      {openFormEditAds && (
        <EditAds setOpenFormEditAds={setOpenFormEditAds} ads={data} />
      )}
      <HeaderAuth adsData={data} />
      <S.Main>
        <T.MainContainer>
          {isLoading ? (
            <T.ArticleTitle>Объявление загружается...</T.ArticleTitle>
          ) : (
            <T.MainCenterBlock>
              <MainMenu />
              <T.MainArtic>
                <T.ArticContent>
                  <T.ArticleLeft>
                    <T.ArticleFillImg>
                      <T.ArticleImg>
                        {data.images.length !== 0 ? (
                          <T.ArticleImgImg
                            src={`http://localhost:8090/${data.images[0].url}`}
                          />
                        ) : (
                          <T.ArticleImgImg src={noPhoto} alt="noPhoto" />
                        )}
                      </T.ArticleImg>
                      <T.ArticleImgBar>
                        {data.images.map((imag, index) => {
                          <T.ArticleImgBarDiv key={index}>
                            <T.ArticleImgBarDivImg
                              src={`http://localhost:8090/${imag.url}`}
                              alt=""
                            />
                          </T.ArticleImgBarDiv>;
                        })}
                      </T.ArticleImgBar>
                      <T.ArticleImgBarMob>
                        <T.ImgBarMobCircleActive></T.ImgBarMobCircleActive>
                        <T.ImgBarMobCircle></T.ImgBarMobCircle>
                      </T.ArticleImgBarMob>
                    </T.ArticleFillImg>
                  </T.ArticleLeft>
                  <T.ArticleRight>
                    <T.ArticleBlock>
                      <T.ArticleTitle>{data.title}</T.ArticleTitle>
                      <T.ArticleInfo>
                        <T.ArticleDate>
                          {new Date(data.created_on).toLocaleString("ru", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </T.ArticleDate>
                        <T.ArticleCity>{data.user.city}</T.ArticleCity>
                        <T.ArticleLink href="" target="_blank" rel="">
                          23 отзыва
                        </T.ArticleLink>
                      </T.ArticleInfo>
                      <T.ArticlePrice>{data.price}.p</T.ArticlePrice>
                      {auth.email === data.user.email ? (
                        <T.ArticleBtnBlock>
                          <T.ArticleBtnReduct onClick={() => setOpenFormEditAds(true)}>Редактировать</T.ArticleBtnReduct>
                          <T.ArticleBtnRemove>
                            Снять с публикации
                          </T.ArticleBtnRemove>
                        </T.ArticleBtnBlock>
                      ) : (
                        <T.ArticleBtn onClick={clickShowPhone}>
                          Показать&nbsp;телефон
                          <T.ArticleBtnSpan>
                            {!showPhone ? `+7 XXX XXX XX XX` : data.user.phone}
                          </T.ArticleBtnSpan>
                        </T.ArticleBtn>
                      )}
                      <T.ArticleAuthor>
                        <T.AuthorImg>
                          <T.AuthorImgImg
                            src={`http://localhost:8090/${data.user.avatar}`}
                            alt=""
                          />
                        </T.AuthorImg>
                        <T.AuthorCont key={data.user.id}>
                          <Link to={`/profile/${data.user.id}`}>
                            <T.AuthorName>{data.user.name}</T.AuthorName>
                            <T.AuthorAbout>
                              Продает товары с&nbsp;
                              {new Date(data.user.sells_from).toLocaleString(
                                "ru",
                                {
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </T.AuthorAbout>
                          </Link>
                        </T.AuthorCont>
                      </T.ArticleAuthor>
                    </T.ArticleBlock>
                  </T.ArticleRight>
                </T.ArticContent>
              </T.MainArtic>
              <T.MainTitle>Описание товара</T.MainTitle>
              <T.MainContent>
                <T.MainText>{data.description}</T.MainText>
              </T.MainContent>
            </T.MainCenterBlock>
          )}
        </T.MainContainer>
      </S.Main>
      <Footer />
    </>
  );
};
