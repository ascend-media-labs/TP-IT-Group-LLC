import headquarters from '@/assets/headquarters.jpg';
import team from '@/assets/team.jpg';
import infrastructure from '@/assets/infrastructure.jpg';

export { headquarters, team, infrastructure };

export const companyInfo = {
  name: 'TP iT GROUP LLC',
  legalName: 'TP IT GROUP LLC',
  tagline: 'INNOVATING BEYOND BOUNDARIES',
  description:
    'TP IT Group LLC provides industry-leading Cloud Engineering, SAP Solutions, ERP Planning, and Custom Software Development. Specialized global workforce solutions across USA, India, UK, Australia, and Canada.',
  establishedYear: '2005',
  headOffice: {
    address: '# 1207 Delaware Ave #2070',
    cityStateZip: 'Wilmington, DE - 19806',
    country: 'USA',
    fullAddress: '# 1207 Delaware Ave #2070 Wilmington, DE - 19806',
  },
  branchOffices: 'USA • India • Canada • UK • Australia',
  phone: '+1 (814) 844-1361',
  email: 'info@tpitgroups.com',
  workingHours: '24/7 Global Support & Operations',
  social: {
    facebook: 'https://www.facebook.com/tpitgroups',
    instagram: 'https://www.instagram.com/tpitgroups',
    youtube: 'https://www.youtube.com/@tpitgroups',
    linkedin: 'https://www.linkedin.com/company/tp-it-group-llc',
    x: 'https://x.com/tpitgroups',
    whatsapp: 'https://wa.me/18148441361',
  },
};

export const stats = [
  { label: 'Industry experience', value: '20+ years' },
  { label: 'Connected operations', value: 'US USA  CA Canada  IN India', isCountries: true },
  { label: 'End-to-end partnership', value: 'Strategy to delivery' },
  { label: 'Technology and people', value: 'IT & non-IT' },
];

export const connectedCapabilities = [
  {
    number: '01',
    title: 'Technology Solutions',
    desc: 'Connect AI, cloud, enterprise applications and secure infrastructure with the way your organization works.',
    items: [
      'AI automation & agents',
      'Cloud migration & modernization',
      'ERP & SAP transformation',
      'Custom software & digital experiences',
    ],
    linkText: 'Explore technology',
    href: '/services',
  },
  {
    number: '02',
    title: 'Consulting Services',
    desc: 'Bring clarity to technology decisions, process improvement and transformation delivery—from the first assessment to implementation.',
    items: [
      'Technology strategy & roadmaps',
      'Business process improvement',
      'Transformation & delivery advisory',
      'Workforce planning',
    ],
    linkText: 'Explore consulting',
    href: '/services',
  },
  {
    number: '03',
    title: 'IT & Non-IT Talent',
    desc: 'Align your skills requirements, team structure and hiring priorities across technical and business operations roles.',
    items: [
      'IT specialists & project teams',
      'Business & operational talent',
      'Contract & permanent hiring needs',
      'Skills planning & team augmentation',
    ],
    linkText: 'Explore talent solutions',
    href: '/careers',
  },
];

export const engagementModels = [
  {
    number: '01',
    title: 'Consult & Plan',
    desc: 'An assessment and roadmap for a defined business or technology challenge.',
  },
  {
    number: '02',
    title: 'Build & Deliver',
    desc: 'A scoped project with agreed milestones, acceptance criteria and handover.',
  },
  {
    number: '03',
    title: 'Extend Your Team',
    desc: 'Specialist capacity matched to the skills and duration your team needs.',
  },
  {
    number: '04',
    title: 'Support & Improve',
    desc: 'Ongoing service priorities, review cycles and improvements agreed with you.',
  },
];

