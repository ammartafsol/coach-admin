import { ChevronRight } from "lucide-react";
import Image from "next/image";
import classes from "./DashboardRightContent.module.css";
import NotificationCard from "@/component/atoms/NotificationCard";
import { Col, Row } from "react-bootstrap";
import { notificationCardData } from "@/developmentContent/dummyData";

export default function DashboardRightContent() {
  return (
    <div className={classes.rightColumn}>
      <div className={classes.subscribersCard}>
        <h2 className={classes.cardTitle}>Total Subscriber</h2>
        <div className={classes.subscriberItem}>
          <div className={classes?.main}>
            <div className={classes.subscriberLabel}>Total Subscriber</div>
            <div className={classes.subscriberValue}>1,43,382</div>
          </div>

          <div className={classes.subscriberBar}>
            <div
              className={classes.subscriberBarFill}
              style={{ width: "80%", backgroundColor: "#6caadd" }}
            ></div>
          </div>
        </div>

        <div className={classes.subscriberItem}>
          <div className={classes?.main}>
            <div className={classes.subscriberLabel}>Total Non Subscriber</div>
            <div className={classes.subscriberValue}>87,974</div>
          </div>

          <div className={classes.subscriberBar}>
            <div
              className={classes.subscriberBarFill}
              style={{ width: "40%", backgroundColor: "#f5b5d1" }}
            ></div>
          </div>
        </div>
      </div>

      <div className={classes.feedsCard}>
        <div className={classes.feedsHeader}>
          <h2 className={classes.cardTitle}>New Feeds</h2>
        </div>

        <div className={classes.feedsList}>
          <div className={classes.feedItem}>
            <div className={classes.feedImage}>
              <Image
                src="/images/cms-images/newsFeed.png"
                alt="Workout"
                width={48}
                height={48}
              />
            </div>
            <div className={classes.feedContent}>
              <div className={classes.feedTitle}>Workout</div>
              <div className={classes.feedDescription}>
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
            <div className={classes.feedTime}>5min</div>
          </div>

          <div className={classes.feedItem}>
            <div className={classes.feedImage}>
              <Image
                src="/images/cms-images/newsFeed.png"
                alt="Gym Routine"
                width={48}
                height={48}
              />
            </div>
            <div className={classes.feedContent}>
              <div className={classes.feedTitle}>Gym Routine</div>
              <div className={classes.feedDescription}>
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
            <div className={classes.feedTime}>5min</div>
          </div>

          <div className={classes.feedItem}>
            <div className={classes.feedImage}>
              <Image
                src="/images/cms-images/newsFeed.png"
                alt="Nutrition"
                width={48}
                height={48}
              />
            </div>
            <div className={classes.feedContent}>
              <div className={classes.feedTitle}>Nutrition</div>
              <div className={classes.feedDescription}>
                Lorem Ipsum is simply dummy text of the printing.
              </div>
            </div>
            <div className={classes.feedTime}>5min</div>
          </div>
        </div>

        <div className={classes.seeAllLink}>
          <span>See All Feeds</span>
          <ChevronRight size={16} />
        </div>
      </div>

      <div className={classes.registrationCard}>
        <h2 className={classes.cardTitle}>Registration Request</h2>
        <Row>
          {notificationCardData?.slice(0, 2)?.map((item) => {
            return (
              <Col md={12}>
                <NotificationCard key={item.id} item={item} />
                <hr />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
