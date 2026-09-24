import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BookOpen, ChevronRight, AlertCircle, Share2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { blogPosts } from '../utils/medicalData';
import '../styles/skeuomorphic.css';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const posts = blogPosts || [];
  const post = posts.find(p => p && p.id === id);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Amara Pain Blog`;
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 md:px-8 text-center space-y-6 text-left">
        <AlertCircle className="h-16 w-16 text-rose-500 mx-auto" />
        <h1 className="text-3xl font-extrabold font-heading text-[#FFFFFF]">Article Not Found</h1>
        <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75]">We couldn't find the blog post you were looking for.</p>
        <Button variant="primary" onClick={() => navigate('/blog')}>
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-3xl mx-auto text-left">

      {/* 1. BREADCRUMBS & BACK LINK */}
      <div className="flex flex-col gap-4 relative z-10">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D1D5DB] hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb navigation" className="flex items-center gap-1.5 text-xs text-[#D1D5DB] font-medium">
          <Link to="/" className="hover:text-emerald-400">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#D1D5DB]/60" />
          <Link to="/blog" className="hover:text-emerald-400">Patient Blog</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#D1D5DB]/60" />
          <span className="text-[#FFFFFF] truncate font-extrabold" aria-current="page">{post.title}</span>
        </nav>
      </div>

      {/* 2. ARTICLE HEADER */}
      <div className="space-y-6 border-b border-[#585454] pb-6 my-6 relative z-10">
        <Badge variant="accent" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold">
          {post.category}
        </Badge>
        <h1 className="text-3xl md:text-[42px] font-extrabold font-heading text-[#FFFFFF] leading-[1.2]">
          {post.title}
        </h1>
        
        {/* Author & Date Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#D1D5DB]">
          <span className="flex items-center gap-1.5 font-bold text-[#FFFFFF]">
            <User className="h-4 w-4 text-[#D1D5DB]" />
            By {post.author}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="h-4 w-4 text-emerald-400" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            5 min read
          </span>
        </div>
      </div>

      {/* 2.5 FEATURED ARTICLE IMAGE */}
      {post.image && (
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#585454] shadow-2xl bg-[#323030] z-10 my-6">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      )}

      {/* 3. MAIN ARTICLE BODY */}
      <article className="prose prose-invert max-w-none text-[#F0F0F0] text-base md:text-lg leading-relaxed space-y-6 relative z-10 w-full font-normal my-6">
        <p className="font-bold text-[#FFFFFF] text-[18px]">
          {post.excerpt}
        </p>
        <div className="whitespace-pre-line text-[#F0F0F0] text-[18px] leading-[1.75] font-normal">
          {post.content}
        </div>
      </article>

      {/* 4. SHARE & BACK TO BLOG FOOTER */}
      <div className="border-t border-b border-[#585454] py-6 my-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#D1D5DB] relative z-10 w-full">
        {/* Share buttons */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-bold text-[#FFFFFF]">
            <Share2 className="h-4 w-4 text-emerald-400" />
            Share Article:
          </span>
          <button className="p-2 bg-[#363434] hover:bg-[#454242] rounded-full text-[#D1D5DB] hover:text-emerald-400 transition-colors cursor-pointer flex items-center justify-center border border-[#585454]" title="Share on Facebook" aria-label="Share on Facebook">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
            </svg>
          </button>
          <button className="p-2 bg-[#363434] hover:bg-[#454242] rounded-full text-[#D1D5DB] hover:text-emerald-400 transition-colors cursor-pointer flex items-center justify-center border border-[#585454]" title="Share on Twitter" aria-label="Share on Twitter">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>
        
        <Link to="/blog">
          <Button variant="secondary" size="sm" icon={ArrowLeft}>
            Back to All Articles
          </Button>
        </Link>
      </div>

      {/* 5. NEWSLETTER / SIGN UP CARD */}
      <Card variant="slate" padding="md" className="bg-[#363434] border-[#585454] my-8 text-center space-y-4 relative z-10 shadow-2xl p-6 w-full rounded-2xl">
        <h4 className="font-bold text-base text-[#FFFFFF]">Subscribe for Clinical Updates</h4>
        <p className="text-xs text-[#F0F0F0] max-w-xl mx-auto font-medium">
          Sign up to receive our monthly newsletter containing new interventional treatment studies, wellness tips, and clinic announcements from Amara Pain &amp; Spine.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto gap-2">
          <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
          <input 
            id="newsletter-email"
            type="email" 
            placeholder="Enter your email" 
            aria-label="Email address for newsletter"
            className="flex-1 px-4 py-2 bg-[#454242] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-full text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm transition-all duration-200"
          />
          <Button type="submit" variant="primary" size="sm">Subscribe</Button>
        </form>
      </Card>

    </div>
  );
}
