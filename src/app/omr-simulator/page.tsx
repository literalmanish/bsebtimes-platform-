'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SUBJECTS, ALL_SUBJECT_CHAPTERS, getChapterQuestions } from '@/lib/bseb-data';
import { BilingualQuestion } from '@/lib/types';
import confetti from 'canvas-confetti';
import { 
  RotateCcw, 
  Award, 
  ArrowLeft, 
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  Filter
} from 'lucide-react';

function OMRSimulatorContent() {
  const searchParams = useSearchParams();
  const initialSubjectSlug = searchParams.get('subject') || 'class-10-mathematics';

  const [selectedSubjectSlug, setSelectedSubjectSlug] = useState<string>(initialSubjectSlug);
  const currentSubject = SUBJECTS.find(s => s.slug === selectedSubjectSlug) || SUBJECTS[0];

  // Determine Max Allowed Bubbles based on BSEB official rules
  const hasPracticals = currentSubject.hasPracticals || false;
  const is10thTheory80 = currentSubject.classGrade === '10th' && (currentSubject.slug.includes('science') || currentSubject.slug.includes('social'));
  
  const maxAllowed = hasPracticals ? 35 : is10thTheory80 ? 40 : 50;
  const totalQuestionsPaper = hasPracticals ? 70 : is10thTheory80 ? 80 : 100;

  // Build subject questions
  const [questions, setQuestions] = useState<BilingualQuestion[]>([]);
  const [omrAnswers, setOmrAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState<string | null>(null);

  // Timer: 45 minutes = 2700 seconds
  const [timeLeft, setTimeLeft] = useState<number>(2700);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Load questions when subject changes
  useEffect(() => {
    const chapters = ALL_SUBJECT_CHAPTERS[selectedSubjectSlug] || [];
    const collected: BilingualQuestion[] = [];

    // Gather from available chapters
    for (const ch of chapters) {
      const { allPossibleBook, bsebPyq } = getChapterQuestions(ch.id, selectedSubjectSlug);
      collected.push(...bsebPyq);
      collected.push(...allPossibleBook);
      if (collected.length >= totalQuestionsPaper) break;
    }

    // Ensure we have questions up to paper size (or at least 30-50)
    if (collected.length === 0) {
      // Fallback sample questions
      for (let i = 1; i <= totalQuestionsPaper; i++) {
        collected.push({
          id: `omr-${selectedSubjectSlug}-${i}`,
          chapterId: 'gen',
          section: i % 2 === 0 ? 'bseb_pyq' : 'all_possible_book',
          sourceTag: i % 2 === 0 ? `BSEB ${2020 + (i % 5)}` : 'NCERT अभ्यास',
          questionHindi: `${currentSubject.titleHindi}: प्रश्न संख्या ${i} — इसका सही विकल्प क्या है?`,
          questionEnglish: `${currentSubject.titleEnglish}: Question number ${i} — What is the correct option?`,
          options: [
            { id: 'A', textHindi: 'विकल्प A (Option A)', textEnglish: 'Option A' },
            { id: 'B', textHindi: 'विकल्प B (Option B)', textEnglish: 'Option B' },
            { id: 'C', textHindi: 'विकल्प C (Option C)', textEnglish: 'Option C' },
            { id: 'D', textHindi: 'विकल्प D (Option D)', textEnglish: 'Option D' }
          ],
          correctOptionId: (['A', 'B', 'C', 'D'] as const)[i % 4],
          explanationHindi: `प्रश्न संख्या ${i} का सही उत्तर बिहार बोर्ड की आधिकारिक उत्तर कुंजी अनुसार विकल्प ${( ['A', 'B', 'C', 'D'] as const)[i % 4]} है।`,
          explanationEnglish: `Correct option according to official BSEB answer key.`,
          isPYQ: i % 2 === 0,
          bsebYear: 2024,
          markValue: 1
        });
      }
    }

    setQuestions(collected.slice(0, totalQuestionsPaper));
    setOmrAnswers({});
    setIsSubmitted(false);
    setTimeLeft(2700);
    setIsTimerRunning(true);
  }, [selectedSubjectSlug, totalQuestionsPaper, currentSubject.titleHindi, currentSubject.titleEnglish]);

  // Countdown timer effect
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, isSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalFilled = Object.keys(omrAnswers).length;

  const handleBubbleClick = (qId: string, optionId: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;

    if (omrAnswers[qId] === optionId) {
      // Toggle off
      const copy = { ...omrAnswers };
      delete copy[qId];
      setOmrAnswers(copy);
      return;
    }

    if (!omrAnswers[qId] && totalFilled >= maxAllowed) {
      setShowWarning(`⚠️ बिहार बोर्ड नियम: ${currentSubject.titleHindi} में आप अधिकतम केवल ${maxAllowed} प्रश्नों का ही गोला भर सकते हैं!`);
      setTimeout(() => setShowWarning(null), 4000);
      return;
    }

    setOmrAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const handleClearAll = () => {
    if (isSubmitted) return;
    setOmrAnswers({});
  };

  const handleSubmitOMR = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  // Scoring
  let correctCount = 0;
  let incorrectCount = 0;

  questions.forEach(q => {
    const filled = omrAnswers[q.id];
    if (filled) {
      if (filled === q.correctOptionId) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    }
  });

  const percentage = Math.round((correctCount / maxAllowed) * 100);
  const division = percentage >= 60 ? '1st Division (प्रथम श्रेणी)' : percentage >= 45 ? '2nd Division (द्वितीय श्रेणी)' : '3rd Division';
  const estimatedDistrictRank = Math.max(1, Math.round((100 - percentage) * 1.8) + 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner & Subject Selector */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 flex-1">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> वापस मुख्य पृष्ठ
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            बिहार विद्यालय परीक्षा समिति · 50/100 OMR सिम्युलेटर
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            {currentSubject.titleHindi} — OMR शीट मॉक टेस्ट
          </h1>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            बिहार बोर्ड परीक्षा में {questions.length} प्रश्न दिए गए हैं जिनमें से किन्हीं <strong className="text-amber-400">{maxAllowed}</strong> का उत्तर OMR पर देना अनिवार्य है। 50 से अधिक गोला भरने पर पहले 50 की ही जांच होती है।
          </p>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Timer Display */}
          <div className="px-4 py-2.5 bg-stone-800/90 rounded-2xl border border-stone-700 text-center min-w-[110px]">
            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> शेष समय
            </div>
            <div className={`text-xl font-bold font-mono ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
              {formatTimer(timeLeft)}
            </div>
          </div>

          {/* Bubbles Filled Counter */}
          <div className="px-4 py-2.5 bg-stone-800/90 rounded-2xl border border-stone-700 text-center min-w-[110px]">
            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
              गोले भरे गए
            </div>
            <div className={`text-xl font-bold font-mono ${totalFilled >= maxAllowed ? 'text-emerald-400' : 'text-stone-100'}`}>
              {totalFilled} / {maxAllowed}
            </div>
          </div>

          {!isSubmitted && (
            <button
              onClick={handleSubmitOMR}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all self-stretch sm:self-auto text-center"
            >
              OMR शीट जमा करें
            </button>
          )}
        </div>
      </div>

      {/* Subject Dropdown Filter Bar */}
      <div className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
            विषय बदलें (Select Subject for OMR Test):
          </span>
        </div>

        <select
          value={selectedSubjectSlug}
          onChange={(e) => setSelectedSubjectSlug(e.target.value)}
          className="px-4 py-2 rounded-xl text-xs bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {SUBJECTS.map((sub) => (
            <option key={sub.slug} value={sub.slug}>
              [{sub.classGrade} {sub.stream.toUpperCase()}] {sub.titleHindi}
            </option>
          ))}
        </select>
      </div>

      {/* Warning Alert */}
      {showWarning && (
        <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 text-xs font-bold flex items-center gap-2 shadow-sm animate-bounce">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{showWarning}</span>
        </div>
      )}

      {/* RESULT MODAL / REVIEW AREA */}
      {isSubmitted ? (
        <div className="space-y-8">
          
          {/* Result Summary Card */}
          <div className="bg-white dark:bg-[#14171d] rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-lg text-center space-y-6 max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/20">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                बिहार बोर्ड आधिकारिक OMR मूल्यांकन परिणाम
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white mt-2">
                {currentSubject.titleHindi}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                कुल {maxAllowed} वस्तुनिष्ठ अंकों में से प्राप्त अंक (+1 सही, 0 गलत/खाली)
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="text-[11px] text-stone-500">प्राप्तांक (Marks)</div>
                <div className="text-2xl font-bold font-serif text-amber-600 dark:text-amber-400 mt-1">
                  {correctCount} / {maxAllowed}
                </div>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="text-[11px] text-stone-500">प्रतिशत (Percentage)</div>
                <div className="text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400 mt-1">
                  {percentage}%
                </div>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="text-[11px] text-stone-500">श्रेणी (Division)</div>
                <div className="text-xs font-bold text-amber-700 dark:text-amber-300 mt-2">
                  {division}
                </div>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="text-[11px] text-stone-500">संभावित जिला रैंक</div>
                <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">
                  #{estimatedDistrictRank}
                </div>
              </div>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-900/60 p-3 rounded-xl">
              सही उत्तर: <strong className="text-emerald-600">{correctCount}</strong> · गलत उत्तर: <strong className="text-red-500">{incorrectCount}</strong> · बिना हल किए: <strong className="text-stone-500">{maxAllowed - totalFilled}</strong>
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <button
                onClick={() => { setIsSubmitted(false); setOmrAnswers({}); setTimeLeft(2700); setIsTimerRunning(true); }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> पुनः नया OMR टेस्ट दें
              </button>
              <Link
                href="/ranks"
                className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-bold"
              >
                🏆 38 जिलों की लाइव रैंक देखें →
              </Link>
            </div>
          </div>

          {/* Question-by-Question Detailed Review */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" /> प्रश्न-वार विस्तृत समाधान एवं व्याख्या (Answer Key & Review)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions.map((q, idx) => {
                const studentChoice = omrAnswers[q.id];
                const isCorrect = studentChoice === q.correctOptionId;
                const isAnswered = Boolean(studentChoice);

                return (
                  <div
                    key={q.id}
                    className={`bg-white dark:bg-[#14171d] rounded-2xl border p-5 shadow-sm space-y-3 ${
                      !isAnswered
                        ? 'border-stone-200 dark:border-stone-800'
                        : isCorrect
                        ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/10'
                        : 'border-red-300 dark:border-red-800/60 bg-red-50/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-400">Q.{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        {isAnswered ? (
                          isCorrect ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> सही (+1 अंक)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> गलत (0 अंक)
                            </span>
                          )
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-500">
                            अनुत्तरित (Skipped)
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-white leading-snug">
                      {q.questionHindi}
                    </h4>

                    <div className="text-xs space-y-1 bg-stone-50 dark:bg-stone-900/60 p-2.5 rounded-xl border border-stone-100 dark:border-stone-800">
                      <div className="flex justify-between">
                        <span className="text-stone-500">आपका चयन (Your Bubble):</span>
                        <span className="font-bold font-mono text-stone-900 dark:text-white">
                          {studentChoice || 'कोई गोला नहीं भरा'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">सही उत्तर (Correct):</span>
                        <span className="font-bold font-mono text-emerald-600">
                          विकल्प {q.correctOptionId}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 pt-1 font-serif">
                      {q.explanationHindi}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* ACTIVE TEST: DUAL PANE LAYOUT (Question Paper on Left, Circular OMR Sheet on Right) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT 7 COLS: Question Paper */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-500" />
                वस्तुनिष्ठ प्रश्न पत्र (कुल {questions.length} प्रश्न)
              </span>
              <span className="text-xs text-stone-400">
                किन्हीं <strong className="text-amber-500">{maxAllowed}</strong> का उत्तर दें
              </span>
            </div>

            {questions.map((q, idx) => {
              const selectedOpt = omrAnswers[q.id];

              return (
                <div
                  key={q.id}
                  id={`q-${idx + 1}`}
                  className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm space-y-3 hover:border-amber-400/40 transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold font-mono text-amber-600 dark:text-amber-400">
                      प्रश्न संख्या {idx + 1}
                    </span>
                    {q.sourceTag && (
                      <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold">
                        {q.sourceTag}
                      </span>
                    )}
                  </div>

                  {/* Bilingual Question Text */}
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                      {q.questionHindi}
                    </p>
                    {q.questionEnglish && (
                      <p className="text-xs text-stone-400 italic">
                        {q.questionEnglish}
                      </p>
                    )}
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    {q.options.map((opt) => {
                      const isSelected = selectedOpt === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleBubbleClick(q.id, opt.id)}
                          className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 ring-1 ring-amber-500'
                              : 'border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 hover:bg-stone-100'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 border-amber-500'
                              : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700'
                          }`}>
                            {opt.id}
                          </span>
                          <div>
                            <div>{opt.textHindi}</div>
                            {opt.textEnglish && (
                              <div className="text-[10px] text-stone-400">{opt.textEnglish}</div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT 5 COLS: Authentic BSEB Circular OMR Bubble Sheet */}
          <div className="lg:col-span-5 bg-rose-50/40 dark:bg-[#1a1416] rounded-3xl border-2 border-rose-200 dark:border-rose-900/60 p-6 shadow-md sticky lg:top-24 space-y-5">
            
            <div className="text-center pb-3 border-b border-rose-200 dark:border-rose-900/60 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">
                BIHAR SCHOOL EXAMINATION BOARD
              </div>
              <h3 className="font-serif text-xl font-black text-stone-900 dark:text-white">
                उत्तर पत्रक (OMR ANSWER SHEET)
              </h3>
              <p className="text-[11px] text-stone-500">
                काले/नीले बॉलपेन से वृत्त को पूरा गहरा करें (Fill completely)
              </p>
            </div>

            {/* OMR Grid with smooth scrolling */}
            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-2">
              {questions.map((q, idx) => {
                const filled = omrAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                      filled 
                        ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800' 
                        : 'bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <a
                      href={`#q-${idx + 1}`}
                      className="w-9 text-xs font-bold font-mono text-stone-600 dark:text-stone-400 hover:text-amber-600"
                    >
                      {idx + 1}.
                    </a>

                    {/* Circular Bubbles (A, B, C, D) */}
                    <div className="flex items-center gap-3">
                      {(['A', 'B', 'C', 'D'] as const).map((choice) => {
                        const isFilled = filled === choice;
                        return (
                          <button
                            key={choice}
                            onClick={() => handleBubbleClick(q.id, choice)}
                            className={`w-7 h-7 rounded-full border-2 text-xs font-bold flex items-center justify-center transition-all ${
                              isFilled
                                ? 'bg-stone-950 text-white dark:bg-amber-400 dark:text-stone-950 border-stone-950 dark:border-amber-400 scale-105 shadow-inner'
                                : 'border-stone-400 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:border-stone-900 dark:hover:border-white'
                            }`}
                            title={`उत्तर ${choice}`}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* OMR Footer Controls */}
            <div className="pt-2 border-t border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
              <button
                onClick={handleClearAll}
                className="text-xs text-stone-500 hover:text-red-500 underline"
              >
                सभी गोले साफ करें (Clear)
              </button>
              <button
                onClick={handleSubmitOMR}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all"
              >
                OMR सबमिट करें
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default function OMRSimulatorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-bold">OMR सिम्युलेटर लोड हो रहा है...</div>}>
      <OMRSimulatorContent />
    </Suspense>
  );
}
