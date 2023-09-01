import React from "react";
import { Image, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../constants";
//React.forwardRef ref
const Avatar = ({ width, user }) => {
  const navigate = useNavigate();
  // console.log(user.uploadFile[0]);
  // const src = `http://${window.location.hostname}${}`;
  // const handleError = (e) => {
  //   e.target.src = DEFAULT_AVATAR; // 대체 이미지로 변경
  // };
  console.log(window.location.hostname);

  return (
    <Nav.Link onClick={() => navigate(`/users/${user._id}`)}>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="profile">프로필</Tooltip>}
      >
        <Image
          src={
            user?.uploadFile && user?.uploadFile[0]
              ? `http://${window.location.hostname}:5001/${user.uploadFile[0]}`
              : "https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png"
          }
          width={width}
          height={width}
          roundedCircle={true}
          alt="avatar"
          onError={(e) =>
            (e.currentTarget.src =
              "https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png")
          }
        />
      </OverlayTrigger>
    </Nav.Link>
  );
};

export default Avatar;
