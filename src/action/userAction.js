import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => {};
const loginWithEmail = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const response = await api.post("/auth/login", { email, password });
    if (response.status !== 200) throw new Error(response.error);
    sessionStorage.setItem("token", response.data.token);
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("something fail?", error);
    dispatch({ type: types.LOGIN_FAIL, payload: error.message });
  }
};

const logout = () => async (dispatch) => { };



const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser = ({ email, name, password }, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_USER_REQUEST });
    const response = await api.post("/user", { email, name, password });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.REGISTER_USER_SUCCESS });
    dispatch(commonUiActions.showToastMessage("회원가입에 성공했습니다!", "success"));
    navigate("/login");
  } catch (error) {
    dispatch({ type: types.REGISTER_USER_FAIL, payload: error.message });
    if (error.message === "User already exists") {
      dispatch(commonUiActions.showToastMessage("이미 가입된 이메일입니다.", "error"));
    } else {
      dispatch(commonUiActions.showToastMessage("회원가입에 실패했습니다.", "error"));
    }
  }
};



export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
