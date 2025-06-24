"use client"
import React, { useState } from 'react';
import classes from "./FeedsCom.module.css";
import ButtonTabs from '@/component/atoms/ButtonTabs';
import { buttonsTabs } from '@/developmentContent/enums/enum';
import { feedsData } from '@/developmentContent/dummyData';
import FeedsCard from '@/component/molecules/FeedsCard/FeedsCard';
import BorderWrapper from '@/component/atoms/BorderWrapper';
import VideoModalSkeleton from "@/component/molecules/VideoModalSkeleton";
import CommentsModal from "@/component/molecules/CommentsModal/CommentsModal";

const FeedsCom = ({feedsData, setSearch}) => {
    const [selectedTabs, setSelectedTabs] = useState(buttonsTabs[0]);
    const [isOpenVideo, setIsOpenVideo] = useState(false);
    const [activeFeedId, setActiveFeedId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenVideo = (feedId) => {
        setActiveFeedId(feedId);
        setIsOpenVideo(true);
    };

    const handleCloseVideo = () => {
        setIsOpenVideo(false);
        setActiveFeedId(null);
    };

    const activeFeed = activeFeedId !== null ? feedsData.find((feed) => feed.id === activeFeedId) : null;

    return (
        <>
            <div>
                <ButtonTabs setSelectButton={setSelectedTabs} selectButton={selectedTabs} tabs={buttonsTabs} />
            </div>
            <div className={classes?.mainWrapper}>
                <div className={classes.feedsList}>
                    {feedsData?.map((feed, index) => (
                        <BorderWrapper key={index}>
                            <FeedsCard 
                                key={feed.id} 
                                feed={feed}
                                setIsOpen={handleOpenVideo}
                                onOpenComments={() => setIsOpen(true)}
                            />
                        </BorderWrapper>
                    ))}
                </div>
            </div>

            <CommentsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                feedId={activeFeedId}
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