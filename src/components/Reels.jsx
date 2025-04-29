import React, { useRef, useState, useEffect } from 'react';
import throttle from 'lodash/throttle';
import videolinks from './videolinks';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useContract, useBuyNow } from "@thirdweb-dev/react";

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
  creator,
  price,
  cryptoAddy,
}) => {
  const videoRef = useRef(null);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);

  const { contract } = useContract("0x7FC8e27d971d7B2eA951FCe62192F6B76dD319B7");
  const { mutate: buyNow, isLoading } = useBuyNow(contract);

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying) {
      video.play().catch((err) => console.error('Playback error:', err));
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const handleLikeClick = () => {
    onLike();
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 1000);
  };

  const toggleInfo = () => setShowDescription(prev => !prev);
  const togglePurchase = () => setShowPurchase(prev => !prev);

  const handlePurchase = async () => {
    try {
      await buyNow({
        id: id,
        buyAmount: 1,
        type: "nft",
      });
      alert('Purchase successful!');
      setShowPurchase(false);
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. See console for details.');
    }
  };

  const getPriceDisplay = () => {
    if (typeof price === 'string') return price;
    if (price?.display) return price.display;
    return 'Price not available';
  };

  return (
    <div className='relative flex justify-center w-full h-screen overflow-hidden bg-black'>
      <video
        ref={videoRef}
        src={src}
        className='object-cover h-full'
        loop
        muted={isMuted}
        playsInline
        onClick={toggleMute}
      />

      {/* Bottom Info Bar */}
      <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent'>
        <div className='mb-4 text-white'>
          <h3 className='text-lg font-bold'>🎧 {creator}</h3>
          <p className='text-sm opacity-90'>{getPriceDisplay()}</p>
          <p className='mt-1 text-xs opacity-80'>🪙 {cryptoAddy}</p>
        </div>

        <div className='flex flex-wrap gap-2 mb-4'>
          {tags.map((tag, index) => (
            <span key={index} className='px-2 py-1 text-xs text-white rounded-full bg-purple-500/50'>
              {tag}
            </span>
          ))}
        </div>

        <button 
          onClick={togglePurchase}
          className='px-4 py-2 text-xs font-bold text-white transition-all rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
        >
          🛒 BUY NFT
        </button>
      </div>

      {/* Right Action Buttons */}
      <div className='absolute flex flex-col items-center gap-6 right-4 bottom-24'>
        <div className='flex flex-col items-center'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500'>
            <span className='text-xs font-bold text-white'>#{id}</span>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <button onClick={handleLikeClick} className='text-3xl transition-transform hover:scale-110'>
            {isLiked ? '❤️' : '🤍'}
          </button>
          <span className='mt-1 text-xs text-white'>24.5K</span>
        </div>

        <div className='flex flex-col items-center'>
          <button className='text-3xl transition-transform hover:scale-110'>
            💬
          </button>
          <span className='mt-1 text-xs text-white'>1.2K</span>
        </div>

        <div className='flex flex-col items-center'>
          <button onClick={onShare} className='text-3xl transition-transform hover:scale-110'>
            ↗️
          </button>
          <span className='mt-1 text-xs text-white'>Share</span>
        </div>

        <div className='flex flex-col items-center'>
          <button onClick={toggleInfo} className='text-3xl transition-transform hover:scale-110'>
            ℹ️
          </button>
        </div>

        <div className='flex items-center justify-center w-10 h-10 mt-2 border rounded-full border-white/30'>
          <span className='text-sm'>🎵</span>
        </div>
      </div>

      {/* Animated Heart */}
      {animateHeart && (
        <motion.div
          className='absolute inset-0 flex items-center justify-center pointer-events-none'
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <span className='text-6xl'>❤️</span>
        </motion.div>
      )}

      {/* Description Modal */}
      {showDescription && (
        <div className='absolute inset-0 p-6 overflow-y-auto bg-black/80'>
          <div className='text-white'>
            <h2 className='mb-4 text-2xl font-bold'>🎧 {creator}</h2>
            <div className='mb-6 text-sm whitespace-pre-line'>{description}</div>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div>
                <h3 className='font-bold'>💰 Price</h3>
                <p>{getPriceDisplay()}</p>
              </div>
              <div>
                <h3 className='font-bold'>👛 Wallet</h3>
                <p>{cryptoAddy}</p>
              </div>
            </div>
            <button
              onClick={toggleInfo}
              className='w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-full hover:bg-purple-600'
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* NFT Purchase Modal */}
      {showPurchase && (
        <div className='absolute inset-0 flex items-center justify-center p-6 bg-black/90'>
          <div className='w-full max-w-md p-6 bg-gray-900 rounded-xl'>
            <h2 className='mb-4 text-2xl font-bold text-white'>{`🛒 Purchase ${creator}'s Track`}</h2>
            
            <div className='mb-6'>
              <div 
                id={`connect-button-${id}`}
                data-widget="ConnectButton"
                data-client-id="06bcfb42f1eeb14f3bdb12f16703ebb8"
                data-theme="dark"
                data-chains="8453,1,137"
                data-locale="en_US"
                className='mb-4'
              ></div>

              <div className='p-4 mb-4 text-sm text-white bg-gray-800 rounded-lg'>
                <p className='font-bold'>✨ NFT Includes:</p>
                <ul className='mt-2 ml-4 list-disc'>
                  {description.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line.replace(/^-/, '').trim()}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className='w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-full hover:bg-purple-600 disabled:opacity-50'
              >
                {isLoading ? 'Processing...' : 'Confirm Purchase'}
              </button>

              <button
                onClick={togglePurchase}
                className='w-full px-4 py-2 mt-4 font-bold text-white bg-gray-700 rounded-full hover:bg-gray-600'
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Reel.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  toggleMute: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  isLiked: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  tags: PropTypes.array.isRequired,
  description: PropTypes.string,
  creator: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ display: PropTypes.string })
  ]),
  cryptoAddy: PropTypes.string,
};

const Reels = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState({});
  const containerRef = useRef(null);

  const toggleMute = () => setIsMuted(prev => !prev);

  const handleLike = (id) => {
    setLikedVideos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (id) => {
    const shareUrl = `https://tv.jersey.fm/video/${id}`;
    if (navigator.share) {
      navigator.share({
        title: 'Check out this Jersey Club track!',
        text: 'Dope Jersey Club content you need to hear!',
        url: shareUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  const handleScroll = throttle(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const windowHeight = container.clientHeight;
    const currentIndex = Math.round(scrollPosition / windowHeight);
    if (currentIndex !== currentReelIndex) setCurrentReelIndex(currentIndex);
  }, 200);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className='w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth'
    >
      {videolinks.map((reel, index) => (
        <div key={reel.id} className='w-full h-screen snap-start'>
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
            creator={reel.creator}
            price={reel.price || 'Free'}
            cryptoAddy={reel.cryptoAddy}
          />
        </div>
      ))}
    </div>
  );
};

export default Reels;