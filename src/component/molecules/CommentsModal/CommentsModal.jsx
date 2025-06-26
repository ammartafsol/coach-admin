"use client";

import RenderToast from "@/component/atoms/RenderToast";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import Modal from "../Modal/ModalSkeleton/Modal";
import styles from "./CommentsModal.module.css";
import useAxios from "@/interceptor/axiosInterceptor";
import NoData from "@/component/atoms/NoData/NoData";
import { mediaUrl } from "@/resources/utils/helper";
import { Loader } from "@/component/atoms/Loader";
import Button from "@/component/atoms/Button";

export default function CommentsModal({
  isOpen,
  onClose,
  feedSlug,
  onCommentDeleted,
}) {
  const { user } = useSelector((state) => state.authReducer);
  const { Get, Delete } = useAxios();
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const commentsContainerRef = useRef(null);
  const [loading, setLoading] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [loadingReplies, setLoadingReplies] = useState({});

  // Helper to inject fetched replies into the state
  const injectReplies = (allComments, parentId, newReplies) => {
    return allComments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: newReplies };
      }
      if (
        comment.replies &&
        comment.replies.length > 0 &&
        typeof comment.replies[0] === "object"
      ) {
        return {
          ...comment,
          replies: injectReplies(comment.replies, parentId, newReplies),
        };
      }
      return comment;
    });
  };
  // get comments
  const getComments = async (parentCommentId = null) => {
    if (parentCommentId) {
      setLoadingReplies((prev) => ({ ...prev, [parentCommentId]: true }));
    } else {
      setLoading("getting");
    }

    const route = parentCommentId
      ? `admin/comments/${feedSlug}?parentCommentId=${parentCommentId}`
      : `admin/comments/${feedSlug}`;

    const { response } = await Get({ route });

    if (response?.data) {
      const transformComment = (apiComment) => ({
        id: apiComment._id,
        author: {
          name:
            apiComment.user.fullName === user?.fullName
              ? `${apiComment.user.fullName} (You)`
              : apiComment.user.fullName,
          avatar: mediaUrl(apiComment.user.photo),
        },
        content: apiComment.content,
        timestamp: apiComment.createdAt,
        replies: apiComment.replies || [],
        parentComment: apiComment.parentComment,
      });

      const fetchedComments = response.data.map(transformComment);

      if (parentCommentId) {
        setComments((currentComments) =>
          injectReplies(currentComments, parentCommentId, fetchedComments)
        );
      } else {
        const topLevelComments = fetchedComments.filter(
          (c) => !c.parentComment
        );
        setComments(topLevelComments);
      }
    }

    if (parentCommentId) {
      setLoadingReplies((prev) => {
        const newLoading = { ...prev };
        delete newLoading[parentCommentId];
        return newLoading;
      });
    } else {
      setLoading("");
    }
  };

  // delete comment
  const deleteComment = async (commentId) => {
    setDeletingCommentId(commentId);

    const { response, error } = await Delete({
      route: `admin/comments/${commentId}`,
    });

    setDeletingCommentId(null);

    if (response && response.status === "success") {
      // Remove the comment from the state (including nested replies)
      const removeCommentFromState = (commentsArray, targetId) => {
        return commentsArray.filter((comment) => {
          if (comment.id === targetId) {
            return false; // Remove this comment
          }
          if (comment.replies && comment.replies.length > 0) {
            comment.replies = removeCommentFromState(comment.replies, targetId);
          }
          return true;
        });
      };

      setComments((prev) => removeCommentFromState(prev, commentId));

      // Notify parent component to update comment count
      if (onCommentDeleted) {
        onCommentDeleted();
      }

      RenderToast({
        type: "success",
        message: "Comment deleted successfully.",
      });
    } else {
      RenderToast({
        type: "error",
        message: "Failed to delete comment.",
      });
    }
  };

  // get comments
  useEffect(() => {
    if (isOpen) {
      getComments();
    } else {
      setShowAllComments(false);
    }
  }, [isOpen, feedSlug]);

  // if (!isOpen) return null;

  // delete comment
  const handleDelete = (commentId) => {
    deleteComment(commentId);
  };

  // get comments
  const handleViewReplies = (commentId) => {
    getComments(commentId);
  };

  // get comments
  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  // Format timestamp to "X day(s) ago"
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffInDays = Math.floor((now - commentDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  // Render a comment and its replies recursively
  const renderComment = (comment, depth = 0) => {
    // Limit nesting to 3 levels (0-2)
    const maxDepth = 2;
    const hasUnfetchedReplies =
      comment.replies?.length > 0 && typeof comment.replies[0] === "string";
    const hasFetchedReplies =
      comment.replies?.length > 0 && typeof comment.replies[0] === "object";

    return (
      <div
        key={comment.id}
        className={`${styles.commentItem} ${
          depth > 0 ? styles.replyComment : ""
        }`}
      >
        {depth > 0 && <div className={styles.replyLine}></div>}
        <div className={styles.commentContent}>
          <div className={styles.commentAvatar}>
            <img
              src={comment.author.avatar || "/placeholder.svg"}
              alt={comment.author.name}
            />
          </div>
          <div className={styles.commentBody}>
            <div className={styles.commentAuthor}>{comment.author.name}</div>
            <div className={styles.commentText}>{comment.content}</div>
            <div className={styles.commentActions}>
              <span className={styles.commentTime}>
                {formatTimestamp(comment.timestamp)}
              </span>
              <button
                className={styles.replyButton}
                onClick={() => handleDelete(comment.id)}
                disabled={deletingCommentId === comment.id}
              >
                {deletingCommentId === comment.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>

        {hasFetchedReplies && depth < maxDepth && (
          <div className={styles.repliesContainer}>
            {comment.replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}

        {hasUnfetchedReplies && depth < maxDepth && (
          <div className={styles.viewRepliesContainer}>
            {loadingReplies[comment.id] ? (
              <div className={styles.smallLoader}></div>
            ) : (
              <button
                className={styles.viewRepliesButton}
                onClick={() => handleViewReplies(comment.id)}
              >
                View {comment.replies.length} replies
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // Determine which comments to display
  const displayedComments = showAllComments ? comments : comments.slice(0, 5);
  const totalComments = countTotalComments(comments);
  const remainingComments = totalComments - displayedComments.length;

  // Helper function to count total comments including replies
  function countTotalComments(commentsArray) {
    let count = commentsArray.length;

    for (const comment of commentsArray) {
      if (comment.replies && comment.replies.length > 0) {
        count += countTotalComments(comment.replies);
      }
    }

    return count;
  }

  return (
    <Modal
      show={isOpen}
      setShow={(show) => {
        if (!show) {
          onClose();
        }
      }}
      size="lg"
      modalBodyClass={styles.commentsModal}
    >
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Comments</h2>
        </div>

        <div className={styles.commentsContainer} ref={commentsContainerRef}>
          {loading === "getting" ? (
            <Loader />
          ) : (
            <>
              {displayedComments.length > 0 ? (
                <>
                  {displayedComments.map((comment) => renderComment(comment))}

                  {!showAllComments && comments.length > 5 && (
                    <Button
                      label={`View all ${remainingComments} Comments`}
                      onClick={toggleShowAllComments}
                      className={styles.viewAllButton}
                      rightIcon={<IoIosArrowDown />}
                    />
                  )}
                </>
              ) : (
                <div className={styles.noComments}>
                  <NoData
                    className={styles.commentClass}
                    text="No comments yet."
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
