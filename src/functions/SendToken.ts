import jwtDecode from "jwt-decode";

export function sendToken(token: string) {
  const sendToken = localStorage.setItem("token", token);

  return sendToken;
}

export function getToken() {
  const token = localStorage.getItem("token");

  return token;
}

export function decodeToken(token: string) {
  const decoded = jwtDecode(token);

  return decoded;
}

export function removeToken() {
  const removeToken = localStorage.removeItem("token");
  window.location.href = "/";

  return removeToken;
}
