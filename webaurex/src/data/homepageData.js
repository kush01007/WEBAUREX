// Replace reference imagery and clearly marked sample content with approved work.
export const studio = {
  name: "Webaurex Studio",
  email: null,
  navigation: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Works", href: "#work" },
    { label: "Pricing", href: "#contact" },
    { label: "Blog", href: "#journal" },
    { label: "Contact", href: "#contact" },
  ],
};

export const projects = [
  {
    slug: "bold-cave",
    title: "BOLD CAVE",
    category: "E-commerce Website",
    image: "/showcase/bolddesk.png",
    imageWidth: 1672,
    imageHeight: 941,
    mobileImage: "/showcase/boldmobile.png",
    mobileImageWidth: 1024,
    mobileImageHeight: 1536,
    imageAlt: "Bold Cave fragrance store shown across desktop and mobile",
    description: "A premium fragrance website shaped around atmosphere, product discovery, and a clear shopping experience.",
    url: "https://boldcave.com/",
  },
  {
    slug: "sumukh-visuals",
    title: "SUMUKH VISUALS",
    category: "Creative Brand Website",
    image: "/showcase/sumukhdesktop.png",
    imageWidth: 1672,
    imageHeight: 941,
    mobileImage: "/showcase/sumukhmobile.png",
    mobileImageWidth: 1024,
    mobileImageHeight: 1536,
    imageAlt: "Sumukh Visuals portfolio shown across desktop and mobile",
    description: "An image-led digital home that brings the brand's services, work, and creative character into one focused experience.",
    url: "https://www.sumukhvisuals.com/",
  },
  {
    slug: "styleloom",
    title: "STYLELOOM",
    category: "Fashion E-commerce",
    image: "/showcase/styleloomdesktop.png",
    imageWidth: 1672,
    imageHeight: 941,
    mobileImage: "/showcase/styloommobile.png",
    mobileImageWidth: 941,
    mobileImageHeight: 1672,
    imageAlt: "Styleloom fashion store shown across desktop and mobile",
    description: "An editorial fashion store balancing expressive imagery with an easy path from discovery to product.",
    url: "https://styleloom-ecommerce-proj.vercel.app/",
  },
];

// Retain the original concept gallery as a separate, accessible sketchbook.
export const conceptStudies = [
  { title: "Beyond the Ordinary", category: "Art direction · Concept exploration", image: "/reference/project-1.webp", shape: "short", description: "A bold visual direction built around contrast, atmosphere, and a single unmistakable point of view." },
  { title: "Quiet Form", category: "Visual identity · Concept exploration", image: "/reference/project-2.webp", shape: "tall", description: "An exploration of natural materials, soft geometry, and a quieter kind of confidence." },
  { title: "New Horizons", category: "Digital experience · Concept exploration", image: "/reference/project-3.webp", shape: "wide", description: "A playful meeting of the familiar and the unexpected, designed to make room for curiosity." },
  { title: "In Good Company", category: "Brand experience · Concept exploration", image: "/reference/project-4.webp", shape: "tall", description: "A considered visual world that connects individual details through a clear and consistent creative direction." },
  { title: "Another Perspective", category: "Creative direction · Concept exploration", image: "/reference/project-5.webp", shape: "short", description: "An expressive study in composition and character, with a visual language that makes an immediate impression." },
  { title: "Made to Matter", category: "Brand identity · Concept exploration", image: "/reference/project-6.webp", shape: "wide", description: "A cohesive design direction that brings a simple idea into focus across a complete brand experience." },
];

export const services = [
  { title: "ECOMMERCE", description: "Make the product the main event. Considered stores that bring your brand into focus and make shopping feel effortless.", image: "/images/bold-cave-study.webp", items: ["Store design & development", "Product storytelling", "Shopping & checkout", "Launch support"] },
  { title: "BUSINESS", description: "A clear expression of who you are. Distinctive websites that turn your business into a place people want to spend time.", image: "/reference/project-1.webp", items: ["Creative direction", "Website design & development", "Content structure", "Responsive experiences"] },
  { title: "PORTFOLIO", description: "Your work deserves its own point of view. Image-led portfolios for people and practices with something original to show.", image: "/images/styleloom-study.webp", items: ["Art direction", "Project storytelling", "Portfolio development", "Thoughtful interaction"] },
];

