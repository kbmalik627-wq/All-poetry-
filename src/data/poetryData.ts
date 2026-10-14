export interface Poem {
  id: number;
  text: string;
  poet: string;
  poetUrdu: string;
  category: string;
  categoryUrdu: string;
  type: '2 Lines' | '4 Lines' | 'Ghazal';
  romanUrdu?: string;
  englishMeaning?: string;
  likes: number;
  liked?: boolean;
  bookmarked?: boolean;
  comments: CommentItem[];
  views: number;
  featured?: boolean;
}

export interface CommentItem {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface PoetInfo {
  name: string;
  nameUrdu: string;
  era: string;
  title: string;
  bio: string;
  popularVerse: string;
  avatarColor: string;
}

export const POET_PROFILES: Record<string, PoetInfo> = {
  "Allama Iqbal": {
    name: "Allama Iqbal",
    nameUrdu: "علامہ محمد اقبال",
    era: "1877 – 1938",
    title: "شاعرِ مشرق، حکیم الامت",
    bio: "عظیم فلسفی، مفکر اور شاعر جن کے کلام نے برصغیر کے مسلمانوں میں خودی اور آزادی کا ولولہ بیدار کیا۔",
    popularVerse: "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے",
    avatarColor: "from-emerald-700 to-teal-900"
  },
  "Mirza Ghalib": {
    name: "Mirza Ghalib",
    nameUrdu: "مرزا اسد اللہ خان غالب",
    era: "1797 – 1869",
    title: "شہنشاہِ غزل",
    bio: "اردو اور فارسی کے بے مثال شاعر، جن کی شوخیِ تحریر اور عمیق فلسفیانہ فکر آج بھی دلوں پر راج کرتی ہے۔",
    popularVerse: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے میرے ارمان لیکن پھر بھی کم نکلے",
    avatarColor: "from-amber-700 to-yellow-900"
  },
  "Jaun Elia": {
    name: "Jaun Elia",
    nameUrdu: "جون ایلیا",
    era: "1931 – 2002",
    title: "انوکھے لب و لہجے کے شاعر",
    bio: "جدید اردو شاعری کے سب سے منفرد اور باغیانہ لہجے والے رومانوی و فلسفی شاعر جن کی اداسی میں بھی سحر ہے۔",
    popularVerse: "بے دلی کیا یوں ہی دن گزر جائیں گے\nصرف زندہ رہے ہم تو مر جائیں گے",
    avatarColor: "from-stone-800 to-zinc-950"
  },
  "Ahmad Faraz": {
    name: "Ahmad Faraz",
    nameUrdu: "احمد فراز",
    era: "1931 – 2008",
    title: "رومانوی شاعری کے بادشاہ",
    bio: "عصری رومان اور احتجاجی شعور کے علمبردار، جن کی غزلیں برصغیر کے ہر دل کی دھڑکن ہیں۔",
    popularVerse: "اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں\nجس طرح سوکھے ہوئے پھول کتابوں میں ملیں",
    avatarColor: "from-indigo-800 to-purple-950"
  },
  "Parveen Shakir": {
    name: "Parveen Shakir",
    nameUrdu: "پروین شاکر",
    era: "1952 – 1994",
    title: "خوشبو کی شاعرہ",
    bio: "نسائی احساسات اور محبت کی لطافتوں کو اردو شاعری میں لازوال وقار بخشنے والی منفرد شاعرہ۔",
    popularVerse: "وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا\nمسئلہ پھول کا ہے پھول کدھر جائے گا",
    avatarColor: "from-rose-700 to-pink-900"
  },
  "Faiz Ahmad Faiz": {
    name: "Faiz Ahmad Faiz",
    nameUrdu: "فیض احمد فیض",
    era: "1911 – 1984",
    title: "انقلاب اور محبت کا شاعر",
    bio: "لینن امن انعام یافتہ، جن کے کلام میں محبوب کا حسن اور پسے ہوئے طبقوں کی پکار ایک ہو جاتے ہیں۔",
    popularVerse: "مجھ سے پہلی سی محبت مری محبوب نہ مانگ\nمیں نے سمجھا تھا کہ تو ہے تو درخشاں ہے حیات",
    avatarColor: "from-red-800 to-slate-900"
  },
  "Munir Niazi": {
    name: "Munir Niazi",
    nameUrdu: "منیر نیازی",
    era: "1928 – 2006",
    title: "خوف اور سحر کا ساحر",
    bio: "پراسرار فضاؤں اور انسانی بے بسی کے دلنشین عکاس شاعر۔",
    popularVerse: "ہمیشہ دیر کر دیتا ہوں میں ہر کام کرنے میں\nضروری بات کہنی ہو کوئی وعدہ نبھانا ہو",
    avatarColor: "from-teal-800 to-cyan-950"
  },
  "Wasi Shah": {
    name: "Wasi Shah",
    nameUrdu: "وصی شاہ",
    era: "Contemporary",
    title: "جدید نوجوان دلوں کی صدا",
    bio: "جذباتی شگفتگی اور سادہ سحر انگیز اسلوب کے مقبول ترین معاصر شاعر۔",
    popularVerse: "کاش میں تیرے حسیں ہاتھ کا کنگن ہوتا\nتو بڑے پیار سے چاؤ سے بڑے ناز کے ساتھ",
    avatarColor: "from-blue-700 to-sky-900"
  },
  "Mohsin Naqvi": {
    name: "Mohsin Naqvi",
    nameUrdu: "محسن نقوی",
    era: "1947 – 1996",
    title: "درد و سوز کی آواز",
    bio: "ماتمی سوز اور ہجر و غم کے پرتاثیر کلام کے ماہر شاعر۔",
    popularVerse: "یہ دل جو جل رہا ہے کوئی سبب تو ہے\nہونٹوں پہ التجا ہے کوئی سبب تو ہے",
    avatarColor: "from-violet-800 to-slate-950"
  },
  "Farhat Abbas Shah": {
    name: "Farhat Abbas Shah",
    nameUrdu: "فرحت عباس شاہ",
    era: "Contemporary",
    title: "شام اور اداسی کا مصور",
    bio: "جدید غزل اور نظم میں اداسی، جدائی اور رات کے موضوعات کے ممتاز شاعر۔",
    popularVerse: "مجھ کو تنہائی کا احساس دلانے والے\nتیرے جانے سے مرا شہر تو سونا نہ ہوا",
    avatarColor: "from-emerald-800 to-green-950"
  },
  "Meer Taqi Meer": {
    name: "Meer Taqi Meer",
    nameUrdu: "میر تقی میر",
    era: "1723 – 1810",
    title: "خدائے سخن",
    bio: "دلی کی ویرانی اور عشق کی سوز و گداز کا وہ نام جو غزل کی آبرو ہے۔",
    popularVerse: "نازکی اس کے لب کی کیا کہیے\nپنکھڑی اک گلاب کی سی ہے",
    avatarColor: "from-amber-800 to-stone-900"
  },
  "Nasir Kazmi": {
    name: "Nasir Kazmi",
    nameUrdu: "ناصر کاظمی",
    era: "1925 – 1972",
    title: "دھیمے سروں کا نغمہ نگار",
    bio: "چھوٹی بحروں میں گہری اداسی اور چاند، رات، اور بارش کے رومانس کا جادو جگانے والے شاعر۔",
    popularVerse: "دل میں اک لہر سی اٹھی ہے ابھی\nکوئی تازہ ہوا چلی ہے ابھی",
    avatarColor: "from-slate-700 to-zinc-900"
  }
};

export interface CategoryInfo {
  id: string;
  nameUrdu: string;
  nameEn: string;
  iconName: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: "All", nameUrdu: "سبھی شاعری", nameEn: "All Poetry", iconName: "Sparkles", color: "text-emerald-600" },
  { id: "Ghazal", nameUrdu: "منتخب غزلیں", nameEn: "Ghazal", iconName: "BookOpen", color: "text-purple-600" },
  { id: "Ishq Poetry", nameUrdu: "عشق و محبت", nameEn: "Ishq Poetry", iconName: "HeartHandshake", color: "text-rose-600" },
  { id: "Sad Poetry", nameUrdu: "غم و اداسی", nameEn: "Sad Poetry", iconName: "CloudRain", color: "text-indigo-600" },
  { id: "2 Lines", nameUrdu: "دو سطری شعر", nameEn: "2 Lines", iconName: "Feather", color: "text-amber-600" },
  { id: "4 Lines", nameUrdu: "چار سطری قطعہ", nameEn: "4 Lines", iconName: "LayoutGrid", color: "text-teal-600" },
  { id: "Mohabbat", nameUrdu: "محبت کی داستاں", nameEn: "Mohabbat", iconName: "Heart", color: "text-red-600" },
  { id: "Dosti", nameUrdu: "یاری و دوستی", nameEn: "Dosti", iconName: "Users", color: "text-yellow-600" },
  { id: "Bewafai", nameUrdu: "بے وفائی کا دکھ", nameEn: "Bewafai", iconName: "BrokenHeart", color: "text-stone-600" },
  { id: "Tanhai", nameUrdu: "گہری تنہائی", nameEn: "Tanhai", iconName: "Moon", color: "text-blue-600" },
  { id: "Hijr", nameUrdu: "ہجر اور جدائی", nameEn: "Hijr", iconName: "Compass", color: "text-orange-600" },
  { id: "Barish", nameUrdu: "بھیگی بارش", nameEn: "Barish", iconName: "Droplets", color: "text-cyan-600" },
  { id: "Attitude", nameUrdu: "خودداری و وقار", nameEn: "Attitude", iconName: "Shield", color: "text-emerald-700" },
  { id: "Wafa", nameUrdu: "عہدِ وفا", nameEn: "Wafa", iconName: "Flame", color: "text-amber-700" }
];

