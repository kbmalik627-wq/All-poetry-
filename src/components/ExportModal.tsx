import React, { useState, useEffect } from 'react';
import { Poem } from '../data/poetryData';
import { CardTheme, generatePoetryCardImage } from '../utils/imageExport';
import { X, Download, Share2, Sparkles, Check, RefreshCw } from 'lucide-react';

interface ExportModalProps {
  poem: Poem | null;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ poem, onClose }) => {
  const [theme, setTheme] = useState<CardTheme>('emerald');
  const [aspectRatio, setAspectRatio] = useState<'square' | 'story'>('square');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  useEffect(() => {
    if (!poem) return;
    let isCurrent = true;
    setLoading(true);

    generatePoetryCardImage(poem, theme, aspectRatio)
      .then((url) => {
        if (isCurrent) {
          setPreviewUrl(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to generate poetry card image', err);
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [poem, theme, aspectRatio]);

  if (!poem) return null;

  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    const cleanPoet = (poem.poet || 'Poetry').replace(/\s+/g, '_');
    a.download = `KM_DIGITAL_EMPIRE_2_${cleanPoet}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleShare = async () => {
    if (!previewUrl) return;
    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const file = new File([blob], `KM_Digital_Empire_2_${poem.poet}.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `شعر: ${poem.poetUrdu || poem.poet} | KM DIGITAL EMPIRE #2`,
          text: `${poem.text}\n— ${poem.poetUrdu || poem.poet} (KM DIGITAL EMPIRE #2 • ہر لہجے کی اردو شاعری)`
        });
      } else {
        handleDownload();
      }
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn" dir="rtl">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-urdu text-xl font-bold text-stone-900 dark:text-stone-100">
              شاعری کا تصویری کارڈ تیار کریں
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Theme selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 font-latin uppercase tracking-wider text-right">
                کارڈ تھیم (Select Card Theme)
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-urdu font-medium">
                <button
                  type="button"
                  onClick={() => setTheme('emerald')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    theme === 'emerald'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold shadow-sm'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <span>زمردی شاہی (Emerald)</span>
                  <span className="w-4 h-4 rounded-full bg-emerald-800 border border-emerald-500" />
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('midnight')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    theme === 'midnight'
                      ? 'border-sky-500 bg-slate-900 text-sky-400 font-bold shadow-sm'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <span>شبِ سیاہ (Midnight)</span>
                  <span className="w-4 h-4 rounded-full bg-slate-950 border border-sky-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('gold')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    theme === 'gold'
                      ? 'border-amber-500 bg-amber-950/40 text-amber-400 font-bold shadow-sm'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <span>سنہری طلا (Gold)</span>
                  <span className="w-4 h-4 rounded-full bg-amber-900 border border-amber-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('parchment')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    theme === 'parchment'
                      ? 'border-amber-700 bg-amber-50 text-amber-900 font-bold shadow-sm'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <span>قدیم بیاض (Parchment)</span>
                  <span className="w-4 h-4 rounded-full bg-amber-100 border border-amber-800" />
                </button>
              </div>
            </div>

            {/* Ratio selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 font-latin uppercase tracking-wider text-right">
                سائز و تناسب (Format)
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-latin">
                <button
                  type="button"
                  onClick={() => setAspectRatio('square')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    aspectRatio === 'square'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800'
                  }`}
                >
                  <span>1:1 Square (Post)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('story')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    aspectRatio === 'story'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800'
                  }`}
                >
                  <span>9:16 Story / Status</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Render Preview */}
          <div className="flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center gap-3 py-12 text-stone-500">
                <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
                <span className="font-urdu text-sm">کارڈ ڈیزائن ہو رہا ہے...</span>
              </div>
            ) : previewUrl ? (
              <img
                src={previewUrl}
                alt="Poetry Card Preview"
                className={`rounded-xl shadow-xl border border-stone-300/40 object-contain max-h-[360px] transition-all`}
              />
            ) : null}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-stone-50 dark:bg-stone-800/80 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-700 text-sm font-urdu cursor-pointer transition-colors"
          >
            بند کریں
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 hover:bg-white dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-sm font-urdu cursor-pointer transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>شیئر کریں</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-urdu text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{downloaded ? 'ڈاؤنلوڈ مکمل ہوا!' : 'تصویر ڈاؤنلوڈ کریں'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