export const services = [
  {
    id: 'ai-automation',
    title: 'AI Automation & Agents',
    shortTitle: 'AI Automation & Agents',
    summary: 'Bring AI into your business with workflow automation, custom AI agents, and end-to-end project setup.',
    desc: 'Bring AI into your business with workflow automation, custom AI agents, and end-to-end project setup.',
    image: '/services/ai-automation.jpg',
    offers: [
      'Workflow automation & autonomous agents',
      'Custom enterprise AI agents',
      'End-to-end project setup & deployment',
      'Machine learning model integration',
      'Intelligent process automation (IPA)',
      'Enterprise LLM and knowledge bases',
    ],
  },
  {
    id: 'cloud-migration',
    title: 'Cloud Migration',
    shortTitle: 'Cloud Migration',
    summary: 'Plan and migrate your infrastructure to AWS, Microsoft Azure, Google Cloud, or Oracle Cloud with a focus on continuity and security.',
    desc: 'Plan and migrate your infrastructure to AWS, Microsoft Azure, Google Cloud, or Oracle Cloud with a focus on continuity and security.',
    image: '/services/cloud-migration.jpg',
    offers: [
      'AWS, Azure, Google Cloud & Oracle migration',
      'Zero-downtime infrastructure transition',
      'Disaster recovery & business continuity',
      'Multi-cloud & hybrid cloud architecture',
      'Performance optimization & monitoring',
      'Cost optimization & resource management',
    ],
  },
  {
    id: 'it-development',
    title: 'IT Development',
    shortTitle: 'IT Development',
    summary: 'Turn business requirements into custom software and applications, from initial concept through development, testing, and deployment.',
    desc: 'Turn business requirements into custom software and applications, from initial concept through development, testing, and deployment.',
    image: '/services/it-development.jpg',
    offers: [
      'Custom web & mobile application engineering',
      'Enterprise software solutions & portals',
      'UI/UX design & digital experiences',
      'API architecture & modern microservices',
      'Automated testing & quality assurance',
      'Agile delivery and ongoing sprint support',
    ],
  },
  {
    id: 'erp-sap',
    title: 'ERP & SAP Solutions',
    shortTitle: 'ERP & SAP Solutions',
    summary: 'Connect your enterprise operations with SAP implementation, ERP integration, migration, and ongoing application support.',
    desc: 'Connect your enterprise operations with SAP implementation, ERP integration, migration, and ongoing application support.',
    image: '/services/erp-sap.jpg',
    offers: [
      'SAP implementation & customization',
      'ERP planning, integration & advisory',
      'SAP S/4HANA migration & upgrades',
      'Business process automation',
      'Supply chain & financial management',
      'Training, change management & support',
    ],
  },
  {
    id: 'web-design',
    title: 'Web Design & Development',
    shortTitle: 'Web Design & Development',
    summary: 'Create modern, responsive websites that reflect your brand, engage your audience, and support your business goals.',
    desc: 'Create modern, responsive websites that reflect your brand, engage your audience, and support your business goals.',
    image: '/services/web-design.jpg',
    offers: [
      'Modern, highly responsive responsive websites',
      'Brand identity & visual communication',
      'Interactive design & animations',
      'SEO & performance optimization',
      'Content management system (CMS) integration',
      'Conversion-focused architecture',
    ],
  },
  {
    id: 'networking-security',
    title: 'Networking & Security',
    shortTitle: 'Networking & Security',
    summary: 'Build reliable enterprise networks and strengthen cybersecurity to protect your systems, users, and digital assets.',
    desc: 'Build reliable enterprise networks and strengthen cybersecurity to protect your systems, users, and digital assets.',
    image: '/services/networking-security.jpg',
    offers: [
      'Enterprise network architecture & setup',
      'Cybersecurity & threat defense audits',
      'Zero-trust security implementation',
      'Firewall, VPN & secure remote access',
      '24/7 security monitoring & incident response',
      'Compliance & data protection protocols',
    ],
  },
];

