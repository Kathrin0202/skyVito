import { useEffect, useRef, useState } from "react";
import { getTokenFromLocalStorage, updateToken } from "../../api";
import {
  useGetAddAdsMutation,
  usePostAdsImageMutation,
} from "../../store/services/auth";
import * as T from "./addAds.styled";
export const AddAds = ({ setOpenFormAddAds, ads }) => {
  const [postAdsText, { isError }] = useGetAddAdsMutation();
  const refName = useRef(null);
  const refDescription = useRef(null);
  const refPrice = useRef(null);
  const [adsState, setAdsState] = useState();
  const addImg = document.getElementById("upload-photo");
  const [images, setImages] = useState([addImg]);
  const [postAdsImg] = usePostAdsImageMutation();
  const [saveButtonActive, setSaveButtonActive] = useState(true);

  const updateAdsState = (value, field) => {
    setAdsState({ ...adsState, [field]: value });
    setSaveButtonActive(true);
  };
  const closeForm = () => {
    setOpenFormAddAds(false);
  };

  const handleClickPublic = (event) => {
    event.preventDefault();
    if (refName.current && refDescription.current && refPrice.current) {
      postAdsText({
        token: getTokenFromLocalStorage(),
        ads: {
          title: refName.current.value,
          description: refDescription.current.value,
          price: refPrice.current.value,
        },
      });
      setAdsState(adsState);
      setSaveButtonActive(false);
      setOpenFormAddAds(false);
    }
  };

  const handleAdsPicture = async (file) => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      postAdsImg({
        token: getTokenFromLocalStorage(),
        image: formData,
        id: ads.id,
      });
      setSaveButtonActive(true);
      setImages(images);
    } else {
      console.log("Файл не найден");
    }
  };

  useEffect(() => {
    if (isError.status === 401) {
      updateToken();
      if (refName.current && refDescription.current && refPrice.current) {
        if (refName.current.value) {
          postAdsText({
            token: getTokenFromLocalStorage(),
            ads: {
              title: refName.current.value,
              description: refDescription.current.value,
              price: refPrice.current.value,
            },
          });
          setAdsState(adsState);
          setOpenFormAddAds(false);
          setSaveButtonActive(false);
        }
      }
    }
  }, [isError, adsState, postAdsText, setOpenFormAddAds]);

  useEffect(() => {
    setAdsState(adsState);
  }, [adsState]);

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
                  ref={refName}
                  type="text"
                  name="name"
                  id="formName"
                  placeholder="Введите название"
                  onChange={(event) => {
                    updateAdsState(event.target.value, "title");
                  }}
                />
              </T.FormNewArtBlock>
              <T.FormNewArtBlock>
                <T.FormNewArtLabel htmlFor="text">Описание</T.FormNewArtLabel>
                <T.FormNewArtArea
                  ref={refDescription}
                  name="text"
                  id="formArea"
                  cols="auto"
                  rows="10"
                  placeholder="Введите описание"
                  onChange={(event) => {
                    updateAdsState(event.target.value, "description");
                  }}
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
                  ref={refPrice}
                  onChange={(event) => {
                    updateAdsState(event.target.value, "price");
                  }}
                />
                <T.FormNewArtInputPriceCover></T.FormNewArtInputPriceCover>
              </T.FormNewArtBlockPrice>

              <T.FormNewArtBtnPub
                id="btnPublish"
                onClick={(event) => handleClickPublic(event)}
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
