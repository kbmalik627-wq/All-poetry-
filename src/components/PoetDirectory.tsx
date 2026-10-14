import React from 'react';
import { POET_PROFILES, PoetInfo } from '../data/poetryData';
import { Feather, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';

interface PoetDirectoryProps {
  onSelectPoet: (poetName: string) => void;
  selectedPoet: string | null;
}

export const PoetDirectory: React.FC<PoetDirectoryProps> = ({
  onSelectPoet,
  selectedPoet,
}) => {
  const poets = Object.values(POET_PROFILES);

  return (
    <div className="my-8 animate-fadeIn" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-emerald-600" />
            <h2 className="font-urdu text-2xl font-bold text-stone-900 dark:text-stone-100">
              مشاہیرِ اردو شعراء کا گلستان
            </h2>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-latin" dir="ltr">
            Distinguished Masters of Classical & Contemporary Urdu Poetry
          </p>
        </div>

        {selectedPoet && (
          <button
            onClick={() => onSelectPoet('')}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-latin text-stone-700 dark:text-stone-300 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Clear Poet Filter ({selectedPoet})</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {poets.map((poet: PoetInfo) => {
          const isSelected = selectedPoet === poet.name;
          return (
            <div
              key={poet.name}
              onClick={() => onSelectPoet(isSelected ? '' : poet.name)}
              className={`group relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-md'
              }`}
            >
              {/* Header with avatar gradient and names */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${poet.avatarColor} text-white flex items-center justify-center font-bold text-lg font-urdu shadow-sm group-hover:scale-105 transition-transform`}>
                      {poet.nameUrdu.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-urdu text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {poet.nameUrdu}
                      </h3>
                      <p className="text-xs text-stone-400 font-latin" dir="ltr">
                        {poet.name}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-latin font-medium px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200/60 dark:border-stone-700/60">
                    {poet.era}
                  </span>
                </div>

                {/* Poet Title / Laqab */}
                <div className="inline-flex items-center gap-1.5 text-xs font-urdu font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg mb-3">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{poet.title}</span>
                </div>

                {/* Bio text */}
                <p className="text-xs font-urdu leading-relaxed text-stone-600 dark:text-stone-300 mb-4 line-clamp-2">
                  {poet.bio}
                </p>

                {/* Popular sample verse */}
                <div className="bg-stone-50 dark:bg-stone-800/60 p-3 rounded-xl border border-stone-100 dark:border-stone-800 text-center">
                  <p className="font-urdu text-sm text-stone-800 dark:text-stone-200 nastaliq-verse whitespace-pre-line">
                    {poet.popularVerse}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-latin">
                <span className="text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                  {isSelected ? 'Currently Viewing' : 'Explore Poetry'}
                </span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>کلام پڑھیں</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
