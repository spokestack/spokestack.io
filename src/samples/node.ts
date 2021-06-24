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

export const nlu = `// Server-side: GraphQL API proxy
const app = express()
app.post('/graphql', bodyParser.json(), spokestackMiddleware())

// Client-side: query nluInfer using apollo
const client = new ApolloClient({ uri: '/graphql' })
try {
  const response = await this.client.query({
    fetchPolicy: 'no-cache',
    query: gql\`
      query nluInfer($input: String!, $model: String!, $source: NluModelSource = ACCOUNT) {
        nluInfer(input: $input, model: $model, source: $source) {
          confidence
          intent
          slots {
            confidence
            key
            text
            value
          }
        }
      }
    \`,
    variables: {
      input: 'How do I make a castle?',
      model: 'Minecraft',
      source: 'SHARED'
    }
  })
} catch (error) {
  console.error(error)
}
`

export const asr = `import { startStream } from 'spokestack/client'
// ...
let ws: WebSocket
try {
  ;[ws] = await startStream({
    isPlaying: () => this.isPlaying
  })
} catch (error) {
  console.error(error)
  return
}
ws.addEventListener('message', (e) => {
  console.log('Speech processed: ', e.data)
})
`
