const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const isProd = process.env.NODE_ENV === 'production'
const rdocs = /\/docs\//
const rspaces = /\s+/g
const rspokestackWebsite = /.*?spokestack.io\//
const postsPerPage = 5

function toUrl(url) {
  return url.toLowerCase().replace(rspaces, '-')
}

async function getRelated({ tags, slug, graphql }) {
  if (!tags) {
    return
  }
  const result = await graphql(`
    {
      exact: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "/blog/" }
          fields: {
            slug: { ne: "${slug}" }
          }
          frontmatter: {
            tags: { eq: "${tags.join(', ')}" }
            ${isProd ? 'draft: { ne: true }' : ''}
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
      within: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fields: {
            slug: { ne: "${slug}" }
            tags: { in: ${JSON.stringify(tags)} }
          }
          frontmatter: {
            tags: { ne: "${tags.join(', ')}" }
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
  if (result.error) {
    throw result.error
  }
  const related = result.data.exact.nodes
    .concat(result.data.within.nodes)
    .slice(0, 3)
  return related.map((node) => ({
    title: node.frontmatter.title,
    href: node.fields.slug
  }))
}

async function createAuthorPages({ author, tags, actions, graphql }) {
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
      component: path.resolve('./src/templates/blog-list-author.tsx'),
      context: {
        author,
        currentPage: i + 1,
        limit: postsPerPage,
        numPages,
        skip: i * postsPerPage,
        slug: url,
        tags,
        total: posts.length
      }
    })
  })
}

async function createTagPages({ tag, tags, actions, graphql }) {
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
  const url = tag === 'Tutorial' ? '/tutorials' : `/blog/tag/${toUrl(tag)}`
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? url : `${url}/${i + 1}`,
      component: path.resolve('./src/templates/blog-list-tag.tsx'),
      context: {
        currentPage: i + 1,
        limit: postsPerPage,
        numPages,
        skip: i * postsPerPage,
        slug: url,
        tag,
        tags: tag === 'Tutorial' ? [] : tags,
        total: posts.length
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
    const oldSlug = fields.oldSlug
    const context = {
      next,
      previous,
      slug
    }
    // If the old slug does not equal the new,
    // add a static page to redirect to the new slug
    if (oldSlug !== slug) {
      await createPage({
        path: oldSlug,
        component: path.resolve('./src/templates/redirect-only.tsx'),
        context
      })
    }

    // Add related tags (applicable to blog posts, but not docs)
    const related = await getRelated({
      tags: fields.tags,
      slug,
      graphql
    })
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
          redirects {
            from
            to
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
              oldSlug
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
              oldSlug
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
      if (tag && acc.indexOf(tag) === -1) {
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
      graphql
    })
  })

  // Create author pages
  const authors = result.data.site.siteMetadata.team.map((member) => member.key)
  authors.forEach((author) => {
    createAuthorPages({
      author,
      tags,
      actions,
      graphql
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
        currentPage: i + 1,
        limit: postsPerPage,
        numPages,
        skip: i * postsPerPage,
        slug: url,
        tags,
        total: posts.length
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

  const redirects = result.data.site.siteMetadata.redirects
  return Promise.all(
    redirects.map((redirect) =>
      createPage({
        path: redirect.from,
        component: path.resolve('./src/templates/redirect-only.tsx'),
        context: {
          slug: redirect.to
        }
      })
    )
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const isDocsPage = rdocs.test(node.fileAbsolutePath)
    const folder = path.basename(path.dirname(node.fileAbsolutePath))
    const filepath = createFilePath({ node, getNode, trailingSlash: false })
    const oldSlug = `/${isDocsPage ? 'docs' : 'blog'}${filepath}`
    const slug = `/${isDocsPage ? 'docs' : 'blog'}${toUrl(filepath)}`
    createNodeField({
      name: 'slug',
      node,
      value: slug
    })
    createNodeField({
      name: 'oldSlug',
      node,
      value: oldSlug
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
        value: `https://github.com/spokestack/spokestack.io/tree/develop/${path}`
      })
    }
  }
}
