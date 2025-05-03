import { useEffect, useRef, useState } from "react";
import {
  useAddress,
  useSendTransaction,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Web3Button } from "@thirdweb-dev/react";
import { FaHeart, FaRegHeart, FaShareAlt, FaInfoCircle, FaMoneyBillWave } from "react-icons/fa";
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
  price,
  creator,
  cryptoAddy,
  creatorAddress,
  likeCount,
  setLikeCount,
  dropContract,
  tokenId,
}) => {
  const videoRef = useRef(null);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const address = useAddress();
  const sendTx = useSendTransaction();

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying) {
      video.play().catch((err) => console.error("Playback error:", err));
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const handleLikeClick = () => {
    onLike?.();
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 1000);
    setLikeCount((prev) => prev + (isLiked ? -1 : 1));
  };

  const toggleInfo = () => {
    setShowDescription(!showDescription);
  };

  const getPriceDisplay = () => {
    if (typeof price === "string") return price;
    if (price && price.display) return price.display;
    return "Price not available";
  };

  const sendTip = async () => {
    if (!creatorAddress) {
      alert("Creator address not set.");
      return;
    }

    try {
      await sendTx.mutateAsync({
        to: creatorAddress,
        value: ethers.utils.parseEther("0.01"), // Tip amount, change as needed
      });
      alert("Tip sent!");
    } catch (err) {
      console.error("Tip failed", err);
      alert("Transaction failed.");
    }
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

        <div className="z-10 mt-2 space-y-2">
          <Web3Button
            contractAddress={dropContract}
            action={async (contract) => {
              await contract.erc1155.claim(tokenId, 1);
            }}
            className="!bg-white !text-black !font-bold !py-2 !px-4 !rounded-full"
          >
            Buy with Crypto
          </Web3Button>

          {creatorAddress && (
            <button
              onClick={sendTip}
              className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-green-600 rounded-full"
            >
              <FaMoneyBillWave className="mr-2" /> Tip Creator (0.01 ETH)
            </button>
          )}
        </div>
      </div>

      <div className="absolute flex flex-col items-center gap-6 right-4 bottom-24">
        <button onClick={handleLikeClick} className="text-3xl text-white">
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
        <span className="mt-1 text-xs text-white">{likeCount} Loves</span>

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

export default Reel;
