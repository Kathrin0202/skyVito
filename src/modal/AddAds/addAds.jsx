import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../api";
import {
  useDeleteAdsImagesMutation,
  useGetAddAdsMutation,
  usePostAdsImageMutation,
} from "../../store/services/auth";
import * as T from "./addAds.styled";
export const AddAds = ({ setOpenFormAddAds, setAds }) => {
  const [postAdsText] = useGetAddAdsMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const addImg = document.getElementById("upload-photo");
  const [images, setImages] = useState([addImg]);
  const [postAdsImg] = usePostAdsImageMutation();
  const [deleteImages] = useDeleteAdsImagesMutation();
  const [saveButtonActive, setSaveButtonActive] = useState(true);
  const navigate = useNavigate();
  const [inputAndAvaFilled, setInputAndAvaFilled] = useState();
  const [error, setError] = useState(null);

  const closeForm = () => {
    setOpenFormAddAds(false);
  };

  const handleClickPublic = () => {
    if (!title && !description && !price) {
      setError("Заполните все поля");
    }
    postAdsText({
      title: title,
      description: description,
      price: price,
      id: 0,
      token: getTokenFromLocalStorage(),
    });
    setTitle(title);
    setDescription(description);
    setPrice(price);
    setSaveButtonActive(true);
    setAds(postAdsText);
  };

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    setPrice(price);
    setSaveButtonActive(true);
    setAds(postAdsText);
  }, [title, description, price]);

  const handleAdsPicture = async (file) => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      postAdsImg({
        token: getTokenFromLocalStorage(),
        image: formData,
      });
      setSaveButtonActive(true);
      setImages(images);
    } else {
      console.log("Файл не найден");
    }
  };

  const handleDeleteImage = async (image) => {
    deleteImages({
      token: getTokenFromLocalStorage(),
      image: image,
    });
    setSaveButtonActive(true);
    setImages(images);
  };

  useEffect(() => {
    if (saveButtonActive) {
      setSaveButtonActive(false);
    } else {
      setSaveButtonActive(true);
    }
  }, [inputAndAvaFilled]);

  const handleAdTitleChange = (event) => {
    setTitle(event.target.value);
    setInputAndAvaFilled(event.target.value);
    setSaveButtonActive(true);
  };

  const handleAdDescriptionChange = (event) => {
    setDescription(event.target.value);
    setInputAndAvaFilled(event.target.value);
    setSaveButtonActive(true);
  };

  const handleAdPriceChange = (event) => {
    setPrice(event.target.value);
    setInputAndAvaFilled(event.target.value);
    setSaveButtonActive(true);
  };

  return (
    <T.Wrapper>
      <T.ContainerBg>
        <T.ModalBlock>
          <T.ModalContent>
            <T.ModalTitle>Новое объявление</T.ModalTitle>
            <T.ModalBtnClose>
              <T.ModalBtnCloseLine onClick={closeForm}></T.ModalBtnCloseLine>
            </T.ModalBtnClose>
            <T.ModalFormNewArt id="formNewArt" action="#">
              <T.FormNewArtBlock>
                <T.FormNewArtLabel htmlFor="name">Название</T.FormNewArtLabel>
                <T.FormNewArtInput
                  type="text"
                  name="name"
                  id="formName"
                  placeholder="Введите название"
                  onChange={handleAdTitleChange}
                />
              </T.FormNewArtBlock>
              <T.FormNewArtBlock>
                <T.FormNewArtLabel htmlFor="text">Описание</T.FormNewArtLabel>
                <T.FormNewArtArea
                  name="text"
                  id="formArea"
                  cols="auto"
                  rows="10"
                  placeholder="Введите описание"
                  onChange={handleAdDescriptionChange}
                ></T.FormNewArtArea>
              </T.FormNewArtBlock>
              <T.FormNewArtBlock>
                <T.FormNewArtP>
                  Фотографии товара
                  <T.FormNewArtPSpan>не более 5 фотографий</T.FormNewArtPSpan>
                </T.FormNewArtP>
                <T.FormNewArtBarImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover
                      type="file"
                      id="upload-photo"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setImages(file);
                          handleAdsPicture(file);
                        }
                      }}
                    ></T.FormNewArtImgCover>
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover
                      type="file"
                      id="upload-photo"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[1];
                        if (file) {
                          setImages(file);
                          handleAdsPicture(file);
                        }
                      }}
                    ></T.FormNewArtImgCover>
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover
                      type="file"
                      id="upload-photo"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[2];
                        if (file) {
                          setImages(file);
                          handleAdsPicture(file);
                        }
                      }}
                    ></T.FormNewArtImgCover>
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover
                      type="file"
                      id="upload-photo"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[3];
                        if (file) {
                          setImages(file);
                          handleAdsPicture(file);
                        }
                      }}
                    ></T.FormNewArtImgCover>
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover
                      type="file"
                      id="upload-photo"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[4];
                        if (file) {
                          setImages(file);
                          handleAdsPicture(file);
                        }
                      }}
                    ></T.FormNewArtImgCover>
                  </T.FormNewArtImg>
                </T.FormNewArtBarImg>
              </T.FormNewArtBlock>
              <T.FormNewArtBlockPrice>
                <T.FormNewArtLabel htmlFor="price">Цена</T.FormNewArtLabel>
                <T.FormNewArtInputPrice
                  type="text"
                  name="price"
                  id="formName"
                  onChange={handleAdPriceChange}
                />
                <T.FormNewArtInputPriceCover></T.FormNewArtInputPriceCover>
              </T.FormNewArtBlockPrice>
              {error && <T.Error>{error}</T.Error>}
              <T.FormNewArtBtnPub
                id="btnPublish"
                onClick={() => handleClickPublic()}
              >
                Опубликовать
              </T.FormNewArtBtnPub>
            </T.ModalFormNewArt>
          </T.ModalContent>
        </T.ModalBlock>
      </T.ContainerBg>
    </T.Wrapper>
  );
};
