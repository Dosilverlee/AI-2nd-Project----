import {
  faArrowLeft,
  faArrowRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { serverUrl } from "../../Api";
import useModal from "../../hooks/useModal";
import { DEFAULT_AVATAR, DEFAULT_IMAGE_URL } from "../../constants";

const prevIcon = (
  <FontAwesomeIcon icon={faArrowLeft} className="carousel-arrow-icon" />
);

const nextIcon = (
  <FontAwesomeIcon icon={faArrowRight} className="carousel-arrow-icon" />
);

const CarouselWrapper = ({ preview, setPreview, imageUrls }) => {
  const { modalVisible } = useModal();
  const editingReviewImgUrls = modalVisible?.data?.review?.uploadFile;

  // 업로드, 수정 할 때 삭제버튼 누르면 하나씩 제거
  const removeUrl = (index) => {
    setPreview((current) => {
      return [...current].filter((_, idx) => idx !== index);
    });
  };

  const urls = editingReviewImgUrls || imageUrls || preview || [];

  const handleError = (e) => {
    e.target.src = DEFAULT_IMAGE_URL; // 대체 이미지로 변경
  };

  return (
    <Carousel
      className={`carousel__container px-0`}
      interval={null}
      variant="dark"
      indicators={urls.length > 1}
      prevIcon={urls.length > 1 && prevIcon}
      nextIcon={urls.length > 1 && nextIcon}
    >
      {urls.map((url, index) => {
        return (
          <Carousel.Item key={`${url}-${index}`}>
            <Image
              src={url && url?.includes("blob") ? url : `${serverUrl}${url}`}
              alt="default-image"
              onError={handleError}
            />
            {/* preview 삭제버튼 */}
            {preview && (
              <Carousel.Caption className="d-flex justify-content-end">
                <Button variant="danger" onClick={() => removeUrl(index)}>
                  삭제 <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselWrapper;
