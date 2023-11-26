import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage, updateToken } from "../../api";
import { useGetAddAdsMutation } from "../../store/services/auth";
import * as T from "./addAds.styled";
export const AddAds = ({ setOpenFormAddAds }) => {
  const ads = {
    id: 0,
    title: "",
    description: "",
    price: null,
    images: [],
  };
  const [postAdsText, { data, isError, isStatus }] = useGetAddAdsMutation();
  const refName = useRef(null);
  const refDescription = useRef(null);
  const refPrice = useRef(null);
  const [adsState, setAdsState] = useState(ads);
  const navigate = useNavigate();
  const updateAdsState = (value, field) => {
    setAdsState({ ...adsState, [field]: value });
  };
  const closeForm = () => {
    setOpenFormAddAds(false);
  };
  const handleClickPublic = (event) => {
    if (refName.current && refDescription.current && refPrice.current) {
      postAdsText({
        token: getTokenFromLocalStorage(),
        ads: {
          title: refName.current.value,
          description: refDescription.current.value,
          price: refPrice.current.value,
        },
      });
    } else {
      refName.current.classList.add("--error-input");
    }
  };

  useEffect(() => {
    if (isStatus === "fulfilled" && data) {
      navigate(`/ads/${data.id}`);
      setOpenFormAddAds(false);
    }

    if (isError.status === 401) {
      updateToken();
      if (refName.current && refDescription.current && refPrice.current) {
        if (refName.current.value) {
          postAdsText({
            token: getTokenFromLocalStorage(),
            ads: {
              title: refName.current.value,
              description: refDescription.current.value,
              price: refPrice.current.value
                ? parseInt(refPrice.current.value)
                : 0,
            },
          });
        }
      }
    }
  }, [isError]);
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
                    <T.FormNewArtImgImg src="" alt="" />
                    <T.FormNewArtImgCover></T.FormNewArtImgCover>
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgImg src="" alt="" />
                    <T.FormNewArtImgCover></T.FormNewArtImgCover>
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover></T.FormNewArtImgCover>
                    <T.FormNewArtImgImg src="" alt="" />
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover></T.FormNewArtImgCover>
                    <T.FormNewArtImgImg src="" alt="" />
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover></T.FormNewArtImgCover>
                    <T.FormNewArtImgImg src="" alt="" />
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
