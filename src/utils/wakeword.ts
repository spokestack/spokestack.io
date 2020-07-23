import WavEncoder from 'wav-encoder'
import { login } from './auth'
import postToCore from './postToCore'
import randomChoice from './randomChoice'

interface UploadOptions {
  buffer: AudioBuffer
  assistant: string
  wakeword: string
}

export async function getWakeword(assistant: string) {
  const [loginError, token] = await login()
  if (loginError || !token) {
    return [
      loginError ||
        new Error('Failed to generate auth token. Please check your network.')
    ]
  }
  return fetch(
    `${process.env.PYLON_CORE_URL}/speech/v1/${assistant}/wakeword`,
    {
      headers: {
        Authorization: token
      }
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error(`Error retrieving wakeword utterances: ${res.status}`)
    })
    .then(({ utterances }) => [null, randomChoice<string>(utterances)])
    .catch((error) => {
      console.error(error)
      return [error]
    })
}

export async function uploadWakeword({
  buffer,
  assistant,
  wakeword
}: UploadOptions) {
  let encoded: ArrayBuffer
  try {
    encoded = await WavEncoder.encode({
      sampleRate: buffer.sampleRate,
      channelData: [...Array(buffer.numberOfChannels)].map((_, i) =>
        buffer.getChannelData(i)
      )
    })
  } catch (e) {
    return [e]
  }
  const [loginError, token] = await login()
  if (loginError || !token) {
    return [
      loginError ||
        new Error('Failed to generate auth token. Please check your network.')
    ]
  }
  const audio = new Audio()
  audio.src = URL.createObjectURL(new Blob([encoded], { type: 'audio/wav' }))
  audio.play()
  const [uploadError, res] = await postToCore(
    `/speech/v1/${assistant}/wakeword/sample?utterance=${encodeURIComponent(
      wakeword
    )}`,
    {
      headers: {
        Authorization: token,
        'Content-Type': 'audio/wav',
        'Content-Length': buffer.length + ''
      },
      body: encoded
    }
  )
  if (uploadError) {
    console.error(uploadError)
    return [uploadError]
  }
  return res
    .json()
    .then((json: Record<string, unknown>) => [null, json])
    .catch((error: Error) => {
      console.error(error)
      return [new Error('Error parsing JSON response')]
    })
}
