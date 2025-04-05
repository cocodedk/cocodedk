// Debug element
const debug = document.getElementById('debug');

// Initialize canvas and context
const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
const infoBox = document.getElementById('infoBox');

// Check if animation system is available
let nodeAnimationSystem;
if (typeof NodeAnimation !== 'undefined') {
  nodeAnimationSystem = NodeAnimation;
}

// Track hovered and selected nodes
let hoveredNode = null;
let lastClickedNode = null;

// Node colors and styles
const colors = {
    default: {
        fill: '#333',
        stroke: '#aaa',
        text: '#fff'
    },
    hover: {
        fill: '#4a4a4a',
        stroke: '#ddd',
        text: '#fff'
    },
    categories: {
        'cocode.dk': { fill: '#005577', stroke: '#00ccff', text: '#ffffff' },
        'Software': { fill: '#0077cc', stroke: '#33ccff', text: '#ffffff' },
        'Cybersecurity': { fill: '#cc0044', stroke: '#ff6688', text: '#ffffff' },
        'Clients': { fill: '#cc8800', stroke: '#ffcc33', text: '#000000' },
        'Contact': { fill: '#f1c40f', stroke: '#f39c12', text: '#000000' }
    }
};

// Color utility functions
function lightenColor(hex, percent) {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Lighten
  r = Math.min(255, Math.floor(r * (1 + percent / 100)));
  g = Math.min(255, Math.floor(g * (1 + percent / 100)));
  b = Math.min(255, Math.floor(b * (1 + percent / 100)));

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function getContrastColor(hex) {
  // Convert hex to RGB
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // Calculate luminance - using relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Category-specific hover colors
const categoryHoverColors = {
  'cocode.dk': { fill: '#0077aa', stroke: '#33eeff', text: '#ffffff' },
  'Software': { fill: '#1188ee', stroke: '#66ffff', text: '#ffffff' },
  'Cybersecurity': { fill: '#ee0055', stroke: '#ff99aa', text: '#ffffff' },
  'Clients': { fill: '#ffaa00', stroke: '#ffdd55', text: '#000000' },
  'Contact': { fill: '#f7dc6f', stroke: '#f5b041', text: '#000000' }
};

// Define nodes with updated structure
const nodes = [
    {
        id: 'cocode.dk',
        x: 0, y: 0, r: 50,
        labels: {
            en: 'cocode.dk',
            da: 'cocode.dk',
            es: 'cocode.dk',
            zh: 'cocode.dk',
            ja: 'cocode.dk',
            de: 'cocode.dk',
            ar: 'cocode.dk',
            fa: 'cocode.dk',
            hi: 'cocode.dk',
            ur: 'cocode.dk',
            fr: 'cocode.dk'
        },
        translations: {
            en: 'cocode.dk is a freelance IT consultancy based in Denmark specializing in custom software development, graph databases, and cybersecurity services including compliance and audit automation.',
            da: 'cocode.dk er en freelance IT-konsulentvirksomhed baseret i Danmark, der specialiserer sig i skræddersyet softwareudvikling, grafdatabaser og cybersikkerhedstjenester inklusive compliance og revisionsautomatisering.',
            es: 'cocode.dk es una consultoría TI independiente con sede en Dinamarca que se especializa en desarrollo de software personalizado, bases de datos de grafos y servicios de ciberseguridad que incluyen automatización de cumplimiento y auditorías.',
            zh: 'cocode.dk 是一家位于丹麦的自由IT咨询公司，专注于定制软件开发、图数据库以及包含合规和审计自动化的网络安全服务。',
            ja: 'cocode.dkは、デンマークに拠点を置くフリーランスのITコンサルティング会社で、カスタムソフトウェア開発、グラフデータベース、コンプライアンスおよび監査自動化を含むサイバーセキュリティサービスを専門としています。',
            de: 'cocode.dk ist ein freiberufliches IT-Beratungsunternehmen in Dänemark, das sich auf individuelle Softwareentwicklung, Graphdatenbanken und Cybersicherheitsdienstleistungen einschließlich Compliance- und Prüfungsautomatisierung spezialisiert hat.',
            ar: 'cocode.dk هي شركة استشارات تقنية معلومات مستقلة مقرها الدنمارك متخصصة في تطوير البرمجيات المخصصة وقواعد بيانات الرسوم البيانية وخدمات الأمن السيبراني بما في ذلك الامتثال وأتمتة المراجعة.',
            fa: 'cocode.dk یک شرکت مشاوره فناوری اطلاعات مستقر در دانمارک است که در توسعه نرم‌افزارهای سفارشی، پایگاه‌داده‌های گرافی و خدمات امنیت سایبری شامل اتوماسیون انطباق و حسابرسی تخصص دارد.',
            hi: 'cocode.dk डेनमार्क स्थित एक फ्रीलांस आईटी सलाहकार कंपनी है जो कस्टम सॉफ़्टवेयर विकास, ग्राफ डेटाबेस और अनुपालन तथा ऑडिट स्वचालन सहित साइबर सुरक्षा सेवाओं में विशेषज्ञता रखती है।',
            ur: 'ڈنمارک میں واقع ایک فری لانس آئی ٹی کنسلٹنسی ہے جو کسٹم سافٹ ویئر ڈویلپمنٹ، گراف ڈیٹا بیسز اور کمپلائنس اور آڈٹ آٹومیشن سمیت سائبر سیکیورٹی خدمات میں مہارت رکھتی ہے۔',
            fr: 'cocode.dk est un cabinet de conseil en informatique indépendant basé au Danemark, spécialisé dans le développement de logiciels sur mesure, les bases de données graphes et les services de cybersécurité incluant la conformité et l\'automatisation des audits.'
        },
        category: 'cocode.dk'
        },
        {
        id: 'Software',
        x: 0, y: -150, r: 40,
        labels: {
            en: 'Software',
            da: 'Software',
            es: 'Software',
            zh: '软件',
            ja: 'ソフトウェア',
            de: 'Software',
            ar: 'البرمجيات',
            fa: 'نرم‌افزار',
            hi: 'सॉफ्टवेयर',
            ur: 'سافٹ ویئر',
            fr: 'Logiciel'
        },
        translations: {
            en: 'Full-stack custom software solutions built with modern frameworks such as Django and React. Scalable, maintainable systems designed for business efficiency.',
            da: 'Fuldt stack skræddersyede softwareløsninger bygget med moderne rammer som Django og React. Skalerbare, vedligeholdelige systemer designet til virksomhedseffektivitet.',
            es: 'Soluciones de software personalizadas de pila completa construidas con frameworks modernos como Django y React. Sistemas escalables y mantenibles diseñados para la eficiencia empresarial.',
            zh: '使用Django和React等现代框架构建的全栈定制软件解决方案。专为业务效率设计的可扩展、可维护系统。',
            ja: 'DjangoやReactなどのモダンなフレームワークを使用して構築されたフルスタックのカスタムソフトウェアソリューション。ビジネス効率のために設計されたスケーラブルで保守可能なシステム。',
            de: 'Maßgeschneiderte Full-Stack-Softwarelösungen mit modernen Frameworks wie Django und React. Skalierbare, wartbare Systeme für geschäftliche Effizienz.',
            ar: 'حلول برمجية مخصصة كاملة المكونات مبنية باستخدام أطر عمل حديثة مثل Django وReact. أنظمة قابلة للتطوير والصيانة مصممة لكفاءة الأعمال.',
            fa: 'راه‌حل‌های نرم‌افزاری سفارشی تمام پشته ساخته شده با چارچوب‌های مدرن مانند جنگو و ری‌اکت. سیستم‌های مقیاس‌پذیر و قابل نگهداری طراحی شده برای کارایی کسب‌وکار.',
            hi: 'Django और React जैसे आधुनिक फ्रेमवर्क के साथ निर्मित पूर्ण स्टैक कस्टम सॉफ़्टवेयर समाधान। व्यावसायिक दक्षता के लिए डिज़ाइन किए गए स्केलेबल, रखरखाव योग्य सिस्टम।',
            ur: 'جدید فریم ورکس جیسے کہ Django اور React کے ساتھ بنائے گئے مکمل اسٹیک حسب ضرورت سافٹ ویئر حل۔ کاروباری کارکردگی کے لیے ڈیزائن کیے گئے قابل توسیع، قابل مرمت نظام۔',
            fr: 'Solutions logicielles personnalisées full-stack construites avec des frameworks modernes comme Django et React. Systèmes évolutifs et maintenables conçus pour l\'efficacité commerciale.'
        },
        category: 'Software'
        },
        {
        id: 'Cybersecurity',
        x: 0, y: 150, r: 40,
        labels: {
            en: 'Cybersecurity',
            da: 'Cybersikkerhed',
            es: 'Ciberseguridad',
            zh: '网络安全',
            ja: 'サイバーセキュリティ',
            de: 'Cybersicherheit',
            ar: 'الأمن السيبراني',
            fa: 'امنیت سایبری',
            hi: 'साइबर सुरक्षा',
            ur: 'سائبر سیکیورٹی',
            fr: 'Cybersécurité'
        },
        translations: {
            en: 'Cybersecurity consulting including gap assessments, pentest coordination, risk remediation, and framework compliance (CIS18, NIST, ISO).',
            da: 'Cybersikkerhedsrådgivning inklusive gap-analyser, pentest-koordinering, risikoreduktion og framework-compliance (CIS18, NIST, ISO).',
            es: 'Consultoría de ciberseguridad que incluye evaluaciones de brechas, coordinación de pruebas de penetración, remediación de riesgos y cumplimiento de marcos (CIS18, NIST, ISO).',
            zh: '网络安全咨询包括差距评估、渗透测试协调、风险修复和框架合规（CIS18、NIST、ISO）。',
            ja: 'ギャップ評価、ペンテスト調整、リスク修復、フレームワーク準拠（CIS18、NIST、ISO）を含むサイバーセキュリティコンサルティング。',
            de: 'Cybersicherheitsberatung inklusive Lückenanalysen, Pentest-Koordination, Risikobehebung und Framework-Compliance (CIS18, NIST, ISO).',
            ar: 'استشارات الأمن السيبراني تشمل تقييم الفجوات، تنسيق اختبارات الاختراق، معالجة المخاطر، والامتثال للإطارات (CIS18، NIST، ISO).',
            fa: 'مشاوره امنیت سایبری شامل ارزیابی شکاف‌ها، هماهنگی تست نفوذ، رفع ریسک‌ها و انطباق با چارچوب‌ها (CIS18، NIST، ISO).',
            hi: 'साइबर सुरक्षा परामर्श जिसमें अंतराल मूल्यांकन, पेंटेस्ट समन्वय, जोखिम निवारण और फ्रेमवर्क अनुपालन (CIS18, NIST, ISO) शामिल हैं।',
            ur: 'سائبر سیکیورٹی کنسلٹنگ بشمول گیپ اسسمنٹس، پینٹیسٹ کوآرڈینیشن، رسک ریمیڈی ایشن اور فریم ورک کمپلائنس (CIS18، NIST، ISO)۔',
            fr: 'Conseil en cybersécurité incluant des évaluations d\'écart, coordination de tests d\'intrusion, remédiation des risques et conformité aux frameworks (CIS18, NIST, ISO).'
        },
        category: 'Cybersecurity'
        },
        {
        id: 'Clients',
        x: 150, y: 0, r: 40,
        labels: {
            en: 'Clients',
            da: 'Kunder',
            es: 'Clientes',
            zh: '客户',
            ja: 'クライアント',
            de: 'Kunden',
            ar: 'العملاء',
            fa: 'مشتریان',
            hi: 'ग्राहक',
            ur: 'کلائنٹس',
            fr: 'Clients'
        },
        translations: {
            en: 'Real-world freelance IT and security projects delivered across Europe. Includes Django apps, CMDB reviews, and automated compliance tools.',
            da: 'Praktiske freelance IT- og sikkerhedsprojekter leveret i hele Europa. Inkluderer Django-applikationer, CMDB-gennemgange og automatiserede compliance-værktøjer.',
            es: 'Proyectos reales de TI y seguridad freelance implementados en Europa. Incluye aplicaciones Django, revisiones de CMDB y herramientas automatizadas de cumplimiento.',
            zh: '在欧洲各地交付的实际自由职业IT和安全项目。包括Django应用程序、CMDB审查和自动化合规工具。',
            ja: '欧州全域で提供されている実践的なフリーランスのITおよびセキュリティプロジェクト。Djangoアプリケーション、CMDBレビュー、自動化コンプライアンスツールを含む。',
            de: 'Praktische Freelance-IT- und Sicherheitsprojekte in ganz Europa. Enthält Django-Anwendungen, CMDB-Überprüfungen und automatisierte Compliance-Tools.',
            ar: 'مشاريع تقنية معلومات وأمن مستقلة حقيقية تم تسليمها عبر أوروبا. تشمل تطبيقات Django، مراجعات CMDB، وأدوات الامتثال الآلية.',
            fa: 'پروژه‌های واقعی فریلنسری فناوری اطلاعات و امنیت تحویل داده شده در سراسر اروپا. شامل برنامه‌های جنگو، بررسی‌های CMDB و ابزارهای انطباق خودکار می‌شود.',
            hi: 'यूरोप भर में वितरित वास्तविक फ्रीलांस आईटी और सुरक्षा परियोजनाएं। इसमें Django एप्लिकेशन, CMDB समीक्षा और स्वचालित अनुपालन उपकरण शामिल हैं।',
            ur: 'یورپ بھر میں فراہم کیے جانے والے حقیقی فری لانس آئی ٹی اور سیکیورٹی پراجیکٹس۔ Django ایپس، CMDB جائزے اور خودکار کمپلائنس ٹولز شامل ہیں۔',
            fr: 'Projets réels en TI et sécurité en freelance déployés à travers l\'Europe. Comprend des applications Django, des audits CMDB et des outils de conformité automatisés.'
        },
        category: 'Clients'
        },
        {
        id: 'Contact',
        x: -150, y: 0, r: 40,
        labels: {
            en: 'Contact',
            da: 'Kontakt',
            es: 'Contacto',
            zh: '联系',
            ja: '連絡先',
            de: 'Kontakt',
            ar: 'اتصال',
            fa: 'تماس',
            hi: 'संपर्क',
            ur: 'رابطہ',
            fr: 'Contact'
        },
        translations: {
            en: 'Reach out to cocode.dk for IT consultancy or cybersecurity projects. Email: info@cocode.dk — based in Denmark, fluent in English, Danish, and Persian.',
            da: 'Kontakt cocode.dk til IT-rådgivning eller cybersikkerhedsprojekter. Email: info@cocode.dk – baseret i Danmark, flydende i engelsk, dansk og persisk.',
            es: 'Contacte a cocode.dk para consultoría TI o proyectos de ciberseguridad. Correo: info@cocode.dk – con sede en Dinamarca, dominio de inglés, danés y persa.',
            zh: '联系cocode.dk获取IT咨询或网络安全项目。邮箱：info@cocode.dk — 总部位于丹麦，精通英语、丹麦语和波斯语。',
            ja: 'ITコンサルティングやサイバーセキュリティプロジェクトについてはcocode.dkまで。メール: info@cocode.dk — デンマーク拠点、英語・デンマーク語・ペルシャ語対応可能。',
            de: 'Kontaktieren Sie cocode.dk für IT-Beratung oder Cybersicherheitsprojekte. E-Mail: info@cocode.dk – mit Sitz in Dänemark, fließend in Englisch, Dänisch und Persisch.',
            ar: 'اتصل بـ cocode.dk للحصول على استشارات تقنية المعلومات أو مشاريع الأمن السيبراني. البريد الإلكتروني: info@cocode.dk - مقرها الدنمارك، تتقن الإنجليزية والدانماركية والفارسية.',
            fa: 'برای مشاوره فناوری اطلاعات یا پروژه‌های امنیت سایبری با cocode.dk تماس بگیرید. ایمیل: info@cocode.dk — مستقر در دانمارک، مسلط به انگلیسی، دانمارکی و فارسی.',
            hi: 'आईटी परामर्श या साइबर सुरक्षा परियोजनाओं के लिए cocode.dk से संपर्क करें। ईमेल: info@cocode.dk — डेनमार्क स्थित, अंग्रेजी, डेनिश और फारसी में निपुण।',
            ur: 'آئی ٹی کنسلٹنسی یا سائبر سیکیورٹی پراجیکٹس کے لیے cocode.dk سے رابطہ کریں۔ ای میل: info@cocode.dk — ڈنمارک میں واقع، انگریزی، ڈینش اور فارسی میں مہارت۔',
            fr: 'Contactez cocode.dk pour des conseils en TI ou des projets de cybersécurité. Email : info@cocode.dk – basé au Danemark, maîtrise de l\'anglais, du danois et du persan.'
        },
        category: 'Contact'
        },
        {
        id: 'Python',
        x: -100, y: -200, r: 30,
        labels: {
            en: 'Python',
            da: 'Python',
            es: 'Python',
            zh: 'Python',
            ja: 'Python',
            de: 'Python',
            ar: 'بايثون',
            fa: 'پایتون',
            hi: 'पायथन',
            ur: 'پائتھن',
            fr: 'Python'
        },
        translations: {
            en: 'Backend automation, API development, scripting, and data processing using Python — the core language for robust digital infrastructure.',
            da: 'Backend-automatisering, API-udvikling, scripting og databehandling med Python — kernesproget for robust digital infrastruktur.',
            es: 'Automatización de backend, desarrollo de API, scripting y procesamiento de datos usando Python — el lenguaje central para infraestructura digital robusta.',
            zh: '使用Python进行后端自动化、API开发、脚本编写和数据处理 — 构建稳健数字基础设施的核心语言。',
            ja: 'Pythonを使用したバックエンド自動化、API開発、スクリプティング、データ処理 — 堅牢なデジタルインフラのコア言語。',
            de: 'Backend-Automatisierung, API-Entwicklung, Skripterstellung und Datenverarbeitung mit Python — der Kernsprache für robuste digitale Infrastruktur.',
            ar: 'أتمتة الواجهات الخلفية، تطوير واجهات برمجة التطبيقات، البرمجة النصية ومعالجة البيانات باستخدام بايثون — اللغة الأساسية للبنية التحتية الرقمية القوية.',
            fa: 'اتوماسیون بک‌اند، توسعه API، اسکریپت‌نویسی و پردازش داده با استفاده از پایتون — زبان هسته‌ای برای زیرساخت دیجیتال مستحکم.',
            hi: 'पायथन का उपयोग करके बैकेंड स्वचालन, एपीआई विकास, स्क्रिپ्टिंग और डेटा प्रसंस्करण — मजबूत डिजिटल बुनियादी ढांचे के लिए मुख्य भाषा।',
            ur: 'پائتھن کا استعمال کرتے ہوئے بیک اینڈ آٹومیشن، API ڈویلپمنٹ، سکرپٹنگ اور ڈیٹا پروسیسنگ — مضبوط ڈیجیٹل انفراسٹرکچر کے لیے مرکزی زبان۔',
            fr: 'Automatisation backend, développement d\'API, scriptage et traitement de données utilisant Python — le langage central pour une infrastructure numérique robuste.'
        },
        category: 'Software'
        },
        {
        id: 'Django',
        x: 0, y: -250, r: 30,
        labels: {
            en: 'Django',
            da: 'Django',
            es: 'Django',
            zh: 'Django',
            ja: 'Django',
            de: 'Django',
            ar: 'Django',
            fa: 'Django',
            hi: 'Django',
            ur: 'Django',
            fr: 'Django'
        },
        translations: {
            en: 'Development of secure, scalable web applications using Django. Includes admin systems, APIs, authentication and integrations.',
            da: 'Udvikling af sikre, skalerbare webapplikationer med Django. Inkluderer adminsystemer, APIer, autentificering og integrationer.',
            es: 'Desarrollo de aplicaciones web seguras y escalables utilizando Django. Incluye sistemas de administración, APIs, autenticación e integraciones.',
            zh: '使用Django开发安全、可扩展的Web应用程序。包括管理系统、API、身份验证和集成。',
            ja: 'Djangoを使用した安全でスケーラブルなWebアプリケーションの開発。管理システム、API、認証、統合機能を含む。',
            de: 'Entwicklung sicherer, skalierbarer Webanwendungen mit Django. Beinhaltet Admin-Systeme, APIs, Authentifizierung und Integrationen.',
            ar: 'تطوير تطبيقات ويب آمنة وقابلة للتوسع باستخدام Django. تشمل أنظمة الإدارة، واجهات برمجة التطبيقات، المصادقة والدمج.',
            fa: 'توسعه برنامه‌های وب امن و مقیاس‌پذیر با استفاده از جنگو. شامل سیستم‌های مدیریتی، APIها، احراز هویت و یکپارچه‌سازی می‌شود.',
            hi: 'Django का उपयोग करके सुरक्षित, स्केलेबल वेब एप्लिकेशन का विकास। प्रशासन प्रणाली, API, प्रमाणीकरण और एकीकरण शामिल हैं।',
            ur: 'Django کا استعمال کرتے ہوئے محفوظ، قابل توسیع ویب ایپلیکیشنز کی ترقی۔ انتظامی نظام، APIs، تصدیق اور انضمام شامل ہیں۔',
            fr: 'Développement d\'applications web sécurisées et évolutives utilisant Django. Comprend des systèmes d\'administration, des API, une authentification et des intégrations.'
        },
        category: 'Software'
        },
        {
        id: 'Neo4j',
        x: 100, y: -200, r: 30,
        labels: {
            en: 'Neo4j',
            da: 'Neo4j',
            es: 'Neo4j',
            zh: 'Neo4j',
            ja: 'Neo4j',
            de: 'Neo4j',
            ar: 'Neo4j',
            fa: 'Neo4j',
            hi: 'Neo4j',
            ur: 'Neo4j',
            fr: 'Neo4j'
        },
        translations: {
            en: 'Graph database expertise for mapping infrastructure, assets, systems, and relationships. Used for CMDB modeling and control tracking.',
            da: 'Ekspertise i grafdatabaser til kortlægning af infrastruktur, aktiver, systemer og relationer. Anvendt til CMDB-modellering og kontrolsporing.',
            es: 'Experiencia en bases de datos de grafos para mapear infraestructura, activos, sistemas y relaciones. Utilizado para modelado CMDB y seguimiento de controles.',
            zh: '图数据库专业知识，用于映射基础设施、资产、系统和关系。用于CMDB建模和控制跟踪。',
            ja: 'インフラ、資産、システム、関係のマッピングのためのグラフデータベースの専門知識。CMDBモデリングと制御追跡に使用されます。',
            de: 'Expertenwissen in Graphdatenbanken zur Abbildung von Infrastruktur, Assets, Systemen und Beziehungen. Verwendet für CMDB-Modellierung und Kontrollverfolgung.',
            ar: 'خبرة في قواعد بيانات الرسوم البيانية لرسم البنية التحتية والأصول والأنظمة والعلاقات. مستخدم في نمذجة CMDB وتتبع الضوابط.',
            fa: 'تخصص در پایگاه‌داده‌های گرافی برای نقشه‌برداری زیرساخت، دارایی‌ها، سیستم‌ها و روابط. استفاده شده برای مدل‌سازی CMDB و ردیابی کنترل‌ها.',
            hi: 'इन्फ्रास्ट्रक्चर, संपत्ति, सिस्टम और संबंधों के मानचित्रण के लिए ग्राफ डेटाबेस विशेषज्ञता। CMDB मॉडलिंग और नियंत्रण ट्रैकिंग के लिए उपयोग किया जाता है।',
            ur: 'انفراسٹرکچر، اثاثوں، نظاموں اور تعلقات کی نقشہ کشی کے لیے گراف ڈیٹا بیس کی مہارت۔ CMDB ماڈلنگ اور کنٹرول ٹریکنگ کے لیے استعمال کیا جاتا ہے۔',
            fr: 'Expertise en bases de données graphes pour cartographier l\'infrastructure, les actifs, les systèmes et les relations. Utilisé pour la modélisation CMDB et le suivi des contrôles.'
        },
        category: 'Software'
        },
        {
        id: 'AI Integrations',
        x: -70, y: -300, r: 30,
        labels: {
            en: 'AI Integrations',
            da: 'AI-integrationer',
            es: 'Integraciones IA',
            zh: 'AI集成',
            ja: 'AI統合',
            de: 'KI-Integrationen',
            ar: 'تكامل الذكاء الاصطناعي',
            fa: 'ادغام هوش مصنوعی',
            hi: 'एआई एकीकरण',
            ur: 'AI انضمام',
            fr: 'Intégrations IA'
        },
        translations: {
            en: 'Implementation of AI features like LLMs (GPT, Claude, Mistral) in workflows, from risk evaluations to automated audits and insight generation.',
            da: 'Implementering af AI-funktioner som LLM\'er (GPT, Claude, Mistral) i arbejdsgange, fra risikovurderinger til automatiserede revisioner og insights-generering.',
            es: 'Implementación de funciones de IA como LLMs (GPT, Claude, Mistral) en flujos de trabajo, desde evaluaciones de riesgo hasta auditorías automatizadas y generación de insights.',
            zh: '在工作流程中实现AI功能，如大型语言模型（GPT、Claude、Mistral），从风险评估到自动审计和洞察生成。',
            ja: 'ワークフローへのLLM（GPT、Claude、Mistral）などのAI機能の実装。リスク評価から自動化監査、インサイト生成まで。',
            de: 'Implementierung von KI-Funktionen wie LLMs (GPT, Claude, Mistral) in Arbeitsabläufen, von Risikobewertungen bis zu automatisierten Audits und Insight-Generierung.',
            ar: 'تنفيذ ميزات الذكاء الاصطناعي مثل النماذج اللغوية الكبيرة (GPT، Claude، Mistral) في سير العمل، من التقييمات المخاطر إلى التدقيقات الآلية وتوليد الرؤى.',
            fa: 'پیاده‌سازی قابلیت‌های هوش مصنوعی مانند مدل‌های زبانی بزرگ (GPT, Claude, Mistral) در گردش کارها، از ارزیابی ریسک تا حسابرسی خودکار و تولید بینش.',
            hi: 'वर्कफ़्लो में एआई सुविधाओं जैसे एलएलएम (GPT, Claude, Mistral) का कार्यान्वयन, जोखिम मूल्यांकन से लेकर स्वचालित ऑडिट और अंतर्दृष्टि उत्पादन तक।',
            ur: 'ورک فلوز میں AI فیچرز جیسے کہ LLMs (GPT, Claude, Mistral) کا نفاذ، خطرے کے جائزوں سے لے کر خودکار آڈٹس اور بصیرت کی تخلیق تک۔',
            fr: 'Mise en œuvre de fonctionnalités d\'IA comme les LLM (GPT, Claude, Mistral) dans les workflows, des évaluations de risques aux audits automatisés et génération d\'insights.'
        },
        category: 'Software'
        },
        {
        id: 'AI Wrappers',
        x: 70, y: -300, r: 30,
        labels: {
            en: 'AI Wrappers',
            da: 'AI-wrappers',
            es: 'Envoltorios IA',
            zh: 'AI封装',
            ja: 'AIラッパー',
            de: 'KI-Wrapper',
            ar: 'غلاف الذكاء الاصطناعي',
            fa: 'پوشش هوش مصنوعی',
            hi: 'एआई रैपर्स',
            ur: 'AI ریپرز',
            fr: 'Wrappers IA'
        },
        translations: {
            en: 'Custom logic layers around large language models for task-specific automation, data enhancement, and secure contextual use.',
            da: 'Brugerdefinerede logiklag omkring store sprogmodeller til opgavespecifik automatisering, dataforbedring og sikker kontekstuel anvendelse.',
            es: 'Capas de lógica personalizada alrededor de modelos de lenguaje grandes para automatización específica de tareas, mejora de datos y uso contextual seguro.',
            zh: '围绕大语言模型的自定义逻辑层，用于任务特定自动化、数据增强和安全上下文使用。',
            ja: '大規模言語モデルを囲むカスタムロジック層。タスク固有の自動化、データ強化、安全な文脈使用を実現。',
            de: 'Maßgeschneiderte Logikschichten um große Sprachmodelle für aufgabenspezifische Automatisierung, Datenverbesserung und sichere kontextbezogene Nutzung.',
            ar: 'طبقات منطق مخصصة حول نماذج اللغة الكبيرة لأتمتة مهام محددة، تحسين البيانات، والاستخدام السياقي الآمن.',
            fa: 'لایه‌های منطق سفارشی پیرامون مدل‌های زبانی بزرگ برای اتوماسیون ویژه وظیفه، بهبود داده و استفاده ایمن زمینه‌ای.',
            hi: 'बड़े भाषा मॉडलों के चारों ओर कस्टम लॉजिक परतें, जो कार्य-विशिष्ट स्वचालन, डेटा संवर्द्धन और सुरक्षित प्रासंगिक उपयोग के लिए हैं।',
            ur: 'بڑے لینگوئج ماڈلز کے گرد حسب ضرورت منطق کی تہیں۔ کام مخصوص آٹومیشن، ڈیٹا کی بہتری اور محفوظ سیاقی استعمال کے لیے۔',
            fr: 'Couches logiques personnalisées autour des grands modèles linguistiques pour automatisation spécifique aux tâches, amélioration des données et utilisation contextuelle sécurisée.'
        },
        category: 'Software'
        },
        {
        id: 'Compliance',
        x: -100, y: 200, r: 30,
        labels: {
            en: 'Compliance',
            da: 'Compliance',
            es: 'Cumplimiento',
            zh: '合规',
            ja: 'コンプライアンス',
            de: 'Compliance',
            ar: 'الامتثال',
            fa: 'انطباق',
            hi: 'अनुपालन',
            ur: 'کمپلائنس',
            fr: 'Conformité'
        },
        translations: {
            en: 'Specialized in CIS18, DORA, NIS2, ISO27000 compliance through graph-based audit mapping, evidence collection, and scope tracking.',
            da: 'Specialiseret i CIS18, DORA, NIS2, ISO27000 compliance gennem graf-baseret revisionskortlægning, indsamling af beviser og omfangssporing.',
            es: 'Especializado en cumplimiento CIS18, DORA, NIS2, ISO27000 mediante mapeo de auditoría basado en grafos, recopilación de evidencias y seguimiento de alcance.',
            zh: '专注于通过基于图形的审计映射、证据收集和范围跟踪来实现CIS18、DORA、NIS2、ISO27000合规。',
            ja: 'グラフベースの監査マッピング、証拠収集、スコープ追跡によるCIS18、DORA、NIS2、ISO27000コンプライアンスを専門としています。',
            de: 'Spezialisiert auf CIS18-, DORA-, NIS2- und ISO27000-Compliance durch graphbasierte Audit-Mapping, Beweissammlung und Umfangsverfolgung.',
            ar: 'متخصصة في الامتثال لـ CIS18 وDORA وNIS2 وISO27000 من خلال رسم خرائط التدقيق القائمة على الرسوم البيانية، وجمع الأدلة، وتتبع النطاق.',
            fa: 'تخصص در انطباق CIS18، DORA، NIS2، ISO27000 از طریق نقشه‌برداری حسابرسی مبتنی بر گراف، جمع‌آوری مدارک و ردیابی محدوده.',
            hi: 'ग्राफ-आधारित ऑडिट मैपिंग, साक्ष्य संग्रह और स्कोप ट्रैकिंग के माध्यम से CIS18, DORA, NIS2, ISO27000 अनुपालन में विशेषज्ञता।',
            ur: 'گراف پر مبنی آڈٹ ماپنگ، ثبوت اکٹھا کرنے اور دائرہ کار ٹریکنگ کے ذریعے CIS18، DORA، NIS2، ISO27000 کمپلائنس میں مہارت۔',
            fr: 'Spécialisé dans la conformité CIS18, DORA, NIS2, ISO27000 grâce au mapping d\'audit basé sur des graphes, collecte de preuves et suivi de portée.'
        },
        category: 'Cybersecurity'
        },
        {
        id: 'Audit',
        x: 100, y: 200, r: 30,
        labels: {
            en: 'Audit',
            da: 'Revision',
            es: 'Auditoría',
            zh: '审计',
            ja: '監査',
            de: 'Audit',
            ar: 'تدقيق',
            fa: 'حسابرسی',
            hi: 'ऑडिट',
            ur: 'آڈٹ',
            fr: 'Audit'
        },
        translations: {
            en: 'Design and execution of cybersecurity gap assessments, audits, control mappings, and remediation project documentation.',
            da: 'Design og udførelse af cybersikkerheds-gap-analyser, revisioner, kontrollkortlægninger og dokumentation af risikoreduktionsprojekter.',
            es: 'Diseño y ejecución de evaluaciones de brechas de ciberseguridad, auditorías, mapeos de controles y documentación de proyectos de remediación.',
            zh: '网络安全差距评估的设计与执行，包括审计、控制映射和修复项目文档编制。',
            ja: 'サイバーセキュリティギャップ評価の設計と実行、監査、コントロールマッピング、是正プロジェクト文書化を含む。',
            de: 'Entwurf und Durchführung von Cybersicherheits-Lückenanalysen, Audits, Kontrollzuordnungen und Sanierungsprojektdokumentation.',
            ar: 'تصميم وتنفيذ تقييمات فجوات الأمن السيبراني، والتدقيقات، وتعيين الضوابط، وتوثيق مشاريع المعالجة.',
            fa: 'طراحی و اجرای ارزیابی شکاف‌های امنیت سایبری، حسابرسی‌ها، نگاشت کنترل‌ها و مستندسازی پروژه‌های اصلاحی.',
            hi: 'साइबर सुरक्षा अंतराल मूल्यांकन, ऑडिट, नियंत्रण मानचित्रण और उपचार परियोजना प्रलेखन का डिज़ाइन एवं क्रियान्वयन।',
            ur: 'سائبر سیکیورٹی گیپ اسسمنٹس، آڈٹس، کنٹرول میپنگز اور اصلاحی پراجیکٹ دستاویزات کا ڈیزائن اور عملدرآمد۔',
            fr: 'Conception et exécution d\'évaluations des lacunes en cybersécurité, audits, cartographie des contrôles et documentation de projets de remédiation.'
        },
        category: 'Cybersecurity'
        },
        {
        id: 'Podcast',
        x: -100, y: -50, r: 30,
        labels: {
            en: 'Podcast',
            da: 'Podcast',
            es: 'Podcast',
            zh: '播客',
            ja: 'ポッドキャスト',
            de: 'Podcast',
            ar: 'بودكاست',
            fa: 'پادکست',
            hi: 'पॉडकास्ट',
            ur: 'پاڈکاسٹ',
            fr: 'Podcast'
        },
        translations: {
            en: 'Psychology podcast in Persian language focused on Jungian concepts such as archetypes, individuation, and culture through a depth psychology lens.',
            da: 'Psykologipodcast på persisk der fokuserer på jungianske koncepter som arketyper, individuation og kultur gennem et dybdepsykologisk perspektiv.',
            es: 'Podcast de psicología en persa centrado en conceptos junguianos como arquetipos, individuación y cultura a través de una lente de psicología profunda.',
            zh: '波斯语心理学播客，专注于荣格理论中的原型、个体化及文化概念，通过深度心理学视角探讨。',
            ja: 'ペルシャ語の心理学ポッドキャスト。ユング心理学のアーキタイプ、個体化、文化といった概念を深層心理学的な視点から探求します。',
            de: 'Psychologie-Podcast auf Persisch mit Fokus auf jungschen Konzepten wie Archetypen, Individuation und Kultur durch eine tiefenpsychologische Linse.',
            ar: 'بودكاست نفسي باللغة الفارسية يركز على مفاهيم يونغية مثل النماذج الأصلية، الفردانية والثقافة من خلال عدسة علم النفس العميق.',
            fa: 'پادکست روانشناسی به زبان فارسی با تمرکز بر مفاهیم یونگی مانند کهن‌الگوها، فردیت‌یابی و فرهنگ از طریق لنز روانشناسی عمقی.',
            hi: 'फारसी भाषा में मनोविज्ञान पॉडकास्ट जो गहन मनोविज्ञान के दृष्टिकोण से आदर्श, व्यक्तित्व-विकास और संस्कृति जैसे युंगियन अवधारणाओं पर केंद्रित है।',
            ur: 'فارسی زبان میں نفسیات پوڈکاسٹ جو گہری نفسیات کے عدسے کے ذریعے یونگین تصورات جیسے آرکیٹائپس، انفرادیات اور ثقافت پر مرکوز ہے۔',
            fr: 'Podcast de psychologie en persan axé sur les concepts jungiens tels que les archétypes, l\'individuation et la culture à travers une perspective de psychologie profonde.'
        },
        category: 'Contact'
        },
        {
        id: 'Vibe Coding',
        x: 150, y: -120, r: 30,
        labels: {
            en: 'Vibe Coding',
            da: 'Vibe Coding',
            es: 'Coding Vibe',
            zh: '氛围编程',
            ja: 'バイブコーディング',
            de: 'Vibe Coding',
            ar: 'برمجة الأجواء',
            fa: 'کدنویسی حسی',
            hi: 'वाइब कोडिंग',
            ur: 'وائب کوڈنگ',
            fr: 'Coding Vibe'
        },
        translations: {
            en: 'Creative coding and interface design with expressive elements, custom interactions, and unique structural logic that reflects thinking patterns.',
            da: 'Kreativ kodning og interface-design med ekspressive elementer, brugerdefinerede interaktioner og unik strukturel logik der reflekterer tankemønstre.',
            es: 'Programación creativa y diseño de interfaces con elementos expresivos, interacciones personalizadas y lógica estructural única que refleja patrones de pensamiento.',
            zh: '创意编程与界面设计，包含表现性元素、自定义交互及反映思维模式的独特结构逻辑。',
            ja: '思考パターンを反映した表現力豊かな要素、カスタムインタラクション、独自の構造ロジックを備えたクリエイティブコーディングとインターフェースデザイン。',
            de: 'Kreatives Programmieren und Interface-Design mit ausdrucksstarken Elementen, maßgeschneiderten Interaktionen und einzigartiger struktureller Logik, die Denkmuster widerspiegelt.',
            ar: 'البرمجة الإبداعية وتصميم الواجهات مع عناصر تعبيرية، تفاعلات مخصصة، ومنطق هيكلي فريد يعكس أنماط التفكير.',
            fa: 'برنامه‌نویسی خلاق و طراحی رابط با المان‌های بیانی، تعاملات سفارشی و منطق ساختاری منحصر به فرد که الگوهای تفکر را بازتاب می‌دهد.',
            hi: 'सृजनात्मक कोडिंग और इंटरफ़ेस डिज़ाइन जिसमें अभिव्यंजक तत्व, कस्टम इंटरैक्शन और अद्वितीय संरचनात्मक तर्क शामिल हैं जो सोच के पैटर्न को दर्शाते हैं।',
            ur: 'تخلیقی کوڈنگ اور انٹرفیس ڈیزائن جس میں اظہاری عناصر، حسب ضرورت تعاملات اور منفرد ساختی منطق شامل ہے جو سوچ کے نمونوں کو عکس انداز کرتی ہے۔',
            fr: 'Programmation créative et conception d\'interface avec des éléments expressifs, des interactions personnalisées et une logique structurelle unique reflétant les schémas de pensée.'
        },
        category: 'Software'
    },
    {
        id: 'Website Builder',
        x: -180, y: -120, r: 30,
        labels: {
            en: 'Website Builder',
            da: 'Websted Builder',
            es: 'Creador de Sitios',
            zh: '网站构建器',
            ja: 'ウェブサイトビルダー',
            de: 'Website-Ersteller',
            ar: 'منشئ المواقع',
            fa: 'سازنده وب‌سایت',
            hi: 'वेबसाइट बिल्डर',
            ur: 'ویب سائٹ بلڈر',
            fr: 'Créateur de Sites'
        },
        translations: {
            en: 'Fast and professional website creation - from simple visit cards to complete business websites. Modern design, mobile-friendly, with easy updates and no technical knowledge required.',
            da: 'Hurtig og professionel hjemmesideudvikling - fra simple visitkort til komplette forretningshjemmesider. Moderne design, mobilvenlig, med nemme opdateringer og uden behov for teknisk viden.',
            es: 'Creación de sitios web rápida y profesional - desde simples tarjetas de visita hasta completos sitios web empresariales. Diseño moderno, compatible con dispositivos móviles, con actualizaciones sencillas y sin necesidad de conocimientos técnicos.',
            zh: '快速专业的网站创建 - 从简单的名片网站到完整的商业网站。现代设计，移动友好，易于更新，无需技术知识。',
            ja: '迅速かつプロフェッショナルなウェブサイト制作 - シンプルな名刺サイトから完全なビジネスウェブサイトまで。モダンなデザイン、モバイル対応、簡単な更新、技術的な知識は不要。',
            de: 'Schnelle und professionelle Website-Erstellung - von einfachen Visitenkarten bis hin zu kompletten Unternehmenswebsites. Modernes Design, mobilfreundlich, mit einfachen Aktualisierungen und ohne technische Kenntnisse erforderlich.',
            ar: 'إنشاء مواقع ويب سريع واحترافي - من بطاقات زيارة بسيطة إلى مواقع ويب تجارية كاملة. تصميم حديث، متوافق مع الجوال، مع تحديثات سهلة ودون الحاجة إلى معرفة تقنية.',
            fa: 'ایجاد سریع و حرفه‌ای وب‌سایت - از کارت‌های ویزیت ساده تا وب‌سایت‌های کامل تجاری. طراحی مدرن، سازگار با موبایل، با به‌روزرسانی‌های آسان و بدون نیاز به دانش فنی.',
            hi: 'तेज़ और पेशेवर वेबसाइट निर्माण - सरल विज़िट कार्ड से लेकर पूर्ण व्यापारिक वेबसाइट तक। आधुनिक डिज़ाइन, मोबाइल-अनुकूल, आसान अपडेट के साथ और बिना तकनीकी ज्ञान की आवश्यकता।',
            ur: 'تیز اور پیشہ ورانہ ویب سائٹ تخلیق - سادہ وزٹ کارڈز سے مکمل کاروباری ویب سائٹس تک۔ جدید ڈیزائن، موبائل دوستانہ، آسان اپڈیٹس کے ساتھ اور کسی تکنیکی علم کی ضرورت نہیں۔',
            fr: 'Création de sites web rapide et professionnelle - des simples cartes de visite aux sites d\'entreprise complets. Design moderne, compatible mobile, avec mises à jour faciles et sans connaissance technique requise.'
        },
        category: 'Software'
    },
];

console.log('Nodes defined:', nodes.length);

// Define links between nodes
const links = [
    // Main branches from center
    ['cocode.dk', 'Software'],
    ['cocode.dk', 'Cybersecurity'],
    ['cocode.dk', 'Clients'],
    ['cocode.dk', 'Contact'],

    // Software connections
    ['Software', 'Python'],
    ['Software', 'Django'],
    ['Software', 'Neo4j'],
    ['Software', 'AI Integrations'],
    ['Software', 'AI Wrappers'],
    ['Software', 'Vibe Coding'],
    ['Software', 'Website Builder'],

    // Cybersecurity connections
    ['Cybersecurity', 'Compliance'],
    ['Cybersecurity', 'Audit'],

    // Other connections
    ['Contact', 'Podcast'],
    ['Clients', 'Website Builder']
];

console.log('Links defined:', links.length);

// Add at the top of the script
let animationState = {
    active: false,
    currentInterval: null,
    queue: []
};

// Add this near the top of your script
let currentLanguage = 'en';

// Updated language change function
function setLanguage(lang) {
    // Update currentLanguage
    currentLanguage = lang;

    // Update active class and ARIA attributes
    const langItems = document.querySelectorAll('.lang-item');
    langItems.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');

    if (item.dataset.lang === lang) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
    }
    });

    // Set RTL direction for Arabic, Persian, and Urdu
    if (lang === 'ar' || lang === 'fa' || lang === 'ur') {
    infoBox.setAttribute('dir', 'rtl');
    } else {
    infoBox.setAttribute('dir', 'ltr');
    }

    // Update infoBox if it's visible
    if (infoBox.style.display === 'block' && hoveredNode) {
    infoBox.innerHTML = '';
    applyTextEffect(hoveredNode.translations[currentLanguage], infoBox);
    }

    // Redraw graph
    drawGraph();

    // Auto-hide the language menu in responsive mode
    if (window.innerWidth <= 768) {
        const langMenu = document.getElementById('languageSelector');
        const langToggle = document.getElementById('langToggle');

        // Add a small delay to allow the user to see their selection first
        setTimeout(() => {
            // Hide menu with slide-out animation
            langMenu.classList.remove('active');

            // Update aria-expanded attribute
            langToggle.setAttribute('aria-expanded', 'false');

            // Remove keyboard listener for escape key
            document.removeEventListener('keydown', closeMenuOnEscape);

            // Add a brief confirmation message
            const confirmation = document.createElement('div');
            confirmation.className = 'lang-confirmation';

            // Find the active language item to get the correct language code
            const activeItem = document.querySelector('.lang-item.active');
            const langCode = activeItem ? activeItem.querySelector('.lang-code').textContent : lang.toUpperCase();

            confirmation.textContent = 'Language set to ' + langCode;
            document.body.appendChild(confirmation);

            // Fade in the confirmation
            setTimeout(() => {
                confirmation.style.opacity = '1';
            }, 10);

            // Remove after 2 seconds
            setTimeout(() => {
                confirmation.style.opacity = '0';
                setTimeout(() => {
                    if (confirmation.parentNode) {
                        document.body.removeChild(confirmation);
                    }
                }, 300);
            }, 2000);
        }, 300);
    }
}

