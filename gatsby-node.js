/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        return result;
      })
    );
  });

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const getArticles = makeRequest(
    graphql,
    `
    {
      allStrapiArticulo{
        edges{
          node{
            strapiId
          }
        }
      }
    }
    `
  ).then(result => {
    result.data.allStrapiArticulo.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.strapiId}`,
        component: path.resolve(`src/templates/articulo.js`),
        context: {
          id: node.strapiId
        }
      });
    });
  });
  return getArticles;
};
