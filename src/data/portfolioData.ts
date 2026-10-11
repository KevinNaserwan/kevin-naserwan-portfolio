export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
  isCurrent?: boolean;
}

export interface Project {
  title: string;
  tagline: string;
  description: string;
  domain: string;
  tags: string[];
  githubUrl: string;
  badge: string;
  badgeColor: string;
}

export const PERSONAL_INFO = {
  name: "Kevin Putrayudha Naserwan",
  headline: "Application Developer at PT Bukit Asam (Persero) Tbk",
  subheadline: "Distributed Systems Engineer & Applied AI / Geospatial Researcher",
  avatarUrl: "https://avatars.githubusercontent.com/u/94282343?v=4",
  email: "kevinnaserwan@gmail.com",
  linkedin: "https://www.linkedin.com/in/kevinnaserwan/",
  github: "https://github.com/KevinNaserwan",
  location: "South Sumatra & Jakarta, Indonesia",
  bio: "Experienced Software Engineer and Applied AI Researcher with extensive expertise in scalable microservices architectures (NestJS, Go, .NET 8), distributed data pipelines, and multi-sensor satellite remote sensing. Alumnus of Universitas Sriwijaya (Informatics Engineering) and former Core Team member at Google Developer Student Club (GDSC) UNSRI."
};

