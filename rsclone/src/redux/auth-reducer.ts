// @ts-nocheck
import { httpAuthorized } from "../utils";
export type AuthUserActionType = {
  type: "SET-USER-INFO";
  user_id: string;
};

export type LogoutUserActionType = {
  type: "LOGOUT-USER";
  user_id: string;
};

export type UserInfoType = {
  user_id: string;
  email: string;
  username: string;
};

type ActionsType = AuthUserActionType | LogoutUserActionType;

const initialState = {
  userInfo: {},
};
export const authReducer = (
  state = initialState,
  action: ActionsType
): Array<UserInfoType> => {
  switch (action.type) {
    case "SET-USER-INFO": {
      return { ...state, userInfo:action.userInfo };
    }
    case "LOGOUT-USER": {
      return { ...state };
    }
  }
    return state;
};

export const authUserAC = () => {
  return (dispatch) => {
    httpAuthorized("/auth")
      .then((userInfo) => {
        dispatch(setUserInfoAC(userInfo));
      })
      .catch((data) => {
        console.log(data);
      });
  };
};
export const setUserInfoAC = (userInfo: UserInfoType): AuthUserActionType => {
  return {
    type: "SET-USER-INFO",
    userInfo,
  };
};
export const logoutUserAC = (): LogoutUserActionType => {
  return {
    type: "LOGOUT-USER",
  };
};
