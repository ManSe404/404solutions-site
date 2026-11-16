// Scout's questions and answers. Answers are composed from the same data the
// page shows, so the bot cannot contradict the page. Imports carry the `.ts`
// extension because the tests load this file with plain Node.
//
// The projects come from a content collection, which only exists inside an
// Astro build, so the list is built by `buildFaq` from what the page passes in
// (ScoutChat.astro); the tests pass the same shape.

import type { FaqEntry } from '../lib/faq.ts';
import { company } from './company.ts';
import { steps } from './services.ts';

export interface FaqContext {
  /** Paths of the pages the answers link to, with the base, e.g. "/404solutions-site/services/". */
  services: string;
  process: string;
  /** Paths of the About page (intro, founder) and the Contact page. */
  about: string;
  contact: string;
  /** Titles of all delivered projects, and of the few Scout names as examples. */
  projectTitles: string[];
  featuredTitles: string[];
  /** The fields we delivered in (project categories) with their project counts, most first. */
  fields: { name: string; count: number }[];
  /** The tools behind the projects, most used first. */
  tools: string[];
}

export const mascot = {
  name: 'Scout',
  /** First message in the panel; must stay true: no AI, nothing leaves the page. */
  greeting:
    "Hi, I'm Scout. I answer common questions about 404 Solutions from a fixed list — no AI, and nothing you type leaves this page.",
  tagline: 'Answers from a fixed list · no AI',
};

const contactLinks = [
  ...(company.email ? [{ label: company.email, href: `mailto:${company.email}` }] : []),
  { label: 'LinkedIn', href: company.links.linkedin },
];

const writeTo = company.email ? `write to ${company.email}` : 'send a message on LinkedIn';

const list = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

