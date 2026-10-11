import { SubjectSyllabusBlueprint, ChapterWeightage } from './types';
import { SUBJECTS, ALL_SUBJECT_CHAPTERS } from './bseb-data';

// ============================================================================
// OFFICIAL BSEB SYLLABUS, BLUEPRINT & CHAPTER-WISE MARKS DISTRIBUTION
// (बिहार बोर्ड आधिकारिक पाठ्यक्रम, ब्लूप्रिंट एवं अध्यायवार अंक विभाजन)
// ============================================================================

export const CURATED_SUBJECT_WEIGHTAGES: Record<string, ChapterWeightage[]> = {
  // 1. CLASS 10 MATHEMATICS (गणित) - 100 Marks
  'class-10-mathematics': [
    { chapterNumber: 1, chapterTitleHindi: 'वास्तविक संख्याएँ', chapterTitleEnglish: 'Real Numbers', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 10, importantTopics: ['यूक्लिड विभाजन प्रमेयिका a = bq + r', '√2, √3, √5 अपरिमेय संख्या का सत्यापन', 'शांत एवं अशांत आवर्ती दशमलव'] },
    { chapterNumber: 2, chapterTitleHindi: 'बहुपद', chapterTitleEnglish: 'Polynomials', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['शून्यकों का योग α+β = -b/a', 'शून्यकों का गुणनफल αβ = c/a', 'द्विघात बहुपद निर्माण'] },
    { chapterNumber: 3, chapterTitleHindi: 'दो चर वाले रैखिक समीकरण युग्म', chapterTitleEnglish: 'Pair of Linear Equations', objectiveMarks: 6, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 13, importantTopics: ['ग्राफ़ीय विधि से समीकरण हल (5 अंक पक्का)', 'वज्र-गुणन व प्रतिस्थापन विधि', 'संगत/असंगत रेखाओं की शर्तें'] },
    { chapterNumber: 4, chapterTitleHindi: 'द्विघात समीकरण', chapterTitleEnglish: 'Quadratic Equations', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 9, importantTopics: ['विविक्तकर D = b² - 4ac एवं मूलों की प्रकृति', 'द्विघाती सूत्र (श्रीधराचार्य सूत्र)', 'आयु व चाल संबंधी इबारती प्रश्न'] },
    { chapterNumber: 5, chapterTitleHindi: 'समांतर श्रेढ़ियाँ (A.P.)', chapterTitleEnglish: 'Arithmetic Progressions', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 10, importantTopics: ['n-वाँ पद सूत्र an = a + (n-1)d', 'प्रथम n पदों का योग Sn = n/2[2a + (n-1)d]', 'पदों के चयन वाले प्रश्न'] },
    { chapterNumber: 6, chapterTitleHindi: 'त्रिभुज', chapterTitleEnglish: 'Triangles', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 11, importantTopics: ['थेल्स प्रमेय (BPT) का सत्यापन (5 अंक)', 'पाइथागोरस प्रमेय का सत्यापन', 'समरूप त्रिभुजों के क्षेत्रफलों का अनुपात'] },
    { chapterNumber: 7, chapterTitleHindi: 'निर्देशांक ज्यामिति', chapterTitleEnglish: 'Coordinate Geometry', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 10, importantTopics: ['दूरी सूत्र d = √[(x₂-x₁)² + (y₂-y₁)²]', 'विभाजन सूत्र (Section Formula)', 'संरेखी बिंदु एवं त्रिभुज का क्षेत्रफल'] },
    { chapterNumber: 8, chapterTitleHindi: 'त्रिकोणमिति का परिचय', chapterTitleEnglish: 'Introduction to Trigonometry', objectiveMarks: 10, shortAnswerMarks: 6, longAnswerMarks: 5, totalWeightageMarks: 21, importantTopics: ['sin²θ + cos²θ = 1 सर्वसमिकाएं सिद्ध करना', '0°, 30°, 45°, 60°, 90° मान सारणी', 'पूरक कोणों के त्रिकोणमितीय अनुपात'] },
    { chapterNumber: 9, chapterTitleHindi: 'त्रिकोणमिति के अनुप्रयोग (ऊंचाई और दूरी)', chapterTitleEnglish: 'Heights and Distances', objectiveMarks: 2, shortAnswerMarks: 0, longAnswerMarks: 5, totalWeightageMarks: 7, importantTopics: ['उन्नयन एवं अवनमन कोण', 'मीनार, पेड़ टूटने एवं नदी की चौड़ाई वाले 5 अंक के प्रश्न'] },
    { chapterNumber: 10, chapterTitleHindi: 'वृत्त', chapterTitleEnglish: 'Circles', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['स्पर्श रेखा त्रिज्या पर लंब होती है', 'बाह्य बिंदु से खींची गई स्पर्श रेखाओं की लंबाइयाँ बराबर होती हैं'] },
    { chapterNumber: 11, chapterTitleHindi: 'रचनाएँ (Constructions)', chapterTitleEnglish: 'Constructions', objectiveMarks: 0, shortAnswerMarks: 0, longAnswerMarks: 5, totalWeightageMarks: 5, importantTopics: ['रेखाखंड का दिए गए अनुपात में विभाजन', 'वृत्त पर स्पर्श रेखा युग्म खींचना (5 अंक निश्चित)'] },
    { chapterNumber: 12, chapterTitleHindi: 'वृत्तों से संबंधित क्षेत्रफल', chapterTitleEnglish: 'Areas Related to Circles', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['त्रिज्यखंड का क्षेत्रफल (θ/360 × πr²)', 'वृत्तखंड का क्षेत्रफल एवं चाप की लंबाई'] },
    { chapterNumber: 13, chapterTitleHindi: 'पृष्ठीय क्षेत्रफल और आयतन', chapterTitleEnglish: 'Surface Areas and Volumes', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 14, importantTopics: ['बेलन, शंकु, गोला एवं छिन्नक (Frustum) के सूत्र', 'ठोसों के रूपांतरण वाले प्रश्न'] },
    { chapterNumber: 14, chapterTitleHindi: 'सांख्यिकी', chapterTitleEnglish: 'Statistics', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 14, importantTopics: ['माध्य (प्रत्यक्ष एवं पद-विचलन विधि)', 'माध्यक (Median formula)', 'बहुलक (Mode) एवं तोरण (Ogive)'] },
    { chapterNumber: 15, chapterTitleHindi: 'प्रायिकता', chapterTitleEnglish: 'Probability', objectiveMarks: 5, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 7, importantTopics: ['घटना की प्रायिकता P(E) = n(E)/n(S)', 'सिक्के, पासे और ताश के पत्तों वाले प्रश्न', 'P(E) + P(not E) = 1'] }
  ],

  // 2. CLASS 10 SCIENCE (विज्ञान) - 80 Theory + 20 Practical
  'class-10-science': [
    { chapterNumber: 1, chapterTitleHindi: 'रासायनिक अभिक्रियाएँ एवं समीकरण', chapterTitleEnglish: 'Chemical Reactions and Equations', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['संयोजन, वियोजन, विस्थापन व द्विविस्थापन अभिक्रियाएँ', 'ऑक्सीकरण एवं अपचयन (Redox)', 'संक्षारण एवं विकृतगंधिता'] },
    { chapterNumber: 2, chapterTitleHindi: 'अम्ल, क्षारक एवं लवण', chapterTitleEnglish: 'Acids, Bases and Salts', objectiveMarks: 5, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 12, importantTopics: ['pH पैमाना एवं दैनिक जीवन में महत्व', 'बेकिंग सोडा, विरंजक चूर्ण, प्लास्टर ऑफ पेरिस निर्माण व उपयोग'] },
    { chapterNumber: 3, chapterTitleHindi: 'धातु एवं अधातु', chapterTitleEnglish: 'Metals and Non-metals', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 9, importantTopics: ['सक्रियता श्रेणी', 'धातु निष्कर्षण (भर्जन एवं निस्तापन)', 'आयोनिक यौगिकों के गुणधर्म'] },
    { chapterNumber: 4, chapterTitleHindi: 'कार्बन एवं उसके यौगिक', chapterTitleEnglish: 'Carbon and its Compounds', objectiveMarks: 6, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 13, importantTopics: ['सहसंयोजी आबंधन एवं श्रृंखलन', 'समजातीय श्रेणी व IUPAC नामकरण', 'साबुनीकरण एवं मिसेल निर्माण'] },
    { chapterNumber: 5, chapterTitleHindi: 'जैव प्रक्रम', chapterTitleEnglish: 'Life Processes', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['प्रकाश-संश्लेषण के चरण', 'मानव पाचन तंत्र, हृदय की संरचना व दोहरा परिसंचरण', 'वृक्क में नेफ्रॉन की कार्यप्रणाली'] },
    { chapterNumber: 6, chapterTitleHindi: 'नियंत्रण एवं समन्वय', chapterTitleEnglish: 'Control and Coordination', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['तंत्रिका कोशिका (न्यूरॉन) का चित्र व कार्य', 'मानव मस्तिष्क के भाग', 'पादप हार्मोन (ऑक्सिन, जिबरेलिन)'] },
    { chapterNumber: 7, chapterTitleHindi: 'जीव जनन कैसे करते हैं?', chapterTitleEnglish: 'How do Organisms Reproduce?', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 14, importantTopics: ['अलैंगिक जनन की विधियाँ (मुकुलन, विखंडन)', 'पुष्प के अनुदैर्ध्य काट का नामांकित चित्र', 'मानव नर व मादा जनन तंत्र'] },
    { chapterNumber: 8, chapterTitleHindi: 'आनुवंशिकता एवं जैव विकास', chapterTitleEnglish: 'Heredity and Evolution', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['मेंडल के वंशागति नियम (मोनोहाइब्रिड व डाईहाइब्रिड)', 'मानव में लिंग निर्धारण'] },
    { chapterNumber: 9, chapterTitleHindi: 'प्रकाश — परावर्तन तथा अपवर्तन', chapterTitleEnglish: 'Light - Reflection and Refraction', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['दर्पण सूत्र 1/v + 1/u = 1/f एवं आवर्धन', 'स्नेल का नियम', 'लेंस सूत्र एवं लेंस की क्षमता P = 1/f'] },
    { chapterNumber: 10, chapterTitleHindi: 'मानव नेत्र तथा रंगबिरंगा संसार', chapterTitleEnglish: 'Human Eye and Colourful World', objectiveMarks: 5, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 7, importantTopics: ['निकट दृष्टि व दूर दृष्टि दोष एवं निवारण', 'तारों का टिमटिमाना', 'प्रकाश का प्रकीर्णन एवं टिंडल प्रभाव'] },
    { chapterNumber: 11, chapterTitleHindi: 'विद्युत', chapterTitleEnglish: 'Electricity', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['ओम का नियम (V = IR) का सत्यापन', 'श्रेणीक्रम एवं समांतर क्रम में प्रतिरोधकों का संयोजन', 'विद्युत शक्ति P = VI = I²R'] },
    { chapterNumber: 12, chapterTitleHindi: 'विद्युत धारा के चुंबकीय प्रभाव', chapterTitleEnglish: 'Magnetic Effects of Electric Current', objectiveMarks: 4, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 8, importantTopics: ['फ्लेमिंग का वामहस्त नियम', 'विद्युत मोटर का सिद्धांत व संरचना', 'घरेलू विद्युत परिपथ व लघुपथन (Short circuit)'] },
    { chapterNumber: 13, chapterTitleHindi: 'हमारा पर्यावरण', chapterTitleEnglish: 'Our Environment', objectiveMarks: 3, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 5, importantTopics: ['पारितंत्र में ऊर्जा का 10% नियम', 'ओजोन परत का अपक्षय व CFC', 'जैव निम्नीकरणीय एवं अजैव निम्नीकरणीय कचरा'] }
  ],

  // 3. CLASS 12 PHYSICS (भौतिकी) - 70 Theory + 30 Practical
  'class-12-physics': [
    { chapterNumber: 1, chapterTitleHindi: 'वैद्युत आवेश तथा क्षेत्र', chapterTitleEnglish: 'Electric Charges and Fields', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 11, importantTopics: ['कूलॉम का नियम', 'गाउस की प्रमेय एवं अनंत लंबाई के तार के लिए वैद्युत क्षेत्र (5 अंक)', 'वैद्युत द्विध्रुव आघूर्ण एवं अक्षीय/निरक्षीय स्थिति'] },
    { chapterNumber: 2, chapterTitleHindi: 'स्थिरवैद्युत विभव तथा धारिता', chapterTitleEnglish: 'Electrostatic Potential and Capacitance', objectiveMarks: 4, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 8, importantTopics: ['समविभव पृष्ठ के गुणधर्म', 'समांतर पट्टिका संधारित्र की धारिता C = ε₀A/d', 'संधारित्रों का संयोजन व संचित ऊर्जा'] },
    { chapterNumber: 3, chapterTitleHindi: 'विद्युत धारा', chapterTitleEnglish: 'Current Electricity', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['किरचॉफ के नियम (Kirchhoff\'s Laws)', 'व्हीटस्टोन सेतु का सिद्धांत (5 अंक)', 'अपवाह वेग (Drift velocity) एवं ओम के नियम का निगमन'] },
    { chapterNumber: 4, chapterTitleHindi: 'गतिमान आवेश और चुंबकत्व', chapterTitleEnglish: 'Moving Charges and Magnetism', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 11, importantTopics: ['बायो-सावर्ट का नियम (Biot-Savart Law)', 'ऐम्पियर का परिपथीय नियम', 'चल कुंडली धारामापी (Galvanometer) का अमीटर/वोल्टमीटर में रूपांतरण'] },
    { chapterNumber: 5, chapterTitleHindi: 'चुंबकत्व एवं द्रव्य', chapterTitleEnglish: 'Magnetism and Matter', objectiveMarks: 3, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 5, importantTopics: ['प्रतिचुंबकीय, अनुचुंबकीय एवं लौहचुंबकीय पदार्थों में अंतर', 'क्यूरी का नियम', 'भू-चुंबकत्व के अवयव'] },
    { chapterNumber: 6, chapterTitleHindi: 'वैद्युतचुंबकीय प्रेरण', chapterTitleEnglish: 'Electromagnetic Induction', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['फैराडे के वैद्युतचुंबकीय प्रेरण के नियम', 'लेंज का नियम एवं ऊर्जा संरक्षण', 'स्वप्रेरण एवं अन्योन्य प्रेरण'] },
    { chapterNumber: 7, chapterTitleHindi: 'प्रत्यावर्ती धारा (A.C.)', chapterTitleEnglish: 'Alternating Current', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 14, importantTopics: ['L-C-R श्रेणी परिपथ एवं अनुनाद (Resonance)', 'प्रत्यावर्ती धारा का वर्ग-माध्य-मूल मान (Irms = I₀/√2)', 'ट्रांसफार्मर का सिद्धांत, कार्यप्रणाली व ऊर्जा क्षय (5 अंक)'] },
    { chapterNumber: 8, chapterTitleHindi: 'वैद्युतचुंबकीय तरंगें', chapterTitleEnglish: 'Electromagnetic Waves', objectiveMarks: 3, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 5, importantTopics: ['विस्थापन धारा की अवधारणा', 'EM स्पेक्ट्रम (गामा, एक्स, यूवी, अवरक्त) के उपयोग'] },
    { chapterNumber: 9, chapterTitleHindi: 'किरण प्रकाशिकी एवं प्रकाशिक यंत्र', chapterTitleEnglish: 'Ray Optics and Optical Instruments', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['लेंस निर्माता सूत्र (Lens Maker\'s Formula 5 अंक)', 'प्रिज्म अपवर्तन सूत्र μ = sin[(A+δm)/2] / sin(A/2)', 'संयुक्त सूक्ष्मदर्शी व खगोलीय दूरदर्शी'] },
    { chapterNumber: 10, chapterTitleHindi: 'तरंग प्रकाशिकी', chapterTitleEnglish: 'Wave Optics', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 11, importantTopics: ['हाइगेंस का तरंग सिद्धांत एवं परावर्तन/अपवर्तन की व्याख्या (5 अंक)', 'यंग का द्वि-स्लिट प्रयोग एवं फ्रिंज चौड़ाई β = λD/d', 'प्रकाश का व्यतिकरण व विवर्तन में अंतर'] },
    { chapterNumber: 11, chapterTitleHindi: 'विकिरण तथा द्रव्य की द्वैत प्रकृति', chapterTitleEnglish: 'Dual Nature of Radiation and Matter', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['प्रकाश-वैद्युत प्रभाव के नियम', 'आइंस्टीन का प्रकाश-वैद्युत समीकरण hν = φ₀ + Kmax', 'दे-ब्रॉग्ली तरंगदैर्ध्य λ = h/p'] },
    { chapterNumber: 12, chapterTitleHindi: 'परमाणु', chapterTitleEnglish: 'Atoms', objectiveMarks: 3, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 5, importantTopics: ['रदरफोर्ड का α-कण प्रकीर्णन प्रयोग', 'बोहर के परमाणु मॉडल की अभिधारणाएं', 'हाइड्रोजन स्पेक्ट्रम की श्रेणियाँ (लाइमन, बामर, पाश्चन)'] },
    { chapterNumber: 13, chapterTitleHindi: 'नाभिक', chapterTitleEnglish: 'Nuclei', objectiveMarks: 3, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 5, importantTopics: ['नाभिकीय बल के गुणधर्म', 'द्रव्यमान क्षति एवं बंधन ऊर्जा ΔE = Δm·c²', 'नाभिकीय विखंडन एवं संलयन'] },
    { chapterNumber: 14, chapterTitleHindi: 'अर्धचालक इलेक्ट्रॉनिकी', chapterTitleEnglish: 'Semiconductor Electronics', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['n-प्रकार व p-प्रकार के अर्धचालक', 'p-n संधि डायोड: अग्र व पश्च अभिनति', 'दिष्टकारी (Rectifier: अर्ध-तरंग व पूर्ण-तरंग) के रूप में डायोड (5 अंक)'] }
  ],

  // 4. CLASS 12 CHEMISTRY (रसायन शास्त्र) - 70 Theory + 30 Practical
  'class-12-chemistry': [
    { chapterNumber: 1, chapterTitleHindi: 'विलयन (Solutions)', chapterTitleEnglish: 'Solutions', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 14, importantTopics: ['राउल्ट का नियम एवं हेनरी का नियम', 'अणुसंख्य गुणधर्म (क्वथनांक उन्नयन, हिमांक अवनमन, परासरण दाब)', 'वांट हॉफ गुणांक (i)'] },
    { chapterNumber: 2, chapterTitleHindi: 'विद्युत रसायन (Electrochemistry)', chapterTitleEnglish: 'Electrochemistry', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['नेर्नस्ट समीकरण (Nernst equation)', 'कोलराउश का नियम एवं अनुप्रयोग', 'फैराडे के विद्युत अपघटन के नियम'] },
    { chapterNumber: 3, chapterTitleHindi: 'रासायनिक बलगतिकी (Chemical Kinetics)', chapterTitleEnglish: 'Chemical Kinetics', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 14, importantTopics: ['शून्य एवं प्रथम कोटि की अभिक्रिया का समाकलित वेग समीकरण', 'अर्ध-आयु काल t₁/₂ = 0.693/k', 'सक्रियण ऊर्जा एवं आरेनियस समीकरण'] },
    { chapterNumber: 4, chapterTitleHindi: 'd एवं f ब्लॉक के तत्व', chapterTitleEnglish: 'd and f Block Elements', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 9, importantTopics: ['संक्रमण तत्वों के रंगीन आयन एवं उत्प्रेरकीय गुण', 'लैंथेनाइड संकुचन (Lanthanoid contraction) एवं प्रभाव', 'KMnO₄ एवं K₂Cr₂O₇ की ऑक्सीकारक क्रियाएँ'] },
    { chapterNumber: 5, chapterTitleHindi: 'उपसहसंयोजन यौगिक (Coordination Compounds)', chapterTitleEnglish: 'Coordination Compounds', objectiveMarks: 6, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 13, importantTopics: ['IUPAC नामकरण', 'वर्नर का उपसहसंयोजन सिद्धांत', 'संयोजकता आबंध सिद्धांत (VBT) एवं क्रिस्टल क्षेत्र सिद्धांत (CFT)'] },
    { chapterNumber: 6, chapterTitleHindi: 'हैलोऐल्केन तथा हैलोऐरीन', chapterTitleEnglish: 'Haloalkanes and Haloarenes', objectiveMarks: 5, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 7, importantTopics: ['SN1 एवं SN2 क्रियाविधि में अंतर', 'वुर्ट्ज एवं फिटिग अभिक्रिया', 'क्लोरोफॉर्म व DDT'] },
    { chapterNumber: 7, chapterTitleHindi: 'ऐल्कोहॉल, फ़ीनॉल एवं ईथर', chapterTitleEnglish: 'Alcohols, Phenols and Ethers', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['प्राथमिक, द्वितीयक व तृतीयक ऐल्कोहॉल में ल्यूकास परीक्षण', 'रीमर-टीमैन एवं कोल्बे अभिक्रिया', 'विलियमसन ईथर संश्लेषण'] },
    { chapterNumber: 8, chapterTitleHindi: 'ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल', chapterTitleEnglish: 'Aldehydes, Ketones and Carboxylic Acids', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['ऐल्डोल संघनन एवं कैनिजारो अभिक्रिया', 'टॉलेन व फेहलिंग परीक्षण', 'कार्बोक्सिलिक अम्लों की अम्लीय प्रबलता'] },
    { chapterNumber: 9, chapterTitleHindi: 'ऐमीन (Amines)', chapterTitleEnglish: 'Amines', objectiveMarks: 5, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 7, importantTopics: ['हॉफमैन ब्रोमामाइड निम्नीकरण अभिक्रिया', 'कार्बिल ऐमीन परीक्षण', 'डाइऐजोनियम लवण से सैंडमायर अभिक्रिया'] },
    { chapterNumber: 10, chapterTitleHindi: 'जैव अणु (Biomolecules)', chapterTitleEnglish: 'Biomolecules', objectiveMarks: 6, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 8, importantTopics: ['ग्लूकोज की संरचना एवं अभिक्रियाएँ', 'प्रोटीन का विकृतीकरण ও पेप्टाइड बंध', 'DNA एवं RNA में रासायनिक अंतर'] }
  ],

  // 5. CLASS 12 MATHEMATICS (गणित) - 100 Marks
  'class-12-mathematics': [
    { chapterNumber: 1, chapterTitleHindi: 'संबंध एवं फलन', chapterTitleEnglish: 'Relations and Functions', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['स्वतुल्य, सममित एवं संक्रामक संबंध (तुल्यता संबंध)', 'एकैकी एवं आच्छादक फलन'] },
    { chapterNumber: 2, chapterTitleHindi: 'प्रतिलोम त्रिकोणमितीय फलन', chapterTitleEnglish: 'Inverse Trigonometric Functions', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 10, importantTopics: ['मुख्य मान शाखा (Principal value branch)', 'tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)]', '2tan⁻¹x के सूत्र'] },
    { chapterNumber: 3, chapterTitleHindi: 'आव्यूह (Matrices)', chapterTitleEnglish: 'Matrices', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 10, importantTopics: ['आव्यूह गुणनफल की शर्तें', 'सममित एवं विषम-सममित आव्यूह', 'प्रारंभिक पंक्ति संक्रिया द्वारा व्युत्क्रम'] },
    { chapterNumber: 4, chapterTitleHindi: 'सारणिक (Determinants)', chapterTitleEnglish: 'Determinants', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['सारणिकों के प्रगुणों द्वारा मान ज्ञात करना', 'क्रेमर नियम / आव्यूह विधि से रैखिक समीकरण हल (5 अंक)', 'सहखंडज (Adjoint) एवं A⁻¹ = (1/|A|)adj(A)'] },
    { chapterNumber: 5, chapterTitleHindi: 'सांतत्य तथा अवकलनीयता', chapterTitleEnglish: 'Continuity and Differentiability', objectiveMarks: 8, shortAnswerMarks: 6, longAnswerMarks: 5, totalWeightageMarks: 19, importantTopics: ['फलन की सांतत्यता की जाँच', 'शृंखला नियम (Chain rule), अस्पष्ट व प्राचलिक फलनों का अवकलन', 'द्वितीय कोटि का अवकलज d²y/dx²'] },
    { chapterNumber: 6, chapterTitleHindi: 'अवकलज के अनुप्रयोग', chapterTitleEnglish: 'Applications of Derivatives', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 11, importantTopics: ['उच्चिष्ठ एवं निम्निष्ठ (Maxima and Minima 5 अंक)', 'वर्धमान एवं ह्रासमान फलन', 'स्पर्श रेखा एवं अभिलंब'] },
    { chapterNumber: 7, chapterTitleHindi: 'समाकलन (Integrals)', chapterTitleEnglish: 'Integrals', objectiveMarks: 12, shortAnswerMarks: 6, longAnswerMarks: 5, totalWeightageMarks: 23, importantTopics: ['प्रतिस्थापन एवं खंडशः समाकलन (Integration by parts)', 'आंशिक भिन्नों द्वारा समाकलन', 'निश्चित समाकलन के प्रगुण ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a-x)dx'] },
    { chapterNumber: 8, chapterTitleHindi: 'समाकलनों के अनुप्रयोग', chapterTitleEnglish: 'Applications of Integrals', objectiveMarks: 2, shortAnswerMarks: 0, longAnswerMarks: 5, totalWeightageMarks: 7, importantTopics: ['वक्रों एवं रेखाओं से घिरे क्षेत्र का क्षेत्रफल ज्ञात करना (5 अंक)'] },
    { chapterNumber: 9, chapterTitleHindi: 'अवकल समीकरण', chapterTitleEnglish: 'Differential Equations', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 14, importantTopics: ['कोटि एवं घात (Order & Degree)', 'पृथक्करणीय चर विधि', 'रैखिक अवकल समीकरण dy/dx + Py = Q का हल'] },
    { chapterNumber: 10, chapterTitleHindi: 'सदिश बीजगणित (Vector Algebra)', chapterTitleEnglish: 'Vector Algebra', objectiveMarks: 8, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 12, importantTopics: ['दिश-अनुपात व दिश-कोसाइन', 'अदिश गुणनफल (Dot product a·b = |a||b|cosθ)', 'सदिश गुणनफल (Cross product a×b)'] },
    { chapterNumber: 11, chapterTitleHindi: 'त्रि-विमीय ज्यामिति (3D Geometry)', chapterTitleEnglish: 'Three Dimensional Geometry', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['दो रेखाओं के बीच की न्यूनतम दूरी (Shortest distance 5 अंक)', 'रेखा एवं तल के कार्तीय व सदिश समीकरण'] },
    { chapterNumber: 12, chapterTitleHindi: 'रैखिक प्रोग्रामन (LPP)', chapterTitleEnglish: 'Linear Programming', objectiveMarks: 2, shortAnswerMarks: 0, longAnswerMarks: 5, totalWeightageMarks: 7, importantTopics: ['ग्राफ़ीय विधि से Z का अधिकतमीकरण / न्यूनतमीकरण (5 अंक निश्चित प्रश्न)'] },
    { chapterNumber: 13, chapterTitleHindi: 'प्रायिकता (Probability)', chapterTitleEnglish: 'Probability', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 14, importantTopics: ['सप्रतिबंध प्रायिकता P(A|B) = P(A∩B)/P(B)', 'बेज़ प्रमेय (Bayes\' Theorem 5 अंक)', 'स्वतंत्र घटनाएँ व बरनौली परीक्षण'] }
  ],

  // 6. CLASS 12 ACCOUNTANCY (लेखाशास्त्र) - 100 Marks
  'class-12-accountancy': [
    { chapterNumber: 1, chapterTitleHindi: 'अलाभकारी संगठनों के लिए लेखांकन', chapterTitleEnglish: 'Accounting for Not-for-Profit Organisation', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['प्राप्ति एवं भुगतान खाता बनाम आय-व्यय खाता', 'चंदा (Subscription) की गणना', 'तुलन पत्र निर्माण'] },
    { chapterNumber: 2, chapterTitleHindi: 'साझेदारी फर्मों का लेखांकन — आधारभूत सिद्धांत', chapterTitleEnglish: 'Accounting for Partnership: Basic Concepts', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['साझेदारी विलेख (Partnership Deed)', 'लाभ-हानि नियोजन खाता (P&L Appropriation)', 'पूंजी पर ब्याज व आहरण पर ब्याज की गणना'] },
    { chapterNumber: 3, chapterTitleHindi: 'ख्याति: प्रकृति एवं मूल्यांकन', chapterTitleEnglish: 'Goodwill: Nature and Valuation', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['औसत लाभ विधि, अधिलाभ विधि (Super profit)', 'पूंजीकरण विधि'] },
    { chapterNumber: 4, chapterTitleHindi: 'साझेदार का प्रवेश', chapterTitleEnglish: 'Admission of a Partner', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['नया लाभ-हानि अनुपात एवं त्याग अनुपात (Sacrificing ratio)', 'पुनर्मूल्यांकन खाता (Revaluation A/c)', 'ख्याति का लेखांकन उपचार'] },
    { chapterNumber: 5, chapterTitleHindi: 'साझेदार का अवकाश ग्रहण एवं मृत्यु', chapterTitleEnglish: 'Retirement and Death of a Partner', objectiveMarks: 5, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 12, importantTopics: ['लाभ प्राप्ति अनुपात (Gaining ratio)', 'अवकाश प्राप्त साझेदार के ऋण खाते का निपटान'] },
    { chapterNumber: 6, chapterTitleHindi: 'साझेदारी फर्म का विघटन', chapterTitleEnglish: 'Dissolution of a Partnership Firm', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 14, importantTopics: ['वसूली खाता (Realisation Account) के नियम व प्रविष्टियाँ', 'फर्म के विघटन एवं साझेदारी के विघटन में अंतर'] },
    { chapterNumber: 7, chapterTitleHindi: 'अंश पूंजी के लिए लेखांकन', chapterTitleEnglish: 'Accounting for Share Capital', objectiveMarks: 8, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 17, importantTopics: ['अंशों के निर्गमन की रोजनामचा प्रविष्टियाँ (सममूल्य व प्रीमियम)', 'अंशों का हरण (Forfeiture) एवं पुनर्निर्गमन (Re-issue 5 अंक)', 'अग्रिम याचना एवं अवशिष्ट याचना'] },
    { chapterNumber: 8, chapterTitleHindi: 'ऋणपत्रों का निर्गमन एवं मोचन', chapterTitleEnglish: 'Issue and Redemption of Debentures', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 9, importantTopics: ['ऋणपत्रों के प्रकार', 'प्रतिभूति के रूप में ऋणपत्रों का निर्गमन', 'मोचन की शर्तें'] },
    { chapterNumber: 9, chapterTitleHindi: 'कंपनी के वित्तीय विवरण', chapterTitleEnglish: 'Financial Statements of a Company', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['कंपनी अधिनियम 2013 की अनुसूची III अनुसार स्थिति विवरण (Balance Sheet)', 'वित्तीय विवरणों के उद्देश्य'] },
    { chapterNumber: 10, chapterTitleHindi: 'लेखांकन अनुपात (Accounting Ratios)', chapterTitleEnglish: 'Accounting Ratios', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['चालू अनुपात एवं तरल अनुपात', 'ऋण-समता अनुपात (Debt-Equity ratio)', 'सकल लाभ अनुपात व शुद्ध लाभ अनुपात'] },
    { chapterNumber: 11, chapterTitleHindi: 'रोकड़ प्रवाह विवरण (Cash Flow Statement)', chapterTitleEnglish: 'Cash Flow Statement', objectiveMarks: 5, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 12, importantTopics: ['परिचालन, विनियोग एवं वित्तीय गतिविधियों से रोकड़ प्रवाह (5 अंक)', 'AS-3 के अनुसार प्रारूप'] }
  ],

  // 7. CLASS 12 HISTORY (इतिहास) - 100 Marks
  'class-12-history': [
    { chapterNumber: 1, chapterTitleHindi: 'ईंटें, मनके तथा अस्थियाँ (हड़प्पा सभ्यता)', chapterTitleEnglish: 'Bricks, Beads and Bones', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['हड़प्पा नगर योजना व जल निकास प्रणाली', 'विशाल स्नानागार व अन्नागार', 'हड़प्पा सभ्यता के पतन के कारण'] },
    { chapterNumber: 2, chapterTitleHindi: 'राजा, किसान और नगर (आरंभिक राज्य एवं अर्थव्यवस्थाएं)', chapterTitleEnglish: 'Kings, Farmers and Towns', objectiveMarks: 6, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 13, importantTopics: ['16 महाजनपदों में मगध का उत्कर्ष', 'मौर्य प्रशासन एवं अशोक का धम्म', 'अभिलेखों का ऐतिहासिक महत्व'] },
    { chapterNumber: 3, chapterTitleHindi: 'बंधुत्व, जाति तथा वर्ग (आरंभिक समाज)', chapterTitleEnglish: 'Kinship, Caste and Class', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 9, importantTopics: ['महाभारत का समालोचनात्मक संस्करण', 'चार वर्ण एवं गोत्र व्यवस्था', 'मनुस्मृति में विवाह के प्रकार'] },
    { chapterNumber: 4, chapterTitleHindi: 'विचारक, विश्वास और इमारतें (सांस्कृतिक विकास)', chapterTitleEnglish: 'Thinkers, Beliefs and Buildings', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['महात्मा बुद्ध की शिक्षाएं एवं चार आर्य सत्य', 'जैन धर्म के त्रिरत्न एवं पंच महाव्रत', 'सांची के स्तूप का संरक्षण'] },
    { chapterNumber: 5, chapterTitleHindi: 'यात्रियों के नज़रिए', chapterTitleEnglish: 'Through the Eyes of Travellers', objectiveMarks: 5, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 7, importantTopics: ['अल-बिरूनी का किताब-उल-हिंद', 'इब्न बतूता का यात्रा वृत्तांत (रेहला)', 'बर्नियर का मुगल कालीन भारत का विवरण'] },
    { chapterNumber: 6, chapterTitleHindi: 'भक्ति-सूफ़ी परंपराएं', chapterTitleEnglish: 'Bhakti-Sufi Traditions', objectiveMarks: 6, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 15, importantTopics: ['सगुण एवं निर्गुण भक्ति में अंतर', 'कबीर, गुरु नानक एवं मीराबाई की शिक्षाएं', 'चिश्ती सूफी संप्रदाय एवं खानकाह'] },
    { chapterNumber: 7, chapterTitleHindi: 'एक साम्राज्य की राजधानी: विजयनगर', chapterTitleEnglish: 'An Imperial Capital: Vijayanagara', objectiveMarks: 5, shortAnswerMarks: 2, longAnswerMarks: 5, totalWeightageMarks: 12, importantTopics: ['कृष्णदेव राय की उपलब्धियाँ', 'महानवमी डिब्बा एवं लोटस महल', 'अमरनायक प्रणाली'] },
    { chapterNumber: 8, chapterTitleHindi: 'किसान, ज़मींदार और राज्य (मुगल साम्राज्य)', chapterTitleEnglish: 'Peasants, Zamindars and the State', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['आईन-ए-अकबरी के पाँच भाग', 'अकबर की भू-राजस्व प्रणाली (जब्ती व दहसाला)'] },
    { chapterNumber: 9, chapterTitleHindi: 'उपनिवेशवाद और देहात (सरकारी अभिलेखों का अध्ययन)', chapterTitleEnglish: 'Colonialism and the Countryside', objectiveMarks: 4, shortAnswerMarks: 2, longAnswerMarks: 0, totalWeightageMarks: 6, importantTopics: ['इस्तमरारी बंदोबस्त (स्थाई बंदोबस्त 1793)', 'संथाल विद्रोह (1855-56) के कारण', 'पहाड़िया व संथाल में अंतर'] },
    { chapterNumber: 10, chapterTitleHindi: 'विद्रोही और राज (1857 का आंदोलन और उसके व्याख्यान)', chapterTitleEnglish: 'Rebels and the Raj (1857 Revolt)', objectiveMarks: 8, shortAnswerMarks: 4, longAnswerMarks: 5, totalWeightageMarks: 17, importantTopics: ['1857 की क्रांति के तात्कालिक व राजनीतिक कारण', 'बिहार में वीर कुंवर सिंह की भूमिका (5 अंक निश्चित)', 'विद्रोह की असफलता के कारण'] },
    { chapterNumber: 11, chapterTitleHindi: 'महात्मा गांधी और राष्ट्रीय आंदोलन', chapterTitleEnglish: 'Mahatma Gandhi and the Nationalist Movement', objectiveMarks: 8, shortAnswerMarks: 6, longAnswerMarks: 5, totalWeightageMarks: 19, importantTopics: ['चंपारण सत्याग्रह (1917) और बिहार', 'असहयोग आंदोलन व चौरी-चौरा', 'सविनय अवज्ञा आंदोलन (दांडी यात्रा) व भारत छोड़ो आंदोलन'] },
    { chapterNumber: 12, chapterTitleHindi: 'संविधान का निर्माण (एक नए युग की शुरुआत)', chapterTitleEnglish: 'Framing the Constitution', objectiveMarks: 5, shortAnswerMarks: 4, longAnswerMarks: 0, totalWeightageMarks: 9, importantTopics: ['संविधान सभा की प्रारूप समिति व डॉ. बी.आर. अंबेडकर', 'उद्देश्य प्रस्ताव (पंडित नेहरू)', 'राष्ट्रभाषा के मुद्दे पर बहस'] }
  ]
};

