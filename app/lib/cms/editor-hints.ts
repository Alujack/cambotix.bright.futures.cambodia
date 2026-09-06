import { defaults, type Section } from './defaults';
import { blank, type Json } from './json';

export type EditorHints = {
  // Labels for the parts of a fixed-length list such as [question, answer].
  tupleLabels?: string[];
  // Fixed choices for a field, keyed by field name.
  enums?: Record<string, string[]>;
  // Template used when a new top-level item is added.
  template?: Json;
  // Render each top-level key as its own collapsible group (used for page text).
  groups?: boolean;
  help: string;
};

const { feedingBudget: _feedingBudget, ...projectBase } = defaults.projects[0];
void _feedingBudget;

export const editorHints: Record<Section, EditorHints> = {
  NGO_NAME: { help: 'The organization name shown in the header, footer, and page titles.' },
  projects: {
    help: 'The four project cards and their detail pages. The feeding budget block only exists on projects that already have one.',
    template: { ...(blank(projectBase as unknown as Json) as Record<string, Json>), emoji: '' },
  },
  team: { help: 'People shown on the home page and the About page.' },
  stats: { help: 'The four headline numbers on the home and impact pages.' },
  values: { help: 'Values listed on the About page.', tupleLabels: ['Title', 'Description'] },
  activities: {
    help: 'Photos and short videos shown on the home page and the Impact page. Use the media library to upload new files first.',
    enums: { kind: ['photo', 'video'] },
  },
  impactUpdates: { help: 'The long-form updates on the Impact page. The first one is featured on the home page.' },
  volunteerWays: { help: 'Ways to contribute on the Volunteer page.', tupleLabels: ['Emoji', 'Label'] },
  volunteerssteps: { help: 'The four steps on the Volunteer page.', tupleLabels: ['Number', 'Title', 'Description'] },
  volunteersfaqs: { help: 'Questions and answers on the Volunteer page.', tupleLabels: ['Question', 'Answer'] },
  contactfaqs: { help: 'Questions and answers on the Contact page.', tupleLabels: ['Question', 'Answer'] },
  DonateWidgettiers: { help: 'Suggested donation amounts in US dollars and what each one provides.' },
  DonateWidgetpaymentMethods: { help: 'Payment method names shown under the donation widget.' },
  heroSlides: {
    help: 'Photos in the home page slideshow, in order. Each needs a short description for screen readers.',
    template: { image: '', alt: '' },
  },
  copy: {
    help: 'Every sentence, link, and image address on the website, grouped by page. Labels show the original text so you can find each line.',
    groups: true,
  },
};

export const sectionOrder: Section[] = [
  'copy', 'heroSlides', 'activities', 'projects', 'impactUpdates', 'team', 'stats', 'values',
  'volunteerWays', 'volunteerssteps', 'volunteersfaqs', 'contactfaqs', 'DonateWidgettiers', 'DonateWidgetpaymentMethods', 'NGO_NAME',
];
