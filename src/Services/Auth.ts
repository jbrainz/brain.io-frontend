import { RequestService } from "./Request";

const google = (accessToken: string, timezone: string) => {
  return RequestService.post(`/auth/google`, {
    access_token: accessToken,
    timezone: timezone,
  });
};

const login = (email: string, password: string) => {
  return RequestService.post(`/auth/login`, {
    email: email,
    password: password,
  });
};

const logout = () => {
  return RequestService.get(`/auth/logout`, "");
};

const getUserDetails = () => {
  return RequestService.get(`/auth/secure`, "")
}

const updateUserProfile = (first_name: string, last_name: string) => {
  return RequestService.patch('/auth/update-profile', {
    first_name,
    last_name
  })
}

export const AuthService = {
  google,
  login,
  logout,
  getUserDetails,
  updateUserProfile
};
