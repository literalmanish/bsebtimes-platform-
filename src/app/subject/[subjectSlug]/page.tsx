'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { SUBJECTS, getSubjectChapters } from '@/lib/bseb-data';
import { getSubjectSyllabusBlueprint } from '@/lib/bseb-syllabus-data';
import { getSubjectSubjectiveQuestions } from '@/lib/bseb-subjective-data';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  History, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  Search,
  Sparkles,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function SubjectChaptersPage() {
  const params = useParams();
  const subjectSlug = (params?.subjectSlug as string) || 'class-10-science';

  const subject = SUBJECTS.find(s => s.slug === subjectSlug) || SUBJECTS[0];
  const chapters = getSubjectChapters(subjectSlug);
  const blueprint = getSubjectSyllabusBlueprint(subjectSlug);
  const subjectiveQuestions = getSubjectSubjectiveQuestions(subjectSlug);

  const [activeTab, setActiveTab] = useState<'chapters' | 'syllabus' | 'subjective'>('chapters');
  const [subjectiveFilter, setSubjectiveFilter] = useState<'all' | 'short' | 'long' | 'bseb_pyq' | 'ncert_scert'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readQuestionIds, setReadQuestionIds] = useState<Record<string, boolean>>({});

  const toggleReadStatus = (qId: string) => {
    setReadQuestionIds(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const filteredSubjective = subjectiveQuestions.filter(q => {
    if (subjectiveFilter === 'short' && q.type !== 'short') return false;
    if (subjectiveFilter === 'long' && q.type !== 'long') return false;
    if (subjectiveFilter === 'bseb_pyq' && q.sourceType !== 'bseb_pyq') return false;
    if (subjectiveFilter === 'ncert_scert' && q.sourceType !== 'ncert_scert') return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchHindi = q.questionHindi.toLowerCase().includes(query) || q.answerHindi.toLowerCase().includes(query);
      const matchEnglish = q.questionEnglish.toLowerCase().includes(query);
      if (!matchHindi && !matchEnglish) return false;
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> वापस मुख्य पृष्ठ पर जाएं
      </Link>

      {/* Subject Header Banner */}
      <div className="bg-white dark:bg-[#14171d] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl shadow-inner shrink-0 border border-amber-500/20">
            {subject.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                कक्षा {subject.classGrade} · BSEB बिहार बोर्ड
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {subject.stream.toUpperCase()} संकाय
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                सैद्धांतिक: {blueprint.totalTheoryMarks} अंक {blueprint.totalPracticalMarks > 0 ? `+ प्रायोगिक: ${blueprint.totalPracticalMarks} अंक` : ''}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
              {subject.titleHindi}
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              कुल {chapters.length} अध्याय · वस्तुनिष्ठ OMR प्रश्न + लघु एवं दीर्घ-उत्तरीय विषयनिष्ठ प्रश्नोत्तर (NCERT/SCERT व 2015-2025 PYQs)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('subjective')}
            className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs shadow-sm transition-all text-center flex-1 md:flex-initial"
          >
            📝 विषयनिष्ठ प्रश्नोत्तर पढ़ें
          </button>
          <Link
            href="/omr-simulator"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all text-center flex-1 md:flex-initial"
          >
            50/100 OMR टेस्ट
          </Link>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('chapters')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'chapters'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-500" />
          अध्याय सूची ({chapters.length} अध्याय)
        </button>

        <button
          onClick={() => setActiveTab('syllabus')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'syllabus'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-blue-500" />
          पाठ्यक्रम एवं अध्यायवार अंक विभाजन (Syllabus & Weightage)
        </button>

        <button
          onClick={() => setActiveTab('subjective')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'subjective'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-500" />
          विषयनिष्ठ प्रश्नोत्तर बैंक (Subjective Q&A)
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            {subjectiveQuestions.length}+
          </span>
        </button>
      </div>

      {/* TAB 1: CHAPTERS LIST */}
      {activeTab === 'chapters' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              प्रत्येक अध्याय के दो ऑब्जेक्टिव सेक्शन एवं विषयनिष्ठ प्रश्नोत्तर
            </h2>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-stone-500">
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                <BookOpen className="w-3 h-3" /> बुक व अन्य बोर्ड
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                <History className="w-3 h-3" /> BSEB PYQs
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <FileText className="w-3 h-3" /> विषयनिष्ठ Q&A
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {chapters.map((ch) => {
              const weightage = blueprint.chapterWeightages.find(w => w.chapterNumber === ch.chapterNumber);
              return (
                <div
                  key={ch.id}
                  className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-sm"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                        अध्याय {ch.chapterNumber}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">•</span>
                      <span className="text-xs text-stone-500">
                        {ch.totalQuestions} वस्तुनिष्ठ प्रश्न
                      </span>
                      {weightage && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                          अंक वेटेज: ~{weightage.totalWeightageMarks} अंक ({weightage.objectiveMarks} Obj + {weightage.shortAnswerMarks + weightage.longAnswerMarks} Subj)
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white group-hover:text-amber-500 transition-colors">
                        {ch.titleHindi}
                      </h3>
                      <p className="text-xs text-stone-400 italic">
                        {ch.titleEnglish}
                      </p>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                      {ch.summaryHindi}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/subject/${subjectSlug}/chapter/${ch.id}`}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      अभ्यास एवं Q&A <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SYLLABUS & MARKS DISTRIBUTION BLUEPRINT */}
      {activeTab === 'syllabus' && (
        <div className="space-y-8">
          
          {/* Exam Pattern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Objective Pattern */}
            <div className="bg-white dark:bg-[#14171d] rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
                खंड-अ (Section-A)
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                वस्तुनिष्ठ प्रश्न (OMR Sheet)
              </h3>
              <div className="space-y-1 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>कुल पूछे गए प्रश्न:</span>
                  <span className="font-bold">{blueprint.objectivePattern.totalQuestionsAsked} प्रश्न</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>हल करने हैं:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">किन्हीं {blueprint.objectivePattern.questionsToAttempt} का उत्तर दें</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>कुल अंक:</span>
                  <span className="font-bold text-base text-stone-900 dark:text-white">{blueprint.objectivePattern.totalObjectiveMarks} अंक</span>
                </div>
              </div>
            </div>

            {/* Short Answer Pattern */}
            <div className="bg-white dark:bg-[#14171d] rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold">
                खंड-ब (Section-B · लघु-उत्तरीय)
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                लघु-उत्तरीय प्रश्न (2 Marks Each)
              </h3>
              <div className="space-y-1 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>कुल पूछे गए प्रश्न:</span>
                  <span className="font-bold">{blueprint.shortAnswerPattern.totalQuestionsAsked} प्रश्न</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>हल करने हैं:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">किन्हीं {blueprint.shortAnswerPattern.questionsToAttempt} का उत्तर दें</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>कुल अंक:</span>
                  <span className="font-bold text-base text-stone-900 dark:text-white">{blueprint.shortAnswerPattern.totalShortMarks} अंक</span>
                </div>
              </div>
            </div>

            {/* Long Answer Pattern */}
            <div className="bg-white dark:bg-[#14171d] rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                खंड-ब (Section-B · दीर्घ-उत्तरीय)
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                दीर्घ-उत्तरीय प्रश्न (5 Marks Each)
              </h3>
              <div className="space-y-1 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>कुल पूछे गए प्रश्न:</span>
                  <span className="font-bold">{blueprint.longAnswerPattern.totalQuestionsAsked} प्रश्न</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>हल करने हैं:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">किन्हीं {blueprint.longAnswerPattern.questionsToAttempt} का उत्तर दें</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>कुल अंक:</span>
                  <span className="font-bold text-base text-stone-900 dark:text-white">{blueprint.longAnswerPattern.totalLongMarks} अंक</span>
                </div>
              </div>
            </div>

          </div>

          {/* Time & Instructions Note */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">बिहार बोर्ड परीक्षा अवधि: </span>
              {blueprint.examDuration}। परीक्षार्थी यथासंभव अपने शब्दों में ही उत्तर दें। ओएमआर शीट पर 50 से अधिक गोले न भरें (प्रायोगिक विषय में 35)।
            </div>
          </div>

          {/* Chapter-wise Weightage Table */}
          <div className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                  अध्यायवार अंक विभाजन एवं वेटेज तालिका (Chapter Weightage Blueprint)
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  पिछले 5 वर्षों के प्रश्नपत्रों एवं आधिकारिक मॉडल पेपर पर आधारित अनुमानित अंक विभाजन
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-900/60 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">क्र.</th>
                    <th className="py-3.5 px-4">अध्याय का नाम (Chapter Title)</th>
                    <th className="py-3.5 px-3 text-center">वस्तुनिष्ठ (MCQ)</th>
                    <th className="py-3.5 px-3 text-center">लघु (2 अंक)</th>
                    <th className="py-3.5 px-3 text-center">दीर्घ (5 अंक)</th>
                    <th className="py-3.5 px-4 text-center">कुल वेटेज</th>
                    <th className="py-3.5 px-4">महत्वपूर्ण परीक्षा टॉपिक्स (High-Yield Topics)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {blueprint.chapterWeightages.map((w) => (
                    <tr key={w.chapterNumber} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                      <td className="py-3.5 px-4 text-center font-bold text-stone-400">{w.chapterNumber}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900 dark:text-stone-100">{w.chapterTitleHindi}</div>
                        <div className="text-[11px] text-stone-400 italic">{w.chapterTitleEnglish}</div>
                      </td>
                      <td className="py-3.5 px-3 text-center font-semibold text-amber-600 dark:text-amber-400">~{w.objectiveMarks} अंक</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-blue-600 dark:text-blue-400">~{w.shortAnswerMarks} अंक</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                        {w.longAnswerMarks > 0 ? `~${w.longAnswerMarks} अंक` : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-full font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                          ~{w.totalWeightageMarks} अंक
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {w.importantTopics.map((topic, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: SUBJECTIVE Q&A LIBRARY (READING MODE) */}
      {activeTab === 'subjective' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Filters & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-stone-800 shadow-sm">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setSubjectiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  subjectiveFilter === 'all'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                सभी प्रश्न ({subjectiveQuestions.length})
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
                BSEB PYQ (2015-2025)
              </button>
              <button
                onClick={() => setSubjectiveFilter('ncert_scert')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  subjectiveFilter === 'ncert_scert'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                NCERT/SCERT अभ्यास
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="प्रश्न या टॉपिक खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Reading Mode List */}
          <div className="space-y-5">
            {filteredSubjective.map((q, idx) => {
              const isRead = readQuestionIds[q.id];
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
                      {q.bsebYear && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          BSEB {q.bsebYear}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleReadStatus(q.id)}
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

                  {/* Model Answer (Step-by-step) */}
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

            {filteredSubjective.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800">
                <HelpCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h4 className="font-bold text-stone-700 dark:text-stone-300 text-sm">
                  कोई प्रश्न नहीं मिला
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  कृपया फ़िल्टर बदलें या दूसरा कीवर्ड खोजें।
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
