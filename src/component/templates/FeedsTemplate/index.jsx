"use client";
import React, { useState } from "react";
import classes from "./FeedsTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { Input } from "@/component/atoms/Input";
import { IoSearchOutline } from "react-icons/io5";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import FeedsCard from "@/component/molecules/FeedsCard/FeedsCard";
import { feedsData } from "@/developmentContent/dummyData";
import VideoModalSkeleton from "@/component/molecules/Modal/VideoModalSkeleton/page";

const FeedsTemplate = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("Jan 24, 2023");
  const [selectedFeed, setSelectedFeed] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const openVideo = (feedId) => {
    setActiveVideo(feedId);
    setShowAllComments(false);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // In a real app, you would add the comment to the database
    // For now, we'll just clear the input
    setNewComment("");
  };

  const activeFeed =
    activeVideo !== null
      ? feedsData.find((feed) => feed.id === activeVideo)
      : null;

  return (
    <>
      <TopHeader title="Feed">
        <Input
          mainContClassName={classes?.customStyle}
          placeholder={"Search By Name"}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
        />
        <DropDown placeholder={"Feed"} />
      </TopHeader>
      <div className={classes?.mainWrapper}>
          <div className={classes.feedsList}>
            {feedsData.map((feed) => (
        <BorderWrapper>
              <FeedsCard key={feed.id} feed={feed} onOpenVideo={openVideo} />
            </BorderWrapper>
            ))}
          </div>
      </div>

      <VideoModalSkeleton
        show={activeVideo !== null}
        setShow={(show) => !show && closeVideo()}
        header={activeFeed?.title}
        width="900px"
        onBack={closeVideo}
        activeFeed={activeFeed}
        showAllComments={showAllComments}
        setShowAllComments={setShowAllComments}
        handleSubmitComment={handleSubmitComment}
        newComment={newComment}
        setNewComment={setNewComment}
      />
    </>
  );
};

export default FeedsTemplate;
