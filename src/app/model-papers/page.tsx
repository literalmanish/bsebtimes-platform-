'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Clock, 
  X
} from 'lucide-react';

interface ModelPaper {
  id: string;
  subjectSlug: string;
  title: string;
  classGrade: '10th' | '12th';
  stream: 'science' | 'arts' | 'commerce' | 'general10' | 'language';
  streamLabel: string;
  pattern: string;
  date: string;
  totalMarks: string;
  timeLimit: string;
  hasPracticals: boolean;
  sampleQuestions: {
    q: string;
    ans: string;
    type: string;
  }[];
}

export default function ModelPapersPage() {
  const [streamFilter, setStreamFilter] = useState<string>('ALL');
  const [activePreviewPaper, setActivePreviewPaper] = useState<ModelPaper | null>(null);

  const modelPapers: ModelPaper[] = [
    {
      id: 'mp-10-sci',
      subjectSlug: 'class-10-science',
      title: 'मैट्रिक वार्षिक परीक्षा 2026 — विज्ञान (Science) आधिकारिक मॉडल पेपर',
      classGrade: '10th',
      stream: 'general10',
      streamLabel: '10वीं मैट्रिक',
      pattern: '80 वस्तुनिष्ठ प्रश्न (किन्हीं 40 का उत्तर दें)',
      date: 'आधिकारिक BSEB 2026',
      totalMarks: '100 अंक (80 थ्योरी + 20 प्रैक्टिकल)',
      timeLimit: '2 घंटे 45 मिनट',
      hasPracticals: true,
      sampleQuestions: [
        { q: 'किस दर्पण की फोकस दूरी ऋणात्मक होती है?', ans: 'अवतल दर्पण (Concave Mirror)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'प्रकाश के अपवर्तन के कितने नियम हैं?', ans: '2 नियम (स्नेल का नियम सहित)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'लोहे पर जंग लगना किस प्रकार की अभिक्रिया है?', ans: 'संक्षारण / रेडॉक्स अभिक्रिया', type: 'लघु-उत्तरीय (2 अंक)' },
        { q: 'मानव हृदय का नामांकित चित्र बनाकर दोहरा परिसंचरण समझाइए।', ans: 'हृदय की 4 कोष्ठकीय संरचना व अलिंद-निलय परिसंचरण', type: 'दीर्घ-उत्तरीय (5 अंक)' }
      ]
    },
    {
      id: 'mp-10-math',
      subjectSlug: 'class-10-mathematics',
      title: 'मैट्रिक वार्षिक परीक्षा 2026 — गणित (Mathematics) आधिकारिक मॉडल पेपर',
      classGrade: '10th',
      stream: 'general10',
      streamLabel: '10वीं मैट्रिक',
      pattern: '100 वस्तुनिष्ठ प्रश्न (किन्हीं 50 का उत्तर दें)',
      date: 'आधिकारिक BSEB 2026',
      totalMarks: '100 अंक (100 थ्योरी)',
      timeLimit: '3 घंटे 15 मिनट',
      hasPracticals: false,
      sampleQuestions: [
        { q: 'यदि ax² + bx + c = 0 के मूल बराबर हों तो विविक्तकर (D) क्या होगा?', ans: 'D = b² - 4ac = 0', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'बिंदु (4, -3) किस पाद में स्थित है?', ans: 'चतुर्थ पाद (4th Quadrant)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'यूक्लिड विभाजन एल्गोरिद्म से 135 व 225 का म.स. ज्ञात करें।', ans: 'HCF = 45 (चरणबद्ध यूक्लिड विधि)', type: 'लघु-उत्तरीय (2 अंक)' },
        { q: 'थेल्स प्रमेय (BPT) को लिखकर सिद्ध कीजिए।', ans: 'यदि किसी त्रिभुज की एक भुजा के समांतर रेखा खींची जाए तो वह अन्य दो भुजाओं को समान अनुपात में बांटती है।', type: 'दीर्घ-उत्तरीय (5 अंक)' }
      ]
    },
    {
      id: 'mp-10-hin',
      subjectSlug: 'class-10-hindi',
      title: 'मैट्रिक वार्षिक परीक्षा 2026 — हिंदी (गोधूलि एवं वर्णिका) मॉडल पेपर',
      classGrade: '10th',
      stream: 'general10',
      streamLabel: '10वीं भाषा पत्र',
      pattern: '100 वस्तुनिष्ठ प्रश्न (किन्हीं 50 का उत्तर दें)',
      date: 'आधिकारिक BSEB 2026',
      totalMarks: '100 अंक',
      timeLimit: '3 घंटे 15 मिनट',
      hasPracticals: false,
      sampleQuestions: [
        { q: "'श्रम विभाजन और जाति प्रथा' के लेखक कौन हैं?", ans: 'बाबा साहेब डॉ. भीमराव अंबेडकर', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'मंगम्मा क्या बेचती थी?', ans: 'दही बेचती थी', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'बिरजू महाराज के गुरु कौन थे?', ans: 'उनके पिताश्री (बाबूजी)', type: 'लघु-उत्तरीय (2 अंक)' }
      ]
    },
    {
      id: 'mp-12-phy',
      subjectSlug: 'class-12-physics',
      title: 'इंटरमीडिएट वार्षिक परीक्षा 2026 — भौतिकी (Physics) आधिकारिक मॉडल सेट',
      classGrade: '12th',
      stream: 'science',
      streamLabel: '12वीं विज्ञान (I.Sc)',
      pattern: '70 वस्तुनिष्ठ प्रश्न (किन्हीं 35 का उत्तर दें)',
      date: 'आधिकारिक BSEB 2026',
      totalMarks: '100 अंक (70 थ्योरी + 30 प्रैक्टिकल)',
      timeLimit: '3 घंटे 15 मिनट',
      hasPracticals: true,
      sampleQuestions: [
        { q: 'स्थिर विद्युत आवेश उत्पन्न करता है?', ans: 'केवल विद्युत क्षेत्र (Electric field only)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'लेंस की क्षमता का SI मात्रक क्या है?', ans: 'डायोप्टर (m⁻¹)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'वैद्युत द्विध्रुव आघूर्ण की परिभाषा व मात्रक लिखें।', ans: 'p = q × 2a, मात्रक: C·m', type: 'लघु-उत्तरीय (2 अंक)' },
        { q: 'गाउस की प्रमेय सिद्ध करें व अनंत लंबाई के तार का विद्युत क्षेत्र निकालें।', ans: 'E = λ / (2πε₀r)', type: 'दीर्घ-उत्तरीय (5 अंक)' }
      ]
    },
    {
      id: 'mp-12-chem',
      subjectSlug: 'class-12-chemistry',
      title: 'इंटरमीडिएट वार्षिक परीक्षा 2026 — रसायन शास्त्र (Chemistry) मॉडल सेट',
      classGrade: '12th',
      stream: 'science',
      streamLabel: '12वीं विज्ञान (I.Sc)',
      pattern: '70 वस्तुनिष्ठ प्रश्न (किन्हीं 35 का उत्तर दें)',
      date: 'आधिकारिक BSEB 2026',
      totalMarks: '100 अंक (70 थ्योरी + 30 प्रैक्टिकल)',
      timeLimit: '3 घंटे 15 मिनट',
      hasPracticals: true,
      sampleQuestions: [
        { q: 'क्रिस्टलीय ठोस का उदाहरण कौन सा है?', ans: 'हीरा / सोडियम क्लोराइड (NaCl)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'प्रथम कोटि अभिक्रिया के अर्ध-आयु काल का सूत्र?', ans: 't₁/₂ = 0.693 / k', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'राउल्ट का नियम क्या है?', ans: 'वाष्प दाब का आपेक्षिक अवनमन विलेय के मोल अंश के बराबर होता है।', type: 'लघु-उत्तरीय (2 अंक)' }
      ]
    },
    {
      id: 'mp-12-hist',
      subjectSlug: 'class-12-history',
      title: 'इंटरमीडिएट वार्षिक परीक्षा 2026 — इतिहास (History) कला संकाय मॉडल पेपर',
      classGrade: '12th',
      stream: 'arts',
      streamLabel: '12वीं कला (I.A)',
      pattern: '100 वस्तुनिष्ठ प्रश्न (किन्हीं 50 का उत्तर दें)',
      date: 'आधिकारिक BSEB 2026',
      totalMarks: '100 अंक',
      timeLimit: '3 घंटे 15 मिनट',
      hasPracticals: false,
      sampleQuestions: [
        { q: 'हड़प्पा सभ्यता किस युग की सभ्यता है?', ans: 'कांस्य युग (Bronze Age)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'अशोक के अभिलेख सर्वप्रथम किसने पढ़े?', ans: 'जेम्स प्रिंसेप (1837)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'हड़प्पा की जल निकास प्रणाली की दो विशेषताएं लिखें।', ans: 'ग्रिड पद्धति पर आधारित पक्की व ढकी नालियाँ एवं सोक-पिट', type: 'लघु-उत्तरीय (2 अंक)' },
        { q: '1857 की क्रांति में बिहार के वीर कुंवर सिंह की भूमिका पर प्रकाश डालें।', ans: 'जगदीशपुर रियासत से विद्रोह का नेतृत्व व अंग्रेजों को परास्त करना', type: 'दीर्घ-उत्तरीय (5 अंक)' }
      ]
    },
    {
      id: 'mp-12-acc',
      subjectSlug: 'class-12-accountancy',
      title: 'इंटरमीडिएट वार्षिक परीक्षा 2026 — लेखाशास्त्र (Accountancy) मॉडल पेपर',
      classGrade: '12th',
      stream: 'commerce',
      streamLabel: '12वीं वाणिज्य (I.Com)',
      pattern: '100 वस्तुनिष्ठ प्रश्न (किन्हीं 50 का उत्तर दें)',
      date: 'आधिकारिक BSEB 2026',
      totalMarks: '100 अंक',
      timeLimit: '3 घंटे 15 मिनट',
      hasPracticals: false,
      sampleQuestions: [
        { q: 'प्राप्ति एवं भुगतान खाता किस प्रकार का खाता है?', ans: 'वास्तविक खाता (Real Account)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'साझेदारों के चालू खाते का शेष क्या हो सकता है?', ans: 'डेबिट अथवा क्रेडिट दोनों', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'त्याग अनुपात (Sacrificing Ratio) का सूत्र क्या है?', ans: 'त्याग अनुपात = पुराना अनुपात - नया अनुपात', type: 'लघु-उत्तरीय (2 अंक)' },
        { q: 'साझेदारी फर्म के विघटन पर वसूली खाता (Realisation A/c) बनाने के नियम समझाइए।', ans: 'संपत्तियों व दायित्वों के हस्तांतरण व निपटान की रोजनामचा प्रविष्टियाँ', type: 'दीर्घ-उत्तरीय (5 अंक)' }
      ]
    },
    {
      id: 'mp-12-hin-sci',
      subjectSlug: 'class-12-hindi-science',
      title: 'इंटरमीडिएट वार्षिक परीक्षा 2026 — हिंदी 100 अंक (दिगंत भाग 2) अनिवार्य पत्र',
      classGrade: '12th',
      stream: 'language',
      streamLabel: '12वीं अनिवार्य भाषा (All Streams)',
      pattern: '100 वस्तुनिष्ठ प्रश्न (किन्हीं 50 का उत्तर दें)',
      date: 'आधिकारिक BSEB 2026',
      totalMarks: '100 अंक',
      timeLimit: '3 घंटे 15 मिनट',
      hasPracticals: false,
      sampleQuestions: [
        { q: "'बातचीत' शीर्षक निबंध के निबंधकार कौन हैं?", ans: 'बालकृष्ण भट्ट', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: "'उसने कहा था' कहानी के मुख्य पात्र का क्या नाम है?", ans: 'लहना सिंह (सूबेदारनी होरां)', type: 'वस्तुनिष्ठ (1 अंक)' },
        { q: 'संधि और समास में दो मुख्य अंतर बताइए।', ans: 'संधि में वर्णों का मेल होता है, जबकि समास में शब्दों का संक्षेप होता है।', type: 'लघु-उत्तरीय (2 अंक)' }
      ]
    }
  ];

  const filteredPapers = modelPapers.filter(mp => {
    if (streamFilter === 'ALL') return true;
    if (streamFilter === '10th' && mp.classGrade === '10th') return true;
    if (streamFilter === 'science' && mp.stream === 'science') return true;
    if (streamFilter === 'arts' && mp.stream === 'arts') return true;
    if (streamFilter === 'commerce' && mp.stream === 'commerce') return true;
    if (streamFilter === 'language' && mp.stream === 'language') return true;
    return false;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-black text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            बिहार विद्यालय परीक्षा समिति आधिकारिक मॉडल पेपर्स 2026
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            BSEB Official Model Papers 2026
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            बिहार बोर्ड के नवीनतम सेंट-अप व वार्षिक परीक्षा 2026 पैटर्न पर आधारित मॉडल प्रश्न पत्र। सीधे 50/100 OMR सिम्युलेटर में टेस्ट दें, मॉडल समाधान देखें और अपनी जिला रैंक जानें।
          </p>
        </div>
      </div>

      {/* Stream Tabs Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-x-auto">
        <button
          onClick={() => setStreamFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            streamFilter === 'ALL'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          सभी मॉडल पेपर्स ({modelPapers.length})
        </button>
        <button
          onClick={() => setStreamFilter('10th')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            streamFilter === '10th'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          10वीं मैट्रिक
        </button>
        <button
          onClick={() => setStreamFilter('science')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            streamFilter === 'science'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          12वीं विज्ञान (I.Sc)
        </button>
        <button
          onClick={() => setStreamFilter('arts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            streamFilter === 'arts'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          12वीं कला (I.A)
        </button>
        <button
          onClick={() => setStreamFilter('commerce')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            streamFilter === 'commerce'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          12वीं वाणिज्य (I.Com)
        </button>
        <button
          onClick={() => setStreamFilter('language')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            streamFilter === 'language'
              ? 'bg-white dark:bg-[#14171d] text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-800'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          अनिवार्य भाषा पत्र (200 अंक)
        </button>
      </div>

      {/* Model Papers Grid */}
      <div className="space-y-4">
        {filteredPapers.map((mp) => (
          <div
            key={mp.id}
            className="bg-white dark:bg-[#14171d] rounded-2xl border border-stone-200 dark:border-stone-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm hover:border-amber-400/60 transition-all group"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {mp.streamLabel}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {mp.date}
                </span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-400" /> {mp.timeLimit}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white group-hover:text-amber-500 transition-colors">
                {mp.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                <span>पैटर्न: <strong className="text-stone-800 dark:text-stone-200">{mp.pattern}</strong></span>
                <span>•</span>
                <span>पूर्णांक: <strong className="text-amber-600 dark:text-amber-400">{mp.totalMarks}</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-center">
              <button
                onClick={() => setActivePreviewPaper(mp)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" /> हल व ब्लूप्रिंट देखें
              </button>

              <Link
                href={`/omr-simulator?subject=${mp.subjectSlug}`}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                OMR पर टेस्ट दें <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Model Paper Solution Preview Modal */}
      {activePreviewPaper && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#14171d] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl relative space-y-5 max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setActivePreviewPaper(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                {activePreviewPaper.streamLabel}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mt-1">
                {activePreviewPaper.title}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {activePreviewPaper.pattern} · पूर्णांक: {activePreviewPaper.totalMarks}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="font-bold">💡 बिहार बोर्ड 2026 आधिकारिक मूल्यांकन नियम:</div>
              <div>• खंड-अ: वस्तुनिष्ठ प्रश्नों में से केवल अनुमत प्रश्नों (50 अथवा 35/40) के ओएमआर गोलों की ही कंप्यूटर द्वारा जांच होगी।</div>
              <div>• खंड-ब: लघु एवं दीर्घ-उत्तरीय प्रश्नों में चरणबद्ध अंकन (Step-wise Marking) लागू है।</div>
            </div>

            {/* Sample Questions & Solutions */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-white">
                मॉडल प्रश्न एवं प्रमाणित उत्तर (Sample Questions & Answers):
              </h4>

              {activePreviewPaper.sampleQuestions.map((sq, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 font-semibold">
                    <span>प्रश्न {i + 1} ({sq.type})</span>
                  </div>
                  <div className="font-bold text-stone-900 dark:text-stone-100">
                    {sq.q}
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-serif pt-1">
                    उत्तर: {sq.ans}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setActivePreviewPaper(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold"
              >
                बंद करें
              </button>
              <Link
                href={`/omr-simulator?subject=${activePreviewPaper.subjectSlug}`}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                OMR सिम्युलेटर में टेस्ट दें →
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