// Handle keyboard navigation for language selector
function handleLanguageKeydown(event, lang) {
    // Enter or Space key
    if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    setLanguage(lang);
    }

    // Arrow Up/Down for navigation
    else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();

    const langItems = Array.from(document.querySelectorAll('.lang-item'));
    const currentIndex = langItems.findIndex(item => item.dataset.lang === lang);
    let nextIndex;

    if (event.key === 'ArrowUp') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : langItems.length - 1;
    } else {
        nextIndex = currentIndex < langItems.length - 1 ? currentIndex + 1 : 0;
    }

    langItems[nextIndex].focus();
    }
}

// Helper function to resize canvas and maintain centering
function resizeCanvas() {
    console.log('Resizing canvas to window size:', window.innerWidth, 'x', window.innerHeight);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    debug.textContent = `Canvas size: ${canvas.width} x ${canvas.height}`;
    centerGraph();
    drawGraph();
}

// Function to calculate text width and adjust node radius if needed
function calculateNodeRadius(node) {
    ctx.font = '12px sans-serif';

    // Get the appropriate text to measure based on the current language
    const nodeText = (node.labels && node.labels[currentLanguage]) ? node.labels[currentLanguage] : node.id;

    const textWidth = ctx.measureText(nodeText).width;
    // Ensure radius is at least wide enough to contain text plus padding
    return Math.max(node.r, (textWidth / 2) + 15);
}

