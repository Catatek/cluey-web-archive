import React from "react";
import { useGetBrands, useSubCategories } from "@/queries";
import { contentfulClient } from "api/config";
import { gql } from "@apollo/client";
import fs from 'fs';

const Sitemap = () => { };

const slugify = (name, separator = "-") => {
  return name
    .toString()
    .normalize('NFD')                   // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
    .trim()
    .replace(/\s+/g, separator);
};

export const getServerSideProps = async ({ res }) => {
  const getAllFilesFromFolder = (dir) => {
    let results = [];
    fs.readdirSync(dir).forEach(function (file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFilesFromFolder(file))
        } else results.push(file);
    });
    return results;
  };
  const baseUrl = {
    development: "https://staging.clueyconsumer.com",
    production: "https://clueyconsumer.com",
  }[process.env.NODE_ENV];

  let staticPages = []
  if (process.env.NODE_ENV === 'production') {
    const data = fs.readFileSync('.next/server/pages-manifest.json', 'utf8');
    staticPages = Object.keys(JSON.parse(data))
        .filter((staticPage) => {
          return ![
            "/_app",
            "/_document",
            "/blog/[slug]",
            "/brands/[slug]",
            "/category/[slug]",
            "/sitemap.xml",
            "/_error",
            "/404",
          ].includes(staticPage)
        })
        .map((staticPagePath) => {
          return `${baseUrl}${staticPagePath}`;
        });
  } else {
    staticPages = getAllFilesFromFolder({
      development: 'pages',
      production: './',
    }[process.env.NODE_ENV])
      .filter((staticPage) => {
          return ![
              "pages/_app.js",
              "pages/_document.js",
              "pages/_error.js",
              "pages/index.js",
              "pages/styles.css",
              "pages/sitemap.xml.js",
              "pages/blog/[slug].js",
              "pages/brands/[slug].js",
              "pages/category/[slug].js",
          ].includes(staticPage);
      })
      .map((staticPagePath) => {
          return `${baseUrl}/${staticPagePath.replace('pages/', '').replace('.js', '')}`;
      });
  }

  const { brands } = await useGetBrands();
  const slugsBrands = brands.map(({ slug }) => slug);
  const subCategories = await useSubCategories();
  const slugsSubCategories = subCategories.map(({ id }) => id);
  const blogs = await contentfulClient.query({ query: gql` { postCollection { items { slug  }}} `, });
  const slugsBlogs = blogs.data.postCollection.items.map(({ slug }) => slugify(slug));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
      .map((url) => {
        return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
      })
      .join("")}
            ${slugsBrands
      .map((slug) => {
        if (slug) {
          return `
                    <url>
                      <loc>${baseUrl}/brands/${slug}</loc>
                      <changefreq>monthly</changefreq>
                      <priority>1.0</priority>
                    </url>
                  `;
        }

      })
      .join("")}
            ${slugsSubCategories
      .map((id) => {
        return `
                      <url>
                        <loc>${baseUrl}/category/${id}</loc>
                        <changefreq>monthly</changefreq>
                        <priority>1.0</priority>
                      </url>
                    `;
      })
      .join("")}
            ${slugsBlogs
      .map((slug) => {
        return `
                      <url>
                        <loc>${baseUrl}/blog/${slug}</loc>
                        <changefreq>monthly</changefreq>
                        <priority>1.0</priority>
                      </url>
                    `;
      })
      .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;