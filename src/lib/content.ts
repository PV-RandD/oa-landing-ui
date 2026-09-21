export const partnerUrl = "https://www.openassets.to/partner/";
export const benefits = [
  {
    id: "issuance",
    label: "Asset lifecycle",
    title: "Issue and manage your digital assets.",
    description:
      "Create tokens and manage them after issuance. Use asset management tools to support ongoing operations as your requirements change.",
    image: "/assets/benefit-tokenization.webp",
    alt: "A physical asset becomes connected digital representations.",
    tags: ["Asset creation", "Lifecycle management"],
  },
  {
    id: "reach",
    label: "Network connectivity",
    title: "Plan your network connections.",
    description:
      "Choose blockchain connections around your asset and operating needs. Discuss supported networks and integration requirements with our team.",
    image: "/assets/benefit-global.webp",
    alt: "Silver rails connect glass asset nodes across a curved global surface.",
    tags: ["Blockchain connections", "Integration planning"],
  },
  {
    id: "compliance",
    label: "Programmable compliance",
    title: "Set rules for asset transfers.",
    description:
      "Apply participant checks and transfer restrictions to your issuance. Tools include identity verification, allowlists, and freeze controls to support your compliance processes.",
    image: "/assets/benefit-compliance.webp",
    alt: "Glass asset tiles pass through a precisely engineered control frame.",
    tags: ["Identity & eligibility", "Transfer controls"],
  },
  {
    id: "custom",
    label: "Flexible issuance",
    title: "Configure issuance around your asset.",
    description:
      "Adapt your issuance setup to the rights a token represents and the participants it serves. Define the controls and workflows your operations require.",
    image: "/assets/benefit-issuance.webp",
    alt: "Different glass asset tiles align with configurable metal rail channels.",
    tags: ["Modular infrastructure", "Asset-specific design"],
  },
] as const;
export const steps = [
  {
    title: "Define your asset",
    description:
      "Identify the underlying asset and the rights each token will represent. Define who can participate and what they need to do.",
  },
  {
    title: "Design the framework",
    description:
      "Map your issuance structure, participant checks, and transfer rules. Establish the legal and operational requirements the technology must support.",
  },
  {
    title: "Configure & issue",
    description:
      "Set up the token and its controls. Test the issuance workflow before making tokens available to eligible participants.",
  },
  {
    title: "Manage & connect",
    description:
      "Manage participants and asset operations after issuance. Review the integrations and controls needed as your project develops.",
  },
] as const;
export const navigation = [
  {
    id: "tokenization",
    label: "Tokenization",
  },
  {
    id: "benefits",
    label: "Benefits",
  },
  {
    id: "process",
    label: "How it works",
  },
  {
    id: "insights",
    label: "Resources",
  },
] as const;
