'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { TOPPER_MENTORS } from '@/lib/bseb-data';
import { TopperMentor } from '@/lib/types';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  Award,
  Video
} from 'lucide-react';

export default function ToppersMentorshipPage() {
  const [selectedMentor, setSelectedMentor] = useState<TopperMentor | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'copy' | 'schedule'>('copy');

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const copySecrets = [
    {
      title: '1. हाशिया (Margin) एवं स्पष्ट प्रश्न संख्या',
      desc: 'उत्तर पुस्तिका के दोनों ओर कम से कम 1 इंच का हाशिया छोड़ें। प्रश्न संख्या को पन्ने के बीच में स्पष्ट बड़े अक्षरों में लिखें (उदा. \'प्रश्न संख्या 1 का उत्तर\')।',
      benefit: 'परीक्षक को कॉपी जांचने और अंक दर्ज करने में सुविधा होती है।'
    },
    {
      title: '2. गणित व विज्ञान में स्टेप-मार्किंग (Step-Wise Presentation)',
      desc: 'प्रत्येक न्यूमेरिकल और प्रमेय में 4 चरण अवश्य लिखें: (i) दिया गया है, (ii) ज्ञात करना है, (iii) प्रयुक्त सूत्र, (iv) चरणबद्ध हल। अंतिम उत्तर को आयताकार बॉक्स [Answer] में बंद करें।',
      benefit: 'यदि अंतिम उत्तर में गणना त्रुटि भी हो, तब भी 5 में से 4 अंक अवश्य मिलते हैं।'
    },
    {
      title: '3. स्वच्छ नामांकित आरेख (Pencil Diagrams)',
      desc: 'जीव विज्ञान, भूगोल एवं भौतिकी के दीर्घ-उत्तरीय प्रश्नों में पेंसिल से साफ-सुथरा चित्र बनाएं। सभी भागों का नामकरण तीर के निशान के साथ दाईं ओर लिखें।',
      benefit: 'चित्र देखकर परीक्षक 5 अंक के प्रश्न में पूरे 5 अंक प्रदान करते हैं।'
    },
    {
      title: '4. शब्द सीमा एवं मुख्य शब्दों का रेखांकन (Underlining)',
      desc: 'लघु-उत्तरीय प्रश्नों में 30-50 शब्द और दीर्घ-उत्तरीय में 150-200 शब्दों का पालन करें। महत्वपूर्ण परिभाषा, वैज्ञानिक नाम एवं तिथियों को काले पेन से अंडरलाइन करें।',
      benefit: 'परीक्षक की नज़र तुरंत मुख्य तथ्यों पर पड़ती है।'
    }
  ];

  const dailySchedule = [
    { time: '05:30 AM - 07:30 AM', task: 'याद करने वाले विषय (इतिहास, जीव विज्ञान, हिंदी व संस्कृत साहित्य)' },
    { time: '08:30 AM - 11:30 AM', task: 'गणित, लेखाशास्त्र (Accountancy) व भौतिकी के न्यूमेरिकल हल करना' },
    { time: '01:00 PM - 02:30 PM', task: 'BSEB 50/100 OMR शीट सिम्युलेटर पर वस्तुनिष्ठ प्रश्नों का दैनिक टेस्ट' },
    { time: '04:00 PM - 06:30 PM', task: 'पिछले 10 वर्षों के PYQ (2015-2025) लघु व दीर्घ-उत्तरीय प्रश्नों का लिखित अभ्यास' },
    { time: '08:00 PM - 10:00 PM', task: 'मॉडल पेपर हल व दिन भर के गलत हुए प्रश्नों का दोहराव (Revision)' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" />
          बिहार बोर्ड टॉपर गाइडेंस एवं मेंटरशिप
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          बिहार बोर्ड स्टेट टॉपर्स से सीधे सीखें 450+ अंक लाने का फॉर्मूला
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          सिमुलतला आवासीय विद्यालय और राज्य में रैंक 1 हासिल करने वाले टॉपर्स से 1:1 वीडियो परामर्श लें, उनकी कॉपी लिखने की रणनीति समझें और बोर्ड परीक्षा में प्रथम श्रेणी सुनिश्चित करें।
        </p>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TOPPER_MENTORS.map((m) => (
          <div
            key={m.id}
            className="bg-white dark:bg-[#14171d] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-sm hover:border-amber-400/60 transition-all space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border-2 border-amber-400 shadow-sm">
                  <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold font-serif">
                  {m.scoreMarks}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                  {m.name}
                </h3>
                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                  🏆 {m.rankAchieved}
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {m.school} (जिला: {m.district})
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="text-[11px] font-bold text-stone-400 uppercase">विशेष मार्गदर्शन:</div>
                {m.guidanceFocus.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div className="text-xs text-stone-500">
                अगला स्लॉट: <strong>{m.hourlySlot}</strong>
              </div>
              <button
                onClick={() => { setSelectedMentor(m); setBookedSuccess(false); }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm transition-all"
              >
                सेशन बुक करें
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION: TOPPER COPY SECRETS & DAILY SCHEDULE */}
      <div className="bg-white dark:bg-[#14171d] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              बोर्ड परीक्षा में 450+ अंक लाने की रणनीति
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
              टॉपर्स की उत्तर-पुस्तिका एवं दैनिक अध्ययन योजना
            </h2>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-stone-100 dark:bg-stone-800">
            <button
              onClick={() => setActiveStrategyTab('copy')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeStrategyTab === 'copy'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              📝 कॉपी लिखने के 4 नियम
            </button>
            <button
              onClick={() => setActiveStrategyTab('schedule')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeStrategyTab === 'schedule'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              ⏰ टॉपर दैनिक टाइम टेबल
            </button>
          </div>
        </div>

        {/* Tab 1: Copy Secrets */}
        {activeStrategyTab === 'copy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copySecrets.map((rule, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-2"
              >
                <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  {rule.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                  {rule.desc}
                </p>
                <div className="pt-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>लाभ: {rule.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Daily Schedule */}
        {activeStrategyTab === 'schedule' && (
          <div className="space-y-3">
            {dailySchedule.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 font-mono font-bold text-amber-600 dark:text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span>{item.time}</span>
                </div>
                <div className="text-stone-800 dark:text-stone-200 font-serif font-medium sm:text-right">
                  {item.task}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#14171d] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookedSuccess ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-500">1:1 टॉपर मेंटरशिप</span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white mt-0.5">
                    {selectedMentor.name} के साथ परामर्श
                  </h3>
                  <p className="text-xs text-stone-500">{selectedMentor.rankAchieved}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>निर्धारित समय: <strong>{selectedMentor.hourlySlot}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-blue-500" />
                    <span>माध्यम: Google Meet वीडियो परामर्श (30 मिनट)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    <span>शुल्क: <strong>निःशुल्क (Free for active students)</strong></span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block">
                    आपका नाम व व्हाट्सएप नंबर
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. राहुल कुमार (पटना) - 98765xxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors"
                >
                  सत्र कन्फर्म करें
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                  सत्र सफलतापूर्वक बुक हुआ!
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  मीटिंग लिंक आपके व्हाट्सएप व ईमेल पर भेज दिया गया है। टॉपर स्टडी ग्रुप से भी आपको जोड़ दिया गया है।
                </p>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="px-5 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-950 font-bold text-xs"
                >
                  बंद करें
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