export const clientLogos = [
  { name: 'CVS Health', src: '/logos/cvs.jpg' },
  { name: 'CALVI ELECTRIC', src: '/logos/calvi.jpg' },
  { name: 'Albertsons', src: '/logos/albertsons_v2.jpg' },
  { name: 'CHASE', src: '/logos/chase_new.jpg' },
  { name: 'State Farm', src: '/logos/statefarm.jpg' },
  { name: 'GEICO', src: '/logos/geico.jpg' },
  { name: 'AAA', src: '/logos/aaa.jpg' },
  { name: 'PENFED', src: '/logos/penfed.jpg' },
  { name: 'Capital One', src: '/logos/extra2.jpg' },
  { name: 'Mizuho', src: '/logos/mizuho.jpg' },
  { name: 'Synechron', src: '/logos/synechron.jpg' },
  { name: 'Progressive', src: '/logos/progressive_v2.jpg' },
  { name: 'Persistent', src: '/logos/persistent.jpg' },
  { name: 'Liberty Mutual', src: '/logos/liberty_mutual.jpg' },
  { name: 'Pennymac', src: '/logos/pennymac.jpg' },
  { name: 'Navy Federal', src: '/logos/navy_federal.jpg' },
  { name: 'Signify Health', src: '/logos/signify_health.jpg' },
  { name: 'USAA', src: '/logos/usaa.jpg' },
  { name: 'United IT', src: '/logos/united_it.jpg' },
  { name: 'Miles IT', src: '/logos/miles_new.jpg' },
];

export const clientPillars = [
  {
    title: 'Quality Excellence',
    desc: 'We deliver industry-leading code quality and infrastructure stability, exceeding global standards for enterprise performance.',
  },
  {
    title: 'Absolute Transparency',
    desc: 'Real-time reporting and open communication channels ensure you are always informed about project milestones and progress.',
  },
  {
    title: 'Agile Delivery',
    desc: 'Fast-tracked development cycles without compromising on security or scalability, tailored to your market demands.',
  },
  {
    title: '24/7 Strategic Support',
    desc: 'Our global workforce ensures that help is always available, regardless of your time zone or the complexity of the issue.',
  },
];

export const industries = [
  {
    name: 'Financial Services',
    desc: 'MODERN DIGITAL BANKING & FINTECH',
    image: '/industries/financial-services.jpg',
  },
  {
    name: 'IT Companies',
    desc: 'ENTERPRISE TECHNOLOGY SOLUTIONS',
    image: '/industries/it-companies.jpg',
  },
  {
    name: 'Pharma & Healthcare',
    desc: 'COMPLIANT HEALTHCARE SYSTEMS',
    image: '/industries/pharma-healthcare.jpg',
  },
  {
    name: 'Manufacturing',
    desc: 'INDUSTRIAL AUTOMATION & IOT',
    image: '/industries/manufacturing.jpg',
  },
  {
    name: 'Enterprises & Startups',
    desc: 'SCALABLE GROWTH SOLUTIONS',
    image: '/industries/enterprises-startups.jpg',
  },
  {
    name: 'Engineering & Field Services',
    desc: 'TECHNICAL WORKFORCE SUPPORT',
    image: '/industries/engineering-field-services.jpg',
  },
];

export const provenApproach = [
  {
    number: '01',
    title: 'Understand Your Needs',
    desc: 'We begin by deeply understanding your business goals, challenges, and technical requirements through comprehensive discovery sessions.',
  },
  {
    number: '02',
    title: 'Design Smart Solutions',
    desc: 'Our experts architect tailored solutions leveraging the latest technologies and best practices to address your specific needs.',
  },
  {
    number: '03',
    title: 'Implement with Precision',
    desc: 'We execute with meticulous attention to detail, reviewing working increments against agreed scope, quality criteria and timelines.',
  },
  {
    number: '04',
    title: 'Ongoing Support & Optimization',
    desc: 'Our partnership continues after launch with ongoing support, monitoring, and optimization to keep your technology aligned with your goals.',
  },
];

