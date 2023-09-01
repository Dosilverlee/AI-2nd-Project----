import React, { useContext } from "react";
import {
  UserStateContext,
  DispatchContext,
  ModalVisibleContext,
} from "../../../App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faMagnifyingGlass,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MODAL_TYPE } from "../../../hooks/useModal";
import Avatar from "../Avatar";

const NavBar = ({ avatarUrl, setAvatarUrl }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const { setModalVisible } = useContext(ModalVisibleContext);

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand onClick={() => navigate("/")} className="logo">
            깨끗 海
          </Navbar.Brand>
          <Nav className="align-items-center">
            <Nav.Link onClick={() => navigate("/search")}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="search">검색</Tooltip>}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/reviews")}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="browse">둘러보기</Tooltip>}
              >
                <FontAwesomeIcon icon={faCompass} />
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/graph")}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="graph">그래프</Tooltip>}
              >
                <FontAwesomeIcon icon={faChartLine} />
              </OverlayTrigger>
            </Nav.Link>
            {/* 로그인 한 유저에게만 보이기 */}
            {/* to do: 임시!! 로그아웃되면 null이어야하는데 {} 빈 객체가 찍히고있음 */}
            {user ? (
              <>
                <Nav.Link
                  onClick={() =>
                    setModalVisible({
                      type: MODAL_TYPE.addReview,
                      isVisible: true,
                      data: null,
                    })
                  }
                >
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="upload">업로드</Tooltip>}
                  >
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </OverlayTrigger>
                </Nav.Link>
                <Nav.Item>
                  <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                </Nav.Item>
                {/* 아바타 */}
                <Avatar width={30} user={user} />
              </>
            ) : (
              <Nav.Item>
                <Nav.Link onClick={login}>로그인</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
