// Homepage copy and destinations. Keep business content out of animation code.
export const homepage = {
  name: "Webaurex Studio",
  email: "webaurex@gmail.com",
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Studio", href: "#studio" },
  ],
  enquiry: { label: "Start a project", href: "#contact" },
  hero: {
    video: "/videos/webhero.mp4",
    poster: "/images/webhero-v2-poster.webp",
    eyebrow: "Independent design & development studio",
    description: "Distinctive websites.\nThoughtfully built.",
    note: "For brands with a point of view.",
    explore: "Explore our work",
    interactionHint: "Move to bring it to life",
  },
  intro: {
    label: "The studio",
    heading: ["A distinct presence.", "Built around", "your brand."],
    description: "Webaurex is an independent design and development studio. We create websites, online stores and digital tools for brands, businesses and creators — considered in every detail, from the first impression to the way they work.",
  },
  work: {
    label: "Selected work",
    description: "Different brands. Distinct worlds.\nThe same attention to every detail.",
    closing: "Your next chapter starts here.",
  },
  services: {
    heading: ["Built for your brand.", "And what comes next."],
    description: "From the first impression to the systems behind it. Design and development, shaped around what your business needs.",
  },
  signature: {
    label: "The Webaurex signature",
    heading: ["Designed with intent.", "Built to work."],
    disciplines: ["Structure", "Design", "Interaction", "Development"],
  },
  process: {
    heading: ["Good work.", "A clear way there."],
    description: "An open conversation, a shared direction and care at every step. We connect the creative decisions with the practical ones, so the experience feels considered from start to finish.",
  },
  contact: {
    heading: ["Your next move.", "Made memorable."],
    description: "A new idea, a fresh direction or a website ready for more. Tell us what you have in mind.",
    formHeading: "Let's hear your idea.",
    emailNote: "Prefer a conversation by email?",
  },
};

export const projects = [
  {
    id: "bold-cave", name: "Bold Cave", href: "https://bolcave.com/",
    image: "/images/bold-cave-study.webp", category: "E-commerce · Design & development",
    artDirection: "amber", type: "E-commerce", label: "Featured collaboration",
    imageAlt: "Bold Cave fragrance bottle on a dark stone ledge",
    statement: "A bold identity. A complete commerce experience.",
    description: "A complete commerce experience, from product discovery to checkout and everyday operations.",
    scope: ["Product UX", "Full-stack development", "Payments & checkout", "Orders & admin"],
  },
  {
    id: "sumukh-visuals", name: "Sumukh Visuals", href: "https://www.sumukhvisuals.com/",
    image: "/reference/project-1.webp", category: "Creative business · Design & development",
    artDirection: "red", type: "Creative business", label: "Design & development",
    imageAlt: "Cinematic red-lit astronaut visual for Sumukh Visuals",
    statement: "A creative world, with business built in.",
    description: "A digital home for a creative brand, connecting its work, services and client experience.",
    scope: ["Website design", "Development", "Digital products & payments", "Client workflows"],
  },
  {
    id: "styleloom", name: "Styleloom", href: "https://styleloom-ecommerce-proj.vercel.app/",
    image: "/images/styleloom-study.webp", category: "Fashion e-commerce · Full-stack development",
    artDirection: "sand", type: "Fashion e-commerce", label: "Full-stack development",
    imageAlt: "Styleloom fashion editorial with a cream tailored jacket",
    statement: "Considered style. Connected commerce.",
    description: "An end-to-end fashion storefront, pairing a responsive shopping experience with the systems behind it.",
    scope: ["Storefront", "Authentication", "Cart & payments", "Backend & admin"],
  },
];

export const services = [
  {
    id: "ecommerce", shortTitle: "E-commerce",
    title: "E-commerce & D2C Stores",
    media: "/services/ecom1.png",
    description: "Conversion-focused online stores built around your products, brand and customer journey — from product discovery to checkout, payments and fulfilment.",
    capabilities: ["Custom storefronts", "Product & variant systems", "Cart & checkout flows", "Payment integrations", "Admin & order management", "Shipping & fulfilment"],
  },
  {
    id: "business", shortTitle: "Business website",
    title: "Business & Brand Websites",
    media: "/services/busin2.png",
    description: "High-impact websites that clearly communicate what your business does, strengthen your brand and turn visitors into genuine enquiries.",
    capabilities: ["Business websites", "Service websites", "Landing pages", "Responsive development", "Content integration", "Enquiry & contact flows"],
  },
  {
    id: "portfolio", shortTitle: "Portfolio",
    title: "Portfolio & Creator Websites",
    media: "/services/portfol3.png",
    description: "Distinctive digital portfolios that bring your work, personality and services together — helping people understand what you do and remember you.",
    capabilities: ["Creative portfolios", "Personal brand websites", "Case studies & showreels", "Interactive project showcases", "Service & enquiry flows", "Digital product integration"],
  },
  {
    id: "portals", shortTitle: "Portal or web app",
    title: "Client Portals & Web Apps",
    media: "/services/client4.png",
    description: "Private digital spaces where your clients can track project progress, review work, approve revisions, check deadlines and manage payments — all from one place.",
    capabilities: ["Client dashboards", "Project progress tracking", "Reviews & approvals", "Payment workflows", "Files & deliveries", "Custom portal features"],
  },
];

export const processSteps = [
  { title: "Find the direction.", label: "Discover", description: "We get to know your brand, audience and goals. Together, we define what the website needs to do and what will make it yours.", outcome: "A shared brief & clear scope" },
  { title: "Give it character.", label: "Design", description: "Structure, visual direction and interaction come together. You see the experience take shape, with room for thoughtful feedback.", outcome: "A considered design direction" },
  { title: "Make it work.", label: "Develop", description: "We bring the design to life across screens and connect the features, content and integrations your business needs.", outcome: "A working, connected website" },
  { title: "Get it out there.", label: "Launch", description: "We test the important journeys, refine the details and prepare the site for launch, with a clear handover and agreed next steps.", outcome: "A confident launch & handover" },
];

export const faqs = [
  { question: "What kinds of projects do you take on?", answer: "We design and develop e-commerce stores, business and brand websites, creative portfolios, client portals and lightweight web apps. The right approach starts with what you need the experience to do." },
  { question: "Can you redesign our existing website?", answer: "Yes. We can rethink the full experience or improve the parts that need attention. We start by reviewing the current site, what is working and what your next version needs to achieve." },
  { question: "Do you handle both design and development?", answer: "Yes. We can take a website from structure and visual design through responsive development, integrations, testing and launch. If you already have a design or an existing platform, we can discuss how to work with it." },
  { question: "How do you decide the timeline and cost?", answer: "The scope, number of pages, features, content readiness and integrations all shape the estimate. After understanding the project, we outline the deliverables, timeline and cost so the expectations are clear before work begins." },
  { question: "Will we be able to update the website?", answer: "Where ongoing editing is part of the brief, we can include a CMS, an admin dashboard or another suitable content workflow. We agree on what you need to manage and cover it in the handover." },
  { question: "What do you need from us to get started?", answer: "A little about your business, the goal of the project and any references you like is a useful start. Share an existing website, available brand assets, an ideal timeline and a budget range if you have them. We can work through the rest together." },
];
