import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return undefined;
  return builder.image(source);
}