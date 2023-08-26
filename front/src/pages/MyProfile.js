import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  FormControl,
  Modal, Form
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import History from "../components/travel/History";
import CardHeader from "react-bootstrap/CardHeader";
import * as Api from "../Api";
import { TOAST_POPUP_POSITION, TOAST_POPUP_STATUS } from "../constants";
import ToastWrapper from "../components/common/popup/ToastWrapper";
import { useToggle } from "../customhooks/modalCustomHooks";

const MyProfile = () => {
  const { id } = useParams();

  const [userName, setUserName] = useState("훈제오리");
  const [userEmail, setUserEmail] = useState("elice@elice.com");
  const [userDescription, setUserDescription] = useState("설명이 아직 없습니다. 추가해주세요");
  const [userProfileImage, setUserProfileImage] = useState(
    "https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png");
  const [randomUsers, setRandomUsers] = useState([]);

  const [toastMessage, setToastMessage] = useState("");

  const [isEditMode, setIsEditMode] = useToggle();
  const [isShowProfileModal, toggleProfileModal] = useToggle();
  const [showToast, setShowToast] = useToggle();

  const fileRef = useRef(null);

  const displayToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Api.get(`users/${id}`);
        const userData = response.data;

        setUserName(userData.name);
        setUserEmail(userData.email);
        setUserDescription(userData.description);
        setUserProfileImage(`http://${window.location.hostname}:5001/profile-images/${userData.profileImage}` ||
          "https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png");
      } catch (error) {
        displayToastMessage("유저 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const response = await Api.get("users/randomlist");
        setRandomUsers(response.data);
      } catch (error) {
        displayToastMessage("랜덤 유저 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchRandomUsers();
  }, []);

  const handleEditClick = useCallback(() => {
    setIsEditMode(prevState => !prevState);
  }, []);

  const handleCompleteClick = async () => {
    setIsEditMode();

    const apiEndpoint = `users/${id}`;
    const postData = {
      name: userName,
      description: userDescription
    };
    try {
      await Api.put(apiEndpoint, postData);
      displayToastMessage("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      displayToastMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmitProfileImage = useCallback(() => {

    const inputFile = fileRef.current;
    console.log("inputFile  :", inputFile.files);
    const formData = new FormData();
    for (const file of inputFile.files) {
      formData.append("files", file);
    }
    Api.putImage(`users/photo`, formData).then(async r => {
      setUserProfileImage(`http://${window.location.hostname}:5001/profile-images/${r.data[0]}`);
      const apiEndpoint = `users/${id}`;
      const postData = {
        profileImage: r.data[0]
      };
      try {
        await Api.put(apiEndpoint, postData);
        displayToastMessage("프로필 이미지가 성공적으로 업데이트되었습니다.");
      } catch (error) {
        displayToastMessage("오류가 발생했습니다. 다시 시도해주세요.");
      }
    });
    toggleProfileModal();

  }, [toggleProfileModal, fileRef]);

  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <Card small className="mb-4 mt-4 pt-3">
              <CardHeader className="border-bottom">
                <div className="mb-3 mx-auto">
                  <img
                    className="rounded-circle"
                    src={userProfileImage}
                    width="110"
                    alt="User Profile"
                  />
                </div>
                {isEditMode ? <FormControl type="text" value={userName}
                                           onChange={e => setUserName(
                                             e.target.value)}/> : <h4
                  className="mb-2">{userName}</h4>}
                <span className="text-muted d-block mb-1">{userEmail}</span>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-4">
                  {isEditMode ? <FormControl type="text" value={userDescription}
                                             onChange={e => setUserDescription(
                                               e.target.value)}/> : <strong
                    className="text-muted d-block mb-2">{userDescription}</strong>}
                </ListGroupItem>
              </ListGroup>

              <span>
                <Button variant="link" onClick={handleEditClick}>{isEditMode
                  ? "취소"
                  : "편집"}</Button>
                {isEditMode && <Button variant="link"
                                       onClick={handleCompleteClick}>완료</Button>}
                {isEditMode &&
                  <Button variant="link" onClick={toggleProfileModal}>프로필 이미지
                    편집'</Button>}
              </span>
            </Card>

            <History displayToast={displayToastMessage}/>
          </Col>
          <Col sm={4}>
            {randomUsers.map(user => (
              <Card key={user._id} className="mb-4 mt-4 pt-3">
                <CardHeader className="border-bottom">
                  <h4 className="mb-2">{user.name}</h4>
                  <span className="text-muted d-block mb-1">{user.email}</span>
                </CardHeader>
                <ListGroup flush>
                  <ListGroupItem className="p-4">
                    <strong
                      className="text-muted d-block mb-2">{user.description}</strong>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      <Modal show={isShowProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>프로필 이미지 편집</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Control type={"file"} ref={fileRef} multiple/>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleProfileModal}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSubmitProfileImage}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {showToast && (
        <ToastWrapper
          text={toastMessage}
          position={TOAST_POPUP_POSITION.topCenter}
          status={TOAST_POPUP_STATUS.info}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default MyProfile;
