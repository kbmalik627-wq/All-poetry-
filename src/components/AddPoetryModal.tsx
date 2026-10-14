import React, { useState } from 'react';
import { Poem, CATEGORIES, POET_PROFILES } from '../data/poetryData';
import { X, Plus, Sparkles } from 'lucide-react';

interface AddPoetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPoem: (poem: Poem) => void;
  currentPoemCount: number;
}

export const AddPoetryModal: React.FC<AddPoetryModalProps> = ({
  isOpen,
  onClose,
  onAddPoem,
  currentPoemCount,
}) => {
  const [verseText, setVerseText] = useState('');
  const [poetName, setPoetName] = useState('Mirza Ghalib');
  const [customPoet, setCustomPoet] = useState('');
  const [category, setCategory] = useState('Ishq Poetry');
  const [poemType, setPoemType] = useState<'2 Lines' | '4 Lines' | 'Ghazal'>('2 Lines');
  const [romanUrdu, setRomanUrdu] = useState('');
  const [englishMeaning, setEnglishMeaning] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verseText.trim()) return;

    const finalPoet = poetName === 'Other' && customPoet.trim() ? customPoet.trim() : poetName;
    const poetObj = POET_PROFILES[finalPoet];
    const catObj = CATEGORIES.find(c => c.id === category);

    const newPoem: Poem = {
      id: currentPoemCount + 1,
      text: verseText.trim(),
      poet: finalPoet,
      poetUrdu: poetObj?.nameUrdu || finalPoet,
      category: category,
      categoryUrdu: catObj?.nameUrdu || category,
      type: poemType,
      romanUrdu: romanUrdu.trim() || undefined,
      englishMeaning: englishMeaning.trim() || undefined,
      likes: 1,
      liked: true,
      bookmarked: true,
      views: 1,
      comments: [
        {
          id: `c-user-${Date.now()}`,
          author: "آپ (You)",
          text: "مجموعہ میں شامل کیا گیا!",
          timestamp: "ابھی ابھی"
        }
      ]
    };

    onAddPoem(newPoem);
    onClose();
    // reset form
    setVerseText('');
    setCustomPoet('');
    setRomanUrdu('');
    setEnglishMeaning('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn" dir="rtl">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-emerald-50/50 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-urdu text-xl font-bold text-stone-900 dark:text-stone-100">
              اپنی پسندیدہ شاعری شامل کریں
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Verse Text Area */}
          <div>
            <label className="block font-urdu text-base font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
              شعر یا غزل کے اشعار <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={verseText}
              onChange={(e) => setVerseText(e.target.value)}
              placeholder="یہاں اشعار درج کریں، ہر سطر الگ لائن پر لکھیں..."
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl p-4 font-urdu text-xl leading-loose focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
              dir="rtl"
            />
            <p className="text-xs text-stone-400 mt-1 font-latin text-right">
              Tip: Enter one misra per line for optimal Nastaliq alignment.
            </p>
          </div>

          {/* Poet Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-urdu text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1">
                شاعر کا انتخاب
              </label>
              <select
                value={poetName}
                onChange={(e) => setPoetName(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 font-urdu text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800 dark:text-stone-200"
              >
                {Object.keys(POET_PROFILES).map((p) => (
                  <option key={p} value={p}>
                    {POET_PROFILES[p].nameUrdu} ({p})
                  </option>
                ))}
                <option value="Other">کوئی اور شاعر / نامعلوم (Custom)</option>
              </select>
            </div>

            {poetName === 'Other' && (
              <div>
                <label className="block font-urdu text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  شاعر کا نام لکھیں
                </label>
                <input
                  type="text"
                  required
                  value={customPoet}
                  onChange={(e) => setCustomPoet(e.target.value)}
                  placeholder="مثلاً: احمد ندیم قاسمی"
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 font-urdu text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  dir="rtl"
                />
              </div>
            )}

            <div>
              <label className="block font-urdu text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1">
                شاعری کی صنف (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 font-urdu text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800 dark:text-stone-200"
              >
                {CATEGORIES.filter(c => c.id !== 'All').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nameUrdu} ({cat.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type / Line Count */}
          <div>
            <label className="block font-urdu text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1">
              شاعری کی ساخت (Poetry Structure)
            </label>
            <div className="grid grid-cols-3 gap-2 font-latin text-xs">
              {(['2 Lines', '4 Lines', 'Ghazal'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setPoemType(t)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                    poemType === t
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Roman Urdu & English meaning */}
          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800" dir="ltr">
            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1 font-latin">
                Roman Urdu (Optional)
              </label>
              <input
                type="text"
                value={romanUrdu}
                onChange={(e) => setRomanUrdu(e.target.value)}
                placeholder="e.g. Dil-e-nadan tujhe hua kya hai..."
                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-latin focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800 dark:text-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1 font-latin">
                English Meaning / Essence (Optional)
              </label>
              <input
                type="text"
                value={englishMeaning}
                onChange={(e) => setEnglishMeaning(e.target.value)}
                placeholder="Brief translation or poetic meaning..."
                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-latin focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800 dark:text-stone-200"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-urdu cursor-pointer transition-colors"
            >
              منسوخ کریں
            </button>
            <button
              type="submit"
              disabled={!verseText.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-urdu text-base font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>شامل کریں (Publish)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