export const whyChooseUs = [
  {
    title: 'One Connected Service Partner',
    desc: 'Technology, consulting and workforce needs brought together from planning through delivery.',
  },
  {
    title: 'Global Technology Experience',
    desc: 'US USA, CA Canada and IN India operations connecting business context with technical and workforce needs.',
  },
  {
    title: 'Skilled Professional Team',
    desc: 'Technical expertise across AI automation, cloud, SAP, and custom software development.',
  },
  {
    title: 'Reliable Long-Term Support',
    desc: 'Maintenance, monitoring, and improvements tailored to your operational needs.',
  },
  {
    title: 'Cost-Effective & Scalable Services',
    desc: 'Solutions designed to grow with your business needs and budget.',
  },
];

export const coreValues = [
  {
    title: 'Mission-Driven',
    desc: 'Deliver smart solutions that drive real business growth and digital transformation.',
  },
  {
    title: 'Client-Centric',
    desc: 'Building long-term partnerships through reliable service and dedicated support.',
  },
  {
    title: 'Innovation First',
    desc: 'Leveraging cutting-edge technologies to solve complex business challenges.',
  },
  {
    title: 'Scalable Growth',
    desc: 'Solutions designed to grow with your business from startup to enterprise.',
  },
];

export const milestones = [
  {
    year: '2005',
    title: 'TP IT Group LLC Established',
    desc: 'Started with a vision to provide comprehensive digital solutions and consulting globally.',
  },
  {
    year: 'Growth',
    title: 'Global Expansion',
    desc: 'Expanded operations across USA, India, Canada, UK, and Australia.',
  },
  {
    year: 'Excellence',
    title: '100+ Projects Milestone',
    desc: 'Successfully delivered over 100 enterprise projects across diverse industries.',
  },
  {
    year: 'Future',
    title: 'Continuous Innovation',
    desc: 'Investing in FinLabs, emerging technologies, AI/ML, and expanding global service offerings.',
  },
];

export const careersJobs = [
  {
    title: 'Senior Cloud Architect',
    dept: 'Cloud Operations',
    location: 'New York, NY',
    type: 'Full-Time',
    desc: 'Lead the design and implementation of enterprise-grade cloud architectures for our global clients.',
  },
  {
    title: 'Principal Software Engineer',
    dept: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    desc: 'Drive technical excellence and architect scalable software solutions using modern technologies.',
  },
  {
    title: 'AI/ML Engineering Lead',
    dept: 'FinLabs',
    location: 'Austin, TX',
    type: 'Full-Time',
    desc: 'Research and develop cutting-edge AI/ML models to solve complex financial services challenges.',
  },
  {
    title: 'Enterprise SAP Consultant',
    dept: 'Enterprise Solutions',
    location: 'Chicago, IL',
    type: 'Full-Time',
    desc: 'Implement and optimize SAP solutions to streamline business processes for large enterprises.',
  },
  {
    title: 'Full Stack Developer',
    dept: 'Engineering',
    location: 'Seattle, WA',
    type: 'Full-Time',
    desc: 'Build responsive and robust end-to-end applications using the latest web technologies.',
  },
  {
    title: 'Cybersecurity Analyst',
    dept: 'Cloud Operations',
    location: 'Miami, FL',
    type: 'Full-Time',
    desc: "Protect our clients' digital assets by implementing and monitoring advanced security measures.",
  },
  {
    title: 'Solutions Architect',
    dept: 'Engineering',
    location: 'Denver, CO',
    type: 'Full-Time',
    desc: 'Design comprehensive IT solutions that address complex business requirements.',
  },
  {
    title: 'DevOps Engineer',
    dept: 'Cloud Operations',
    location: 'Dallas, TX',
    type: 'Full-Time',
    desc: 'Automate and optimize our software delivery pipelines and infrastructure management.',
  },
  {
    title: 'UX/UI Design Director',
    dept: 'Digital Experience',
    location: 'Los Angeles, CA',
    type: 'Full-Time',
    desc: 'Lead the design vision and create stunning user experiences for our diverse portfolio of clients.',
  },
  {
    title: 'Lead Data Scientist',
    dept: 'FinLabs',
    location: 'Boston, MA',
    type: 'Full-Time',
    desc: 'Extract actionable insights from large datasets to drive data-informed business decisions.',
  },
  {
    title: 'Senior Delivery Manager',
    dept: 'Management',
    location: 'Pune, India',
    type: 'Full-Time',
    desc: 'Ensure the successful delivery of complex IT projects while managing high-performing teams.',
  },
  {
    title: 'Software Project Lead',
    dept: 'Engineering',
    location: 'Toronto, Canada',
    type: 'Full-Time',
    desc: 'Coordinate and lead software development teams to deliver high-quality products on time.',
  },
];

