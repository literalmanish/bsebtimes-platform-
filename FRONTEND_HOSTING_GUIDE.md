# 🚀 BSEBTimes™ — Complete Frontend Hosting & GitHub Deployment Guide
> **बिहार विद्यालय परीक्षा समिति (BSEB 10वीं व 12वीं) डिजिटल तैयारी मंच**

यह मार्गदर्शिका आपको BSEBTimes™ प्रोजेक्ट को आपके **GitHub** खाते पर अपलोड करने और इसके फ्रंटएंड को **GitHub Pages**, **Vercel**, या **Netlify** पर पूर्णतः निःशुल्क (100% Free) लाइव होस्ट करने की संपूर्ण प्रक्रिया चरण-दर-चरण समझाती है।

---

## 📑 विषय-सूची (Table of Contents)
1. [भाग 1: प्रोजेक्ट को अपने GitHub पर अपलोड करना (Push to GitHub)](#भाग-1-प्रोजेक्ट-को-अपने-github-पर-अपलोड-करना)
2. [भाग 2: Vercel पर 1-क्लिक होस्टिंग (Next.js के लिए सर्वाधिक अनुशंसित)](#भाग-2-vercel-पर-1-क्लिक-होस्टिंग-सर्वाधिक-अनुशंसित)
3. [भाग 3: GitHub Pages पर निःशुल्क होस्टिंग (GitHub Actions के माध्यम से)](#भाग-3-github-pages-पर-निःशुल्क-होस्टिंग)
4. [भाग 4: Netlify / Cloudflare Pages पर वैकल्पिक होस्टिंग](#भाग-4-netlify-या-cloudflare-pages-पर-होस्टिंग)
5. [भाग 5: कस्टम डोमेन जोड़ना (जैसे bsebtimes.in / bsebtimes.com)](#भाग-5-कस्टम-डोमेन-जोड़ना)
6. [सामान्य समस्याएं एवं उनका समाधान (Troubleshooting)](#सामान्य-समस्याएं-एवं-समाधान)

---

## भाग 1: प्रोजेक्ट को अपने GitHub पर अपलोड करना

यदि आपने अभी तक अपने GitHub खाते पर यह रिपॉजिटरी नहीं बनाई है, तो नीचे दिए गए 3 आसान चरणों का पालन करें:

### चरण 1: GitHub पर नई रिपॉजिटरी बनाएं
1. अपने ब्राउज़र में [https://github.com/new](https://github.com/new) खोलें।
2. **Repository name** में लिखें: `bsebtimes-platform` (या अपनी पसंद का कोई भी नाम)।
3. इसे **Public** या **Private** चुनें।
4. ⚠️ **महत्वपूर्ण**: *"Initialize this repository with a README"*, *.gitignore*, या *license* वाले चेकबॉक्स को **खाली (Unchecked)** छोड़ दें (क्योंकि हमारा कोड पहले से तैयार है)।
5. **Create repository** बटन पर क्लिक करें।
6. अब आपको अपनी रिपॉजिटरी का URL दिखेगा, जैसे:
   `https://github.com/<YOUR_GITHUB_USERNAME>/bsebtimes-platform.git`

---

### चरण 2: टर्मिनल में कमांड चलाकर कोड पुश करें
अपने कंप्यूटर के टर्मिनल (VS Code Terminal या PowerShell) में प्रोजेक्ट फोल्डर के अंदर नीचे दिए गए कमांड चलाएं:

```bash
# 1. यदि अभी तक git init नहीं किया है (हमारे प्रोजेक्ट में पहले से इनिशियलाइज्ड है):
git init -b main

# 2. सभी फाइलों को स्टेजिंग में जोड़ें
git add .

# 3. पहला कमिट बनाएं
git commit -m "feat: initial release of BSEBTimes platform with Class 10/12 syllabi, OMR simulator, and subjective Q&A"

# 4. अपनी रिपॉजिटरी का रिमोट जोड़ें (नीचे <YOUR_USERNAME> की जगह अपना गिटहब यूजरनेम डालें):
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/bsebtimes-platform.git

# 5. कोड को GitHub पर पुश करें:
git push -u origin main
```

> **💡 प्रो-टिप**: जब आप पहली बार `git push` करेंगे, तो विंडोज गिट क्रेडेंशियल मैनेजर एक पॉपअप दिखाएगा — उसमें बस "Sign in with your browser" पर क्लिक करके ऑथराइज कर दें। कोड तुरंत आपके गिटहब पर अपलोड हो जाएगा!

---

## भाग 2: Vercel पर 1-क्लिक होस्टिंग (सर्वाधिक अनुशंसित)

Next.js को **Vercel** कंपनी द्वारा ही बनाया गया है, इसलिए Vercel पर Next.js 14 App Router को होस्ट करना सबसे आसान, तेज़ और 100% निःशुल्क है।

### Vercel के लाभ:
- ✅ **शून्य कॉन्फ़िगरेशन (Zero Config)**: डायनेमिक रूट्स (`[subjectSlug]`, `[chapterId]`) अपने आप सर्वरलेस रेंडर होते हैं।
- ✅ **ऑटोमैटिक डिप्लॉयमेंट**: जब भी आप GitHub पर `git push` करेंगे, आपकी लाइव वेबसाइट 60 सेकंड के अंदर अपने आप अपडेट हो जाएगी।
- ✅ **फ्री SSL & CDN**: सुरक्षित `https://` और बिजली जैसी तेज़ स्पीड।

### 30 सेकंड में Vercel पर लाइव करने की विधि:
1. [https://vercel.com/signup](https://vercel.com/signup) पर जाएं और **"Continue with GitHub"** चुनें।
2. डैशबोर्ड पर **"Add New..."** → **"Project"** पर क्लिक करें।
3. अपनी `bsebtimes-platform` रिपॉजिटरी के आगे **"Import"** पर क्लिक करें।
4. **Framework Preset** में अपने आप `Next.js` चुना हुआ रहेगा।
5. सीधे नीले रंग के **"Deploy"** बटन पर क्लिक करें!
6. मात्र 1 मिनट में आपकी वेबसाइट लाइव हो जाएगी और आपको एक मुफ़्त डोमेन मिल जाएगा, जैसे:
   `https://bsebtimes-platform.vercel.app`

---

## भाग 3: GitHub Pages पर निःशुल्क होस्टिंग

यदि आप अपने प्रोजेक्ट को सीधे गिटहब के अपने डोमेन (`https://<username>.github.io/bsebtimes-platform`) पर होस्ट करना चाहते हैं:

### 1. GitHub Actions वर्कफ़्लो
हमने आपके प्रोजेक्ट में `.github/workflows/deploy.yml` वर्कफ़्लो फ़ाइल पहले से जोड़ दी है।

### 2. GitHub Pages सक्षम (Enable) करें:
1. अपनी GitHub रिपॉजिटरी के पेज पर जाएं।
2. ऊपर **Settings** टैब पर क्लिक करें।
3. बाएँ मेनू में **Pages** विकल्प चुनें।
4. **Build and deployment** अनुभाग में:
   - **Source**: ड्रॉपडाउन से **"GitHub Actions"** चुनें (Deploy from a branch की जगह)।
5. बस! जैसे ही आप कोड पुश करेंगे, GitHub Actions अपने आप आपके कोड को बिल्ड करके GitHub Pages पर लाइव कर देगा।

### 3. रिपॉजिटरी सब-पाथ कॉन्फ़िगरेशन (`next.config.mjs`)
यदि आपकी गिटहब पेजेस साइट का URL `https://<username>.github.io/<repo-name>` है, तो `next.config.mjs` में `basePath` सेट करना होता है:

```javascript
/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = '';

const nextConfig = {
  output: 'export', // स्टैटिक HTML एक्सपोर्ट
  basePath: isGithubActions ? '/bsebtimes-platform' : '',
  assetPrefix: isGithubActions ? '/bsebtimes-platform/' : '',
  images: {
    unoptimized: true, // गिटहब पेजेस के लिए इमेज ऑप्टिमाइज़ेशन अनऑप्टिमाइज़्ड मोड
  },
};

export default nextConfig;
```

---

## भाग 4: Netlify या Cloudflare Pages पर होस्टिंग

### Netlify पर होस्टिंग:
1. [https://app.netlify.com](https://app.netlify.com) पर जाएं और GitHub से लॉगिन करें।
2. **"Add new site"** → **"Import an existing project"** → **GitHub** चुनें।
3. `bsebtimes-platform` चुनें।
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. **Deploy Site** पर क्लिक करें। आपको `https://bsebtimes.netlify.app` जैसा लिंक मिलेगा।

---

## भाग 5: कस्टम डोमेन जोड़ना

यदि आप अपनी वेबसाइट को अपने खुद के डोमेन (उदा. `bsebtimes.com` या `bsebtimes.in`) पर चलाना चाहते हैं:

1. **Vercel में**:
   - Vercel डैशबोर्ड → अपने प्रोजेक्ट में जाएं → **Settings** → **Domains**।
   - अपना डोमेन नाम डालें (उदा. `bsebtimes.com`) और **Add** करें।
   - Vercel द्वारा दिए गए DNS Records (A Record: `76.76.21.21` और CNAME: `cname.vercel-dns.com`) को अपने डोमेन प्रोवाइडर (GoDaddy / Namecheap / Hostinger) में दर्ज करें।
2. **GitHub Pages में**:
   - Settings → Pages → **Custom domain** में अपना डोमेन दर्ज करें और Save करें।

---

## सामान्य समस्याएं एवं समाधान

| समस्या | कारण | समाधान |
|---|---|---|
| `fatal: remote origin already exists` | रिमोट पहले से जुड़ा हुआ है | `git remote set-url origin <NEW_URL>` चलाएं |
| `Permission denied (publickey)` | SSH की जगह HTTPS का उपयोग करें | रिमोट URL को `https://github.com/...` से सेट करें |
| GitHub Pages 404 on CSS/JS | सब-डायरेक्टरी का पाथ मिसिंग | `next.config.mjs` में `basePath: '/bsebtimes-platform'` सेट करें |
| Dynamic route error in static export | `[subjectSlug]` को सर्वरलेस चाहिए | Vercel का उपयोग करें (0 कॉन्फ़िगरेशन) या `generateStaticParams` जोड़ें |

---

> 🎓 **सहायता की आवश्यकता है?** 
> यदि आपको GitHub पर पुश करने या डोमेन कनेक्ट करने में कोई भी कठिनाई आए, तो बस चैट में अपना GitHub Repository URL साझा करें!
