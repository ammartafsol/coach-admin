"use client";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import { Input } from "@/component/atoms/Input";
import TopHeader from "@/component/atoms/TopHeader";
import CommentsModal from "@/component/molecules/CommentsModal/CommentsModal";
import DropDown from "@/component/molecules/DropDown/DropDown";
import FeedsCard from "@/component/molecules/FeedsCard/FeedsCard";
import VideoModalSkeleton from "@/component/molecules/VideoModalSkeleton";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import classes from "./FeedsTemplate.module.css";
import { Loader } from "@/component/atoms/Loader";
import { FEED_STATUS_OPTIONS } from "@/developmentContent/dropdownOption";
import NoDataFound from "@/component/atoms/NoDataFound/NoDataFound";
import NoData from "@/component/atoms/NoData/NoData";

const FeedsTemplate = () => {
  const { Get } = useAxios();
  const [selectedDate, setSelectedDate] = useState("Jan 24, 2023");
  // const [selectedFeed, setSelectedFeed] = useState("All");
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [activeFeedSlug, setActiveFeedSlug] = useState(null);
  const [loading, setLoading] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [feedsData, setFeedsData] = useState([]);
  const [status, setStatus] = useState(FEED_STATUS_OPTIONS[0]);

  const getData = async () => {
    setLoading("loading");

    const params = {
      search: debouncedSearch,
      status: status.value,
    };
    const queryParams = new URLSearchParams(params).toString();

    const { response } = await Get({
      route: `admin/feeds?${queryParams}`,
    });

    if (response) {
      console.log("🚀 ~ FeedsTemplate ~ responseFeed00:", response);
      setFeedsData(response?.data || []);
    }

    setLoading("");
  };

  useEffect(() => {
    getData();
  }, [debouncedSearch, status]);

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
    // Update the comment count for the active feed
    if (activeFeedSlug) {
      setFeedsData((prevFeeds) =>
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

  if (loading === "loading") {
    return <Loader />;
  }

  return (
    <>
      <TopHeader title="Feed">
        <Input
          mainContClassName={classes?.customStyle}
          placeholder={"Search By Name"}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
        />
        <DropDown
          placeholder={"Feed"}
          options={FEED_STATUS_OPTIONS}
          value={status}
          setValue={setStatus}
        />
      </TopHeader>
      <div className={classes?.mainWrapper}>
        <div className={classes.feedsList}>
          {feedsData?.length > 0 ? (
            feedsData?.map((feed, index) => (
              <BorderWrapper key={index}>
                <FeedsCard
                  key={index}
                  feed={feed}
                  onOpenComments={() => handleOpenComments(feed?.slug)}
                  setIsOpen={handleOpenVideo}
                />
              </BorderWrapper>
            ))
          ) : (
            <NoData text="No Feeds found" />
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
      />
    </>
  );
};

export default FeedsTemplate;
