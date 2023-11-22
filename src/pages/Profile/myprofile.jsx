import { Footer } from "../../components/Footer/footer";
import { HeaderAuth } from "../../components/Header/header";
import { MainMenu } from "../../components/Menu/menu";
import * as S from "../../style/App.style";
import * as T from "./profile.style";
import { ContentCard } from "../../components/Cards/cards";
import { useState } from "react";
import { getTokenFromLocalStorage, updateUser } from "../../api";
import { useEffect } from "react";
import { useRef } from "react";
import { useUploadUserAvatarMutation } from "../../store/services/auth";

export const MyProfile = ({ userProfile, setUserProfile }) => {
  const [currentProfiled, setCurrentProfiled] = useState(userProfile);
  const [active, setActive] = useState(true);
  const [img, setImg] = useState(null);
  const profiledRef = useRef();
  const [uploadUserAvatar] = useUploadUserAvatarMutation();

  const handleName = (event) => {
    setCurrentProfiled({ ...currentProfiled, name: event.target.value });
    setActive(false);
  };
  const handleSurname = (event) => {
    setCurrentProfiled({ ...currentProfiled, surname: event.target.value });
    setActive(false);
  };
  const handleCity = (event) => {
    setCurrentProfiled({ ...currentProfiled, city: event.target.value });
    setActive(false);
  };
  const handlePhone = (event) => {
    setCurrentProfiled({ ...currentProfiled, phone: event.target.value });
    setActive(false);
  };
  const handleAvatarClick = (event) => {
    event.preventDefault();
    const fileUpload = document.getElementById("file-upload");
    fileUpload.click();
    setCurrentProfiled({ ...currentProfiled, avatar: event.target.value });
    console.log("2");
  };
  const handleAvatarUpload = async (file) => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      await uploadUserAvatar(formData);
    } else {
      console.log("Файл не найден");
    }
  };

  const handleSaveChanges = () => {
    updateUser(currentProfiled, getTokenFromLocalStorage())
      .then((data) => {
        setUserProfile(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching workout data:", error);
      });
  };
  useEffect(() => {
    setCurrentProfiled({ ...userProfile });
  }, [userProfile]);

  return (
    <>
      <HeaderAuth />
      <S.Main>
        <T.MainContainer>
          <T.MainCenterBlock>
            <MainMenu />
            <T.MainH2>
              Здравствуйте,&nbsp;
              {userProfile.name ? userProfile.name : userProfile.email}!
            </T.MainH2>
            <T.MainProfile>
              <T.ProfileContent>
                <T.ProfileTitle>Настройки профиля</T.ProfileTitle>
                <T.ProfileSettings>
                  <T.SettingsLeft>
                    <T.SettingsImg>
                      <T.Img
                        src={
                          img
                            ? URL.createObjectURL(img)
                            : `http://localhost:8090/${userProfile.avatar}`
                        }
                      />
                    </T.SettingsImg>
                    <T.SettingsImgInput
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        event.preventDefault();
                        const file = event.target.files?.[0];
                        if (file) {
                          setImg(file);
                          handleAvatarUpload(file);
                        }
                      }}
                      ref={profiledRef}
                    ></T.SettingsImgInput>
                    <T.SettingsChangePhoto onClick={handleAvatarClick}>
                      Заменить
                    </T.SettingsChangePhoto>
                  </T.SettingsLeft>
                  <T.SettingsRight>
                    <T.SettingsForm>
                      <T.SettingsDiv>
                        <T.SettingsFormLabel htmlFor="name">
                          Имя
                        </T.SettingsFormLabel>
                        <T.SettingsFormInput
                          id="settings-name"
                          name="name"
                          type="text"
                          placeholder={userProfile.name}
                          onChange={(event) => {
                            handleName(event);
                          }}
                          ref={profiledRef}
                        />
                      </T.SettingsDiv>

                      <T.SettingsDiv>
                        <T.SettingsFormLabel htmlFor="name">
                          Фамилия
                        </T.SettingsFormLabel>
                        <T.SettingsFormInput
                          id="settings-name"
                          name="surname"
                          type="text"
                          placeholder={userProfile.surname}
                          onChange={(event) => {
                            handleSurname(event);
                          }}
                          ref={profiledRef}
                        />
                      </T.SettingsDiv>

                      <T.SettingsDiv>
                        <T.SettingsFormLabel htmlFor="city">
                          Город
                        </T.SettingsFormLabel>
                        <T.SettingsFormInput
                          id="settings-city"
                          name="city"
                          type="text"
                          placeholder={userProfile.city}
                          onChange={(event) => {
                            handleCity(event);
                          }}
                          ref={profiledRef}
                        />
                      </T.SettingsDiv>

                      <T.SettingsDiv>
                        <T.SettingsFormLabel htmlFor="phone">
                          Телефон
                        </T.SettingsFormLabel>
                        <T.SettingsFormInput
                          id="settings-phone"
                          name="phone"
                          type="tel"
                          width={614}
                          placeholder={userProfile.phone}
                          onChange={(event) => {
                            handlePhone(event);
                          }}
                          ref={profiledRef}
                        />
                      </T.SettingsDiv>

                      <T.SettingsBtn
                        id="settings-btn"
                        onClick={(event) => handleSaveChanges(event)}
                      >
                        Сохранить
                      </T.SettingsBtn>
                    </T.SettingsForm>
                  </T.SettingsRight>
                </T.ProfileSettings>
              </T.ProfileContent>
            </T.MainProfile>
            <T.MainTitle>Мои товары</T.MainTitle>
          </T.MainCenterBlock>
          <T.MainContent>
            <ContentCard userId={userProfile.id} />
          </T.MainContent>
        </T.MainContainer>
      </S.Main>
      <Footer />
    </>
  );
};