// Function to center the graph in the canvas
function centerGraph() {
    console.log('Centering graph');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    nodes.forEach(node => {
    // Store original position as offsets from center
    if (!node.hasOwnProperty('offsetX')) {
        node.offsetX = node.x;
        node.offsetY = node.y;
    }

    // Update position based on canvas center
    node.x = centerX + node.offsetX;
    node.y = centerY + node.offsetY;

    // Ensure radius is appropriate for text
    node.r = calculateNodeRadius(node);
    });

    // Log the position of the central node
    const centralNode = nodes.find(n => n.id === 'cocode.dk');
    if (centralNode) {
    console.log('Central node position:', centralNode.x, centralNode.y);
    debug.textContent += `\nCenter node: ${centralNode.x.toFixed(0)},${centralNode.y.toFixed(0)}`;
    }
}

// Function to draw a node
function drawNode(node) {
    // Determine if this node is hovered or selected
    const isHovered = (hoveredNode === node);
    const isSelected = (lastClickedNode && node.id === lastClickedNode.id);
    const shouldGlow = isHovered || isSelected;

    // Determine colors based on node state and category
    let fillColor, strokeColor, textColor;

    if (isHovered) {
        // Use category-specific hover colors
        if (categoryHoverColors[node.category]) {
            fillColor = categoryHoverColors[node.category].fill;
            strokeColor = categoryHoverColors[node.category].stroke;
            textColor = categoryHoverColors[node.category].text;
        } else {
            fillColor = colors.hover.fill;
            strokeColor = colors.hover.stroke;
            textColor = colors.hover.text;
        }
    } else if (colors.categories[node.category]) {
        fillColor = colors.categories[node.category].fill;
        strokeColor = colors.categories[node.category].stroke;
        textColor = colors.categories[node.category].text;
    } else {
        fillColor = colors.default.fill;
        strokeColor = colors.default.stroke;
        textColor = colors.default.text;
    }

    // Apply glow effect if node should glow
    if (shouldGlow) {
        ctx.shadowBlur = isSelected ? 15 : 10;
        ctx.shadowColor = strokeColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    } else {
        // Reset shadow
        ctx.shadowBlur = 0;
    }

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isHovered ? 2 : 1;
    ctx.stroke();

    // Reset shadow for text drawing to prevent text glow
    ctx.shadowBlur = 0;

    // Draw node text inside the circle in the selected language
    // If no label exists for the language, fall back to the node ID
    ctx.fillStyle = textColor;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Use node.labels[currentLanguage] if it exists, otherwise use node.id
    const nodeText = (node.labels && node.labels[currentLanguage]) ? node.labels[currentLanguage] : node.id;
    ctx.fillText(nodeText, node.x, node.y);
}