export const AUTHENTIC_VERSES: Array<{
  text: string;
  poet: string;
  category: string;
  type: '2 Lines' | '4 Lines' | 'Ghazal';
  romanUrdu: string;
  englishMeaning: string;
}> = [
  {
    text: "دلِ ناداں تجھے ہوا کیا ہے\nآخر اس درد کی دوا کیا ہے",
    poet: "Mirza Ghalib",
    category: "Ghazal",
    type: "2 Lines",
    romanUrdu: "Dil-e-nadan tujhe hua kya hai, Aakhir is dard ki dawa kya hai",
    englishMeaning: "O foolish heart, what has befallen you? What is the ultimate cure for this pain?"
  },
  {
    text: "یہ نہ تھی ہماری قسمت کہ وصالِ یار ہوتا\nاگر اور جیتے رہتے یہی انتظار ہوتا",
    poet: "Mirza Ghalib",
    category: "Sad Poetry",
    type: "2 Lines",
    romanUrdu: "Yeh na thi hamari qismat ke wisal-e-yaar hota, Agar aur jeete rehte yehi intezar hota",
    englishMeaning: "It was not in our destiny to unite with the beloved; had we lived longer, the waiting would have simply continued."
  },
  {
    text: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے میرے ارمان لیکن پھر بھی کم نکلے",
    poet: "Mirza Ghalib",
    category: "Ghazal",
    type: "2 Lines",
    romanUrdu: "Hazaron khwahishein aisi ke har khwahish pe dam nikle, Bohat nikle mere armaan lekin phir bhi kam nikle",
    englishMeaning: "Thousands of desires, each worth dying for; many of my yearnings were fulfilled, yet so many still remained."
  },
  {
    text: "اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں\nجس طرح سوکھے ہوئے پھول کتابوں میں ملیں",
    poet: "Ahmad Faraz",
    category: "Hijr",
    type: "2 Lines",
    romanUrdu: "Ab ke hum bichhre to shayad kabhi khwabon mein milein, Jis tarah sookhe hue phool kitabon mein milein",
    englishMeaning: "Parting this time, perhaps we will meet only in dreams, like dried, pressed petals preserved in old books."
  },
  {
    text: "سنا ہے لوگ اسے آنکھ بھر کے دیکھتے ہیں\nسو اس کے شہر میں کچھ دن ٹھہر کے دیکھتے ہیں\nاگر وہ بولے تو باتوں سے پھول جھڑتے ہیں\nاگر یہ بات ہے تو چلو بات کر کے دیکھتے ہیں",
    poet: "Ahmad Faraz",
    category: "Ishq Poetry",
    type: "4 Lines",
    romanUrdu: "Suna hai log use aankh bhar ke dekhte hain, So us ke shehar mein kuch din thehar ke dekhte hain...",
    englishMeaning: "I have heard that people gaze upon her in wonder; let us stay in her city and see for ourselves."
  },
  {
    text: "وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا\nمسئلہ پھول کا ہے پھول کدھر جائے گا",
    poet: "Parveen Shakir",
    category: "Ishq Poetry",
    type: "2 Lines",
    romanUrdu: "Woh to khushboo hai hawaon mein bikhar jayega, Masla phool ka hai phool kidhar jayega",
    englishMeaning: "He is fragrance, he will disperse into the breezes; the dilemma belongs to the flower, where will the flower go?"
  },
  {
    text: "کو بہ کو پھیل گئی بات شناسائی کی\nاس نے خوشبو کی طرح میری پذیرائی کی\nکیسے کہہ دوں کہ مجھے چھوڑ دیا ہے اس نے\nبات تو سچ ہے مگر بات ہے رسوائی کی",
    poet: "Parveen Shakir",
    category: "Bewafai",
    type: "4 Lines",
    romanUrdu: "Koo-ba-koo phail gayi baat shanasayi ki, Us ne khushboo ki tarah meri pazirayi ki...",
    englishMeaning: "From street to street the tale of our intimacy spread; she welcomed me like a delicate perfume."
  },
  {
    text: "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے",
    poet: "Allama Iqbal",
    category: "Attitude",
    type: "2 Lines",
    romanUrdu: "Khudi ko kar buland itna ke har taqdeer se pehle, Khuda bande se khud pooche bata teri raza kya hai",
    englishMeaning: "Elevate your selfhood so high that before inscribing any destiny, God Himself asks what your desire is."
  },
  {
    text: "ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحاں اور بھی ہیں\nقناعت نہ کر عالمِ رنگ و بو پر\nچمن اور بھی آشیاں اور بھی ہیں",
    poet: "Allama Iqbal",
    category: "Ghazal",
    type: "4 Lines",
    romanUrdu: "Sitaron se aage jahan aur bhi hain, Abhi ishq ke imtehan aur bhi hain...",
    englishMeaning: "Beyond the stars lie yet further realms; still other trials of love await."
  },
  {
    text: "بے دلی کیا یوں ہی دن گزر جائیں گے\nصرف زندہ رہے ہم تو مر جائیں گے\nغم و غصہ و رنج و اندوہ و حزن\nہم کہاں تک یہ سب اکٹھے لے کر جائیں گے",
    poet: "Jaun Elia",
    category: "Sad Poetry",
    type: "4 Lines",
    romanUrdu: "Be-dili kya yoonhi din guzar jayein ge, Sirf zinda rahe hum to mar jayein ge...",
    englishMeaning: "In such listlessness, will days simply pass away? If we merely exist without soul, we shall truly die."
  },
  {
    text: "جو گزاری نہ جا سکی ہم سے\nہم نے وہ زندگی گزاری ہے",
    poet: "Jaun Elia",
    category: "Sad Poetry",
    type: "2 Lines",
    romanUrdu: "Jo guzari na ja saki hum se, Hum ne woh zindagi guzari hai",
    englishMeaning: "The very life that was impossible to endure—that is the life we have lived."
  },
  {
    text: "مجھ سے پہلی سی محبت مری محبوب نہ مانگ\nمیں نے سمجھا تھا کہ تو ہے تو درخشاں ہے حیات",
    poet: "Faiz Ahmad Faiz",
    category: "Mohabbat",
    type: "2 Lines",
    romanUrdu: "Mujh se pehli si mohabbat meri mehboob na maang, Maine samjha tha ke tu hai to darakhshan hai hayat",
    englishMeaning: "Do not demand that first innocence of love from me, my beloved; once I believed that with you, all life was incandescent."
  },
  {
    text: "اور بھی دکھ ہیں زمانے میں محبت کے سوا\nراحتیں اور بھی ہیں وصل کی راحت کے سوا\nمجھ سے پہلی سی محبت مری محبوب نہ مانگ",
    poet: "Faiz Ahmad Faiz",
    category: "Sad Poetry",
    type: "4 Lines",
    romanUrdu: "Aur bhi dukh hain zamane mein mohabbat ke siwa, Rahtein aur bhi hain wasl ki rahat ke siwa...",
    englishMeaning: "There are sorrows in this world beyond love, and consolations other than union."
  },
  {
    text: "ہمیشہ دیر کر دیتا ہوں میں ہر کام کرنے میں\nضروری بات کہنی ہو کوئی وعدہ نبھانا ہو\nاسے آواز دینی ہو اسے واپس بلانا ہو\nہمیشہ دیر کر دیتا ہوں میں",
    poet: "Munir Niazi",
    category: "Tanhai",
    type: "4 Lines",
    romanUrdu: "Hamesha der kar deta hoon main har kaam karne mein, Zaroori baat kehni ho koi wada nibhana ho...",
    englishMeaning: "I am always late in doing what matters; when an urgent word must be uttered, or a sacred promise kept."
  },
  {
    text: "نازکی اس کے لب کی کیا کہیے\nپنکھڑی اک گلاب کی سی ہے",
    poet: "Meer Taqi Meer",
    category: "Ishq Poetry",
    type: "2 Lines",
    romanUrdu: "Nazuki us ke lab ki kya kahiye, Pankhari ik gulab ki si hai",
    englishMeaning: "What can one say of the delicacy of her lips? They are like the soft petal of a fresh rose."
  },
  {
    text: "پتا پتا بوٹا بوٹا حال ہمارا جانے ہے\nجانے نہ جانے گل ہی نہ جانے باغ تو سارا جانے ہے",
    poet: "Meer Taqi Meer",
    category: "Ghazal",
    type: "2 Lines",
    romanUrdu: "Patta patta boota boota haal hamara jaane hai, Jaane na jaane gul hi na jaane baagh to saara jaane hai",
    englishMeaning: "Every leaf and every twig knows our condition; whether the flower knows or not, the entire garden knows."
  },
  {
    text: "دل میں اک لہر سی اٹھی ہے ابھی\nکوئی تازہ ہوا چلی ہے ابھی\nیاد کے بے نشان جزیروں سے\nتیری آواز آ رہی ہے ابھی",
    poet: "Nasir Kazmi",
    category: "Tanhai",
    type: "4 Lines",
    romanUrdu: "Dil mein ik lehr si uthi hai abhi, Koi taza hawa chali hai abhi...",
    englishMeaning: "A gentle wave stirred in the heart just now; a fresh breeze blew across the quiet night."
  },
  {
    text: "برستی بارشوں میں بھی جو دل سونا سا رہتا ہے\nکوئی بچھڑا ہوا اپنا بہت ہی یاد آتا ہے",
    poet: "Mohsin Naqvi",
    category: "Barish",
    type: "2 Lines",
    romanUrdu: "Barasti barishon mein bhi jo dil soona sa rehta hai, Koi bichhra hua apna bohat hi yaad aata hai",
    englishMeaning: "When in the pouring rain the heart still feels desolate, someone separated from us is remembered deeply."
  },
  {
    text: "کاش میں تیرے حسیں ہاتھ کا کنگن ہوتا\nتو بڑے پیار سے چاؤ سے بڑے ناز کے ساتھ\nاپنی نازک سی کلائی میں چڑھاتی مجھ کو",
    poet: "Wasi Shah",
    category: "Ishq Poetry",
    type: "4 Lines",
    romanUrdu: "Kaash main tere haseen haath ka kangan hota, Tu bare pyar se chao se bare naaz ke saath...",
    englishMeaning: "Would that I were the bangle on your graceful hand, which you would slip onto your slender wrist with tenderness and pride."
  },
  {
    text: "مجھ کو تنہائی کا احساس دلانے والے\nتیرے جانے سے مرا شہر تو سونا نہ ہوا\nتیری یادوں کے حسیں دیے جلتے رہے شب بھر\nمیری آنکھوں کا کوئی گوشہ بھی اندھیرا نہ ہوا",
    poet: "Farhat Abbas Shah",
    category: "Tanhai",
    type: "4 Lines",
    romanUrdu: "Mujh ko tanhai ka ehsaas dilane wale, Tere jaane se mera shehar to soona na hua...",
    englishMeaning: "You who wished to make me feel solitude: my city did not become desolate in your absence."
  },
  {
    text: "تیرے وعدے پر جیے ہم تو یہ جان جھوٹ جانا\nکہ خوشی سے مر نہ جاتے اگر اعتبار ہوتا",
    poet: "Mirza Ghalib",
    category: "Wafa",
    type: "2 Lines",
    romanUrdu: "Tere wade par jiye hum to yeh jaan jhoot jaana, Ke khushi se mar na jaate agar aitbaar hota",
    englishMeaning: "If we lived on your promise, know that it was only because we disbelieved; had we truly trusted, we would have died of pure bliss."
  },
  {
    text: "میں اکیلا ہی چلا تھا جانبِ منزل مگر\nلوگ ساتھ آتے گئے اور کارواں بنتا گیا",
    poet: "Majrooh Sultanpuri",
    category: "Attitude",
    type: "2 Lines",
    romanUrdu: "Main akela hi chala tha jaanib-e-manzil magar, Log saath aate gaye aur karwan banta gaya",
    englishMeaning: "I had set out alone towards the destination, but people joined along the journey and a caravan was formed."
  },
  {
    text: "دوستی عام ہے لیکن اے دوست\nدوست ملتا ہے بڑی مشکل سے",
    poet: "Mirza Ghalib",
    category: "Dosti",
    type: "2 Lines",
    romanUrdu: "Dosti aam hai lekin ae dost, Dost milta hai bari mushkil se",
    englishMeaning: "Companionship is common, yet true, faithful friendship is discovered with immense rarity."
  },
  {
    text: "ہم بھی دشمن کو کبھی دوست بنا لیتے ہیں\nدل کو ہر بار نیا زخم لگا لیتے ہیں",
    poet: "Mohsin Naqvi",
    category: "Dosti",
    type: "2 Lines",
    romanUrdu: "Hum bhi dushman ko kabhi dost bana lete hain, Dil ko har baar naya zakhm laga lete hain",
    englishMeaning: "Sometimes we embrace even adversaries as friends, offering our heart to be wounded anew."
  },
  {
    text: "اس قدر مسلسل تھیں شدتیں جدائی کی\nآج پہلی بار اس سے میں نے بے وفائی کی",
    poet: "Ahmad Faraz",
    category: "Bewafai",
    type: "2 Lines",
    romanUrdu: "Is qadar musalsal theen shiddatein judayi ki, Aaj pehli baar us se maine bewafayi ki",
    englishMeaning: "So unrelenting was the anguish of separation that today, for the very first time, I turned away."
  },
  {
    text: "بارش کی بوندوں میں تیری خوشبو بسی ہوئی ہے\nہر قطرہ تیری یاد کا افسانہ کہہ رہا ہے",
    poet: "Wasi Shah",
    category: "Barish",
    type: "2 Lines",
    romanUrdu: "Barish ki boondon mein teri khushboo basi hui hai, Har qatra teri yaad ka afsana keh raha hai",
    englishMeaning: "Your sweet scent is infused within the raindrops; each drop narrates a lingering tale of your memory."
  },
  {
    text: "وفا کا نام نہ لو اب جہاں کے لوگوں میں\nیہ وہ چراغ ہے جو آندھیوں میں جل نہ سکا",
    poet: "Jaun Elia",
    category: "Wafa",
    type: "2 Lines",
    romanUrdu: "Wafa ka naam na lo ab jahan ke logon mein, Yeh woh chiragh hai jo aandhiyon mein jal na saka",
    englishMeaning: "Speak no more of loyalty among the crowd; it is a lamp that could never stay alight in such fierce storms."
  },
  {
    text: "تمہارے ہاتھ کی خوشبو سے سارا گھر مہکتا ہے\nتمہارے لہجے کی نرمی سے دل بہل جاتا ہے",
    poet: "Parveen Shakir",
    category: "Mohabbat",
    type: "2 Lines",
    romanUrdu: "Tumhare haath ki khushboo se sara ghar mehakta hai, Tumhare lehje ki narmi se dil behal jata hai",
    englishMeaning: "The whole house breathes perfume from your touch; the gentleness of your voice soothes the weary heart."
  },
  {
    text: "کبھی رک گئے کبھی چل دیے کبھی راستہ ہی بدل دیا\nغمِ زندگی کے سراب نے ہمیں کس طرف سے گزار دیا",
    poet: "Munir Niazi",
    category: "Sad Poetry",
    type: "2 Lines",
    romanUrdu: "Kabhi ruk gaye kabhi chal diye kabhi raasta hi badal diya, Gham-e-zindagi ke saraab ne humein kis taraf se guzaar diya",
    englishMeaning: "Sometimes we paused, sometimes we marched on, sometimes we changed path altogether; where has this mirage of life led us?"
  },
  {
    text: "ہم پرورشِ لوح و قلم کرتے رہیں گے\nجو دل پہ گزرتی ہے رقم کرتے رہیں گے",
    poet: "Faiz Ahmad Faiz",
    category: "Attitude",
    type: "2 Lines",
    romanUrdu: "Hum parwarish-e-lauh-o-qalam karte rahein ge, Jo dil pe guzarti hai raqam karte rahein ge",
    englishMeaning: "We will continue to nurture the tablet and the pen, recording faithfully whatever passes through the heart."
  }
];

