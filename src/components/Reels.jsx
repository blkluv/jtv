import React, { useRef, useState, useEffect } from "react";
import throttle from "lodash/throttle";
import { motion } from "framer-motion";
import {
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaInfoCircle,
  FaMusic,
  FaEthereum, // For the mint icon (assuming Ethereum)
  FaHandHoldingUsd, // For the tip icon
} from "react-icons/fa";
import { track } from "@vercel/analytics"; // Import Vercel Analytics

// Replace this with your actual OpenSea base URL
const OPEN_SEA_BASE_URL = "https://opensea.io/assets/base/";

// Sample data, in real app this would come from an API or a config file
const videolinks = [
  {
    id: 1,
    tokenId: 0,
    dropContract: "0x1308eb43152209f1da697f89c3b2c6a4766dc371",
    src: "https://ipfs.io/ipfs/bafybeid425wpltxblwhrk2dtfngpgn2g5ujncapeb7m5r3blu2m477ue4y",
    creator: "Stormiiy",
    cryptoAddy: "0x8F3b48431FA3d9b92ff7157E890105F9B5f96089",
    tags: ["🔥 Viral Reel", "💃 15 for sale", "🚀 Unlimited floor potential"],
    description: "🔥 Classic Stormiiy twerk video",
    price: "0.003 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/1",
  },
  {
    id: 1,
    tokenId: 0,
    dropContract: "0x1308eb43152209f1da697f89c3b2c6a4766dc371",
    src: "https://ipfs.io/ipfs/bafybeig2zo5wa2oe6o627g2fdjzob5zzkkoso6vpehlmggl6c2mq6olude",
    creator: "Jelly",
    cryptoAddy: "0x8F3b48431FA3d9b92ff7157E890105F9B5f96089",
    tags: ["🔥 Viral Reel", "💃 15 for sale", "🚀 Unlimited floor potential"],
    description: "🔥 Shake Sum",
    price: "0.003 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/2",
  },
  {
    id: 2,
    tokenId: 0,
    dropContract: "0xYourDropContractAddressHere",
    src: "https://ipfs.io/ipfs/bafybeic2322jgkppbahoclgrr7s5y5terk6lka4pojf46huqzpxdt64pju",
    creator: "PYT",
    cryptoAddy: "0x8F3b48431FA3d9b92ff7157E890105F9B5f96089",
    tags: ["🔥 Viral Reel", "💃 1 for sale"],
    description: "🔥 Get this PYT on livestream by holding her GEM.",
    price: "0.003 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/3",
  },
  {
    id: 3,
    tokenId: 1,
    dropContract: "0xYourDropContractAddressHere",
    src: "https://ipfs.io/ipfs/bafybeie2eugkpwcuioagqsrgvlkn4azmhpad5qq4g4lxnfmtatba5sqkgy",
    creator: "Lexisoriya",
    cryptoAddy: "0x8F3b48431FA3d9b92ff7157E890105F9B5f96089",
    tags: ["🔥 Viral Reel", "💃 1 for sale"],
    description: "🔥 Become of 1 of 15 Gemologist to own this classic Lexisoriya reel.",
    price: "0.003 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x1308eb43152209f1da697f89c3b2c6a4766dc371/2",
  },
  {
    id: 4,
    tokenId: 2,
    dropContract: "0xYourDropContractAddressHere",
    src: "https://ipfs.io/ipfs/bafybeicdweirwd5bsiw7xjqmdqwybsdr72s5fb2rrvsvor3veclx5pdzc4",
    creator: "Mapouka",
    cryptoAddy: "0x8F3b48431FA3d9b92ff7157E890105F9B5f96089",
    tags: ["💃 15 for sale", "🔥 Viral Reel"],
    description: "💃 Own and pump the health benefits of Twerking aka Mapouka",
    price: "0.0003 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/5",
  }
];

const Reel = ({
  src,
  isPlaying,
  isMuted,
  toggleMute,
  onLove, // Renamed
  onShare,
  isLoved, // Renamed
  id,
  tags,
  description,
  address,
  price,
  creator,
  cryptoAddy,
  openSeaUrl, // Added prop for OpenSea URL
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

    const handleLoveClick = () => { // Renamed
        onLove();
        setAnimateHeart(true);
        setTimeout(() => setAnimateHeart(false), 1000);
        track("love", { reelId: id }); // Track "love" event
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
          <p className="mt-1 text-xs opacity-80">👻 {creator}</p>
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
          <button // Changed to handleLoveClick
            onClick={handleLoveClick}
            className="text-3xl text-white"
            aria-label={isLoved ? "Unlike" : "Like"} // Changed aria-label
          >
            {isLoved ? ( // Changed isLiked to isLoved
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <span className="mt-1 text-xs text-white">Love</span>
        </div>

        {/* Mint Button (OpenSea) */}
        <div className="flex flex-col items-center">
            <a
              href={openSeaUrl}  // Use the prop here
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-white"
              aria-label="Mint on OpenSea"
            >
              <FaEthereum />
            </a>
            <span className="mt-1 text-xs text-white">Mint</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              onShare();
              track("share", { reelId: id }); // Track "share"
            }}
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

        {/* Tip Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              // Replace this with your actual tipping logic (e.g., open a modal, redirect)
              alert(`Tip ${creator} at ${cryptoAddy}`); //  Replace with real action
              track("tip", { reelId: id, creator: creator });
            }}
            className="text-3xl text-white"
            aria-label={`Tip ${creator}`}
          >
            <FaHandHoldingUsd />
          </button>
          <span className="mt-1 text-xs text-white">Tip</span>
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
  const [lovedVideos, setLovedVideos] = useState({}); // Renamed
  const containerRef = useRef(null);
  const [touchStartY, setTouchStartY] = useState(0);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleLove = (id) => { // Renamed
    setLovedVideos((prev) => ({ // Renamed
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (id) => {
      const shareUrl = `https://tv.jersey.fm/video/${id}`;
      if (navigator.share) {
          navigator.share({
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
            onLove={() => handleLove(reel.id)} // Changed to handleLove
            onShare={handleShare}
            isLoved={lovedVideos[reel.id]} // Changed to isLoved
            id={reel.id}
            tags={reel.tags}
            description={reel.description}
            address={reel.address}
            price={reel.price}
            creator={reel.creator}
            cryptoAddy={reel.cryptoAddy}
            openSeaUrl={reel.openSeaUrl} // Pass the OpenSea URL
          />
        </div>
      ))}
    </div>
  );
};

export default Reels;