// Function to draw a link between nodes
function drawLink(from, to) {
    if (!from || !to) {
    console.error('Missing node in link', from, to);
    return;
    }

    // Determine if this link should glow
    const isConnectedToHovered = (hoveredNode && (from.id === hoveredNode.id || to.id === hoveredNode.id));
    const isConnectedToSelected = (lastClickedNode && (from.id === lastClickedNode.id || to.id === lastClickedNode.id));
    const shouldGlow = isConnectedToHovered || isConnectedToSelected;

    // Apply glow effect if the link should glow
    if (shouldGlow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = isConnectedToHovered ? '#aaa' : '#888';
        ctx.lineWidth = 2;
    } else {
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1;
    }

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = shouldGlow ? '#777' : '#555';
    ctx.stroke();

    // Reset shadow after drawing
    ctx.shadowBlur = 0;
}

// Function to draw the entire graph
function drawGraph() {
  console.log('Drawing graph');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apply any active animations to node positions
  if (nodeAnimationSystem && typeof nodeAnimationSystem.updateNodePositions === 'function') {
    nodeAnimationSystem.updateNodePositions(nodes);
  }

  // Draw links first (so they appear behind nodes)
  links.forEach(link => {
    const from = nodes.find(n => n.id === link[0]);
    const to = nodes.find(n => n.id === link[1]);

    if (!from || !to) {
      console.error('Could not find nodes for link:', link);
      return;
    }

    drawLink(from, to);
  });

  // Draw nodes on top
  nodes.forEach(drawNode);

  console.log('Graph drawn');
}

