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
  { label: 'Global Markets', value: 'Multiple' },
  { label: 'Projects Delivered', value: '10,000+' },
  { label: 'Global Workforce', value: '10,000+' },
  { label: 'Founded', value: '2005' },
];

export const services = [
  {
    id: 'cloud-computing',
    title: 'Cloud Computing & Infrastructure',
    shortTitle: 'Cloud Computing',
    summary: 'Advanced cloud infrastructure migration and management across AWS, Azure, and Google Cloud.',
    desc: 'Transform your IT infrastructure with scalable, secure, and cost-effective cloud solutions tailored to your business needs.',
    offers: [
      'Cloud migration strategy & execution',
      'Secure and scalable environments',
      'Disaster recovery & business continuity',
      'Multi-cloud & hybrid cloud architecture',
      'Performance optimization & monitoring',
      'Cost optimization & resource management',
    ],
  },
  {
    id: 'erp-sap',
    title: 'ERP & SAP Solutions',
    shortTitle: 'ERP & SAP Solutions',
    summary: 'End-to-end software solutions including ERP, SAP, and custom enterprise applications tailored for scale.',
    desc: 'Streamline your business processes with comprehensive ERP and SAP solutions that drive efficiency and provide actionable insights.',
    offers: [
      'SAP implementation & customization',
      'ERP planning & strategy',
      'Integration with existing systems',
      'SAP S/4HANA migration',
      'Business process automation',
      'Training & change management',
    ],
  },
  {
    id: 'custom-dev',
    title: 'Custom Application Development',
    shortTitle: 'Custom Development',
    summary: 'Creating powerful, scalable applications designed specifically for your business requirements.',
    desc: 'Create powerful, scalable applications designed specifically for your business requirements and growth objectives.',
    offers: [
      'Web application development',
      'Enterprise software solutions',
      'UI/UX design & development',
      'Mobile app development (iOS & Android)',
      'API development & integration',
      'Quality assurance & testing',
    ],
  },
  {
    id: 'app-maintenance',
    title: 'Application Maintenance & Support',
    shortTitle: 'App Maintenance',
    summary: 'Comprehensive maintenance and support services available around the clock to ensure stability.',
    desc: 'Ensure your applications run smoothly with our comprehensive maintenance and support services available around the clock.',
    offers: [
      '24/7 monitoring & support',
      'Performance optimization',
      'Feature enhancements',
      'Bug fixes & issue resolution',
      'Security updates & patches',
      'Technical documentation',
    ],
  },
  {
    id: 'workforce-solutions',
    title: 'Workforce Solutions',
    shortTitle: 'Workforce Solutions',
    summary: 'Connecting world-class talent with leading companies across North America, Europe, and Asia.',
    desc: 'Specialized global workforce solutions providing premier deep-tech engineering and IT staffing across USA, India, UK, and Canada.',
    offers: [
      'Contract & permanent technical staffing',
      'Dedicated development teams',
      'Executive & niche skill search',
      'Global workforce compliance',
      'Onsite & offshore talent models',
      'Rapid talent onboarding',
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
    desc: 'Modern digital banking & fintech solutions with regulatory compliance.',
  },
  {
    name: 'IT Companies',
    desc: 'Enterprise technology solutions, cloud infrastructure & DevOps.',
  },
  {
    name: 'Pharma & Healthcare',
    desc: 'Compliant healthcare systems, HIPAA-compliant patient pipelines.',
  },
  {
    name: 'Manufacturing',
    desc: 'Industrial automation, IoT sensor integration & smart factory systems.',
  },
  {
    name: 'Enterprises & Startups',
    desc: 'Scalable growth architecture from MVP to enterprise scale.',
  },
  {
    name: 'Engineering & Field Services',
    desc: 'Technical workforce support, project engineering & global staffing.',
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
    desc: 'We execute with meticulous attention to detail, following agile methodologies to ensure quality delivery within timeline.',
  },
  {
    number: '04',
    title: 'Ongoing Support & Optimization',
    desc: 'Our partnership continues post-launch with 24/7 support, monitoring, and continuous optimization for peak performance.',
  },
];

export const whyChooseUs = [
  {
    title: 'End-to-End IT Solutions',
    desc: 'Complete technology solutions from planning to execution and beyond.',
  },
  {
    title: 'Global Technology Experience',
    desc: 'Expertise across 5 continents with diverse industry knowledge.',
  },
  {
    title: 'Skilled Professional Team',
    desc: 'Certified experts in cloud, SAP, and advanced software development.',
  },
  {
    title: 'Reliable Long-Term Support',
    desc: '24/7 monitoring and dedicated support for continuous operations.',
  },
  {
    title: 'Cost-Effective & Scalable Services',
    desc: 'Solutions designed to grow with your business needs and budget.',
  },
];

export const coreValues = [
  {
    title: 'Mission-Driven Excellence',
    desc: 'We are committed to delivering solutions that create measurable impact for your business. Every project is approached with the goal of driving real growth and transformation.',
  },
  {
    title: 'Client-Centric Partnership',
    desc: 'We believe in building long-term relationships, not just completing projects. Your success is our success, and we work alongside you as true partners.',
  },
  {
    title: 'Innovation First',
    desc: 'Technology evolves rapidly, and so do we. We stay at the forefront of innovation to bring you the latest solutions that give you a competitive edge.',
  },
  {
    title: 'Reliability & Trust',
    desc: 'With 24/7 support and proven methodologies, we ensure your systems run smoothly. Our commitment to quality and security is unwavering.',
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
