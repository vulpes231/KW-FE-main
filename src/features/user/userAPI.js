//User
import axios from "axios";

const liveurl = "https://server.kryptwallet.com";
export async function createUser(user) {
  const newUser = await axios.post(`${liveurl}/users/register`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return newUser.data;
}

export async function authUser(email) {
  const token = await axios.post(
    `${liveurl}/users/login`,
    {
      email: email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return token.data;
}

export async function setPin(pin, token) {
  const message = await axios.put(
    `${liveurl}/users/setpin`,
    {
      pin: pin,
    },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return message.data;
}

export async function verifyEmail(token) {
  console.log(token);
  const message = await axios(`${liveurl}/users/verify`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return message.data;
}

export async function sendCode(token) {
  const message = await axios.get(
    `${liveurl}/users/send%20verification%20code/verify`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return message.data;
}

export async function verifyPin(pin, token) {
  const message = await axios.get(`${liveurl}/users/verify%20pin/${pin}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return message.data;
}

export async function logout() {
  await localStorage.removeItem("BsuserLiveTokens");
  await localStorage.removeItem("BSuserTokens");
  await localStorage.removeItem("BSinfo");
  await localStorage.removeItem("BSuser");
  return "success";
}

export const getSet = async () => {
  const newAdmin = await axios({
    url: "https://server.kryptwallet.com/admin/settings",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return newAdmin.data;
};