// Function to find a node under the mouse cursor
function getMouseNode(mx, my) {
    return nodes.find(node => {
    const dx = mx - node.x;
    const dy = my - node.y;
    return dx * dx + dy * dy < node.r * node.r;
    });
}

// Modified applyTextEffect
function applyTextEffect(newText, element) {
    // Queue system unchanged
    if (animationState.active) {
    animationState.queue.push(newText);
    element.style.cursor = 'progress';
    return;
    }

    animationState.active = true;

    // Create containers for new content (prepend instead of replace)
    const entryContainer = document.createElement('div');
    const header = document.createElement('div');
    header.className = 'new-entry';

    // Prepend to element (instead of clearing first)
    element.prepend(entryContainer);
    entryContainer.appendChild(header);

    let index = 0;
    animationState.currentInterval = setInterval(() => {
    if (index < newText.length) {
        header.textContent = newText.substring(0, index) +
                        String.fromCharCode(33 + Math.floor(Math.random() * 94));
        index++;
    } else {
        clearInterval(animationState.currentInterval);
        header.textContent = newText;
        // Add separator
        const separator = document.createElement('div');
        separator.className = 'entry-separator';
        entryContainer.appendChild(separator);

        // Process queue
        animationState.active = false;
        if (animationState.queue.length > 0) {
        applyTextEffect(animationState.queue.shift(), element);
        }
        element.style.cursor = 'default';

        // Mark previous entries
        Array.from(element.querySelectorAll('.new-entry')).forEach(el => {
        if (el !== header) el.classList.add('old-entry');
        });

        // Check if we need to remove old entries after adding new content
        checkInfoBoxHeight();
    }
    }, 10);
}

