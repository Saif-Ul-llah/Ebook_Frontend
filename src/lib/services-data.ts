import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "ghostwriting",
    title: "Ghostwriting",
    kicker: "Shape the book you have been carrying.",
    description:
      "Collaborative story development, chapter planning, and polished long-form writing for memoirs, fiction, business books, and thought leadership.",
    features: ["Book outlines", "Chapter drafts", "Voice matching", "Revision rounds"],
  },
  {
    slug: "editing",
    title: "Editing & Proofreading",
    kicker: "Turn a draft into a professional manuscript.",
    description:
      "Developmental editing, line editing, copyediting, and proofing for authors preparing for digital or print publication.",
    features: ["Editorial review", "Line edits", "Proofreading", "Reader readiness"],
  },
  {
    slug: "cover-design",
    title: "Cover Design",
    kicker: "Make the first impression count.",
    description:
      "Premium ebook and print cover concepts built around genre expectations, market positioning, and author brand.",
    features: ["Market research", "Cover concepts", "Typography", "Print-ready files"],
  },
  {
    slug: "publishing",
    title: "Publishing Support",
    kicker: "Launch with a practical plan.",
    description:
      "Formatting, metadata preparation, store setup guidance, and launch checklists for independent authors.",
    features: ["Ebook formatting", "Metadata", "Store guidance", "Launch planning"],
  },
  {
    slug: "marketing",
    title: "Book Marketing",
    kicker: "Build visibility before and after launch.",
    description:
      "Audience positioning, author websites, social campaigns, and launch assets that help readers discover the book.",
    features: ["Author websites", "Social campaigns", "Book trailers", "Launch assets"],
  },
  {
    slug: "audiobook",
    title: "Audiobook Guidance",
    kicker: "Prepare your story for listening.",
    description:
      "Narration planning, script cleanup, production direction, and distribution preparation for audiobook releases.",
    features: ["Narration briefs", "Script cleanup", "Production notes", "Release checklist"],
  },
];

export const serviceColumns = [
  {
    title: "Ghost Writing",
    items: [
      "Story Writing",
      "Song Writing",
      "Memoir Writing",
      "Non-Fiction Writing",
      "Rhymes Writing",
      "Biography Writing",
      "Autobiography",
      "SEO Content Writing",
      "Hip Hop Writing",
      "Script Writing",
      "Novel Writing",
      "Wiki Writing",
      "Speech Writing",
      "Comedy Writing",
      "Movie Writing",
    ],
  },
  {
    title: "Editing",
    items: [
      "Book Formatting",
      "Developmental Editing",
      "Children's Book Editors",
      "Line Editing",
      "Sensitive Reading",
      "Proofreading",
    ],
  },
  {
    title: "Book Marketing",
    items: [
      "Author Website",
      "SEO Marketing",
      "Social Media Marketing",
      "Video Trailers",
      "Times Square Video Animation",
    ],
  },
  {
    title: "Publishing Formats",
    items: ["Ebook Writing", "Paperback", "Hardcover", "Audible Book Publishing"],
  },
  {
    title: "Design & Illustrations",
    items: ["Book Cover Design", "Children's Book Illustrations", "Comic Book"],
  },
];

export const achievementBadges = [
  ["#1", "International", "Bestselling author"],
  ["#1", "New York", "Times Bestseller"],
  ["700+", "Books", "Written"],
  ["250+", "American", "Writers"],
  ["10", "Years", "Experience"],
];

export const whyChoose = [
  {
    title: "Skilled Book Writers",
    description:
      "Experienced writers shape your story with structure, voice, and reader-focused momentum.",
  },
  {
    title: "Around-the-Clock Consultation",
    description:
      "Clear communication keeps the project moving, from first brief through final delivery.",
  },
  {
    title: "Thoughtful Revisions",
    description:
      "Revision rounds keep your voice intact while improving clarity, pacing, and polish.",
  },
  {
    title: "Guaranteed Quality",
    description:
      "Editorial review and production checks keep each manuscript aligned with professional standards.",
  },
];

export const genreTags = [
  "Story writing",
  "Song writing",
  "Memoir writing",
  "Non-fiction writing",
  "Biography writing",
  "Autobiography writing",
  "SEO writing",
  "Hip hop writing",
  "Spanish translation",
  "Novel writing",
  "Speech writing",
  "Script writing",
  "Military fiction writing",
  "Wikipedia writing",
  "Movie writing",
  "French translation",
];

export const testimonials = [
  {
    name: "Mara Ellison",
    role: "Memoir author",
    quote:
      "The editorial process gave my manuscript structure without stripping away my voice. I finally felt ready to publish.",
  },
  {
    name: "Daniel Cross",
    role: "Business author",
    quote:
      "Their team translated rough ideas into a polished book plan and kept every milestone easy to understand.",
  },
  {
    name: "Priya Raman",
    role: "Fiction writer",
    quote:
      "The cover direction, formatting, and launch support made the whole release feel professional from day one.",
  },
];

export const faqs = [
  {
    question: "Can I keep full ownership of my book?",
    answer:
      "Yes. The platform is designed around author ownership. Service work supports your manuscript, brand, and launch goals.",
  },
  {
    question: "Do I need a finished manuscript?",
    answer:
      "No. You can start with an idea, outline, partial draft, or completed manuscript. The recommended service path changes based on your stage.",
  },
  {
    question: "How does the first consultation work?",
    answer:
      "Submit your project details, then the team reviews the scope and follows up with recommended next steps.",
  },
  {
    question: "Are file uploads available?",
    answer:
      "The first version captures manuscript metadata. Secure document upload storage is planned as a later integration.",
  },
];