export const METRICS = [
  { value: "3+", label: "Years Production Experience" },
  { value: "4,100+", label: "Pages Core Web Vitals Optimized" },
  { value: "4", label: "Flagship Open-Source Repositories" },
  { value: "Top 20", label: "Target: Barça Hackathon 2027" },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "PT Bukit Asam (Persero) Tbk",
    role: "Application Developer",
    period: "Oct 2026 - Present",
    location: "Muara Enim, South Sumatra",
    isCurrent: true,
    description: [
      "Architecting enterprise-grade application modules and microservices for national mining energy operations.",
      "Engineering resilient backend services using NestJS, strongly-typed TypeScript, and containerized architectures.",
      "Enforcing domain-driven design, data security compliance, and high-throughput transactional integrity."
    ],
    skills: ["NestJS", "Microservices", "TypeScript", "PostgreSQL", "Docker", "Enterprise Architecture"]
  },
  {
    company: "HashMicro",
    role: "Fullstack Developer",
    period: "Feb 2025 - Sep 2026",
    location: "Jakarta, Indonesia",
    description: [
      "Architected frontend migration from legacy PHP to Astro & TypeScript SSR with Island Architecture.",
      "Optimized Core Web Vitals across 4,100+ URLs, reducing poor-performing pages from 3,956 to 246 via asset caching and resource pipeline tuning.",
      "Engineered high-scale microservices using NestJS and Golang for HR, CRM, and distributed crawlers.",
      "Built AI automation pipelines integrating OpenAI, Claude, and Gemini APIs for automated content analysis.",
      "Managed production Kubernetes clusters, rolling deployments, and Grafana observability."
    ],
    skills: ["Golang", "NestJS", "Astro", "Kubernetes", "Docker", "Grafana", "Gemini API", "Redis"]
  },
  {
    company: "Meets Indonesia",
    role: "Founder & Backend Developer",
    period: "Feb 2024 - Jan 2025",
    location: "Palembang, Indonesia",
    description: [
      "Led end-to-end development of cross-platform apps with Next.js (TypeScript) and Flutter.",
      "Architected high-throughput event pipelines using Go and NestJS alongside legacy Laravel APIs with RabbitMQ message brokers.",
      "Integrated Redis caching layers for sub-second business logic approval workflows."
    ],
    skills: ["Golang", "RabbitMQ", "Redis", "Flutter", "Laravel", "Microservices"]
  },
  {
    company: "R17 Group",
    role: "Full Stack Engineer (UNPAD SIAKAD)",
    period: "Dec 2024 - Feb 2025",
    location: "Remote",
    description: [
      "Delivered enterprise Academic Management System (SIAKAD) for Universitas Padjadjaran (UNPAD).",
      "Engineered modular RESTful APIs in NestJS for grading systems, SKS recalculation, and curriculum scheduling.",
      "Built accessible academic portals utilizing Next.js & TypeScript with dynamic SSR filtering."
    ],
    skills: ["NestJS", "Next.js", "TypeScript", "Relational Modeling", "SSR"]
  },
  {
    company: "Serenade Story",
    role: "Backend Developer",
    period: "Sep 2024 - Mar 2025",
    location: "Remote",
    description: [
      "Refactored core RESTful APIs for high-volume e-commerce to handle heavy transactional spikes.",
      "Architected real-time rating & scoring engine over WebSockets with sub-second event broadcasts.",
      "Engineered enterprise search indexing using Elasticsearch and Algolia, slashing query time by 90%."
    ],
    skills: ["Laravel", "WebSockets", "Elasticsearch", "SQL Tuning", "Algolia"]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "football-possession-tracker",
    tagline: "Frame-by-Frame Ball Possession & Pitch Control Engine",
    description: "Automated football analytics pipeline tailored for More Than a Hack 2027 (Barça Innovation Hub & Metrica Sports). Implements planar homography calibration with Kalman smoothing, Spearman time-to-intercept, and HMM temporal filters.",
    domain: "Sports Analytics / Computer Vision",
    tags: ["Python", "OpenCV", "Pitch Control", "Homography", "SciPy"],
    githubUrl: "https://github.com/KevinNaserwan/football-possession-tracker",
    badge: "Barça Innovation Hub 2027",
    badgeColor: "border-red-500/30 text-red-400 bg-red-950/40"
  },
  {
    title: "sports-telemetry-engine",
    tagline: "High-Throughput Tracking & Telemetry Ingestion Microservice",
    description: "High-performance backend engine built on .NET 8, Clean Architecture, and Domain-Driven Design (DDD). Handles sub-millisecond telemetry ingestion, CQRS command dispatching, and Redis in-memory buffering.",
    domain: "Enterprise Backend Architecture",
    tags: [".NET 8", "C#", "Clean Architecture", "CQRS", "Redis"],
    githubUrl: "https://github.com/KevinNaserwan/sports-telemetry-engine",
    badge: "Enterprise .NET 8",
    badgeColor: "border-indigo-500/30 text-indigo-400 bg-indigo-950/40"
  },
  {
    title: "id-crop-yield-sentinel",
    tagline: "Remote Sensing & Spatio-Temporal Deep Learning for Rice Yield",
    description: "Multi-spectral remote sensing pipeline fusing Sentinel-1 SAR (all-weather microwave) and Sentinel-2 L2A optical imagery to predict Indonesian paddy yield (Tons/Ha) and detect crop failure (puso) risks.",
    domain: "National Food Security AI / M.Sc Thesis",
    tags: ["PyTorch", "Earth Engine", "Bi-LSTM Attention", "Sentinel-1/2"],
    githubUrl: "https://github.com/KevinNaserwan/id-crop-yield-sentinel",
    badge: "National Agri AI",
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-950/40"
  },
  {
    title: "nusantara-wildfire-earlywarning",
    tagline: "Tropical Peatland Wildfire (Karhutla) Susceptibility Forecast",
    description: "Proactive 3-to-7 day pre-ignition risk forecasting system for Indonesian peatlands (Sumatera & Kalimantan) utilizing satellite fuel moisture (NDMI/NBR), canal drainage distance decay models, and LightGBM.",
    domain: "Disaster Risk Reduction AI",
    tags: ["LightGBM", "GeoPandas", "MODIS/VIIRS", "Peat Hydrology"],
    githubUrl: "https://github.com/KevinNaserwan/nusantara-wildfire-earlywarning",
    badge: "Environmental AI",
    badgeColor: "border-amber-500/30 text-amber-400 bg-amber-950/40"
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Backend & Systems",
    skills: ["NestJS", "Golang (Gin)", ".NET 8 / C#", "Python (FastAPI)", "PHP (Laravel)", "gRPC & REST", "Domain-Driven Design (DDD)"]
  },
  {
    title: "AI, Data & Remote Sensing",
    skills: ["PyTorch", "OpenCV & Homography", "Google Earth Engine (GEE)", "GeoPandas & Rasterio", "LightGBM / XGBoost", "Multi-Modal AI Agents (Gemini/Claude)"]
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["Docker & Kubernetes", "PostgreSQL & MySQL", "Redis In-Memory Cache", "RabbitMQ & Apache Kafka", "Grafana & Prometheus", "Elasticsearch"]
  },
  {
    title: "Frontend & Mobile",
    skills: ["TypeScript", "Next.js (App Router)", "React", "Astro (Island SSR)", "Flutter & Dart", "Tailwind CSS", "Core Web Vitals Tuning"]
  }
];
