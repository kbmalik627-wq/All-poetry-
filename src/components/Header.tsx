import React from 'react';
import { 
  Search, 
  Music, 
  VolumeX, 
  Plus, 
  Bookmark, 
  Users, 
  Shuffle, 
  Sun, 
  Moon, 
  Sparkles,
  Feather
} from 'lucide-react';
import { CATEGORIES } from '../data/poetryData';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
  onOpenAddModal: () => void;
  onRandomPoem: () => void;
  bookmarkedCount: number;
  showBookmarksOnly: boolean;
  onToggleBookmarksOnly: () => void;
  showPoetsDirectory: boolean;
  onTogglePoetsDirectory: () => void;
  fontSizeMultiplier: number;
  onChangeFontSize: (delta: number) => void;
  totalCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  isAmbientPlaying,
  onToggleAmbient,
  onOpenAddModal,
  onRandomPoem,
  bookmarkedCount,
  showBookmarksOnly,
  onToggleBookmarksOnly,
  showPoetsDirectory,
  onTogglePoetsDirectory,
  fontSizeMultiplier,
  onChangeFontSize,
  totalCount,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="w-full">
      {/* Imperial Top Announcement Banner - KM DIGITAL EMPIRE #2 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white border-b border-emerald-700/60 shadow-lg">
        {/* Subtle decorative gold sheen */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 py-7 sm:py-9 text-center relative z-10 flex flex-col items-center">
          {/* Top Brand Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-500/60 text-xs font-latin tracking-widest text-amber-300 uppercase font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>KM DIGITAL EMPIRE #2</span>
          </div>

          {/* Main English Brand Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 font-display drop-shadow-sm">
            KM DIGITAL EMPIRE #2
          </h1>

          {/* Clean, Pure Urdu Headline (No English mixed in) */}
          <div className="mb-2 px-2" dir="rtl">
            <h2 className="font-urdu text-2xl sm:text-4xl text-emerald-100 font-bold leading-relaxed drop-shadow-md">
              آل پوئٹری — ہر لہجے کی اردو شاعری
            </h2>
          </div>

          {/* Separate Clean English Subtitle */}
          <p className="text-xs sm:text-sm font-latin text-emerald-200/90 max-w-xl text-center mb-4 tracking-wide" dir="ltr">
            All Poetry • Classical Ghazals, 2-Line Sher & Modern Literature
          </p>

          {/* Clean Separated Badges */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-urdu text-emerald-200 bg-emerald-950/80 px-5 py-2 rounded-2xl border border-emerald-700/60 flex-wrap justify-center shadow-inner" dir="rtl">
            <span className="font-bold text-amber-300">2,000+ منتخب اشعار</span>
            <span className="text-emerald-600">•</span>
            <span>12 عظیم شعراء کا کلام</span>
            <span className="text-emerald-600">•</span>
            <span>خوبصورت تصویری کارڈز</span>
            <span className="text-emerald-600">•</span>
            <span className="text-emerald-300">آواز و ترنم</span>
          </div>
        </div>
      </div>

      {/* Navigation & Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4" dir="rtl">
        {/* Logo and Tag */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 text-white flex items-center justify-center shadow-md border border-emerald-500/30">
            <Feather className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-latin font-extrabold text-xl sm:text-2xl text-emerald-800 dark:text-emerald-400 tracking-tight" dir="ltr">
                KM Digital Empire #2
              </span>
              <span className="text-[10px] font-latin font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-300/60 dark:border-amber-800/60">
                POETRY
              </span>
            </div>
            <p className="font-urdu text-xs text-stone-500 dark:text-stone-400">
              کل اشعار: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{totalCount.toLocaleString()}</strong>
            </p>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="flex-1 min-w-[260px] max-w-lg">
          <div className="relative flex items-center bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-full shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent overflow-hidden">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search shair, ghazal, poet, khwahish, ghalib..."
              className="w-full py-2.5 px-4 text-sm font-latin text-stone-800 dark:text-stone-100 bg-transparent focus:outline-none placeholder:text-stone-400"
              dir="ltr"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="px-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer text-xs font-latin"
              >
                Clear
              </button>
            )}
            <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-latin">
          
          {/* DAY / NIGHT MODE TOGGLE BUTTON */}
          <button
            onClick={onToggleDarkMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all cursor-pointer font-medium shadow-xs ${
              isDarkMode
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
                : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
            }`}
            title={isDarkMode ? "دن کا موڈ آن کریں (Switch to Day Mode)" : "رات کا موڈ آن کریں (Switch to Night Mode)"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-700" />}
            <span className="font-urdu text-sm font-semibold">
              {isDarkMode ? 'دن کا موڈ' : 'رات کا موڈ'}
            </span>
          </button>

          {/* Ambient Music / Tanpura Drone Button */}
          <button
            onClick={onToggleAmbient}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all cursor-pointer font-medium ${
              isAmbientPlaying
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm animate-pulse'
                : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
            title="سُر و ساز (Ambient Indian Classical Drone / Sitar)"
          >
            {isAmbientPlaying ? <VolumeX className="w-4 h-4" /> : <Music className="w-4 h-4" />}
            <span className="hidden md:inline font-urdu text-sm">
              {isAmbientPlaying ? 'ساز بند کریں' : 'ساز و ترنم'}
            </span>
          </button>

          {/* Random Verse / فالِ سخن */}
          <button
            onClick={onRandomPoem}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
            title="اتفاقی شعر (Random Couplet / Fal-e-Sukhan)"
          >
            <Shuffle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline font-urdu text-sm">شعرِ امروز</span>
          </button>

          {/* Poets Directory toggle */}
          <button
            onClick={onTogglePoetsDirectory}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
              showPoetsDirectory
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400'
                : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
            title="شعراء کا تعارف (Poets)"
          >
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline font-urdu text-sm">مشاہیرِ شعراء</span>
          </button>

          {/* Bookmarks / Bayaz Filter */}
          <button
            onClick={onToggleBookmarksOnly}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
              showBookmarksOnly
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400'
                : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
            title="میری بیاض (Saved Poetry)"
          >
            <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" fill={showBookmarksOnly ? 'currentColor' : 'none'} />
            <span className="hidden sm:inline font-urdu text-sm">میری بیاض</span>
            {bookmarkedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {/* Font Size controls */}
          <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-2xs">
            <button
              onClick={() => onChangeFontSize(-0.1)}
              disabled={fontSizeMultiplier <= 0.8}
              className="px-2 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 disabled:opacity-40 cursor-pointer"
              title="خط چھوٹا کریں (Decrease Font)"
            >
              A-
            </button>
            <span className="px-1.5 text-[11px] text-stone-400 border-x border-stone-200 dark:border-stone-800">
              خط
            </span>
            <button
              onClick={() => onChangeFontSize(0.1)}
              disabled={fontSizeMultiplier >= 1.4}
              className="px-2 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 disabled:opacity-40 cursor-pointer font-bold"
              title="خط بڑا کریں (Increase Font)"
            >
              A+
            </button>
          </div>

          {/* Add Poetry Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-urdu text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>شعر شامل کریں</span>
          </button>
        </div>
      </div>

      {/* Categories Horizontal Carousel Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-2" dir="rtl">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-base font-urdu border transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-emerald-700 dark:bg-emerald-600 text-white border-emerald-700 dark:border-emerald-600 shadow-md font-bold scale-[1.02]'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 border-stone-300 dark:border-stone-800 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40'
                }`}
              >
                <span>{cat.nameUrdu}</span>
                <span className={`text-[11px] font-latin font-medium ${isActive ? 'text-emerald-100' : 'text-stone-400 dark:text-stone-500'}`}>
                  {cat.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
