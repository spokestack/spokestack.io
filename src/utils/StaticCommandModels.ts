import { CommandModel, CommandModelType } from '../types'

export const SpokestackWakeword: CommandModel = {
  classes: [
    {
      displayName: 'Spokestack class',
      id: null!,
      utterances: [{ id: null!, text: 'Spokestack' }]
    }
  ],
  displayName: 'Spokestack',
  description: 'Universal wake word model available to all accounts',
  id: null!,
  insertedAt: null,
  type: CommandModelType.Wakeword,
  updatedAt: null,
  urls: {
    detect: 'https://s.spokestack.io/u/hgmYb/detect.tflite',
    encode: 'https://s.spokestack.io/u/hgmYb/encode.tflite',
    filter: 'https://s.spokestack.io/u/hgmYb/filter.tflite',
    compressed: 'https://s.spokestack.io/u/hgmYb/model.tar.gz',
    metadata: ''
  }
}

const digits = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
]

export const DigitsKeyword: CommandModel = {
  classes: digits.map((command) => ({
    displayName: command,
    id: null!,
    utterances: [{ id: null!, text: command }]
  })),
  displayName: 'Digits',
  description:
    'Universal keyword model available to all accounts that can recognize digits 0-9',
  id: null!,
  insertedAt: null,
  type: CommandModelType.Keyword,
  updatedAt: null,
  urls: {
    detect: 'https://s.spokestack.io/u/UbMeX/detect.tflite',
    encode: 'https://s.spokestack.io/u/UbMeX/encode.tflite',
    filter: 'https://s.spokestack.io/u/UbMeX/filter.tflite',
    compressed: 'https://s.spokestack.io/u/UbMeX/model.tar.gz',
    metadata: 'https://s.spokestack.io/u/UbMeX/metadata.json'
  }
}

const googleCommands = [
  'bed',
  'bird',
  'cat',
  'dog',
  'down',
  'eight',
  'five',
  'four',
  'go',
  'happy',
  'house',
  'left',
  'marvin',
  'nine',
  'no',
  'off',
  'on',
  'one',
  'right',
  'seven',
  'sheila',
  'six',
  'stop',
  'three',
  'tree',
  'two',
  'up',
  'wow',
  'yes',
  'zero'
]

export const GoogleKeyword: CommandModel = {
  classes: googleCommands.map((command) => ({
    displayName: command,
    id: null!,
    utterances: [{ id: null!, text: command }]
  })),
  displayName: 'Google Speech Commands',
  description: `Universal keyword model available to all accounts that can recognize the following commands: ${googleCommands.join(
    ', '
  )}`,
  id: null!,
  insertedAt: null,
  type: CommandModelType.Keyword,
  updatedAt: null,
  urls: {
    detect: 'https://s.spokestack.io/u/MTRhk/detect.tflite',
    encode: 'https://s.spokestack.io/u/MTRhk/encode.tflite',
    filter: 'https://s.spokestack.io/u/MTRhk/filter.tflite',
    compressed: 'https://s.spokestack.io/u/MTRhk/model.tar.gz',
    metadata: 'https://s.spokestack.io/u/MTRhk/metadata.json'
  }
}
