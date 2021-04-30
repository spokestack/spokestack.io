export const wakeword = `try {
  await startPipeline({
    profile: PipelineProfile.Wakeword,
    baseUrls: {
      wakeword: 'https://s.spokestack.io/u/hgmYb/js'
    },
    onEvent: (event) => {
      switch (event.type) {
        case SpeechEventType.Activate:
          console.log('Wake word activated!')
          break
        // ..
      }
    }
  })
} catch (e) {
  console.error(e)
}
`
export const keyword = `try {
  await startPipeline({
    profile: PipelineProfile.Keyword,
    keywordClasses: [
      'one',
      'two',
      'three'
    ],
    baseUrls: {
      keyword: 'https://s.spokestack.io/u/UbMeX/js'
    },
    onEvent: (evt) => {
      const { type, transcript } = evt
      switch (type) {
        case SpeechEventType.Recognize:
          this.setState({ transcript })
          break
        // ...
      }
    }
  })
} catch (e) {
  console.error(e)
}
`

export const tts = `// Server-side: GraphQL API proxy
const app = express()
app.post('/graphql', bodyParser.json(), spokestackMiddleware())

// Client-side: synthesizing text to speech using apollo
const client = new ApolloClient({ uri: '/graphql' })
try {
  const response = await client.query({
    query: gql\`
      query synthesizeText($text: String!, $voice: String!) {
        synthesizeText(text: $text, voice: $voice) {
          url
        }
      }
    \`,
    variables: {
      text: 'Hello World',
      voice: 'demo-male'
    }
  })
} catch (error) {
  console.error(error)
}
`