export const careersBenefits = [
  {
    title: 'Global Impact',
    desc: 'Work on large-scale digital transformation projects that impact millions of users worldwide.',
  },
  {
    title: 'Flexible Future',
    desc: 'We believe in results, not just hours. Enjoy hybrid and flexible working models at our global offices.',
  },
  {
    title: 'Growth Mindset',
    desc: 'Continuous learning is in our DNA. We provide certifications and training to help you level up.',
  },
];

export const enterpriseDeliverables = [
  'Comprehensive Technical Documentation',
  'Source Code Ownership (IP Rights)',
  'Post-Deployment Maintenance & Optimization',
  'Scalable Architecture Blueprints',
  'Security Compliance Certifications',
];

export const articles = [
  {
    slug: 'cloud-transformation-enterprise',
    title: 'Accelerating Enterprise Scale with Hybrid Cloud Architecture',
    category: 'CLOUD & DEVOPS',
    image: infrastructure,
    summary:
      'How multi-cloud modernization and automated DevOps pipelines unlock resilient, high-throughput enterprise infrastructure.',
    body: 'Modern enterprises require elastic, secure infrastructure capable of supporting rapid digital evolution. Cloud adoption is no longer just about cost efficiency—it is the bedrock of business agility.\n\nAt TP iT GROUP LLC, our multi-cloud deployment strategies on AWS, Microsoft Azure, and Google Cloud provide hardened security perimeters, zero-trust governance, and 99.99% uptime for global workloads.',
  },
  {
    slug: 'ai-data-science-finlabs',
    title: 'Next-Gen Financial Services: Innovation through TP FinLabs',
    category: 'AI & DATA SCIENCE',
    image: headquarters,
    summary:
      'Leveraging artificial intelligence, predictive underwriting, and data science models to revolutionize modern banking and fintech.',
    body: 'Through research and development initiatives in our FinLabs, TP iT GROUP LLC develops modernization solutions ranging from AI-driven decision engines to blockchain ledgers and mobile-first portals.\n\nOur specialized deep-tech engineering teams partner with leading financial institutions to streamline regulatory compliance, mitigate credit risk, and build consumer-facing experiences that set industry benchmarks.',
  },
  {
    slug: 'strategic-global-workforce',
    title: 'Scaling Technical Excellence with a 10,000+ Global Workforce',
    category: 'WORKFORCE SOLUTIONS',
    image: team,
    summary:
      'Why certified technical talent and agile delivery teams across 5 continents empower businesses to outpace market demands.',
    body: 'Bridging technical talent shortages requires a global perspective combined with local domain execution. With offices across the USA, India, Canada, UK, and Australia, TP iT GROUP LLC connects top-tier engineering talent with world-class enterprises.\n\nOver the last 20+ years, our commitment to people and continuous learning has earned multiple employer awards, fostering high-performing teams that deliver enduring digital impact.',
  },
];

export function metadata(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | TP iT GROUP LLC` },
      { name: 'description', content: description },
      { property: 'og:title', content: `${title} | TP iT GROUP LLC` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  };
}