// Default Blueprint template based on theory/practical structure
export function getSubjectSyllabusBlueprint(subjectSlug: string): SubjectSyllabusBlueprint {
  const subject = SUBJECTS.find(s => s.slug === subjectSlug) || SUBJECTS[0];
  const chapters = ALL_SUBJECT_CHAPTERS[subjectSlug] || [];

  const hasPractical = subject.hasPracticals || false;
  const is10thTheory80 = subject.classGrade === '10th' && (subjectSlug.includes('science') || subjectSlug.includes('social'));
  
  const totalTheoryMarks = is10thTheory80 ? 80 : hasPractical ? 70 : 100;
  const totalPracticalMarks = is10thTheory80 ? 20 : hasPractical ? 30 : 0;

  let objectivePattern = {
    totalQuestionsAsked: 100,
    questionsToAttempt: 50,
    marksPerQuestion: 1,
    totalObjectiveMarks: 50
  };

  let shortAnswerPattern = {
    totalQuestionsAsked: 30,
    questionsToAttempt: 15,
    marksPerQuestion: 2,
    totalShortMarks: 30
  };

  let longAnswerPattern = {
    totalQuestionsAsked: 8,
    questionsToAttempt: 4,
    marksPerQuestion: 5,
    totalLongMarks: 20
  };

  if (hasPractical) {
    objectivePattern = {
      totalQuestionsAsked: 70,
      questionsToAttempt: 35,
      marksPerQuestion: 1,
      totalObjectiveMarks: 35
    };
    shortAnswerPattern = {
      totalQuestionsAsked: 20,
      questionsToAttempt: 10,
      marksPerQuestion: 2,
      totalShortMarks: 20
    };
    longAnswerPattern = {
      totalQuestionsAsked: 6,
      questionsToAttempt: 3,
      marksPerQuestion: 5,
      totalLongMarks: 15
    };
  } else if (is10thTheory80) {
    objectivePattern = {
      totalQuestionsAsked: 80,
      questionsToAttempt: 40,
      marksPerQuestion: 1,
      totalObjectiveMarks: 40
    };
    shortAnswerPattern = {
      totalQuestionsAsked: 24,
      questionsToAttempt: 12,
      marksPerQuestion: 2,
      totalShortMarks: 24
    };
    longAnswerPattern = {
      totalQuestionsAsked: 6,
      questionsToAttempt: 3,
      marksPerQuestion: 5,
      totalLongMarks: 16
    };
  }

  // Look for curated weightages or compute balanced weightage per chapter
  let chapterWeightages: ChapterWeightage[] = CURATED_SUBJECT_WEIGHTAGES[subjectSlug];

  if (!chapterWeightages || chapterWeightages.length === 0) {
    const totalChapters = Math.max(chapters.length, 1);
    const avgObjMarks = Math.round(objectivePattern.totalObjectiveMarks / totalChapters);
    const avgShortMarks = Math.round(shortAnswerPattern.totalShortMarks / totalChapters);
    const avgLongMarks = Math.round(longAnswerPattern.totalLongMarks / totalChapters);

    chapterWeightages = chapters.map((ch, idx) => {
      const obj = Math.max(2, avgObjMarks + (idx % 3 === 0 ? 2 : -1));
      const short = Math.max(2, avgShortMarks + (idx % 2 === 0 ? 1 : -1));
      const long = (idx % 3 === 0) ? Math.max(5, avgLongMarks) : 0;
      const total = obj + short + long;

      return {
        chapterNumber: ch.chapterNumber,
        chapterTitleHindi: ch.titleHindi,
        chapterTitleEnglish: ch.titleEnglish,
        objectiveMarks: obj,
        shortAnswerMarks: short,
        longAnswerMarks: long,
        totalWeightageMarks: total,
        importantTopics: ch.keyFormulasOrFacts?.slice(0, 3) || ['अध्याय के मुख्य बिंदु एवं परिभाषाएँ', 'BSEB मॉडल सेट प्रश्न', 'NCERT पाठ्यपुस्तक अभ्यास']
      };
    });
  }

  return {
    subjectSlug,
    totalTheoryMarks,
    totalPracticalMarks,
    examDuration: '3 घंटे 15 मिनट (15 मिनट प्रश्न पत्र पढ़ने के लिए)',
    objectivePattern,
    shortAnswerPattern,
    longAnswerPattern,
    chapterWeightages
  };
}
