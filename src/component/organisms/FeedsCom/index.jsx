"use client"
import React, { useState } from 'react';
import classes from "./FeedsCom.module.css";
import ButtonTabs from '@/component/atoms/ButtonTabs';
import { buttonsTabs } from '@/developmentContent/enums/enum';
import { feedsData } from '@/developmentContent/dummyData';
import FeedsCard from '@/component/molecules/FeedsCard/FeedsCard';
import BorderWrapper from '@/component/atoms/BorderWrapper';

const FeedsCom = () => {
    const [selectedTabs,setSelectedTabs] = useState(buttonsTabs[0]);
  return (
   <>
   <div>
        <ButtonTabs setSelectButton={setSelectedTabs} selectButton={selectedTabs} tabs={buttonsTabs} />
    </div>
    <div className={classes?.mainWrapper}>
        <div className={classes.feedsList}>
          {feedsData.map((feed, index) => (
            <BorderWrapper key={index}>
              <FeedsCard key={feed.id} feed={feed}  />
            </BorderWrapper>
          ))}
        </div>
      </div>
   </>
    
  )
}

export default FeedsCom