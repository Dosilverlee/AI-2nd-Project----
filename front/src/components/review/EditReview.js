import { useCallback, useContext, useState } from "react";
import ReviewFormContainer from "./layout/ReviewFormContainer";
import useToast from "../../hooks/useToast";
import { UserStateContext } from "../../App";
import * as Api from "../../Api";
import useModal from "../../hooks/useModal";
import ToastWrapper from "../common/popup/ToastWrapper";
import validationReview from "../../util/validation.js/review";
import { RESULT_ENUM } from "../../constants";

const EditReview = ({
  userInputValues,
  setUserInputValues,
  setReviews,
  setUploadingStatus,
}) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, closeModal } = useModal();
  const currentReviewData = modalVisible?.data?.review;
  // 모달창 열 때 받아온 데이터를 저장한다
  const [editedReview, setEditedReview] = useState(currentReviewData);
  const { showToast, setShowToast, toastData } = useToast();
  const [preview, setPreview] = useState(null);

  const handleSubmit = useCallback(async () => {
    try {
      const validationError = validationReview(loggedInUser, editedReview);
      if (validationError) {
        setShowToast(validationError.message, validationError.status);
        console.log(validationError.message);
        return;
      }
      setUploadingStatus(RESULT_ENUM.UPLOADING);
      const res = await Api.put(`reviews/${currentReviewData._id}`, {
        title: editedReview.title,
        content: editedReview.content,
      });

      if (!res.data) {
        return setUploadingStatus(RESULT_ENUM.FAIL);
      }
      setUploadingStatus(RESULT_ENUM.SUCCESS);
      closeModal();
      setReviews((current) => [
        ...current,
        editedReview.title,
        editedReview.content,
      ]);
      setEditedReview(null);
    } catch (error) {
      console.log(error);
    }
  }, [
    closeModal,
    loggedInUser,
    setReviews,
    setUserInputValues,
    userInputValues,
    currentReviewData,
    editedReview,
  ]);

  return (
    <>
      {showToast && <ToastWrapper toastData={toastData} />}
      <ReviewFormContainer
        headerTitle="수정하기"
        userInputValues={userInputValues}
        setUserInputValues={setUserInputValues}
        handleSubmit={handleSubmit}
        preview={preview}
        setPreview={setPreview}
        editedReview={editedReview}
        setEditedReview={setEditedReview}
      />
    </>
  );
};

export default EditReview;
