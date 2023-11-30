import * as T from "../AddAds/addAds.styled";
import { getTokenFromLocalStorage, updatePassword } from "../../api";
import { useRef, useState } from "react";

export const EditPassword = ({ setOpenFormChangePassword }) => {
  const [error, setError] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [saveButton, setSaveButton] = useState(true);

  const closeForm = () => {
    setOpenFormChangePassword(false);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    setSaveButton(true);
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setSaveButton(true);
  };
  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    setSaveButton(true);
  };

  const handleSaveChange = async () => {
    if (newPassword !== repeatPassword) {
      setError("Пароли не совпадают");
    }
    updatePassword({
      oldPassword: oldPassword,
      newPassword: newPassword,
      token: getTokenFromLocalStorage(),
    })
      .then(() => {
        setSaveButton(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  console.log(newPassword);
  return (
    <T.Wrapper>
      <T.ContainerBg>
        <T.ModalBlock>
          <T.ModalContent>
            <T.ModalTitle>Редактировать пароль</T.ModalTitle>
            <T.ModalBtnClose>
              <T.ModalBtnCloseLine onClick={closeForm}></T.ModalBtnCloseLine>
            </T.ModalBtnClose>
            <T.ModalFormNewArt id="formNewArt" action="#">
              <T.FormNewArtBlock>
                <T.FormNewArtLabel htmlFor="name">
                  Старый пароль
                </T.FormNewArtLabel>
                <T.FormNewArtInput
                  type="password"
                  name="oldPassword"
                  id="formName"
                  placeholder="Введите старый пароль"
                  onChange={(event) => handleOldPasswordChange(event)}
                />
              </T.FormNewArtBlock>
              <T.FormNewArtBlock>
                <T.FormNewArtLabel htmlFor="name">
                  Новый пароль
                </T.FormNewArtLabel>
                <T.FormNewArtInput
                  type="password"
                  name="newPassword"
                  id="formName"
                  placeholder="Введите новый пароль"
                  onChange={(event) => handleNewPasswordChange(event)}
                />
              </T.FormNewArtBlock>
              <T.FormNewArtBlock>
                <T.FormNewArtLabel htmlFor="name">
                  Повторите новый пароль
                </T.FormNewArtLabel>
                <T.FormNewArtInput
                  type="password"
                  name="repeatPassword"
                  id="formName"
                  placeholder="Повторите новый пароль"
                  onChange={(event) => handleRepeatPasswordChange(event)}
                />
              </T.FormNewArtBlock>
              <T.FormNewArtBtnPub
                id="btnPublish"
                onClick={() => handleSaveChange()}
              >
                Сохранить
              </T.FormNewArtBtnPub>
            </T.ModalFormNewArt>
          </T.ModalContent>
        </T.ModalBlock>
      </T.ContainerBg>
    </T.Wrapper>
  );
};
