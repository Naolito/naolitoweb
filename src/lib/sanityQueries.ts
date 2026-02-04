export const originalsQuery = `*[_type == "original"]|order(order asc){
  _id,
  title,
  description,
  tag,
  year,
  duration,
  likes,
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  posterUrl,
  "posterImageUrl": posterImage.asset->url,
  ratio
}`

export const clientProjectsQuery = `*[_type == "clientProject"]|order(order asc){
  _id,
  title,
  description,
  tag,
  year,
  duration,
  likes,
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  posterUrl,
  "posterImageUrl": posterImage.asset->url,
  ratio
}`

export const clientLogosQuery = `*[_type == "clientLogo"]|order(order asc){
  _id,
  name,
  logoUrl,
  "logoImageUrl": logoImage.asset->url,
  fallbackUrl
}`
