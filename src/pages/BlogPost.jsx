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
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Amara Pain Blog`;
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 text-center space-y-6 text-left">
        <AlertCircle className="h-16 w-16 text-cta-600 mx-auto" />
        <h1 className="text-3xl font-extrabold font-heading text-slate-900">Article Not Found</h1>
        <p className="text-[18px] text-slate-600 font-normal leading-[1.75]">We couldn't find the blog post you were looking for.</p>
        <Button variant="primary" onClick={() => navigate('/blog')}>
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full relative py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-8 text-left">

      {/* 1. BREADCRUMBS & BACK LINK */}
      <div className="flex flex-col gap-4 relative z-10">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-medical-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Link to="/" className="hover:text-primary-900">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/blog" className="hover:text-primary-900">Patient Blog</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500 truncate">{post.title}</span>
        </div>
      </div>

      {/* 2. ARTICLE HEADER */}
      <div className="space-y-6 border-b border-slate-200 pb-6 relative z-10">
        <Badge variant="accent" className="bg-cyan-50 text-cyan-800 border border-cyan-100 font-bold">
          {post.category}
        </Badge>
        <h1 className="text-3xl md:text-[42px] font-extrabold font-heading text-slate-900 leading-[1.2]">
          {post.title}
        </h1>
        
        {/* Author & Date Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <User className="h-4 w-4 text-slate-400" />
            By {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-medical-600" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-accent-600" />
            5 min read
          </span>
        </div>
      </div>

      {/* 3. MAIN ARTICLE BODY */}
      <article className="prose prose-slate max-w-none text-slate-700 text-base md:text-lg leading-relaxed space-y-6 relative z-10 max-w-[720px]">
        <p className="font-semibold text-slate-900 text-[18px]">
          {post.excerpt}
        </p>
        <div className="whitespace-pre-line text-slate-600 text-[18px] leading-[1.75]">
          {post.content}
        </div>
      </article>

      {/* 4. SHARE & BACK TO BLOG FOOTER */}
      <div className="border-t border-b border-slate-200 py-6 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 relative z-10 max-w-[720px]">
        {/* Share buttons */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-bold text-slate-900">
            <Share2 className="h-4 w-4 text-medical-600" />
            Share Article:
          </span>
          <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-medical-600 transition-colors cursor-pointer flex items-center justify-center border border-slate-200" title="Share on Facebook">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
            </svg>
          </button>
          <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-medical-600 transition-colors cursor-pointer flex items-center justify-center border border-slate-200" title="Share on Twitter">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>
        
        <Link to="/blog">
          <Button variant="outline" size="sm" icon={ArrowLeft} className="text-slate-900 border-slate-350 hover:border-slate-400">
            Back to All Articles
          </Button>
        </Link>
      </div>

      {/* 5. NEWSLETTER / SIGN UP CARD */}
      <Card variant="slate" padding="md" className="bg-slate-100/60 border-slate-200 mt-8 text-center space-y-4 relative z-10 shadow-sm p-6 max-w-[720px]">
        <h4 className="font-bold text-base text-slate-900">Subscribe for Clinical Updates</h4>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          Sign up to receive our monthly newsletter containing new interventional treatment studies, wellness tips, and clinic announcements from Amara Pain &amp; Spine.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-2 bg-white border border-slate-250 rounded-full text-sm focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 shadow-sm transition-all duration-200"
          />
          <Button variant="secondary" size="sm" className="bg-medical-600 hover:bg-medical-700 text-white">Subscribe</Button>
        </div>
      </Card>

    </div>
  );
}
