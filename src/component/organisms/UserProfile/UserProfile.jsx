"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./UserProfile.module.css";
import TestimonialCard from "@/component/molecules/TestimonialCard/TestimonialCard";
import { testimonialsData } from "@/developmentContent/usersPageData";

export default function ProfilePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollTimerRef = useRef(null);
  const testimonialsPerPage = 3;

  const totalPages = Math.ceil(testimonialsData?.length / testimonialsPerPage);

  // Get current testimonials to display
  const getCurrentTestimonials = () => {
    const startIndex = currentPage * testimonialsPerPage;
    return testimonialsData?.slice(
      startIndex,
      startIndex + testimonialsPerPage
    );
  };

  // Auto-scroll functionality
  useEffect(() => {
    // Clear any existing timer
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }

    // Only set up timer if not paused
    if (!isPaused) {
      autoScrollTimerRef.current = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
      }, 5000); // Change page every 5 seconds
    }

    // Clean up the timer when component unmounts or isPaused changes
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isPaused, totalPages]);

  const handlePageChange = (pageIndex) => {
    // Temporarily pause auto-scroll when user manually changes page
    setIsPaused(true);
    setCurrentPage(pageIndex);

    // Resume auto-scroll after a delay
    setTimeout(() => {
      setIsPaused(false);
    }, 7000); // Resume auto-scroll after 7 seconds of inactivity
  };

  // Pause auto-scroll when user hovers over testimonials
  const handleTestimonialHover = () => {
    setIsPaused(true);
  };

  // Resume auto-scroll when user leaves testimonials
  const handleTestimonialLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.profileGrid}>
        {/* Profile Section */}
        <div className={classes.profileSection}>
          <div className={classes.profileHeader}>
            <Image
              src="/images/dummy-images/user.png"
              alt="Profile picture"
              width={120}
              height={120}
              className={classes.avatar}
            />
            <div>
              <h1 className={classes.name}>Matthew Ward</h1>
              <div className={classes.rating}>
                <svg
                  className={classes.starIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>4.8 Cricket Rating</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className={classes.sectionTitle}>Bio</h2>
            <p className={classes.bioText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className={classes.contactInfo}>
            <div className={classes.contactItem}>
              <svg
                className={classes.contactIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>ashleyfarmer@mail.com</span>
            </div>
            <div className={classes.contactItem}>
              <svg
                className={classes.contactIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+1 235 5548 945214</span>
            </div>
            <div className={classes.contactItem}>
              <svg
                className={classes.contactIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Canada - Manitoba</span>
            </div>
          </div>

          <div className={classes.socialLinks}>
            <h3 className={classes.socialTitle}>Social Links</h3>
            <div className={classes.socialIcons}>
              <Link href="#" className={classes.twitterIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </Link>
              <Link href="#" className={classes.instagramIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className={classes.phoneIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className={classes.videoSection}>
          <h2 className={classes.videoTitle}>Intro Video</h2>
          <div className={classes.videoContainer}>
            {!isPlaying ? (
              <>
                <Image
                  src="/images/dummy-images/thumbnail.jpeg"
                  alt="Video thumbnail"
                  width={600}
                  height={400}
                  className={classes.videoThumbnail}
                />
                <div className={classes.playButtonContainer}>
                  <button
                    className={classes.playButton}
                    onClick={() => setIsPlaying(true)}
                  >
                    <svg
                      className={classes.playIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className={classes.videoPlayerWrapper}>
                <video
                  className={classes.videoPlayer}
                  controls
                  autoPlay
                  src="/video/video.mp4"
                >
                  Your browser does not support the video tag.
                </video>
                <button
                  className={classes.closeVideoButton}
                  onClick={() => setIsPlaying(false)}
                  aria-label="Close video"
                >
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
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div
        className={classes.reviewsSection}
        onMouseEnter={handleTestimonialHover}
        onMouseLeave={handleTestimonialLeave}
      >
        <h2 className={classes.reviewsTitle}>Review & Rating</h2>

        <div
          className={`${classes.reviewsGrid} ${classes.fadeTransition}`}
          key={currentPage}
        >
          {getCurrentTestimonials().map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className={classes.paginationDots}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`${classes.paginationButton} ${
                index === currentPage ? classes.activeDot : classes.inactiveDot
              }`}
              onClick={() => handlePageChange(index)}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
