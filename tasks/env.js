/**
 * base64 encode an env file for pasting into CI
 * Usage: yarn env .env
 */
const path = require('path')
const fs = require('fs')
const clipboardy = require('clipboardy')
const args = process.argv.slice(2)

function encode(filename) {
  fs.readFile(
    filename,
    {
      encoding: 'base64'
    },
    (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      console.log()
      console.log(data)
      console.log()
      clipboardy.write(data)
      console.log('> Copied base64 encoding to clipboard')
    }
  )
}

if (args.length === 1) {
  const filename = path.join(__dirname, '..', args[0])
  return encode(filename)
} else {
  console.log('Usage: yarn env .env')
  throw new Error('Wrong number of arguments')
}
