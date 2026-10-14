import React, { useState, useEffect, useMemo } from 'react';
import { 
  generateFullPoetryDatabase, 
  Poem, 
  POET_PROFILES, 
  CATEGORIES 
} from './data/poetryData';
import { Header } from './components/Header';
import { PoetryCard } from './components/PoetryCard';
import { ExportModal } from './components/ExportModal';
import { AddPoetryModal } from './components/AddPoetryModal';
import { PoetDirectory } from './components/PoetDirectory';
import { audioManager } from './utils/audioPlayer';
import { 
  Sparkles, 
  RefreshCw, 
  Feather, 
  Heart, 
  ArrowUp, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';

const STORAGE_KEY_CUSTOM_POEMS = 'km_poetry_user_poems_v3';
const STORAGE_KEY_LIKES = 'km_poetry_likes_v3';
const STORAGE_KEY_BOOKMARKS = 'km_poetry_bookmarks_v3';
const STORAGE_KEY_COMMENTS = 'km_poetry_comments_v3';
const STORAGE_KEY_THEME = 'km_digital_empire_theme';

export default function App() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPoet, setSelectedPoet] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'likes' | 'views' | 'newest'>('featured');
  
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showPoetsDirectory, setShowPoetsDirectory] = useState(false);
  
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1.0);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  
  // Day / Night Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply dark mode class to root HTML element
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (isDarkMode) {
        root.classList.add('dark');
        root.classList.remove('light');
        localStorage.setItem(STORAGE_KEY_THEME, 'dark');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        localStorage.setItem(STORAGE_KEY_THEME, 'light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  
  // Modals
  const [exportPoem, setExportPoem] = useState<Poem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Pagination / Infinite view
  const [visibleCount, setVisibleCount] = useState(30);

  // Daily featured poem
  const [dailyIndex, setDailyIndex] = useState(0);

  // Initialize data from database and localStorage
  useEffect(() => {
    const baseList = generateFullPoetryDatabase();

    // Load user stored interactions
    try {
      const storedUserPoems = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_POEMS) || '[]');
      const storedLikes = JSON.parse(localStorage.getItem(STORAGE_KEY_LIKES) || '{}');
      const storedBookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '{}');
      const storedComments = JSON.parse(localStorage.getItem(STORAGE_KEY_COMMENTS) || '{}');

      // Combine user added poems with database
      const fullList = [...storedUserPoems, ...baseList].map((p) => {
        const isLiked = storedLikes[p.id] ?? p.liked;
        const isBookmarked = storedBookmarks[p.id] ?? p.bookmarked;
        const customComments = storedComments[p.id] || [];
        return {
          ...p,
          liked: isLiked,
          bookmarked: isBookmarked,
          likes: p.likes + (storedLikes[p.id] && !p.liked ? 1 : 0),
          comments: [...(p.comments || []), ...customComments]
        };
      });

      setPoems(fullList);
      
      // Select daily poem based on today's date
      const todayDateSeed = new Date().getDate();
      setDailyIndex(todayDateSeed % Math.min(25, fullList.length));
    } catch (err) {
      console.error('Error hydrating saved poetry data', err);
      setPoems(baseList);
    }
  }, []);

  // Sync likes to localStorage
  const handleLike = (id: number) => {
    setPoems((prev) => {
      const updated = prev.map((poem) => {
        if (poem.id === id) {
          const newLiked = !poem.liked;
          const newLikes = newLiked ? poem.likes + 1 : Math.max(0, poem.likes - 1);
          return { ...poem, liked: newLiked, likes: newLikes };
        }
        return poem;
      });

      try {
        const likesMap: Record<number, boolean> = {};
        updated.forEach((p) => {
          if (p.liked) likesMap[p.id] = true;
        });
        localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(likesMap));
      } catch (e) {
        console.error(e);
      }

      return updated;
    });
  };

  // Sync bookmarks to localStorage
  const handleBookmark = (id: number) => {
    setPoems((prev) => {
      const updated = prev.map((poem) => {
        if (poem.id === id) {
          return { ...poem, bookmarked: !poem.bookmarked };
        }
        return poem;
      });

      try {
        const bookmarkMap: Record<number, boolean> = {};
        updated.forEach((p) => {
          if (p.bookmarked) bookmarkMap[p.id] = true;
        });
        localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkMap));
      } catch (e) {
        console.error(e);
      }

      return updated;
    });
  };

  // Add Comment to poem
  const handleAddComment = (poemId: number, text: string) => {
    const newComment = {
      id: `c-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      author: 'آپ (Reader)',
      text,
      timestamp: 'ابھی ابھی'
    };

    setPoems((prev) => {
      const updated = prev.map((p) => {
        if (p.id === poemId) {
          return { ...p, comments: [newComment, ...(p.comments || [])] };
        }
        return p;
      });

      try {
        const storedComments = JSON.parse(localStorage.getItem(STORAGE_KEY_COMMENTS) || '{}');
        const existing = storedComments[poemId] || [];
        storedComments[poemId] = [newComment, ...existing];
        localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(storedComments));
      } catch (e) {
        console.error(e);
      }

      return updated;
    });
  };

  // Add custom user poem
  const handleAddCustomPoem = (newPoem: Poem) => {
    setPoems((prev) => {
      const updated = [newPoem, ...prev];
      try {
        const storedUserPoems = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_POEMS) || '[]');
        storedUserPoems.unshift(newPoem);
        localStorage.setItem(STORAGE_KEY_CUSTOM_POEMS, JSON.stringify(storedUserPoems));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Ambient sound toggle
  const handleToggleAmbient = () => {
    const playing = audioManager.toggleAmbientMusic((state) => {
      setIsAmbientPlaying(state);
    });
    setIsAmbientPlaying(playing);
  };

  // Font size multiplier
  const handleChangeFontSize = (delta: number) => {
    setFontSizeMultiplier((prev) => Math.max(0.8, Math.min(1.4, prev + delta)));
  };

  // Random couplet / Fal-e-Sukhan
  const handleRandomPoem = () => {
    if (poems.length === 0) return;
    const randomIndex = Math.floor(Math.random() * poems.length);
    const chosen = poems[randomIndex];
    setSelectedCategory('All');
    setSelectedPoet(null);
    setShowBookmarksOnly(false);
    setShowPoetsDirectory(false);
    setSearchQuery(chosen.text.split('\n')[0]);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Bookmarked count
  const bookmarkedCount = useMemo(() => {
    return poems.filter((p) => p.bookmarked).length;
  }, [poems]);

  // Filtered & Sorted Poems
  const filteredPoems = useMemo(() => {
    let result = poems;

    // Bookmarks only filter
    if (showBookmarksOnly) {
      result = result.filter((p) => p.bookmarked);
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Poet filter
    if (selectedPoet) {
      result = result.filter((p) => p.poet.toLowerCase() === selectedPoet.toLowerCase());
    }

    // Type filter (2 Lines, 4 Lines, Ghazal)
    if (selectedType && selectedType !== 'All') {
      result = result.filter((p) => p.type === selectedType);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => {
        return (
          p.text.toLowerCase().includes(q) ||
          p.poet.toLowerCase().includes(q) ||
          p.poetUrdu.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.romanUrdu && p.romanUrdu.toLowerCase().includes(q)) ||
          (p.englishMeaning && p.englishMeaning.toLowerCase().includes(q))
        );
      });
    }

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'newest') return b.id - a.id;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [poems, showBookmarksOnly, selectedCategory, selectedPoet, selectedType, searchQuery, sortBy]);

  // Sliced items for smooth render performance
  const displayedPoems = useMemo(() => {
    return filteredPoems.slice(0, visibleCount);
  }, [filteredPoems, visibleCount]);

  const dailyPoem = poems[dailyIndex] || poems[0];

  return (
    <div className="min-h-screen bg-stone-100/80 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-urdu selection:bg-emerald-600 selection:text-white transition-colors duration-200">
      {/* Top Main Navigation Header with KM DIGITAL EMPIRE branding and Day/Night mode */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setVisibleCount(30);
        }}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setShowBookmarksOnly(false);
          setVisibleCount(30);
        }}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={handleToggleAmbient}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onRandomPoem={handleRandomPoem}
        bookmarkedCount={bookmarkedCount}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarksOnly={() => {
          setShowBookmarksOnly(!showBookmarksOnly);
          setVisibleCount(30);
        }}
        showPoetsDirectory={showPoetsDirectory}
        onTogglePoetsDirectory={() => setShowPoetsDirectory(!showPoetsDirectory)}
        fontSizeMultiplier={fontSizeMultiplier}
        onChangeFontSize={handleChangeFontSize}
        totalCount={poems.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 sm:py-6" dir="rtl">
        
        {/* Daily Couplet Banner (شعرِ امروز) */}
        {!searchQuery && selectedCategory === 'All' && !selectedPoet && !showBookmarksOnly && dailyPoem && (
          <div className="relative mb-8 rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-600/50">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-right flex-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-500/50 text-amber-300 text-xs font-latin font-bold mb-3 shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>KM DIGITAL EMPIRE #2 • شعرِ امروز</span>
                </div>

                <div className="font-urdu nastaliq-verse text-2xl sm:text-3xl text-white font-bold leading-loose my-2 drop-shadow-sm">
                  {dailyPoem.text}
                </div>

                <div className="flex items-center gap-3 mt-3 text-emerald-200">
                  <span className="font-urdu text-xl font-bold text-amber-300">
                    — {dailyPoem.poetUrdu || dailyPoem.poet}
                  </span>
                  <span className="text-xs font-latin text-emerald-200 bg-emerald-900/80 px-2.5 py-0.5 rounded-md border border-emerald-700/50">
                    {dailyPoem.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-col gap-2.5">
                <button
                  onClick={() => setExportPoem(dailyPoem)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-urdu text-sm font-bold shadow-md cursor-pointer transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>کارڈ ڈاؤنلوڈ کریں</span>
                </button>
                <button
                  onClick={() => handleLike(dailyPoem.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 transition-colors text-sm font-latin cursor-pointer ${
                    dailyPoem.liked ? 'bg-rose-600 text-white border-rose-500' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={dailyPoem.liked ? 'currentColor' : 'none'} />
                  <span>{dailyPoem.likes} Likes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Poets Gallery Directory Section (collapsible / toggleable) */}
        {showPoetsDirectory && (
          <PoetDirectory
            selectedPoet={selectedPoet}
            onSelectPoet={(poetName) => {
              setSelectedPoet(poetName || null);
              setVisibleCount(30);
            }}
          />
        )}

        {/* Filtering & Sorting Sub-Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs text-xs font-latin">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 font-bold text-stone-700 dark:text-stone-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Filter:</span>
            </span>

            {/* Structure / Type Filter */}
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
              {['All', '2 Lines', '4 Lines', 'Ghazal'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedType === t
                      ? 'bg-white dark:bg-stone-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-bold'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Active Poet Tag (if selected) */}
            {selectedPoet && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-medium border border-emerald-300 dark:border-emerald-800">
                <span>شاعر: {selectedPoet}</span>
                <button
                  onClick={() => setSelectedPoet(null)}
                  className="hover:text-rose-600 cursor-pointer text-sm font-bold"
                >
                  ×
                </button>
              </span>
            )}

            {/* Bookmarks Filter Active Tag */}
            {showBookmarksOnly && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-medium border border-amber-300 dark:border-amber-800">
                <span>میری محفوظ شدہ بیاض ({bookmarkedCount})</span>
                <button
                  onClick={() => setShowBookmarksOnly(false)}
                  className="hover:text-rose-600 cursor-pointer text-sm font-bold"
                >
                  ×
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-stone-500 dark:text-stone-400">
              دکھائے گئے اشعار: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{filteredPoems.length.toLocaleString()}</strong>
            </span>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400 dark:text-stone-500">ترتیب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-2.5 py-1 text-xs text-stone-700 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="featured">منتخب (Featured)</option>
                <option value="likes">سب سے زیادہ پسندیدہ (Most Liked)</option>
                <option value="views">سب سے زیادہ پڑھے گئے (Most Read)</option>
                <option value="newest">تازہ ترین (Newest)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredPoems.length === 0 && (
          <div className="text-center py-16 px-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm my-6">
            <Feather className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
            <h3 className="font-urdu text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">
              کوئی شعر دستیاب نہیں ملا
            </h3>
            <p className="text-sm font-latin text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-5" dir="ltr">
              No poetry matched your search criteria. Try clearing filters or searching for another poet or emotion.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedPoet(null);
                setSelectedType('All');
                setShowBookmarksOnly(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-urdu text-sm font-bold shadow-sm transition-colors cursor-pointer"
            >
              تمام شاعری دکھائیں
            </button>
          </div>
        )}

        {/* Poetry Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedPoems.map((poem) => (
            <PoetryCard
              key={poem.id}
              poem={poem}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onAddComment={handleAddComment}
              onOpenExport={(p) => setExportPoem(p)}
              onSelectPoet={(poet) => setSelectedPoet(poet)}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              fontSizeMultiplier={fontSizeMultiplier}
            />
          ))}
        </div>

        {/* Load More Button (Infinite scroll capability) */}
        {visibleCount < filteredPoems.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 30)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white dark:bg-stone-900 hover:bg-emerald-50 dark:hover:bg-stone-800 text-emerald-800 dark:text-emerald-300 border-2 border-emerald-600/30 dark:border-emerald-700/50 hover:border-emerald-600 shadow-sm hover:shadow-md font-urdu text-lg font-bold transition-all cursor-pointer group"
            >
              <RefreshCw className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
              <span>مزید اشعار پڑھیں (Load More Poetry)</span>
              <span className="text-xs font-latin text-stone-400 dark:text-stone-500 mr-2" dir="ltr">
                ({visibleCount} / {filteredPoems.length})
              </span>
            </button>
          </div>
        )}

        {/* Back to top float button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-latin cursor-pointer transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            <span>اوپر جائیں (Back to Top)</span>
          </button>
        </div>
      </main>

      {/* Footer with KM DIGITAL EMPIRE #2 */}
      <footer className="w-full bg-stone-900 dark:bg-black text-stone-300 mt-16 border-t border-stone-800" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-right">
            {/* Col 1: Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold tracking-tight shadow-md">
                  KM
                </div>
                <div>
                  <h4 className="font-latin font-bold text-xl text-white">
                    KM DIGITAL EMPIRE #2
                  </h4>
                  <span className="text-xs text-emerald-400 font-urdu">
                    کے ایم ڈیجیٹل ایمپائر کا باوقار اردو پورٹل
                  </span>
                </div>
              </div>
              <p className="font-urdu text-stone-400 text-base leading-loose max-w-lg mb-3">
                اردو ادب اور شاعری کا مستند ترین ڈیجیٹل ذخیرہ۔ میر و غالب کے کلاسیکی سوز سے لے کر جون ایلیا، فراز اور پروین شاکر کے دلکش لہجوں تک۔
              </p>
              <p className="text-xs font-latin text-stone-500" dir="ltr">
                Crafted for Urdu literature admirers, status creators, and poetry lovers worldwide.
              </p>
            </div>

            {/* Col 2: Categories */}
            <div>
              <h5 className="font-urdu text-lg font-bold text-white mb-3">
                اصنافِ سخن
              </h5>
              <ul className="space-y-1.5 text-sm font-urdu text-stone-400">
                {CATEGORIES.slice(1, 7).map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(c.id);
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {c.nameUrdu}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Poets */}
            <div>
              <h5 className="font-urdu text-lg font-bold text-white mb-3">
                مشہور شعراء
              </h5>
              <ul className="space-y-1.5 text-sm font-urdu text-stone-400">
                {Object.keys(POET_PROFILES).slice(0, 6).map((name) => (
                  <li key={name}>
                    <button
                      onClick={() => {
                        setSelectedPoet(name);
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {POET_PROFILES[name].nameUrdu}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-latin text-stone-500" dir="ltr">
            <p>© 2026 KM DIGITAL EMPIRE #2 | All Poetry Portal. All rights reserved.</p>
            <p>Total Database: <strong>{poems.length.toLocaleString()}</strong> Poetries Indexed</p>
          </div>
        </div>
      </footer>

      {/* Export Visual Card Modal */}
      <ExportModal
        poem={exportPoem}
        onClose={() => setExportPoem(null)}
      />

      {/* Add Poetry Modal */}
      <AddPoetryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPoem={handleAddCustomPoem}
        currentPoemCount={poems.length}
      />
    </div>
  );
}
