// Facts about the company, used across the page. A value that is still open
// is `null`, and the component that shows it leaves its line out instead of
// printing a placeholder (see docs/roadmap.md for what is open).

export interface Company {
  name: string;
  /** One sentence for <meta name="description"> and the hero lede. */
  description: string;
  location: string;
  /** Month delivery started, shown in the stats row. */
  since: { year: number; month: string };
  /** Contact address on the company domain. Open until the domain exists. */
  email: string | null;
  /** How an engagement is sold (fixed scope, monthly capacity, ...). Open. */
  engagementModel: string | null;
  founder: {
    name: string;
    /** Personal titles only: roles held at other companies do not belong here. */
    titles: string[];
    bio: string;
    portrait: string;
    stats: { value: string; label: string }[];
  };
  /**
   * Outside links. The company site links to none of the founder's personal
   * pages (portfolio, personal GitHub): Stefan, 2026-11-16. LinkedIn is the
   * one personal profile it names, as the founder's contact route.
   */
  links: {
    linkedin: string;
  };
}

export const company: Company = {
  name: '404 Solutions',
  description:
    '404 Solutions builds production AI and software — from the problem statement to something running, monitored and maintained.',
  location: 'Belgrade, Serbia',
  since: { year: 2024, month: 'October' },
  // The founder's Gmail until the company domain exists (Stefan, 2026-11-16);
  // the same address the portfolio already publishes.
  email: 'stefan.seman404@gmail.com',
  engagementModel: null,
  founder: {
    name: 'Stefan Seman',
    titles: ['ML engineer', 'PhD researcher'],
    bio: 'Founder of 404 Solutions, ML engineer and PhD researcher. Stefan designs the systems and still builds them himself — with a decade of biomedical research and peer-reviewed publication behind the engineering.',
    portrait: '/images/stefan-seman.jpg',
    // Same numbers as the portfolio's profile; update both together.
    stats: [
      { value: '10+', label: 'Years in ML & data' },
      { value: '14', label: 'Peer-reviewed works' },
      { value: '138+', label: 'Citations' },
    ],
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/sseman/',
  },
};
