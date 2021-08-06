const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const {
  fetchOEmbedData
} = require('gatsby-remark-embedder/dist/transformers/utils')

const isProd = process.env.NODE_ENV === 'production'
const rdocs = /\/docs\//
const rspaces = /\s+/g
const rspokestackWebsite = /.*?spokestack.io\//
const postsPerPage = 5

function toUrl(url) {
  return url.toLowerCase().replace(rspaces, '-')
}

function getTwitterHTML(url) {
  /**
   * For moments, Twitter oembed doesn't work with urls using 'events', they should
   * use 'moments', even though they redirect from 'moments' to 'events' on the browser.
   */
  const twitterUrl =
    'https://publish.twitter.com/oembed' +
    `?url=${url.replace('events', 'moments')}` +
    '&dnt=true' +
    '&omit_script=true' +
    '&hide_thread=true'

  return fetchOEmbedData(twitterUrl).then(({ html }) =>
    [html]
      .map((s) => s.replace(/\?ref_src=twsrc.*?fw/g, ''))
      .map((s) => s.replace(/<br>/g, '<br />'))
      .join('')
      .trim()
  )
}

async function getRelated({ graphql, slug, tags }) {
  if (!tags) {
    return
  }
  const result = await graphql(`
    {
      docsExact: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "/docs/" }
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
      docsWithin: allMdx(
        sort: { fields: [frontmatter___tags], order: ASC }
        filter: {
          fileAbsolutePath: { regex: "/docs/" }
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
      blogExact: allMdx(
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
            tags
          }
          fields {
            slug
          }
        }
      }
      blogWithin: allMdx(
        sort: { fields: [frontmatter___tags], order: ASC }
        filter: {
          fileAbsolutePath: { regex: "/blog/" }
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
            tags
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
  const relatedDocs = result.data.docsExact.nodes
    .concat(result.data.docsWithin.nodes)
    .slice(0, 3)
    .map((node) => ({
      title: node.frontmatter.title,
      href: node.fields.slug
    }))
  const blogMatches = result.data.blogExact.nodes.concat(
    result.data.blogWithin.nodes
  )
  const relatedBlog = blogMatches
    .filter((node) => node.frontmatter.tags.indexOf('Tutorial') === -1)
    .slice(0, 3)
    .map((node) => ({
      title: node.frontmatter.title,
      href: node.fields.slug
    }))
  const relatedTutorials = blogMatches
    .filter((node) => node.frontmatter.tags.indexOf('Tutorial') > -1)
    .slice(0, 3)
    .map((node) => ({
      title: node.frontmatter.title,
      href: node.fields.slug
    }))
  return {
    docs: relatedDocs,
    blog: relatedBlog,
    tutorials: relatedTutorials
  }
}

async function createAuthorPages({ author, tags, actions, graphql, reporter }) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC },
        filter: {
          fileAbsolutePath: { regex: "/blog/" },
          frontmatter: {
            author: { eq: "${author}" }
            ${isProd ? ',draft: { ne: true }' : ''}
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
  const posts = result.data.allMdx.edges
  const numPages = Math.ceil(posts.length / postsPerPage)
  const url = `/blog/author/${author}`
  return Promise.all(
    Array.from({ length: numPages }).map((_, i) =>
      createPage({
        path: i === 0 ? url : `${url}/${i + 1}`,
        component: path.resolve('./src/templates/blog-list-author.tsx'),
        context: {
          author,
          currentPage: i + 1,
          dev: !isProd,
          limit: postsPerPage,
          numPages,
          skip: i * postsPerPage,
          slug: url,
          tags,
          total: posts.length
        }
      })
    )
  )
}

async function createTagPages({ tag, tags, actions, graphql, reporter }) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx(
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
  const posts = result.data.allMdx.edges
  const numPages = Math.ceil(posts.length / postsPerPage)
  const url = tag === 'Tutorial' ? '/tutorials' : `/blog/tag/${toUrl(tag)}`
  return Promise.all(
    Array.from({ length: numPages }).map((_, i) =>
      createPage({
        path: i === 0 ? url : `${url}/${i + 1}`,
        component: path.resolve('./src/templates/blog-list-tag.tsx'),
        context: {
          currentPage: i + 1,
          dev: !isProd,
          limit: postsPerPage,
          numPages,
          skip: i * postsPerPage,
          slug: url,
          tag,
          tags: tag === 'Tutorial' ? [] : tags,
          total: posts.length
        }
      })
    )
  )
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

    // Add related tags
    const related = await getRelated({
      graphql,
      slug,
      tags: fields.tags
    })
    if (related) {
      context.related = related
    }

    console.log(`Creating page at slug "${slug}"`)
    await createPage({
      path: slug,
      component: template,
      context
    })
  }
}

async function verifyHeros(graphql, reporter) {
  const result = await graphql(`
    {
      heros: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/blog/" }
          frontmatter: { hero: { publicURL: { eq: null } } }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
            }
          }
        }
      }
      seos: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/docs/" }
          frontmatter: { seoImage: { publicURL: { eq: null } } }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
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
  if (result.data.heros.edges.length) {
    result.data.heros.edges.forEach((edge) => {
      console.warn(
        `Blog post with title "${edge.node.frontmatter.title}" at path ${edge.node.fileAbsolutePath} does not have a hero image set in frontmatter`
      )
    })
  }
  if (result.data.seos.edges.length) {
    result.data.seos.edges.forEach((edge) => {
      console.warn(
        `Docs page with title "${edge.node.frontmatter.title}" at path ${edge.node.fileAbsolutePath} does not have an seoImage set in frontmatter`
      )
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await verifyHeros(graphql, reporter)
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
      blog: allMdx(
        sort: { fields: [frontmatter___date], order: DESC },
        filter: {
          fileAbsolutePath: { regex: "/blog/" }
          ${isProd ? ',frontmatter: { draft: { ne: true } }' : ''}
        },
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
      docs: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/docs/" }
          ${isProd ? ',frontmatter: { draft: { ne: true } }' : ''}
        },
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
      tags: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/blog/" }
          fields: { tags: { ne: null } }
          ${isProd ? ',frontmatter: { draft: { ne: true } }' : ''}
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

  // Add tag filter pages
  const tags = result.data.tags.edges.reduce((acc, current) => {
    current.node.fields.tags.forEach((tag) => {
      if (tag && acc.indexOf(tag) === -1) {
        acc.push(tag)
      }
    })
    return acc
  }, [])

  await Promise.all(
    tags.map((tag) =>
      createTagPages({
        tag,
        tags,
        actions,
        graphql,
        reporter
      })
    )
  )

  // Add author pages
  const authors = result.data.site.siteMetadata.team.map((member) => member.key)
  await Promise.all(
    authors.map((author) =>
      createAuthorPages({
        author,
        tags,
        actions,
        graphql,
        reporter
      })
    )
  )

  // Add blog list pages
  const { createPage } = actions
  const posts = result.data.blog.edges
  const numPages = Math.ceil(posts.length / postsPerPage)
  const url = '/blog'
  await Promise.all(
    Array.from({ length: numPages }).map((_, i) =>
      createPage({
        path: i === 0 ? url : `${url}/${i + 1}`,
        component: path.resolve('./src/templates/blog-list.tsx'),
        context: {
          currentPage: i + 1,
          dev: !isProd,
          limit: postsPerPage,
          numPages,
          skip: i * postsPerPage,
          slug: url,
          tags,
          total: posts.length
        }
      })
    )
  )

  // Add blog post pages
  await createPages({
    actions,
    graphql,
    posts: result.data.blog.edges,
    template: path.resolve('./src/templates/blog-post.tsx')
  })
  // Add docs pages
  await createPages({
    actions,
    graphql,
    posts: result.data.docs.edges,
    template: path.resolve('./src/templates/docs-page.tsx')
  })

  // Add redirects from siteMetadata.redirects
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

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Retrieve embeddable HTML for tweets from the Spokestack timeline
  if (node.internal.type === 'twitterStatusesUserTimelineSpokestack') {
    const url = `https://www.twitter.com/spokestack/status/${node.id_str}`
    const html = await getTwitterHTML(url)
    createNodeField({
      name: 'html',
      node,
      value: html
    })
  }

  // Add custom fields for docs and blog contexts
  if (node.internal.type === 'Mdx') {
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
