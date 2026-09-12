import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: { slug: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://selfnotes99.com";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find((b) => b.slug === params.slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested blog article could not be found.",
    };
  }

  const title = `${post.title} | Self Notes 99`;
  const description = post.excerpt || `Read ${post.title} on Self Notes 99.`;
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image || "/og-image.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((b) => b.slug === params.slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((b) => b.id !== post.id).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: "2025-01-15T00:00:00Z",
    dateModified: "2025-01-15T00:00:00Z",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Self Notes 99",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064B35] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 bg-[#EAF4D5] text-[#064B35] text-xs font-extrabold uppercase rounded-full">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-2 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">{post.author.name}</p>
                <p className="text-[11px] text-gray-500">{post.author.role} • {post.date}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-sm">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Article Content */}
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed space-y-4">
          {Array.isArray(post.content) ? (
            post.content.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
          ) : (
            <p>{post.content}</p>
          )}
        </div>

        {/* Share & tags */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Category:</span>
            <span className="text-xs font-semibold text-[#064B35] bg-[#EAF4D5] px-2.5 py-1 rounded-md">
              {post.category}
            </span>
          </div>
          <button
            onClick={() => {
              if (typeof window !== "undefined" && navigator.share) {
                navigator.share({ title: post.title, url: window.location.href });
              }
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[#064B35]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-10 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group block space-y-2.5"
                >
                  <div className="relative h-40 w-full rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#064B35] line-clamp-2 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
