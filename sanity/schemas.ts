// Use these schema definitions in your Sanity Studio
export const profileSchema = {
  name: 'profile',
  title: 'Personal Profile',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name (English)', type: 'string' },
    { name: 'nameAr', title: 'Name (Arabic)', type: 'string' },
    { name: 'role', title: 'Role (English)', type: 'string' },
    { name: 'roleAr', title: 'Role (Arabic)', type: 'string' },
    { name: 'headline', title: 'Hero Headline', type: 'string' },
    { name: 'subHeadline', title: 'Sub Headline', type: 'text' },
    { name: 'aboutText', title: 'About Me Text', type: 'text' },
    { name: 'profileImage', title: 'Profile Image', type: 'image', options: { hotspot: true } },
    { name: 'email', title: 'Contact Email', type: 'string' },
    { 
      name: 'tags', 
      title: 'Skills/Tags', 
      type: 'array', 
      of: [{ type: 'string' }] 
    },
    { 
      name: 'socials', 
      title: 'Social Links', 
      type: 'object', 
      fields: [
          { name: 'notionArabs', title: 'Notion Arabs URL', type: 'url' },
          { name: 'facebook', title: 'Facebook URL', type: 'url' },
          { name: 'whatsapp', title: 'WhatsApp URL', type: 'url' },
          { name: 'telegram', title: 'Telegram Handle', type: 'string' }
      ]
    },
  ],
};

export const projectSchema = {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'shortDesc', title: 'Short Description', type: 'string' },
    { name: 'fullDesc', title: 'Full Description', type: 'text' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'downloadCount', title: 'Download Count (e.g. 500+)', type: 'string' },
    { name: 'externalLink', title: 'Product Link (Gumroad/Notion)', type: 'url' },
    { name: 'featured', title: 'Is Featured? (Border Beam)', type: 'boolean' },
    { 
      name: 'features', 
      title: 'Key Features', 
      type: 'array', 
      of: [{ type: 'string' }] 
    },
    { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } },
  ],
};