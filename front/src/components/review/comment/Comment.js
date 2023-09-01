import Avatar from "../../common/Avatar";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import Timestamp from "../../common/microComponents/Timestamp";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import { Form } from "react-bootstrap";
import * as Api from "../../../Api";

const Comment = ({ comment, setComments, setNewComments, setCommentCount }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const { userId } = comment;
  const { modalVisible, openModal } = useModal();
  const isMyComment = loggedInUser && loggedInUser._id === userId;
  /// set comments 필요함

  // 만약 modalVisible에 currentComment가 있다면
  // 해당 코멘트 id로 커맨트 창을 찾아서 edit input 을 보여준다
  const targetId = modalVisible.data?.currentComment?._id;

  const [isEditing, setIsEditing] = useState(targetId === comment._id);
  const [user, setUser] = useState(null);
  const [editCommentValue, setEditCommentValue] = useState(
    comment?.content || modalVisible.data?.currentComment?.content
  );
  const [result, setResult] = useState(comment);

  const onEditComment = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`comments/${comment._id}`, {
        content: editCommentValue,
      });
      if (!res.ok) throw new Error("업데이트에 실패했습니다");

      setResult(res.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getUserAvatar = async () => {
      const res = await Api.get(`users/${userId}`);
      setUser(res.data);
    };
    getUserAvatar();
  }, [userId]);

  return (
    <>
      {
        <div className="comment__container">
          <div className="comment__col comment__title">
            {!isEditing && (
              <div className="text-content comment__author">
                <Avatar
                  user={user}
                  className="comment__avatar"
                  width="30"
                  onClick={() => navigate(`/users/${userId}`)}
                />
                <span className="text-author">{result.userName}</span>
                {result.content}
              </div>
            )}
          </div>
          <div className="comment__col link">
            {!isEditing && (
              <Timestamp
                createdAt={result.date}
                className="text-timestamp comment__timestamp flex-justify-end"
              />
            )}

            {isMyComment && !isEditing && (
              <div className="comment__btn-col">
                <div
                  className="comment__edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </div>
                <div
                  className="comment__col flex-justify-end link comment__edit-btn"
                  onClick={() => {
                    openModal(MODAL_TYPE.actionSelector, {
                      target: MODAL_TYPE.deleteComment,
                      commentId: comment._id,
                      setComments,
                      setNewComments,
                      setCommentCount,
                    });
                  }}
                >
                  삭제
                </div>
              </div>
            )}

            {isMyComment && isEditing && (
              <Form
                onSubmit={onEditComment}
                className="comment__edit-input-container"
              >
                <input
                  className="comment__edit-input comment__input"
                  value={editCommentValue}
                  onChange={(e) => setEditCommentValue(e.target.value)}
                />
                <div className="comment__complete-btn" onClick={onEditComment}>
                  게시
                </div>
                <div
                  className="comment__edit-btn "
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </div>
              </Form>
            )}
          </div>
        </div>
      }
    </>
  );
};
export default Comment;
