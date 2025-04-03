# cocode.dk Homepage

An interactive network graph visualization showcasing the services and technologies offered:

## Core Elements
- Central "Software" node connected to various technologies and services
- Nodes for key technologies: Python, Django, Neo4j, AI Integrations
- Nodes for service areas: Cybersecurity, Compliance, Audit
- Additional nodes for unique offerings: Podcast, Vibe Coding

## Interactive Features
- Hover over nodes to see tooltips with node names
- Click on nodes to display detailed information in a side panel
- Dark-themed design with high contrast for readability

## Technical Implementation
- Built using HTML Canvas for rendering
- JavaScript for interactivity and graph visualization
- Responsive design that fills the browser window

## Improvement Tasks (Priority Order)

1. [x] Restructure the node layout:
   - Place "cocode.dk" as the central node
   - Create distinct branches for Software, Cybersecurity, Clients, and Contact
   - Reorganize existing nodes to connect to these main branches
   - Add Contact branch with personal information

2. [x] Ensure the graph is always centered on the page:
   - Add code to center the visualization regardless of window size
   - Implement proper scaling to maintain visibility on different devices

3. [x] Improve node text containment:
   - Resize nodes to properly encompass their text content
   - Ensure all text is fully contained within the circle nodes

4. [x] Add hover effects to nodes:
   - Change node background color on mouseover
   - Adjust text color dynamically to maintain contrast
   - Provide visual feedback to improve user interaction

5. [x] Refactor code for DRY principles:
   - Centralize repeated code into functions
   - Create a consistent node/link data structure
   - Improve variable naming and organization

6. [x] infoBox positioning:
   - Centered horizontally at top of screen
   - Maintains 20px top margin
   - Responsive width constraints
   - Dynamic layering based on node overlap

7. [x] Auto-trimming infoBox:
   - Removes oldest entry (bottom-most) when near screen bottom
   - Checks position on resize/update
   - Maintains at least 50px margin from screen edge
   - Preserves newest entries at top

8. [ ] Animation stability improvements:
   - Add animation queue system
   - Implement interval cleanup for previous animations
   - Add click debouncing during active animations
   - Create proper animation state management
   - Add visual feedback for click registration

9. [ ] Multilingual Support Implementation:

## Phase 1: Content Internationalization
- Create translation objects for all node descriptions
- Support 11 languages: EN, DA, ES, ZH, JA, DE, AR, FA, HI, UR, FR
- Fallback to English for missing translations
- Store translations directly in node objects

## Phase 2: Language Selection UI
- Floating language selector in top-left corner
- Buttons for each supported language
- Visual feedback for active language
- Accessible keyboard navigation

## Phase 3: Dynamic Content Updates
- Update infoBox content on language change
- Maintain node positions during language switches
- Preserve animation states during translation
- Update SEO metadata dynamically

## Phase 4: Localized SEO
- Language-specific meta descriptions
- hreflang link elements
- Alternate URLs for each language version
- Schema.org markup with multilingual support

## Phase 5: Testing & Validation
- Verify text rendering in all languages
- Check right-to-left layout support
- Test font fallbacks for CJK languages
- Validate HTML lang attribute changes

## Implementation Steps
1. Add `translations` object to each node
2. Create language selector component
3. Implement language change handler
4. Update draw cycle to use current language
5. Add ARIA labels for accessibility
6. Integrate with existing animation system


the current nodes are:
    // Define nodes with updated structure
    const nodes = [
        { id: 'cocode.dk', x: 0, y: 0, r: 50, info: 'cocode.dk is a freelance IT consultancy based in Denmark specializing in custom software development, graph databases, and cybersecurity services including compliance and audit automation.', category: 'cocode.dk' },

        { id: 'Software', x: 0, y: -150, r: 40, info: 'Full-stack custom software solutions built with modern frameworks such as Django and React. Scalable, maintainable systems designed for business efficiency.', category: 'Software' },
        { id: 'Cybersecurity', x: 0, y: 150, r: 40, info: 'Cybersecurity consulting including gap assessments, pentest coordination, risk remediation, and framework compliance (CIS18, NIST, ISO).', category: 'Cybersecurity' },
        { id: 'Clients', x: 150, y: 0, r: 40, info: 'Real-world freelance IT and security projects delivered across Europe. Includes Django apps, CMDB reviews, and automated compliance tools.', category: 'Clients' },
        { id: 'Contact', x: -150, y: 0, r: 40, info: 'Reach out to cocode.dk for IT consultancy or cybersecurity projects. Email: info@cocode.dk — based in Denmark, fluent in English, Danish, and Persian.', category: 'Contact' },

        { id: 'Python', x: -100, y: -200, r: 30, info: 'Backend automation, API development, scripting, and data processing using Python — the core language for robust digital infrastructure.', category: 'Software' },
        { id: 'Django', x: 0, y: -250, r: 30, info: 'Development of secure, scalable web applications using Django. Includes admin systems, APIs, authentication and integrations.', category: 'Software' },
        { id: 'Neo4j', x: 100, y: -200, r: 30, info: 'Graph database expertise for mapping infrastructure, assets, systems, and relationships. Used for CMDB modeling and control tracking.', category: 'Software' },
        { id: 'AI Integrations', x: -70, y: -300, r: 30, info: 'Implementation of AI features like LLMs (GPT, Claude, Mistral) in workflows, from risk evaluations to automated audits and insight generation.', category: 'Software' },
        { id: 'AI Wrappers', x: 70, y: -300, r: 30, info: 'Custom logic layers around large language models for task-specific automation, data enhancement, and secure contextual use.', category: 'Software' },

        { id: 'Compliance', x: -100, y: 200, r: 30, info: 'Specialized in CIS18, DORA, NIS2, ISO27000 compliance through graph-based audit mapping, evidence collection, and scope tracking.', category: 'Cybersecurity' },
        { id: 'Audit', x: 100, y: 200, r: 30, info: 'Design and execution of cybersecurity gap assessments, audits, control mappings, and remediation project documentation.', category: 'Cybersecurity' },

        { id: 'Podcast', x: -100, y: -50, r: 30, info: 'Psychology podcast in Persian language focused on Jungian concepts such as archetypes, individuation, and culture through a depth psychology lens.', category: 'Contact' },
        { id: 'Vibe Coding', x: 150, y: -120, r: 30, info: 'Creative coding and interface design with expressive elements, custom interactions, and unique structural logic that reflects thinking patterns.', category: 'Software' },
    ];

the translated versions are:

const nodes = [
  {
    id: 'cocode.dk',
    x: 0, y: 0, r: 50,
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
];
