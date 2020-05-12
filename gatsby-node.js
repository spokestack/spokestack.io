const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const isProd = process.env.NODE_ENV === 'production'
const rdocs = /\/docs\//
const rspokestackWebsite = /.*?spokestack-website\//

function throwInProd(message) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`${message} Some things may not work properly.`)
  } else {
    throw new Error(message)
  }
}

if (!process.env.SS_GITHUB_CLIENT_ID) {
  throwInProd('SS_GITHUB_CLIENT_ID is not set in the environment.')
}

if (!process.env.SS_API_URL) {
  throwInProd('SS_API_URL is not set in the environment.')
}

if (!process.env.SS_GOOGLE_CLIENT_ID) {
  throwInProd('SS_GOOGLE_CLIENT_ID is not set in the environment.')
}

async function getRelated({ tags, slug, graphql }) {
  if (tags) {
    const result = await graphql(`
      {
        allMarkdownRemark(
          filter: {
            fields: {
              slug: { ne: "${slug}" }
              tags: { in: ${JSON.stringify(tags)} }
            }
          }
        ) {
          nodes {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    `)
    return result.data.allMarkdownRemark.nodes.map((node) => ({
      title: node.frontmatter.title,
      href: node.fields.slug
    }))
  }
}

function createPages({ actions, graphql, posts, template }) {
  const { createPage } = actions
  return posts.map(async (post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const fields = post.node.fields
    const slug = fields.slug
    const context = {
      next,
      previous,
      slug
    }
    const related = await getRelated({ tags: fields.tags, slug, graphql })
    if (related) {
      context.related = related
    }

    createPage({
      path: slug,
      component: template,
      context
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      blog: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC },
        filter: { fileAbsolutePath: { regex: "/blog/" }${
          isProd ? ',frontmatter: { draft: { ne: true } }' : ''
        } },
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
              tags
            }
          }
        }
      }
      docs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/docs/" }${
          isProd ? ',frontmatter: { draft: { ne: true } }' : ''
        } },
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Create blog posts pages
  await createPages({
    actions,
    graphql,
    posts: result.data.blog.edges,
    template: path.resolve('./src/templates/blog-post.tsx')
  })
  // Create docs pages
  await createPages({
    actions,
    graphql,
    posts: result.data.docs.edges,
    template: path.resolve('./src/templates/docs-page.tsx')
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode, trailingSlash: false })
    const isDocsPage = rdocs.test(node.fileAbsolutePath)
    const folder = path.basename(path.dirname(node.fileAbsolutePath))
    createNodeField({
      name: 'slug',
      node,
      value: `/${isDocsPage ? 'docs' : 'blog'}${value}`
    })
    createNodeField({
      name: 'folder',
      node,
      value: folder !== 'docs' && folder !== 'blog' ? folder : null
    })
    if (node.frontmatter.tags) {
      const tags = node.frontmatter.tags.split(/,\s*/)
      createNodeField({
        name: 'tags',
        node,
        value: tags
      })
    }
    if (isDocsPage) {
      const path = node.fileAbsolutePath.replace(rspokestackWebsite, '')
      createNodeField({
        name: 'githubLink',
        node,
        value: `https://github.com/spokestack/spokestack-website/tree/develop/${path}`
      })
    }
  }
}
