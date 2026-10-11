'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { loadUserProfile, saveUserProfile, BSEBUserProfile } from '@/lib/storage';
import { BIHAR_DISTRICTS } from '@/lib/bseb-data';
import { MapPin, Flame, Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<BSEBUserProfile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [districtModalOpen, setDistrictModalOpen] = useState(false);

  useEffect(() => {
    setProfile(loadUserProfile());

    const handleProfileUpdate = () => {
      setProfile(loadUserProfile());
    };
    window.addEventListener('bsebtimes-profile-updated', handleProfileUpdate);
    return () => window.removeEventListener('bsebtimes-profile-updated', handleProfileUpdate);
  }, []);

  const handleUpdateDistrict = (districtName: string, blockName: string) => {
    if (!profile) return;
    const updated = { ...profile, district: districtName, block: blockName };
    saveUserProfile(updated);
    setProfile(updated);
    setDistrictModalOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'होम (Home)' },
    { href: '/omr-simulator', label: 'OMR टेस्ट', badge: '50/100' },
    { href: '/ranks', label: 'रैंक लीडरबोर्ड', badge: 'State/Dist/Block' },
    { href: '/model-papers', label: 'मॉडल पेपर्स' },
    { href: '/toppers', label: 'टॉपर मेंटर' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-50/95 dark:bg-[#0d0f12]/95 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold font-serif text-lg shadow-sm">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100 flex items-baseline">
                BSEB<span className="text-amber-500">TIMES</span>
              </span>
              <span className="text-[9px] text-stone-500 dark:text-stone-400 -mt-1 font-medium tracking-wider">
                बिहार बोर्ड 10वीं व 12वीं
              </span>
            </div>
          </Link>

          {/* Hyper-Local District & Block Selector Pill */}
          <button
            onClick={() => setDistrictModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 hover:border-amber-500 transition-all"
            title="अपना जिला एवं प्रखंड बदलें (Select District & Block)"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="font-bold">{profile?.district || 'Patna'}</span>
            <span className="text-stone-400 text-[10px]">({profile?.block || 'Sadar'})</span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/40'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-[9px] bg-amber-500 text-stone-950 font-bold px-1.5 py-0.2 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Streak & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Daily Streak */}
          {profile && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 border border-orange-200/80 dark:border-orange-800/50 rounded-full text-xs font-bold text-orange-700 dark:text-orange-300"
              title="दैनिक अभ्यास स्ट्रीक"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{profile.streakDays}d Streak</span>
            </div>
          )}

          <ThemeToggle />

          <Link
            href="/omr-simulator"
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors shadow-sm"
          >
            OMR टेस्ट दें
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#0d0f12] px-4 pt-2 pb-5 space-y-2">
          <button
            onClick={() => {
              setDistrictModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 mb-2"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>जिला: <strong>{profile?.district}</strong> ({profile?.block})</span>
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 underline">बदलें</span>
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold rounded-md text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <span className="flex items-center justify-between">
                {link.label}
                {link.badge && (
                  <span className="text-[10px] bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* DISTRICT & BLOCK SELECTION MODAL */}
      {districtModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#14171d] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl relative space-y-6">
            <button
              onClick={() => setDistrictModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                अपना जिला एवं प्रखंड चुनें
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Select your District & Block to view your localized Block Rank and District Rank on the Leaderboard.
              </p>
            </div>

            {/* District Grid */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {BIHAR_DISTRICTS.map((dist) => (
                <div key={dist.id} className="border border-stone-200 dark:border-stone-800 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between font-bold text-sm text-stone-900 dark:text-white">
                    <span>{dist.nameHindi} ({dist.nameEnglish})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dist.blocks.map((blk) => {
                      const isSelected = profile?.district.toLowerCase() === dist.nameEnglish.toLowerCase() && profile?.block.toLowerCase() === blk.toLowerCase();
                      return (
                        <button
                          key={blk}
                          onClick={() => handleUpdateDistrict(dist.nameEnglish, blk)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                              : 'border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                          }`}
                        >
                          {blk}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
