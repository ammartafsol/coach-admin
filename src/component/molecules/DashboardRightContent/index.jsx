import { ChevronRight } from "lucide-react";
import Image from "next/image";
import classes from "./DashboardRightContent.module.css";
import NotificationCard from "@/component/atoms/NotificationCard";
import NoData from "@/component/atoms/NoData/NoData";
import { Col, Row } from "react-bootstrap";
import { notificationCardData } from "@/developmentContent/dummyData";
import { mediaUrl, timeAgo } from "@/resources/utils/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardRightContent({
  dataSubscribers,
  dataFeeds,
  dataRequests,
  getData,
}) {
  const router = useRouter();
  const widthSubscribers =
    (dataSubscribers?.totalUsersSubscribed /
      dataSubscribers?.totalUserRegistered) *
    100;
  const widthNonSubscribers =
    ((dataSubscribers?.totalUserRegistered -
      dataSubscribers?.totalUsersSubscribed) /
      dataSubscribers?.totalUserRegistered) *
    100;

  return (
    <div className={classes.rightColumn}>
      <div className={classes.subscribersCard}>
        <h2 className={classes.cardTitle}>Total Subscriber</h2>
        <div className={classes.subscriberItem}>
          <div className={classes?.main}>
            <div className={classes.subscriberLabel}>Total Subscriber</div>
            <div className={classes.subscriberValue}>
              {dataSubscribers?.totalUsersSubscribed || "0"}
            </div>
          </div>

          <div className={classes.subscriberBar}>
            <div
              className={classes.subscriberBarFill}
              style={{
                width: widthSubscribers + "%",
                backgroundColor: "#6caadd",
              }}
            ></div>
          </div>
        </div>

        <div className={classes.subscriberItem}>
          <div className={classes?.main}>
            <div className={classes.subscriberLabel}>Total Non Subscriber</div>
            <div className={classes.subscriberValue}>
              {dataSubscribers?.totalUserRegistered -
                dataSubscribers?.totalUsersSubscribed || "0"}
            </div>
          </div>

          <div className={classes.subscriberBar}>
            <div
              className={classes.subscriberBarFill}
              style={{
                width: widthNonSubscribers + "%",
                backgroundColor: "#f5b5d1",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className={classes.feedsCard}>
        <div className={classes.feedsHeader}>
          <h2 className={classes.cardTitle}>New Feeds</h2>
        </div>

        <div className={classes.feedsList}>
          {dataFeeds?.slice(0, 3)?.map((feed) => (
            <div
              className={classes.feedItem}
              key={feed?._id}
              onClick={() => {
                router.push(`/feed?search=${feed?.category?.name}`);
              }}
            >
              <div className={classes.feedImage}>
                <Image
                  src={
                    mediaUrl(feed?.images?.[0]?.url) ||
                    "/images/cms-images/newsFeed.png"
                  }
                  alt={feed?.category?.name || "feed"}
                  width={48}
                  height={48}
                />
              </div>
              <div className={classes.feedContent}>
                <div className={classes.feedTitle}>{feed?.category?.name}</div>
                <div className={classes.feedDescription}>{feed?.text}</div>
              </div>
              <div className={classes.feedTime}>{timeAgo(feed?.createdAt)}</div>
            </div>
          ))}
        </div>

        <Link href={"/feed"} className={classes.seeAllLink}>
          <span>See All Feeds</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className={classes.registrationCard}>
        <h2 className={classes.cardTitle}>Registration Request</h2>
        {dataRequests && dataRequests.length > 0 ? (
          <Row>
            {dataRequests?.slice(0, 2)?.map((item) => {
              return (
                <Col md={12} key={item?._id} >
                  <NotificationCard
                    key={item._id}
                    item={item}
                    getData={getData}
                    onClick={() => {router.push(`coach/${item?.slug}`)}}
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <NoData
            text="No Registration Requests"
            className={classes.noDataStyle}
          />
        )}
      </div>
    </div>
  );
}
