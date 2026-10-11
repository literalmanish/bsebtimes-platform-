'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getSubjectChapters, getChapterQuestions, SUBJECTS } from '@/lib/bseb-data';
import { getChapterSubjectiveQuestions } from '@/lib/bseb-subjective-data';
import { getSubjectSyllabusBlueprint } from '@/lib/bseb-syllabus-data';
import { BilingualQuestion, SubjectiveQuestion } from '@/lib/types';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Check, 
  X, 
  CheckCircle, 
  BookOpen, 
  History, 
  Sparkles, 
  Award,
  FileText,
  BarChart3,
  CheckCircle2,
  Copy
} from 'lucide-react';

export default function ChapterPracticePage() {
  const params = useParams();
  const subjectSlug = (params?.subjectSlug as string) || 'class-10-mathematics';
  const chapterId = (params?.chapterId as string) || 'c10-math-ch1';

  const subject = SUBJECTS.find(s => s.slug === subjectSlug) || SUBJECTS[0];
  const chapters = getSubjectChapters(subjectSlug);
  const chapter = chapters.find(c => c.id === chapterId) || chapters[0] || {
    id: chapterId,
    subjectSlug,
    chapterNumber: 1,
    titleHindi: 'वास्तविक संख्याएँ (Real Numbers)',
    titleEnglish: 'Real Numbers',
    summaryHindi: 'यूक्लिड विभाजन प्रमेयिका (a = bq + r), अंकगणित की आधारभूत प्रमेय, अपरिमेय संख्याओं का सत्यापन।',
    summaryEnglish: 'Euclids division lemma and fundamental theorem of arithmetic.',
    keyFormulasOrFacts: [
      'a = bq + r, जहाँ 0 ≤ r < b',
      'HCF(a, b) × LCM(a, b) = a × b'
    ],
    totalQuestions: 40
  };

  const { allPossibleBook, bsebPyq } = getChapterQuestions(chapter.id, subjectSlug);
  const subjectiveQuestions = getChapterSubjectiveQuestions(chapter.id, subjectSlug);
  const blueprint = getSubjectSyllabusBlueprint(subjectSlug);
  const chapterWeightage = blueprint.chapterWeightages.find(w => w.chapterNumber === chapter.chapterNumber);

  const [activeSection, setActiveSection] = useState<'all_possible_book' | 'bseb_pyq' | 'subjective_qa'>('all_possible_book');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [subjectiveFilter, setSubjectiveFilter] = useState<'all' | 'short' | 'long' | 'bseb_pyq' | 'ncert_scert'>('all');
  const [readSubjectiveIds, setReadSubjectiveIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentQuestions: BilingualQuestion[] = activeSection === 'all_possible_book' 
    ? allPossibleBook 
    : bsebPyq;

  const handleSelect = (qId: string, optId: string) => {
    if (submittedAnswers[qId]) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleCheck = (q: BilingualQuestion) => {
    const selected = selectedAnswers[q.id];
    if (!selected) return;

    setSubmittedAnswers(prev => ({ ...prev, [q.id]: true }));
    const isCorrect = selected === q.correctOptionId;

    if (isCorrect) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleToggleReadSubjective = (qId: string) => {
    const nextState = !readSubjectiveIds[qId];
    setReadSubjectiveIds(prev => ({ ...prev, [qId]: nextState }));
    if (nextState) {
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.85 } });
    }
  };

  const handleCopyAnswer = (q: SubjectiveQuestion) => {
    const textToCopy = `प्रश्न: ${q.questionHindi}\n\nउत्तर:\n${q.answerHindi}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Progress counters
  const solvedBookCount = allPossibleBook.filter(q => submittedAnswers[q.id]).length;
  const solvedPyqCount = bsebPyq.filter(q => submittedAnswers[q.id]).length;
  const readSubjectiveCount = subjectiveQuestions.filter(q => readSubjectiveIds[q.id]).length;

  const filteredSubjective = subjectiveQuestions.filter(q => {
    if (subjectiveFilter === 'short' && q.type !== 'short') return false;
    if (subjectiveFilter === 'long' && q.type !== 'long') return false;
    if (subjectiveFilter === 'bseb_pyq' && q.sourceType !== 'bseb_pyq') return false;
    if (subjectiveFilter === 'ncert_scert' && q.sourceType !== 'ncert_scert') return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <Link 
            href={`/subject/${subjectSlug}`} 
            className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center gap-1.5 mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> वापस {subject.titleHindi} अध्याय सूची पर
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              कक्षा {subject.classGrade}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs font-semibold text-stone-500">
              अध्याय {chapter.chapterNumber}
            </span>
            {chapterWeightage && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                अंक वेटेज: ~{chapterWeightage.totalWeightageMarks} अंक
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
            {chapter.titleHindi}
          </h1>
          <p className="text-xs text-stone-400 italic mt-0.5">
            {chapter.titleEnglish}
          </p>
        </div>

        <Link
          href="/omr-simulator"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm transition-all text-center self-start sm:self-center"
        >
          OMR शीट में हल करें
        </Link>
      </div>

      {/* Three-Section Switch Tabs */}
      <div className="bg-stone-100 dark:bg-stone-900 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-2">
        
        {/* Tab 1: Book & Other Board MCQs */}
        <button
          onClick={() => setActiveSection('all_possible_book')}
          className={`flex items-center justify-between p-3.5 rounded-xl text-left transition-all ${
            activeSection === 'all_possible_book'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${
              activeSection === 'all_possible_book'
                ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm">
                  सेक्शन 1: बुक व अन्य बोर्ड प्रश्न
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {allPossibleBook.length}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                NCERT पंक्तियाँ + अन्य राज्य बोर्ड संभावित
              </p>
            </div>
          </div>
        </button>

        {/* Tab 2: BSEB PYQ MCQs */}
        <button
          onClick={() => setActiveSection('bseb_pyq')}
          className={`flex items-center justify-between p-3.5 rounded-xl text-left transition-all ${
            activeSection === 'bseb_pyq'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${
              activeSection === 'bseb_pyq'
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
            }`}>
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm">
                  सेक्शन 2: BSEB PYQs (2015-2025)
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {bsebPyq.length}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                बिहार बोर्ड परीक्षा में पूछे गए OMR प्रश्न
              </p>
            </div>
          </div>
        </button>

        {/* Tab 3: Subjective Q&A (Reading Mode) */}
        <button
          onClick={() => setActiveSection('subjective_qa')}
          className={`flex items-center justify-between p-3.5 rounded-xl text-left transition-all ${
            activeSection === 'subjective_qa'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${
              activeSection === 'subjective_qa'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm">
                  सेक्शन 3: विषयनिष्ठ प्रश्नोत्तर (Q&A)
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {subjectiveQuestions.length}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                2 अंक व 5 अंक NCERT/SCERT व PYQ मॉडल उत्तर
              </p>
            </div>
          </div>
        </button>

      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Revision Summary, Marks Weightage & Key Facts (5 cols) */}
        <div className="lg:col-span-5 space-y-5 sticky lg:top-24">
          
          {/* Progress Card */}
          <div className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" /> तैयारी प्रगति (Progress Tracker)
              </span>
              <span>
                {Math.round(((solvedBookCount + solvedPyqCount + readSubjectiveCount) / (allPossibleBook.length + bsebPyq.length + subjectiveQuestions.length || 1)) * 100)}%
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-stone-600 dark:text-stone-300">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" /> पाठ्यपुस्तक MCQs:
                </span>
                <span className="font-bold">{solvedBookCount} / {allPossibleBook.length}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${(solvedBookCount / (allPossibleBook.length || 1)) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-stone-600 dark:text-stone-300 pt-1">
                <span className="flex items-center gap-1">
                  <History className="w-3.5 h-3.5 text-amber-500" /> BSEB PYQ MCQs:
                </span>
                <span className="font-bold">{solvedPyqCount} / {bsebPyq.length}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${(solvedPyqCount / (bsebPyq.length || 1)) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-stone-600 dark:text-stone-300 pt-1">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" /> विषयनिष्ठ प्रश्नोत्तर पढ़े गए:
                </span>
                <span className="font-bold">{readSubjectiveCount} / {subjectiveQuestions.length}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${(readSubjectiveCount / (subjectiveQuestions.length || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Chapter Marks Weightage Card */}
          {chapterWeightage && (
            <div className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" /> इस अध्याय का परीक्षा वेटेज
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  कुल ~{chapterWeightage.totalWeightageMarks} अंक
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                  <div className="text-[10px] text-stone-400">वस्तुनिष्ठ (MCQ)</div>
                  <div className="font-bold text-amber-600 dark:text-amber-400 mt-0.5">~{chapterWeightage.objectiveMarks} अंक</div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                  <div className="text-[10px] text-stone-400">लघु (2 अंक)</div>
                  <div className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">~{chapterWeightage.shortAnswerMarks} अंक</div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                  <div className="text-[10px] text-stone-400">दीर्घ (5 अंक)</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {chapterWeightage.longAnswerMarks > 0 ? `~${chapterWeightage.longAnswerMarks} अंक` : '0 अंक'}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                <span className="text-[11px] font-bold text-stone-500">महत्वपूर्ण परीक्षा बिंदु:</span>
                <ul className="mt-1.5 space-y-1">
                  {chapterWeightage.importantTopics.map((top, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-stone-600 dark:text-stone-300 text-[11px]">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Chapter Summary Notes */}
          <div className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                अध्याय सारांश (Chapter Notes)
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
                मुख्य बिंदु (Key Concepts)
              </h3>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serif whitespace-pre-line">
                {chapter.summaryHindi}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-stone-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> परीक्षा उपयोगी सूत्र एवं तथ्य
              </h4>
              <ul className="space-y-2.5">
                {chapter.keyFormulasOrFacts.map((fact, idx) => (
                  <li key={idx} className="text-xs text-stone-600 dark:text-stone-300 flex items-start gap-2 bg-stone-50 dark:bg-stone-900 p-2.5 rounded-xl border border-stone-100 dark:border-stone-800">
                    <span className="font-mono text-amber-600 font-bold">#{idx + 1}</span>
                    <span className="leading-snug">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column: Questions Area (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* VIEW A: MCQs PRACTICE (Section 1 or Section 2) */}
          {activeSection !== 'subjective_qa' && (
            <div className="space-y-6">
              
              {/* Section Sub-banner */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-white">
                    {activeSection === 'all_possible_book'
                      ? '📖 पाठ्यपुस्तक व अन्य बोर्ड वस्तुनिष्ठ प्रश्न'
                      : '🏛️ बिहार बोर्ड पिछले 10 वर्षों के PYQs (2015-2025)'}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {activeSection === 'all_possible_book'
                      ? 'NCERT/SCERT की प्रत्येक पंक्ति व अन्य बोर्ड में पूछे गए प्रश्न'
                      : 'बिहार विद्यालय परीक्षा समिति द्वारा वार्षिक परीक्षाओं में पूछे गए वास्तविक प्रश्न'}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 shrink-0">
                  {currentQuestions.length} प्रश्न
                </span>
              </div>

              {/* Questions List */}
              {currentQuestions.map((q, qIndex) => {
                const isSubmitted = submittedAnswers[q.id];
                const selectedOpt = selectedAnswers[q.id];

                return (
                  <div 
                    key={q.id}
                    className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-5 hover:border-amber-400/40 transition-all"
                  >
                    {/* Question Header & Source Tag */}
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                        प्रश्न {qIndex + 1} of {currentQuestions.length}
                      </span>
                      {q.sourceTag && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                          {q.sourceTag}
                        </span>
                      )}
                    </div>

                    {/* Question Text */}
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-snug">
                        {q.questionHindi}
                      </h3>
                      {q.questionEnglish && (
                        <p className="text-xs text-stone-400 italic">
                          {q.questionEnglish}
                        </p>
                      )}
                    </div>

                    {/* 4 Options */}
                    <div className="space-y-2.5">
                      {q.options.map((opt) => {
                        const isSelected = selectedOpt === opt.id;
                        const isCorrect = opt.id === q.correctOptionId;

                        let optionStyle = 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900';

                        if (isSubmitted) {
                          if (isCorrect) {
                            optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100';
                          }
                        } else if (isSelected) {
                          optionStyle = 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100 ring-1 ring-amber-500';
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={isSubmitted}
                            onClick={() => handleSelect(q.id, opt.id)}
                            className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between transition-all ${optionStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border shrink-0 ${
                                isSelected 
                                  ? 'border-amber-500 bg-amber-500 text-stone-950' 
                                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                              }`}>
                                {opt.id}
                              </span>
                              <span>{opt.textHindi}</span>
                            </div>

                            {isSubmitted && isCorrect && (
                              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isSubmitted && isSelected && !isCorrect && (
                              <X className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit / Check Action */}
                    {!isSubmitted ? (
                      <div className="pt-2 flex justify-end">
                        <button
                          disabled={!selectedOpt}
                          onClick={() => handleCheck(q)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold text-xs shadow-sm transition-all"
                        >
                          उत्तर जांचें (Check Answer)
                        </button>
                      </div>
                    ) : (
                      /* Bilingual Explanation */
                      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                          <CheckCircle className="w-3.5 h-3.5" /> सही उत्तर: {q.correctOptionId} · व्याख्या (Explanation):
                        </div>
                        <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
                          {q.explanationHindi}
                        </p>
                        {q.explanationEnglish && (
                          <p className="text-[11px] text-stone-400 italic">
                            {q.explanationEnglish}
                          </p>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          )}

          {/* VIEW B: SUBJECTIVE Q&A READING MODE */}
          {activeSection === 'subjective_qa' && (
            <div className="space-y-6">
              
              {/* Filter Pills for Subjective */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setSubjectiveFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      subjectiveFilter === 'all'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    सभी ({subjectiveQuestions.length})
                  </button>
                  <button
                    onClick={() => setSubjectiveFilter('short')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      subjectiveFilter === 'short'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    2 अंक लघु-उत्तरीय
                  </button>
                  <button
                    onClick={() => setSubjectiveFilter('long')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      subjectiveFilter === 'long'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    5 अंक दीर्घ-उत्तरीय
                  </button>
                  <button
                    onClick={() => setSubjectiveFilter('bseb_pyq')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      subjectiveFilter === 'bseb_pyq'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    BSEB PYQ
                  </button>
                  <button
                    onClick={() => setSubjectiveFilter('ncert_scert')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      subjectiveFilter === 'ncert_scert'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    NCERT अभ्यास
                  </button>
                </div>

                <span className="text-xs font-semibold text-stone-500">
                  {readSubjectiveCount} / {subjectiveQuestions.length} पढ़े गए
                </span>
              </div>

              {/* Subjective Cards */}
              <div className="space-y-5">
                {filteredSubjective.map((q, idx) => {
                  const isRead = readSubjectiveIds[q.id];
                  const isCopied = copiedId === q.id;

                  return (
                    <div
                      key={q.id}
                      className={`bg-white dark:bg-[#14171d] rounded-2xl border transition-all p-6 shadow-sm space-y-4 ${
                        isRead 
                          ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/10' 
                          : 'border-stone-200 dark:border-stone-800 hover:border-amber-400/60'
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-stone-400">
                            Q.{idx + 1}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            {q.marks} अंक · {q.type === 'short' ? 'लघु-उत्तरीय' : 'दीर्घ-उत्तरीय'}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                            {q.sourceTag}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyAnswer(q)}
                            className="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-amber-600 text-xs transition-colors flex items-center gap-1"
                            title="उत्तर कॉपी करें"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            {isCopied && <span className="text-[10px] text-emerald-600 font-bold">कॉपी हुआ!</span>}
                          </button>
                          <button
                            onClick={() => handleToggleReadSubjective(q.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                              isRead
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                            }`}
                          >
                            <CheckCircle2 className={`w-3.5 h-3.5 ${isRead ? 'text-emerald-600' : 'text-stone-400'}`} />
                            {isRead ? 'पढ़ा गया (Done)' : 'पढ़ने के बाद मार्क करें'}
                          </button>
                        </div>
                      </div>

                      {/* Question */}
                      <div>
                        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white leading-snug">
                          {q.questionHindi}
                        </h3>
                        {q.questionEnglish && (
                          <p className="text-xs text-stone-400 italic mt-1">
                            {q.questionEnglish}
                          </p>
                        )}
                      </div>

                      {/* Step-by-Step Model Answer */}
                      <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/70 space-y-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          <Sparkles className="w-3.5 h-3.5" /> मॉडल उत्तर (Step-by-Step BSEB Model Answer):
                        </div>
                        <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-serif leading-relaxed whitespace-pre-line">
                          {q.answerHindi}
                        </div>
                      </div>

                      {/* Key Topper Points & Marking Scheme */}
                      {(q.keyPoints || q.markingScheme) && (
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800/80">
                          {q.keyPoints && q.keyPoints.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-amber-600 dark:text-amber-400">टॉपर टिप्स:</span>
                              <span className="text-stone-600 dark:text-stone-300">{q.keyPoints.join(' • ')}</span>
                            </div>
                          )}
                          {q.markingScheme && (
                            <div className="sm:text-right shrink-0">
                              <span className="font-semibold text-stone-400">मार्किंग स्कीम: </span>
                              <span className="font-mono text-stone-600 dark:text-stone-300">{q.markingScheme}</span>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
