export const profileQuery = `*[_type == "profile"][0]{
  name,
  nameAr,
  role,
  roleAr,
  headline,
  subHeadline,
  aboutText,
  "avatar": profileImage.asset->url,
  tags,
  email,
  socials
}`;

export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  shortDesc,
  fullDesc,
  features,
  downloadCount,
  externalLink,
  featured,
  category,
  "image": mainImage.asset->url
}`;