import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blog";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((b) => b.slug === params.slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((b) => b.id !== post.id).slice(0, 3);

  return (
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

      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg">
        <Image src={post.image} alt={post.title} fill priority className="object-cover" />
      </div>

      {/* Article Body */}
      <div className="prose prose-lg max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-6 pt-4">
        {post.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Related Posts */}
      <div className="pt-12 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">More from The Journal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((b) => (
            <Link
              key={b.id}
              href={`/blog/${b.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-xs hover:border-[#064B35] transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={b.image} alt={b.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#064B35] uppercase">{b.category}</span>
                <h4 className="text-xs font-bold text-gray-900 mt-1 line-clamp-2 group-hover:text-[#064B35] transition-colors">{b.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
