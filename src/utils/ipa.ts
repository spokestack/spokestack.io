const rIPA = /\{{2}([^}]*?)\}{2}/g
const rbrackets = /[{}]/g
const rssml = /{{spoʊkstæk}}/g
const rmd = /\(spokestack\)\[ipa:"spoʊkstæk"\]/g

export function sanitizeIPA(text: string) {
  if (rIPA.test(text)) {
    text = text.replace(rIPA, '<phoneme alphabet="ipa" ph="$1"></phoneme>')
  }
  if (rbrackets.test(text)) {
    return null
  }
  return `<speak>${text}</speak>`
}

export function swapIPA(text: string, isMarkdown: boolean) {
  return isMarkdown
    ? text.replace(rssml, '(spokestack)[ipa:"spoʊkstæk"]')
    : text.replace(rmd, '{{spoʊkstæk}}')
}
