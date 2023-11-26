import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer/footer";
import { HeaderAuth } from "../../components/Header/header";
import { MainMenu } from "../../components/Menu/menu";
import * as S from "../../style/App.style";
import * as T from "./article.styled";
export const MyArticle = ({ ads }) => {
  return (
    <>
      <HeaderAuth />
      <S.Main>
        <T.MainContainer>
          <T.MainCenterBlock>
            <MainMenu />
            <T.MainArtic>
              <T.ArticContent>
                <T.ArticleLeft>
                  <T.ArticleFillImg>
                    <T.ArticleImg>
                      <T.ArticleImgImg src="" alt="" />
                    </T.ArticleImg>
                    <T.ArticleImgBar>
                      <T.ArticleImgBarDiv>
                        <T.ArticleImgBarDivImg src="" alt="" />
                      </T.ArticleImgBarDiv>
                    </T.ArticleImgBar>
                    <T.ArticleImgBarMob>
                      <T.ImgBarMobCircleActive></T.ImgBarMobCircleActive>
                      <T.ImgBarMobCircle></T.ImgBarMobCircle>
                    </T.ArticleImgBarMob>
                  </T.ArticleFillImg>
                </T.ArticleLeft>
                <T.ArticleRight>
                  <T.ArticleBlock>
                    <T.ArticleTitle>
                      Ракетка для большого тенниса Triumph Pro STС Б/У
                    </T.ArticleTitle>
                    <T.ArticleInfo>
                      <T.ArticleDate>Сегодня в 10:45</T.ArticleDate>
                      <T.ArticleCity>Санкт-Петербург</T.ArticleCity>
                      <T.ArticleLink href="" target="_blank" rel="">
                        23 отзыва
                      </T.ArticleLink>
                    </T.ArticleInfo>
                    <T.ArticlePrice>2 200 ₽</T.ArticlePrice>
                    <T.ArticleBtnBlock>
                      <T.ArticleBtnReduct>Редактировать</T.ArticleBtnReduct>
                      <T.ArticleBtnRemove>
                        Снять с публикации
                      </T.ArticleBtnRemove>
                    </T.ArticleBtnBlock>
                    <T.ArticleAuthor>
                      <T.AuthorImg>
                        <T.AuthorImgImg src="" alt="" />
                      </T.AuthorImg>
                      <T.AuthorCont>
                        <T.AuthorName>Кирилл</T.AuthorName>
                        <T.AuthorAbout>
                          Продает товары с августа 2021
                        </T.AuthorAbout>
                      </T.AuthorCont>
                    </T.ArticleAuthor>
                  </T.ArticleBlock>
                </T.ArticleRight>
              </T.ArticContent>
            </T.MainArtic>
          </T.MainCenterBlock>
          <T.MainContainer>
            <T.MainTitle>Описание товара</T.MainTitle>
            <T.MainContent>
              <T.MainText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </T.MainText>
            </T.MainContent>
          </T.MainContainer>
        </T.MainContainer>
      </S.Main>
      <Footer />
    </>
  );
};
