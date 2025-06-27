"use client";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import ButtonTabs from "@/component/atoms/ButtonTabs";
import CommentsModal from "@/component/molecules/CommentsModal/CommentsModal";
import FeedsCard from "@/component/molecules/FeedsCard/FeedsCard";
import VideoModalSkeleton from "@/component/molecules/VideoModalSkeleton";
import React, { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import classes from "./FeedsCom.module.css";
import NoData from "@/component/atoms/NoData/NoData";
import { RECORDS_LIMIT } from "@/const";
import Button from "@/component/atoms/Button";

const FeedsCom = ({
  feedsData,
  setSearch,
  feedsCategory,
  loading,
  totalRecords,
  page,
  setPage,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [activeFeedSlug, setActiveFeedSlug] = useState(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [localFeedsData, setLocalFeedsData] = useState(feedsData);

  React.useEffect(() => {
    setLocalFeedsData(feedsData);
  }, [feedsData]);

  const handleOpenVideo = (feedId) => {
    setActiveFeedSlug(feedId);
    setIsOpenVideo(true);
  };

  const handleCloseVideo = () => {
    setIsOpenVideo(false);
    setActiveFeedSlug(null);
  };

  const handleOpenComments = (feedSlug) => {
    setActiveFeedSlug(feedSlug);
    setIsCommentsOpen(true);
  };

  const handleCloseComments = () => {
    setIsCommentsOpen(false);
    setActiveFeedSlug(null);
  };

  const handleCommentDeleted = () => {
    if (activeFeedSlug) {
      setLocalFeedsData((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed.slug === activeFeedSlug
            ? {
                ...feed,
                commentsCount: Math.max(0, (feed.commentsCount || 0) - 1),
              }
            : feed
        )
      );
    }
  };

  const activeFeed =
    activeFeedSlug !== null
      ? localFeedsData.find((feed) => feed.slug === activeFeedSlug)
      : null;

  return (
    <>
      <div>
        <ScrollContainer>
          <ButtonTabs
            setSelectButton={setSelectedCategory}
            selectButton={selectedCategory}
            tabs={feedsCategory}
          />
        </ScrollContainer>
      </div>
      <div className={classes?.mainWrapper}>
        <div className={classes.feedsList}>
          {localFeedsData.length > 0 ? (
            localFeedsData?.map((feed, index) => (
              <BorderWrapper key={index}>
                <FeedsCard
                  key={feed.id}
                  feed={feed}
                  setIsOpen={handleOpenVideo}
                  onOpenComments={() => handleOpenComments(feed?.slug)}
                />
              </BorderWrapper>
            ))
          ) : (
            <NoData text="No feeds found" />
          )}
          {totalRecords > RECORDS_LIMIT && (
            <div className={classes?.loadMoreContainer}>
              <Button
                variant={"outlined"}
                className={classes?.loadMoreButton}
                onClick={() => {
                  setPage(page + 1);
                  getData({ page: page + 1 });
                }}
              >
                {loading === "loading" ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <CommentsModal
        isOpen={isCommentsOpen}
        onClose={handleCloseComments}
        feedSlug={activeFeedSlug}
        onCommentDeleted={handleCommentDeleted}
      />

      <VideoModalSkeleton
        isOpen={isOpenVideo}
        setIsOpenVideo={setIsOpenVideo}
        onClose={handleCloseVideo}
        activeFeed={activeFeed}
      />
    </>
  );
};

export default FeedsCom;
