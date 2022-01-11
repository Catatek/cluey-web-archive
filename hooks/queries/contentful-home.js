export const contentful_home_query = `
{
    postCollection(order: date_DESC) {
      items {
        title
        date
        slug
        image {
          url
        }
        author {
          name
        }
      }
    }
}
`;
