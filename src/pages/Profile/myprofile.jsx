import { Footer } from "../../components/Footer/footer";
import { HeaderAuth } from "../../components/Header/header";
import { MainMenu } from "../../components/Menu/menu";
import * as S from "../../style/App.style";
import * as T from "./profile.style";
import { ContentCard } from "../../components/Cards/cards";
import { useAuthSelector } from "../../store/slices/auth";
export const MyProfile = ({ userProfile, setUserProfile }) => {
  console.log(userProfile);
  return (
    <>
      <HeaderAuth />
      <S.Main>
        <T.MainContainer>
          <T.MainCenterBlock>
            <MainMenu />
            <T.MainH2>Здравствуйте,&nbsp;{userProfile.email}!</T.MainH2>
            <T.MainProfile>
              <T.ProfileContent>
                <T.ProfileTitle>Настройки профиля</T.ProfileTitle>
                <T.ProfileSettings>
                  <T.SettingsLeft>
                    <T.SettingsImg id="file-upload" type="file">
                      <T.Img src="/" />
                    </T.SettingsImg>
                    <T.SettingsChangePhoto>Заменить</T.SettingsChangePhoto>
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
                          placeholder=""
                        />
                      </T.SettingsDiv>

                      <T.SettingsDiv>
                        <T.SettingsFormLabel htmlFor="name">
                          Фамилия
                        </T.SettingsFormLabel>
                        <T.SettingsFormInput
                          id="settings-name"
                          name="name"
                          type="text"
                          placeholder=""
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
                          placeholder=""
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
                          placeholder=""
                        />
                      </T.SettingsDiv>

                      <T.SettingsBtn id="settings-btn">Сохранить</T.SettingsBtn>
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
