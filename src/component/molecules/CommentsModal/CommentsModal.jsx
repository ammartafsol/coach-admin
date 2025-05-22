"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "../../molecules/Modal/Modal";
import styles from "./CommentsModal.module.css";
import { GoRocket } from "react-icons/go";

export default function CommentsModal({ isOpen, onClose, feedId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const commentInputRef = useRef(null);
  const commentsContainerRef = useRef(null);

  // Mock comments data
  useEffect(() => {
    if (isOpen) {
      // Generate mock comments when modal opens
      const mockComments = generateMockComments();
      setComments(mockComments);
    } else {
      // Reset state when modal closes
      setNewComment("");
      setReplyingTo(null);
      setShowAllComments(false);
    }
  }, [isOpen, feedId]);

  // Focus input when replying
  useEffect(() => {
    if (replyingTo && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [replyingTo]);

  if (!isOpen) return null;

  const handleReply = (commentId) => {
    const comment = findComment(commentId, comments);
    if (comment) {
      setReplyingTo(comment);
      // Scroll to input
      if (commentInputRef.current) {
        setTimeout(() => {
          commentInputRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const currentDate = new Date();

    const newCommentObj = {
      id: `comment-${Date.now()}`,
      author: {
        name: "You",
        avatar: "/Images/app-images/image-coach-3.png",
      },
      content: newComment,
      timestamp: currentDate,
      replies: [],
    };

    if (replyingTo) {
      // Add as a reply
      const updatedComments = addReplyToComment(
        comments,
        replyingTo.id,
        newCommentObj
      );
      setComments(updatedComments);
      setReplyingTo(null);
    } else {
      // Add as a new comment
      setComments([...comments, newCommentObj]);
    }

    setNewComment("");
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  // Helper function to find a comment by ID (recursive)
  const findComment = (commentId, commentsArray) => {
    for (const comment of commentsArray) {
      if (comment.id === commentId) {
        return comment;
      }
      if (comment.replies && comment.replies.length > 0) {
        const found = findComment(commentId, comment.replies);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper function to add a reply to a comment (recursive)
  const addReplyToComment = (commentsArray, commentId, reply) => {
    return commentsArray.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, commentId, reply),
        };
      }
      return comment;
    });
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

  // Generate mock comments
  const generateMockComments = () => {
    const users = [
      { name: "Jenny Wilson", avatar: "/Images/app-images/image-coach-3.png" },
      { name: "Robert Fox", avatar: "/Images/app-images/image-coach-1.png" },
      { name: "Esther Howard", avatar: "/Images/app-images/image-coach-3.png" },
      {
        name: "Cameron Williamson",
        avatar: "/Images/app-images/image-coach-1.png",
      },
      {
        name: "Brooklyn Simmons",
        avatar: "/Images/app-images/image-coach-3.png",
      },
    ];

    const loremText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus. Lorem ipsum dolor sit amet aliquam, purus sit amet luctus.";

    const generateComment = (depth = 0, maxDepth = 3, replyChance = 0.7) => {
      const user = users[Math.floor(Math.random() * users.length)];
      const daysAgo = Math.floor(Math.random() * 7) + 1;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      const comment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        author: user,
        content: loremText,
        timestamp: date,
        replies: [],
      };

      // Add replies with decreasing probability based on depth
      if (depth < maxDepth && Math.random() < replyChance) {
        const numReplies = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numReplies; i++) {
          comment.replies.push(
            generateComment(depth + 1, maxDepth, replyChance - 0.3)
          );
        }
      }

      return comment;
    };

    // Generate 15-20 top-level comments
    const numComments = Math.floor(Math.random() * 6) + 15;
    const comments = [];

    for (let i = 0; i < numComments; i++) {
      comments.push(generateComment());
    }

    return comments;
  };

  // Render a comment and its replies recursively
  const renderComment = (comment, depth = 0) => {
    // Limit nesting to 4 levels (0-3)
    const maxDepth = 3;

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
              src={"/images/cms-images/profile.png"}
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
              {depth < maxDepth && (
                <button
                  className={styles.replyButton}
                  onClick={() => handleReply(comment.id)}
                >
                  reply
                </button>
              )}
            </div>
          </div>
        </div>

        {comment.replies && comment.replies.length > 0 && depth < maxDepth && (
          <div className={styles.repliesContainer}>
            {comment.replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Determine which comments to display
  const displayedComments = showAllComments ? comments : comments.slice(0, 5);
  const totalComments = countTotalComments(comments);

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
      isOpen={isOpen}
      onClose={onClose}
      customModalContent={styles.commentsModal}
    >
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <button className={styles.backButton} onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              color="black"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h2 className={styles.modalTitle}>Comments</h2>
        </div>

        <div className={styles.commentsContainer} ref={commentsContainerRef}>
          {displayedComments.map((comment) => renderComment(comment))}

          {!showAllComments && comments.length > 5 && (
            <button
              className={styles.viewAllButton}
              onClick={toggleShowAllComments}
            >
              View all {totalComments} comments
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: 2 }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          )}
        </div>

        <div className={styles.commentInputContainer}>
          {replyingTo && (
            <div className={styles.replyingToContainer}>
              <div className={styles.replyingToText}>
                Replying to{" "}
                <span className={styles.replyingToName}>
                  {replyingTo.author.name}
                </span>
              </div>
              <button
                className={styles.cancelReplyButton}
                onClick={handleCancelReply}
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmitComment} className={styles.commentForm}>
            <input
              type="text"
              placeholder="Start typing..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={styles.commentInput}
              ref={commentInputRef}
            />
            <button type="submit" className={styles.sendButton}>
              <GoRocket color="#fff" />
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
