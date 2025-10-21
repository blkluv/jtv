import React, { useRef, useState, useEffect } from "react";
import throttle from "lodash/throttle";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaMusic,
  FaEthereum,
  FaComment,
  FaHome,
  FaUser,
  FaChevronDown,
  FaVolumeMute,
  FaVolumeUp,
  FaDollarSign
} from "react-icons/fa";
import { track } from "@vercel/analytics";

// Sample data with memeCoinUrl for tipping + memeCoinName (and optional memeCoinLogo)
const videolinks = [
  {
    id: 1,
    tokenId: 0,
    dropContract: "0x1308eb43152209f1da697f89c3b2c6a4766dc371",
    src: "https://ipfs.io/ipfs/bafybeid425wpltxblwhrk2dtfngpgn2g5ujncapeb7m5r3blu2m477ue4y",
    creator: "Stormiiy",
    memeCoinName: "$STORM",
    // memeCoinLogo: "https://your-cdn.com/storm.png",
    cryptoAddy: "0x52B422783b8f4fe7AbFE497d15F1EC0079Ea2241",
    memeCoinUrl: "https://thirdweb.com/base/0x52B422783b8f4fe7AbFE497d15F1EC0079Ea2241",
    tags: ["🔥 Viral Reel", "💃 15 for sale", "🚀 Unlimited floor potential"],
    description: "🔥 Classic Stormiiy twerk video. If you own this NFT, you'll get exclusive access to my live streams!",
    price: "0.13 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/1",
    likes: 1245,
    comments: 132,
    shares: 112,
    creatorFollowers: "245K"
  },
  {
    id: 2,
    tokenId: 0,
    dropContract: "0x1308eb43152209f1da697f89c3b2c6a4766dc371",
    src: "https://ipfs.io/ipfs/bafybeig2zo5wa2oe6o627g2fdjzob5zzkkoso6vpehlmggl6c2mq6olude",
    creator: "Jelly",
    memeCoinName: "$JELLY",
    // memeCoinLogo: "https://your-cdn.com/jelly.png",
    cryptoAddy: "0x8F3b48431FA3d9b92ff7157E890105F9B5f96089",
    memeCoinUrl: "https://dexscreener.com/base/0x234567890",
    tags: ["🔥 Viral Reel", "💃 15 for sale", "🚀 Unlimited floor potential"],
    description: "🔥 Shake Sum - Exclusive content for NFT holders only!",
    price: "0.13 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/2",
    likes: 1189,
    comments: 121,
    shares: 98,
    creatorFollowers: "189K"
  },
  {
    id: 3,
    tokenId: 0,
    dropContract: "0x580395f7ecb966d352e3948b96ecf1e475526e70",
    src: "https://ipfs.io/ipfs/bafybeic2322jgkppbahoclgrr7s5y5terk6lka4pojf46huqzpxdt64pju",
    creator: "PYT",
    memeCoinName: "$PYT",
    // memeCoinLogo: "https://your-cdn.com/pyt.png",
    cryptoAddy: "0x8F3b48431FA3d9b92ff7157E890105F9B5f96089",
    memeCoinUrl: "https://dexscreener.com/base/0x345678901",
    tags: ["🔥 Viral Reel", "💃 15 for sale"],
    description: "🔥 Get this PYT on livestream by holding her GEM. Limited edition!",
    price: "0.13 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/3",
    likes: 2312,
    comments: 245,
    shares: 219,
    creatorFollowers: "312K"
  },
  {
    id: 4,
    tokenId: 1,
    dropContract: "0x1308eb43152209f1da697f89c3b2c6a4766dc371",
    src: "https://ipfs.io/ipfs/bafybeie2eugkpwcuioagqsrgvlkn4azmhpad5qq4g4lxnfmtatba5sqkgy",
    creator: "Lexisoriya",
    memeCoinName: "$LEXI",
    // memeCoinLogo: "https://your-cdn.com/lexi.png",
    cryptoAddy: "0x8F3b48431FA3d9b92ff7157E890105F9B5f96089",
    memeCoinUrl: "https://thirdweb.com/base/0x709A4985926685b1e24A7167170656B3df489F68",
    tags: ["🔥 Viral Reel", "💃 15 for sale"],
    description: "🔥 Become of 1 of 15 Gemologist to own this classic Lexisoriya reel.",
    price: "0.13 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x1308eb43152209f1da697f89c3b2c6a4766dc371/2",
    likes: 421,
    comments: 67,
    shares: 24,
    creatorFollowers: "67K"
  },
  {
    id: 5,
    tokenId: 2,
    dropContract: "0x580395f7ecb966d352e3948b96ecf1e475526e70",
    src: "https://ipfs.io/ipfs/bafybeicdweirwd5bsiw7xjqmdqwybsdr72s5fb2rrvsvor3veclx5pdzc4",
    creator: "Mapouka",
    memeCoinName: "$MAPOUKA",
    // memeCoinLogo: "https://your-cdn.com/mapouka.png",
    cryptoAddy: "0x8F3b48431FA3d9b92ff7157E890105F9B5f96089",
    memeCoinUrl: "https://dexscreener.com/base/0x567890123",
    tags: ["💃 15 for sale", "🔥 Viral Reel"],
    description: "💃 Own and pump the health benefits of Twerking aka Mapouka",
    price: "0.13 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/5",
    likes: 156,
    comments: 18,
    shares: 6,
    creatorFollowers: "18K"
  },
  {
    id: 6,
    tokenId: 2,
    dropContract: "0x580395f7ecb966d352e3948b96ecf1e475526e70",
    src: "https://raw2.seadn.io/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/5c942a7802b8df4611a950d9cb74a7/2f5c942a7802b8df4611a950d9cb74a7.mov",
    creator: "Stormiiy Cheetah",
    memeCoinName: "$STORM",
    // memeCoinLogo: "https://your-cdn.com/cheetah.png",
    cryptoAddy: "0x52B422783b8f4fe7AbFE497d15F1EC0079Ea2241",
    memeCoinUrl: "https://thirdweb.com/base/0x52B422783b8f4fe7AbFE497d15F1EC0079Ea2241",
    tags: ["💃 1 of 1", "🔥 Viral Reel"],
    description: "💃 Own the 1 of 1 Stormiiy Cheetah",
    price: "0.13 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/6",
    likes: 156,
    comments: 18,
    shares: 6,
    creatorFollowers: "18K"
  },
  {
    id: 7,
    tokenId: 2,
    dropContract: "0x580395f7ecb966d352e3948b96ecf1e475526e70",
    src: "https://raw2.seadn.io/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/af8aa8976cac87f2415c19e7a5cd3f/f6af8aa8976cac87f2415c19e7a5cd3f.mov",
    creator: "Saleemarrm",
    memeCoinName: "$SALE",
    // memeCoinLogo: "https://your-cdn.com/saleem.png",
    cryptoAddy: "0x52B422783b8f4fe7AbFE497d15F1EC0079Ea2241",
    memeCoinUrl: "https://thirdweb.com/base/0x8a7833905E62CFa68b5F02aCd2b0c68a78119973",
    tags: ["💃 1 of 1", "🔥 Viral Reel"],
    description: "💃 Own a 1 of 1 Saleemarrm Position NFT.",
    price: "0.13 ETH",
    openSeaUrl: "https://opensea.io/item/base/0x580395f7ecb966d352e3948b96ecf1e475526e70/7",
    likes: 18,
    comments: 0,
    shares: 12,
    creatorFollowers: "18K"
  }
];

