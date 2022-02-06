export const homePageQuery = `
  *[_type == 'homePage'][0]{
    heroImage,
    heroHeading,
    heroText,
    keyPoints,
    featuredImage,
    featuredText->{
      title, 
      subtitle, 
      exerpt,
      slug, 
      author,
      pubYear
    }
  }`

