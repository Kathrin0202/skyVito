export const host = "http://127.0.0.1:8090";

export const saveTokenToLocalStorage = (token) => {
  sessionStorage.setItem("token", JSON.stringify(token));
};

export const getTokenFromLocalStorage = () => {
  const token = sessionStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const updateToken = async () => {
  try {
    const token = getTokenFromLocalStorage();
    const data = await getToken(token);
    saveTokenToLocalStorage(data);
  } catch (error) {
    throw new Error(`Ошибка при обновлении токена:`);
  }
};

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
  if (response.status === 200) {
    return response.json();
  } else if (response.status === 401) {
    updateToken();
  }
  throw new Error("Нет авторизации");
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
export const getAllUsers = async () => {
  return fetch(`${host}/user/all`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }

    throw new Error("Ошибка, попробуйте позже");
  });
};

export const getToken = async (token) => {
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
};

export const updateUser = async (user, token) => {
  return fetch(`${host}/user`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
    body: JSON.stringify({
      role: "user",
      email: user.email,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      city: user.city,
    }),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 401) {
      updateToken();
      return updateUser(user, getTokenFromLocalStorage());
    }
    throw new Error("Неизвестная ошибка, попробуйте позже");
  });
};
