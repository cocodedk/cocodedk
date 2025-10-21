/*
 * Nodes.js - Definition of nodes, links and related data for the cocode.dk visualization
 */

/**
 * @typedef {Object} HoverColors
 * @property {string} fill - Fill color
 * @property {string} stroke - Stroke color
 * @property {string} text - Text color
 */

/**
 * Custom window properties for graph visualization
 * @type {Object}
 * @property {Array} window.nodes - Array of node objects
 * @property {Object.<string, HoverColors>} window.categoryHoverColors - Colors for different node categories
 */

// Category-specific hover colors
window.categoryHoverColors = {
//   'cocode.dk': { fill: '#0077aa', stroke: '#33eeff', text: '#ffffff' },
//   'Software': { fill: '#1188ee', stroke: '#66ffff', text: '#ffffff' },
//   'Cybersecurity': { fill: '#ee0055', stroke: '#ff99aa', text: '#ffffff' },
//   'Clients': { fill: '#ffaa00', stroke: '#ffdd55', text: '#000000' },
//   'Contact': { fill: '#f7dc6f', stroke: '#f5b041', text: '#000000' },
//   'GitHub': { fill: '#161b22', stroke: '#f0f6fc', text: '#ffffff' },
//   'Flask': { fill: '#000000', stroke: '#ffffff', text: '#ffffff' },
//   'TypeScript': { fill: '#3178c6', stroke: '#5ba0f2', text: '#ffffff' },
//   'LinkedIn': { fill: '#0a66c2', stroke: '#378fe9', text: '#ffffff' }
};

