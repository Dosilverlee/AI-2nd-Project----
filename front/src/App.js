import React, { useReducer, useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import Footer from "./components/common/layout/Footer";
import NavBar from "./components/common/layout/NavBar";
import ReviewsList from "./components/review/ReviewsList";
import { loginReducer } from "./Reducer";
import "./index.css";
import Graph from "./pages/Graph";
import MyProfile from "./pages/MyProfile";
import { Interceptor } from "./Interceptor";
import AddReview from "./components/review/AddReview";
import PageNotFound from "./pages/PageNotFound";
import * as Api from "./Api";
import { MODAL_TYPE } from "./hooks/useModal";
import EditReview from "./components/review/EditReview";
import "./index.css";
import { DEFAULT_AVATAR, RESULT_ENUM } from "./constants";
import UploadStatusIndicators from "./components/common/indicators/UploadStatusIndicators";
import ToastWrapper from "./components/common/popup/ToastWrapper";
import useToast from "./hooks/useToast";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const HandlerEnabledContext = createContext(null);
export const ModalOptionContext = createContext(null);
export const ModalVisibleContext = createContext(null);

function App() {
  const [modalVisible, setModalVisible] = useState({
    type: null,
    isVisible: false,
    data: null,
  });
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  const [reviews, setReviews] = useState([]);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [userInputValues, setUserInputValues] = useState({
    title: "",
    content: "",
  });
  const [uploadingStatus, setUploadingStatus] = useState(RESULT_ENUM.NOT_YET);
  const { showToast, toastData } = useToast();

  const location = useLocation();
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const path = location.pathname.split("/")[1];
  const is404Page =
    path !== "" &&
    path !== "users" &&
    path !== "search" &&
    path !== "graph" &&
    path !== "reviews";

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("users/current");
      if (!res.data) throw new Error("유저 정보를 받아올 수 없습니다");
      const currentUser = res.data;
      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });
      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    // to do: 구조.................?
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <ModalVisibleContext.Provider value={{ modalVisible, setModalVisible }}>
          <Interceptor>
            {showToast && <ToastWrapper toastData={toastData} />}
            {!is404Page && (
              <NavBar avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
            )}
            {/* upload는 모든 페이지에서 할 수 있기때문에 여기 있어야 함!! 옮기지 말 것 */}
            {/* >>>> edit review 오류때문에 임시로 edit도 여기서 사용한다 */}
            {modalVisible && modalVisible.type === MODAL_TYPE.addReview && (
              <AddReview
                reviews={reviews}
                setReviews={setReviews}
                userInputValues={userInputValues}
                setUserInputValues={setUserInputValues}
                setUploadingStatus={setUploadingStatus}
              />
            )}
            {modalVisible && modalVisible.type === MODAL_TYPE.editReview && (
              <EditReview
                reviews={reviews}
                setReviews={setReviews}
                userInputValues={userInputValues}
                setUserInputValues={setUserInputValues}
                setUploadingStatus={setUploadingStatus}
              />
            )}
            {uploadingStatus && (
              <UploadStatusIndicators
                uploadingStatus={uploadingStatus}
                setUploadingStatus={setUploadingStatus}
              />
            )}

            <Routes>
              <Route path="/" exact element={<Main />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route
                path="/users/:id"
                exact
                element={<MyProfile setAvatarUrl={setAvatarUrl} />}
              />
              <Route path="/search" exact element={<Search />} />
              <Route
                path="/reviews"
                exact
                element={
                  <ReviewsList
                    reviews={reviews}
                    setReviews={setReviews}
                    userInputValues={userInputValues}
                    setUserInputValues={setUserInputValues}
                  />
                }
              />
              <Route path="/graph" exact element={<Graph />} />
              {/* 404 페이지 */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {!is404Page && <Footer />}
          </Interceptor>
        </ModalVisibleContext.Provider>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

const AppWithRoute = () => (
  <Router>
    <App />
  </Router>
);
export default AppWithRoute;
