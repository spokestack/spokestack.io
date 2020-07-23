export default function randomChoice<T>(vals: Array<T>): T {
  return vals[Math.floor(Math.random() * vals.length)]
}
