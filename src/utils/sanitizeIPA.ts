const rIPA = /\{{2}([^}]*?)\}{2}/g
const rbrackets = /[{}]/g

export default function sanitizeIPA(text: string) {
  if (rIPA.test(text)) {
    text = text.replace(rIPA, '<phoneme alphabet="ipa" ph="$1"></phoneme>')
  }
  if (rbrackets.test(text)) {
    return null
  }
  return `<speak>${text}</speak>`
}