// Reel Component
const Reel = ({
  src,
  isPlaying,
  isMuted,
  toggleMute,
  onLove,
  onShare,
  isLoved,
  id,
  tags,
  description,
  price,
  creator,
  cryptoAddy,
  memeCoinUrl,
  memeCoinName,
  memeCoinLogo,
  openSeaUrl,
  likes,
  comments,
  shares,
  creatorFollowers
}) => {
  const videoRef = useRef(null);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likes);

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

  const handleLoveClick = () => {
    const newLikedState = !isLoved;
    onLove();

    setCurrentLikeCount((prev) => prev + (newLikedState ? 1 : -1));
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 1000);
    track("love", { reelId: id });
  };

  const toggleInfo = () => setShowDescription(!showDescription);

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
        className="object-cover w-full h-full"
        loop
        muted={isMuted}
        playsInline
        onClick={toggleMute}
        loading="lazy"
        aria-label={`${creator}'s Reel`}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

      {/* Mute Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isMuted ? 1 : 0 }}
        className="absolute p-2 rounded-full top-4 right-4 bg-black/50 backdrop-blur-md"
      >
        {isMuted ? <FaVolumeMute className="text-white" /> : <FaVolumeUp className="text-white" />}
      </motion.div>

      {/* Left Side - Creator Info & Description */}
      <div className="absolute bottom-0 left-0 z-10 flex flex-col justify-end w-2/3 p-4 text-white">
        <div className="mb-3">
          <h3 className="text-lg font-bold">@{creator}</h3>
          <p className="text-sm line-clamp-2">{description}</p>
          {/* Improve discoverability of details */}
          <button
            onClick={toggleInfo}
            className="mt-2 text-xs font-semibold underline text-white/80 underline-offset-4"
            aria-label="Show details"
          >
            More
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-white rounded-full bg-gray-800/80 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="mr-2"
          >
            <FaMusic className="text-pink-400" />
          </motion.div>
          <span className="text-sm">Original Sound - {creator}</span>
        </div>
      </div>

      {/* Right Sidebar Actions */}
      <div className="absolute z-10 flex flex-col items-center gap-5 right-4 bottom-24">
        {/* Tipping Button - Custom memecoin label */}
        <div className="flex flex-col items-center">
          <motion.a
            whileTap={{ scale: 0.9 }}
            href={memeCoinUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 transition-transform rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-110"
            aria-label={`Send ${memeCoinName || "a tip"} to ${creator}`}
            title={`Support ${creator}${memeCoinName ? ` with ${memeCoinName}` : ""}`}
          >
            {memeCoinLogo ? (
              <img src={memeCoinLogo} alt={memeCoinName} className="w-6 h-6 rounded-full" />
            ) : (
              <FaDollarSign className="text-lg text-white" />
            )}
          </motion.a>
          <span className="mt-1 text-xs font-bold text-white">
            {memeCoinName || `Tip ${creator}`}
          </span>
        </div>

        {/* Like Button */}
        <div className="flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLoveClick}
            className="text-3xl text-white"
            aria-label={isLoved ? "Unlike" : "Like"}
          >
            {isLoved ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </motion.button>
          <span className="mt-1 text-xs font-bold text-white">{currentLikeCount}</span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center">
          <motion.button whileTap={{ scale: 0.9 }} className="text-3xl text-white" aria-label="Comments">
            <FaComment />
          </motion.button>
          <span className="mt-1 text-xs font-bold text-white">{comments}</span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              onShare();
              track("share", { reelId: id });
            }}
            className="text-2xl text-white"
            aria-label="Share"
          >
            <FaShareAlt />
          </motion.button>
          <span className="mt-1 text-xs font-bold text-white">{shares}</span>
        </div>

        {/* Mint Button (OpenSea) */}
        <div className="flex flex-col items-center">
          <motion.a
            whileTap={{ scale: 0.9 }}
            href={openSeaUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="p-2 text-2xl text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            aria-label="Collect on OpenSea"
          >
            <FaEthereum />
          </motion.a>
          <span className="mt-1 text-xs font-bold text-white">Collect</span>
        </div>

        {/* Rotating Music Disc */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="flex items-center justify-center w-10 h-10 mt-2 border-2 rounded-full border-white/30"
        >
          <FaMusic className="text-sm text-white" />
        </motion.div>
      </div>

      {/* Animated Heart */}
      {animateHeart && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <FaHeart className="text-6xl text-red-500" />
        </motion.div>
      )}

      {/* Description Overlay */}
      <AnimatePresence>
        {showDescription && (
          <motion.div 
            className="absolute inset-0 z-30 p-6 overflow-y-auto bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Video Details</h2>
                <button
                  onClick={toggleInfo}
                  className="p-2 rounded-full bg-white/10"
                  aria-label="Close Description"
                >
                  <FaChevronDown />
                </button>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center mr-4 rounded-full w-14 h-14 bg-gradient-to-tr from-purple-500 to-pink-500">
                  <img 
                    src="https://i.imgur.com/2Kln51a.png" 
                    alt="TWERK.DANCE Logo"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">@{creator}</h3>
                  <p className="text-gray-300">{creatorFollowers} followers</p>
                </div>
                <button className="px-4 py-1 ml-auto text-sm font-semibold text-black bg-white rounded-full">
                  Follow
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-bold">Description</h3>
                <p className="text-gray-300">{description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <h3 className="mb-1 font-bold text-gray-400">Price</h3>
                  <p className="text-lg">{getPriceDisplay()}</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <h3 className="mb-1 font-bold text-gray-400">Creator</h3>
                  <p className="text-sm truncate">{cryptoAddy}</p>
                </div>
              </div>

              <div className="p-4 mb-6 bg-gray-800/50 rounded-xl">
                <h3 className="mb-2 font-bold text-gray-400">Support Creator</h3>
                <a 
                  href={memeCoinUrl} 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="flex items-center justify-center py-2 mt-2 text-white transition-transform rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105"
                >
                  <FaDollarSign className="mr-2" />
                  Buy {memeCoinName || `${creator} Memecoin`}
                </a>
              </div>
              
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-bold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-gray-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <a
                  href={openSeaUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex-1 py-3 font-bold text-center text-white rounded-xl bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  Collect Now
                </a>
                <button className="flex-1 py-3 font-bold text-white bg-gray-800 rounded-xl">
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Bottom Navigation Bar Component
const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around p-3 bg-black border-t border-gray-800 backdrop-blur-md">
      <a 
        href="https://twerk.dance" 
        onClick={() => setActiveTab("home")} 
        className={`flex flex-col items-center ${activeTab === "home" ? "text-white" : "text-gray-500"}`}
      >
        <FaHome className="text-xl" />
        <span className="mt-1 text-xs">HOME</span>
      </a>
      <a 
        href="https://opensea.io/collection/twerk-dance" 
        onClick={() => setActiveTab("discover")} 
        className={`flex flex-col items-center ${activeTab === "discover" ? "text-white" : "text-gray-500"}`}
      >
        <FaEthereum className="text-xl" />
        <span className="mt-1 text-xs">OPENSEA MARKET</span>
      </a>
      <a 
        href="https://live.luvnft.com/" 
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
      >
        <span className="mt-1 text-xs">LIVE</span>
      </a>
      <a 
        href="https://t.me/+1aj06-wtA1kyMzcx" 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={() => setActiveTab("telegram")} 
        className={`flex flex-col items-center ${activeTab === "telegram" ? "text-white" : "text-gray-500"}`}
      >
        <FaComment className="text-xl" />
        <span className="mt-1 text-xs">TELEGRAM</span>
      </a>
      <a 
        href="https://app.luvnft.com/groups/twerk-dance/" 
        onClick={() => setActiveTab("profile")} 
        className={`flex flex-col items-center ${activeTab === "profile" ? "text-white" : "text-gray-500"}`}
      >
        <FaUser className="text-xl" />
        <span className="mt-1 text-xs">LUV NFT GROUP</span>
      </a>
    </div>
  );
};

// Header Component - Removed search and three dots
const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent backdrop-blur-md">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
          <img src="https://i.imgur.com/2Kln51a.png" alt="TWERK.DANCE Logo" className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
          TWERK.DANCE
        </h1>
      </div>
      {/* Removed search and three dots buttons */}
    </div>
  );
};

// Main Reels Component
const Reels = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [lovedVideos, setLovedVideos] = useState({});
  const [activeTab, setActiveTab] = useState("home");
  const containerRef = useRef(null);
  const [touchStartY, setTouchStartY] = useState(0);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleLove = (id) => {
    setLovedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (id) => {
    const shareUrl = `https://twerk.dance/video/${id}`;
    if (navigator.share) {
      navigator.share({
        title: "TWERK.DANCE",
        text: "We made twerking a paid sport! Check out this reel on TWERK.DANCE",
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
    
    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
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

  // FIXED resize handler - only sets width, not height
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth >= 768 && containerRef.current) {
          // ONLY set width properties, not height
          containerRef.current.style.width = "375px";
          containerRef.current.style.maxWidth = "375px";
          containerRef.current.style.margin = "0 auto";
          containerRef.current.style.borderLeft = "1px solid #333";
          containerRef.current.style.borderRight = "1px solid #333";
        } else if (containerRef.current) {
          // Reset for mobile
          containerRef.current.style.width = "100%";
          containerRef.current.style.maxWidth = "none";
          containerRef.current.style.margin = "0";
          containerRef.current.style.borderLeft = "none";
          containerRef.current.style.borderRight = "none";
        }
      };

      const timer = setTimeout(handleResize, 100);
      window.addEventListener("resize", handleResize);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="relative h-screen bg-black md:flex md:items-center md:justify-center">
      <Header />
      
      {/* Reels Container */}
      <div
        ref={containerRef}
        className="w-full h-screen overflow-y-scroll reels-container snap-y snap-mandatory scroll-smooth touch-pan-y"
      >
        {videolinks.map((reel, index) => (
          <div key={reel.id} className="w-full h-screen snap-start">
            <Reel
              src={reel.src}
              isPlaying={currentReelIndex === index}
              isMuted={isMuted}
              toggleMute={toggleMute}
              onLove={() => handleLove(reel.id)}
              onShare={() => handleShare(reel.id)}
              isLoved={lovedVideos[reel.id]}
              id={reel.id}
              tags={reel.tags}
              description={reel.description}
              price={reel.price}
              creator={reel.creator}
              cryptoAddy={reel.cryptoAddy}
              memeCoinUrl={reel.memeCoinUrl}
              memeCoinName={reel.memeCoinName}
              memeCoinLogo={reel.memeCoinLogo}
              openSeaUrl={reel.openSeaUrl}
              likes={reel.likes}
              comments={reel.comments}
              shares={reel.shares}
              creatorFollowers={reel.creatorFollowers}
            />
          </div>
        ))}
      </div>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Reels;
