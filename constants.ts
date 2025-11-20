import { Profile, Project, Service, Article } from './types';

export const PROFILE: Profile = {
  name: "Mustafa Ajaj",
  nameAr: "مصطفى عجاج",
  role: "AI Engineer & Notion Architect",
  roleAr: "مهندس ذكاء اصطناعي ومصمم أنظمة نوشن",
  headline: "مهندس ذكاء اصطناعي ومصمم أنظمة نوشن رقمية متطورة.",
  subHeadline: "أساعد الطلاب وصناع المحتوى على تنظيم حياتهم الرقمية وبناء أنظمة إنتاجية مستدامة باستخدام نوشن.",
  aboutText: "أنا مصطفى، مهندس ذكاء اصطناعي شغفي يكمن في الذكاء الاصطناعي والإنتاجية الرقمية. أبني قوالب وأنظمة نوشن متطورة لمساعدة الآخرين على الإنجاز وخاصة الطلاب وصنّاع المحتوى والمستقلّين.",
  avatar: "/mustafa.jpg",
  tags: ["Content Creator", "Notion Expert", "Information Engineering", "AI"],
  email: "mustafaajaj200511@gmail.com",
  socials: {
    notionArabs: "https://www.notionarabs.com/creators/mustafaajaj",
    facebook: "https://www.facebook.com/lmst.fn.123305",
    whatsapp: "https://wa.me/message/DS2OGMQUSIUMI1",
    telegram: "@mustafaajaj11"
  }
};

