import { createClient } from '@sanity/client';

export const client = createClient({
  // Sanity Project IDs must only contain lowercase letters, numbers, and dashes.
  // We use a placeholder that passes validation to prevent the app from crashing.
  projectId: 'olqprkq1', 
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  ignoreBrowserTokenWarning: true
});