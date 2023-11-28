import { Footer } from "../../components/Footer/footer";
import { Link, useParams } from "react-router-dom";
import { HeaderAuth } from "../../components/Header/header";
import { MainMenu } from "../../components/Menu/menu";
import * as S from "../../style/App.style";
import * as T from "./article.styled";
import { useEffect, useState } from "react";
import noPhoto from "../../img/no-photo.avif";
import noAvatar from "../../img/myprofile.png";
import {
  useGetAdsByIdQuery,
  useDeleteAdsMutation,
  useGetAllCommentsQuery,
} from "../../store/services/auth";
import { useAuthSelector } from "../../store/slices/auth";
import { EditAds } from "../../modal/AddAds/editAds";
import { Comments } from "../../modal/comments/comments";
import { getTokenFromLocalStorage, updateToken } from "../../api";
export const Article = () => {
  const adsId = parseInt(useParams().id);
  const { data, isLoading } = useGetAdsByIdQuery(adsId);
  const [showPhone, setShowPhone] = useState(false);
  const clickShowPhone = () => {
    setShowPhone(true);
  };
  const auth = useAuthSelector();
  const [openFormEditAds, setOpenFormEditAds] = useState(false);
  const [openFormComments, setOpenFormComments] = useState(false);
  const [deleteAdv, { isError }] = useDeleteAdsMutation();
  const [deleted, setDeleted] = useState(false);
  const [adComments, setAdvComments] = useState([]);
  const { data: advComments } = useGetAllCommentsQuery(adsId);

  const handleDeleteAdv = () => {
    setDeleted(true);
    deleteAdv({
      token: getTokenFromLocalStorage(),
      id: adsId,
    });
  };

  useEffect(() => {
    setDeleted(data);
    if (isError.status === 401) {
      updateToken(
        deleteAdv({
          token: getTokenFromLocalStorage(),
          id: adsId,
        })
      );
    }
  }, [isError]);
  useEffect(() => {
    if (advComments) {
      setAdvComments(advComments);
    }
  }, [advComments]);

  return (
    <>
      {openFormEditAds && (
        <EditAds setOpenFormEditAds={setOpenFormEditAds} ads={data} />
      )}
      {openFormComments && (
        <Comments
          setOpenFormComments={setOpenFormComments}
          comments={advComments}
        />
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
                        {data.images.map((imag, index) => (
                          <T.ArticleImgBarDiv key={index}>
                            <T.ArticleImgBarDivImg
                              src={`http://localhost:8090/${imag.url}`}
                              alt=""
                            />
                          </T.ArticleImgBarDiv>
                        ))}
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
                        <T.ArticleLink
                          onClick={() => setOpenFormComments(true)}
                        >
                          {adComments ? adComments.length : "..."} отзыва
                        </T.ArticleLink>
                      </T.ArticleInfo>
                      <T.ArticlePrice>{data.price}.p</T.ArticlePrice>
                      {auth.email === data.user.email ? (
                        <T.ArticleBtnBlock>
                          <T.ArticleBtnReduct
                            onClick={() => setOpenFormEditAds(true)}
                          >
                            Редактировать
                          </T.ArticleBtnReduct>
                          <T.ArticleBtnRemove onClick={() => handleDeleteAdv()}>
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
                          {data.user.avatar ? (
                            <T.AuthorImgImg
                              src={`http://localhost:8090/${data.user.avatar}`}
                              alt=""
                            />
                          ) : (
                            <T.AuthorImgImg src={noAvatar} alt="" />
                          )}
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
