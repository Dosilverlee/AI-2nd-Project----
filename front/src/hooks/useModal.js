import { useContext } from "react";
import { ModalVisibleContext } from "../App";

export const MODAL_TYPE = {
  commentsList: "COMMENTS_LIST",
  actionSelector: "ACTION_SELECTOR",
  addReview: "ADD_REVIEW",
  editReview: "EDIT_REVIEW_FORM",
  deleteReview: "DELETE_REVIEW",
  editComment: "EDIT_COMMENT",
  deleteComment: "DELETE_COMMENT",
};

/**
 * @description 모달창 열고 닫는 용도! 어떤 모달창을 열지 전달. 모달창 안에서 필요한 정보가 있다면 전달
 * @type (type: MODAL_TYPE.type) /src/constants 파일에서 import 해서 사용한다
 *
 */
const useModal = () => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);

  const closeModal = () => {
    setModalVisible({
      type: null,
      isVisible: false,
      data: null,
    });
  };

  const openModal = (type, data) => {
    return setModalVisible({
      type,
      isVisible: true,
      data,
    });
  };
  return { modalVisible, setModalVisible, closeModal, openModal };
};

export default useModal;
