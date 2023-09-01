import React from "react";
import { Image, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../constants";

const Avatar = React.forwardRef(
  ({ width, user, avatarUrl, setAvatarUrl }, ref) => {
    const navigate = useNavigate();
    const src = `http://${window.location.hostname}${avatarUrl}`;
    const handleError = (e) => {
      e.target.src = DEFAULT_AVATAR; // 대체 이미지로 변경
    };

    return (
      <Nav.Link onClick={() => navigate(`/users/${user._id}`)} ref={ref}>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="profile">프로필</Tooltip>}
        >
          <Image
            src={src}
            width={width}
            height={width}
            roundedCircle={true}
            alt="avatar"
            enError={handleError}
          />
        </OverlayTrigger>
      </Nav.Link>
    );
  }
);

export default Avatar;
