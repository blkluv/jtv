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
  price,
  creator,
  cryptoAddy,
  likeCount, // Added likeCount prop
  setLikeCount, // Added setLikeCount prop to update the like count
}) => {
  const videoRef = useRef(null);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying) {
      video.play().catch((err) => console.error("Playback error:", err));
      trackEvent("video_play", { videoId: id, creator });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const handleLikeClick = () => {
    onLike();
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 1000);

    // Update the like count
    setLikeCount(likeCount + (isLiked ? -1 : 1)); // Decrease or increase the count based on the current like status

    trackEvent("like", { videoId: id, creator });
  };

  const handleShareClick = () => {
    onShare();
    trackEvent("share", { videoId: id, creator });
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
      <video
        ref={videoRef}
        src={src}
        className="object-cover h-full"
        loop
        muted={isMuted}
        playsInline
        onClick={toggleMute}
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="mb-4 text-white">
          <h3 className="text-lg font-bold">{creator}</h3>
          <p className="text-sm opacity-90">{getPriceDisplay()}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs text-white rounded-full bg-black/50">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-2">
          <Web3Button
            contractAddress={cryptoAddy}
            action={async (contract) => {
              await contract.erc20.claim(1);
            }}
            className="!bg-white !text-black !font-bold !py-2 !px-4 !rounded-full"
          >
            Buy with Crypto
          </Web3Button>
        </div>
      </div>

      <div className="absolute flex flex-col items-center gap-6 right-4 bottom-24">
        <button onClick={handleLikeClick} className="text-3xl text-white">
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
        <span className="mt-1 text-xs text-white">{likeCount} Likes</span> {/* Displaying like count */}

        <button onClick={handleShareClick} className="text-3xl text-white">
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
            <h2 className="mb-4 text-2xl font-bold">{creator}</h2>
            <div className="mb-6 text-sm whitespace-pre-line">{description}</div>
            <div className="mb-6">
              <h3 className="font-bold">Price</h3>
              <p>{getPriceDisplay()}</p>
            </div>
            <button
              onClick={toggleInfo}
              className="w-full px-4 py-2 font-bold text-black bg-white rounded-full"
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
  const [likeCounts, setLikeCounts] = useState({}); // State to store like counts
  const containerRef = useRef(null);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleLike = (id) => {
    setLikedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    // Update the like count
    setLikeCounts((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] - 1 : (prev[id] || 0) + 1, // Increase or decrease count
    }));
  };

  const handleShare = (id) => {
    const shareUrl = `https://tv.jersey.fm/video/${id}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this track!",
          text: "Hot Jersey Club drop now live on Web5!",
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
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
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
            price={reel.price}
            creator={reel.creator}
            cryptoAddy={reel.cryptoAddy}
            likeCount={likeCounts[reel.id] || 0} // Passing like count
            setLikeCount={(count) => setLikeCounts((prev) => ({ ...prev, [reel.id]: count }))}
          />
        </div>
      ))}
    </div>
  );
};

export default Reels;
