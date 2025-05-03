import React, { useRef, useState, useEffect, useCallback } from "react";
import throttle from "lodash/throttle";
import axios from "axios";
import videolinks from "./videolinks";
import { FaShareAlt, FaHeart, FaRegHeart, FaVolumeUp, FaVolumeMute, FaComment, FaMusic, FaInfoCircle } from "react-icons/fa";
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
  what3wordsAddress,
  dropContract,
  tokenId,
  cryptoAddy
}) => {
  const videoRef = useRef(null);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying) {
      video.play().catch(err => console.error("Playback error:", err));
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!dropContract || !tokenId) return;

    const fetchMetadata = async () => {
      try {
        const response = await axios.get(`https://api.opensea.io/api/v2/chain/base/contract/${dropContract}/nfts/${tokenId}`);
        setMetadata(response.data.nft);
      } catch (err) {
        console.error("Failed to fetch metadata:", err);
      }
    };

    fetchMetadata();
  }, [dropContract, tokenId]);

  const handleLikeClick = () => {
    onLike();
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 1000);
  };

  const toggleInfo = () => {
    setShowDescription(!showDescription);
  };

  const getPriceDisplay = () => {
    if (typeof price === 'string') return price;
    if (price && price.display) return price.display;
    return "Price not available";
  };

  return (
    <div className="relative flex flex-col items-center w-full h-screen overflow-hidden bg-black">
      <header className="absolute top-0 left-0 right-0 flex justify-between p-4 bg-black bg-opacity-50">
        <img src="https://imgur.com/logo.png" alt="Logo" className="h-8" />
        <div className="text-lg font-bold text-white">Reels</div>
      </header>

      <div className="absolute left-0 right-0 p-4 top-24 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-lg font-bold text-white">{address}</h3>
        <p className="text-sm text-white opacity-90">{getPriceDisplay()}</p>
        <p className="mt-1 text-xs text-white opacity-80">📍 {what3wordsAddress}</p>
      </div>

      <video
        ref={videoRef}
        src={src}
        className="object-cover h-full"
        loop
        muted={isMuted}
        playsInline
        onClick={toggleMute}
      />

      <div className="absolute left-0 right-0 p-4 bottom-16 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs text-white rounded-full bg-black/50">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute flex flex-col items-center gap-6 right-4 bottom-24">
        <button onClick={handleLikeClick} className="text-3xl text-white">
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
        <span className="mt-1 text-xs text-white">24.5K</span>

        <button className="text-3xl text-white">
          <FaComment />
        </button>
        <span className="mt-1 text-xs text-white">1.2K</span>

        <button onClick={onShare} className="text-3xl text-white">
          <FaShareAlt />
        </button>
        <span className="mt-1 text-xs text-white">Share</span>

        <button onClick={toggleInfo} className="text-3xl text-white">
          <FaInfoCircle />
        </button>
      </div>

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
                <h3 className="font-bold">Location</h3>
                <p>{what3wordsAddress}</p>
              </div>
            </div>
            <a
              href={`https://opensea.io/assets/base/${dropContract}/${tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 mb-3 font-bold text-center text-black bg-yellow-400 rounded-full"
            >
              Mint on OpenSea
            </a>
            <a
              href={`https://etherscan.io/address/${cryptoAddy}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 font-bold text-center text-white bg-indigo-600 rounded-full"
            >
              Tip Creator
            </a>
            <button
              onClick={toggleInfo}
              className="w-full px-4 py-2 mt-4 font-bold text-black bg-white rounded-full"
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

  const toggleMute = () => setIsMuted(prev => !prev);

  const handleLike = (id) => {
    setLikedVideos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = (id) => {
    const shareUrl = `${window.location.origin}/video/${id}`;
    if (navigator.share) {
      navigator.share({
        title: "Check out this property!",
        text: "Amazing property available for crypto purchase!",
        url: shareUrl
      }).catch(err => console.error("Share failed", err));
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
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <div className="video-wall">
        {videolinks.map((video, index) => (
          <div className="video-item" key={video.id}>
            <video src={video.src} controls />
            <div className="details">
              <p className="description">{video.description}</p>
              <p className="price">{video.price}</p>
            </div>
            <div className="video-actions">
              <button className="mint-btn" onClick={() => handleMint(video.tokenId)}>
                Mint
              </button>
              <button className="tip-btn" onClick={() => handleTip(video.creator)}>
                Tip Creator
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;
