import React, { useRef, useState, useEffect } from "react";
import throttle from "lodash/throttle";
import videolinks from "./videolinks";
import {
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaComment,
  FaInfoCircle,
  FaMusic,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Reel = ({
  src,
  isPlaying,
  isMuted,
  toggleMute,
  onLike,
  onShare,
  isLiked,
  id,
  tags,
  description,
  address,
  price,
  creator,
  cryptoAddy,
}) => {
  const videoRef = useRef(null);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying && video) {
      video.play().catch((err) => {
        console.error("Playback error:", err);
      });
    } else if (video) {
      video.pause();
    }
  }, [isPlaying]);

  const handleLikeClick = () => {
    onLike();
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 1000);
  };

  const toggleInfo = () => {
    setShowDescription(!showDescription);
  };

  const getPriceDisplay = () => {
    if (typeof price === "string") return price;
    if (price && price.display) return price.display;
    return "Price not available";
  };

  return (
    <div className="relative flex justify-center w-full h-screen overflow-hidden bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        className="object-cover h-full"
        loop
        muted={isMuted}
        playsInline
        onClick={toggleMute}
        aria-label="Reel Video"
      />

      {/* Overlay UI */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        {/* Property Info */}
        <div className="mb-4 text-white">
          <h3 className="text-lg font-bold">{address}</h3>
          <p className="text-sm opacity-90">{getPriceDisplay()}</p>
          <p className="mt-1 text-xs opacity-80">📍 {creator}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs text-white rounded-full bg-black/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Sidebar Actions */}
      <div className="absolute flex flex-col items-center gap-6 right-4 bottom-24">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500">
            <span className="text-xs font-bold text-white">{id}</span>
          </div>
        </div>

        {/* Like Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleLikeClick}
            className="text-3xl text-white"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            {isLiked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <span className="mt-1 text-xs text-white">24.5K</span>
        </div>

        {/* Comments */}
        <div className="flex flex-col items-center">
          <button className="text-3xl text-white" aria-label="View Comments">
            <FaComment />
          </button>
          <span className="mt-1 text-xs text-white">1.2K</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">
          <button
            onClick={onShare}
            className="text-3xl text-white"
            aria-label="Share"
          >
            <FaShareAlt />
          </button>
          <span className="mt-1 text-xs text-white">Share</span>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center">
          <button
            onClick={toggleInfo}
            className="text-3xl text-white"
            aria-label="View Information"
          >
            <FaInfoCircle />
          </button>
        </div>

        {/* Music */}
        <div className="flex items-center justify-center w-10 h-10 mt-2 border rounded-full border-white/30"  aria-label="Music">
          <FaMusic className="text-sm text-white" />
        </div>
      </div>

      {/* Animated Heart */}
      {animateHeart && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <FaHeart className="text-6xl text-red-500" />
        </motion.div>
      )}

      {/* Description Overlay */}
      {showDescription && (
        <div className="absolute inset-0 p-6 overflow-y-auto bg-black/80">
          <div className="text-white">
            <h2 className="mb-4 text-2xl font-bold">{address}</h2>
            <div className="mb-6 text-sm whitespace-pre-line">{description}</div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-bold">Price</h3>
                <p>{getPriceDisplay()}</p>
              </div>
              <div>
                <h3 className="font-bold">Creator Addy</h3>
                <p>{cryptoAddy}</p>
              </div>
            </div>
            <button
              onClick={toggleInfo}
              className="w-full px-4 py-2 font-bold text-black bg-white rounded-full"
              aria-label="Close Description"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Reels = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState({});
  const containerRef = useRef(null);
  const [touchStartY, setTouchStartY] = useState(0);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleLike = (id) => {
    setLikedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (id) => {
    const shareUrl = `https://tv.jersey.fm/video/${id}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this Jersey Club video!",
          text: "If it goes viral, we will auction it.",
          url: shareUrl,
        })
        .catch((err) => console.error("Share failed", err));
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  const handleScroll = throttle(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const windowHeight = container.clientHeight;
    const currentIndex = Math.round(scrollPosition / windowHeight);
    if (currentIndex !== currentReelIndex) {
      setCurrentReelIndex(currentIndex);
    }
  }, 200);

  useEffect(() => {
    const container = containerRef.current;
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY;
      if (touchDiff > 50) {
        setCurrentReelIndex((prevIndex) =>
          Math.min(prevIndex + 1, videolinks.length - 1)
        );
      } else if (touchDiff < -50) {
        setCurrentReelIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    };
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd, {
        passive: true,
      });
      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [handleScroll, touchStartY]);

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth touch-pan-y"
    >
      {videolinks.map((reel, index) => (
        <div key={reel.id} className="w-full h-screen snap-start">
          <Reel
            src={reel.src}
            isPlaying={currentReelIndex === index}
            isMuted={isMuted}
            toggleMute={toggleMute}
            onLike={() => handleLike(reel.id)}
            onShare={() => handleShare(reel.id)}
            isLiked={likedVideos[reel.id]}
            id={reel.id}
            tags={reel.tags}
            description={reel.description}
            address={reel.address}
            price={reel.price}
            creator={reel.creator}
            cryptoAddy={reel.cryptoAddy}
            what3wordsAddress={reel.what3wordsAddress}
          />
        </div>
      ))}
    </div>
  );
};

export default Reels;
