"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./UserProfile.module.css";
import TestimonialCard from "@/component/molecules/TestimonialCard/TestimonialCard";
import { testimonialsData } from "@/developmentContent/usersPageData";
import {
  MdOutlineLocalPhone,
  MdOutlineMail,
  MdOutlineStar,
} from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoPlaySharp } from "react-icons/io5";
import BorderWrapper from "@/component/atoms/BorderWrapper";

export default function UserProfile() {
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

    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const handleTestimonialHover = () => {
    setIsPaused(true);
  };

  const handleTestimonialLeave = () => {
    setIsPaused(false);
  };

  return (
    <BorderWrapper>
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
                  <MdOutlineStar size={24} fill="#F29267" />

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
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <div className={classes.contactInfo}>
              <div className={classes.contactItem}>
                <MdOutlineMail
                  className={classes.contactIcon}
                  fill="#F29267"
                  size={24}
                />
                <span>ashleyfarmer@mail.com</span>
              </div>
              <div className={classes.contactItem}>
                <MdOutlineLocalPhone
                  className={classes.contactIcon}
                  fill="#F29267"
                  size={24}
                />
                <span>+1 235 5548 945214</span>
              </div>
              <div className={classes.contactItem}>
                <CiLocationOn
                  className={classes.contactIcon}
                  fill="#F29267"
                  size={24}
                />
                <span>Canada - Manitoba</span>
              </div>
            </div>

            <div className={classes.socialLinks}>
              <h3 className={classes.socialTitle}>Social Links</h3>
              <div className={classes.socialIcons}>
                <Link href="#" className={classes.twitterIcon}>
                  <FaTwitter fill="#B0CD6E" size={20} />
                </Link>
                <Link href="#" className={classes.phoneIcon}>
                  <FaFacebookF fill="#B0CD6E" size={20} />
                </Link>
                <Link href="#" className={classes.instagramIcon}>
                  <FaInstagram fill="#B0CD6E" size={20} />
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
                      <IoPlaySharp fill="#0B0B0B" size={24} />
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
                  index === currentPage
                    ? classes.activeDot
                    : classes.inactiveDot
                }`}
                onClick={() => handlePageChange(index)}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </BorderWrapper>
  );
}
