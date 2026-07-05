import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Gym Content')
    .items([
      S.documentTypeListItem('hero').title('Hero Section'),
      S.documentTypeListItem('about').title('About'),
      S.documentTypeListItem('service').title('Service'),
      S.documentTypeListItem('membership').title('Membership Plans'),
      S.documentTypeListItem('trainer').title('Trainer'),
      S.documentTypeListItem('schedule').title('Schedule'),
      S.documentTypeListItem('testimonial').title('Testimonial'),
      S.documentTypeListItem('contact').title('Contact Info'),
      S.documentTypeListItem('promotion').title('Promotions'),
      S.documentTypeListItem('gallery').title('Gallery Layout'),
    ]);