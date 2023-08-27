import React from "react";
import { ListGroup, Modal } from "react-bootstrap";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import * as Api from "../../../Api";

/**
 * 수정, 삭제, 취소 선택하는 모달창 --- 수정 중
 *
 *
 *
 *
 */
const ActionSelectorModal = () => {
  // commentId가 있다면 comment를 삭제
  // reviewId가 있다면 reviewId를 삭제
  const { closeModal, openModal, modalVisible } = useModal();
  const isEditingReview = modalVisible.data.target === MODAL_TYPE.editReview;
  const isDeleteingReview =
    modalVisible.data.target === MODAL_TYPE.deleteReview;

  const review = isEditingReview && modalVisible.data.review;
  const setReviews = isEditingReview && modalVisible.data.setReviews;
  const commentId = modalVisible?.data?.commentId;

  const deleteById = async () => {
    console.log(modalVisible.data);
    try {
      if (isDeleteingReview) {
        const res = await Api.delete(`reviews/${review._id}`);
        if (!res.status === 204) {
          throw new Error("failed");
        }
        setReviews((current) => {
          const currentReviews = [...current];
          return currentReviews.filter((item) => item._id !== review._id);
        });
      } else if (commentId) {
        // delete comment
        console.log("hi");
      }
      // alert("성공");
      closeModal();
    } catch (error) {
      alert(error);
      // to do: 에러 메세지!_!
    }
  };

  const isActionPopupOpen = modalVisible.type === MODAL_TYPE.actionSelector;

  return (
    <Modal
      show={isActionPopupOpen}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter" // to do: 정체가 뭐임
      centered
    >
      <ListGroup className="text-center">
        {isEditingReview && (
          <ListGroup.Item
            action
            onClick={() => {
              if (review) {
                openModal(MODAL_TYPE.editReview, {
                  ...modalVisible.data,
                  review,
                });
              }
            }}
          >
            수정
          </ListGroup.Item>
        )}
        <ListGroup.Item action className="delete" onClick={deleteById}>
          삭제
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => closeModal()}>
          취소
        </ListGroup.Item>
      </ListGroup>
    </Modal>
  );
};

export default ActionSelectorModal;
