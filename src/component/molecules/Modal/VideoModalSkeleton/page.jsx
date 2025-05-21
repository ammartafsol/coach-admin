"use client"

import { Pause, RefreshCw } from "lucide-react";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import classes from "./VideoModalSkeleton.module.css"

export default function VideoModalSkeleton({show,newComment,setNewComment,handleSubmitComment,setShow,width,onBack,header,activeFeed,showAllComments,setShowAllComments}){
    return(
 <ModalSkeleton
        show={show}
        setShow={setShow}
        header={header}
        width={width}
        onBack={onBack}
      >
        {activeFeed && (
          <div className={classes.videoModalContent}>
            {/* Main Video */}
            <div className={classes.videoPlayer}>
              <iframe
                src={activeFeed.video}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={activeFeed.title}
              ></iframe>

              {/* Video Controls */}
              <div className={classes.videoControls}>
                <div className={classes.controlButtons}>
                  <button className={classes.controlButton}>
                    <RefreshCw size={20} />
                  </button>
                  <button className={classes.controlButton}>
                    <Pause size={20} />
                  </button>
                  <button className={classes.controlButton}>
                    <RefreshCw size={20} />
                  </button>
                </div>
                <div className={classes.progressBar}>
                  <div className={classes.progress}></div>
                </div>
              </div>
            </div>

            {/* Video Thumbnails */}
            <div className={classes.thumbnailsRow}>
              <div className={classes.thumbnail}>
                <Image
                  src={activeFeed.image || "/placeholder.svg"}
                  alt="Video thumbnail"
                  width={200}
                  height={120}
                  className={classes.thumbnailImg}
                />
              </div>
              <div className={classes.thumbnail}>
                <Image
                  src={activeFeed.image || "/placeholder.svg"}
                  alt="Video thumbnail"
                  width={200}
                  height={120}
                  className={classes.thumbnailImg}
                />
              </div>
            </div>

            {/* Author Info */}
            <div className={classes.modalAuthorInfo}>
              <div className={classes.authorAvatar}>
                <Image
                  src={`/placeholder.svg?height=50&width=50&query=coach portrait`}
                  alt={activeFeed.author}
                  width={50}
                  height={50}
                  className={classes.avatarImage}
                />
              </div>
              <div className={classes.authorDetails}>
                <h3 className={classes.authorName}>{activeFeed.author}</h3>
                <span className={classes.category}>{activeFeed.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className={classes.modalContent}>
              <p>{activeFeed.content}</p>
            </div>

            {/* PDF Attachment */}
            {activeFeed.pdfAttachment && (
              <div className={classes.pdfAttachment}>
                <div className={classes.pdfIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#FF0000" />
                    <path
                      d="M7 18H17V16H7V18ZM7 14H17V12H7V14ZM7 10H17V8H7V10ZM5 22C4.45 22 3.979 21.804 3.587 21.413C3.195 21.021 3 20.55 3 20V4C3 3.45 3.195 2.979 3.587 2.587C3.979 2.195 4.45 2 5 2H15L21 8V20C21 20.55 20.804 21.021 20.413 21.413C20.021 21.804 19.55 22 19 22H5ZM14 9V4H5V20H19V9H14Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <a href={activeFeed.pdfAttachment.url} className={classes.pdfLink}>
                  {activeFeed.pdfAttachment.name}
                </a>
              </div>
            )}

            {/* Comments Section */}
            <div className={classes.commentsSection}>
              <h3 className={classes.commentsTitle}>Comments</h3>

              {/* Comments List */}
              <div className={classes.commentsList}>
                {(showAllComments ? activeFeed.comments : activeFeed.comments.slice(0, 3)).map((comment) => (
                  <div key={comment.id} className={classes.comment}>
                    <div className={classes.commentAvatar}>
                      <Image
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        width={40}
                        height={40}
                        className={classes.avatarImage}
                      />
                    </div>
                    <div className={classes.commentContent}>
                      <div className={classes.commentHeader}>
                        <h4 className={classes.commentAuthor}>{comment.author}</h4>
                        <div className={classes.commentMeta}>
                          <span className={classes.commentTime}>{comment.time}</span>
                          <button className={classes.deleteBtn}>Delete</button>
                        </div>
                      </div>
                      <p className={classes.commentText}>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Comments */}
              {activeFeed.comments.length > 3 && !showAllComments && (
                <button className={classes.viewAllBtn} onClick={() => setShowAllComments(true)}>
                  View all {activeFeed.comments.length} comments
                </button>
              )}

              {/* Add Comment Form */}
              <form className={classes.commentForm} onSubmit={handleSubmitComment}>
                <div className={classes.commentInputWrapper}>
                  <div className={classes.commentAvatar}>
                    <Image
                      src="/woman-profile.png"
                      alt="Your avatar"
                      width={40}
                      height={40}
                      className={classes.avatarImage}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className={classes.commentInput}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
                <button type="submit" className={classes.submitCommentBtn}>
                  Post
                </button>
              </form>
            </div>
          </div>
        )}
      </ModalSkeleton>
    )
}