const POET_KEYS = Object.keys(POET_PROFILES);
const CATEGORY_KEYS = CATEGORIES.filter(c => c.id !== "All").map(c => c.id);

// Generate procedural 2000 items as in user prototype, preserving authentic curated ones at head
export function generateFullPoetryDatabase(): Poem[] {
  const list: Poem[] = [];
  const TOTAL = 2000;

  // Initial curated entries
  AUTHENTIC_VERSES.forEach((item, index) => {
    const poetObj = POET_PROFILES[item.poet] || { nameUrdu: item.poet };
    const catObj = CATEGORIES.find(c => c.id === item.category) || { nameUrdu: item.category };
    list.push({
      id: index + 1,
      text: item.text,
      poet: item.poet,
      poetUrdu: poetObj.nameUrdu,
      category: item.category,
      categoryUrdu: catObj.nameUrdu,
      type: item.type,
      romanUrdu: item.romanUrdu,
      englishMeaning: item.englishMeaning,
      likes: 120 + ((index * 47) % 350),
      liked: false,
      bookmarked: false,
      views: 800 + ((index * 83) % 4500),
      featured: index < 6,
      comments: [
        {
          id: `c-init-${index}-1`,
          author: "کاشف علی",
          text: "سبحان اللہ! کیا لاجواب کلام ہے۔",
          timestamp: "2 گھنٹے پہلے"
        },
        {
          id: `c-init-${index}-2`,
          author: "سیدہ فاطمہ",
          text: "روح کو چھو لینے والے اشعار۔",
          timestamp: "کل"
        }
      ]
    });
  });

  // Procedural expansion up to 2000
  const curatedCount = list.length;
  for (let i = curatedCount + 1; i <= TOTAL; i++) {
    const baseIndex = (i - 1) % AUTHENTIC_VERSES.length;
    const base = AUTHENTIC_VERSES[baseIndex];
    const poetName = POET_KEYS[(i * 3) % POET_KEYS.length];
    const categoryName = CATEGORY_KEYS[(i * 7) % CATEGORY_KEYS.length];
    const poetObj = POET_PROFILES[poetName] || { nameUrdu: poetName };
    const catObj = CATEGORIES.find(c => c.id === categoryName) || { nameUrdu: categoryName };

    list.push({
      id: i,
      text: base.text,
      poet: poetName,
      poetUrdu: poetObj.nameUrdu,
      category: categoryName,
      categoryUrdu: catObj.nameUrdu,
      type: base.type,
      romanUrdu: base.romanUrdu,
      englishMeaning: base.englishMeaning,
      likes: 15 + ((i * 13) % 430),
      liked: false,
      bookmarked: false,
      views: 120 + ((i * 37) % 3200),
      featured: false,
      comments: (i % 5 === 0) ? [
        {
          id: `c-${i}-1`,
          author: "اہلِ ذوق",
          text: "بہت ہی عمدہ انتخاب!",
          timestamp: "چند روز قبل"
        }
      ] : []
    });
  }

  return list;
}
