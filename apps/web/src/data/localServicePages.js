const cityProfiles = {
  zurich: {
    name: 'Zurich',
    slug: 'zurich',
    industries: 'finance, banking, and tech startups',
    economy: 'global financial hub and leading technology ecosystem',
    challenge: 'standing out in a highly saturated, competitive, and fast-paced market',
    adjective: 'innovative',
    focus: 'scalability, security, and cutting-edge performance'
  },
  geneva: {
    name: 'Geneva',
    slug: 'geneva',
    industries: 'international organizations, private banking, and luxury goods',
    economy: 'diplomatic center and luxury market',
    challenge: 'appealing to a discerning, multilingual, and international audience',
    adjective: 'prestigious',
    focus: 'multilingual capabilities, premium aesthetics, and global reach'
  },
  bern: {
    name: 'Bern',
    slug: 'bern',
    industries: 'government, public administration, and healthcare',
    economy: 'administrative capital with a strong public sector',
    challenge: 'meeting strict compliance, accessibility, and security standards',
    adjective: 'reliable',
    focus: 'data security, accessibility, and institutional trust'
  },
  lausanne: {
    name: 'Lausanne',
    slug: 'lausanne',
    industries: 'education, research, sports administration, and startups',
    economy: 'dynamic innovation hub driven by EPFL and international sports',
    challenge: 'translating complex research and dynamic startup ideas into accessible digital experiences',
    adjective: 'dynamic',
    focus: 'innovation, user engagement, and agile methodologies'
  },
  basel: {
    name: 'Basel',
    slug: 'basel',
    industries: 'pharmaceuticals, chemicals, and life sciences',
    economy: 'world-leading life sciences and logistics cluster',
    challenge: 'communicating highly technical information with precision and clarity',
    adjective: 'precision-driven',
    focus: 'technical accuracy, B2B integration, and robust data handling'
  },
  lucerne: {
    name: 'Lucerne',
    slug: 'lucerne',
    industries: 'tourism, hospitality, and precision manufacturing',
    economy: 'premier tourist destination and cultural center',
    challenge: 'capturing the visual beauty of the region while driving international bookings and sales',
    adjective: 'captivating',
    focus: 'visual storytelling, conversion optimization, and internationalization'
  },
  'st-gallen': {
    name: 'St. Gallen',
    slug: 'st-gallen',
    industries: 'textiles, SMEs, and business services',
    economy: 'strong SME backbone with a rich manufacturing heritage',
    challenge: 'modernizing traditional business models for the digital age',
    adjective: 'pragmatic',
    focus: 'ROI-driven solutions, digital transformation, and SME growth'
  },
  winterthur: {
    name: 'Winterthur',
    slug: 'winterthur',
    industries: 'engineering, smart manufacturing, and green tech',
    economy: 'industrial powerhouse transitioning to high-tech engineering',
    challenge: 'showcasing complex engineering solutions to a global B2B market',
    adjective: 'industrial-grade',
    focus: 'B2B lead generation, technical showcases, and performance'
  },
  biel: {
    name: 'Biel',
    slug: 'biel',
    industries: 'watchmaking, precision engineering, and communications',
    economy: 'bilingual capital of the Swiss watchmaking industry',
    challenge: 'bridging the French-German language divide while maintaining luxury brand standards',
    adjective: 'meticulous',
    focus: 'bilingual UX, pixel-perfect design, and brand heritage'
  },
  neuchatel: {
    name: 'Neuchâtel',
    slug: 'neuchatel',
    industries: 'micro-technology, watchmaking, and innovation',
    economy: 'hub for micro-tech and high-precision industries',
    challenge: 'highlighting microscopic precision and technological superiority digitally',
    adjective: 'high-tech',
    focus: 'advanced integrations, sleek interfaces, and technological authority'
  }
};

