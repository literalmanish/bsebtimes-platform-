'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SUBJECTS } from '@/lib/bseb-data';
import { Stream, ClassGrade } from '@/lib/types';
import { 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  ChevronDown,
  BookOpen,
  Languages
} from 'lucide-react';

export default function HomePage() {
  const [activeStreamTab, setActiveStreamTab] = useState<{ grade: ClassGrade; stream: Stream }>({
    grade: '10th',
    stream: 'general10',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredSubjects = SUBJECTS.filter(s => {
    if (activeStreamTab.grade === '10th') {
      return s.classGrade === '10th';
    }
    return s.classGrade === '12th' && s.stream === activeStreamTab.stream;
  });

  const coreSubjects = filteredSubjects.filter(s => !s.isLanguage);
  const languageSubjects = filteredSubjects.filter(s => s.isLanguage);

  const faqs = [
    {
      q: "BSEBTimes पर OMR शीट टेस्ट कैसे काम करता है?",
      a: "बिहार बोर्ड की परीक्षा में 100 वस्तुनिष्ठ प्रश्न दिए जाते हैं जिनमें से किसी भी 50 का उत्तर देना होता है (प्रैक्टिकल विषयों में 70 में से 35)। BSEBTimes पर आप असली परीक्षा की तरह स्क्रीन पर गोला (bubble) भरकर अभ्यास कर सकते हैं। 50 से अधिक गोला भरने पर सिस्टम आपको तुरंत अलर्ट करता है।"
    },
    {
      q: "जिला एवं प्रखंड स्तर की रैंक कैसे तय होती है?",
      a: "छात्र अपने जिले और प्रखंड (Block) का चयन करते हैं। जब वे मॉक टेस्ट और OMR अभ्यास पूरा करते हैं, तो उनके अंकों के आधार पर राज्य, जिला एवं उनके स्थानीय प्रखंड में उनकी लाइव रैंक प्रदर्शित की जाती है।"
    },
    {
      q: "क्या सभी प्रश्न बिहार बोर्ड के नवीनतम पैटर्न और NCERT/SCERT पर आधारित हैं?",
      a: "हाँ, सभी वस्तुनिष्ठ एवं लघु-उत्तरीय प्रश्न बिहार विद्यालय परीक्षा समिति (BSEB) के आधिकारिक मॉडल पेपर, सेंट-अप परीक्षा और पिछले 10 वर्षों के PYQs (2015-2025) पर आधारित हैं।"
    },
    {
      q: "12वीं के तीनों संकाय (Science, Arts, Commerce) उपलब्ध हैं?",
      a: "हाँ, 12वीं के विज्ञान (भौतिकी, रसायन, जीवविज्ञान, गणित), कला (इतिहास, राजनीति शास्त्र, भूगोल) एवं वाणिज्य (अकाउंटेंसी, बिजनेस स्टडीज, उद्यमिता) के सभी विषय हिंदी व अंग्रेजी माध्यम में उपलब्ध हैं।"
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 px-4 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          बिहार बोर्ड 10वीं व 12वीं · सभी संकाय
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 dark:text-white leading-[1.15] mb-6">
          हर पेज से अभ्यास,<br />
          <span className="text-amber-500 underline decoration-amber-300/40">
            बनेगी 1st Division पक्की।
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed mb-8">
          बिहार विद्यालय परीक्षा समिति (BSEB) के लिए 50/100 OMR शीट सिम्युलेटर, पिछले 10 वर्षों का क्वेश्चन बैंक एवं राज्य, जिला व प्रखंड स्तर की लाइव रैंकिंग।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/omr-simulator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
          >
            50/100 OMR टेस्ट शुरू करें
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/ranks"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-base transition-colors"
          >
            🏆 जिला व प्रखंड रैंक देखें
          </Link>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-3 divide-x divide-stone-200 dark:divide-stone-800 max-w-xl mx-auto py-4 px-2 bg-stone-100/70 dark:bg-stone-900/60 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm">
          <div className="px-2 sm:px-4">
            <div className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">2.45L+</div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">OMR गोले भरे गए</div>
          </div>
          <div className="px-2 sm:px-4">
            <div className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">38</div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">बिहार के सभी जिले</div>
          </div>
          <div className="px-2 sm:px-4 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>96.4%</span>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">1st Division औसत</div>
          </div>
        </div>
      </section>

      {/* 2. CLASS & STREAM SWITCHER + SUBJECT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              पाठ्यक्रम एवं विषय (SYLLABUS & SUBJECTS)
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
              अपनी कक्षा एवं संकाय चुनें
            </h2>
          </div>

          {/* Stream Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-stone-200/80 dark:bg-stone-800/80 flex-wrap">
            <button
              onClick={() => setActiveStreamTab({ grade: '10th', stream: 'general10' })}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeStreamTab.grade === '10th'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              10वीं मैट्रिक
            </button>
            <button
              onClick={() => setActiveStreamTab({ grade: '12th', stream: 'science' })}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeStreamTab.grade === '12th' && activeStreamTab.stream === 'science'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              12वीं विज्ञान (I.Sc)
            </button>
            <button
              onClick={() => setActiveStreamTab({ grade: '12th', stream: 'arts' })}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeStreamTab.grade === '12th' && activeStreamTab.stream === 'arts'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              12वीं कला (I.A)
            </button>
            <button
              onClick={() => setActiveStreamTab({ grade: '12th', stream: 'commerce' })}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeStreamTab.grade === '12th' && activeStreamTab.stream === 'commerce'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              12वीं वाणिज्य (I.Com)
            </button>
          </div>
        </div>

        {/* SUBSECTION 1: CORE STREAM SUBJECTS */}
        <div className="space-y-4 mb-14">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-base">
                🎯
              </span>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                  मुख्य संकाय विषय (Core Stream Subjects)
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {activeStreamTab.grade === '10th'
                    ? 'अनिवार्य मुख्य विषय (गणित, विज्ञान, सामाजिक विज्ञान)'
                    : activeStreamTab.stream === 'science'
                    ? 'विज्ञान संकाय मुख्य विषय (Physics, Chemistry, Biology, Mathematics)'
                    : activeStreamTab.stream === 'arts'
                    ? 'कला संकाय मुख्य विषय (History, Geography, Political Science, Economics, etc.)'
                    : 'वाणिज्य संकाय मुख्य विषय (Accountancy, Business Studies, Economics, Math, EPS, CS, Web Tech)'}
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              {coreSubjects.length} मुख्य विषय
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreSubjects.map((sub) => (
              <div
                key={sub.id}
                className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-sm hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-2xl shadow-inner">
                      {sub.icon}
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      {sub.hasPracticals ? '70 में 35 हल करें' : '100 में 50 हल करें'}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {sub.titleHindi}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {sub.totalChapters} अध्याय · {sub.totalQuestions}+ वस्तुनिष्ठ प्रश्न
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <Link
                    href={`/subject/${sub.slug}`}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    अध्याय सूची देखें →
                  </Link>
                  <Link
                    href="/omr-simulator"
                    className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-amber-500 hover:text-stone-950 text-xs font-semibold transition-colors"
                  >
                    OMR अभ्यास
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUBSECTION 2: DEDICATED LANGUAGE PAPERS SECTION (FOR ALL STREAMS) */}
        {languageSubjects.length > 0 && (
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/70 via-stone-50/50 to-white dark:from-stone-900/80 dark:via-[#14171d] dark:to-stone-950 border-2 border-amber-300/80 dark:border-amber-700/50 shadow-lg shadow-amber-500/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Languages className="w-3.5 h-3.5 text-amber-500" />
                  200 अंक अनिवार्य भाषा पत्र (Language Papers Section)
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                  अनिवार्य एवं अतिरिक्त भाषा पत्र (100-100 अंक)
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
                  बिहार बोर्ड में सभी संकायों ({activeStreamTab.grade === '10th' ? '10वीं मैट्रिक' : activeStreamTab.stream === 'science' ? '12वीं I.Sc' : activeStreamTab.stream === 'arts' ? '12वीं I.A' : '12वीं I.Com'}) के प्रत्येक विद्यार्थी के लिए 200 अंकों का भाषा विषय (हिंदी 100 अंक, अंग्रेजी 100 अंक, उर्दू, संस्कृत अथवा मैथिली) अनिवार्य है। प्रत्येक पत्र में 100 में से 50 OMR प्रश्न हल करने होते हैं।
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-400/30">
                  {languageSubjects.length} भाषा विकल्प उपलब्ध
                </span>
              </div>
            </div>

            {/* Quick highlight bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-xs">
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <span className="text-amber-500 font-bold">✓</span>
                <span><strong>50 OMR प्रश्न:</strong> 100 वस्तुनिष्ठ प्रश्नों में से 50 का चयन</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <span className="text-amber-500 font-bold">✓</span>
                <span><strong>साहित्य + व्याकरण:</strong> गद्य, पद्य एवं संपूर्ण व्याकरण PYQ</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <span className="text-amber-500 font-bold">✓</span>
                <span><strong>200 अंक निर्णायक:</strong> 1st Division और मेरिट के लिए सबसे अहम</span>
              </div>
            </div>

            {/* Language Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {languageSubjects.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white dark:bg-[#181c24] rounded-2xl border-2 border-stone-200/90 dark:border-stone-700/80 hover:border-amber-500 dark:hover:border-amber-400 p-6 flex flex-col justify-between shadow-sm transition-all group hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center text-2xl shadow-inner border border-amber-200/60 dark:border-amber-800/40">
                        {sub.icon}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 shadow-sm">
                          100 अंक अनिवार्य
                        </span>
                        <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">
                          100 में 50 OMR
                        </span>
                      </div>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-stone-900 dark:text-white group-hover:text-amber-500 transition-colors">
                      {sub.titleHindi}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {sub.titleEnglish}
                    </p>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/60 text-xs text-stone-600 dark:text-stone-300">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                        {sub.totalChapters} अध्याय (गद्य + पद्य)
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {sub.totalQuestions}+ प्रश्न
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <Link
                      href={`/subject/${sub.slug}`}
                      className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      अध्याय एवं PYQs देखें →
                    </Link>
                    <Link
                      href="/omr-simulator"
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow transition-colors"
                    >
                      OMR अभ्यास
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 3. MULTI-TIER RANKING SYSTEM PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-black text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-amber-400" />
                त्रि-स्तरीय मेरिट सूची (3-Tier Ranking)
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                अपने प्रखंड, जिले और पूरे बिहार में अपनी रैंक जानें।
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                बिहार के सभी 38 जिलों और 534 प्रखंडों में प्रतिस्पर्धा करें। देखें कि आप अपने ब्लॉक में किस स्थान पर हैं और राज्य के टॉप 10 मेधा सूची में कैसे शामिल हो सकते हैं।
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-amber-400">प्रखंड रैंक</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Block Level</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-amber-400">जिला रैंक</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">District Level</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-emerald-400">राज्य रैंक</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">All-Bihar Top 10</div>
                </div>
              </div>
            </div>

            <div className="bg-stone-900/90 rounded-2xl p-6 border border-stone-700/60 shadow-xl space-y-4 text-center">
              <h3 className="font-serif text-xl font-bold">
                अपनी रैंक अभी चेक करें
              </h3>
              <p className="text-xs text-stone-400">
                पटना, गया, मुजफ्फरपुर सहित बिहार के 38 जिलों की सूची लाइव है।
              </p>
              <Link
                href="/ranks"
                className="w-full block py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors"
              >
                लीडरबोर्ड खोलें (Open Ranks)
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. KEY FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white dark:bg-[#14171d] rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-lg">
                ⭕
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                BSEB OMR शीट सिम्युलेटर
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                स्क्रीन पर असली ओएमआर शीट की तरह गोलों को भरें। 50 प्रश्नों की सीमा और तुरंत मूल्यांकन के साथ 1st Division परिणाम प्राप्त करें।
              </p>
            </div>
            <Link href="/omr-simulator" className="text-xs font-bold text-amber-600 hover:underline pt-2">
              OMR टेस्ट दें →
            </Link>
          </div>

          <div className="bg-white dark:bg-[#14171d] rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-lg">
                📄
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                आधिकारिक मॉडल पेपर 2026
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                बिहार बोर्ड के नवीनतम सेंट-अप और एनुअल मॉडल पेपर्स। हल सहित पीडीएफ एवं ऑनलाइन टेस्ट मोड।
              </p>
            </div>
            <Link href="/model-papers" className="text-xs font-bold text-blue-600 hover:underline pt-2">
              मॉडल पेपर देखें →
            </Link>
          </div>

          <div className="bg-white dark:bg-[#14171d] rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-lg">
                🎓
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                सिमुलतला व बोर्ड टॉपर्स 1:1
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                बिहार बोर्ड में राज्य रैंक 1 हासिल करने वाले टॉपर्स से सीधे सीखें कि कॉपी कैसे लिखें और 450+ अंक कैसे लाएं।
              </p>
            </div>
            <Link href="/toppers" className="text-xs font-bold text-emerald-600 hover:underline pt-2">
              टॉपर से गाइडेंस लें →
            </Link>
          </div>

        </div>
      </section>

      {/* 5. FAQS */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white text-center mb-8">
          अक्सर पूछे जाने वाले प्रश्न (FAQ)
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-[#14171d] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-sm text-stone-900 dark:text-stone-100"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 border-t border-stone-100 dark:border-stone-800 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
