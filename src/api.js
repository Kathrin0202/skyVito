const host = "http://127.0.0.1:8090";
export const getAllAds = async (userId) => {
  const userParam = userId ? `user_id=${userId}&` : "";
  return fetch(`${host}/ads?${userParam}sorting=new`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("Ошибка");
  });
};

export async function loginUser({ email, password }) {
  const response = await fetch(`${host}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 401) {
    throw new Error("Пользователь с таким email или паролем не найден");
  } else if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  const data = await response.json();
  return data;
}

export async function registerUser({ email, password }) {
  const response = await fetch(`${host}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      username: email,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 400) {
    throw new Error("Такой пользователь уже существует");
  } else if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  const data = await response.json();
  return data;
}

export async function getToken({ token }) {
  return fetch(`${host}/auth/login`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    }
    if (response.status === 401) {
      throw new Error("Токен устарел");
    }

    throw new Error("Неизвестная ошибка, попробуйте позже");
  });
}
