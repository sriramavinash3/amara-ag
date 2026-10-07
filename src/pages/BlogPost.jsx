import React,{useEffect,useState} from 'react';
import {useParams,Link,useNavigate} from 'react-router-dom';
import {ArrowLeft,Calendar,User,BookOpen,ChevronRight,AlertCircle,Share2} from 'lucide-react';
import Card from '../components/ui/Card'; import Button from '../components/ui/Button'; import Badge from '../components/ui/Badge';
import {getBlogPost} from '../utils/blogApi'; import '../styles/skeuomorphic.css';

export default function BlogPost(){
  const {id}=useParams(), navigate=useNavigate(); const [post,setPost]=useState(null),[loading,setLoading]=useState(true);
  useEffect(()=>{getBlogPost(id).then(setPost).finally(()=>setLoading(false));window.scrollTo(0,0);},[id]);
  useEffect(()=>{if(post)document.title=(post.seoTitle||post.title)+' | Amara Pain Blog';},[post]);
  if(loading)return <div className="max-w-4xl mx-auto py-20 px-4 text-slate-600">Loading article…</div>;
  if(!post)return <div className="max-w-7xl mx-auto py-20 px-4 text-center space-y-6"><AlertCircle className="h-16 w-16 text-cta-600 mx-auto"/><h1 className="text-3xl font-extrabold text-slate-900">Article Not Found</h1><p className="text-[18px] text-slate-600">We couldn't find the blog post you were looking for.</p><Button variant="primary" onClick={()=>navigate('/blog')}>Back to Blog</Button></div>;
  return <div className="w-full relative py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-8 text-left">
    <div className="flex flex-col gap-4"><Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-medical-600"><ArrowLeft className="h-4 w-4"/>Back to Blog</Link><nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500"><Link to="/">Home</Link><ChevronRight className="h-3.5 w-3.5"/><Link to="/blog">Patient Blog</Link><ChevronRight className="h-3.5 w-3.5"/><span className="truncate font-semibold">{post.title}</span></nav></div>
    <div className="space-y-6 border-b border-slate-200 pb-6"><Badge variant="accent" className="bg-cyan-50 text-cyan-800 border border-cyan-100">{post.category}</Badge>{post.featuredImageUrl&&<img src={post.featuredImageUrl} alt="" className="w-full aspect-[16/9] object-cover rounded-2xl border border-slate-200"/>}<h1 className="text-3xl md:text-[42px] font-extrabold text-slate-900 leading-[1.2]">{post.title}</h1><div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500"><span className="flex items-center gap-1.5 font-bold text-slate-800"><User className="h-4 w-4"/>{post.author}</span><span className="flex items-center gap-1.5"><Calendar className="h-4 w-4"/>{post.date}</span><span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4"/>5 min read</span></div></div>
    <article className="max-w-[720px] text-slate-700 text-base md:text-lg leading-relaxed space-y-6"><p className="font-semibold text-slate-900 text-[18px]">{post.excerpt}</p><div className="whitespace-pre-line text-slate-600 text-[18px] leading-[1.75]">{post.content}</div></article>
    <div className="border-t border-b border-slate-200 py-6 flex justify-between items-center gap-4 max-w-[720px]"><span className="flex items-center gap-1 font-bold text-slate-900"><Share2 className="h-4 w-4 text-medical-600"/>Share Article</span><Link to="/blog"><Button variant="outline" size="sm" icon={ArrowLeft}>Back to All Articles</Button></Link></div>
    <Card variant="slate" padding="md" className="bg-slate-100/60 border-slate-200 text-center space-y-4 p-6 max-w-[720px]"><h4 className="font-bold text-base text-slate-900">Subscribe for Clinical Updates</h4><p className="text-xs text-slate-600">Sign up to receive our monthly newsletter containing new interventional treatment studies, wellness tips, and clinic announcements.</p></Card>
  </div>;
}