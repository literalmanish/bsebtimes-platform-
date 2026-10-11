'use client';

import { ClassGrade, Stream } from './types';

export interface BSEBUserProfile {
  studentName: string;
  classGrade: ClassGrade;
  stream: Stream;
  district: string;
  block: string;
  streakDays: number;
  questionsSolvedToday: number;
  lastActiveDate: string;
}

const USER_PROFILE_KEY = 'bsebtimes_user_profile';

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function loadUserProfile(): BSEBUserProfile {
  if (typeof window === 'undefined') {
    return {
      studentName: 'छात्र (Student)',
      classGrade: '10th',
      stream: 'general10',
      district: 'Patna',
      block: 'Patna Sadar',
      streakDays: 3,
      questionsSolvedToday: 12,
      lastActiveDate: getTodayString(),
    };
  }

  try {
    const raw = localStorage.getItem(USER_PROFILE_KEY);
    if (!raw) {
      const initial: BSEBUserProfile = {
        studentName: 'छात्र (Student)',
        classGrade: '10th',
        stream: 'general10',
        district: 'Patna',
        block: 'Patna Sadar',
        streakDays: 3,
        questionsSolvedToday: 12,
        lastActiveDate: getTodayString(),
      };
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return {
      studentName: 'छात्र (Student)',
      classGrade: '10th',
      stream: 'general10',
      district: 'Patna',
      block: 'Patna Sadar',
      streakDays: 3,
      questionsSolvedToday: 12,
      lastActiveDate: getTodayString(),
    };
  }
}

export function saveUserProfile(profile: BSEBUserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event('bsebtimes-profile-updated'));
}
