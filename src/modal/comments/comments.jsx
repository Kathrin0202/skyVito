import * as T from "./comments.styled";
import noAvatar from "../../img/myprofile.png";
import { useAddCommentMutation } from "../../store/services/auth";
import { useState } from "react";
import { getTokenFromLocalStorage } from "../../api";
import { useAuthSelector } from "../../store/slices/auth";
import { useParams } from "react-router-dom";
export const Comments = ({ setOpenFormComments, comments }) => {
  const closeForm = () => {
    setOpenFormComments(false);
  };
  const [addComment, { isLoading }] = useAddCommentMutation();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const auth = useAuthSelector();
  const id = useParams().id;
  console.log(id);
  const handleAddComment = (event) => {
    if (!newComment) {
      setError("Пожалуйста, введите комментарий");
      return;
    }
    if (newComment) {
      addComment({
        token: getTokenFromLocalStorage(),
        text: newComment,
        id: id,
      });
      setNewComment("");
    }
  };

  return (
    <T.Wrapper>
      <T.ContainerBg>
        <T.ModalBlock>
          <T.ModalContent>
            <T.ModalTitle>Отзывы о товаре</T.ModalTitle>
            <T.ModalBtnClose>
              <T.ModalBtnCloseLine onClick={closeForm}></T.ModalBtnCloseLine>
            </T.ModalBtnClose>
            <T.ModalScroll>
              <T.ModalFormNewArt id="formNewArt" action="#">
                <T.FormNewArtBlock>
                  <T.FormNewArt htmlFor="text">Добавить отзыв</T.FormNewArt>
                  <T.FormNewArtArea
                    name="text"
                    id="formArea"
                    cols="auto"
                    rows="5"
                    placeholder="Введите описание"
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
              <T.ModalReviews>
                <T.ReviewsReview>
                  {comments &&
                    comments.map((item, index) => (
                      <T.ReviewItem key={index}>
                        <T.ReviewLeft>
                          <T.ReviewImg>
                            {item.author.avatar.length !== 0 ? (
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
                            {item.author.name}
                            <T.ReviewNameSpan>
                              {new Date(item.created_on).toLocaleString("ru", {
                                addSuffix: true,
                              })}
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
        </T.ModalBlock>
      </T.ContainerBg>
    </T.Wrapper>
  );
};
