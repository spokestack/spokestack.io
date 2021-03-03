require('dotenv').config()
const siteUrl = new URL(process.env.SITE_URL)

console.log(`Site URL in Gatsby config: ${siteUrl.href}`)

module.exports = {
  siteMetadata: {
    title: 'Spokestack - Independent Voice Assistant',
    author: 'Spokestack',
    contact: {
      email: 'hello@spokestack.io',
      phone: '(415) 425-0071'
    },
    description:
      'Build an independent voice assistant. Spokestack features open source tools for mobile and web voice interfaces. Create an account and get started.',
    siteUrl: siteUrl.href,
    logo: `${siteUrl.href}logo.png`,
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
        external: false,
        social: {
          twitter: '',
          linkedin: '',
          email: ''
        }
      },
      {
        key: 'cory',
        name: 'Cory D. Wiles',
        image: '/headshots/cory.png',
        title: 'Spokestack Certified Developer',
        bio: '',
        external: true,
        social: {
          twitter: 'https://twitter.com/kwylez',
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
        external: true,
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
        external: false,
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
        external: false,
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
        external: false,
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
        external: false,
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
        external: false,
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
        title: 'ML Engineer',
        bio: '',
        external: false,
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
    ],
    redirects: [
      {
        from: '/create',
        to: '/account/create',
        permanent: true
      },
      {
        from: '/login',
        to: '/account/login',
        permanent: true
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
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Roboto:300,400,700']
        }
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
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-svg',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-find-replace',
            options: {
              replacements: {
                ANDROID_VERSION: '11.0.0',
                ANDROID_TRAY_VERSION: '0.4.0'
              }
            }
          },
          'gatsby-remark-embed-video',
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              backgroundColor: 'transparent'
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
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: siteUrl.href
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteUrl.hostname,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#2f5bea',
        display: 'minimal-ui',
        icon: 'static/mark.svg'
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              // Use cacheFirst since these don't need to be revalidated (same RegExp
              // and same reason as above)
              urlPattern: /(\.js$|\.css$|static\/)/,
              handler: 'CacheFirst'
            },
            {
              // page-data.json files, static query results and app-data.json
              // are not content hashed
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: 'NetworkFirst'
            },
            {
              // Add runtime caching of various other page resources
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: 'StaleWhileRevalidate'
            },
            {
              // Google Fonts CSS (doesn't end in .css so we need to specify it)
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: 'StaleWhileRevalidate'
            }
          ]
        }
      }
    },
    // 'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        exclude: ['/account/*', '/oauth/*']
      }
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: siteUrl.hostname,
        protocol: siteUrl.protocol.slice(0, -1),
        hostname: siteUrl.hostname,
        generateMatchPathRewrites: false
      }
    }
  ].filter(Boolean)
}
