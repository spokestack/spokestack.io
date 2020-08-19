const rIPA = /\{{2}([^}]*?)\}{2}/g
const rbrackets = /[{}]/g

export default function sanitizeIPA(text: string) {
  if (rIPA.test(text)) {
    text =
      '<speak>' +
      text.replace(rIPA, '<phoneme aplhabet="ipa" ph="$1"></phoneme>') +
      '</speak>'
  }
  if (rbrackets.test(text)) {
    return null
  }
  return text
}
