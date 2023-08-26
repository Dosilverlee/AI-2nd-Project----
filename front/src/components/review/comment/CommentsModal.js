import { CloseButton, Col, Container, Modal, Row } from "react-bootstrap";
import ReviewTitle from "../ReviewHeader";
import CarouselWrapper from "../../common/Carousel";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";

// 리뷰와 함께 댓글 목록을 볼 수 있고, 댓글을 수정, 삭제 할 수 있는 모달창
// 업데이트시 해야할 일
// 1. background에 보이는 커맨트 리스트를 업데이트 해야함
// 2. 모달창에 있는 커맨트 리스트 업데이트
// -> 모든 커멘트 목록이 필요
const CommentsModal = () => {
  const { modalVisible } = useModal();
  const { review, comments, setReviews } = modalVisible;
  const { closeModal } = useModal();

  // review,
  // setReviews,
  // displayedComments,
  // setDisplayedComments,
  return (
    <Modal
      sm={1}
      lg={6}
      show={modalVisible.type === MODAL_TYPE.commentsList}
      onHide={closeModal}
      centered
    >
      <Row className="flex-row-center-center carousel-bg-black">
        <ReviewTitle review={modalVisible.data} className="commentModal__title">
          <CloseButton
            className="close-btn"
            // to do: 댓글 입력중이었다면 경고창 먼저 띄우기
            onClick={closeModal}
          />
        </ReviewTitle>
        <Col className="carousel-bg-white">
          <CarouselWrapper
            className="carousel__container"
            preview={[
              "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
              "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
            ]}
          />
        </Col>
        <Col className="carousel-bg-white">
          <Container>
            <Row className="py-4 mx-2">
              {comments?.map((comment) => (
                <Comment comment={comment} />
              ))}
              <AddCommentForm setModalComments={comments} />
            </Row>
          </Container>
        </Col>
      </Row>
    </Modal>
  );
};

export default CommentsModal;
