const rtrailing = /\/$/
export default function currentPath(pathname: string) {
  return new RegExp(`^${pathname.replace(rtrailing, '')}\\/?(?:#.*)?$`)
}
