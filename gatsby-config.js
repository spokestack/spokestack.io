/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  siteMetadata: {
    title: 'Spokestack',
    author: 'Spokestack',
    description:
      'Mobile voice development platform that enables customized voice navigation for mobile and browser applications',
    siteUrl: 'https://spokestack.io/',
    social: {
      twitter: 'https://twitter.com/spokestack',
      github: 'https://github.com/spokestack'
    },
    // Should match the queries in src/components/TeamMembers.tsx
    team: {
      shelby: {
        name: 'Shelby Bonnie',
        title: 'CEO',
        experience: 'CNET, Co-founder & former CEO, IAB'
      },
      tyler: {
        name: 'Tyler Malone',
        title: 'Front-End Engineer',
        experience: 'Rabble, InvisionHeart'
      },
      neil: {
        name: 'Neil Menne',
        title: 'Analytics Engineer',
        experience: 'OpenTable'
      },
      will: {
        name: 'Will Rice',
        title: 'Data Science Engineer',
        experience: 'Masters in Data Science'
      },
      elizabeth: {
        name: 'Elizabeth Ropp',
        title: 'UX & Product Design',
        experience: 'SmartFurniture'
      },
      brent: {
        name: 'Brent Spell',
        title: 'CTO',
        experience: 'OpenTable, HEALTHCAREfirst'
      },
      mike: {
        name: 'Mike Tatum',
        title: 'Product/Business',
        experience: 'CNET, Whiskey Media'
      },
      noel: {
        name: 'Noel Weichbrodt',
        title: 'Solutions Engineer',
        experience: 'OpenTable'
      },
      timmy: {
        name: 'Timmy Willison',
        title: 'Front-End Lead',
        experience: 'jQuery Lead, OpenJS CPC, OpenTable'
      },
      josh: {
        name: 'Josh Ziegler',
        title: 'Conversation Engineer',
        experience: 'OpenTable, Masters in Linguistics'
      }
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/docs`,
        name: 'docs'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets'
      }
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-96106131-7',
        anonymize: true,
        respectDNT: true
      }
    },
    'gatsby-plugin-svg-sprite',
    'gatsby-plugin-optimize-svgs',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-image',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description || edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                filter: { fileAbsolutePath: { regex: "/blog/" }, frontmatter: { draft: { ne: true } } }
                limit: 1000
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      description
                    }
                  }
                }
              }
            }
            `,
            output: 'rss.xml',
            title: "Spokestack's Blog RSS"
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'spokestack.io',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#2f5bea',
        display: 'minimal-ui',
        icon: 'static/mark.svg'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    }
  ]
}
