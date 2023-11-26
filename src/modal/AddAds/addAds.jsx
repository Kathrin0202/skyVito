import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewAds, getTokenFromLocalStorage } from "../../api";

import { useGetAddAdsMutation } from "../../store/services/auth";
import * as T from "./addAds.styled";
export const AddAds = ({ setOpenFormAddAds, ads }) => {
  const [newAdsImages, setNewAdsImages] = useState(ads);
  const [newAdsName, setNewAdsName] = useState('');
  const [newAdsDiscription, setNewAdsDiscription] = useState('');
  const [newAdsPrice, setNewAdsPrice] = useState(ads);
  const [saveButtonActive, setSaveButtonActive] = useState(false);
  const [newAds, setNewAds] = useState();
  const adsRef = useRef();
  const [postAdsText, { data: dataPostAds, status, error }] =
    useGetAddAdsMutation();

  const closeForm = () => {
    setOpenFormAddAds(false);
  };
  const handleName = (event) => {
    setNewAdsName(event.target.value);
  };
  const handleDiscription = (event) => {
    setNewAds({ ...newAds, discription: event.target.value });
  };
  const handlePrice = (event) => {
    setNewAds({ ...newAds, price: event.target.value });
  };
  const handleImageClick = (event) => {
    event.preventDefault();
    const fileUpload = document.getElementById("file-upload");
    fileUpload.click();
    setNewAdsImages(event.target.value);
  };

  const handleAddNewAdv = (event) => {
  };
  console.log(newAds);
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
                <T.FormNewArtLabel>Название</T.FormNewArtLabel>
                <T.FormNewArtInput
                  type="text"
                  name="name"
                  id="formName"
                  placeholder="Введите название"
                  onChange={handleName}
                  ref={adsRef}
                />
              </T.FormNewArtBlock>
              <T.FormNewArtBlock>
                <T.FormNewArtLabel>Описание</T.FormNewArtLabel>
                <T.FormNewArtArea
                  name="text"
                  id="formArea"
                  cols="auto"
                  rows="10"
                  placeholder="Введите описание"
                  onChange={handleDiscription}
                  ref={adsRef}
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
                <T.FormNewArtLabel>Цена</T.FormNewArtLabel>
                <T.FormNewArtInputPrice
                  type="text"
                  name="price"
                  id="formName"
                  onChange={handlePrice}
                  ref={adsRef}
                />
                <T.FormNewArtInputPriceCover></T.FormNewArtInputPriceCover>
              </T.FormNewArtBlockPrice>

              <T.FormNewArtBtnPub id="btnPublish" onClick={handleAddNewAdv}>
                <Link to={`/ads/me`}>Опубликовать</Link>
              </T.FormNewArtBtnPub>
            </T.ModalFormNewArt>
          </T.ModalContent>
        </T.ModalBlock>
      </T.ContainerBg>
    </T.Wrapper>
  );
};
