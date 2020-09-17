module.exports = {
  siteMetadata: {
    title: 'Spokestack - Independent Voice Assistant',
    author: 'Spokestack',
    contact: {
      email: 'hello@spokestack.io',
      phone: '(423) 425-0071'
    },
    description:
      'Build an independent voice assistant. Spokestack features open source tools for mobile and web voice interfaces. Create an account and get started.',
    siteUrl: 'https://www.spokestack.io/',
    logo: 'https://www.spokestack.io/logo.png',
    social: {
      forum: 'https://forum.spokestack.io',
      github: 'https://github.com/spokestack',
      stackoverflow: 'https://stackoverflow.com/questions/tagged/spokestack',
      twitter: 'https://twitter.com/spokestack'
    },
    team: [
      {
        key: 'brent',
        name: 'Brent Spell',
        image: '/headshots/brent.png',
        title: 'CTO',
        bio: '',
        social: {
          twitter: '',
          linkedin: '',
          email: ''
        }
      },
      {
        key: 'daniel',
        name: 'Daniel Tyreus',
        image: '/headshots/daniel.png',
        title: 'Spokestack Certified Developer',
        bio: '',
        social: {
          twitter: '',
          linkedin: '',
          email: ''
        }
      },
      {
        key: 'elizabeth',
        name: 'Elizabeth Ropp',
        image: '/headshots/elizabeth.png',
        title: 'UX & Product Design',
        bio:
          'Elizabeth designs multimodal experiences with language and visuals in mind. A classically trained violinist, she enjoys bluegrass fiddle and spicy food of all kinds.',
        social: {
          twitter: 'https://twitter.com/roppem9',
          linkedin: 'https://www.linkedin.com/in/elizabethropp/',
          email: 'elizabeth@spokestack.io'
        }
      },
      {
        key: 'josh',
        name: 'Josh Ziegler',
        image: '/headshots/josh.png',
        title: 'Principal Computational Linguist',
        bio:
          'Josh lives at the intersection of language and technology. An avid reader, he enjoys long runs in the woods and pedantic arguments about...well, pick a topic.',
        social: {
          twitter: '',
          linkedin: 'https://www.linkedin.com/in/joshziegler/',
          email: 'josh@spokestack.io'
        }
      },
      {
        key: 'mike',
        name: 'Mike Tatum',
        image: '/headshots/mike.png',
        title: 'CEO',
        bio:
          'Mike is the CEO of Spokestack. He loves making late-night purchases on Discogs and using new technologies to create better user experiences and products.',
        social: {
          twitter: 'https://twitter.com/miketatum',
          linkedin: 'https://www.linkedin.com/in/miketatum/',
          email: 'mike@spokestack.io'
        }
      },
      {
        key: 'noel',
        name: 'Noel Weichbrodt',
        image: '/headshots/noel.png',
        title: 'Principal Engineer',
        bio: '',
        social: {
          twitter: '',
          linkedin: '',
          email: ''
        }
      },
      {
        key: 'timmy',
        name: 'Timmy Willison',
        image: '/headshots/timmy.png',
        title: 'Front-End Engineer',
        bio: '',
        social: {
          twitter: 'https://twitter.com/timmywil',
          linkedin: '',
          email: 'timmy@spokestack.io'
        }
      },
      {
        key: 'will',
        name: 'Will Rice',
        image: '/headshots/will.png',
        title: 'Data Science Engineer',
        bio: '',
        social: {
          twitter: '',
          linkedin: '',
          email: ''
        }
      }
    ],
    events: [
      {
        title: 'How to Add Voice to Mobile Workshop',
        description:
          'Leave this workshop with some voice design best practices and a simple voice-controlled app of your own.',
        month: 'Feb',
        day: '19',
        time: '5:30pm - 7:00pm',
        locationLine1: 'The Edney, Floor 5',
        locationLine2: 'Chattanooga, TN',
        url:
          'https://www.eventbrite.com/e/how-to-add-voice-to-mobile-workshop-tickets-91159870627'
      }
    ]
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
    'gatsby-plugin-optimize-svgs',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-image',
    'gatsby-plugin-react-svg',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              backgroundColor: 'transparent'
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-embedder'
        ]
      }
    },
    'gatsby-plugin-twitter',
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
                  description:
                    edge.node.frontmatter.description || edge.node.excerpt,
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
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/account/*']
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        exclude: ['/account/*', '/oauth/*']
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.spokestack.io'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'www.spokestack.io',
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
        pathToConfigModule: 'src/styles/typography'
      }
    },
    'gatsby-plugin-remove-trailing-slashes'
  ].filter(Boolean)
}
