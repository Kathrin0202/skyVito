import { Footer } from "../../components/Footer/footer";
import { Link, useParams } from "react-router-dom";
import { HeaderAuth } from "../../components/Header/header";
import { MainMenu } from "../../components/Menu/menu";
import * as S from "../../style/App.style";
import * as T from "./article.styled";
export const Article = ({ ads, isLoading }) => {
  const params = useParams();
  let [articl] = ads.filter((artic) => artic.id == params.id);
  return (
    <>
      <HeaderAuth />
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
                        <T.ArticleImgImg
                          src={`http://localhost:8090/${articl.images[0]?.url}`}
                        />
                      </T.ArticleImg>
                      {articl.images?.length <= 1 ? (
                        <T.ArticleImgBar>
                          {articl.images?.map((img, index) => {
                            <T.ArticleImgBarDiv key={index}>
                              <T.ArticleImgBarDivImg
                                src={`http://localhost:8090/${img.url}`}
                                alt=""
                              />
                            </T.ArticleImgBarDiv>;
                          })}
                        </T.ArticleImgBar>
                      ) : (
                        <T.ArticleImgBarDivImg />
                      )}
                      <T.ArticleImgBarMob>
                        <T.ImgBarMobCircleActive></T.ImgBarMobCircleActive>
                        <T.ImgBarMobCircle></T.ImgBarMobCircle>
                      </T.ArticleImgBarMob>
                    </T.ArticleFillImg>
                  </T.ArticleLeft>
                  <T.ArticleRight>
                    <T.ArticleBlock>
                      <T.ArticleTitle>{articl?.title}</T.ArticleTitle>
                      <T.ArticleInfo>
                        <T.ArticleDate>
                          {new Date(articl?.created_on).toLocaleString("ru", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </T.ArticleDate>
                        <T.ArticleCity>{articl?.user.city}</T.ArticleCity>
                        <T.ArticleLink href="" target="_blank" rel="">
                          23 отзыва
                        </T.ArticleLink>
                      </T.ArticleInfo>
                      <T.ArticlePrice>{articl?.price}.p</T.ArticlePrice>
                      <T.ArticleBtn>
                        Показать&nbsp;телефон
                        <T.ArticleBtnSpan>
                          {articl?.user.phone}
                        </T.ArticleBtnSpan>
                      </T.ArticleBtn>
                      <T.ArticleAuthor>
                        <T.AuthorImg>
                          <T.AuthorImgImg src="" alt="" />
                        </T.AuthorImg>
                        <T.AuthorCont key={articl?.user.id}>
                          <Link to={`/profile/${articl?.user.id}`}>
                            <T.AuthorName>{articl?.user.name}</T.AuthorName>
                            <T.AuthorAbout>
                              Продает товары с&nbsp;
                              {new Date(articl?.user.sells_from).toLocaleString(
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
                <T.MainText>{articl?.description}</T.MainText>
              </T.MainContent>
            </T.MainCenterBlock>
          )}
        </T.MainContainer>
      </S.Main>
      <Footer />
    </>
  );
};
