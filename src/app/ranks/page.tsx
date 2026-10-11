'use client';

import { useState } from 'react';
import { LIVE_RANKINGS, BIHAR_DISTRICTS } from '@/lib/bseb-data';
import { ClassGrade, Stream } from '@/lib/types';
import { 
  Trophy, 
  MapPin, 
  Medal, 
  Filter
} from 'lucide-react';

export default function RanksLeaderboardPage() {
  const [selectedClass, setSelectedClass] = useState<ClassGrade | 'ALL'>('ALL');
  const [selectedStream, setSelectedStream] = useState<Stream | 'ALL'>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedBlock, setSelectedBlock] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'state' | 'district' | 'block'>('state');

  // Filtered blocks according to selected district
  const currentDistrictObj = BIHAR_DISTRICTS.find(d => d.nameEnglish.toLowerCase() === selectedDistrict.toLowerCase());
  const availableBlocks = currentDistrictObj ? currentDistrictObj.blocks : [];

  const filteredRankings = LIVE_RANKINGS.filter(r => {
    if (selectedClass !== 'ALL' && r.classGrade !== selectedClass) return false;
    if (selectedStream !== 'ALL' && r.stream !== selectedStream) return false;
    if (selectedDistrict !== 'ALL' && r.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    if (selectedBlock !== 'ALL' && r.block.toLowerCase() !== selectedBlock.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-black text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            बिहार बोर्ड लाइव रैंकिंग सिस्टम
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            BSEB Topper Leaderboard
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            राज्य, जिला एवं प्रखंड स्तर पर बिहार बोर्ड 10वीं व 12वीं के छात्रों की आधिकारिक रैंकिंग व मेरिट सूची। अपना रोल कोड एवं मार्क्स डालकर अपनी लाइव रैंक देखें।
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveTab('state'); setSelectedDistrict('ALL'); setSelectedBlock('ALL'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'state'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              🏆 राज्य स्तर रैंक (State Rank)
            </button>
            <button
              onClick={() => { setActiveTab('district'); if (selectedDistrict === 'ALL') setSelectedDistrict('Patna'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'district'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              📍 जिला स्तर रैंक (District Rank)
            </button>
            <button
              onClick={() => { setActiveTab('block'); if (selectedDistrict === 'ALL') setSelectedDistrict('Patna'); if (selectedBlock === 'ALL') setSelectedBlock('Patna Sadar'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'block'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              🏘️ प्रखंड स्तर रैंक (Block Rank)
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-500" />
            फिल्टर विकल्प (Filters)
          </span>
          <span className="text-xs text-stone-400">
            {filteredRankings.length} छात्र सूचीबद्ध
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Class Filter */}
          <div>
            <label className="text-[11px] font-bold text-stone-500 block mb-1">कक्षा (Class)</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as ClassGrade | 'ALL')}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-medium text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">सभी कक्षाएं (All Classes)</option>
              <option value="10th">10वीं मैट्रिक (Matric)</option>
              <option value="12th">12वीं इंटर (Intermediate)</option>
            </select>
          </div>

          {/* Stream Filter */}
          <div>
            <label className="text-[11px] font-bold text-stone-500 block mb-1">संकाय (Stream)</label>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value as Stream | 'ALL')}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-medium text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">सभी संकाय (All Streams)</option>
              <option value="science">12वीं विज्ञान (Science)</option>
              <option value="arts">12वीं कला (Arts)</option>
              <option value="commerce">12वीं वाणिज्य (Commerce)</option>
              <option value="general10">10वीं सामान्य (Matric)</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="text-[11px] font-bold text-stone-500 block mb-1">जिला (District)</label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedBlock('ALL');
              }}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-medium text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">पूरा बिहार (All 38 Districts)</option>
              {BIHAR_DISTRICTS.map(d => (
                <option key={d.id} value={d.nameEnglish}>{d.nameHindi} ({d.nameEnglish})</option>
              ))}
            </select>
          </div>

          {/* Block Filter */}
          <div>
            <label className="text-[11px] font-bold text-stone-500 block mb-1">प्रखंड (Block)</label>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              disabled={selectedDistrict === 'ALL'}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-medium text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-amber-500 disabled:opacity-40"
            >
              <option value="ALL">सभी प्रखंड (All Blocks)</option>
              {availableBlocks.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Your Estimated Rank Widget */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
            🥇
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white">
              आपकी संभावित रैंक (Your Predicted Rank)
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
              आधार: OMR मॉक टेस्ट स्कोर <strong>462/500 (92.4%)</strong> · 1st Division Bracket
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-center">
          <div className="px-3 py-1 bg-white dark:bg-stone-900 rounded-xl border border-amber-200 dark:border-amber-800/80">
            <div className="text-[10px] text-stone-400">प्रखंड रैंक (Block)</div>
            <div className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono">#2</div>
          </div>
          <div className="px-3 py-1 bg-white dark:bg-stone-900 rounded-xl border border-amber-200 dark:border-amber-800/80">
            <div className="text-[10px] text-stone-400">जिला रैंक (District)</div>
            <div className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono">#14</div>
          </div>
          <div className="px-3 py-1 bg-white dark:bg-stone-900 rounded-xl border border-amber-200 dark:border-amber-800/80">
            <div className="text-[10px] text-stone-400">राज्य रैंक (State)</div>
            <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">#84</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-[#14171d] rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Medal className="w-5 h-5 text-amber-500" />
            मेरिट सूची (Live Rank Board)
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            सत्यापित अंक (Verified Marks)
          </span>
        </div>

        <div className="divide-y divide-stone-200 dark:divide-stone-800">
          {filteredRankings.length === 0 ? (
            <div className="p-8 text-center text-stone-500 text-xs">
              इस फिल्टर के अनुसार कोई छात्र नहीं मिला। कृपया दूसरा जिला या प्रखंड चुनें।
            </div>
          ) : (
            filteredRankings.map((r, idx) => (
              <div
                key={r.id}
                className="p-5 hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Rank Badge & Student Details */}
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-serif text-lg font-bold shrink-0 ${
                    idx === 0
                      ? 'bg-amber-400 text-stone-950 shadow-md'
                      : idx === 1
                        ? 'bg-stone-300 text-stone-800 shadow-sm'
                        : idx === 2
                          ? 'bg-amber-700 text-white shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}>
                    {idx + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-serif text-base font-bold text-stone-900 dark:text-white">
                        {r.studentName}
                      </span>
                      <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                        रोल: {r.rollCode}-{r.rollNumber}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {r.schoolName}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-stone-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <strong>{r.district}</strong> · {r.block}
                      </span>
                      <span>•</span>
                      <span>कक्षा: <strong>{r.classGrade} ({r.stream.toUpperCase()})</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right: Scores & Multi-Tier Rank Badges */}
                <div className="flex items-center sm:items-end flex-col gap-2 shrink-0">
                  <div className="text-right">
                    <div className="text-2xl font-bold font-serif text-stone-900 dark:text-white">
                      {r.score} <span className="text-xs font-sans text-stone-400">/ 500</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {r.percentage}% · {r.division}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      State AIR #{r.stateRank}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                      Dist #{r.districtRank}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                      Block #{r.blockRank}
                    </span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
