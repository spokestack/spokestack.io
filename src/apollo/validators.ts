export const isObject = (value: any) =>
  value !== null && typeof value === 'object'

export const isFileList = (value: any) =>
  typeof FileList !== 'undefined' && value instanceof FileList

export const isUploadFile = (value: any) =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob)
