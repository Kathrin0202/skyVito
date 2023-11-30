import * as T from "./comments.styled";
import noAvatar from "../../img/myprofile.png";
import { useAddCommentMutation } from "../../store/services/auth";
import { useEffect, useState } from "react";
import { getTokenFromLocalStorage, updateToken } from "../../api";
import { useAuthSelector } from "../../store/slices/auth";
import { Link, useParams } from "react-router-dom";
export const Comments = ({
  setOpenFormComments,
  comments = [],
  setAdsComments,
}) => {
  const closeForm = () => {
    setOpenFormComments(false);
  };
  const [addComment, { isLoading, isError }] = useAddCommentMutation();
  const [newComment, setNewComment] = useState("");
  const [setError] = useState(null);
  const auth = useAuthSelector();
  const id = useParams().id;

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!newComment) {
      setError("Пожалуйста, введите отзыв");
      return;
    }
    if (newComment) {
      await addComment({
        token: getTokenFromLocalStorage(),
        text: newComment,
        id: id,
      });
    }
    setAdsComments(newComment);
  };

  useEffect(() => {
    if (isError.status === 422) {
      updateToken();
      if (newComment) {
        addComment({
          token: getTokenFromLocalStorage(),
          text: newComment,
        });
      }
      setAdsComments(newComment);
    }
  }, [isError, newComment, addComment, setAdsComments]);

  return (
    <T.Wrapper>
      <T.ContainerBg>
        <T.ModalBlock>
          {!isLoading ? (
            <T.ModalContent>
              <T.ModalTitle>Отзывы о товаре</T.ModalTitle>
              <T.ModalBtnClose>
                <T.ModalBtnCloseLine onClick={closeForm}></T.ModalBtnCloseLine>
              </T.ModalBtnClose>
              <T.ModalScroll>
                {auth.isAuth === false ? (
                  <T.FormNewArt>
                    Для того чтобы оставить отзыв,{" "}
                    <Link to={"/login"}>авторизуйтесь </Link>
                  </T.FormNewArt>
                ) : (
                  <T.ModalFormNewArt id="formNewArt" action="#">
                    <T.FormNewArtBlock>
                      <T.FormNewArt htmlFor="text">Добавить отзыв</T.FormNewArt>
                      <T.FormNewArtArea
                        name="text"
                        id="formArea"
                        cols="auto"
                        rows="5"
                        placeholder="Введите отзыв"
                        onChange={(event) => setNewComment(event.target.value)}
                      ></T.FormNewArtArea>
                    </T.FormNewArtBlock>
                    <T.FormNewArtBtnPub
                      id="btnPublish"
                      onClick={(event) => handleAddComment(event)}
                    >
                      Опубликовать
                    </T.FormNewArtBtnPub>
                  </T.ModalFormNewArt>
                )}
                <T.ModalReviews>
                  <T.ReviewsReview>
                    {comments &&
                      comments.map((item, index) => (
                        <T.ReviewItem key={index}>
                          <T.ReviewLeft>
                            <T.ReviewImg>
                              {item.author?.avatar ? (
                                <T.ReviewImgImg
                                  src={`http://localhost:8090/${item.author.avatar}`}
                                  alt=""
                                />
                              ) : (
                                <T.ReviewImgImg src={noAvatar} alt="" />
                              )}
                            </T.ReviewImg>
                          </T.ReviewLeft>
                          <T.ReviewRight>
                            <T.ReviewName>
                              {item.author?.name}
                              <T.ReviewNameSpan>
                                {new Date(item.created_on).toLocaleString(
                                  "ru",
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </T.ReviewNameSpan>
                            </T.ReviewName>
                            <T.ReviewTitle>Комментарий</T.ReviewTitle>
                            <T.ReviewText>{item.text}</T.ReviewText>
                          </T.ReviewRight>
                        </T.ReviewItem>
                      ))}
                  </T.ReviewsReview>
                </T.ModalReviews>
              </T.ModalScroll>
            </T.ModalContent>
          ) : (
            <T.ModalTitle>Отзывы загружаются...</T.ModalTitle>
          )}
        </T.ModalBlock>
      </T.ContainerBg>
    </T.Wrapper>
  );
};