const serviceProfiles = {
  'web-development': {
    id: 'web',
    name: 'Web Development',
    slug: 'web-development',
    action: 'building high-performance websites',
    benefit: 'drive conversions and establish digital authority',
    deliverables: ['Custom UI/UX Design', 'Frontend & Backend Development', 'CMS Integration', 'Performance Optimization'],
    faqContext: 'website performance, CMS choices, and mobile responsiveness'
  },
  'app-development': {
    id: 'app',
    name: 'App Development',
    slug: 'app-development',
    action: 'creating native and cross-platform mobile applications',
    benefit: 'engage users on the go with seamless experiences',
    deliverables: ['iOS & Android Development', 'UI/UX App Design', 'API Integration', 'App Store Deployment'],
    faqContext: 'app store guidelines, cross-platform vs native, and user retention'
  },
  'digital-marketing': {
    id: 'marketing',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    action: 'executing data-driven marketing campaigns',
    benefit: 'maximize ROI and dominate your local market',
    deliverables: ['PPC Campaigns', 'Social Media Marketing', 'Content Strategy', 'Conversion Rate Optimization'],
    faqContext: 'ad spend ROI, platform selection, and campaign tracking'
  },
  'seo-agency': {
    id: 'seo',
    name: 'SEO Agency',
    slug: 'seo-agency',
    action: 'optimizing digital assets for search engines',
    benefit: 'achieve top rankings and sustainable organic traffic',
    deliverables: ['Technical SEO Audit', 'Keyword Strategy', 'On-Page Optimization', 'Link Building'],
    faqContext: 'ranking timelines, local SEO strategies, and algorithm updates'
  },
  'brand-development': {
    id: 'brand',
    name: 'Brand Development',
    slug: 'brand-development',
    action: 'crafting compelling brand identities',
    benefit: 'build lasting emotional connections with your audience',
    deliverables: ['Brand Strategy', 'Logo & Visual Identity', 'Brand Guidelines', 'Corporate Messaging'],
    faqContext: 'brand positioning, visual consistency, and rebranding timelines'
  },
  'business-intelligence': {
    id: 'bi',
    name: 'Business Intelligence',
    slug: 'business-intelligence',
    action: 'implementing advanced data analytics dashboards',
    benefit: 'transform raw data into actionable strategic insights',
    deliverables: ['Data Warehousing', 'Custom Dashboards', 'Predictive Analytics', 'Automated Reporting'],
    faqContext: 'data security, integration with existing tools, and real-time reporting'
  }
};

export const cities = Object.values(cityProfiles).map(c => ({ name: c.name, slug: c.slug }));
export const services = Object.values(serviceProfiles).map(s => ({ id: s.id, name: s.name, slug: s.slug }));

