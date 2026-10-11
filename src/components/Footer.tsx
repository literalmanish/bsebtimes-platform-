import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-[#0a0c0f] py-12 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold font-serif text-sm">
                B
              </div>
              <span className="font-serif text-2xl font-black text-stone-900 dark:text-stone-100">
                BSEB<span className="text-amber-500">TIMES</span>
              </span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-sm">
              बिहार बोर्ड मैट्रिक (10वीं) और इंटरमीडिएट (12वीं विज्ञान, कला, वाणिज्य) के छात्रों के लिए समर्पित ऑनलाइन परीक्षा एवं अभ्यास मंच।
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-3">
              परीक्षा संकाय (Streams)
            </h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li><Link href="/" className="hover:text-amber-500 transition-colors">10वीं मैट्रिक (Matric)</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">12वीं विज्ञान (I.Sc Science)</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">12वीं कला (I.A Arts)</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">12वीं वाणिज्य (I.Com Commerce)</Link></li>
              <li><Link href="/omr-simulator" className="hover:text-amber-500 transition-colors">50/100 OMR सिम्युलेटर</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-3">
              रैंकिंग एवं मेंटरशिप
            </h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li><Link href="/ranks" className="hover:text-amber-500 transition-colors">राज्य स्तर रैंक (State Rank)</Link></li>
              <li><Link href="/ranks" className="hover:text-amber-500 transition-colors">जिला स्तर रैंक (District Rank)</Link></li>
              <li><Link href="/ranks" className="hover:text-amber-500 transition-colors">प्रखंड स्तर रैंक (Block Rank)</Link></li>
              <li><Link href="/toppers" className="hover:text-amber-500 transition-colors">सिमुलतला एवं बोर्ड टॉपर्स 1:1</Link></li>
              <li><Link href="/model-papers" className="hover:text-amber-500 transition-colors">आधिकारिक मॉडल पेपर 2026</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} BSEBTimes. बिहार विद्यालय परीक्षा समिति (BSEB) तैयारी मंच.</p>
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:underline">गोपनीयता नीति (Privacy)</Link>
            <Link href="/" className="hover:underline">नियम एवं शर्तें (Terms)</Link>
            <a href="mailto:support@bsebtimes.in" className="hover:underline">हेल्पलाइन सहायता</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