// Original capability descriptions retained for future detailed service pages.
export const studioCapabilities = [
  { title: "Brand Strategy", description: "Every distinctive brand starts with a clear point of view. We connect your purpose, audience, and ambition to a direction that guides everything you put into the world.", image: "/reference/service-1.webp", items: ["Audience research", "Brand positioning", "Creative direction", "Brand personality", "Messaging framework", "Tone of voice"] },
  { title: "Visual Identity", description: "We turn your brand's character into a visual language. From the first impression to the smallest detail, every element works together to make you recognisable.", image: "/reference/service-2.webp", items: ["Logo systems", "Art direction", "Type systems", "Identity guidelines", "Image direction", "Brand applications"] },
  { title: "Website", description: "Your website should feel like a natural extension of your brand. We combine deliberate design with careful development to create an experience that works beautifully on every screen.", image: "/reference/service-3.webp", items: ["Experience design", "Interface design", "Responsive development", "CMS integration", "Performance", "Launch support"] },
  { title: "Product", description: "We shape digital products around the people who use them. Clear flows, useful interactions, and consistent design make complex ideas feel simple.", image: "/reference/service-4.webp", items: ["Product discovery", "User journeys", "Interactive prototypes", "Design systems", "Usability reviews", "Product interfaces"] },
];

export const testimonials = [
  { company: "Bold Cave", name: "Ravi Singh", role: "Founder", quote: "The website feels clean, premium, and very easy to use. Everything from products to checkout works smoothly, and the overall experience feels much more professional now.", emphasis: "clean, premium, and very easy to use" },
  { company: "Sumukh Visuals", name: "Sumukh Bhardwaj", role: "Founder", quote: "The final website matches my work really well. It feels creative, organised, and professional without being complicated. The client side is also very easy to understand.", emphasis: "creative, organised, and professional" },
  { company: "StyleLoom", name: "Neha Verma", role: "Founder", quote: "The website looks modern and feels smooth to browse. The overall design is clean, and the shopping experience feels simple and well put together.", emphasis: "modern and feels smooth to browse" },
  { company: "WanderBoss", name: "Arjun Gupta", role: "Founder", quote: "Clean design, smooth experience, and everything works the way we wanted. The final website feels much more polished and complete.", emphasis: "Clean design, smooth experience" },
];