// Mouse move event handler
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  // Find node under cursor
  const nodeUnderCursor = getMouseNode(mx, my);

  // Handle hover effects
  if (nodeUnderCursor) {
    // Set hover state
    if (hoveredNode !== nodeUnderCursor) {
      hoveredNode = nodeUnderCursor;
      drawGraph(); // Redraw with hover effect
    }
  } else {
    // Reset hover state
    if (hoveredNode !== null) {
      hoveredNode = null;
      drawGraph(); // Redraw without hover effect
    }
  }
});

// Click event handler
canvas.addEventListener('click', (e) => {
    if (animationState.active) {
      infoBox.classList.add('busy');
      setTimeout(() => infoBox.classList.remove('busy'), 200);
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const clicked = getMouseNode(mx, my);
    if (clicked) {
      // Track selected node for glow effect
      lastClickedNode = clicked;

      // Special handling for Contact node
      if (clicked.id === 'Contact') {
        // The modal handling is done in contact-modal.js
        // Just update the glow effect here
        drawGraph();
        return;
      }

      // Show info box
      infoBox.style.display = 'block';

      // Ensure infoBox is positioned correctly based on responsive mode
      adjustInfoBoxPosition();

      // Clear previous content before adding new text
      applyTextEffect(clicked.translations[currentLanguage], infoBox);

      // Get the node text in current language for debug output
      const nodeText = (clicked.labels && clicked.labels[currentLanguage])
        ? clicked.labels[currentLanguage]
        : clicked.id;

      debug.textContent += `\nClicked: ${nodeText}`;
    } else {
      // Clear selection when clicking empty space
      lastClickedNode = null;
      infoBox.style.display = 'none';
    }

    // Redraw to show selection glow
    drawGraph();
});

// Function to adjust infoBox position based on screen size
function adjustInfoBoxPosition() {
  // Get the current window width
  const windowWidth = window.innerWidth;

  // No need to adjust position if styles already handle it via CSS
  // This function is just to ensure any dynamic positioning needed
  // For example, we could calculate exact positions based on title container height:

  if (windowWidth <= 480) {
    // Very small screens - position is managed by CSS but we could add special handling here
    checkInfoBoxOverlap(); // Check for any overlap with nodes
  } else if (windowWidth <= 768) {
    // Medium mobile screens
    checkInfoBoxOverlap();
  } else {
    // Desktop - standard position
    checkInfoBoxOverlap();
  }
}

// Window resize handler
window.addEventListener('resize', function() {
  resizeCanvas();

  // If infoBox is visible, adjust its position
  if (infoBox.style.display === 'block') {
    adjustInfoBoxPosition();
  }
});

// Initialize language menu toggle for mobile
document.getElementById('langToggle').addEventListener('click', function() {
    const menu = document.getElementById('languageSelector');
    menu.classList.toggle('active');

    // Toggle aria-expanded attribute
    const expanded = menu.classList.contains('active');
    this.setAttribute('aria-expanded', expanded);

    // Add tooltip effect
    if (expanded) {
      const tooltip = document.createElement('div');
      tooltip.className = 'lang-tooltip';
      tooltip.textContent = 'Choose your language';
      tooltip.style.position = 'fixed';
      tooltip.style.top = (this.getBoundingClientRect().bottom + 10) + 'px';
      tooltip.style.right = '20px';
      tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '8px 12px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '14px';
      tooltip.style.zIndex = '1002';
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.3s ease';
      document.body.appendChild(tooltip);

      // Fade in tooltip
      setTimeout(() => {
        tooltip.style.opacity = '1';
      }, 10);

      // Remove tooltip after 3 seconds
      setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
          if (tooltip.parentNode) {
            document.body.removeChild(tooltip);
          }
        }, 300);
      }, 3000);
    }

    // Add escape key listener when menu is open
    if (expanded) {
      document.addEventListener('keydown', closeMenuOnEscape);
    } else {
      document.removeEventListener('keydown', closeMenuOnEscape);
    }
});

