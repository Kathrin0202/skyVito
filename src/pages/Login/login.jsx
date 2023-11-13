import * as S from "./login.style";
import img from "../../img/logo_modal.png";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserContext } from "../../App";
import { loginUser, getToken, registerUser } from "../../api";
import { setAuth } from "../../store/slices/auth";

export const Login = ({ isLoginMode = true }) => {
  const { setUser } = useContext(UserContext);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async ({ email, password }) => {
    if (!email) {
      setError("Не заполнена почта");
      return;
    } else if (!password) {
      setError("Не введён пароль");
      return;
    }
    setLogin(true);
    try {
      await loginUser({ email, password }).then((dat) => {
        localStorage.setItem("user", JSON.stringify(dat));
        setUser(dat);
      });
    } catch (erro) {
      setError(erro.message);
    } finally {
      setLogin(false);
    }
    try {
      await getToken({ email, password }).then((token) => {
        dispatch(
          setAuth({
            access: token.access,
            refresh: token.refresh,
            user: JSON.parse(sessionStorage.getItem("user")),
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setError(null);
  }, [isLoginMode, email, password]);

  return (
    <S.ContainerEnter>
      <S.ModalBlock>
        <S.ModalFormLogin id="formLogIn" action="#">
          <S.ModalLogo>
            <S.ModalLogoImg src={img} alt="logo" />
          </S.ModalLogo>
          <S.ModalInputLogin
            type="text"
            name="login"
            id="formlogin"
            placeholder="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <S.ModalInputPassword
            type="password"
            name="password"
            id="formpassword"
            placeholder="Пароль"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {error && <S.Error>{error}</S.Error>}
          <S.ModalBtnEnter id="btnEnter">
            <S.ModalBtnEnterLink
              to={"/"}
              onClick={() => handleLogin({ email, password })}
              disabled={login}
            >
              Войти
            </S.ModalBtnEnterLink>
          </S.ModalBtnEnter>
          <S.ModalBtnSignup id="btnSignUp">
            <S.ModalBtnSignupLink to={"/registration"}>
              Зарегистрироваться
            </S.ModalBtnSignupLink>
          </S.ModalBtnSignup>
        </S.ModalFormLogin>
      </S.ModalBlock>
    </S.ContainerEnter>
  );
};

export const Registration = ({ isLoginMode = false }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [register, setRegister] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const handleRegister = async ({ email, password }) => {
    if (!email) {
      setError("Не заполнена почта");
      return;
    } else if (!password) {
      setError("Не введён пароль");
      return;
    } else if (!repeatPassword) {
      setError("Не введён пароль повторно");
      return;
    } else if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }
    setRegister(true);
    try {
      await registerUser({ email, password });
    } catch (error) {
      setError(error.message);
    } finally {
      setRegister(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [isLoginMode, email, password, repeatPassword]);
  return (
    <S.ContainerEnter>
      <S.ModalBlockRegister>
        <S.ModalFormReg id="formLogUp" action="#">
          <S.ModalLogo>
            <S.ModalLogoImg src={img} alt="logo" />
          </S.ModalLogo>
          <S.ModalInputRegister
            type="text"
            name="login"
            id="loginReg"
            placeholder="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <S.ModalInputRegister
            type="password"
            name="password"
            id="passwordFirst"
            placeholder="Пароль"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <S.ModalInputRegister
            type="password"
            name="password"
            id="passwordSecond"
            placeholder="Повторите пароль"
            value={repeatPassword}
            onChange={(event) => {
              setRepeatPassword(event.target.value);
            }}
          />
          <S.ModalInputRegister
            type="text"
            name="first-name"
            id="first-name"
            placeholder="Имя (необязательно)"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <S.ModalInputRegister
            type="text"
            name="first-last"
            id="first-last"
            placeholder="Фамилия (необязательно)"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <S.ModalInputRegister
            type="text"
            name="city"
            id="city"
            placeholder="Город (необязательно)"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          {error && <S.Error>{error}</S.Error>}
          <S.ModalBtnReg id="SignUpEnter">
            <S.ModalBtnRegLink
              to={"/"}
              onClick={() => handleRegister({ email, password })}
              disabled={register}
            >
              Зарегистрироваться
            </S.ModalBtnRegLink>
          </S.ModalBtnReg>
        </S.ModalFormReg>
      </S.ModalBlockRegister>
    </S.ContainerEnter>
  );
};