export function buildFaq(ctx: FaqContext): FaqEntry[] {
  return [
    {
      id: 'services',
      question: 'What do you build?',
      keywords: ['build', 'service', 'offer', 'capability', 'ai', 'rag', 'agent', 'agentic', 'document', 'speech', 'pipeline', 'machine learning', 'ml', 'llm system', 'backend'],
      answer: `${ctx.projectTitles.length} projects so far, each built end to end, in ${list(ctx.fields.map((field) => `${field.name} (${field.count})`))}. If what you need is not on that list, ask anyway: that is what the name is for.`,
      links: [{ label: 'What we built', href: ctx.services }],
      related: ['process', 'work', 'stack'],
    },
    {
      id: 'process',
      question: 'How do we work together?',
      keywords: ['work together', 'engage', 'engagement', 'process', 'collaborat', 'collaboration', 'how do you work', 'method', 'team', 'step', 'discover', 'ship'],
      answer: `Four steps: ${list(steps.map((step) => step.label.toLowerCase()))}. From the problem statement to a system running in your cloud, kept running after launch.`,
      links: [{ label: 'See the four steps', href: ctx.process }],
      related: ['pricing', 'start', 'contact'],
    },
    {
      id: 'pricing',
      question: 'What does it cost?',
      keywords: ['cost', 'price', 'pricing', 'rate', 'day rate', 'hourly', 'budget', 'fee', 'quote', 'charge', 'expensive', 'how much'],
      answer: `It depends on the scope, so there is no price list here. Send a few lines on the problem, what you already have and the deadline, and we come back with how we would scope it. To start: ${writeTo}.`,
      links: contactLinks,
      related: ['process', 'start', 'contact'],
    },
    {
      id: 'contact',
      question: 'How do I reach you?',
      keywords: ['contact', 'reach', 'email', 'mail', 'e mail', 'talk', 'call', 'meet', 'meeting', 'linkedin', 'hire', 'start a project', 'get in touch', 'message', 'visit', 'come over', 'on site', 'onsite'],
      answer: `${writeTo.charAt(0).toUpperCase()}${writeTo.slice(1)}${company.email ? ', or send a message on LinkedIn' : ''}. A few lines on the problem, what you already have and the deadline are enough to start, or invite us over: we come to you, on site or on a call, and look at what you need.`,
      links: [...contactLinks, { label: 'Contact page', href: ctx.contact }],
      related: ['pricing', 'start', 'about'],
    },
    {
      id: 'work',
      question: 'Can I see examples?',
      keywords: ['example', 'case study', 'case', 'portfolio', 'project', 'delivered', 'reference', 'past work', 'previous work', 'shipped', 'proof'],
      answer: `${ctx.projectTitles.length} projects are listed on the Services page, a cell each with what it is, what it achieved, the role, the tools and who it was for — for example ${list(ctx.featuredTitles)}. End clients stay unnamed; what we built for them doesn't.`,
      links: [
        { label: 'What we built', href: ctx.services },
      ],
      related: ['partners', 'services', 'contact'],
    },
    {
      id: 'partners',
      question: 'Who have you worked with?',
      keywords: ['partner', 'worked with', 'work with', 'customer', 'client', 'clients', 'company', 'companies', 'who for', 'reference', 'references', 'name'],
      answer: 'We do not name clients or the companies we deliver with: most of the work is under NDA. The Services page shows what we built, without the names.',
      links: [{ label: 'What we built', href: ctx.services }],
      related: ['work', 'process', 'contact'],
    },
    {
      id: 'about',
      question: 'Who is behind 404 Solutions?',
      keywords: ['who is', 'founder', 'stefan', 'behind', 'owner', 'people', 'background', 'phd', 'research', 'experience', 'yourself'],
      answer: `${company.name} is led by ${company.founder.name}, ${company.founder.titles.join(' and ')}. He designs the systems and still builds them himself, with a decade of biomedical research and peer-reviewed publication behind the engineering.`,
      links: [{ label: 'About 404 Solutions', href: ctx.about }],
      related: ['work', 'location', 'contact'],
    },
    {
      id: 'stack',
      question: 'Which clouds and tools do you use?',
      keywords: ['cloud', 'aws', 'azure', 'stack', 'tool', 'technology', 'tech', 'framework', 'python', 'langchain', 'bedrock', 'fastapi'],
      answer: `Systems run in your own cloud, on AWS or Azure. The tools used most across the projects: ${list(ctx.tools.slice(0, 8))}.`,
      links: [{ label: 'What we built', href: ctx.services }],
      related: ['services', 'process', 'work'],
    },
    {
      id: 'location',
      question: 'Where are you based?',
      keywords: ['where', 'based', 'location', 'located', 'country', 'time zone', 'timezone', 'remote', 'office', 'europe', 'serbia', 'belgrade'],
      answer: `In ${company.location} (Central European Time), working across Europe and the US.`,
      related: ['partners', 'contact', 'about'],
    },
    {
      id: 'start',
      question: 'How fast can you start?',
      keywords: ['how fast', 'how soon', 'when can', 'start date', 'availability', 'available', 'capacity', 'deadline', 'timeline', 'urgent', 'asap'],
      answer: `Put the deadline in the first message and you get a straight answer on whether and when we can start. To ask: ${writeTo}.`,
      links: contactLinks,
      related: ['pricing', 'process', 'contact'],
    },
    {
      id: 'name',
      question: 'Why “404”?',
      keywords: ['404', 'name', 'not found', 'meaning', 'mean', 'called'],
      answer: '404 means not found: the piece your team is missing. We are the piece that is — the empty cell in the comb, filled.',
      related: ['services', 'process', 'bot'],
    },
    {
      id: 'bot',
      question: 'Are you an AI?',
      keywords: ['are you an ai', 'are you ai', 'is this ai', 'scout ai', 'chatbot', 'bot', 'robot', 'chatgpt', 'gpt', 'human', 'real person', 'scout'],
      answer: `No. I'm ${mascot.name}, a fixed list of questions and answers. I compare the words you type with that list, here in your browser; nothing is sent anywhere or stored. For anything I don't know, a person answers: ${writeTo}.`,
      links: contactLinks,
      related: ['services', 'contact', 'name'],
    },
  ];
}

/** Suggestions shown when the panel opens and after an unmatched question. */
export const defaultSuggestions = ['services', 'process', 'pricing', 'contact'];

export const fallback = {
  answer: `That one is not on my list. A person can answer it: ${writeTo}.`,
  links: contactLinks,
};
