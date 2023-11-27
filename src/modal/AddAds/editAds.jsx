import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getTokenFromLocalStorage, updateToken } from "../../api";
import {
  useDeleteAdsImagesMutation,
  useGetAdsByIdQuery,
  useGetEditAdsMutation,
  useUploadAdsImageMutation,
} from "../../store/services/auth";
import * as T from "./addAds.styled";
export const EditAds = ({ setOpenFormEditAds }) => {
  const closeForm = () => {
    setOpenFormEditAds(false);
  };
  const { id } = useParams();
  const { data } = useGetAdsByIdQuery(id);
  const [editAdvRequest] = useGetEditAdsMutation(id);
  const [deleteAdvImages] = useDeleteAdsImagesMutation(id);
  const [uploadAdvImage] = useUploadAdsImageMutation(id);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [saveButtonActive, setSaveButtonActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setImages(data.images);
    }
  }, [data]);

  const adv = useMemo(() => data || [], [data]);

  useEffect(() => {
    setTitle(adv.title);
    setDescription(adv.description);
    setPrice(adv.price);
  }, [data]);

  const handleSaveChanges = async (event) => {
    editAdvRequest({
      title: title,
      description: description,
      price: price,
      id: id,
      token: getTokenFromLocalStorage(),
    });
    setSaveButtonActive(false);
  };

  const handleImgUpload = (event) => {
    event.preventDefault();
    updateToken();
    const selectedImg = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    if (!selectedImg) {
      console.log("Файл не выбран");
    } else {
      const formData = new FormData();
      formData.append("file", selectedImg);
      let token = getTokenFromLocalStorage();
      uploadAdvImage({ formData, id, token });
      setSaveButtonActive(true);
    }
  };

  const handleDeleteAdvImage = (image) => {
    updateToken();
    const data = { image, id };
    deleteAdvImages(data);
  };

  const handleAdTitleChange = (event) => {
    setTitle(event.target.value);
    setSaveButtonActive(true);
  };

  const handleAdDescriptionChange = (event) => {
    setDescription(event.target.value);
    setSaveButtonActive(true);
  };

  const handleAdPriceChange = (event) => {
    setPrice(event.target.value);
    setSaveButtonActive(true);
  };

  return (
    <T.Wrapper>
      <T.ContainerBg>
        <T.ModalBlock>
          <T.ModalContent>
            <T.ModalTitle>Редактировать объявление</T.ModalTitle>
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
                  placeholder={adv.title}
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
                  placeholder={adv.description}
                  onChange={handleAdDescriptionChange}
                ></T.FormNewArtArea>
              </T.FormNewArtBlock>
              <T.FormNewArtBlock>
                <T.FormNewArtP>
                  Фотографии товара
                  <T.FormNewArtPSpan>не более 5 фотографий</T.FormNewArtPSpan>
                </T.FormNewArtP>
                <T.FormNewArtBarImg>
                  {data?.images.map((image, index) => (
                    <T.FormNewArtImg key={index}>
                      <T.FormNewArtImgImg
                        src={
                          !image.url ? "" : `http://localhost:8090/${image.url}`
                        }
                        alt=""
                      />
                      <T.FormNewArtImgCover></T.FormNewArtImgCover>
                    </T.FormNewArtImg>
                  ))}
                  <T.FormNewArtImg>
                    <T.FormNewArtImgImg src="" alt="" />
                    <T.FormNewArtImgCover
                      type="file"
                      id="upload-photo"
                      onChange={handleImgUpload}
                    ></T.FormNewArtImgCover>
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover
                      type="file"
                      id="upload-photo"
                      onChange={handleImgUpload}
                    ></T.FormNewArtImgCover>
                    <T.FormNewArtImgImg src="" alt="" />
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover
                      type="file"
                      id="upload-photo"
                      onChange={handleImgUpload}
                    ></T.FormNewArtImgCover>
                    <T.FormNewArtImgImg src="" alt="" />
                  </T.FormNewArtImg>
                  <T.FormNewArtImg>
                    <T.FormNewArtImgCover
                      type="file"
                      id="upload-photo"
                      onChange={handleImgUpload}
                    ></T.FormNewArtImgCover>
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
                  placeholder={data?.price}
                  onChange={handleAdPriceChange}
                />
                <T.FormNewArtInputPriceCover></T.FormNewArtInputPriceCover>
              </T.FormNewArtBlockPrice>

              <T.FormNewArtBtnPub id="btnPublish" onClick={handleSaveChanges}>
                Сохранить
              </T.FormNewArtBtnPub>
            </T.ModalFormNewArt>
          </T.ModalContent>
        </T.ModalBlock>
      </T.ContainerBg>
    </T.Wrapper>
  );
};
