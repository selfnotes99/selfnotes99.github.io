"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, CheckCircle, ChevronDown } from "lucide-react";
import { Product } from "@/types";
import { getProductReviews, CustomerReview } from "@/lib/reviews";

interface VerifiedCustomerReviewsProps {
  product?: Product | { name: string; slug?: string; categorySlug?: string; rating?: number; reviewCount?: number } | null;
  title?: string;
  subtitle?: string;
  initialCount?: number;
  className?: string;
}

export const VerifiedCustomerReviews: React.FC<VerifiedCustomerReviewsProps> = ({
  product,
  title = "Testimonials 🤩",
  subtitle = "Exceptional feedback from our readers 🚀",
  initialCount = 10,
  className = "",
}) => {
  const reviewsData = getProductReviews(product);
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(reviewsData.reviews);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    reviewsData.reviews.forEach((r) => {
      initial[r.id] = r.likes;
    });
    return initial;
  });

  const [visibleCount, setVisibleCount] = useState(initialCount);

  // Requirement: Every reload/visit par 3 to 4 reviews change/rotate ho jaye
  useEffect(() => {
    const pool = [...reviewsData.reviews];
    if (pool.length > 10) {
      const top10 = pool.slice(0, 10);
      const remaining = pool.slice(10);

      // Randomly pick 3 or 4 positions in top 10 to swap
      const countToSwap = Math.floor(Math.random() * 2) + 3; // 3 or 4
      const chosenPositions: number[] = [];
      while (chosenPositions.length < countToSwap) {
        const randPos = Math.floor(Math.random() * 10);
        if (!chosenPositions.includes(randPos)) {
          chosenPositions.push(randPos);
        }
      }

      // Shuffle remaining reviews to pick random fresh ones
      const shuffledRemaining = [...remaining].sort(() => 0.5 - Math.random());

      // Swap chosen positions
      chosenPositions.forEach((pos, idx) => {
        if (shuffledRemaining[idx]) {
          top10[pos] = shuffledRemaining[idx];
        }
      });

      // Construct new list: swapped top 10 + remaining
      const updatedList = [
        ...top10,
        ...shuffledRemaining.slice(countToSwap),
      ];

      setReviewsList(updatedList);
    }
  }, [product?.name]);

  const toggleLike = (reviewId: string) => {
    setLikedMap((prev) => {
      const isLiked = !prev[reviewId];
      setLikesCountMap((prevCount) => ({
        ...prevCount,
        [reviewId]: (prevCount[reviewId] || 0) + (isLiked ? 1 : -1),
      }));
      return { ...prev, [reviewId]: isLiked };
    });
  };

  const visibleReviews = reviewsList.slice(0, visibleCount);
  const hasMore = visibleCount < reviewsList.length;

  return (
    <section aria-label="Customer Reviews" className={`w-full py-8 sm:py-12 ${className}`}>
      {/* 1. Header Section matching reference image */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-6 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-1.5">
          <span>{title}</span>
        </h2>

        {/* Big Bold Green Percentage */}
        <div className="my-1 sm:my-2">
          <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#00C853] tracking-tight inline-block leading-none drop-shadow-xs">
            {reviewsData.satisfactionRate}
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base font-bold text-gray-800 tracking-normal flex items-center justify-center gap-1">
          <span>{subtitle}</span>
        </p>
      </div>

      {/* 2. Reviews Grid: Exactly 6 col 6 col (2-columns) on mobile, 3-columns on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-5 max-w-[1320px] mx-auto px-2 sm:px-4">
        {visibleReviews.map((review) => {
          const isLiked = !!likedMap[review.id];
          const currentLikes = likesCountMap[review.id] ?? review.likes;

          return (
            <div
              key={review.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-200 p-2.5 sm:p-4 md:p-5 flex flex-col justify-between"
            >
              <div>
                {/* User Info & Author Like Row */}
                <div className="flex items-start justify-between gap-1.5 mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    {/* User Avatar */}
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-100">
                      {review.avatar ? (
                        <Image
                          src={review.avatar}
                          alt={review.userDisplayName || review.username}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center font-bold text-[10px] sm:text-xs">
                          {(review.userDisplayName || review.username).charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Full Indian Name & "by author" badge */}
                    <div className="min-w-0 flex-1 leading-none">
                      <div className="flex items-center flex-wrap gap-x-1 gap-y-0.5">
                        <span className="font-bold text-gray-900 text-[11px] sm:text-xs truncate max-w-[85px] sm:max-w-[130px]" title={review.userDisplayName || review.username}>
                          {review.userDisplayName || review.username}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-gray-400 font-normal">
                          {review.timeAgo}
                        </span>
                        {review.likedByAuthor && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-gray-400 select-none">
                            <span className="text-red-500 text-[10px]">❤️</span>
                            <span className="hidden sm:inline">by author</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Heart Like Button & Counter */}
                  <button
                    onClick={() => toggleLike(review.id)}
                    className="flex flex-col items-center justify-center shrink-0 text-center active:scale-125 transition-transform p-0.5"
                    aria-label="Like review"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                        isLiked || currentLikes > 0
                          ? "fill-[#FF2D55] text-[#FF2D55]"
                          : "text-gray-300"
                      }`}
                    />
                    <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 mt-0.5 leading-none">
                      {currentLikes}
                    </span>
                  </button>
                </div>

                {/* Review Body */}
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-800 leading-relaxed font-normal mb-2 sm:mb-3">
                  {review.comment}
                </p>

                {/* Interactive Action Links: Reply / Hide */}
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-gray-400 font-semibold mb-3 select-none">
                  <span className="hover:text-gray-600 cursor-pointer">Reply</span>
                  <span className="hover:text-gray-600 cursor-pointer">Hide</span>
                </div>
              </div>

              {/* Nested Reply from Author/Store */}
              {review.reply && (
                <div className="pt-2 border-t border-gray-50 mt-1">
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="flex items-start gap-1.5 sm:gap-2 min-w-0">
                      {/* Brand Logo Avatar (Purple "B" or Brand Icon) */}
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#7000FF] text-white flex items-center justify-center shrink-0 font-bold text-[9px] sm:text-[11px] shadow-2xs">
                        {review.reply.authorHandle.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1 leading-none">
                          <span className="font-bold text-gray-900 text-[10px] sm:text-[11px] truncate">
                            {review.reply.authorHandle}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-gray-400 font-normal">
                            {review.reply.timeAgo}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-700 mt-1 leading-tight">
                          {review.reply.text}
                        </p>
                        <div className="mt-1">
                          <span className="text-[9px] sm:text-[10px] text-gray-400 font-semibold hover:text-gray-600 cursor-pointer select-none">
                            Reply
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Unfilled heart on reply */}
                    <div className="shrink-0 p-0.5 text-gray-300">
                      <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Load More Button: View more from 50 total reviews */}
      {hasMore && (
        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 10, reviewsList.length))}
            className="inline-flex items-center gap-1.5 px-5 py-2 sm:px-6 sm:py-2.5 bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-bold rounded-full shadow-xs hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
          >
            <span>View more reviews ({reviewsList.length - visibleCount} more)</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}

      {/* Trust Guarantee Footnote */}
      <div className="flex items-center justify-center gap-1.5 text-center mt-5 text-[10px] sm:text-xs text-gray-500 font-medium">
        <CheckCircle className="w-3.5 h-3.5 text-[#00C853] shrink-0" />
        <span>100% Verified Customer Reviews • Real Feedback from Readers &amp; Buyers</span>
      </div>
    </section>
  );
};
