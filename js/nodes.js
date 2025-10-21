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
window.categoryHoverColors = {};

// Define nodes with updated structure - Hot Topics Focus
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
            en: 'cocode.dk is a freelance IT consultancy based in Denmark specializing in AI integration, MCP development, fullstack innovation, spec-driven development, and cybersecurity compliance. We transform complex technical challenges into elegant solutions.',
            da: 'cocode.dk er en freelance IT-konsulentvirksomhed baseret i Danmark, der specialiserer sig i AI-integration, MCP-udvikling, fullstack-innovation, spec-drevet udvikling og cybersikkerhedscompliance. Vi omdanner komplekse tekniske udfordringer til elegante løsninger.',
            es: 'cocode.dk es una consultoría TI independiente con sede en Dinamarca especializada en integración de IA, desarrollo MCP, innovación fullstack, desarrollo basado en especificaciones y cumplimiento de ciberseguridad. Transformamos desafíos técnicos complejos en soluciones elegantes.',
            zh: 'cocode.dk 是一家位于丹麦的自由IT咨询公司，专注于AI集成、MCP开发、全栈创新、规范驱动开发和网络安全合规。我们将复杂的技术挑战转化为优雅的解决方案。',
            ja: 'cocode.dkは、デンマークに拠点を置くフリーランスのITコンサルティング会社で、AI統合、MCP開発、フルスタックイノベーション、仕様駆動開発、サイバーセキュリティコンプライアンスを専門としています。複雑な技術的課題をエレガントなソリューションに変換します。',
            de: 'cocode.dk ist ein freiberufliches IT-Beratungsunternehmen in Dänemark, das sich auf KI-Integration, MCP-Entwicklung, Fullstack-Innovation, spezifikationsgetriebene Entwicklung und Cybersicherheits-Compliance spezialisiert hat. Wir verwandeln komplexe technische Herausforderungen in elegante Lösungen.',
            ar: 'cocode.dk هي شركة استشارات تقنية معلومات مستقلة مقرها الدنمارك متخصصة في تكامل الذكاء الاصطناعي، تطوير MCP، الابتكار الكامل، التطوير المبني على المواصفات، والامتثال للأمن السيبراني. نحول التحديات التقنية المعقدة إلى حلول أنيقة.',
            fa: 'cocode.dk یک شرکت مشاوره فناوری اطلاعات مستقر در دانمارک است که در یکپارچه‌سازی هوش مصنوعی، توسعه MCP، نوآوری فول‌استک، توسعه مبتنی بر مشخصات و انطباق امنیت سایبری تخصص دارد. ما چالش‌های پیچیده فنی را به راه‌حل‌های زیبا تبدیل می‌کنیم.',
            hi: 'cocode.dk डेनमार्क स्थित एक फ्रीलांस आईटी सलाहकार कंपनी है जो एआई एकीकरण, एमसीपी विकास, फुलस्टैक नवाचार, विशिष्टता-संचालित विकास और साइबर सुरक्षा अनुपालन में विशेषज्ञता रखती है। हम जटिल तकनीकी चुनौतियों को सुरुचिपूर्ण समाधानों में बदलते हैं।',
            ur: 'cocode.dk ڈنمارک میں واقع ایک فری لانس آئی ٹی کنسلٹنسی ہے جو AI انٹیگریشن، MCP ڈویلپمنٹ، فل اسٹیک انوویشن، اسپیک ڈرائیون ڈویلپمنٹ اور سائبر سیکیورٹی کمپلائنس میں مہارت رکھتی ہے۔ ہم پیچیدہ تکنیکی چیلنجز کو خوبصورت حل میں تبدیل کرتے ہیں۔',
            fr: 'cocode.dk est un cabinet de conseil en informatique indépendant basé au Danemark, spécialisé dans l\'intégration de l\'IA, le développement MCP, l\'innovation fullstack, le développement piloté par les spécifications et la conformité en cybersécurité. Nous transformons les défis techniques complexes en solutions élégantes.'
        },
        category: 'cocode.dk'
    },
    {
        id: 'AI Integration',
        x: 0, y: -150, r: 40,
        labels: {
            en: 'AI Integration',
            da: 'AI-integration',
            es: 'Integración IA',
            zh: 'AI集成',
            ja: 'AI統合',
            de: 'KI-Integration',
            ar: 'تكامل الذكاء الاصطناعي',
            fa: 'یکپارچه‌سازی هوش مصنوعی',
            hi: 'एआई एकीकरण',
            ur: 'AI انٹیگریشن',
            fr: 'Intégration IA'
        },
        translations: {
            en: 'Implementing LLMs (GPT-4, Claude, Mistral) into business workflows—from automated risk assessments to intelligent compliance audits and insight generation. Real AI solutions that deliver measurable ROI. 🔗 See projects: github.com/cocodedk',
            da: 'Implementering af LLM\'er (GPT-4, Claude, Mistral) i forretningsprocesser—fra automatiserede risikovurderinger til intelligente compliance-audits og indsigts-generering. Ægte AI-løsninger der leverer målbart ROI. 🔗 Se projekter: github.com/cocodedk',
            es: 'Implementación de LLMs (GPT-4, Claude, Mistral) en flujos de trabajo empresariales—desde evaluaciones de riesgo automatizadas hasta auditorías de cumplimiento inteligentes y generación de insights. Soluciones de IA reales que entregan ROI medible. 🔗 Ver proyectos: github.com/cocodedk',
            zh: '将大型语言模型（GPT-4、Claude、Mistral）实施到业务工作流程中—从自动化风险评估到智能合规审计和洞察生成。提供可衡量ROI的真正AI解决方案。🔗 查看项目：github.com/cocodedk',
            ja: 'LLM（GPT-4、Claude、Mistral）をビジネスワークフローに実装—自動化されたリスク評価からインテリジェントなコンプライアンス監査、インサイト生成まで。測定可能なROIを提供する真のAIソリューション。🔗 プロジェクトを見る：github.com/cocodedk',
            de: 'Implementierung von LLMs (GPT-4, Claude, Mistral) in Geschäftsprozesse—von automatisierten Risikobewertungen bis zu intelligenten Compliance-Audits und Insight-Generierung. Echte KI-Lösungen mit messbarem ROI. 🔗 Projekte ansehen: github.com/cocodedk',
            ar: 'تنفيذ النماذج اللغوية الكبيرة (GPT-4، Claude، Mistral) في سير العمل التجاري—من تقييمات المخاطر الآلية إلى عمليات التدقيق الذكية للامتثال وتوليد الرؤى. حلول ذكاء اصطناعي حقيقية تقدم عائد استثمار قابل للقياس. 🔗 شاهد المشاريع: github.com/cocodedk',
            fa: 'پیاده‌سازی مدل‌های زبانی بزرگ (GPT-4، Claude، Mistral) در گردش کارهای کسب‌وکار—از ارزیابی ریسک خودکار تا حسابرسی هوشمند انطباق و تولید بینش. راه‌حل‌های واقعی هوش مصنوعی که ROI قابل اندازه‌گیری ارائه می‌دهند. 🔗 پروژه‌ها را ببینید: github.com/cocodedk',
            hi: 'व्यावसायिक वर्कफ़्लो में LLMs (GPT-4, Claude, Mistral) का कार्यान्वयन—स्वचालित जोखिम मूल्यांकन से लेकर बुद्धिमान अनुपालन ऑडिट और अंतर्दृष्टि उत्पादन तक। वास्तविक एआई समाधान जो मापने योग्य ROI प्रदान करते हैं। 🔗 परियोजनाएं देखें: github.com/cocodedk',
            ur: 'کاروباری ورک فلوز میں LLMs (GPT-4, Claude, Mistral) کا نفاذ—خودکار خطرے کی تشخیص سے لے کر ذہین کمپلائنس آڈٹس اور بصیرت کی تخلیق تک۔ حقیقی AI حل جو قابل پیمائش ROI فراہم کرتے ہیں۔ 🔗 پراجیکٹس دیکھیں: github.com/cocodedk',
            fr: 'Mise en œuvre de LLMs (GPT-4, Claude, Mistral) dans les flux de travail d\'entreprise—des évaluations de risques automatisées aux audits de conformité intelligents et génération d\'insights. Solutions IA réelles offrant un ROI mesurable. 🔗 Voir projets: github.com/cocodedk'
        },
        category: 'AI'
    },
    {
        id: 'MCP Development',
        x: 130, y: -90, r: 40,
        labels: {
            en: 'MCP Development',
            da: 'MCP-udvikling',
            es: 'Desarrollo MCP',
            zh: 'MCP开发',
            ja: 'MCP開発',
            de: 'MCP-Entwicklung',
            ar: 'تطوير MCP',
            fa: 'توسعه MCP',
            hi: 'एमसीपी विकास',
            ur: 'MCP ڈویلپمنٹ',
            fr: 'Développement MCP'
        },
        translations: {
            en: 'Building custom Model Context Protocol (MCP) servers connecting AI assistants to tools and data sources. Includes code scanner MCP, filesystem tools, and custom integrations. Part of the future of AI tooling. 🚀 Active development: github.com/cocodedk',
            da: 'Udvikling af brugerdefinerede Model Context Protocol (MCP) servere, der forbinder AI-assistenter med værktøjer og datakilder. Inkluderer kodescanner MCP, filsystemværktøjer og tilpassede integrationer. Del af fremtiden for AI-værktøjer. 🚀 Aktiv udvikling: github.com/cocodedk',
            es: 'Construcción de servidores personalizados de Model Context Protocol (MCP) que conectan asistentes de IA con herramientas y fuentes de datos. Incluye escáner de código MCP, herramientas de sistema de archivos e integraciones personalizadas. Parte del futuro de las herramientas de IA. 🚀 Desarrollo activo: github.com/cocodedk',
            zh: '构建自定义模型上下文协议（MCP）服务器，将AI助手连接到工具和数据源。包括代码扫描器MCP、文件系统工具和自定义集成。AI工具未来的一部分。🚀 活跃开发：github.com/cocodedk',
            ja: 'AIアシスタントをツールとデータソースに接続するカスタムModel Context Protocol（MCP）サーバーの構築。コードスキャナーMCP、ファイルシステムツール、カスタム統合を含む。AIツーリングの未来の一部。🚀 アクティブな開発：github.com/cocodedk',
            de: 'Entwicklung benutzerdefinierter Model Context Protocol (MCP) Server, die KI-Assistenten mit Tools und Datenquellen verbinden. Enthält Code-Scanner MCP, Dateisystem-Tools und benutzerdefinierte Integrationen. Teil der Zukunft von KI-Tooling. 🚀 Aktive Entwicklung: github.com/cocodedk',
            ar: 'بناء خوادم Model Context Protocol (MCP) مخصصة تربط مساعدي الذكاء الاصطناعي بالأدوات ومصادر البيانات. يتضمن ماسح كود MCP، أدوات نظام الملفات، والتكاملات المخصصة. جزء من مستقبل أدوات الذكاء الاصطناعي. 🚀 تطوير نشط: github.com/cocodedk',
            fa: 'ساخت سرورهای سفارشی Model Context Protocol (MCP) که دستیاران هوش مصنوعی را به ابزارها و منابع داده متصل می‌کند. شامل اسکنر کد MCP، ابزارهای سیستم فایل و یکپارچه‌سازی‌های سفارشی. بخشی از آینده ابزارهای هوش مصنوعی. 🚀 توسعه فعال: github.com/cocodedk',
            hi: 'कस्टम Model Context Protocol (MCP) सर्वर का निर्माण जो AI असिस्टेंट्स को टूल्स और डेटा स्रोतों से जोड़ता है। इसमें कोड स्कैनर MCP, फाइलसिस्टम टूल्स और कस्टम इंटीग्रेशन शामिल हैं। AI टूलिंग के भविष्य का हिस्सा। 🚀 सक्रिय विकास: github.com/cocodedk',
            ur: 'کسٹم Model Context Protocol (MCP) سرورز کی تعمیر جو AI اسسٹنٹس کو ٹولز اور ڈیٹا سورسز سے جوڑتے ہیں۔ کوڈ سکینر MCP، فائل سسٹم ٹولز اور کسٹم انٹیگریشنز شامل ہیں۔ AI ٹولنگ کے مستقبل کا حصہ۔ 🚀 فعال ترقی: github.com/cocodedk',
            fr: 'Construction de serveurs Model Context Protocol (MCP) personnalisés connectant les assistants IA aux outils et sources de données. Comprend le scanner de code MCP, les outils de système de fichiers et les intégrations personnalisées. Partie de l\'avenir des outils IA. 🚀 Développement actif: github.com/cocodedk'
        },
        category: 'MCP'
    },
    {
        id: 'OpenAI Integration',
        x: 150, y: 0, r: 40,
        labels: {
            en: 'OpenAI Integration',
            da: 'OpenAI-integration',
            es: 'Integración OpenAI',
            zh: 'OpenAI集成',
            ja: 'OpenAI統合',
            de: 'OpenAI-Integration',
            ar: 'تكامل OpenAI',
            fa: 'یکپارچه‌سازی OpenAI',
            hi: 'OpenAI एकीकरण',
            ur: 'OpenAI انٹیگریشن',
            fr: 'Intégration OpenAI'
        },
        translations: {
            en: 'Specialized OpenAI GPT-4/GPT-4o integration for business automation, document processing, and intelligent systems. Custom prompting strategies, fine-tuning, and production-ready implementations with proper error handling and cost optimization.',
            da: 'Specialiseret OpenAI GPT-4/GPT-4o integration til forretningsautomatisering, dokumentbehandling og intelligente systemer. Tilpassede promptstrategier, finjustering og produktionsklar implementering med korrekt fejlhåndtering og omkostningsoptimering.',
            es: 'Integración especializada de OpenAI GPT-4/GPT-4o para automatización empresarial, procesamiento de documentos y sistemas inteligentes. Estrategias de prompting personalizadas, ajuste fino e implementaciones listas para producción con manejo de errores y optimización de costos.',
            zh: '专业的OpenAI GPT-4/GPT-4o集成，用于业务自动化、文档处理和智能系统。定制提示策略、微调和生产就绪的实施，具有适当的错误处理和成本优化。',
            ja: 'ビジネス自動化、ドキュメント処理、インテリジェントシステムのための専門的なOpenAI GPT-4/GPT-4o統合。カスタムプロンプト戦略、ファインチューニング、適切なエラー処理とコスト最適化を備えた本番対応の実装。',
            de: 'Spezialisierte OpenAI GPT-4/GPT-4o-Integration für Geschäftsautomatisierung, Dokumentenverarbeitung und intelligente Systeme. Benutzerdefinierte Prompting-Strategien, Feinabstimmung und produktionsreife Implementierungen mit ordnungsgemäßer Fehlerbehandlung und Kostenoptimierung.',
            ar: 'تكامل متخصص لـ OpenAI GPT-4/GPT-4o لأتمتة الأعمال ومعالجة المستندات والأنظمة الذكية. استراتيجيات موجهة مخصصة وضبط دقيق وتطبيقات جاهزة للإنتاج مع معالجة صحيحة للأخطاء وتحسين التكلفة.',
            fa: 'یکپارچه‌سازی تخصصی OpenAI GPT-4/GPT-4o برای اتوماسیون کسب‌وکار، پردازش اسناد و سیستم‌های هوشمند. استراتژی‌های سفارشی پرامپت، تنظیم دقیق و پیاده‌سازی‌های آماده تولید با مدیریت خطای مناسب و بهینه‌سازی هزینه.',
            hi: 'व्यवसाय स्वचालन, दस्तावेज़ प्रसंस्करण और बुद्धिमान प्रणालियों के लिए विशेष OpenAI GPT-4/GPT-4o एकीकरण। कस्टम प्रॉम्प्टिंग रणनीतियाँ, फाइन-ट्यूनिंग और उचित त्रुटि प्रबंधन और लागत अनुकूलन के साथ उत्पादन-तैयार कार्यान्वयन।',
            ur: 'کاروباری آٹومیشن، دستاویز کی پروسیسنگ اور ذہین نظاموں کے لیے خصوصی OpenAI GPT-4/GPT-4o انٹیگریشن۔ کسٹم پرومپٹنگ حکمت عملی، فائن ٹیوننگ اور مناسب خرابی ہینڈلنگ اور لاگت کی اصلاح کے ساتھ پروڈکشن کے لیے تیار نفاذ۔',
            fr: 'Intégration spécialisée OpenAI GPT-4/GPT-4o pour l\'automatisation des affaires, le traitement de documents et les systèmes intelligents. Stratégies de prompting personnalisées, ajustement fin et implémentations prêtes pour la production avec gestion des erreurs appropriée et optimisation des coûts.'
        },
        category: 'AI'
    },
    {
        id: 'Fullstack Innovation',
        x: 130, y: 90, r: 40,
        labels: {
            en: 'Fullstack Innovation',
            da: 'Fullstack-innovation',
            es: 'Innovación Fullstack',
            zh: '全栈创新',
            ja: 'フルスタックイノベーション',
            de: 'Fullstack-Innovation',
            ar: 'ابتكار Fullstack',
            fa: 'نوآوری فول‌استک',
            hi: 'फुलस्टैक नवाचार',
            ur: 'فل اسٹیک انوویشن',
            fr: 'Innovation Fullstack'
        },
        translations: {
            en: 'Modern fullstack development with Django/Python + React/TypeScript. Creative interfaces, expressive design, and bulletproof backend logic. Graph databases (Neo4j) for complex relationships. Performance, aesthetics, and functionality in harmony.',
            da: 'Moderne fullstack-udvikling med Django/Python + React/TypeScript. Kreative grænseflader, udtryksfuldt design og skudsikkert backend-logik. Grafdatabaser (Neo4j) til komplekse relationer. Ydelse, æstetik og funktionalitet i harmoni.',
            es: 'Desarrollo fullstack moderno con Django/Python + React/TypeScript. Interfaces creativas, diseño expresivo y lógica backend a prueba de balas. Bases de datos de grafos (Neo4j) para relaciones complejas. Rendimiento, estética y funcionalidad en armonía.',
            zh: '使用Django/Python + React/TypeScript进行现代全栈开发。创意界面、表现性设计和防弹后端逻辑。用于复杂关系的图数据库（Neo4j）。性能、美学和功能的和谐统一。',
            ja: 'Django/Python + React/TypeScriptを使用した最新のフルスタック開発。クリエイティブなインターフェース、表現力豊かなデザイン、万全なバックエンドロジック。複雑な関係のためのグラフデータベース（Neo4j）。パフォーマンス、美学、機能性の調和。',
            de: 'Moderne Fullstack-Entwicklung mit Django/Python + React/TypeScript. Kreative Benutzeroberflächen, ausdrucksstarkes Design und kugelsichere Backend-Logik. Graphdatenbanken (Neo4j) für komplexe Beziehungen. Performance, Ästhetik und Funktionalität in Harmonie.',
            ar: 'تطوير fullstack حديث باستخدام Django/Python + React/TypeScript. واجهات إبداعية، تصميم تعبيري ومنطق خلفي مضاد للرصاص. قواعد بيانات الرسوم البيانية (Neo4j) للعلاقات المعقدة. الأداء والجماليات والوظائف في تناغم.',
            fa: 'توسعه مدرن فول‌استک با Django/Python + React/TypeScript. رابط‌های خلاق، طراحی بیانی و منطق بک‌اند ضد گلوله. پایگاه‌داده‌های گرافی (Neo4j) برای روابط پیچیده. عملکرد، زیبایی‌شناسی و عملکرد در هماهنگی.',
            hi: 'Django/Python + React/TypeScript के साथ आधुनिक फुलस्टैक विकास। रचनात्मक इंटरफेस, अभिव्यंजक डिजाइन और बुलेटप्रूफ बैकएंड लॉजिक। जटिल संबंधों के लिए ग्राफ डेटाबेस (Neo4j)। प्रदर्शन, सौंदर्यशास्त्र और कार्यक्षमता का सामंजस्य।',
            ur: 'Django/Python + React/TypeScript کے ساتھ جدید فل اسٹیک ڈویلپمنٹ۔ تخلیقی انٹرفیسز، اظہاری ڈیزائن اور بلٹ پروف بیک اینڈ منطق۔ پیچیدہ تعلقات کے لیے گراف ڈیٹا بیسز (Neo4j)۔ کارکردگی، جمالیات اور فعالیت میں ہم آہنگی۔',
            fr: 'Développement fullstack moderne avec Django/Python + React/TypeScript. Interfaces créatives, design expressif et logique backend à toute épreuve. Bases de données de graphes (Neo4j) pour des relations complexes. Performance, esthétique et fonctionnalité en harmonie.'
        },
        category: 'Fullstack'
    },
    {
        id: 'Spec-Driven Development',
        x: 0, y: 150, r: 40,
        labels: {
            en: 'Spec-Driven Development',
            da: 'Spec-drevet udvikling',
            es: 'Desarrollo basado en especificaciones',
            zh: '规范驱动开发',
            ja: '仕様駆動開発',
            de: 'Spezifikationsgetriebene Entwicklung',
            ar: 'التطوير المدفوع بالمواصفات',
            fa: 'توسعه مبتنی بر مشخصات',
            hi: 'विशिष्टता-संचालित विकास',
            ur: 'اسپیک ڈرائیون ڈویلپمنٹ',
            fr: 'Développement piloté par les spécifications'
        },
        translations: {
            en: 'API-first development with OpenAPI/AsyncAPI specifications. Contract-first design ensures frontend and backend teams work in parallel. Automated documentation, client generation, and validation. Reduces integration bugs by 80%.',
            da: 'API-first udvikling med OpenAPI/AsyncAPI specifikationer. Contract-first design sikrer, at frontend- og backend-teams arbejder parallelt. Automatiseret dokumentation, klientgenerering og validering. Reducerer integrationsfejl med 80%.',
            es: 'Desarrollo API-first con especificaciones OpenAPI/AsyncAPI. El diseño contract-first asegura que los equipos de frontend y backend trabajen en paralelo. Documentación automatizada, generación de clientes y validación. Reduce errores de integración en un 80%.',
            zh: '使用OpenAPI/AsyncAPI规范的API优先开发。契约优先设计确保前端和后端团队并行工作。自动化文档、客户端生成和验证。将集成错误减少80%。',
            ja: 'OpenAPI/AsyncAPI仕様によるAPI優先開発。コントラクトファーストデザインにより、フロントエンドとバックエンドチームが並行して作業できます。自動ドキュメント生成、クライアント生成、検証。統合バグを80%削減。',
            de: 'API-First-Entwicklung mit OpenAPI/AsyncAPI-Spezifikationen. Contract-First-Design stellt sicher, dass Frontend- und Backend-Teams parallel arbeiten. Automatisierte Dokumentation, Client-Generierung und Validierung. Reduziert Integrationsfehler um 80%.',
            ar: 'تطوير API-first باستخدام مواصفات OpenAPI/AsyncAPI. يضمن تصميم العقد أولاً عمل فرق الواجهة الأمامية والخلفية بشكل متوازٍ. التوثيق التلقائي وتوليد العميل والتحقق. يقلل من أخطاء التكامل بنسبة 80٪.',
            fa: 'توسعه API-first با مشخصات OpenAPI/AsyncAPI. طراحی قرارداد محور تضمین می‌کند که تیم‌های فرانت‌اند و بک‌اند به صورت موازی کار کنند. اسنادسازی خودکار، تولید کلاینت و اعتبارسنجی. باگ‌های یکپارچه‌سازی را 80٪ کاهش می‌دهد.',
            hi: 'OpenAPI/AsyncAPI विनिर्देशों के साथ API-first विकास। कॉन्ट्रैक्ट-फर्स्ट डिज़ाइन सुनिश्चित करता है कि फ्रंटएंड और बैकएंड टीमें समानांतर में काम करें। स्वचालित दस्तावेज़ीकरण, क्लाइंट जनरेशन और सत्यापन। एकीकरण बगों को 80% तक कम करता है।',
            ur: 'OpenAPI/AsyncAPI تصریحات کے ساتھ API-first ڈویلپمنٹ۔ کنٹریکٹ فرسٹ ڈیزائن اس بات کو یقینی بناتا ہے کہ فرنٹ اینڈ اور بیک اینڈ ٹیمیں متوازی طور پر کام کریں۔ خودکار دستاویزات، کلائنٹ جنریشن اور توثیق۔ انٹیگریشن بگز کو 80٪ کم کرتا ہے۔',
            fr: 'Développement API-first avec spécifications OpenAPI/AsyncAPI. La conception contract-first garantit que les équipes frontend et backend travaillent en parallèle. Documentation automatisée, génération de clients et validation. Réduit les bogues d\'intégration de 80%.'
        },
        category: 'Development'
    },
    {
        id: 'Cybersecurity Audit',
        x: -130, y: 90, r: 40,
        labels: {
            en: 'Cybersecurity Audit',
            da: 'Cybersikkerhedsrevision',
            es: 'Auditoría de Ciberseguridad',
            zh: '网络安全审计',
            ja: 'サイバーセキュリティ監査',
            de: 'Cybersicherheitsaudit',
            ar: 'تدقيق الأمن السيبراني',
            fa: 'حسابرسی امنیت سایبری',
            hi: 'साइबर सुरक्षा ऑडिट',
            ur: 'سائبر سیکیورٹی آڈٹ',
            fr: 'Audit de Cybersécurité'
        },
        translations: {
            en: 'Expert cybersecurity audits for CIS18, DORA, NIS2, ISO27001 compliance. Gap assessments, pentest coordination, risk remediation, and control mapping using graph-based CMDB systems. Turn compliance chaos into clear, actionable roadmaps.',
            da: 'Ekspert cybersikkerhedsrevision for CIS18, DORA, NIS2, ISO27001 compliance. Gap-analyser, pentest-koordinering, risikoreduktion og kontrol-mapping ved hjælp af graf-baserede CMDB-systemer. Gør compliance-kaos til klare, handlingsorienterede kørevejledninger.',
            es: 'Auditorías expertas de ciberseguridad para cumplimiento CIS18, DORA, NIS2, ISO27001. Evaluaciones de brechas, coordinación de pentests, remediación de riesgos y mapeo de controles utilizando sistemas CMDB basados en grafos. Convierte el caos del cumplimiento en hojas de ruta claras y accionables.',
            zh: 'CIS18、DORA、NIS2、ISO27001合规性的专业网络安全审计。使用基于图形的CMDB系统进行差距评估、渗透测试协调、风险修复和控制映射。将合规性混乱转化为清晰可行的路线图。',
            ja: 'CIS18、DORA、NIS2、ISO27001準拠のための専門的なサイバーセキュリティ監査。グラフベースのCMDBシステムを使用したギャップ評価、ペンテスト調整、リスク修復、コントロールマッピング。コンプライアンスの混乱を明確で実行可能なロードマップに変換します。',
            de: 'Experten-Cybersicherheitsaudits für CIS18, DORA, NIS2, ISO27001-Compliance. Lückenanalysen, Pentest-Koordination, Risikobehebung und Kontrollzuordnung unter Verwendung graphbasierter CMDB-Systeme. Verwandeln Sie Compliance-Chaos in klare, umsetzbare Roadmaps.',
            ar: 'عمليات تدقيق خبراء الأمن السيبراني لامتثال CIS18 وDORA وNIS2 وISO27001. تقييمات الفجوات وتنسيق اختبارات الاختراق ومعالجة المخاطر ورسم خرائط التحكم باستخدام أنظمة CMDB القائمة على الرسوم البيانية. حول فوضى الامتثال إلى خرائط طريق واضحة وقابلة للتنفيذ.',
            fa: 'حسابرسی‌های تخصصی امنیت سایبری برای انطباق CIS18، DORA، NIS2، ISO27001. ارزیابی شکاف‌ها، هماهنگی تست نفوذ، رفع ریسک و نگاشت کنترل با استفاده از سیستم‌های CMDB مبتنی بر گراف. هرج و مرج انطباق را به نقشه‌راه‌های واضح و قابل اجرا تبدیل کنید.',
            hi: 'CIS18, DORA, NIS2, ISO27001 अनुपालन के लिए विशेषज्ञ साइबर सुरक्षा ऑडिट। ग्राफ-आधारित CMDB सिस्टम का उपयोग करके गैप असेसमेंट, पेंटेस्ट समन्वय, जोखिम उपचार और नियंत्रण मैपिंग। अनुपालन अराजकता को स्पष्ट, कार्रवाई योग्य रोडमैप में बदलें।',
            ur: 'CIS18، DORA، NIS2، ISO27001 کمپلائنس کے لیے ماہرانہ سائبر سیکیورٹی آڈٹس۔ گراف پر مبنی CMDB سسٹمز کا استعمال کرتے ہوئے گیپ اسسمنٹس، پینٹیسٹ کوآرڈینیشن، رسک ریمیڈی ایشن اور کنٹرول میپنگ۔ کمپلائنس کی افراتفری کو واضح، قابل عمل روڈ میپس میں تبدیل کریں۔',
            fr: 'Audits experts en cybersécurité pour la conformité CIS18, DORA, NIS2, ISO27001. Évaluations des écarts, coordination des tests d\'intrusion, remédiation des risques et cartographie des contrôles utilisant des systèmes CMDB basés sur des graphes. Transformez le chaos de la conformité en feuilles de route claires et exploitables.'
        },
        category: 'Cybersecurity'
    },
    {
        id: 'FITS.DK',
        x: -150, y: 0, r: 40,
        labels: {
            en: 'FITS.DK',
            da: 'FITS.DK',
            es: 'FITS.DK',
            zh: 'FITS.DK',
            ja: 'FITS.DK',
            de: 'FITS.DK',
            ar: 'FITS.DK',
            fa: 'FITS.DK',
            hi: 'FITS.DK',
            ur: 'FITS.DK',
            fr: 'FITS.DK'
        },
        translations: {
            en: 'Strategic collaboration with lvl7.dk on FITS.DK—innovative IT solutions combining expertise in AI, fullstack development, and cybersecurity. Joint ventures delivering cutting-edge digital transformation projects. 🤝 Visit: fits.dk',
            da: 'Strategisk samarbejde med lvl7.dk om FITS.DK—innovative IT-løsninger, der kombinerer ekspertise i AI, fullstack-udvikling og cybersikkerhed. Fælles ventures, der leverer banebrydende digitale transformationsprojekter. 🤝 Besøg: fits.dk',
            es: 'Colaboración estratégica con lvl7.dk en FITS.DK—soluciones innovadoras de TI que combinan experiencia en IA, desarrollo fullstack y ciberseguridad. Empresas conjuntas que entregan proyectos de transformación digital de vanguardia. 🤝 Visita: fits.dk',
            zh: '与lvl7.dk在FITS.DK上的战略合作—结合AI、全栈开发和网络安全专业知识的创新IT解决方案。提供尖端数字转型项目的合资企业。🤝 访问：fits.dk',
            ja: 'lvl7.dkとのFITS.DKにおける戦略的コラボレーション—AI、フルスタック開発、サイバーセキュリティの専門知識を組み合わせた革新的なITソリューション。最先端のデジタル変革プロジェクトを提供する共同事業。🤝 訪問：fits.dk',
            de: 'Strategische Zusammenarbeit mit lvl7.dk bei FITS.DK—innovative IT-Lösungen, die Expertise in KI, Fullstack-Entwicklung und Cybersicherheit kombinieren. Gemeinsame Unternehmungen, die hochmoderne digitale Transformationsprojekte liefern. 🤝 Besuchen: fits.dk',
            ar: 'تعاون استراتيجي مع lvl7.dk في FITS.DK—حلول تكنولوجيا معلومات مبتكرة تجمع بين الخبرة في الذكاء الاصطناعي والتطوير الكامل والأمن السيبراني. مشاريع مشتركة تقدم مشاريع تحول رقمي متطورة. 🤝 زيارة: fits.dk',
            fa: 'همکاری استراتژیک با lvl7.dk در FITS.DK—راه‌حل‌های نوآورانه فناوری اطلاعات که تخصص در هوش مصنوعی، توسعه فول‌استک و امنیت سایبری را ترکیب می‌کنند. سرمایه‌گذاری‌های مشترک که پروژه‌های تحول دیجیتال پیشرفته ارائه می‌دهند. 🤝 بازدید: fits.dk',
            hi: 'lvl7.dk के साथ FITS.DK पर रणनीतिक सहयोग—एआई, फुलस्टैक विकास और साइबर सुरक्षा में विशेषज्ञता को मिलाकर नवीन आईटी समाधान। अत्याधुनिक डिजिटल परिवर्तन परियोजनाओं को वितरित करने वाले संयुक्त उद्यम। 🤝 यात्रा: fits.dk',
            ur: 'lvl7.dk کے ساتھ FITS.DK پر اسٹریٹیجک تعاون—AI، فل اسٹیک ڈویلپمنٹ اور سائبر سیکیورٹی میں مہارت کو یکجا کرنے والے جدید IT حل۔ جدید ترین ڈیجیٹل تبدیلی کے منصوبوں کو فراہم کرنے والے مشترکہ منصوبے۔ 🤝 ملاحظہ کریں: fits.dk',
            fr: 'Collaboration stratégique avec lvl7.dk sur FITS.DK—solutions informatiques innovantes combinant une expertise en IA, développement fullstack et cybersécurité. Coentreprises fournissant des projets de transformation numérique de pointe. 🤝 Visite: fits.dk'
        },
        category: 'Partnership'
    },
    {
        id: 'Contact',
        x: -130, y: -90, r: 40,
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
            en: 'Reach out to cocode.dk for AI integration, MCP development, fullstack projects, or cybersecurity audits. Email: info@cocode.dk — Based in Denmark, fluent in English, Danish, and Persian. Let\'s build something amazing together.',
            da: 'Kontakt cocode.dk for AI-integration, MCP-udvikling, fullstack-projekter eller cybersikkerhedsrevisioner. Email: info@cocode.dk — Baseret i Danmark, flydende i engelsk, dansk og persisk. Lad os bygge noget fantastisk sammen.',
            es: 'Contacta con cocode.dk para integración de IA, desarrollo MCP, proyectos fullstack o auditorías de ciberseguridad. Correo: info@cocode.dk — Con sede en Dinamarca, dominio de inglés, danés y persa. Construyamos algo increíble juntos.',
            zh: '联系cocode.dk获取AI集成、MCP开发、全栈项目或网络安全审计。邮箱：info@cocode.dk — 总部位于丹麦，精通英语、丹麦语和波斯语。让我们一起创造令人惊叹的东西。',
            ja: 'AI統合、MCP開発、フルスタックプロジェクト、またはサイバーセキュリティ監査についてはcocode.dkまでお問い合わせください。メール: info@cocode.dk — デンマーク拠点、英語・デンマーク語・ペルシャ語対応。一緒に素晴らしいものを作りましょう。',
            de: 'Kontaktieren Sie cocode.dk für KI-Integration, MCP-Entwicklung, Fullstack-Projekte oder Cybersicherheitsaudits. E-Mail: info@cocode.dk — Mit Sitz in Dänemark, fließend in Englisch, Dänisch und Persisch. Lassen Sie uns zusammen etwas Erstaunliches schaffen.',
            ar: 'اتصل بـ cocode.dk للحصول على تكامل الذكاء الاصطناعي أو تطوير MCP أو مشاريع fullstack أو عمليات تدقيق الأمن السيبراني. البريد الإلكتروني: info@cocode.dk — مقرها الدنمارك، تتقن الإنجليزية والدانماركية والفارسية. لنبني شيئًا مذهلاً معًا.',
            fa: 'برای یکپارچه‌سازی هوش مصنوعی، توسعه MCP، پروژه‌های فول‌استک یا حسابرسی امنیت سایبری با cocode.dk تماس بگیرید. ایمیل: info@cocode.dk — مستقر در دانمارک، مسلط به انگلیسی، دانمارکی و فارسی. بیایید با هم چیزی شگفت‌انگیز بسازیم.',
            hi: 'एआई एकीकरण, एमसीपी विकास, फुलस्टैक परियोजनाओं या साइबर सुरक्षा ऑडिट के लिए cocode.dk से संपर्क करें। ईमेल: info@cocode.dk — डेनमार्क स्थित, अंग्रेजी, डेनिश और फारसी में निपुण। आइए साथ मिलकर कुछ अद्भुत बनाएं।',
            ur: 'AI انٹیگریشن، MCP ڈویلپمنٹ، فل اسٹیک پراجیکٹس یا سائبر سیکیورٹی آڈٹس کے لیے cocode.dk سے رابطہ کریں۔ ای میل: info@cocode.dk — ڈنمارک میں واقع، انگریزی، ڈینش اور فارسی میں مہارت۔ آئیے مل کر کچھ حیرت انگیز بنائیں۔',
            fr: 'Contactez cocode.dk pour l\'intégration de l\'IA, le développement MCP, les projets fullstack ou les audits de cybersécurité. Email : info@cocode.dk — Basé au Danemark, maîtrise de l\'anglais, du danois et du persan. Construisons ensemble quelque chose d\'incroyable.'
        },
        category: 'Contact'
    },
    {
        id: 'GitHub',
        x: 95, y: -115, r: 35,
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
            en: 'Open source projects and code repositories including YouTube audio extractor, WhisperFrame AI toolkit, code scanner MCP server, and various development tools. Active contributions to the AI/MCP ecosystem. ⭐ Visit: github.com/cocodedk',
            da: 'Open source-projekter og kodelagre inklusive YouTube-lydudtrækker, WhisperFrame AI-værktøjssæt, kodescanner MCP-server og forskellige udviklingsværktøjer. Aktive bidrag til AI/MCP-økosystemet. ⭐ Besøg: github.com/cocodedk',
            es: 'Proyectos de código abierto y repositorios de código incluyendo extractor de audio de YouTube, kit de herramientas AI WhisperFrame, servidor MCP de escáner de código y varias herramientas de desarrollo. Contribuciones activas al ecosistema AI/MCP. ⭐ Visita: github.com/cocodedk',
            zh: '开源项目和代码仓库，包括YouTube音频提取器、WhisperFrame AI工具包、代码扫描器MCP服务器以及各种开发工具。对AI/MCP生态系统的积极贡献。⭐ 访问：github.com/cocodedk',
            ja: 'YouTube音声抽出器、WhisperFrame AIツールキット、コードスキャナーMCPサーバー、その他の開発ツールを含むオープンソースプロジェクトとコードリポジトリ。AI/MCPエコシステムへの積極的な貢献。⭐ 訪問：github.com/cocodedk',
            de: 'Open-Source-Projekte und Code-Repositories einschließlich YouTube-Audio-Extraktor, WhisperFrame AI-Toolkit, Code-Scanner MCP-Server und verschiedene Entwicklungstools. Aktive Beiträge zum AI/MCP-Ökosystem. ⭐ Besuchen: github.com/cocodedk',
            ar: 'مشاريع مفتوحة المصدر ومستودعات الكود بما في ذلك مستخرج الصوت من YouTube، مجموعة أدوات WhisperFrame AI، خادم MCP لماسح الكود، وأدوات تطوير متنوعة. مساهمات نشطة في نظام AI/MCP البيئي. ⭐ زيارة: github.com/cocodedk',
            fa: 'پروژه‌های متن‌باز و مخازن کد شامل استخراج‌کننده صوتی یوتیوب، جعبه‌ابزار هوش مصنوعی WhisperFrame، سرور MCP اسکنر کد و ابزارهای توسعه مختلف. مشارکت‌های فعال در اکوسیستم AI/MCP. ⭐ بازدید: github.com/cocodedk',
            hi: 'ओपन सोर्स प्रोजेक्ट्स और कोड रिपॉजिटरी जिसमें YouTube ऑडियो एक्सट्रैक्टर, WhisperFrame AI टूलकिट, कोड स्कैनर MCP सर्वर और विभिन्न डेवलपमेंट टूल्स शामिल हैं। AI/MCP पारिस्थितिकी तंत्र में सक्रिय योगदान। ⭐ यात्रा: github.com/cocodedk',
            ur: 'اوپن سورس پراجیکٹس اور کوڈ ریپازٹریز بشمول YouTube آڈیو ایکسٹریکٹر، WhisperFrame AI ٹول کٹ، کوڈ سکینر MCP سرور اور مختلف ڈیولپمنٹ ٹولز۔ AI/MCP ماحولیاتی نظام میں فعال شراکتیں۔ ⭐ ملاحظہ کریں: github.com/cocodedk',
            fr: 'Projets open source et dépôts de code incluant l\'extracteur audio YouTube, la boîte à outils AI WhisperFrame, le serveur MCP de scanner de code et divers outils de développement. Contributions actives à l\'écosystème AI/MCP. ⭐ Visite: github.com/cocodedk'
        },
        category: 'GitHub',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTgiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5OCA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OC44NTQgMEM3My4zNjcgMCA5My4zNjcgMjAuMDM2IDkzLjM2NyA0NC43NTFDOTMuMzY3IDY0LjU1NCA4MC4zMjkgODAuODIyIDYyLjQ4NyA4Ni42OTdDNjAuMzc1IDg3LjEwMSA1OS41NzEgODUuNzY4IDU5LjU3MSA4NC42NjhDNTkuNTcxIDgzLjcwNSA1OS42MDggNzguNzY4IDU5LjYwOCA3My4yNjhDNTkuNjA4IDY5LjE1IDU4LjI3NSA2Ni4zMTggNTYuNzI5IDY0LjgzNkM2My4wNzUgNjQuMTMyIDY5Ljk0NiA2MS42MzYgNjkuOTQ2IDQ5LjUyMkM2OS45NDYgNDYuMTk5IDY4LjY4NyA0My41ODUgNjYuNjE2IDQxLjY1OUM2Ni45ODMgNDAuOTU1IDY3Ljk0NiAzNy4zOTYgNjYuMjUgMzIuNzU5QzY2LjI1IDMyLjc1OSA2My43NTQgMzEuOTU1IDU5LjY0NSAzNC43ODdDNTcuNjM3IDM0LjE5NCA1NS40NjMgMzMuODk3IDUzLjI1IDMzLjg5N0M1MS4wMzcgMzMuODk3IDQ4Ljg2MyAzNC4xOTQgNDYuODU1IDM0Ljc4N0M0Mi43NDYgMzEuOTU1IDQwLjI1IDMyLjc1OSA0MC4yNSAzMi43NTlDMzguNTU0IDM3LjM5NiAzOS41MTcgNDAuOTU1IDM5Ljg4NCA0MS42NTlDMzcuODEzIDQzLjU4NSAzNi41NTQgNDYuMTk5IDM2LjU1NCA0OS41MjJDMzYuNTU0IDYxLjU5OSA0My4zODggNjQuMTMyIDQ5LjczNCA2NC44MzZDNDguNTUgNjYuMDU5IDQ3LjQ4NCA2OC4zNTUgNDcuMTkgNzEuNzQxQzQ0LjU0NCA3My4xNzggNDAuNTM1IDc0LjM2NCAzNi4yODcgNjcuNzc4QzM2LjI4NyA2Ny43NzggMzMuOTc5IDYzLjc0MSAyOS40NzkgNjMuNzQxQzI5LjQ3OSA2My43NDEgMjQuNzk3IDYzLjc3OCAyOC45NDMgNjcuMDM3QzI4Ljk0MyA2Ny4wMzcgMzEuOTk3IDY4LjU1NSAzMy42OTMgNzMuNTkyQzMzLjY5MyA3My41OTIgMzYuMjUgODEuNTkyIDQ3LjExNCA3OC44NkM0Ny4xNTEgODIuMjQ2IDQ3LjE4OCA4NS4zMzIgNDcuMTg4IDg0LjY2OEM0Ny4xODggODUuNzY4IDQ2LjM4NCA4Ny4xMDEgNDQuMjcyIDg2LjY5N0MyNi40MyA4MC44MjIgMTMuMzkyIDY0LjU1NCAxMy4zOTIgNDQuNzUxQzEzLjM5MiAyMC4wMzYgMzMuMzkyIDAgNDguODU0IDBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K'
    },
    {
        id: 'LinkedIn',
        x: 95, y: 115, r: 35,
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
            en: 'Professional networking and career development. Connect with Babak Bandpey on LinkedIn to explore collaboration opportunities, view professional experience, and stay updated on latest projects and insights in AI, MCP, and cybersecurity. 💼 Connect: linkedin.com/in/babakbandpey',
            da: 'Professionelt netværk og karriereudvikling. Forbind med Babak Bandpey på LinkedIn for at udforske samarbejdsmuligheder, se professionel erfaring og holde dig opdateret om seneste projekter og indsigter inden for AI, MCP og cybersikkerhed. 💼 Forbind: linkedin.com/in/babakbandpey',
            es: 'Redes profesionales y desarrollo profesional. Conéctate con Babak Bandpey en LinkedIn para explorar oportunidades de colaboración, ver experiencia profesional y mantenerte actualizado sobre los últimos proyectos e ideas en IA, MCP y ciberseguridad. 💼 Conecta: linkedin.com/in/babakbandpey',
            zh: '专业网络和职业发展。在LinkedIn上与Babak Bandpey联系，探索合作机会，查看专业经验，并了解AI、MCP和网络安全方面的最新项目和见解。💼 连接：linkedin.com/in/babakbandpey',
            ja: 'プロフェッショナルネットワーキングとキャリア開発。LinkedInでBabak Bandpeyとつながり、コラボレーションの機会を探り、プロフェッショナルな経験を見て、AI、MCP、サイバーセキュリティに関する最新のプロジェクトと洞察について最新情報を入手してください。💼 接続：linkedin.com/in/babakbandpey',
            de: 'Professionelles Netzwerken und Karriereentwicklung. Verbinden Sie sich mit Babak Bandpey auf LinkedIn, um Kooperationsmöglichkeiten zu erkunden, berufliche Erfahrungen zu sehen und über neueste Projekte und Erkenntnisse in KI, MCP und Cybersicherheit auf dem Laufenden zu bleiben. 💼 Verbinden: linkedin.com/in/babakbandpey',
            ar: 'الشبكات المهنية وتطوير المهنة. تواصل مع بابك بندپی على LinkedIn لاستكشاف فرص التعاون وعرض الخبرة المهنية والبقاء محدثًا حول أحدث المشاريع والرؤى في الذكاء الاصطناعي وMCP والأمن السيبراني. 💼 اتصال: linkedin.com/in/babakbandpey',
            fa: 'شبکه‌سازی حرفه‌ای و توسعه شغلی. با بابک بندپی در LinkedIn ارتباط برقرار کنید تا فرصت‌های همکاری را کشف کنید، تجربه حرفه‌ای را مشاهده کنید و از آخرین پروژه‌ها و بینش‌ها در هوش مصنوعی، MCP و امنیت سایبری مطلع شوید. 💼 اتصال: linkedin.com/in/babakbandpey',
            hi: 'पेशेवर नेटवर्किंग और करियर विकास। सहयोग के अवसरों का पता लगाने, पेशेवर अनुभव देखने और एआई, एमसीपी और साइबर सुरक्षा में नवीनतम परियोजनाओं और अंतर्दृष्टि पर अपडेट रहने के लिए LinkedIn पर Babak Bandpey से जुड़ें। 💼 कनेक्ट: linkedin.com/in/babakbandpey',
            ur: 'پیشہ ورانہ نیٹ ورکنگ اور کیریئر ڈیولپمنٹ۔ تعاون کے مواقع تلاش کرنے، پیشہ ورانہ تجربہ دیکھنے اور AI، MCP اور سائبر سیکیورٹی میں تازہ ترین پروجیکٹس اور بصیرت پر اپ ڈیٹ رہنے کے لیے LinkedIn پر Babak Bandpey سے جڑیں۔ 💼 کنیکٹ: linkedin.com/in/babakbandpey',
            fr: 'Réseautage professionnel et développement de carrière. Connectez-vous avec Babak Bandpey sur LinkedIn pour explorer les opportunités de collaboration, voir l\'expérience professionnelle et rester informé des derniers projets et insights en IA, MCP et cybersécurité. 💼 Connecter: linkedin.com/in/babakbandpey'
        },
        category: 'LinkedIn',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjQ0NyAyMC40NDRIMS41NTNWMS41NTZIMjAuNDQ3VjIwLjQ0NFoiIGZpbGw9IiMwQTY2QzIiLz4KPHBhdGggZD0iTTUuMzM3IDcuNDMzSDguMTFWMTYuNzc4SDUuMzM3VjcuNDMzWk02LjcyNCAzLjU1NkM3LjYxIDMuNTU2IDguMzMzIDQuMjc4IDguMzMzIDUuMTY3QzguMzMzIDYuMDU2IDcuNjEgNi43NzggNi43MjQgNi43NzhDNS44MzggNi43NzggNS4xMTEgNi4wNTYgNS4xMTEgNS4xNjdDNS4xMTEgNC4yNzggNS44MzggMy41NTYgNi43MjQgMy41NTZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTAuNTU2IDcuNDMzSDEzLjIyMlY4LjY2N0gxMy4yNzhDMTMuNjY3IDcuOTQ0IDE0LjUgNy4yMjIgMTUuNzc4IDcuMjIyQzE4LjY2NyA3LjIyMiAxOS4yMjIgOS4xMTEgMTkuMjIyIDEyVjE2Ljc3OEgxNi40NDRWMTI2NjdDMTYuNDQ0IDExLjU1NiAxNi40NDQgMTAuNTU2IDE1LjMzMyAxMC41NTZDMTQuMjIyIDEwLjU1NiAxNC4wNTYgMTEuMzMzIDE0LjA1NiAxMi4zMzNWMTYuNzc4SDExLjI3OFY3LjQzM0gxMC41NTZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K'
    }
];

// Define links between nodes - Flat structure
window.links = [
    // Main hub connections
    ['cocode.dk', 'AI Integration'],
    ['cocode.dk', 'MCP Development'],
    ['cocode.dk', 'OpenAI Integration'],
    ['cocode.dk', 'Fullstack Innovation'],
    ['cocode.dk', 'Spec-Driven Development'],
    ['cocode.dk', 'Cybersecurity Audit'],
    ['cocode.dk', 'FITS.DK'],
    ['cocode.dk', 'Contact'],
    ['cocode.dk', 'GitHub'],
    ['cocode.dk', 'LinkedIn']
];

// Log successful load
console.log('Nodes.js loaded successfully. Nodes:', window.nodes.length, 'Links:', window.links.length);
