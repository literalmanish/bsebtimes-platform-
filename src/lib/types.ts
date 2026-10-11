export type ClassGrade = '10th' | '12th';
export type Stream = 'science' | 'arts' | 'commerce' | 'general10';

export interface Subject {
  id: string;
  slug: string;
  titleHindi: string;
  titleEnglish: string;
  classGrade: ClassGrade;
  stream: Stream;
  icon: string;
  totalChapters: number;
  totalQuestions: number;
  color: string;
  hasPracticals?: boolean; // If true: 70 MCQs given, solve 35; If false: 100 MCQs given, solve 50
  isLanguage?: boolean; // True for Hindi, English, Urdu, Sanskrit, Maithili
  languageCode?: string;
}

export interface Chapter {
  id: string;
  subjectSlug: string;
  chapterNumber: number;
  titleHindi: string;
  titleEnglish: string;
  summaryHindi: string;
  summaryEnglish: string;
  keyFormulasOrFacts: string[];
  totalQuestions: number;
}

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  textHindi: string;
  textEnglish: string;
}

export type QuestionSection = 'all_possible_book' | 'bseb_pyq';

export interface BilingualQuestion {
  id: string;
  chapterId: string;
  section?: QuestionSection; // 'all_possible_book' or 'bseb_pyq'
  sourceTag?: string; // e.g. "NCERT / CBSE Board", "UP Board", "BSEB 2024", "BSEB 2023"
  questionHindi: string;
  questionEnglish: string;
  options: QuestionOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  explanationHindi: string;
  explanationEnglish: string;
  isPYQ?: boolean;
  bsebYear?: number;
  markValue: number;
}

export interface District {
  id: string;
  nameEnglish: string;
  nameHindi: string;
  blocks: string[];
}

export interface RankRecord {
  id: string;
  studentName: string;
  rollCode: string;
  rollNumber: string;
  schoolName: string;
  district: string;
  block: string;
  classGrade: ClassGrade;
  stream: Stream;
  score: number; // out of 500
  percentage: number;
  stateRank?: number;
  districtRank?: number;
  blockRank?: number;
  division: '1st Division (प्रथम श्रेणी)' | '2nd Division' | '3rd Division';
}

export interface TopperMentor {
  id: string;
  name: string;
  classCracked: 'Class 10 (Matric)' | 'Class 12 (I.Sc)' | 'Class 12 (I.A)' | 'Class 12 (I.Com)';
  rankAchieved: string; // e.g. "State Rank 1 (2024)", "District Rank 1 (Patna)"
  school: string;
  district: string;
  scoreMarks: string; // e.g. "486/500 (97.2%)"
  avatar: string;
  guidanceFocus: string[];
  hourlySlot: string;
}

// ========================
// SUBJECTIVE QUESTIONS & ANSWERS (विषयनिष्ठ प्रश्नोत्तर)
// ========================
export type SubjectiveQuestionType = 'short' | 'long'; // short = 2 marks (लघु उत्तरीय), long = 5 marks (दीर्घ उत्तरीय)
export type SubjectiveSourceType = 'ncert_scert' | 'bseb_pyq'; // NCERT/SCERT or Previous Year Question

export interface SubjectiveQuestion {
  id: string;
  chapterId: string;
  subjectSlug: string;
  type: SubjectiveQuestionType; // 'short' (2 marks) | 'long' (5 marks)
  sourceType: SubjectiveSourceType; // 'ncert_scert' | 'bseb_pyq'
  sourceTag: string; // e.g. "BSEB 2024 (2 अंक)", "NCERT अभ्यास प्रश्नोत्तर", "BSEB 2023 (5 अंक)"
  marks: number; // 2 or 5
  questionHindi: string;
  questionEnglish: string;
  answerHindi: string; // Step-by-step model answer
  answerEnglish?: string;
  keyPoints?: string[]; // Topper presentation points
  markingScheme?: string; // Marking scheme breakdown
  bsebYear?: number;
}

// ========================
// SYLLABUS & MARKS DISTRIBUTION BLUEPRINT (पाठ्यक्रम एवं अंक विभाजन)
// ========================
export interface ChapterWeightage {
  chapterNumber: number;
  chapterTitleHindi: string;
  chapterTitleEnglish: string;
  objectiveMarks: number; // Approximate marks in MCQs
  shortAnswerMarks: number; // Approximate marks in 2-marks questions
  longAnswerMarks: number; // Approximate marks in 5-marks questions
  totalWeightageMarks: number; // Total weightage marks
  importantTopics: string[]; // High frequency topics
}

export interface SubjectSyllabusBlueprint {
  subjectSlug: string;
  totalTheoryMarks: number; // 100 or 70 or 80
  totalPracticalMarks: number; // 0 or 30 or 20
  examDuration: string; // e.g. "3 घंटे 15 मिनट"
  objectivePattern: {
    totalQuestionsAsked: number; // e.g. 100 or 70 or 80
    questionsToAttempt: number; // e.g. 50 or 35 or 40
    marksPerQuestion: number; // 1
    totalObjectiveMarks: number; // 50 or 35 or 40
  };
  shortAnswerPattern: {
    totalQuestionsAsked: number; // e.g. 30 or 20 or 24
    questionsToAttempt: number; // e.g. 15 or 10 or 12
    marksPerQuestion: number; // 2
    totalShortMarks: number; // 30 or 20 or 24
  };
  longAnswerPattern: {
    totalQuestionsAsked: number; // e.g. 8 or 6 or 6
    questionsToAttempt: number; // e.g. 4 or 3 or 3
    marksPerQuestion: number; // 5
    totalLongMarks: number; // 20 or 15 or 16
  };
  chapterWeightages: ChapterWeightage[];
}

