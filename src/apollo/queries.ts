import gql from 'graphql-tag'

export const LIST_VOICES = gql`
  query listVoices {
    listVoices {
      description
      name
    }
  }
`

export const SYNTHESIZE_MARKDOWN = gql`
  query synthesizeMarkdown($markdown: String!, $voice: String!) {
    synthesizeMarkdown(markdown: $markdown, voice: $voice) {
      url
    }
  }
`

export const SYNTHESIZE_SSML = gql`
  query synthesizeSsml($ssml: String!, $voice: String!) {
    synthesizeSsml(ssml: $ssml, voice: $voice) {
      url
    }
  }
`
