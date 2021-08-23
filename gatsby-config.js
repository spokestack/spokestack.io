// await import is a way to get around not
// being able to use esm in node 14
// esm is required for the latest remark-* plugins
const remarkImages = require('remark-images')
const remarkSlug = require('remark-slug')
const remarkAutolinkHeadings = require('remark-autolink-headings')
require('dotenv').config()

const siteUrl = new URL(process.env.SITE_URL)

console.log(`Site URL in Gatsby config: ${siteUrl.href}`)

module.exports = {
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true
  },
  siteMetadata: {
    title: 'Spokestack - Machine Learning for Voice Made Easy',
    author: 'Spokestack',
    contact: {
      email: 'hello@spokestack.io',
      phone: '(415) 425-0071'
    },
    description:
      'AutoML tools and open source libraries for mobile, web, and embedded software. Built by Developers, for Developers. Get started free.',
    siteUrl: siteUrl.href,
    logo: `${siteUrl.href}logo.png`,
    social: {
      facebook: 'https://www.facebook.com/spokestack',
      forum: 'https://forum.spokestack.io',
      github: 'https://github.com/spokestack',
      linkedin: 'https://www.linkedin.com/company/spokestack',
      stackoverflow: 'https://stackoverflow.com/questions/tagged/spokestack',
      twitter: 'https://twitter.com/spokestack',
      youtube: 'https://www.youtube.com/channel/UCn1kViAiPO-XzCfREvGI_AA'
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
        bio: 'Elizabeth designs multimodal experiences with language and visuals in mind. A classically trained violinist, she enjoys bluegrass fiddle and spicy food of all kinds.',
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
        bio: 'Josh lives at the intersection of language and technology. An avid reader, he enjoys long runs in the woods and pedantic arguments about...well, pick a topic.',
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
        title: 'Advisor',
        bio: 'Mike loves making late-night purchases on Discogs and using new technologies to create better user experiences and products.',
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
        title: 'President',
        bio: 'Noel is President and co-creator of Spokestack, and is overly fond of Star Trek: The Next Generation examples.',
        external: false,
        social: {
          twitter: '@noelweichbrodt',
          linkedin: 'https://www.linkedin.com/in/noelweichbrodt',
          email: 'noel@spokestack.io'
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
        url: 'https://www.eventbrite.com/e/how-to-add-voice-to-mobile-workshop-tickets-91159870627'
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
      },
      {
        from: '/docs/android',
        to: '/docs/android/getting-started',
        permanent: false
      },
      {
        from: '/docs/design',
        to: '/docs/design/getting-started',
        permanent: false
      },
      {
        from: '/docs/ios',
        to: '/docs/ios/getting-started',
        permanent: false
      },
      {
        from: '/docs/python',
        to: '/docs/python/getting-started',
        permanent: false
      },
      {
        from: '/docs/react-native',
        to: '/docs/react-native/getting-started',
        permanent: false
      },
      {
        from: '/docs/welcome',
        to: '/docs/overview',
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
    {
      resolve: 'gatsby-source-rss-feed',
      options: {
        url: 'https://forum.spokestack.io/latest.rss',
        name: 'SpokestackForum'
        // Optional
        // Read parser document: https://github.com/bobby-brennan/rss-parser#readme
        // parserOption: {
        //   customFields: {
        //     item: ['itunes:duration']
        //   }
        // }
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
        },
        // Additional options to pass to node-fetch
        fetchOptions: {}
      }
    },
    {
      resolve: 'gatsby-source-youtube-v3',
      options: {
        channelId: ['UCn1kViAiPO-XzCfREvGI_AA'],
        apiKey: process.env.GOOGLE_API_KEY, // Optional for public requests
        maxVideos: 12 // Defaults to 50
      }
    },
    {
      resolve: 'gatsby-source-twitter',
      options: {
        credentials: {
          consumer_key: process.env.TWITTER_API_KEY,
          consumer_secret: process.env.TWITTER_API_SECRET_KEY,
          bearer_token: process.env.TWITTER_BEARER_TOKEN
        },
        queries: {
          spokestack: {
            endpoint: 'statuses/user_timeline',
            params: {
              screen_name: 'spokestack',
              count: 3,
              tweet_mode: 'extended'
            }
          }
        }
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
    'gatsby-plugin-optimize-svgs',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'blurred',
          quality: 70
        }
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-svg',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        remarkPlugins: [
          remarkSlug,
          [
            remarkAutolinkHeadings,
            {
              content: {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: true,
                  focusable: false,
                  width: 16,
                  height: 16,
                  viewBox: '0 0 16 16'
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'
                    }
                  }
                ]
              }
            }
          ],
          remarkImages
        ],
        gatsbyRemarkPlugins: [
          'gatsby-remark-check-links',
          {
            resolve: 'gatsby-remark-find-replace',
            options: {
              replacements: {
                ANDROID_VERSION: '11.5.2',
                ANDROID_TRAY_VERSION: '0.4.4'
              }
            }
          },
          {
            // While gatsby-remark-embedder can also
            // embed youtube videos, it does not have
            // options to customize width/height so
            // that gatsby-remark-responsive-iframe
            // will do its work.
            resolve: 'gatsby-remark-embed-video',
            options: {
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`
                }
              ]
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 25px'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1175,
              backgroundColor: 'transparent'
            }
          },
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
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
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
              allMdx(
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
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: 'gatsby' },

        // Specify optional GTM environment details.
        // gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
        // gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
        // dataLayerName: 'YOUR_DATA_LAYER_NAME',

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        routeChangeEventName: 'route_change'
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
        icon: 'static/favicon.svg'
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          // Don't cache bust spokestack JS and other spokestack assets
          // We do want to cache bust third-party JS
          dontCacheBustURLsMatching: /spokestack.*(\.js$|\.css$|static\/)/,
          runtimeCaching: [
            {
              // The SW should not cache account site data
              // given the potential to accidentally leak
              // data to different users on the same machine.
              urlPattern: /^https?:.+\/(?:account|_next|api)(?:\/.+|\/?$)/,
              handler: 'NetworkOnly'
            },
            {
              // Use cacheFirst since these don't need to be revalidated
              // This regex is the same as the dontCacheBustURLsMatching regex
              urlPattern: /spokestack.*(\.js$|\.css$|static\/)/,
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
              // that we control. This avoids caching third-party resources.
              urlPattern:
                /^https?:.*spokestack.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: 'StaleWhileRevalidate'
            }
          ]
        }
      }
    },
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/account/*', '/api/*', '/_next/*']
      }
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: siteUrl.hostname,
        protocol: siteUrl.protocol.slice(0, -1),
        hostname: siteUrl.hostname,
        generateMatchPathRewrites: false
      }
    }
  ].filter(Boolean)
}