// Define nodes with updated structure
window.nodes = [
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
            hi: 'पायथन का उपयोग करके बैकेंड स्वचालन, एपीआई विकास, स्क्रिप्टिंग और डेटा प्रसंस्करण — मजबूत डिजिटल बुनियादी ढांचे के लिए मुख्य भाषा।',
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
        category: 'Software',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yMCA4MEMyMCA4NS41MjI4IDI0LjQ3NzIgOTAgMzAgOTBINzBDNzUuNTIyOCA5MCA4MCA4NS41MjI4IDgwIDgwVjIwQzgwIDE0LjQ3NzIgNzUuNTIyOCAxMCA3MCAxMEgzMEMyNC40NzcyIDEwIDIwIDE0LjQ3NzIgMjAgMjBWODBaIiBmaWxsPSIjMDkyRTIwIi8+CjxwYXRoIGQ9Ik0zMCAyNUg3MFYzNUgzMFYyNVoiIGZpbGw9IiM0NEI3OEIiLz4KPHA+dGggZD0iTTMwIDQ1SDcwVjU1SDMwVjQ1WiIgZmlsbD0iIzQ0Qjc4QiIvPgo8cGF0aCBkPSJNMzAgNjVINzBWNzVIMzBWNjVaIiBmaWxsPSIjNDRCNzhCIi8+CjxwYXRoIGQ9Ik0zNSAzMEg0MFY3MEgzNVYzMFoiIGZpbGw9IiM0NEI3OEIiLz4KPHA+dGggZD0iTTQ1IDMwSDUwVjcwSDQ1VjMwWiIgZmlsbD0iIzQ0Qjc4QiIvPgo8cGF0aCBkPSJNNTUgMzBINjBWNzBINTVWMzBaIiBmaWxsPSIjNDRCNzhCIi8+CjxwYXRoIGQ9Ik02NSAzMEg3MFY3MEg2NVYzMFoiIGZpbGw9IiM0NEI3OEIiLz4KPC9zdmc+'
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
            ur: 'انفراسٹرکچر، اثاثوں، نظاموں اور تعلقات کی نقشہ کشی کے لیے گراف ڈیٹا بیس کی مہارت۔ CMDB ماڈلنگ اور کنٹرول ٹریکنگ کے ذریعے CIS18، DORA، NIS2، ISO27000 کمپلائنس میں مہارت۔',
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
        x: -140, y: -130, r: 30,
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
    {
        id: 'GitHub',
        x: -180, y: -80, r: 35,
        labels: {
            en: 'GitHub',
            da: 'GitHub',
            es: 'GitHub',
            zh: 'GitHub',
            ja: 'GitHub',
            de: 'GitHub',
            ar: 'GitHub',
            fa: 'GitHub',
            hi: 'GitHub',
            ur: 'GitHub',
            fr: 'GitHub'
        },
        translations: {
            en: 'Open source projects and code repositories including YouTube audio extractor, WhisperFrame AI toolkit, code scanner MCP server, and various development tools. Visit @cocodedk on GitHub.',
            da: 'Open source-projekter og kodelagre inklusive YouTube-lydudtrækker, WhisperFrame AI-værktøjssæt, kodescanner MCP-server og forskellige udviklingsværktøjer. Besøg @cocodedk på GitHub.',
            es: 'Proyectos de código abierto y repositorios de código incluyendo extractor de audio de YouTube, kit de herramientas AI WhisperFrame, servidor MCP de escáner de código y varias herramientas de desarrollo. Visita @cocodedk en GitHub.',
            zh: '开源项目和代码仓库，包括YouTube音频提取器、WhisperFrame AI工具包、代码扫描器MCP服务器以及各种开发工具。访问GitHub上的@cocodedk。',
            ja: 'YouTube音声抽出器、WhisperFrame AIツールキット、コードスキャナーMCPサーバー、その他の開発ツールを含むオープンソースプロジェクトとコードリポジトリ。GitHubの@cocodedkをご覧ください。',
            de: 'Open-Source-Projekte und Code-Repositories einschließlich YouTube-Audio-Extraktor, WhisperFrame AI-Toolkit, Code-Scanner MCP-Server und verschiedene Entwicklungstools. Besuchen Sie @cocodedk auf GitHub.',
            ar: 'مشاريع مفتوحة المصدر ومستودعات الكود بما في ذلك مستخرج الصوت من YouTube، مجموعة أدوات WhisperFrame AI، خادم MCP لماسح الكود، وأدوات تطوير متنوعة. قم بزيارة @cocodedk على GitHub.',
            fa: 'پروژه‌های متن‌باز و مخازن کد شامل استخراج‌کننده صوتی یوتیوب، جعبه‌ابزار هوش مصنوعی WhisperFrame، سرور MCP اسکنر کد و ابزارهای توسعه مختلف. از @cocodedk در GitHub بازدید کنید.',
            hi: 'ओपन सोर्स प्रोजेक्ट्स और कोड रिपॉजिटरी जिसमें YouTube ऑडियो एक्सट्रैक्टर, WhisperFrame AI टूलकिट, कोड स्कैनर MCP सर्वर और विभिन्न डेवलपमेंट टूल्स शामिल हैं। GitHub पर @cocodedk पर जाएं।',
            ur: 'اوپن سورس پراجیکٹس اور کوڈ ریپازٹریز بشمول YouTube آڈیو ایکسٹریکٹر، WhisperFrame AI ٹول کٹ، کوڈ سکینر MCP سرور اور مختلف ڈیولپمنٹ ٹولز۔ GitHub پر @cocodedk ملاحظہ کریں۔',
            fr: 'Projets open source et dépôts de code incluant l\'extracteur audio YouTube, la boîte à outils AI WhisperFrame, le serveur MCP de scanner de code et divers outils de développement. Visitez @cocodedk sur GitHub.'
        },
        category: 'GitHub',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTgiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5OCA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OC44NTQgMEM3My4zNjcgMCA5My4zNjcgMjAuMDM2IDkzLjM2NyA0NC43NTFDOTMuMzY3IDY0LjU1NCA4MC4zMjkgODAuODIyIDYyLjQ4NyA4Ni42OTdDNjAuMzc1IDg3LjEwMSA1OS41NzEgODUuNzY4IDU5LjU3MSA4NC42NjhDNTkuNTcxIDgzLjcwNSA1OS42MDggNzguNzY4IDU5LjYwOCA3My4yNjhDNTkuNjA4IDY5LjE1IDU4LjI3NSA2Ni4zMTggNTYuNzI5IDY0LjgzNkM2My4wNzUgNjQuMTMyIDY5Ljk0NiA2MS42MzYgNjkuOTQ2IDQ5LjUyMkM2OS45NDYgNDYuMTk5IDY4LjY4NyA0My41ODUgNjYuNjE2IDQxLjY1OUM2Ni45ODMgNDAuOTU1IDY3Ljk0NiAzNy4zOTYgNjYuMjUgMzIuNzU5QzY2LjI1IDMyLjc1OSA2My43NTQgMzEuOTU1IDU5LjY0NSAzNC43ODdDNTcuNjM3IDM0LjE5NCA1NS40NjMgMzMuODk3IDUzLjI1IDMzLjg5N0M1MS4wMzcgMzMuODk3IDQ4Ljg2MyAzNC4xOTQgNDYuODU1IDM0Ljc4N0M0Mi43NDYgMzEuOTU1IDQwLjI1IDMyLjc1OSA0MC4yNSAzMi43NTlDMzguNTU0IDM3LjM5NiAzOS41MTcgNDAuOTU1IDM5Ljg4NCA0MS42NTlDMzcuODEzIDQzLjU4NSAzNi41NTQgNDYuMTk5IDM2LjU1NCA0OS41MjJDMzYuNTU0IDYxLjU5OSA0My4zODggNjQuMTMyIDQ5LjczNCA2NC44MzZDNDguNTUgNjYuMDU5IDQ3LjQ4NCA2OC4zNTUgNDcuMTkgNzEuNzQxQzQ0LjU0NCA3My4xNzggNDAuNTM1IDc0LjM2NCAzNi4yODcgNjcuNzc4QzM2LjI4NyA2Ny43NzggMzMuOTc5IDYzLjc0MSAyOS40NzkgNjMuNzQxQzI5LjQ3OSA2My43NDEgMjQuNzk3IDYzLjc3OCAyOC45NDMgNjcuMDM3QzI4Ljk0MyA2Ny4wMzcgMzEuOTk3IDY4LjU1NSAzMy42OTMgNzMuNTkyQzMzLjY5MyA3My41OTIgMzYuMjUgODEuNTkyIDQ3LjExNCA3OC44NkM0Ny4xNTEgODIuMjQ2IDQ3LjE4OCA4NS4zMzIgNDcuMTg4IDg0LjY2OEM0Ny4xODggODUuNzY4IDQ2LjM4NCA4Ny4xMDEgNDQuMjcyIDg2LjY5N0MyNi40MyA4MC44MjIgMTMuMzkyIDY0LjU1NCAxMy4zOTIgNDQuNzUxQzEzLjM5MiAyMC4wMzYgMzMuMzkyIDAgNDguODU0IDBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K'
    },
    {
        id: 'Flask',
        x: -75, y: -50, r: 35,
        labels: {
            en: 'Flask',
            da: 'Flask',
            es: 'Flask',
            zh: 'Flask',
            ja: 'Flask',
            de: 'Flask',
            ar: 'Flask',
            fa: 'Flask',
            hi: 'Flask',
            ur: 'Flask',
            fr: 'Flask'
        },
        translations: {
            en: 'Flask is a lightweight WSGI web application framework in Python. Used for building scalable web applications, REST APIs, and microservices with minimal boilerplate code.',
            da: 'Flask er et letvægts WSGI webapplikationsframework i Python. Bruges til at bygge skalerbare webapplikationer, REST API\'er og mikroservices med minimal boilerplate-kode.',
            es: 'Flask es un framework de aplicaciones web WSGI ligero en Python. Utilizado para construir aplicaciones web escalables, APIs REST y microservicios con código repetitivo mínimo.',
            zh: 'Flask是Python中的轻量级WSGI Web应用程序框架。用于构建可扩展的Web应用程序、REST API和微服务，具有最少的样板代码。',
            ja: 'FlaskはPythonの軽量WSGIウェブアプリケーションフレームワークです。最小限のボイラープレートコードでスケーラブルなウェブアプリケーション、REST API、マイクロサービスの構築に使用されます。',
            de: 'Flask ist ein leichtgewichtiges WSGI-Webanwendungsframework in Python. Wird zum Erstellen skalierbarer Webanwendungen, REST-APIs und Microservices mit minimalem Boilerplate-Code verwendet.',
            ar: 'Flask هو إطار عمل تطبيقات ويب WSGI خفيف الوزن في Python. يُستخدم لبناء تطبيقات ويب قابلة للتوسع وواجهات برمجة تطبيقات REST والخدمات المصغرة بأقل قدر من الكود النموذجي.',
            fa: 'Flask یک چارچوب برنامه‌های وب WSGI سبک در Python است. برای ساخت برنامه‌های وب مقیاس‌پذیر، API های REST و میکروسرویس‌ها با حداقل کد تکراری استفاده می‌شود.',
            hi: 'Flask Python में एक हल्का WSGI वेब एप्लिकेशन फ्रेमवर्क है। न्यूनतम बॉयलरप्लेट कोड के साथ स्केलेबल वेब एप्लिकेशन, REST API और माइक्रोसर्विसेज बनाने के लिए उपयोग किया जाता है।',
            ur: 'Flask Python میں ایک ہلکا WSGI ویب ایپلیکیشن فریم ورک ہے۔ کم سے کم بوائلرپلیٹ کوڈ کے ساتھ اسکیلیبل ویب ایپلیکیشنز، REST APIs اور مائیکرو سروسز بنانے کے لیے استعمال ہوتا ہے۔',
            fr: 'Flask est un framework d\'applications web WSGI léger en Python. Utilisé pour construire des applications web évolutives, des API REST et des microservices avec un code répétitif minimal.'
        },
        category: 'Flask',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01MCA5NUMzMC4xMDg2IDk1IDEwIDc0Ljg5MTQgMTAgNTVWNDVDMTAgMjUuMTA4NiAzMC4xMDg2IDUgNTAgNUM2OS44OTE0IDUgOTAgMjUuMTA4NiA5MCA0NVY1NUM5MCA3NC44OTE0IDY5Ljg5MTQgOTUgNTAgOTVaIiBmaWxsPSIjMDAwMDAwIi8+CjxwYXRoIGQ9Ik01MCA4NUMzNS4xMDg2IDg1IDIwIDY5Ljg5MTQgMjAgNTVWNDVDMjAgMzAuMTA4NiAzNS4xMDg2IDE1IDUwIDE1QzY0Ljg5MTQgMTUgODAgMzAuMTA4NiA4MCA0NVY1NUM4MCA2OS44OTE0IDY0Ljg5MTQgODUgNTAgODVaIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik01MCA3NUMzNS4xMDg2IDc1IDI1IDY0Ljg5MTQgMjUgNTBDMjUgMzUuMTA4NiAzNS4xMDg2IDI1IDUwIDI1QzY0Ljg5MTQgMjUgNzUgMzUuMTA4NiA3NSA1MEM3NSA2NC44OTE0IDY0Ljg5MTQgNzUgNTAgNzVaIiBmaWxsPSIjMDAwMDAwIi8+CjxwYXRoIGQ9Ik00NSAzNUg1NVY0MEg0NVYzNVoiIGZpbGw9IiNGRkZGRkYiLz4KPHA+dGggZD0iTTQ1IDQ1SDU1VjUwSDQ1VjQ1WiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNNDUgNTVINTVWNjBINDVWNTVaIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik00NSA2NUg1NVY3MEg0NVY2NVoiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+'
    },
    {
        id: 'TypeScript',
        x: 75, y: -50, r: 35,
        labels: {
            en: 'TypeScript',
            da: 'TypeScript',
            es: 'TypeScript',
            zh: 'TypeScript',
            ja: 'TypeScript',
            de: 'TypeScript',
            ar: 'TypeScript',
            fa: 'TypeScript',
            hi: 'TypeScript',
            ur: 'TypeScript',
            fr: 'TypeScript'
        },
        translations: {
            en: 'TypeScript is a strongly typed programming language that builds on JavaScript. Provides static type definitions, enhanced IDE support, and better code maintainability for large-scale applications.',
            da: 'TypeScript er et stærkt typet programmeringssprog, der bygger på JavaScript. Giver statiske typedefinitioner, forbedret IDE-understøttelse og bedre kodemaintainability for store applikationer.',
            es: 'TypeScript es un lenguaje de programación fuertemente tipado que se basa en JavaScript. Proporciona definiciones de tipos estáticos, soporte IDE mejorado y mejor mantenibilidad del código para aplicaciones a gran escala.',
            zh: 'TypeScript是一种基于JavaScript构建的强类型编程语言。为大规模应用程序提供静态类型定义、增强的IDE支持和更好的代码可维护性。',
            ja: 'TypeScriptはJavaScriptをベースにした強く型付けされたプログラミング言語です。静的型定義、強化されたIDE支援、大規模アプリケーションのためのより良いコード保守性を提供します。',
            de: 'TypeScript ist eine stark typisierte Programmiersprache, die auf JavaScript aufbaut. Bietet statische Typdefinitionen, verbesserte IDE-Unterstützung und bessere Code-Wartbarkeit für große Anwendungen.',
            ar: 'TypeScript هي لغة برمجة مكتوبة بقوة تبني على JavaScript. توفر تعريفات الأنواع الثابتة ودعم IDE محسن وقابلية صيانة أفضل للكود للتطبيقات واسعة النطاق.',
            fa: 'TypeScript یک زبان برنامه‌نویسی با تایپ قوی است که بر روی JavaScript ساخته شده است. تعاریف نوع استاتیک، پشتیبانی بهبود یافته IDE و قابلیت نگهداری بهتر کد برای برنامه‌های مقیاس بزرگ ارائه می‌دهد.',
            hi: 'TypeScript एक मजबूत रूप से टाइप की गई प्रोग्रामिंग भाषा है जो JavaScript पर आधारित है। बड़े पैमाने के एप्लिकेशन के लिए स्टेटिक टाइप परिभाषाएं, बेहतर IDE समर्थन और बेहतर कोड रखरखाव प्रदान करती है।',
            ur: 'TypeScript ایک مضبوط طریقے سے ٹائپ شدہ پروگرامنگ زبان ہے جو JavaScript پر بنی ہے۔ بڑے پیمانے کی ایپلیکیشنز کے لیے جامد قسم کی تعریفات، بہتر IDE سپورٹ اور بہتر کوڈ برقراری فراہم کرتی ہے۔',
            fr: 'TypeScript est un langage de programmation fortement typé qui s\'appuie sur JavaScript. Fournit des définitions de types statiques, un support IDE amélioré et une meilleure maintenabilité du code pour les applications à grande échelle.'
        },
        category: 'TypeScript'
    },
    {
        id: 'LinkedIn',
        x: -50, y: 100, r: 35,
        labels: {
            en: 'LinkedIn',
            da: 'LinkedIn',
            es: 'LinkedIn',
            zh: 'LinkedIn',
            ja: 'LinkedIn',
            de: 'LinkedIn',
            ar: 'LinkedIn',
            fa: 'LinkedIn',
            hi: 'LinkedIn',
            ur: 'LinkedIn',
            fr: 'LinkedIn'
        },
        translations: {
            en: 'Professional networking and career development. Connect with Babak Bandpey on LinkedIn to explore collaboration opportunities, view professional experience, and stay updated on latest projects and insights. Visit: https://www.linkedin.com/in/babakbandpey/',
            da: 'Professionelt netværk og karriereudvikling. Forbind med Babak Bandpey på LinkedIn for at udforske samarbejdsmuligheder, se professionel erfaring og holde dig opdateret om seneste projekter og indsigter. Besøg: https://www.linkedin.com/in/babakbandpey/',
            es: 'Redes profesionales y desarrollo profesional. Conéctate con Babak Bandpey en LinkedIn para explorar oportunidades de colaboración, ver experiencia profesional y mantenerte actualizado sobre los últimos proyectos e ideas. Visita: https://www.linkedin.com/in/babakbandpey/',
            zh: '专业网络和职业发展。在LinkedIn上与Babak Bandpey联系，探索合作机会，查看专业经验，并了解最新项目和见解。访问：https://www.linkedin.com/in/babakbandpey/',
            ja: 'プロフェッショナルネットワーキングとキャリア開発。LinkedInでBabak Bandpeyとつながり、コラボレーションの機会を探り、プロフェッショナルな経験を見て、最新のプロジェクトと洞察について最新情報を入手してください。訪問：https://www.linkedin.com/in/babakbandpey/',
            de: 'Professionelles Netzwerken und Karriereentwicklung. Verbinden Sie sich mit Babak Bandpey auf LinkedIn, um Kooperationsmöglichkeiten zu erkunden, berufliche Erfahrungen zu sehen und über neueste Projekte und Erkenntnisse auf dem Laufenden zu bleiben. Besuchen: https://www.linkedin.com/in/babakbandpey/',
            ar: 'الشبكات المهنية وتطوير المهنة. تواصل مع بابك بندپی على LinkedIn لاستكشاف فرص التعاون وعرض الخبرة المهنية والبقاء محدثًا حول أحدث المشاريع والرؤى. زيارة: https://www.linkedin.com/in/babakbandpey/',
            fa: 'شبکه‌سازی حرفه‌ای و توسعه شغلی. با بابک بندپی در LinkedIn ارتباط برقرار کنید تا فرصت‌های همکاری را کشف کنید، تجربه حرفه‌ای را مشاهده کنید و از آخرین پروژه‌ها و بینش‌ها مطلع شوید. بازدید: https://www.linkedin.com/in/babakbandpey/',
            hi: 'पेशेवर नेटवर्किंग और करियर विकास। सहयोग के अवसरों का पता लगाने, पेशेवर अनुभव देखने और नवीनतम परियोजनाओं और अंतर्दृष्टि पर अपडेट रहने के लिए LinkedIn पर Babak Bandpey से जुड़ें। यात्रा: https://www.linkedin.com/in/babakbandpey/',
            ur: 'پیشہ ورانہ نیٹ ورکنگ اور کیریئر ڈیولپمنٹ۔ تعاون کے مواقع تلاش کرنے، پیشہ ورانہ تجربہ دیکھنے اور تازہ ترین پروجیکٹس اور بصیرت پر اپ ڈیٹ رہنے کے لیے LinkedIn پر Babak Bandpey سے جڑیں۔ ملاحظہ کریں: https://www.linkedin.com/in/babakbandpey/',
            fr: 'Réseautage professionnel et développement de carrière. Connectez-vous avec Babak Bandpey sur LinkedIn pour explorer les opportunités de collaboration, voir l\'expérience professionnelle et rester informé des derniers projets et insights. Visitez: https://www.linkedin.com/in/babakbandpey/'
        },
        category: 'LinkedIn',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjQ0NyAyMC40NDRIMS41NTNWMS41NTZIMjAuNDQ3VjIwLjQ0NFoiIGZpbGw9IiMwQTY2QzIiLz4KPHBhdGggZD0iTTUuMzM3IDcuNDMzSDguMTFWMTYuNzc4SDUuMzM3VjcuNDMzWk02LjcyNCAzLjU1NkM3LjYxIDMuNTU2IDguMzMzIDQuMjc4IDguMzMzIDUuMTY3QzguMzMzIDYuMDU2IDcuNjEgNi43NzggNi43MjQgNi43NzhDNS44MzggNi43NzggNS4xMTEgNi4wNTYgNS4xMTEgNS4xNjdDNS4xMTEgNC4yNzggNS44MzggMy41NTYgNi43MjQgMy41NTZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTAuNTU2IDcuNDMzSDEzLjIyMlY4LjY2N0gxMy4yNzhDMTMuNjY3IDcuOTQ0IDE0LjUgNy4yMjIgMTUuNzc4IDcuMjIyQzE4LjY2NyA3LjIyMiAxOS4yMjIgOS4xMTEgMTkuMjIyIDEyVjE2Ljc3OEgxNi40NDRWMTI42NjdDMTYuNDQ0IDExLjU1NiAxNi40NDQgMTAuNTU2IDE1LjMzMyAxMC41NTZDMTQuMjIyIDEwLjU1NiAxNC4wNTYgMTEuMzMzIDE0LjA1NiAxMi4zMzNWMTYuNzc4SDExLjI3OFY3LjQzM0gxMC41NTZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K'
    },
];

// Define links between nodes
window.links = [
    // Main branches from center
    ['cocode.dk', 'Software'],
    ['cocode.dk', 'Cybersecurity'],
    ['cocode.dk', 'Clients'],
    ['cocode.dk', 'Contact'],
    ['Software', 'GitHub'],
    ['Software', 'Flask'],
    ['Software', 'TypeScript'],
    ['cocode.dk', 'LinkedIn'],

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
];

// Log successful load
//console.log('Nodes.js loaded successfully. Nodes:', window.nodes.length, 'Links:', window.links.length);
