import React, { useState } from 'react';
import { Poem } from '../data/poetryData';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Download, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  BookOpen, 
  ChevronDown, 
  Send,
  Eye,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audioPlayer';

interface PoetryCardProps {
  poem: Poem;
  onLike: (id: number) => void;
  onBookmark: (id: number) => void;
  onAddComment: (poemId: number, commentText: string) => void;
  onOpenExport: (poem: Poem) => void;
  onSelectPoet?: (poetName: string) => void;
  onSelectCategory?: (category: string) => void;
  fontSizeMultiplier: number;
}

export const PoetryCard: React.FC<PoetryCardProps> = ({
  poem,
  onLike,
  onBookmark,
  onAddComment,
  onOpenExport,
  onSelectPoet,
  onSelectCategory,
  fontSizeMultiplier,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isReciting, setIsReciting] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(poem.id);
    if (!poem.liked) {
      // Trigger subtle celebratory confetti from click coordinates
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { x, y },
        colors: ['#0f7a3a', '#d4af37', '#e11d48']
      });
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `${poem.text}\n\n— ${poem.poetUrdu || poem.poet}\n(KM DIGITAL EMPIRE #2 • ہر لہجے کی اردو شاعری)`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `${poem.text}\n\nشاعر: ${poem.poetUrdu || poem.poet}\nبشکریہ: KM DIGITAL EMPIRE #2`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `شعر: ${poem.poetUrdu || poem.poet} | KM DIGITAL EMPIRE #2`,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // Fallback to copy
        handleCopy(e);
      }
    } else {
      handleCopy(e);
    }
  };

  const handleRecite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isReciting) {
      audioManager.stopReciting();
      setIsReciting(false);
    } else {
      setIsReciting(true);
      const success = audioManager.recitePoem(poem.text, () => {
        setIsReciting(false);
      });
      if (!success) {
        setIsReciting(false);
      }
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(poem.id, commentInput.trim());
    setCommentInput('');
  };

  // Base font size scaled by user preference
  const calculatedFontSize = Math.round(23 * fontSizeMultiplier);

  return (
    <div className="group relative bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Decorative top corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-500/10 dark:from-emerald-500/20 to-transparent pointer-events-none rounded-tr-2xl" />

      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100 dark:border-stone-800/80 text-xs text-stone-500 dark:text-stone-400 font-latin">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/40">
              #{poem.id}
            </span>
            <button
              onClick={() => onSelectCategory?.(poem.category)}
              className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-medium cursor-pointer"
            >
              {poem.category}
            </button>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-stone-400 dark:text-stone-500 text-[11px]">
              {poem.type}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] text-stone-400">
              <Eye className="w-3.5 h-3.5" />
              {poem.views.toLocaleString()}
            </span>
            <button
              onClick={() => onBookmark(poem.id)}
              title={poem.bookmarked ? "محفوظ شدہ (Remove from Bayaz)" : "بیاض میں محفوظ کریں (Save)"}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                poem.bookmarked 
                  ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/50' 
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Bookmark className="w-4 h-4" fill={poem.bookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Poet Attribution */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onSelectPoet?.(poem.poet)}
            className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-urdu text-base sm:text-lg font-bold hover:underline cursor-pointer group-hover:text-emerald-600 dark:group-hover:text-emerald-300"
          >
            <span className="text-xs text-stone-400 font-latin uppercase tracking-wider font-normal">شاعر:</span>
            <span>{poem.poetUrdu || poem.poet}</span>
          </button>
          <span className="text-[12px] font-latin text-stone-400 dark:text-stone-500 font-medium">
            {poem.poet}
          </span>
        </div>

        {/* Delicate calligraphic separator */}
        <div className="text-center text-emerald-700/30 dark:text-emerald-400/30 text-xs my-1 select-none font-urdu">
          • ✤ •
        </div>

        {/* Urdu Poetry Verse Text */}
        <div 
          className="my-3 text-stone-950 dark:text-stone-50 font-urdu nastaliq-verse text-center whitespace-pre-line select-text tracking-wide font-normal"
          style={{ fontSize: `${calculatedFontSize}px`, minHeight: '90px' }}
          dir="rtl"
        >
          {poem.text}
        </div>

        {/* Subtle bottom separator */}
        <div className="text-center text-amber-600/30 dark:text-amber-400/30 text-xs mb-2 select-none font-urdu">
          ~ ❧ ~
        </div>

        {/* Optional English & Roman Urdu Drawer */}
        {(poem.romanUrdu || poem.englishMeaning) && (
          <div className="mt-2 mb-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 font-latin cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showDetails ? 'Hide Translation & Roman' : 'Roman Urdu & Meaning'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>

            {showDetails && (
              <div className="mt-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 text-xs font-latin space-y-1.5 text-left" dir="ltr">
                {poem.romanUrdu && (
                  <p className="text-stone-700 dark:text-stone-300 italic">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 not-italic mr-1">Roman:</span>
                    {poem.romanUrdu}
                  </p>
                )}
                {poem.englishMeaning && (
                  <p className="text-stone-600 dark:text-stone-400">
                    <span className="font-semibold text-stone-700 dark:text-stone-300 mr-1">Meaning:</span>
                    {poem.englishMeaning}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-1 sm:gap-2 text-xs font-latin">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all cursor-pointer font-medium ${
            poem.liked
              ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-400 scale-[1.02]'
              : 'bg-stone-50 hover:bg-rose-50/70 text-stone-600 hover:text-rose-600 border-stone-200 dark:bg-stone-800/60 dark:border-stone-700 dark:text-stone-300'
          }`}
          title="پسند کریں (Like)"
        >
          <Heart className="w-4 h-4 transition-transform group-active:scale-125" fill={poem.liked ? 'currentColor' : 'none'} />
          <span>{poem.likes}</span>
        </button>

        {/* Recite Speech */}
        <button
          onClick={handleRecite}
          className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border transition-colors cursor-pointer ${
            isReciting
              ? 'bg-emerald-600 text-white border-emerald-600 animate-pulse'
              : 'bg-stone-50 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 border-stone-200 dark:bg-stone-800/60 dark:border-stone-700 dark:text-stone-300'
          }`}
          title={isReciting ? "آواز بند کریں (Stop Recitation)" : "شعر سنیں (Recite Aloud)"}
        >
          {isReciting ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="hidden sm:inline">سنیں</span>
        </button>

        {/* Comment Toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border transition-colors cursor-pointer ${
            showComments
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              : 'bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border-stone-200 dark:bg-stone-800/60 dark:border-stone-700 dark:text-stone-300'
          }`}
          title="تبصرے دیکھیں (Comments)"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{poem.comments?.length || 0}</span>
        </button>

        {/* Copy Verse */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border transition-colors cursor-pointer ${
            copied
              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-300'
              : 'bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border-stone-200 dark:bg-stone-800/60 dark:border-stone-700 dark:text-stone-300'
          }`}
          title="شعر کاپی کریں (Copy Verse)"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? 'کاپی ہوا' : 'کاپی'}</span>
        </button>

        {/* Export Visual Image Card */}
        <button
          onClick={() => onOpenExport(poem)}
          className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border bg-gradient-to-r from-amber-500/10 to-emerald-500/10 hover:from-amber-500/20 hover:to-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-700/60 transition-colors cursor-pointer"
          title="خوبصورت تصویری کارڈ بنائیں (Make Image Card)"
        >
          <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="hidden md:inline font-urdu text-sm font-semibold">کارڈ</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 transition-colors cursor-pointer"
          title="شیئر کریں (Share via WhatsApp / Social)"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Collapsible Comments Section */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 animate-fadeIn">
          <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-3">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="تبصرہ لکھیں (Write a comment)..."
              className="flex-1 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-sm font-urdu focus:outline-none focus:ring-2 focus:ring-emerald-500"
              dir="rtl"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {(!poem.comments || poem.comments.length === 0) ? (
              <p className="text-center text-xs text-stone-400 py-2 font-urdu">
                پہلا تبصرہ آپ خود لکھیے۔
              </p>
            ) : (
              poem.comments.map((c) => (
                <div 
                  key={c.id} 
                  className="bg-stone-50 dark:bg-stone-800/70 p-2.5 rounded-xl border border-stone-100 dark:border-stone-800 text-xs text-right"
                  dir="rtl"
                >
                  <div className="flex justify-between items-center text-[11px] text-stone-400 mb-1 font-latin" dir="ltr">
                    <span>{c.timestamp}</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 font-urdu">{c.author}</span>
                  </div>
                  <p className="font-urdu text-sm text-stone-800 dark:text-stone-200">
                    {c.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
