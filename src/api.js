export const host = "http://127.0.0.1:8090";
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

export async function getUser(token) {
  const response = await fetch(`${host}/user`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });
  if (response.status === 401) {
    throw new Error("Нет авторизации");
  } else if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  const data = await response.json();
  return data;
}

export async function loginUser(email, password) {
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
  if (response.status === 401 || response.status === 422) {
    throw new Error("Пользователь не авторизован");
  }
  const data = await response.json();
  return data;
}

export async function registerUser(
  email,
  password,
  name,
  role,
  surname,
  phone,
  city,
  id
) {
  const response = await fetch(`${host}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      role: role,
      surname: surname,
      phone: phone,
      city: city,
      id: id,
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
