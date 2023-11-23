import * as T from "./addAds.styled";
export const AddAds = () => {
  return (
    <T.ContainerBg>
      <T.ModalBlock>
        <T.ModalContent>
          <T.ModalTitle>Новое объявление</T.ModalTitle>
          <T.ModalBtnClose>
            <T.ModalBtnCloseLine></T.ModalBtnCloseLine>
          </T.ModalBtnClose>
          <T.ModalFormNewArt id="formNewArt" action="#">
            <T.FormNewArtBlock>
              <T.FormNewArtLabel for="name">Название</T.FormNewArtLabel>
              <T.FormNewArtInput
                type="text"
                name="name"
                id="formName"
                placeholder="Введите название"
              />
            </T.FormNewArtBlock>
            <T.FormNewArtBlock>
              <T.FormNewArtLabel for="text">Описание</T.FormNewArtLabel>
              <T.FormNewArtArea
                name="text"
                id="formArea"
                cols="auto"
                rows="10"
                placeholder="Введите описание"
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
                  <T.FormNewArtImgCover class="form-newArt__img-cover"></T.FormNewArtImgCover>
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
              <T.FormNewArtLabel for="price">Цена</T.FormNewArtLabel>
              <T.FormNewArtInputPrice
                type="text"
                name="price"
                id="formName"
              />
              <T.FormNewArtInputPriceCover></T.FormNewArtInputPriceCover>
            </T.FormNewArtBlockPrice>

            <button class="form-newArt__btn-pub btn-hov02" id="btnPublish">
              Опубликовать
            </button>
          </T.ModalFormNewArt>
        </T.ModalContent>
      </T.ModalBlock>
    </T.ContainerBg>
  );
};
