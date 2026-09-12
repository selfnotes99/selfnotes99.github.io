export interface ProductEdition {
  id: 'cbse' | 'sql';
  name: string;
  badge: string;
  heroHeadlinePrefix: string;
  heroHeadlineHighlight: string;
  heroHeadlineSuffix: string;
  heroSubtitles: string[];
  heroCtaText: string;
  heroSecondaryText: string;
  heroImage: string;
  tickerText: string;

  // Product Offer Section
  offerSectionTitle: string;
  productCardTitle: string;
  originalPrice: number;
  currentPrice: number;
  ratingText: string;
  productFeatures: string[];
  offerImage: string;
  ctaText: string;

  // Urgency / Value Section
  urgencyTitle: string;
  urgencyHighlight: string;
  urgencyDesc1: string;
  urgencyDesc2: string;
  urgencyReasonTitle: string;
  urgencyBullets: string[];
  urgencyBadgeText: string;
  urgencyImage: string;

  // Why Need This
  whyNeedTitle: string;
  whyCards: {
    icon: string;
    title: string;
    subtitle: string;
    points: string[];
  }[];

  // Subjects / Modules
  subjectsTitle: string;
  subjects: {
    name: string;
    icon: string;
    isMaroon: boolean;
  }[];

  // Trust Section
  trustTitle: string;
  trustSubtitle: string;
  trustCards: {
    icon: string;
    title: string;
    subtitle: string;
    isMaroon: boolean;
  }[];

  // Comparison
  comparisonTitle: string;
  competitorHeader: string;
  ourProductHeader: string;
  competitorPoints: string[];
  ourPoints: string[];

  // Before / After
  beforeAfterTitle: string;
  beforePoints: string[];
  afterPoints: string[];
  socialProofCount: string;
  socialProofSubtext: string;

  // Combo Offer
  comboTitle: string;
  comboUrgencyBadge: string;
  comboCardTitle: string;
  comboBullets: string[];
  comboOriginalPrice: number;
  comboCurrentPrice: number;
  comboCtaText: string;
  comboImage: string;

  // Testimonials
  testimonialTitle: string;
  testimonials: {
    name: string;
    role?: string;
    quote: string;
    avatar: string;
  }[];

  // FAQ
  faqTitle: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const BUY_URL = 'https://superprofile.bio/vp/master-sql-from-zero-—-learn-to-write-real-sql-queries-with-confidence';

export const PRODUCT_CONFIG = {
  activeEdition: 'sql' as 'cbse' | 'sql',
  purchaseUrl: BUY_URL,
  whatsappNumber: '+919475465759',
  whatsappDisplay: '+91-9475465759',
  supportEmail: 'support@sqlmastery.in',
  brandName: 'SQL Mastery',
  brandLogo: '/assets/topper_logo.png',

  editions: {
    cbse: {
      id: 'cbse' as const,
      name: 'Class 7 CBSE Notes Combo (All Subjects)',
      badge: '"INDIA\'S No.',
      heroHeadlinePrefix: '1"CBSE CLASS 7',
      heroHeadlineHighlight: 'NOTES',
      heroHeadlineSuffix: '',
      heroSubtitles: [
        'CBSE-Aligned Notes,Questions & Revision Notes – All in One Place',
        'Boost your child\'s performance with expertly crafted study resources, designed for stress-free learning and better results.',
        'One Kit– All Subjects. Total Clarity.'
      ],
      heroCtaText: 'Explore Notes',
      heroSecondaryText: 'One Kit– All Subjects. Total Clarity.',
      heroImage: '/assets/hero_books.png',
      tickerText: 'LIMITED OFFER: Get Complete CBSE Class 7 Notes at Just ₹399 | Instant PDF Download | Covers All Subjects | 100% Exam-Ready',

      offerSectionTitle: "IN INDIA'S No. 1 CBSE NOTES – CLASS 7",
      productCardTitle: 'Class 7 CBSE Notes Combo (All Subjects)',
      originalPrice: 1299,
      currentPrice: 399,
      ratingText: '★★★★★ (4.8/5 - 1,200+ Students)',
      productFeatures: [
        'Instant PDF Download',
        'Covers All Major Subjects (Math, Science, English, SST, Hindi)',
        'Printable Format – Study Anytime, Anywhere',
        'Multiple Payment Options',
        '100% Secure Payment Gateway',
        'Lifetime Access & Free Future Updates',
        'Mobile, Tablet & Desktop Compatible'
      ],
      offerImage: '/assets/product_box.png',
      ctaText: 'Buy Now',

      urgencyTitle: 'One Small Investment Today.',
      urgencyHighlight: 'A Huge Academic Advantage Tomorrow.',
      urgencyDesc1: 'For the price of a movie ticket and popcorn, get a complete Class 7 CBSE Study Kit that helps your child learn faster, score better, and build strong academic foundations',
      urgencyDesc2: 'Why spend ₹399.00 on 2 hours of fun when you can invest in your child\'s long-term success?',
      urgencyReasonTitle: 'Why Parents Are Choosing This Over Popcorn:',
      urgencyBullets: [
        '₹399 – One-Time Investment, Lifetime Learning',
        'Complete CBSE Class 7 All-Subject Study Kit',
        'Based on Latest CBSE 2026–2027 Syllabus',
        'Trusted by 56,000+ Students Across India'
      ],
      urgencyBadgeText: 'CBSE IMPORTANT NOTES & QUESTIONS AT THE PRICE OF A MOVIE TICKET AND POPCORN!',
      urgencyImage: '/assets/urgency_visual.png',

      whyNeedTitle: 'Why Your Kid Need This?',
      whyCards: [
        {
          icon: 'book-open',
          title: 'Smart Notes in 2–3 Pages',
          subtitle: 'Long chapters turned into short, easy-to-understand notes for faster learning and quick revision.',
          points: [
            'Key concepts explained in simple language',
            'Important formulas & tricks highlighted clearly',
            'Chapter-Wise & Exam-Focused Revision'
          ]
        },
        {
          icon: 'file-text',
          title: 'Chapter Wise & Marking Scheme Wise',
          subtitle: 'Important concepts & answers organized chapter-wise',
          points: [
            'CBSE marking pattern explained for better preparation',
            'Quick summaries, examples & practice questions included',
            'Visual Mind Maps for Faster Memory Recall'
          ]
        },
        {
          icon: 'network',
          title: 'Graphical Mind-Maps',
          subtitle: 'Important points connected visually for better understanding',
          points: [
            'Mind maps tailored for each subject',
            'Quick chapter snapshots for stress-free revision',
            'Practice Papers Based on Latest CBSE Pattern'
          ]
        },
        {
          icon: 'edit-3',
          title: 'Practice Papers Aligned to CBSE Pattern',
          subtitle: 'Detailed answers to improve mistakes & concepts',
          points: [
            'Practice papers by subject and exam level',
            'Exam strategies & scoring tips for higher marks',
            'Solved CBSE Papers from Previous Years'
          ]
        },
        {
          icon: 'layers',
          title: 'Solved CBSE Papers: Last 5 Years',
          subtitle: 'Step-by-step easy explanations for every answer',
          points: [
            'Timed practice sets for real exam confidence',
            'Clear, easy-to-follow solution explanations',
            'Daily Brain Boost Activities'
          ]
        },
        {
          icon: 'zap',
          title: 'Boost Your Brainpower Daily',
          subtitle: 'Small daily challenges designed to make learning addictive',
          points: [
            'Daily micro-tasks that sharpen your thinking skills',
            'Fun puzzles and games linked to each chapter',
            'Based on the 2026–2027 syllabus. New syllabus (30% changes) will be updated soon.'
          ]
        }
      ],

      subjectsTitle: 'Subjects Covered in Class 7',
      subjects: [
        { name: 'ENGLISH', icon: 'lamp', isMaroon: false },
        { name: 'HINDI', icon: 'library', isMaroon: true },
        { name: 'SCIENCE', icon: 'microscope', isMaroon: false },
        { name: 'MATHEMATICS', icon: 'calculator', isMaroon: true },
        { name: 'SOCIAL SCIENCE', icon: 'globe', isMaroon: false },
        { name: 'COMPUTER SCIENCE', icon: 'laptop', isMaroon: true }
      ],

      trustTitle: 'Trusted by Parents, Proven Study Strategies',
      trustSubtitle: 'Give your Class 7 child a winning study strategy trusted by thousands of parents. This all-in-one kit builds strong subject foundations, improves exam performance, and encourages consistent learning habits—without stress',
      trustCards: [
        {
          icon: 'lightbulb',
          title: 'Better Marks',
          subtitle: 'Crystal-clear notes that simplify tough topics.',
          isMaroon: true
        },
        {
          icon: 'flag',
          title: 'Less Stress',
          subtitle: 'A small step today, a huge leap in the classroom.',
          isMaroon: false
        },
        {
          icon: 'trophy',
          title: 'More Confidence',
          subtitle: 'Confidence-boosting content for every exam.',
          isMaroon: true
        }
      ],

      comparisonTitle: 'Why Pay Thousands When You Can Get More For ₹3499?',
      competitorHeader: 'Other Class 7 Notes',
      ourProductHeader: 'Our CBSE Class 7 Study Kit',
      competitorPoints: [
        'Expensive for limited content',
        'Poor formatting & low clarity',
        'No real proof of usage',
        'Delayed or manual delivery',
        'Not mobile friendly',
        'No revision strategy'
      ],
      ourPoints: [
        'Complete All-Subject Kit at ₹399',
        'Professionally designed, clean layout',
        'Trusted by 56,000+ students',
        'Instant PDF download after payment',
        'Mobile, Tablet & Printable format',
        'Quick recall & exam-focused preparation'
      ],

      beforeAfterTitle: 'From Confused to Confident in CBSE Class 7 – See the Difference',
      beforePoints: [
        'Long boring chapters',
        'No revision structure',
        'Last-minute stress',
        'Poor time management'
      ],
      afterPoints: [
        'Clear 2–3 page smart notes',
        'Structured revision plan',
        'Strong concept clarity',
        'Exam-ready confidence'
      ],
      socialProofCount: '56,485',
      socialProofSubtext: 'Students Believe In Us',

      comboTitle: 'Complete CBSE Class 6 – 12 Combo – Grab It Before It\'s Gone!',
      comboUrgencyBadge: 'OFFER END SOON! (ONLY 7 LEFT)',
      comboCardTitle: 'All-in-One Combo – Class 6 – 12 CBSE Notes',
      comboBullets: [
        'Science | Commerce | Arts',
        'All Subjects Covered',
        '2–3 Page Chapter Notes',
        'Mind Maps + Practice Papers',
        'Instant PDF Download',
        'Lifetime Access'
      ],
      comboOriginalPrice: 3299,
      comboCurrentPrice: 1299,
      comboCtaText: 'Buy Combo',
      comboImage: '/assets/combo_box.png',

      testimonialTitle: 'Student Testimonial',
      testimonials: [
        {
          name: 'Diya Gupta',
          role: 'CBSE Class 7 Student & Parent Recommended',
          quote: "These e-Notes are concise, updated, and exam-ready. I've seen real improvement in students who use them. Ideal for bridging textbook knowledge with real exam preparation.",
          avatar: '/assets/testimonial_diya.png'
        },
        {
          name: 'Aarav Sharma',
          role: 'Class 7 CBSE Board Student',
          quote: 'The graphical mind maps and 2-3 page summaries helped me revise science and maths in half the time. Scored 94% in mid-term exams!',
          avatar: '/assets/testimonial_diya.png'
        }
      ],

      faqTitle: 'Frequently Asked Question (FAQ)',
      faqs: [
        {
          question: 'How Can I Get This Notes After Purchase?',
          answer: `1) Once your payment is complete, You will be redirected automatically to the download section of the page.\n2) Also you will get the product download link in the email ID and WhatsApp number given during checkout, it may take 5 to 10 minutes to receive that email.\n3) If you don't receive the product in your email, you can message us on WhatsApp.`
        },
        {
          question: 'Can I access directly from my cell phone?',
          answer: 'Yes, absolutely! The notes come in standard PDF format which opens easily on any mobile phone, tablet, iPad, laptop, or desktop without any special software required.'
        },
        {
          question: 'What If I Don\'t Receive Any Email After Purchase?',
          answer: 'Don\'t worry at all! Our customer support is available 24/7. Simply send a WhatsApp message to +91-9475465759 with your payment screenshot or registered email, and our team will instantly send your download link.'
        },
        {
          question: 'Is Internet Required to Use the Notes?',
          answer: 'Internet is only required once to download the PDF files. After downloading, you can access and read the notes completely offline at any time.'
        },
        {
          question: 'Is the Study Material Up-to-Date?',
          answer: 'Yes, all notes are 100% updated as per the latest CBSE 2026–2027 curriculum and marking schemes, with future updates included for free.'
        }
      ]
    },

    sql: {
      id: 'sql' as const,
      name: 'SQL Made Simple 2026 – The Practical Beginner\'s Guide',
      badge: '2026 EDITION',
      heroHeadlinePrefix: 'PRACTICAL SQL',
      heroHeadlineHighlight: 'NOTES & QUERIES',
      heroHeadlineSuffix: '',
      heroSubtitles: [
        'Master SQL from Zero — Learn to Write Real SQL Queries with Confidence',
        'A beginner-friendly, practical SQL ebook designed to help students understand databases, write SQL queries, work with tables, use JOINs, and apply constraints.',
        '16 Core Units • Beginner Friendly • Practical Examples • 2026 Edition'
      ],
      heroCtaText: 'Get SQL Ebook',
      heroSecondaryText: '16 Core Units • Instant Digital Access • 2026 Edition',
      heroImage: '/assets/sql_hero_books.png',
      tickerText: 'LIMITED OFFER: Master Practical SQL with 16 Core Units at Just ₹99 | Instant PDF Download | 2026 Edition',

      offerSectionTitle: 'PRACTICAL SQL EBOOK – 2026 EDITION',
      productCardTitle: 'Complete SQL & Database Mastery Ebook (16 Core Units)',
      originalPrice: 1299,
      currentPrice: 99,
      ratingText: '★★★★★ (4.9/5 - 2,400+ Tech Students)',
      productFeatures: [
        'Instant High-Res PDF Download',
        'Covers All 16 Core Units (SELECT, JOINs, Constraints, DDL/DML)',
        'Illustrated Hand-Drawn Mind Maps & Schema Diagrams',
        'Includes Practical Interview & Exam Questions',
        '100% Secure Payment Gateway',
        'Lifetime Access & Free 2026 Edition Updates',
        'Mobile, Tablet, Laptop & Printable Format'
      ],
      offerImage: '/assets/sql_product_box.png',
      ctaText: 'Buy Now (₹99)',

      urgencyTitle: 'One Small Investment Today.',
      urgencyHighlight: 'A Huge Career Advantage Tomorrow.',
      urgencyDesc1: 'For less than the price of a cup of coffee, get a complete 16-Unit Practical SQL Study Kit that takes you step-by-step from database basics to multi-table JOINs and real-world queries.',
      urgencyDesc2: 'Why spend ₹99.00 on a single snack when you can invest in a lifelong tech & data skill?',
      urgencyReasonTitle: 'Why Students & Aspirants Choose This Ebook:',
      urgencyBullets: [
        '₹99 – One-Time Investment, Lifetime Learning Access',
        '16 Carefully Organized Units with ER & Venn Diagrams',
        'Covers Relational Joins, Constraints, DDL, DML & DAL',
        'Trusted by College Students, BCA/BTech & Data Aspirants'
      ],
      urgencyBadgeText: 'COMPLETE 16-UNIT PRACTICAL SQL EBOOK AT JUST ₹99!',
      urgencyImage: '/assets/urgency_visual.png',

      whyNeedTitle: 'Why You Need This SQL Ebook?',
      whyCards: [
        {
          icon: 'book-open',
          title: 'Smart Visual Notes in 2–3 Pages',
          subtitle: 'Complex database concepts explained with visual diagrams and intuitive party metaphors.',
          points: [
            'Understand the "why", not just the command syntax',
            'ER diagrams and table relationships clearly illustrated',
            'Easy-to-follow query breakdown step-by-step'
          ]
        },
        {
          icon: 'network',
          title: 'Master JOINs & Multi-Table Queries',
          subtitle: 'Unit 14 dedicated guide to INNER, LEFT, RIGHT, FULL & CROSS JOINs with Venn diagrams.',
          points: [
            'Real-world customer & order table examples',
            'The Anti-Join pattern with IS NULL explained',
            'Party metaphor that makes JOIN logic click forever'
          ]
        },
        {
          icon: 'layers',
          title: 'Logical Query Processing Order',
          subtitle: 'Learn the exact order database engines process clauses: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
          points: [
            'Avoid common mistakes with column aliases',
            'Understand why WHERE runs before SELECT',
            'Performance optimization tips for beginners'
          ]
        },
        {
          icon: 'file-text',
          title: 'Constraints & Data Integrity',
          subtitle: 'High-yield exam & interview topic: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT.',
          points: [
            'Understand table relationships and referential integrity',
            'Proper handling of NULL values vs zero/empty strings',
            'DDL, DML and Data Administration sublanguages'
          ]
        },
        {
          icon: 'edit-3',
          title: 'Exam & Interview Focused',
          subtitle: 'Designed specifically for BCA, B.Tech, MCA, BSc IT students and tech interview preparation.',
          points: [
            'Covers Codd\'s Relational Model history & ANSI standards',
            'Frequently tested database theory & practical syntax',
            'Clear query questions with step-by-step solutions'
          ]
        },
        {
          icon: 'zap',
          title: 'Career & Analytics Foundation',
          subtitle: 'Build the foundational database knowledge needed before Excel, Power BI, Python or backend dev.',
          points: [
            'Essential for Software Engineering & Full-Stack tracks',
            'Direct application to Data Analyst & BI roles',
            'Modern 2026 database architecture context'
          ]
        }
      ],

      subjectsTitle: 'Core Units & Modules Covered',
      subjects: [
        { name: 'SQL BASICS & ARCHITECTURE', icon: 'laptop', isMaroon: false },
        { name: 'DATA TYPES & CONSTRAINTS', icon: 'library', isMaroon: true },
        { name: 'SELECT & QUERY PROCESSING', icon: 'lamp', isMaroon: false },
        { name: 'RELATIONAL JOINS (INNER/OUTER)', icon: 'network', isMaroon: true },
        { name: 'DDL, DML & TRANSACTIONS', icon: 'calculator', isMaroon: false },
        { name: 'SECURITY & SQL INJECTION', icon: 'globe', isMaroon: true }
      ],

      trustTitle: 'Trusted by Tech Students & Beginners Across India',
      trustSubtitle: 'Stop memorizing syntax in isolation. This visual ebook gives you a structured learning sequence from database fundamentals to multi-table queries that actually stick.',
      trustCards: [
        {
          icon: 'lightbulb',
          title: 'Concept Clarity',
          subtitle: 'Visual metaphors and diagrams that simplify tough database topics.',
          isMaroon: true
        },
        {
          icon: 'flag',
          title: 'Zero Frustration',
          subtitle: 'Logical learning order from scratch without confusing prerequisites.',
          isMaroon: false
        },
        {
          icon: 'trophy',
          title: 'Interview Ready',
          subtitle: 'Master the core questions and JOIN problems asked in technical interviews.',
          isMaroon: true
        }
      ],

      comparisonTitle: 'Why Pay Thousands for 40-Hour Video Courses When You Can Learn Faster for ₹99?',
      competitorHeader: 'Generic 40-Hour Video Courses',
      ourProductHeader: 'Our 16-Unit Practical SQL Ebook',
      competitorPoints: [
        'Expensive (₹2,000 to ₹10,000+ for slow video courses)',
        'Hours of passive video watching with low retention',
        'Syntax-first memorization without conceptual clarity',
        'No quick revision notes before exams or interviews',
        'Difficult to search or reference quickly on mobile',
        'Overwhelming complexity with no clear roadmap'
      ],
      ourPoints: [
        'Complete 16-Unit Ebook Kit at just ₹99 one-time',
        'Concise, high-impact illustrated visual notes',
        'Concept-first approach with diagrams & metaphors',
        '2–3 page quick-revision summaries for every topic',
        'Instant PDF download on Mobile, Tablet & Laptop',
        'Step-by-step roadmap from zero to JOIN mastery'
      ],

      beforeAfterTitle: 'From Confused to Confident in SQL – See the Difference',
      beforePoints: [
        'Confused by complex JOIN syntax',
        'Memorizing commands without understanding',
        'Exam & interview anxiety on multi-table queries',
        'Wasting hours on unstructured video tutorials'
      ],
      afterPoints: [
        'Crystal clear understanding of INNER/OUTER JOINs',
        'Confident query writing from scratch',
        'Clear knowledge of query processing order',
        'Interview and exam-ready database foundation'
      ],
      socialProofCount: '24,800+',
      socialProofSubtext: 'Students Mastered SQL With Us',

      comboTitle: 'Complete Full-Stack & Database Combo – Grab It Before It\'s Gone!',
      comboUrgencyBadge: 'OFFER END SOON! (ONLY 7 LEFT)',
      comboCardTitle: 'All-in-One Tech Bundle – SQL + DBMS + Python Foundations',
      comboBullets: [
        'Complete SQL 16-Unit Practical Ebook',
        'DBMS Architecture & Normalization Notes',
        'Python for Data & Backend Quickstart Notes',
        '100+ Solved Query Practice Worksheets',
        'Instant High-Res PDF Downloads',
        'Lifetime Access with Free 2026 Updates'
      ],
      comboOriginalPrice: 3299,
      comboCurrentPrice: 1299,
      comboCtaText: 'Buy Combo',
      comboImage: '/assets/sql/02_sql_sublanguages.png',

      testimonialTitle: 'Student & Learner Reviews',
      testimonials: [
        {
          name: 'Diya Gupta',
          role: 'BCA Final Year Student',
          quote: 'The visual explanation of SQL JOINs and query execution order in this ebook is incredible. Concepts that 10 YouTube videos couldn\'t clarify were crystal clear in 5 minutes.',
          avatar: '/assets/testimonial_diya.png'
        },
        {
          name: 'Aman Sharma',
          role: 'Aspiring Data Analyst',
          quote: 'I was struggling with WHERE vs HAVING and PRIMARY vs FOREIGN KEY constraints. This ebook simplified everything with real-world examples and diagrams. Best ₹99 investment!',
          avatar: '/assets/testimonial_rohit.png'
        }
      ],

      faqTitle: 'Frequently Asked Questions (FAQ)',
      faqs: [
        {
          question: 'Is this ebook suitable for complete beginners?',
          answer: 'Yes! The ebook starts with basic database fundamentals and progressively moves into tables, queries, constraints, keys, and JOINs. No prior coding or SQL knowledge is required.'
        },
        {
          question: 'How do I receive the ebook after purchase?',
          answer: 'Immediately upon successful payment on Superprofile, you will be redirected to an instant download page. You will also receive an automated email confirmation containing your direct PDF download link.'
        },
        {
          question: 'Does this cover SQL JOINs and multi-table queries?',
          answer: 'Yes, absolutely. Unit 14 is one of the most comprehensive units in the ebook, featuring detailed explanations, Venn diagrams, syntax breakdowns, and real-world examples for INNER, LEFT, RIGHT, and FULL OUTER JOINs.'
        },
        {
          question: 'Can I read this on mobile or print it out?',
          answer: 'Yes! The ebook is formatted as a crisp, high-resolution PDF that displays beautifully on smartphones, tablets, iPads, and laptops, and is fully printable for physical offline study.'
        },
        {
          question: 'Is this a one-time purchase or a subscription?',
          answer: 'It is a strictly one-time payment of ₹99 with lifetime access and free updates for the 2026 edition. There are no recurring fees or hidden charges.'
        }
      ]
    }
  },

  howToPurchaseSteps: [
    {
      step: '1',
      title: 'Click The Link',
      description: 'Tap on any Buy Now or Explore Notes button to get started.',
      icon: 'link'
    },
    {
      step: '2',
      title: 'Enter Email',
      description: 'Provide your email address and WhatsApp number for delivery.',
      icon: 'mail'
    },
    {
      step: '3',
      title: 'Make Payment',
      description: 'Pay securely via UPI, GPay, PhonePe, Cards, or Net Banking.',
      icon: 'credit-card'
    },
    {
      step: '4',
      title: 'Receive PDF Instantly',
      description: 'Get instant access link on screen & in your email inbox.',
      icon: 'file-check'
    }
  ],

  footerLinks: {
    categories: [
      { label: 'CBSE Class VI – XII', href: '#categories' },
      { label: 'JEE Mains/Advance', href: '#categories' },
      { label: 'NEET/UG', href: '#categories' },
      { label: 'UPSC', href: '#categories' },
      { label: 'Computer Science & SQL', href: '#categories' }
    ],
    usefulLinksCol1: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Disclaimer Policy', href: '/terms' },
      { label: 'Cancellation Policy', href: '/refund-policy' },
      { label: 'Privacy Policy', href: '/privacy-policy' }
    ],
    usefulLinksCol2: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Shipping Policy', href: '/refund-policy' },
      { label: 'Return & Refund Policy', href: '/refund-policy' }
    ]
  },

  sqlSamples: [
    { title: 'Unit 1: What is SQL? The Language of Databases', image: '/assets/sql/01_what_is_sql.png' },
    { title: 'Unit 4: The Language Within a Language (DDL, DML, DAL)', image: '/assets/sql/02_sql_sublanguages.png' },
    { title: 'Unit 7: Core Concepts & Constraints (PRIMARY/FOREIGN KEY)', image: '/assets/sql/03_core_concepts_constraints.png' },
    { title: 'Unit 5 & 10: How SQL Queries Are Processed & SELECT Anatomy', image: '/assets/sql/04_query_processing_select.png' },
    { title: 'Unit 14: What Are SQL Joins? (The Join Family Tree)', image: '/assets/sql/05_sql_joins_concept.png' },
    { title: 'Unit 14: INNER JOIN (The Perfect Match & Party Metaphor)', image: '/assets/sql/06_inner_join_match.png' },
    { title: 'Unit 14: LEFT OUTER JOIN (Anti-Join Pattern & NULL Handling)', image: '/assets/sql/07_left_outer_join.png' }
  ]
};