export const PROJECTS: Project[] = [
  {
    slug: "unistack-student-dashboard",
    title: "UniStack: The All-in-One Student Dashboard",
    shortDesc: "النظام المتكامل لإدارة حياة الطالب الجامعي من كل الجوانب.",
    fullDesc: "أهلاً بك في UniStack، النظام الذي تم بناؤه خصيصاً للطالب الجامعي الذي يطمح لأكثر من مجرد النجاح. هذا النظام لا يساعدك فقط على تنظيم دراستك، بل يساعدك على إتقانها آلياً باستخدام نظام التكرار المتباعد ومركز القيادة الأكاديمي.",
    features: [
      "🧠 نظام تكرار متباعد آلي (Spaced Repetition)",
      "📊 مركز قيادة أكاديمي (Academic Command Center)",
      "🧘 لوحة تحكم اليوم (Zero-Clutter Dashboard)",
      "🚀 نظام التعلم المزدوج (Dual-Track Learning)",
      "🏛️ نظام حياة متكامل (مالية، علاقات، حياة المسلم)"
    ],
    downloadCount: "5,400+",
    externalLink: "https://www.notion.so/UniStack-The-All-in-One-Student-Dashboard-299dd19d42bc81548ca5cc042edc6bd8?source=copy_link",
    featured: true,
    category: "Education"
  },
  {
    slug: "podcast-dashboard",
    title: "Podcast Dashboard",
    shortDesc: "نظام Notion الشامل لإدارة البودكاست وتتبع الأفكار.",
    fullDesc: "التحويل إلى التعلم المنظم يبدأ هنا. نظام متكامل لإدارة البودكاست، يتضمن ميزة التكرار المتباعد للملاحظات ومحتوى عربي مُحمّل مسبقاً.",
    features: [
      "🌟 جاهزية فورية بأفضل البودكاست العربي",
      "🧠 نظام لا ينسى فكرة (ربط الملاحظات بالحلقات)",
      "🚀 واجهة ذكية ورؤية شاملة (UX/UI)",
      "🌍 احترافية ثنائية اللغة"
    ],
    downloadCount: "2,100+",
    externalLink: "https://temporal-macaw-8f3.notion.site/Podcast-Dashboard-2a30d433680e811eb99fc9ff5f790862",
    featured: false,
    category: "Content"
  },
  {
    slug: "quran-mastery-os",
    title: "Quran Mastery OS",
    shortDesc: "نظام تشغيل ذكي لحفظ القرآن وإتقانه في سنتين.",
    fullDesc: "نظام مدمج بخوارزميات التكرار المتباعد (SRS) وإدارة دورات الحفظ. صُمم ليأخذ بيدك لختم القرآن في عامين مع خطة تثبيت تمنع النسيان.",
    features: [
      "🧠 خوارزمية الذاكرة الذكية (Automated SRS)",
      "🔄 نظام المصافي الثلاثي للأجزاء",
      "🖱️ لوحة تحكم بضغطة زر (One-Click)",
      "🔗 شبكة المتشابهات (Mutashabihat Network)"
    ],
    downloadCount: "8,500+",
    externalLink: "https://temporal-macaw-8f3.notion.site/Holy-Quran-Mastery-2af0d433680e8175aabcf63272abb1f2",
    featured: false,
    category: "Religious"
  },
  {
    slug: "smart-library-dashboard",
    title: "مكتبة الكتب بنظام المراجعة الذكي",
    shortDesc: "حوّل قراءتك من تجميع إلى استيعاب عميق.",
    fullDesc: "توقف عن تكديس الكتب. هذا القالب يقوم بحساب تاريخ المراجعة القادم تلقائيًا بناءً على مدى سهولة التذكر لكل ملاحظة.",
    features: [
      "نظام مراجعة ذكي (التكرار المتباعد)",
      "أتمتة بنقرة واحدة لجدولة المراجعة",
      "لوحة تحكم مركزية لمراجعات اليوم",
      "متابعة بصرية للتقدم (Charts & Bars)"
    ],
    downloadCount: "1,800+",
    externalLink: "https://temporal-macaw-8f3.notion.site/Library-Dashboard-2ac0d433680e8171b7fcceba6da452be?source=copy_link",
    featured: false,
    category: "Knowledge"
  },
  {
    slug: "expert-presenter-system",
    title: "The Expert Presenter System",
    shortDesc: "نظام يحول فوضى البحث وكتابة السكربتات إلى انسيابية.",
    fullDesc: "حل 6 كوابيس يواجهها صناع المحتوى. من فوضى البحث وجحيم علامات التبويب، إلى وضع الإلقاء السحري.",
    features: [
      "📥 صندوق وارد مركزي للأبحاث",
      "✍️ نظام مقاطع السكربت (Script Blocks)",
      "🖼️ بنك الأصول البصرية",
      "🎙️ وضع الإلقاء السحري (Cue Cards)"
    ],
    downloadCount: "1,200+",
    externalLink: "https://www.notion.so/Content-Creation-Hub-2ad0d433680e81acaa90fb5990861763?source=copy_link",
    featured: false,
    category: "Productivity"
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'second-brain-1',
    title: 'من الفوضى إلى النظام: ما هو "العقل الثاني" (Second Brain)؟ ولماذا نوشن هو الأداة المثالية لبنائه؟',
    category: 'Productivity',
    link: 'https://www.notionarabs.com/blog/mn-alfwda-ila-alnzam-ma-hw-alaql-althany-second-brain-wlmatha-nwshn-hw-aladah-almthalyh-lbnayh',
    date: '2025'
  },
  {
    id: 'second-brain-2',
    title: 'بناء العقل الثاني (الجزء 2): دليلك العملي لتطبيق نظام P.A.R.A في نوشن (خطوة بخطوة)',
    category: 'Productivity',
    link: 'https://www.notionarabs.com/blog/bnaa-alaql-althany-aljza-2-dlylk-alamly-lttbyq-nzam-para-fy-nwshn-khtwh-bkhtwh',
    date: '2025'
  },
  {
    id: 'second-brain-3',
    title: 'تغذية العقل الثاني (الجزء 3): فن "الالتقاط" (Capture) وكيف تحول نوشن إلى صندوق وارد لا يخطئ',
    category: 'Productivity',
    link: 'https://www.notionarabs.com/blog/tghthyh-alaql-althany-aljza-3-fn-alaltqat-capture-wkyf-thwl-nwshn-ila-sndwq-ward-la-ykhty',
    date: '2025'
  },
  {
    id: 'second-brain-4',
    title: 'من التجميع إلى الفهم: فن تنظيم واستخلاص المعرفة في نوشن (الجزء 4)',
    category: 'Productivity',
    link: 'https://www.notionarabs.com/blog/mn-altjmya-ila-alfhm-fn-tnzym-wastkhlas-almarfh-fy-nwshn-aljza-4',
    date: '2025'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'workspace',
    title: "Custom Notion Workspaces",
    description: "تصميم أنظمة وقوالب Notion مخصصة تناسب احتياجاتك الشخصية أو التجارية بدقة.",
    icon: 'layout'
  },
  {
    id: 'consulting',
    title: "Notion Consulting",
    description: "جلسات استشارية لتحسين إنتاجيتك وتنظيم سير العمل باستخدام أدوات Notion المتقدمة.",
    icon: 'consulting'
  }
];