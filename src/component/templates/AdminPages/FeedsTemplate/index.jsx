"use client"
import { useState } from "react"
import classes from "./FeedsTemplate.module.css"
import TopHeader from "@/component/atoms/TopHeader"
import DropDown from "@/component/molecules/DropDown/DropDown"
import { Input } from "@/component/atoms/Input"
import { IoSearchOutline } from "react-icons/io5"
import BorderWrapper from "@/component/atoms/BorderWrapper"
import FeedsCard from "@/component/molecules/FeedsCard/FeedsCard"
import { feedsData } from "@/developmentContent/dummyData"
import VideoModalSkeleton from "@/component/molecules/VideoModalSkeleton"
import Modal from "@/component/molecules/Modal/ModalSkeleton/Modal"
import CommentsModal from "@/component/molecules/CommentsModal/CommentsModal"

const FeedsTemplate = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState("Jan 24, 2023")
  const [selectedFeed, setSelectedFeed] = useState("All")
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [activeFeedId, setActiveFeedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  const handleOpenVideo = (feedId) => {
    setActiveFeedId(feedId)
    setIsOpenVideo(true)
  }

  const handleCloseVideo = () => {
    setIsOpenVideo(false)
    setActiveFeedId(null)
  }

  const handleOpenComments = () => {
    setIsCommentsOpen(true)
  }

  const handleCloseComments = () => {
    setIsCommentsOpen(false)
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setNewComment("")
  }

  const activeFeed = activeFeedId !== null ? feedsData.find((feed) => feed.id === activeFeedId) : null

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
          {feedsData.map((feed, index) => (
            <BorderWrapper key={index}>
              <FeedsCard
                key={index}
                feed={feed}
                onOpenComments={() => setIsOpen(true)}
                setIsOpen={handleOpenVideo}
              />
            </BorderWrapper>
          ))}
        </div>
      </div>
      <CommentsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        feedId={feedsData[0].id}
      />
      <VideoModalSkeleton
        isOpen={isOpenVideo}
        setIsOpenVideo={setIsOpenVideo}
        onClose={handleCloseVideo}
        activeFeed={activeFeed}
      />
    </>
  )
}

export default FeedsTemplate
