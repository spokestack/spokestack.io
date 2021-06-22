// Cleans duplicate IDs from the graphql schema
// I'm not sure why these show up, but duplicates need
// removed in order for the types to be valid.
const fs = require('fs')
const path = require('path')

const filename = path.join(__dirname, '../src/utils/graphql.d.ts')

const contents = fs
  .readFileSync(filename, 'utf8')
  // Don't replace with global so only one is removed
  .replace(/\s*PluginCreatorId = 'pluginCreatorId',/, '')
  .replace(
    /\s*PluginOptionsBackgroundColor = 'pluginOptions___backgroundColor',/,
    ''
  )
  .replace(
    /\s*PluginCreatorPluginOptionsBackgroundColor = 'pluginCreator___pluginOptions___background_color',/,
    ''
  )

fs.writeFileSync(filename, contents)
