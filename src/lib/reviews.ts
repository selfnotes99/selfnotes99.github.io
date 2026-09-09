import reviewsData from "@/data/reviews.json";
import { Product } from "@/types";

export interface ReviewReply {
  authorHandle: string;
  authorName: string;
  authorAvatar?: string;
  timeAgo: string;
  text: string;
  likes: number;
}

export interface CustomerReview {
  id: string;
  productSlug?: string;
  categorySlug?: string;
  username: string;
  userDisplayName?: string;
  avatar: string;
  timeAgo: string;
  likedByAuthor: boolean;
  likes: number;
  rating: number;
  comment: string;
  reply?: ReviewReply;
  verified?: boolean;
}

export interface ReviewsSummary {
  satisfactionRate: string; // e.g. "98.4%"
  satisfactionHeadline: string; // e.g. "Exceptional feedback from our readers 🚀"
  totalReviews: number;
  averageRating: number;
  reviews: CustomerReview[];
}

/**
 * Returns formatted and dynamically localized customer reviews for a given product.
 * Automatically substitutes the actual product name in any reviews containing {productName}.
 */
export function getProductReviews(product?: Product | { name: string; slug?: string; categorySlug?: string; rating?: number; reviewCount?: number } | null): ReviewsSummary {
  const allRawReviews = (reviewsData as CustomerReview[]) || [];

  const productName = product?.name || "our bestselling guide";
  const productSlug = product?.slug?.toLowerCase().trim();
  const categorySlug = product?.categorySlug?.toLowerCase().trim();

  // 1. Filter: product-specific first, then category-specific, then universal ("all")
  const specificReviews: CustomerReview[] = [];
  const genericReviews: CustomerReview[] = [];

  for (const item of allRawReviews) {
    const rSlug = item.productSlug?.toLowerCase().trim();
    const cSlug = item.categorySlug?.toLowerCase().trim();

    if (productSlug && rSlug === productSlug) {
      specificReviews.push(item);
    } else if (categorySlug && cSlug === categorySlug && rSlug !== "all") {
      specificReviews.push(item);
    } else {
      genericReviews.push(item);
    }
  }

  // Combine with specific ones first
  const combined = [...specificReviews, ...genericReviews];

  // 2. Dynamically replace {productName} in review comments and replies
  const formattedReviews: CustomerReview[] = combined.map((rev) => {
    const formattedComment = rev.comment
      .replace(/{productName}/gi, productName)
      .replace(/{product}/gi, productName);

    const formattedReply = rev.reply
      ? {
          ...rev.reply,
          text: rev.reply.text
            .replace(/{productName}/gi, productName)
            .replace(/{product}/gi, productName),
        }
      : undefined;

    return {
      ...rev,
      comment: formattedComment,
      reply: formattedReply,
    };
  });

  // Calculate high-trust satisfaction rate (default 98.4% matching the client screenshot)
  const baseRating = product?.rating || 5.0;
  const satisfactionRate = baseRating >= 4.8 ? "98.4%" : `${Math.round((baseRating / 5) * 1000) / 10}%`;

  return {
    satisfactionRate,
    satisfactionHeadline: "Exceptional feedback from our readers 🚀",
    totalReviews: product?.reviewCount || 128,
    averageRating: baseRating,
    reviews: formattedReviews,
  };
}