export const localServicePages = services.flatMap(service => 
  cities.map(city => {
    const cityData = cityProfiles[city.slug];
    const serviceData = serviceProfiles[service.slug];
    
    return {
      serviceId: service.id,
      serviceName: service.name,
      serviceSlug: service.slug,
      cityName: city.name,
      citySlug: city.slug,
      pageSlug: `${service.slug}-in-${city.slug}`,
      
      // 1. Hero Section
      pageTitle: `${service.name} Agency in ${city.name} | Market Ai`,
      metaDescription: `Top-tier ${service.name.toLowerCase()} services in ${city.name}. We help ${cityData.industries} businesses grow with ${cityData.adjective} digital solutions.`,
      heroSubheading: `Empowering ${city.name}'s ${cityData.industries} sector with next-generation ${service.name.toLowerCase()} solutions.`,
      valueProposition: `In the ${cityData.economy}, ${cityData.challenge} requires a specialized approach. Our ${service.name.toLowerCase()} services are engineered for ${cityData.focus}.`,
      
      // 2. Introduction
      introduction: [
        `The digital landscape in ${city.name} is evolving rapidly. As a ${cityData.economy}, local businesses face the unique challenge of ${cityData.challenge}. Market Ai provides specialized ${service.name.toLowerCase()} tailored specifically to the needs of ${city.name}'s vibrant market.`,
        `Whether you operate in ${cityData.industries}, our ${cityData.adjective} approach to ${service.name.toLowerCase()} ensures your business not only competes but leads. We combine deep local market understanding with world-class Swiss quality standards to deliver measurable results.`
      ],
      
      // 3. Service Overview
      serviceOverview: {
        description: `Our ${service.name} solutions in ${city.name} focus on ${serviceData.action} to ${serviceData.benefit}. We understand that businesses in the ${cityData.industries} space require robust, scalable, and highly secure digital assets.`,
        features: [
          `Tailored for ${city.name}'s specific demographic and economic profile.`,
          `Built with ${cityData.focus} at the core of the strategy.`,
          `Seamless integration with your existing business processes.`
        ]
      },
      
      // 4. Local Benefits
      localBenefits: [
        `Deep expertise in ${city.name}'s ${cityData.industries} sectors.`,
        `Strategies designed to overcome the local challenge of ${cityData.challenge}.`,
        `Proximity for in-person consultations and strategic alignments in ${city.name}.`,
        `Multilingual capabilities suited for ${city.name}'s diverse audience.`,
        `Alignment with Swiss data protection and quality standards.`
      ],
      
      // 5. Why Choose Us
      whyChooseUs: [
        `Market Ai isn't just another agency; we are your local digital growth partners in ${city.name}. Our deep understanding of the ${cityData.economy} allows us to craft strategies that resonate with your specific target audience.`,
        `We have a proven track record of helping businesses in ${city.name} navigate digital transformation. By focusing on ${cityData.focus}, we ensure our ${service.name.toLowerCase()} solutions deliver a tangible return on investment.`
      ],
      
      // 6. Service Details
      serviceDetails: {
        methodology: `Our process for ${service.name} in ${city.name} is highly collaborative and data-driven.`,
        deliverables: serviceData.deliverables,
        timeline: 'Typically 4 to 12 weeks depending on project complexity and scope.'
      },
      
      // 7. Testimonials
      testimonial: {
        quote: `Market Ai transformed our digital presence. Their understanding of the ${city.name} landscape combined with their excellence in ${service.name.toLowerCase()} made them the perfect partner.`,
        author: `Leading Enterprise in ${cityData.industries}`,
        location: `${city.name}, Switzerland`
      },
      
      // 8. FAQs
      faqs: [
        {
          question: `Why do I need specialized ${service.name} in ${city.name}?`,
          answer: `The ${city.name} market is unique, especially within ${cityData.industries}. A specialized approach ensures your digital presence addresses local consumer behaviors and overcomes the challenge of ${cityData.challenge}.`
        },
        {
          question: `How long does a ${service.name} project take?`,
          answer: `For businesses in ${city.name}, timelines vary based on requirements, but most ${service.name.toLowerCase()} projects are completed within 4 to 12 weeks.`
        },
        {
          question: `Do you understand the specific needs of ${cityData.industries}?`,
          answer: `Absolutely. Our team has extensive experience delivering ${cityData.adjective} solutions tailored for the ${cityData.economy}.`
        },
        {
          question: `Can we meet in person in ${city.name}?`,
          answer: `Yes, we prioritize close collaboration and are available for strategic meetings in ${city.name} to ensure perfect alignment.`
        },
        {
          question: `What makes your ${service.name} different from competitors?`,
          answer: `We combine global AI innovations with deep local insights into the ${city.name} market, focusing heavily on ${cityData.focus}.`
        }
      ],
      
      // Keywords for SEO
      localKeywords: [
        `${service.name.toLowerCase()} ${city.name.toLowerCase()}`,
        `${city.name.toLowerCase()} ${service.name.toLowerCase()} agency`,
        `best ${service.name.toLowerCase()} in ${city.name}`,
        `${cityData.industries} ${service.name.toLowerCase()} ${city.name}`
      ]
    };
  })
);

export const getServices = () => services;
export const getCities = () => cities;