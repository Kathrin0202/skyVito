import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/footer";
import { HeaderAuth } from "../../components/Header/header";
import { MainMenu } from "../../components/Menu/menu";
import * as S from "../../style/App.style";
import * as T from "./profile.style";
export const Profile = () => {
  return (
    <>
      <HeaderAuth />
      <S.Main>
        <T.MainContainer>
          <T.MainCenterBlock>
            <MainMenu />
            <T.MainH2>Здравствуйте, Антон!</T.MainH2>
            <T.MainProfile>
              <T.ProfileContent>
                <T.ProfileTitle>Настройки профиля</T.ProfileTitle>
                <T.ProfileSettings>
                  <T.SettingsLeft>
                    <T.SettingsImg>
                      <a href="" target="_self">
                        <T.Img src="#" alt="" />
                      </a>
                    </T.SettingsImg>
                    <T.SettingsChangePhoto href="" target="_self">
                      Заменить
                    </T.SettingsChangePhoto>
                  </T.SettingsLeft>
                  <T.SettingsRight>
                    <T.SettingsForm action="#">
                      <T.SettingsDiv>
                        <T.SettingsFormLabel for="fname">
                          Имя
                        </T.SettingsFormLabel>
                        <T.SettingsFormInput
                          id="settings-fname"
                          name="fname"
                          type="text"
                          value="Ан"
                          placeholder=""
                        />
                      </T.SettingsDiv>

                      <T.SettingsDiv>
                        <T.SettingsFormLabel for="lname">
                          Фамилия
                        </T.SettingsFormLabel>
                        <T.SettingsFormInput
                          id="settings-lname"
                          name="lname"
                          type="text"
                          value="Городецкий"
                          placeholder=""
                        />
                      </T.SettingsDiv>

                      <T.SettingsDiv>
                        <T.SettingsFormLabel for="city">
                          Город
                        </T.SettingsFormLabel>
                        <T.SettingsFormInput
                          id="settings-city"
                          name="city"
                          type="text"
                          value="Санкт-Петербург"
                          placeholder=""
                        />
                      </T.SettingsDiv>

                      <T.SettingsDiv>
                        <T.SettingsFormLabel for="phone">
                          Телефон
                        </T.SettingsFormLabel>
                        <T.SettingsFormInput
                          id="settings-phone"
                          name="phone"
                          type="tel"
                          value="89161234567"
                          placeholder="+79161234567"
                          width={614}
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
            <T.ContentCards>
              <T.CardsItem>
                <T.CardsCard>
                  <T.CardImage>
                    <Link to={"/"}>
                      <T.CardImageImg src="#" alt="picture" />
                    </Link>
                  </T.CardImage>
                  <T.CardContent>
                    <Link to={"/"}>
                      <T.CardTitle>
                        Ракетка для большого тенниса Triumph Pro ST
                      </T.CardTitle>
                    </Link>
                    <T.CardPrice>2&nbsp;200&nbsp;₽</T.CardPrice>
                    <T.CardPlace>Санкт Петербург</T.CardPlace>
                    <T.CardDate>Сегодня в&nbsp;10:45</T.CardDate>
                  </T.CardContent>
                </T.CardsCard>
              </T.CardsItem>
            </T.ContentCards>
          </T.MainContent>
        </T.MainContainer>
      </S.Main>
      <Footer />
    </>
  );
};
