import {
  faArrowLeft,
  faArrowRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { serverUrl } from "../../Api";

const prevIcon = (
  <FontAwesomeIcon icon={faArrowLeft} className="carousel-arrow-icon" />
);

const nextIcon = (
  <FontAwesomeIcon icon={faArrowRight} className="carousel-arrow-icon" />
);

const CarouselWrapper = ({ preview, setPreview, imageUrls }) => {
  // 업로드, 수정 할 때 삭제버튼 누르면 하나씩 제거
  const removeUrl = (index) => {
    setPreview((current) => {
      return [...current].filter((_, idx) => idx !== index);
    });
  };

  const urls = imageUrls ? imageUrls : preview;
  console.log(urls);
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
          <Carousel.Item key={url}>
            <Image
              src={url && url?.includes("blob") ? url : `${serverUrl}${url}`}
              fluid
            />
            {/* preview 삭제버튼 */}
            <Carousel.Caption className="d-flex justify-content-end">
              <Button variant="danger" onClick={() => removeUrl(index)}>
                삭제 <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselWrapper;
