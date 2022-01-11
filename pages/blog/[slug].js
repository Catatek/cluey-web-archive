import styled from "styled-components";
import { Layout } from "@/components";
import { contentfulClient } from "api/config";
import { gql } from "@apollo/client";
import { documentToReactComponents, renderOptions } from "@/utils";
import { PostAuthor, PostBody, PostTitleBase, PostMarkup } from "@/theme/index";

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const PostsPage = ({ post, meta }) => {
  return (
    <Layout white meta={meta}>
      <PostBody>
        <Image src={post.image.url} />
      </PostBody>
      <PostBody>
        <PostTitleBase>{post.title}</PostTitleBase>
        {post.author && <PostAuthor>{`By ${post.author.name}`}</PostAuthor>}
        <PostMarkup>
          {documentToReactComponents(
            post.body.json,
            renderOptions(post.body.links)
          )}
        </PostMarkup>
      </PostBody>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const res = await contentfulClient.query({
    query: gql`
      {
        postCollection {
          items {
            slug
          }
        }
      }
    `,
  });

  const paths = res.data.postCollection.items.map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await contentfulClient.query({
    query: gql`
        {
          postCollection(limit: 1, where: { slug: "${params.slug}" }) {
            items {
              title
              author {
                name
              }
              image {
                url
              }
              sys {
                id
              }
              body {
                json
                links {
                  entries {
                    inline {
                      sys {
                        id
                      }
                      __typename
                      ... on Post {
                        title
                        slug
                      }
                    }
                    block {
                      sys {
                        id
                      }
                    }
                  }
                  assets {
                    block {
                      sys {
                        id
                      }
                      url
                      title
                      width
                      height
                      description
                    }
                  }
                }
              }
            }
          }
        }
        `,
  });
  return {
    props: {
      post: res.data.postCollection.items[0],
      meta: {
        title: `${res.data.postCollection.items[0].title} | Cluey Consumer`,
      },
    },
    revalidate: 60
  };
};

export default PostsPage;
