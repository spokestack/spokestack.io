const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const isProd = process.env.NODE_ENV === 'production'
const rdocs = /\/docs\//
const rspaces = /\s+/g
const rspokestackWebsite = /.*?spokestack-website\//
const postsPerPage = 5

function throwInProd(message) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`${message} Some things may not work properly.`)
  } else {
    throw new Error(message)
  }
}

if (!process.env.SS_API_URL) {
  throwInProd('SS_API_URL is not set in the environment.')
}

if (!process.env.SS_GITHUB_CLIENT_ID) {
  throwInProd('SS_GITHUB_CLIENT_ID is not set in the environment.')
}

if (!process.env.SS_GOOGLE_CLIENT_ID) {
  throwInProd('SS_GOOGLE_CLIENT_ID is not set in the environment.')
}

async function getRelated({ tags, slug, graphql }) {
  if (tags) {
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC },
          filter: {
            fields: {
              slug: { ne: "${slug}" }
              tags: { in: ${JSON.stringify(tags)} }
            }
            frontmatter: {
              ${isProd ? 'draft: { ne: true },' : ''}
            }
          }
          limit: 3
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

async function createAuthorPages({ author, tags, actions, graphql, template }) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC },
        filter: {
          fileAbsolutePath: { regex: "/blog/" },
          frontmatter: {
            ${isProd ? 'draft: { ne: true },' : ''}
            author: { eq: "${author}" }
          }
        },
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
  if (result.errors) {
    console.error(result.errors)
    reporter.panicOnBuild('Error while running GraphQL query')
    return
  }
  const posts = result.data.allMarkdownRemark.edges
  const numPages = Math.ceil(posts.length / postsPerPage)
  const url = `/blog/author/${author}`
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? url : `${url}/${i + 1}`,
      component: template,
      context: {
        author,
        tags,
        slug: url,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function createTagPages({ tag, tags, actions, graphql, template }) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC },
        filter: {
          fileAbsolutePath: { regex: "/blog/" },
          fields: { tags: { in: ["${tag}"] } }
          ${isProd ? ',frontmatter: { draft: { ne: true } }' : ''}
        },
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
  if (result.errors) {
    console.error(result.errors)
    reporter.panicOnBuild('Error while running GraphQL query')
    return
  }
  const posts = result.data.allMarkdownRemark.edges
  const numPages = Math.ceil(posts.length / postsPerPage)
  const url = `/blog/tag/${tag.toLowerCase().replace(rspaces, '-')}`
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? url : `${url}/${i + 1}`,
      component: template,
      context: {
        tag,
        tags,
        slug: url,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function createPages({ actions, graphql, posts, template }) {
  const { createPage } = actions
  for (let index = 0; index < posts.length; index++) {
    const post = posts[index]
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

    await createPage({
      path: slug,
      component: template,
      context
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    {
      site {
        siteMetadata {
          team {
            key
          }
        }
      }
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
      tags: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/blog/" }
          fields: { tags: { ne: null } }${
            isProd ? ',frontmatter: { draft: { ne: true } }' : ''
          }
        }
      ) {
        edges {
          node {
            fields {
              tags
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
    reporter.panicOnBuild('Error while running GraphQL query')
    return
  }

  // Create tag filter pages
  const tags = result.data.tags.edges.reduce((acc, current) => {
    current.node.fields.tags.forEach((tag) => {
      if (acc.indexOf(tag) === -1) {
        acc.push(tag)
      }
    })
    return acc
  }, [])
  tags.forEach((tag) => {
    createTagPages({
      tag,
      tags,
      actions,
      graphql,
      template: path.resolve('./src/templates/blog-list-tag.tsx')
    })
  })

  // Create author pages
  const authors = result.data.site.siteMetadata.team.map((member) => member.key)
  authors.forEach((author) => {
    createAuthorPages({
      author,
      tags,
      actions,
      graphql,
      template: path.resolve('./src/templates/blog-list-author.tsx')
    })
  })

  // Create blog post list pages
  const { createPage } = actions
  const posts = result.data.blog.edges
  const numPages = Math.ceil(posts.length / postsPerPage)
  const url = '/blog'
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? url : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.tsx'),
      context: {
        tags,
        slug: url,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })

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