// Function to close menu on Escape key
function closeMenuOnEscape(e) {
    if (e.key === 'Escape') {
    const menu = document.getElementById('languageSelector');
    menu.classList.remove('active');
    document.getElementById('langToggle').setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', closeMenuOnEscape);
    }
}

// Initial rendering
console.log('Starting initial rendering');
resizeCanvas();

// Force a redraw after a short delay to ensure canvas is properly sized
setTimeout(() => {
    console.log('Forced redraw after timeout');
    resizeCanvas();
}, 100);

// Matrix title animation
function animateMatrixTitle() {
    const title = document.getElementById('site-title');
    const originalText = "Cocode.dk";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let interval;
    let position = 0;

    // Initialize with scrambled text
    let currentText = originalText.split('').map(() =>
    chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');

    title.textContent = currentText;

    interval = setInterval(() => {
    let updated = currentText.split('');

    if (position < originalText.length) {
        // Gradually reveal the correct characters
        updated[position] = originalText[position];
        position++;
    } else {
        // Randomly change one character occasionally for ongoing effect
        if (Math.random() < 0.2) {
        const randomPos = Math.floor(Math.random() * originalText.length);
        updated[randomPos] = chars.charAt(Math.floor(Math.random() * chars.length));

        // Reset it after a brief pause
        setTimeout(() => {
            let reset = title.textContent.split('');
            reset[randomPos] = originalText[randomPos];
            title.textContent = reset.join('');
        }, 100);
        }
    }

    currentText = updated.join('');
    title.textContent = currentText;
    }, 100);
}

// Start the Matrix title animation
animateMatrixTitle();

// Add after node definitions
function checkInfoBoxOverlap() {
    const infoBoxRect = infoBox.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    // Check overlap with any node
    const overlap = nodes.some(node => {
    const nodeX = canvasRect.left + node.x - (node.r * 2);
    const nodeY = canvasRect.top + node.y;
    const nodeRight = nodeX + node.r;
    const nodeBottom = nodeY + node.r;

    return (
        nodeX < infoBoxRect.right &&
        nodeRight > infoBoxRect.left &&
        nodeY < infoBoxRect.bottom &&
        nodeBottom > infoBoxRect.top
    );
    });

    infoBox.classList.toggle('canvas-overlap', overlap);
    return overlap;
}

function checkInfoBoxHeight() {
    const infoBoxRect = infoBox.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    let entriesRemoved = 0;

    // Continue removing oldest entries until box is at safe distance from bottom
    // or until we have only a minimum number of entries left
    while (infoBoxRect.bottom > viewportHeight - 50 &&
            infoBox.children.length > 2 && // Keep at least 1 entry and its separator
            entriesRemoved < 5) { // Safety limit to prevent infinite loop

    // Remove oldest entry (last child element) - usually a separator
    infoBox.removeChild(infoBox.lastElementChild);

    // If there's still content, also remove the entry itself
    if (infoBox.lastElementChild) {
        infoBox.removeChild(infoBox.lastElementChild);
    }

    entriesRemoved++;

    // Get updated position
    infoBoxRect = infoBox.getBoundingClientRect();
    }

    if (entriesRemoved > 0) {
    console.log(`Removed ${entriesRemoved} old entries from infoBox`);
    }
}

// Create ResizeObserver for infoBox
const resizeObserver = new ResizeObserver(entries => {
    checkInfoBoxHeight(); // New height check
    if (checkInfoBoxOverlap()) {
    infoBox.classList.add('canvas-overlap');
    } else {
    infoBox.classList.remove('canvas-overlap');
    }
});

resizeObserver.observe(infoBox);

// Add initial check
setTimeout(() => checkInfoBoxOverlap(), 100);

// Add scroll event listener to check infoBox height
window.addEventListener('scroll', () => {
    if (infoBox.style.display === 'block') {
    checkInfoBoxHeight();
    }
});

// Add scroll effect for header
window.addEventListener('scroll', function() {
  const headerContainer = document.querySelector('.header-container');
  const scrollPos = window.scrollY;

  if (scrollPos > 50) {
    headerContainer.style.background = 'linear-gradient(to bottom, rgba(20, 10, 30, 0.9), rgba(20, 10, 30, 0.7))';
    headerContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  } else {
    headerContainer.style.background = 'linear-gradient(to bottom, rgba(20, 10, 30, 0.7), transparent)';
    headerContainer.style.boxShadow = 'none';
  }
});

// Add responsive position handling for language toggle
function updateTogglePosition() {
  const langToggle = document.getElementById('langToggle');
  const isLandscape = window.innerWidth > window.innerHeight;
  const isMobile = window.innerWidth <= 768;
  const scrollPosition = window.scrollY;

  // Default position
  let topPosition = '20px';
  let rightPosition = '20px';

  if (isMobile) {
    if (isLandscape) {
      // In landscape mobile, position in bottom right
      topPosition = 'auto';
      langToggle.style.bottom = '20px';
    } else {
      // In portrait mobile, adjust based on scroll
      if (scrollPosition > 100) {
        // When scrolled down, move to bottom right for easier access
        topPosition = 'auto';
        langToggle.style.bottom = '20px';
      } else {
        // When at top, position in top right
        topPosition = '15px';
        langToggle.style.bottom = 'auto';
      }
    }

    // Add floating animation when repositioned to bottom
    if (langToggle.style.bottom && langToggle.style.bottom !== 'auto') {
      langToggle.classList.add('floating');
    } else {
      langToggle.classList.remove('floating');
    }
  } else {
    // On desktop, keep in top right
    topPosition = '20px';
    langToggle.style.bottom = 'auto';
    langToggle.classList.remove('floating');
  }

  langToggle.style.top = topPosition;
  langToggle.style.right = rightPosition;
}

// Listen for changes that would affect position
window.addEventListener('resize', updateTogglePosition);
window.addEventListener('scroll', updateTogglePosition);
window.addEventListener('orientationchange', updateTogglePosition);

// Initialize position
document.addEventListener('DOMContentLoaded', function() {
  updateTogglePosition();
});