export const articles = [
  {
    slug: "what-makes-an-online-store-feel-trustworthy",
    title: "What Makes an Online Store Feel Trustworthy?",
    image: "/blog/blog1.png",
    imageAlt: "A carefully presented online shop displayed on a laptop and phone beside product packaging",
    category: "E-commerce",
    readTime: "4 min read",
    description: "The small design and checkout decisions that help customers feel confident enough to buy.",
    author: "Webaurex Studio",
    introduction: [
      "Buying online always involves a small amount of trust.",
      "A customer cannot physically touch the product, speak to someone at the counter, or immediately know what happens after they make a payment. The website has to remove those doubts for them.",
      "A trustworthy online store is not created by adding more badges, popups, or claims. It comes from making every important step feel clear, predictable, and professional.",
    ],
    sections: [
      {
        heading: "Clear information reduces hesitation",
        paragraphs: [
          "Customers should not have to search for basic information before making a decision.",
          "Product details, pricing, available options, delivery information, returns, and important policies should be easy to understand and placed where people naturally expect them.",
          "The fewer unanswered questions a customer has, the easier it becomes to continue toward checkout.",
        ],
      },
      {
        heading: "Checkout should feel predictable",
        paragraphs: [
          "Checkout is where trust matters most.",
          "Customers should always understand what they are buying, how much they are paying, where the order will be delivered, and what happens after payment.",
          "Unexpected costs, confusing forms, unnecessary steps, or unclear payment states create hesitation at exactly the wrong moment.",
          "A good checkout does not try to impress the customer. It simply makes completing the purchase feel safe and effortless.",
        ],
      },
      {
        heading: "Small details create confidence",
        paragraphs: [
          "Trust also comes from consistency.",
          "Working navigation, responsive layouts, proper loading states, accurate stock information, clear error messages, secure payments, and reliable order confirmation may feel like small technical details.",
          "Together, they determine whether a store feels professionally built or unfinished.",
        ],
      },
    ],
    conclusion: [
      "Customers rarely think, \"this website has excellent trust design.\"",
      "They simply feel comfortable enough to continue.",
      "That is the goal.",
      "A strong e-commerce experience removes uncertainty step by step so customers can focus on the product instead of questioning the website.",
    ],
  },
  {
    slug: "a-good-website-makes-the-next-step-obvious",
    title: "A Good Website Makes the Next Step Obvious",
    image: "/blog/blog2.png",
    imageAlt: "A sketched website wireframe showing a clear content hierarchy and next step",
    category: "Web design",
    readTime: "3 min read",
    description: "Why clear structure, hierarchy, and calls to action matter more than adding more elements.",
    author: "Webaurex Studio",
    introduction: [
      "A website can look beautiful and still be difficult to use.",
      "The problem usually is not a lack of design. It is a lack of direction.",
      "When someone lands on a page, they should quickly understand where they are, what the business offers, and what they can do next.",
      "Good web design makes those answers obvious.",
    ],
    sections: [
      {
        heading: "Every page needs a clear hierarchy",
        paragraphs: [
          "Not every piece of information deserves the same amount of attention.",
          "Headlines should lead into supporting information. Important actions should stand apart from secondary ones. Sections should appear in an order that feels natural.",
          "When everything competes for attention, users have to decide what matters.",
          "Good hierarchy makes that decision for them.",
        ],
      },
      {
        heading: "More elements do not mean more clarity",
        paragraphs: [
          "It is easy to keep adding.",
          "Another animation. Another button. Another card. Another section.",
          "But every additional element introduces something else the visitor has to process.",
          "Strong websites often feel simple because unnecessary decisions have already been removed during the design process.",
          "The goal is not to show everything at once. The goal is to show the right thing at the right moment.",
        ],
      },
      {
        heading: "Calls to action should feel natural",
        paragraphs: [
          "A call to action works best when it feels like the logical next step.",
          "After understanding a service, the visitor may want to view previous work. After viewing a product, they may want to add it to their cart. After reading about a business, they may want to make contact.",
          "The interface should support that progression instead of forcing users to figure it out themselves.",
        ],
      },
    ],
    conclusion: [
      "Good website structure is almost invisible.",
      "Visitors do not notice every spacing decision, hierarchy rule, or interaction.",
      "They simply know what to do next.",
      "And when a website feels easy to understand, people are far more likely to continue exploring it.",
    ],
  },
  {
    slug: "your-website-should-feel-like-your-brand",
    title: "Your Website Should Feel Like Your Brand",
    image: "/reference/journal-3.webp",
    imageAlt: "A distinctive editorial website displayed on a laptop in an expressive outdoor setting",
    category: "Brand thinking",
    readTime: "4 min read",
    description: "A strong website does more than look good — it carries the same personality as the business behind it.",
    author: "Webaurex Studio",
    introduction: [
      "Two businesses can sell similar products and still feel completely different.",
      "One may feel bold and energetic. Another may feel minimal and refined. Another may focus on warmth, familiarity, or craftsmanship.",
      "A website should communicate those differences before the visitor even reads every word.",
      "Because a website is not separate from the brand. It is one of the places where the brand is experienced most directly.",
    ],
    sections: [
      {
        heading: "Branding is more than a logo",
        paragraphs: [
          "Adding a logo and brand colors to a template does not automatically create a branded website.",
          "Brand identity also appears through typography, photography, spacing, motion, language, layout, and even the way buttons and interactions behave.",
          "Every decision contributes to a particular feeling.",
          "That feeling should make sense for the business behind the website.",
        ],
      },
      {
        heading: "The same design cannot work for every business",
        paragraphs: [
          "A fashion store, a creative studio, and a premium fragrance brand should not feel identical online.",
          "Their audiences are different. Their products are different. Their personalities are different.",
          "The website should respond to those differences rather than forcing every brand into the same visual system.",
          "Consistency is important, but individuality is what makes the experience memorable.",
        ],
      },
      {
        heading: "Design should support the business",
        paragraphs: [
          "Brand expression should never make the website harder to use.",
          "Strong digital branding balances personality with clarity.",
          "The customer should still be able to understand the navigation, find information, browse products, and complete important actions without friction.",
          "The best brand experiences feel distinctive without becoming complicated.",
        ],
      },
    ],
    conclusion: [
      "A good website does more than display a brand.",
      "It extends it.",
      "From the first screen to the final interaction, the design should feel like it belongs specifically to that business.",
      "When visual identity, usability, and personality work together, the website stops feeling like a template and starts feeling like the brand itself.",
    ],
  },
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getNextArticle(slug) {
  const index = articles.findIndex((article) => article.slug === slug);
  return articles[(index + 1) % articles.length];
}
