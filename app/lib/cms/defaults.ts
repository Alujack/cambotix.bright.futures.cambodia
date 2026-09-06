import { NGO_NAME, projects, team, stats, values, activities, impactUpdates, volunteerWays } from '../../content';
import copy from './copy-defaults.json';
import extras from './extra-defaults.json';
export const defaults = {
  NGO_NAME, projects, team, stats, values, activities, impactUpdates, volunteerWays,
  ...extras,
  heroSlides: [] as { image: string; alt: string }[],
  copy: copy as Record<string, Record<string, string>>,
};
export type SiteContent = typeof defaults;
export type Section = keyof SiteContent;
export const sectionLabels: Record<Section, string> = {
 NGO_NAME: 'Organization name', projects: 'Projects & feeding budget', team: 'Team', stats: 'Impact statistics', values: 'Our values', activities: 'Photos & video activities', impactUpdates: 'Impact updates', volunteerWays: 'Volunteer opportunities', volunteerssteps: 'Volunteer steps', volunteersfaqs: 'Volunteer questions', contactfaqs: 'Contact questions', DonateWidgettiers: 'Donation amounts', DonateWidgetpaymentMethods: 'Payment method labels', heroSlides: 'Home slideshow', copy: 'Page text, images & links',
};
