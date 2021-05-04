export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type AvifOptions = {
  quality?: Maybe<Scalars['Int']>
  lossless?: Maybe<Scalars['Boolean']>
  speed?: Maybe<Scalars['Int']>
}

export type BlurredOptions = {
  /** Width of the generated low-res preview. Default is 20px */
  width?: Maybe<Scalars['Int']>
  /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
  toFormat?: Maybe<ImageFormat>
}

export type BooleanQueryOperatorInput = {
  eq?: Maybe<Scalars['Boolean']>
  ne?: Maybe<Scalars['Boolean']>
  in?: Maybe<Array<Maybe<Scalars['Boolean']>>>
  nin?: Maybe<Array<Maybe<Scalars['Boolean']>>>
}

export type DateQueryOperatorInput = {
  eq?: Maybe<Scalars['Date']>
  ne?: Maybe<Scalars['Date']>
  gt?: Maybe<Scalars['Date']>
  gte?: Maybe<Scalars['Date']>
  lt?: Maybe<Scalars['Date']>
  lte?: Maybe<Scalars['Date']>
  in?: Maybe<Array<Maybe<Scalars['Date']>>>
  nin?: Maybe<Array<Maybe<Scalars['Date']>>>
}

export type Directory = Node & {
  __typename?: 'Directory'
  sourceInstanceName: Scalars['String']
  absolutePath: Scalars['String']
  relativePath: Scalars['String']
  extension: Scalars['String']
  size: Scalars['Int']
  prettySize: Scalars['String']
  modifiedTime: Scalars['Date']
  accessTime: Scalars['Date']
  changeTime: Scalars['Date']
  birthTime: Scalars['Date']
  root: Scalars['String']
  dir: Scalars['String']
  base: Scalars['String']
  ext: Scalars['String']
  name: Scalars['String']
  relativeDirectory: Scalars['String']
  dev: Scalars['Int']
  mode: Scalars['Int']
  nlink: Scalars['Int']
  uid: Scalars['Int']
  gid: Scalars['Int']
  rdev: Scalars['Int']
  ino: Scalars['Float']
  atimeMs: Scalars['Float']
  mtimeMs: Scalars['Float']
  ctimeMs: Scalars['Float']
  atime: Scalars['Date']
  mtime: Scalars['Date']
  ctime: Scalars['Date']
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>
  blksize?: Maybe<Scalars['Int']>
  blocks?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type DirectoryModifiedTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type DirectoryAccessTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type DirectoryChangeTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type DirectoryBirthTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type DirectoryAtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type DirectoryMtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type DirectoryCtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type DirectoryConnection = {
  __typename?: 'DirectoryConnection'
  totalCount: Scalars['Int']
  edges: Array<DirectoryEdge>
  nodes: Array<Directory>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  group: Array<DirectoryGroupConnection>
}

export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  field: DirectoryFieldsEnum
}

export type DirectoryEdge = {
  __typename?: 'DirectoryEdge'
  next?: Maybe<Directory>
  node: Directory
  previous?: Maybe<Directory>
}

export enum DirectoryFieldsEnum {
  SourceInstanceName = 'sourceInstanceName',
  AbsolutePath = 'absolutePath',
  RelativePath = 'relativePath',
  Extension = 'extension',
  Size = 'size',
  PrettySize = 'prettySize',
  ModifiedTime = 'modifiedTime',
  AccessTime = 'accessTime',
  ChangeTime = 'changeTime',
  BirthTime = 'birthTime',
  Root = 'root',
  Dir = 'dir',
  Base = 'base',
  Ext = 'ext',
  Name = 'name',
  RelativeDirectory = 'relativeDirectory',
  Dev = 'dev',
  Mode = 'mode',
  Nlink = 'nlink',
  Uid = 'uid',
  Gid = 'gid',
  Rdev = 'rdev',
  Ino = 'ino',
  AtimeMs = 'atimeMs',
  MtimeMs = 'mtimeMs',
  CtimeMs = 'ctimeMs',
  Atime = 'atime',
  Mtime = 'mtime',
  Ctime = 'ctime',
  Birthtime = 'birthtime',
  BirthtimeMs = 'birthtimeMs',
  Blksize = 'blksize',
  Blocks = 'blocks',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type DirectoryFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  gid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type DirectoryGroupConnection = {
  __typename?: 'DirectoryGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<DirectoryEdge>
  nodes: Array<Directory>
  pageInfo: PageInfo
  field: Scalars['String']
  fieldValue?: Maybe<Scalars['String']>
}

export type DirectorySortInput = {
  fields?: Maybe<Array<Maybe<DirectoryFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type DuotoneGradient = {
  highlight: Scalars['String']
  shadow: Scalars['String']
  opacity?: Maybe<Scalars['Int']>
}

export type File = Node & {
  __typename?: 'File'
  sourceInstanceName: Scalars['String']
  absolutePath: Scalars['String']
  relativePath: Scalars['String']
  extension: Scalars['String']
  size: Scalars['Int']
  prettySize: Scalars['String']
  modifiedTime: Scalars['Date']
  accessTime: Scalars['Date']
  changeTime: Scalars['Date']
  birthTime: Scalars['Date']
  root: Scalars['String']
  dir: Scalars['String']
  base: Scalars['String']
  ext: Scalars['String']
  name: Scalars['String']
  relativeDirectory: Scalars['String']
  dev: Scalars['Int']
  mode: Scalars['Int']
  nlink: Scalars['Int']
  uid: Scalars['Int']
  gid: Scalars['Int']
  rdev: Scalars['Int']
  ino: Scalars['Float']
  atimeMs: Scalars['Float']
  mtimeMs: Scalars['Float']
  ctimeMs: Scalars['Float']
  atime: Scalars['Date']
  mtime: Scalars['Date']
  ctime: Scalars['Date']
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>
  blksize?: Maybe<Scalars['Int']>
  blocks?: Maybe<Scalars['Int']>
  /** Copy file to static directory and return public url to it */
  publicURL?: Maybe<Scalars['String']>
  /** Returns all children nodes filtered by type ImageSharp */
  childrenImageSharp?: Maybe<Array<Maybe<ImageSharp>>>
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  childImageSharp?: Maybe<ImageSharp>
  /** Returns all children nodes filtered by type MarkdownRemark */
  childrenMarkdownRemark?: Maybe<Array<Maybe<MarkdownRemark>>>
  /** Returns the first child node of type MarkdownRemark or null if there are no children of given type on this node */
  childMarkdownRemark?: Maybe<MarkdownRemark>
  id: Scalars['ID']
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type FileModifiedTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type FileAccessTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type FileChangeTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type FileBirthTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type FileAtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type FileMtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type FileCtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type FileConnection = {
  __typename?: 'FileConnection'
  totalCount: Scalars['Int']
  edges: Array<FileEdge>
  nodes: Array<File>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  group: Array<FileGroupConnection>
}

export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum
}

export type FileConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  field: FileFieldsEnum
}

export type FileEdge = {
  __typename?: 'FileEdge'
  next?: Maybe<File>
  node: File
  previous?: Maybe<File>
}

export enum FileFieldsEnum {
  SourceInstanceName = 'sourceInstanceName',
  AbsolutePath = 'absolutePath',
  RelativePath = 'relativePath',
  Extension = 'extension',
  Size = 'size',
  PrettySize = 'prettySize',
  ModifiedTime = 'modifiedTime',
  AccessTime = 'accessTime',
  ChangeTime = 'changeTime',
  BirthTime = 'birthTime',
  Root = 'root',
  Dir = 'dir',
  Base = 'base',
  Ext = 'ext',
  Name = 'name',
  RelativeDirectory = 'relativeDirectory',
  Dev = 'dev',
  Mode = 'mode',
  Nlink = 'nlink',
  Uid = 'uid',
  Gid = 'gid',
  Rdev = 'rdev',
  Ino = 'ino',
  AtimeMs = 'atimeMs',
  MtimeMs = 'mtimeMs',
  CtimeMs = 'ctimeMs',
  Atime = 'atime',
  Mtime = 'mtime',
  Ctime = 'ctime',
  Birthtime = 'birthtime',
  BirthtimeMs = 'birthtimeMs',
  Blksize = 'blksize',
  Blocks = 'blocks',
  PublicUrl = 'publicURL',
  ChildrenImageSharp = 'childrenImageSharp',
  ChildrenImageSharpFixedBase64 = 'childrenImageSharp___fixed___base64',
  ChildrenImageSharpFixedTracedSvg = 'childrenImageSharp___fixed___tracedSVG',
  ChildrenImageSharpFixedAspectRatio = 'childrenImageSharp___fixed___aspectRatio',
  ChildrenImageSharpFixedWidth = 'childrenImageSharp___fixed___width',
  ChildrenImageSharpFixedHeight = 'childrenImageSharp___fixed___height',
  ChildrenImageSharpFixedSrc = 'childrenImageSharp___fixed___src',
  ChildrenImageSharpFixedSrcSet = 'childrenImageSharp___fixed___srcSet',
  ChildrenImageSharpFixedSrcWebp = 'childrenImageSharp___fixed___srcWebp',
  ChildrenImageSharpFixedSrcSetWebp = 'childrenImageSharp___fixed___srcSetWebp',
  ChildrenImageSharpFixedOriginalName = 'childrenImageSharp___fixed___originalName',
  ChildrenImageSharpFluidBase64 = 'childrenImageSharp___fluid___base64',
  ChildrenImageSharpFluidTracedSvg = 'childrenImageSharp___fluid___tracedSVG',
  ChildrenImageSharpFluidAspectRatio = 'childrenImageSharp___fluid___aspectRatio',
  ChildrenImageSharpFluidSrc = 'childrenImageSharp___fluid___src',
  ChildrenImageSharpFluidSrcSet = 'childrenImageSharp___fluid___srcSet',
  ChildrenImageSharpFluidSrcWebp = 'childrenImageSharp___fluid___srcWebp',
  ChildrenImageSharpFluidSrcSetWebp = 'childrenImageSharp___fluid___srcSetWebp',
  ChildrenImageSharpFluidSizes = 'childrenImageSharp___fluid___sizes',
  ChildrenImageSharpFluidOriginalImg = 'childrenImageSharp___fluid___originalImg',
  ChildrenImageSharpFluidOriginalName = 'childrenImageSharp___fluid___originalName',
  ChildrenImageSharpFluidPresentationWidth = 'childrenImageSharp___fluid___presentationWidth',
  ChildrenImageSharpFluidPresentationHeight = 'childrenImageSharp___fluid___presentationHeight',
  ChildrenImageSharpGatsbyImageData = 'childrenImageSharp___gatsbyImageData',
  ChildrenImageSharpOriginalWidth = 'childrenImageSharp___original___width',
  ChildrenImageSharpOriginalHeight = 'childrenImageSharp___original___height',
  ChildrenImageSharpOriginalSrc = 'childrenImageSharp___original___src',
  ChildrenImageSharpResizeSrc = 'childrenImageSharp___resize___src',
  ChildrenImageSharpResizeTracedSvg = 'childrenImageSharp___resize___tracedSVG',
  ChildrenImageSharpResizeWidth = 'childrenImageSharp___resize___width',
  ChildrenImageSharpResizeHeight = 'childrenImageSharp___resize___height',
  ChildrenImageSharpResizeAspectRatio = 'childrenImageSharp___resize___aspectRatio',
  ChildrenImageSharpResizeOriginalName = 'childrenImageSharp___resize___originalName',
  ChildrenImageSharpId = 'childrenImageSharp___id',
  ChildrenImageSharpParentId = 'childrenImageSharp___parent___id',
  ChildrenImageSharpParentParentId = 'childrenImageSharp___parent___parent___id',
  ChildrenImageSharpParentParentChildren = 'childrenImageSharp___parent___parent___children',
  ChildrenImageSharpParentChildren = 'childrenImageSharp___parent___children',
  ChildrenImageSharpParentChildrenId = 'childrenImageSharp___parent___children___id',
  ChildrenImageSharpParentChildrenChildren = 'childrenImageSharp___parent___children___children',
  ChildrenImageSharpParentInternalContent = 'childrenImageSharp___parent___internal___content',
  ChildrenImageSharpParentInternalContentDigest = 'childrenImageSharp___parent___internal___contentDigest',
  ChildrenImageSharpParentInternalDescription = 'childrenImageSharp___parent___internal___description',
  ChildrenImageSharpParentInternalFieldOwners = 'childrenImageSharp___parent___internal___fieldOwners',
  ChildrenImageSharpParentInternalIgnoreType = 'childrenImageSharp___parent___internal___ignoreType',
  ChildrenImageSharpParentInternalMediaType = 'childrenImageSharp___parent___internal___mediaType',
  ChildrenImageSharpParentInternalOwner = 'childrenImageSharp___parent___internal___owner',
  ChildrenImageSharpParentInternalType = 'childrenImageSharp___parent___internal___type',
  ChildrenImageSharpChildren = 'childrenImageSharp___children',
  ChildrenImageSharpChildrenId = 'childrenImageSharp___children___id',
  ChildrenImageSharpChildrenParentId = 'childrenImageSharp___children___parent___id',
  ChildrenImageSharpChildrenParentChildren = 'childrenImageSharp___children___parent___children',
  ChildrenImageSharpChildrenChildren = 'childrenImageSharp___children___children',
  ChildrenImageSharpChildrenChildrenId = 'childrenImageSharp___children___children___id',
  ChildrenImageSharpChildrenChildrenChildren = 'childrenImageSharp___children___children___children',
  ChildrenImageSharpChildrenInternalContent = 'childrenImageSharp___children___internal___content',
  ChildrenImageSharpChildrenInternalContentDigest = 'childrenImageSharp___children___internal___contentDigest',
  ChildrenImageSharpChildrenInternalDescription = 'childrenImageSharp___children___internal___description',
  ChildrenImageSharpChildrenInternalFieldOwners = 'childrenImageSharp___children___internal___fieldOwners',
  ChildrenImageSharpChildrenInternalIgnoreType = 'childrenImageSharp___children___internal___ignoreType',
  ChildrenImageSharpChildrenInternalMediaType = 'childrenImageSharp___children___internal___mediaType',
  ChildrenImageSharpChildrenInternalOwner = 'childrenImageSharp___children___internal___owner',
  ChildrenImageSharpChildrenInternalType = 'childrenImageSharp___children___internal___type',
  ChildrenImageSharpInternalContent = 'childrenImageSharp___internal___content',
  ChildrenImageSharpInternalContentDigest = 'childrenImageSharp___internal___contentDigest',
  ChildrenImageSharpInternalDescription = 'childrenImageSharp___internal___description',
  ChildrenImageSharpInternalFieldOwners = 'childrenImageSharp___internal___fieldOwners',
  ChildrenImageSharpInternalIgnoreType = 'childrenImageSharp___internal___ignoreType',
  ChildrenImageSharpInternalMediaType = 'childrenImageSharp___internal___mediaType',
  ChildrenImageSharpInternalOwner = 'childrenImageSharp___internal___owner',
  ChildrenImageSharpInternalType = 'childrenImageSharp___internal___type',
  ChildImageSharpFixedBase64 = 'childImageSharp___fixed___base64',
  ChildImageSharpFixedTracedSvg = 'childImageSharp___fixed___tracedSVG',
  ChildImageSharpFixedAspectRatio = 'childImageSharp___fixed___aspectRatio',
  ChildImageSharpFixedWidth = 'childImageSharp___fixed___width',
  ChildImageSharpFixedHeight = 'childImageSharp___fixed___height',
  ChildImageSharpFixedSrc = 'childImageSharp___fixed___src',
  ChildImageSharpFixedSrcSet = 'childImageSharp___fixed___srcSet',
  ChildImageSharpFixedSrcWebp = 'childImageSharp___fixed___srcWebp',
  ChildImageSharpFixedSrcSetWebp = 'childImageSharp___fixed___srcSetWebp',
  ChildImageSharpFixedOriginalName = 'childImageSharp___fixed___originalName',
  ChildImageSharpFluidBase64 = 'childImageSharp___fluid___base64',
  ChildImageSharpFluidTracedSvg = 'childImageSharp___fluid___tracedSVG',
  ChildImageSharpFluidAspectRatio = 'childImageSharp___fluid___aspectRatio',
  ChildImageSharpFluidSrc = 'childImageSharp___fluid___src',
  ChildImageSharpFluidSrcSet = 'childImageSharp___fluid___srcSet',
  ChildImageSharpFluidSrcWebp = 'childImageSharp___fluid___srcWebp',
  ChildImageSharpFluidSrcSetWebp = 'childImageSharp___fluid___srcSetWebp',
  ChildImageSharpFluidSizes = 'childImageSharp___fluid___sizes',
  ChildImageSharpFluidOriginalImg = 'childImageSharp___fluid___originalImg',
  ChildImageSharpFluidOriginalName = 'childImageSharp___fluid___originalName',
  ChildImageSharpFluidPresentationWidth = 'childImageSharp___fluid___presentationWidth',
  ChildImageSharpFluidPresentationHeight = 'childImageSharp___fluid___presentationHeight',
  ChildImageSharpGatsbyImageData = 'childImageSharp___gatsbyImageData',
  ChildImageSharpOriginalWidth = 'childImageSharp___original___width',
  ChildImageSharpOriginalHeight = 'childImageSharp___original___height',
  ChildImageSharpOriginalSrc = 'childImageSharp___original___src',
  ChildImageSharpResizeSrc = 'childImageSharp___resize___src',
  ChildImageSharpResizeTracedSvg = 'childImageSharp___resize___tracedSVG',
  ChildImageSharpResizeWidth = 'childImageSharp___resize___width',
  ChildImageSharpResizeHeight = 'childImageSharp___resize___height',
  ChildImageSharpResizeAspectRatio = 'childImageSharp___resize___aspectRatio',
  ChildImageSharpResizeOriginalName = 'childImageSharp___resize___originalName',
  ChildImageSharpId = 'childImageSharp___id',
  ChildImageSharpParentId = 'childImageSharp___parent___id',
  ChildImageSharpParentParentId = 'childImageSharp___parent___parent___id',
  ChildImageSharpParentParentChildren = 'childImageSharp___parent___parent___children',
  ChildImageSharpParentChildren = 'childImageSharp___parent___children',
  ChildImageSharpParentChildrenId = 'childImageSharp___parent___children___id',
  ChildImageSharpParentChildrenChildren = 'childImageSharp___parent___children___children',
  ChildImageSharpParentInternalContent = 'childImageSharp___parent___internal___content',
  ChildImageSharpParentInternalContentDigest = 'childImageSharp___parent___internal___contentDigest',
  ChildImageSharpParentInternalDescription = 'childImageSharp___parent___internal___description',
  ChildImageSharpParentInternalFieldOwners = 'childImageSharp___parent___internal___fieldOwners',
  ChildImageSharpParentInternalIgnoreType = 'childImageSharp___parent___internal___ignoreType',
  ChildImageSharpParentInternalMediaType = 'childImageSharp___parent___internal___mediaType',
  ChildImageSharpParentInternalOwner = 'childImageSharp___parent___internal___owner',
  ChildImageSharpParentInternalType = 'childImageSharp___parent___internal___type',
  ChildImageSharpChildren = 'childImageSharp___children',
  ChildImageSharpChildrenId = 'childImageSharp___children___id',
  ChildImageSharpChildrenParentId = 'childImageSharp___children___parent___id',
  ChildImageSharpChildrenParentChildren = 'childImageSharp___children___parent___children',
  ChildImageSharpChildrenChildren = 'childImageSharp___children___children',
  ChildImageSharpChildrenChildrenId = 'childImageSharp___children___children___id',
  ChildImageSharpChildrenChildrenChildren = 'childImageSharp___children___children___children',
  ChildImageSharpChildrenInternalContent = 'childImageSharp___children___internal___content',
  ChildImageSharpChildrenInternalContentDigest = 'childImageSharp___children___internal___contentDigest',
  ChildImageSharpChildrenInternalDescription = 'childImageSharp___children___internal___description',
  ChildImageSharpChildrenInternalFieldOwners = 'childImageSharp___children___internal___fieldOwners',
  ChildImageSharpChildrenInternalIgnoreType = 'childImageSharp___children___internal___ignoreType',
  ChildImageSharpChildrenInternalMediaType = 'childImageSharp___children___internal___mediaType',
  ChildImageSharpChildrenInternalOwner = 'childImageSharp___children___internal___owner',
  ChildImageSharpChildrenInternalType = 'childImageSharp___children___internal___type',
  ChildImageSharpInternalContent = 'childImageSharp___internal___content',
  ChildImageSharpInternalContentDigest = 'childImageSharp___internal___contentDigest',
  ChildImageSharpInternalDescription = 'childImageSharp___internal___description',
  ChildImageSharpInternalFieldOwners = 'childImageSharp___internal___fieldOwners',
  ChildImageSharpInternalIgnoreType = 'childImageSharp___internal___ignoreType',
  ChildImageSharpInternalMediaType = 'childImageSharp___internal___mediaType',
  ChildImageSharpInternalOwner = 'childImageSharp___internal___owner',
  ChildImageSharpInternalType = 'childImageSharp___internal___type',
  ChildrenMarkdownRemark = 'childrenMarkdownRemark',
  ChildrenMarkdownRemarkId = 'childrenMarkdownRemark___id',
  ChildrenMarkdownRemarkFrontmatterTitle = 'childrenMarkdownRemark___frontmatter___title',
  ChildrenMarkdownRemarkFrontmatterDate = 'childrenMarkdownRemark___frontmatter___date',
  ChildrenMarkdownRemarkFrontmatterDescription = 'childrenMarkdownRemark___frontmatter___description',
  ChildrenMarkdownRemarkFrontmatterAuthor = 'childrenMarkdownRemark___frontmatter___author',
  ChildrenMarkdownRemarkFrontmatterTags = 'childrenMarkdownRemark___frontmatter___tags',
  ChildrenMarkdownRemarkFrontmatterDraft = 'childrenMarkdownRemark___frontmatter___draft',
  ChildrenMarkdownRemarkFrontmatterHeroSourceInstanceName = 'childrenMarkdownRemark___frontmatter___hero___sourceInstanceName',
  ChildrenMarkdownRemarkFrontmatterHeroAbsolutePath = 'childrenMarkdownRemark___frontmatter___hero___absolutePath',
  ChildrenMarkdownRemarkFrontmatterHeroRelativePath = 'childrenMarkdownRemark___frontmatter___hero___relativePath',
  ChildrenMarkdownRemarkFrontmatterHeroExtension = 'childrenMarkdownRemark___frontmatter___hero___extension',
  ChildrenMarkdownRemarkFrontmatterHeroSize = 'childrenMarkdownRemark___frontmatter___hero___size',
  ChildrenMarkdownRemarkFrontmatterHeroPrettySize = 'childrenMarkdownRemark___frontmatter___hero___prettySize',
  ChildrenMarkdownRemarkFrontmatterHeroModifiedTime = 'childrenMarkdownRemark___frontmatter___hero___modifiedTime',
  ChildrenMarkdownRemarkFrontmatterHeroAccessTime = 'childrenMarkdownRemark___frontmatter___hero___accessTime',
  ChildrenMarkdownRemarkFrontmatterHeroChangeTime = 'childrenMarkdownRemark___frontmatter___hero___changeTime',
  ChildrenMarkdownRemarkFrontmatterHeroBirthTime = 'childrenMarkdownRemark___frontmatter___hero___birthTime',
  ChildrenMarkdownRemarkFrontmatterHeroRoot = 'childrenMarkdownRemark___frontmatter___hero___root',
  ChildrenMarkdownRemarkFrontmatterHeroDir = 'childrenMarkdownRemark___frontmatter___hero___dir',
  ChildrenMarkdownRemarkFrontmatterHeroBase = 'childrenMarkdownRemark___frontmatter___hero___base',
  ChildrenMarkdownRemarkFrontmatterHeroExt = 'childrenMarkdownRemark___frontmatter___hero___ext',
  ChildrenMarkdownRemarkFrontmatterHeroName = 'childrenMarkdownRemark___frontmatter___hero___name',
  ChildrenMarkdownRemarkFrontmatterHeroRelativeDirectory = 'childrenMarkdownRemark___frontmatter___hero___relativeDirectory',
  ChildrenMarkdownRemarkFrontmatterHeroDev = 'childrenMarkdownRemark___frontmatter___hero___dev',
  ChildrenMarkdownRemarkFrontmatterHeroMode = 'childrenMarkdownRemark___frontmatter___hero___mode',
  ChildrenMarkdownRemarkFrontmatterHeroNlink = 'childrenMarkdownRemark___frontmatter___hero___nlink',
  ChildrenMarkdownRemarkFrontmatterHeroUid = 'childrenMarkdownRemark___frontmatter___hero___uid',
  ChildrenMarkdownRemarkFrontmatterHeroGid = 'childrenMarkdownRemark___frontmatter___hero___gid',
  ChildrenMarkdownRemarkFrontmatterHeroRdev = 'childrenMarkdownRemark___frontmatter___hero___rdev',
  ChildrenMarkdownRemarkFrontmatterHeroIno = 'childrenMarkdownRemark___frontmatter___hero___ino',
  ChildrenMarkdownRemarkFrontmatterHeroAtimeMs = 'childrenMarkdownRemark___frontmatter___hero___atimeMs',
  ChildrenMarkdownRemarkFrontmatterHeroMtimeMs = 'childrenMarkdownRemark___frontmatter___hero___mtimeMs',
  ChildrenMarkdownRemarkFrontmatterHeroCtimeMs = 'childrenMarkdownRemark___frontmatter___hero___ctimeMs',
  ChildrenMarkdownRemarkFrontmatterHeroAtime = 'childrenMarkdownRemark___frontmatter___hero___atime',
  ChildrenMarkdownRemarkFrontmatterHeroMtime = 'childrenMarkdownRemark___frontmatter___hero___mtime',
  ChildrenMarkdownRemarkFrontmatterHeroCtime = 'childrenMarkdownRemark___frontmatter___hero___ctime',
  ChildrenMarkdownRemarkFrontmatterHeroBirthtime = 'childrenMarkdownRemark___frontmatter___hero___birthtime',
  ChildrenMarkdownRemarkFrontmatterHeroBirthtimeMs = 'childrenMarkdownRemark___frontmatter___hero___birthtimeMs',
  ChildrenMarkdownRemarkFrontmatterHeroBlksize = 'childrenMarkdownRemark___frontmatter___hero___blksize',
  ChildrenMarkdownRemarkFrontmatterHeroBlocks = 'childrenMarkdownRemark___frontmatter___hero___blocks',
  ChildrenMarkdownRemarkFrontmatterHeroPublicUrl = 'childrenMarkdownRemark___frontmatter___hero___publicURL',
  ChildrenMarkdownRemarkFrontmatterHeroChildrenImageSharp = 'childrenMarkdownRemark___frontmatter___hero___childrenImageSharp',
  ChildrenMarkdownRemarkFrontmatterHeroChildrenMarkdownRemark = 'childrenMarkdownRemark___frontmatter___hero___childrenMarkdownRemark',
  ChildrenMarkdownRemarkFrontmatterHeroId = 'childrenMarkdownRemark___frontmatter___hero___id',
  ChildrenMarkdownRemarkFrontmatterHeroChildren = 'childrenMarkdownRemark___frontmatter___hero___children',
  ChildrenMarkdownRemarkFrontmatterNavId = 'childrenMarkdownRemark___frontmatter___navId',
  ChildrenMarkdownRemarkFrontmatterSeoImageSourceInstanceName = 'childrenMarkdownRemark___frontmatter___seoImage___sourceInstanceName',
  ChildrenMarkdownRemarkFrontmatterSeoImageAbsolutePath = 'childrenMarkdownRemark___frontmatter___seoImage___absolutePath',
  ChildrenMarkdownRemarkFrontmatterSeoImageRelativePath = 'childrenMarkdownRemark___frontmatter___seoImage___relativePath',
  ChildrenMarkdownRemarkFrontmatterSeoImageExtension = 'childrenMarkdownRemark___frontmatter___seoImage___extension',
  ChildrenMarkdownRemarkFrontmatterSeoImageSize = 'childrenMarkdownRemark___frontmatter___seoImage___size',
  ChildrenMarkdownRemarkFrontmatterSeoImagePrettySize = 'childrenMarkdownRemark___frontmatter___seoImage___prettySize',
  ChildrenMarkdownRemarkFrontmatterSeoImageModifiedTime = 'childrenMarkdownRemark___frontmatter___seoImage___modifiedTime',
  ChildrenMarkdownRemarkFrontmatterSeoImageAccessTime = 'childrenMarkdownRemark___frontmatter___seoImage___accessTime',
  ChildrenMarkdownRemarkFrontmatterSeoImageChangeTime = 'childrenMarkdownRemark___frontmatter___seoImage___changeTime',
  ChildrenMarkdownRemarkFrontmatterSeoImageBirthTime = 'childrenMarkdownRemark___frontmatter___seoImage___birthTime',
  ChildrenMarkdownRemarkFrontmatterSeoImageRoot = 'childrenMarkdownRemark___frontmatter___seoImage___root',
  ChildrenMarkdownRemarkFrontmatterSeoImageDir = 'childrenMarkdownRemark___frontmatter___seoImage___dir',
  ChildrenMarkdownRemarkFrontmatterSeoImageBase = 'childrenMarkdownRemark___frontmatter___seoImage___base',
  ChildrenMarkdownRemarkFrontmatterSeoImageExt = 'childrenMarkdownRemark___frontmatter___seoImage___ext',
  ChildrenMarkdownRemarkFrontmatterSeoImageName = 'childrenMarkdownRemark___frontmatter___seoImage___name',
  ChildrenMarkdownRemarkFrontmatterSeoImageRelativeDirectory = 'childrenMarkdownRemark___frontmatter___seoImage___relativeDirectory',
  ChildrenMarkdownRemarkFrontmatterSeoImageDev = 'childrenMarkdownRemark___frontmatter___seoImage___dev',
  ChildrenMarkdownRemarkFrontmatterSeoImageMode = 'childrenMarkdownRemark___frontmatter___seoImage___mode',
  ChildrenMarkdownRemarkFrontmatterSeoImageNlink = 'childrenMarkdownRemark___frontmatter___seoImage___nlink',
  ChildrenMarkdownRemarkFrontmatterSeoImageUid = 'childrenMarkdownRemark___frontmatter___seoImage___uid',
  ChildrenMarkdownRemarkFrontmatterSeoImageGid = 'childrenMarkdownRemark___frontmatter___seoImage___gid',
  ChildrenMarkdownRemarkFrontmatterSeoImageRdev = 'childrenMarkdownRemark___frontmatter___seoImage___rdev',
  ChildrenMarkdownRemarkFrontmatterSeoImageIno = 'childrenMarkdownRemark___frontmatter___seoImage___ino',
  ChildrenMarkdownRemarkFrontmatterSeoImageAtimeMs = 'childrenMarkdownRemark___frontmatter___seoImage___atimeMs',
  ChildrenMarkdownRemarkFrontmatterSeoImageMtimeMs = 'childrenMarkdownRemark___frontmatter___seoImage___mtimeMs',
  ChildrenMarkdownRemarkFrontmatterSeoImageCtimeMs = 'childrenMarkdownRemark___frontmatter___seoImage___ctimeMs',
  ChildrenMarkdownRemarkFrontmatterSeoImageAtime = 'childrenMarkdownRemark___frontmatter___seoImage___atime',
  ChildrenMarkdownRemarkFrontmatterSeoImageMtime = 'childrenMarkdownRemark___frontmatter___seoImage___mtime',
  ChildrenMarkdownRemarkFrontmatterSeoImageCtime = 'childrenMarkdownRemark___frontmatter___seoImage___ctime',
  ChildrenMarkdownRemarkFrontmatterSeoImageBirthtime = 'childrenMarkdownRemark___frontmatter___seoImage___birthtime',
  ChildrenMarkdownRemarkFrontmatterSeoImageBirthtimeMs = 'childrenMarkdownRemark___frontmatter___seoImage___birthtimeMs',
  ChildrenMarkdownRemarkFrontmatterSeoImageBlksize = 'childrenMarkdownRemark___frontmatter___seoImage___blksize',
  ChildrenMarkdownRemarkFrontmatterSeoImageBlocks = 'childrenMarkdownRemark___frontmatter___seoImage___blocks',
  ChildrenMarkdownRemarkFrontmatterSeoImagePublicUrl = 'childrenMarkdownRemark___frontmatter___seoImage___publicURL',
  ChildrenMarkdownRemarkFrontmatterSeoImageChildrenImageSharp = 'childrenMarkdownRemark___frontmatter___seoImage___childrenImageSharp',
  ChildrenMarkdownRemarkFrontmatterSeoImageChildrenMarkdownRemark = 'childrenMarkdownRemark___frontmatter___seoImage___childrenMarkdownRemark',
  ChildrenMarkdownRemarkFrontmatterSeoImageId = 'childrenMarkdownRemark___frontmatter___seoImage___id',
  ChildrenMarkdownRemarkFrontmatterSeoImageChildren = 'childrenMarkdownRemark___frontmatter___seoImage___children',
  ChildrenMarkdownRemarkExcerpt = 'childrenMarkdownRemark___excerpt',
  ChildrenMarkdownRemarkRawMarkdownBody = 'childrenMarkdownRemark___rawMarkdownBody',
  ChildrenMarkdownRemarkFileAbsolutePath = 'childrenMarkdownRemark___fileAbsolutePath',
  ChildrenMarkdownRemarkFieldsSlug = 'childrenMarkdownRemark___fields___slug',
  ChildrenMarkdownRemarkFieldsOldSlug = 'childrenMarkdownRemark___fields___oldSlug',
  ChildrenMarkdownRemarkFieldsFolder = 'childrenMarkdownRemark___fields___folder',
  ChildrenMarkdownRemarkFieldsTags = 'childrenMarkdownRemark___fields___tags',
  ChildrenMarkdownRemarkFieldsGithubLink = 'childrenMarkdownRemark___fields___githubLink',
  ChildrenMarkdownRemarkHtml = 'childrenMarkdownRemark___html',
  ChildrenMarkdownRemarkHtmlAst = 'childrenMarkdownRemark___htmlAst',
  ChildrenMarkdownRemarkExcerptAst = 'childrenMarkdownRemark___excerptAst',
  ChildrenMarkdownRemarkHeadings = 'childrenMarkdownRemark___headings',
  ChildrenMarkdownRemarkHeadingsId = 'childrenMarkdownRemark___headings___id',
  ChildrenMarkdownRemarkHeadingsValue = 'childrenMarkdownRemark___headings___value',
  ChildrenMarkdownRemarkHeadingsDepth = 'childrenMarkdownRemark___headings___depth',
  ChildrenMarkdownRemarkTimeToRead = 'childrenMarkdownRemark___timeToRead',
  ChildrenMarkdownRemarkTableOfContents = 'childrenMarkdownRemark___tableOfContents',
  ChildrenMarkdownRemarkWordCountParagraphs = 'childrenMarkdownRemark___wordCount___paragraphs',
  ChildrenMarkdownRemarkWordCountSentences = 'childrenMarkdownRemark___wordCount___sentences',
  ChildrenMarkdownRemarkWordCountWords = 'childrenMarkdownRemark___wordCount___words',
  ChildrenMarkdownRemarkParentId = 'childrenMarkdownRemark___parent___id',
  ChildrenMarkdownRemarkParentParentId = 'childrenMarkdownRemark___parent___parent___id',
  ChildrenMarkdownRemarkParentParentChildren = 'childrenMarkdownRemark___parent___parent___children',
  ChildrenMarkdownRemarkParentChildren = 'childrenMarkdownRemark___parent___children',
  ChildrenMarkdownRemarkParentChildrenId = 'childrenMarkdownRemark___parent___children___id',
  ChildrenMarkdownRemarkParentChildrenChildren = 'childrenMarkdownRemark___parent___children___children',
  ChildrenMarkdownRemarkParentInternalContent = 'childrenMarkdownRemark___parent___internal___content',
  ChildrenMarkdownRemarkParentInternalContentDigest = 'childrenMarkdownRemark___parent___internal___contentDigest',
  ChildrenMarkdownRemarkParentInternalDescription = 'childrenMarkdownRemark___parent___internal___description',
  ChildrenMarkdownRemarkParentInternalFieldOwners = 'childrenMarkdownRemark___parent___internal___fieldOwners',
  ChildrenMarkdownRemarkParentInternalIgnoreType = 'childrenMarkdownRemark___parent___internal___ignoreType',
  ChildrenMarkdownRemarkParentInternalMediaType = 'childrenMarkdownRemark___parent___internal___mediaType',
  ChildrenMarkdownRemarkParentInternalOwner = 'childrenMarkdownRemark___parent___internal___owner',
  ChildrenMarkdownRemarkParentInternalType = 'childrenMarkdownRemark___parent___internal___type',
  ChildrenMarkdownRemarkChildren = 'childrenMarkdownRemark___children',
  ChildrenMarkdownRemarkChildrenId = 'childrenMarkdownRemark___children___id',
  ChildrenMarkdownRemarkChildrenParentId = 'childrenMarkdownRemark___children___parent___id',
  ChildrenMarkdownRemarkChildrenParentChildren = 'childrenMarkdownRemark___children___parent___children',
  ChildrenMarkdownRemarkChildrenChildren = 'childrenMarkdownRemark___children___children',
  ChildrenMarkdownRemarkChildrenChildrenId = 'childrenMarkdownRemark___children___children___id',
  ChildrenMarkdownRemarkChildrenChildrenChildren = 'childrenMarkdownRemark___children___children___children',
  ChildrenMarkdownRemarkChildrenInternalContent = 'childrenMarkdownRemark___children___internal___content',
  ChildrenMarkdownRemarkChildrenInternalContentDigest = 'childrenMarkdownRemark___children___internal___contentDigest',
  ChildrenMarkdownRemarkChildrenInternalDescription = 'childrenMarkdownRemark___children___internal___description',
  ChildrenMarkdownRemarkChildrenInternalFieldOwners = 'childrenMarkdownRemark___children___internal___fieldOwners',
  ChildrenMarkdownRemarkChildrenInternalIgnoreType = 'childrenMarkdownRemark___children___internal___ignoreType',
  ChildrenMarkdownRemarkChildrenInternalMediaType = 'childrenMarkdownRemark___children___internal___mediaType',
  ChildrenMarkdownRemarkChildrenInternalOwner = 'childrenMarkdownRemark___children___internal___owner',
  ChildrenMarkdownRemarkChildrenInternalType = 'childrenMarkdownRemark___children___internal___type',
  ChildrenMarkdownRemarkInternalContent = 'childrenMarkdownRemark___internal___content',
  ChildrenMarkdownRemarkInternalContentDigest = 'childrenMarkdownRemark___internal___contentDigest',
  ChildrenMarkdownRemarkInternalDescription = 'childrenMarkdownRemark___internal___description',
  ChildrenMarkdownRemarkInternalFieldOwners = 'childrenMarkdownRemark___internal___fieldOwners',
  ChildrenMarkdownRemarkInternalIgnoreType = 'childrenMarkdownRemark___internal___ignoreType',
  ChildrenMarkdownRemarkInternalMediaType = 'childrenMarkdownRemark___internal___mediaType',
  ChildrenMarkdownRemarkInternalOwner = 'childrenMarkdownRemark___internal___owner',
  ChildrenMarkdownRemarkInternalType = 'childrenMarkdownRemark___internal___type',
  ChildMarkdownRemarkId = 'childMarkdownRemark___id',
  ChildMarkdownRemarkFrontmatterTitle = 'childMarkdownRemark___frontmatter___title',
  ChildMarkdownRemarkFrontmatterDate = 'childMarkdownRemark___frontmatter___date',
  ChildMarkdownRemarkFrontmatterDescription = 'childMarkdownRemark___frontmatter___description',
  ChildMarkdownRemarkFrontmatterAuthor = 'childMarkdownRemark___frontmatter___author',
  ChildMarkdownRemarkFrontmatterTags = 'childMarkdownRemark___frontmatter___tags',
  ChildMarkdownRemarkFrontmatterDraft = 'childMarkdownRemark___frontmatter___draft',
  ChildMarkdownRemarkFrontmatterHeroSourceInstanceName = 'childMarkdownRemark___frontmatter___hero___sourceInstanceName',
  ChildMarkdownRemarkFrontmatterHeroAbsolutePath = 'childMarkdownRemark___frontmatter___hero___absolutePath',
  ChildMarkdownRemarkFrontmatterHeroRelativePath = 'childMarkdownRemark___frontmatter___hero___relativePath',
  ChildMarkdownRemarkFrontmatterHeroExtension = 'childMarkdownRemark___frontmatter___hero___extension',
  ChildMarkdownRemarkFrontmatterHeroSize = 'childMarkdownRemark___frontmatter___hero___size',
  ChildMarkdownRemarkFrontmatterHeroPrettySize = 'childMarkdownRemark___frontmatter___hero___prettySize',
  ChildMarkdownRemarkFrontmatterHeroModifiedTime = 'childMarkdownRemark___frontmatter___hero___modifiedTime',
  ChildMarkdownRemarkFrontmatterHeroAccessTime = 'childMarkdownRemark___frontmatter___hero___accessTime',
  ChildMarkdownRemarkFrontmatterHeroChangeTime = 'childMarkdownRemark___frontmatter___hero___changeTime',
  ChildMarkdownRemarkFrontmatterHeroBirthTime = 'childMarkdownRemark___frontmatter___hero___birthTime',
  ChildMarkdownRemarkFrontmatterHeroRoot = 'childMarkdownRemark___frontmatter___hero___root',
  ChildMarkdownRemarkFrontmatterHeroDir = 'childMarkdownRemark___frontmatter___hero___dir',
  ChildMarkdownRemarkFrontmatterHeroBase = 'childMarkdownRemark___frontmatter___hero___base',
  ChildMarkdownRemarkFrontmatterHeroExt = 'childMarkdownRemark___frontmatter___hero___ext',
  ChildMarkdownRemarkFrontmatterHeroName = 'childMarkdownRemark___frontmatter___hero___name',
  ChildMarkdownRemarkFrontmatterHeroRelativeDirectory = 'childMarkdownRemark___frontmatter___hero___relativeDirectory',
  ChildMarkdownRemarkFrontmatterHeroDev = 'childMarkdownRemark___frontmatter___hero___dev',
  ChildMarkdownRemarkFrontmatterHeroMode = 'childMarkdownRemark___frontmatter___hero___mode',
  ChildMarkdownRemarkFrontmatterHeroNlink = 'childMarkdownRemark___frontmatter___hero___nlink',
  ChildMarkdownRemarkFrontmatterHeroUid = 'childMarkdownRemark___frontmatter___hero___uid',
  ChildMarkdownRemarkFrontmatterHeroGid = 'childMarkdownRemark___frontmatter___hero___gid',
  ChildMarkdownRemarkFrontmatterHeroRdev = 'childMarkdownRemark___frontmatter___hero___rdev',
  ChildMarkdownRemarkFrontmatterHeroIno = 'childMarkdownRemark___frontmatter___hero___ino',
  ChildMarkdownRemarkFrontmatterHeroAtimeMs = 'childMarkdownRemark___frontmatter___hero___atimeMs',
  ChildMarkdownRemarkFrontmatterHeroMtimeMs = 'childMarkdownRemark___frontmatter___hero___mtimeMs',
  ChildMarkdownRemarkFrontmatterHeroCtimeMs = 'childMarkdownRemark___frontmatter___hero___ctimeMs',
  ChildMarkdownRemarkFrontmatterHeroAtime = 'childMarkdownRemark___frontmatter___hero___atime',
  ChildMarkdownRemarkFrontmatterHeroMtime = 'childMarkdownRemark___frontmatter___hero___mtime',
  ChildMarkdownRemarkFrontmatterHeroCtime = 'childMarkdownRemark___frontmatter___hero___ctime',
  ChildMarkdownRemarkFrontmatterHeroBirthtime = 'childMarkdownRemark___frontmatter___hero___birthtime',
  ChildMarkdownRemarkFrontmatterHeroBirthtimeMs = 'childMarkdownRemark___frontmatter___hero___birthtimeMs',
  ChildMarkdownRemarkFrontmatterHeroBlksize = 'childMarkdownRemark___frontmatter___hero___blksize',
  ChildMarkdownRemarkFrontmatterHeroBlocks = 'childMarkdownRemark___frontmatter___hero___blocks',
  ChildMarkdownRemarkFrontmatterHeroPublicUrl = 'childMarkdownRemark___frontmatter___hero___publicURL',
  ChildMarkdownRemarkFrontmatterHeroChildrenImageSharp = 'childMarkdownRemark___frontmatter___hero___childrenImageSharp',
  ChildMarkdownRemarkFrontmatterHeroChildrenMarkdownRemark = 'childMarkdownRemark___frontmatter___hero___childrenMarkdownRemark',
  ChildMarkdownRemarkFrontmatterHeroId = 'childMarkdownRemark___frontmatter___hero___id',
  ChildMarkdownRemarkFrontmatterHeroChildren = 'childMarkdownRemark___frontmatter___hero___children',
  ChildMarkdownRemarkFrontmatterNavId = 'childMarkdownRemark___frontmatter___navId',
  ChildMarkdownRemarkFrontmatterSeoImageSourceInstanceName = 'childMarkdownRemark___frontmatter___seoImage___sourceInstanceName',
  ChildMarkdownRemarkFrontmatterSeoImageAbsolutePath = 'childMarkdownRemark___frontmatter___seoImage___absolutePath',
  ChildMarkdownRemarkFrontmatterSeoImageRelativePath = 'childMarkdownRemark___frontmatter___seoImage___relativePath',
  ChildMarkdownRemarkFrontmatterSeoImageExtension = 'childMarkdownRemark___frontmatter___seoImage___extension',
  ChildMarkdownRemarkFrontmatterSeoImageSize = 'childMarkdownRemark___frontmatter___seoImage___size',
  ChildMarkdownRemarkFrontmatterSeoImagePrettySize = 'childMarkdownRemark___frontmatter___seoImage___prettySize',
  ChildMarkdownRemarkFrontmatterSeoImageModifiedTime = 'childMarkdownRemark___frontmatter___seoImage___modifiedTime',
  ChildMarkdownRemarkFrontmatterSeoImageAccessTime = 'childMarkdownRemark___frontmatter___seoImage___accessTime',
  ChildMarkdownRemarkFrontmatterSeoImageChangeTime = 'childMarkdownRemark___frontmatter___seoImage___changeTime',
  ChildMarkdownRemarkFrontmatterSeoImageBirthTime = 'childMarkdownRemark___frontmatter___seoImage___birthTime',
  ChildMarkdownRemarkFrontmatterSeoImageRoot = 'childMarkdownRemark___frontmatter___seoImage___root',
  ChildMarkdownRemarkFrontmatterSeoImageDir = 'childMarkdownRemark___frontmatter___seoImage___dir',
  ChildMarkdownRemarkFrontmatterSeoImageBase = 'childMarkdownRemark___frontmatter___seoImage___base',
  ChildMarkdownRemarkFrontmatterSeoImageExt = 'childMarkdownRemark___frontmatter___seoImage___ext',
  ChildMarkdownRemarkFrontmatterSeoImageName = 'childMarkdownRemark___frontmatter___seoImage___name',
  ChildMarkdownRemarkFrontmatterSeoImageRelativeDirectory = 'childMarkdownRemark___frontmatter___seoImage___relativeDirectory',
  ChildMarkdownRemarkFrontmatterSeoImageDev = 'childMarkdownRemark___frontmatter___seoImage___dev',
  ChildMarkdownRemarkFrontmatterSeoImageMode = 'childMarkdownRemark___frontmatter___seoImage___mode',
  ChildMarkdownRemarkFrontmatterSeoImageNlink = 'childMarkdownRemark___frontmatter___seoImage___nlink',
  ChildMarkdownRemarkFrontmatterSeoImageUid = 'childMarkdownRemark___frontmatter___seoImage___uid',
  ChildMarkdownRemarkFrontmatterSeoImageGid = 'childMarkdownRemark___frontmatter___seoImage___gid',
  ChildMarkdownRemarkFrontmatterSeoImageRdev = 'childMarkdownRemark___frontmatter___seoImage___rdev',
  ChildMarkdownRemarkFrontmatterSeoImageIno = 'childMarkdownRemark___frontmatter___seoImage___ino',
  ChildMarkdownRemarkFrontmatterSeoImageAtimeMs = 'childMarkdownRemark___frontmatter___seoImage___atimeMs',
  ChildMarkdownRemarkFrontmatterSeoImageMtimeMs = 'childMarkdownRemark___frontmatter___seoImage___mtimeMs',
  ChildMarkdownRemarkFrontmatterSeoImageCtimeMs = 'childMarkdownRemark___frontmatter___seoImage___ctimeMs',
  ChildMarkdownRemarkFrontmatterSeoImageAtime = 'childMarkdownRemark___frontmatter___seoImage___atime',
  ChildMarkdownRemarkFrontmatterSeoImageMtime = 'childMarkdownRemark___frontmatter___seoImage___mtime',
  ChildMarkdownRemarkFrontmatterSeoImageCtime = 'childMarkdownRemark___frontmatter___seoImage___ctime',
  ChildMarkdownRemarkFrontmatterSeoImageBirthtime = 'childMarkdownRemark___frontmatter___seoImage___birthtime',
  ChildMarkdownRemarkFrontmatterSeoImageBirthtimeMs = 'childMarkdownRemark___frontmatter___seoImage___birthtimeMs',
  ChildMarkdownRemarkFrontmatterSeoImageBlksize = 'childMarkdownRemark___frontmatter___seoImage___blksize',
  ChildMarkdownRemarkFrontmatterSeoImageBlocks = 'childMarkdownRemark___frontmatter___seoImage___blocks',
  ChildMarkdownRemarkFrontmatterSeoImagePublicUrl = 'childMarkdownRemark___frontmatter___seoImage___publicURL',
  ChildMarkdownRemarkFrontmatterSeoImageChildrenImageSharp = 'childMarkdownRemark___frontmatter___seoImage___childrenImageSharp',
  ChildMarkdownRemarkFrontmatterSeoImageChildrenMarkdownRemark = 'childMarkdownRemark___frontmatter___seoImage___childrenMarkdownRemark',
  ChildMarkdownRemarkFrontmatterSeoImageId = 'childMarkdownRemark___frontmatter___seoImage___id',
  ChildMarkdownRemarkFrontmatterSeoImageChildren = 'childMarkdownRemark___frontmatter___seoImage___children',
  ChildMarkdownRemarkExcerpt = 'childMarkdownRemark___excerpt',
  ChildMarkdownRemarkRawMarkdownBody = 'childMarkdownRemark___rawMarkdownBody',
  ChildMarkdownRemarkFileAbsolutePath = 'childMarkdownRemark___fileAbsolutePath',
  ChildMarkdownRemarkFieldsSlug = 'childMarkdownRemark___fields___slug',
  ChildMarkdownRemarkFieldsOldSlug = 'childMarkdownRemark___fields___oldSlug',
  ChildMarkdownRemarkFieldsFolder = 'childMarkdownRemark___fields___folder',
  ChildMarkdownRemarkFieldsTags = 'childMarkdownRemark___fields___tags',
  ChildMarkdownRemarkFieldsGithubLink = 'childMarkdownRemark___fields___githubLink',
  ChildMarkdownRemarkHtml = 'childMarkdownRemark___html',
  ChildMarkdownRemarkHtmlAst = 'childMarkdownRemark___htmlAst',
  ChildMarkdownRemarkExcerptAst = 'childMarkdownRemark___excerptAst',
  ChildMarkdownRemarkHeadings = 'childMarkdownRemark___headings',
  ChildMarkdownRemarkHeadingsId = 'childMarkdownRemark___headings___id',
  ChildMarkdownRemarkHeadingsValue = 'childMarkdownRemark___headings___value',
  ChildMarkdownRemarkHeadingsDepth = 'childMarkdownRemark___headings___depth',
  ChildMarkdownRemarkTimeToRead = 'childMarkdownRemark___timeToRead',
  ChildMarkdownRemarkTableOfContents = 'childMarkdownRemark___tableOfContents',
  ChildMarkdownRemarkWordCountParagraphs = 'childMarkdownRemark___wordCount___paragraphs',
  ChildMarkdownRemarkWordCountSentences = 'childMarkdownRemark___wordCount___sentences',
  ChildMarkdownRemarkWordCountWords = 'childMarkdownRemark___wordCount___words',
  ChildMarkdownRemarkParentId = 'childMarkdownRemark___parent___id',
  ChildMarkdownRemarkParentParentId = 'childMarkdownRemark___parent___parent___id',
  ChildMarkdownRemarkParentParentChildren = 'childMarkdownRemark___parent___parent___children',
  ChildMarkdownRemarkParentChildren = 'childMarkdownRemark___parent___children',
  ChildMarkdownRemarkParentChildrenId = 'childMarkdownRemark___parent___children___id',
  ChildMarkdownRemarkParentChildrenChildren = 'childMarkdownRemark___parent___children___children',
  ChildMarkdownRemarkParentInternalContent = 'childMarkdownRemark___parent___internal___content',
  ChildMarkdownRemarkParentInternalContentDigest = 'childMarkdownRemark___parent___internal___contentDigest',
  ChildMarkdownRemarkParentInternalDescription = 'childMarkdownRemark___parent___internal___description',
  ChildMarkdownRemarkParentInternalFieldOwners = 'childMarkdownRemark___parent___internal___fieldOwners',
  ChildMarkdownRemarkParentInternalIgnoreType = 'childMarkdownRemark___parent___internal___ignoreType',
  ChildMarkdownRemarkParentInternalMediaType = 'childMarkdownRemark___parent___internal___mediaType',
  ChildMarkdownRemarkParentInternalOwner = 'childMarkdownRemark___parent___internal___owner',
  ChildMarkdownRemarkParentInternalType = 'childMarkdownRemark___parent___internal___type',
  ChildMarkdownRemarkChildren = 'childMarkdownRemark___children',
  ChildMarkdownRemarkChildrenId = 'childMarkdownRemark___children___id',
  ChildMarkdownRemarkChildrenParentId = 'childMarkdownRemark___children___parent___id',
  ChildMarkdownRemarkChildrenParentChildren = 'childMarkdownRemark___children___parent___children',
  ChildMarkdownRemarkChildrenChildren = 'childMarkdownRemark___children___children',
  ChildMarkdownRemarkChildrenChildrenId = 'childMarkdownRemark___children___children___id',
  ChildMarkdownRemarkChildrenChildrenChildren = 'childMarkdownRemark___children___children___children',
  ChildMarkdownRemarkChildrenInternalContent = 'childMarkdownRemark___children___internal___content',
  ChildMarkdownRemarkChildrenInternalContentDigest = 'childMarkdownRemark___children___internal___contentDigest',
  ChildMarkdownRemarkChildrenInternalDescription = 'childMarkdownRemark___children___internal___description',
  ChildMarkdownRemarkChildrenInternalFieldOwners = 'childMarkdownRemark___children___internal___fieldOwners',
  ChildMarkdownRemarkChildrenInternalIgnoreType = 'childMarkdownRemark___children___internal___ignoreType',
  ChildMarkdownRemarkChildrenInternalMediaType = 'childMarkdownRemark___children___internal___mediaType',
  ChildMarkdownRemarkChildrenInternalOwner = 'childMarkdownRemark___children___internal___owner',
  ChildMarkdownRemarkChildrenInternalType = 'childMarkdownRemark___children___internal___type',
  ChildMarkdownRemarkInternalContent = 'childMarkdownRemark___internal___content',
  ChildMarkdownRemarkInternalContentDigest = 'childMarkdownRemark___internal___contentDigest',
  ChildMarkdownRemarkInternalDescription = 'childMarkdownRemark___internal___description',
  ChildMarkdownRemarkInternalFieldOwners = 'childMarkdownRemark___internal___fieldOwners',
  ChildMarkdownRemarkInternalIgnoreType = 'childMarkdownRemark___internal___ignoreType',
  ChildMarkdownRemarkInternalMediaType = 'childMarkdownRemark___internal___mediaType',
  ChildMarkdownRemarkInternalOwner = 'childMarkdownRemark___internal___owner',
  ChildMarkdownRemarkInternalType = 'childMarkdownRemark___internal___type',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type FileFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  gid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  publicURL?: Maybe<StringQueryOperatorInput>
  childrenImageSharp?: Maybe<ImageSharpFilterListInput>
  childImageSharp?: Maybe<ImageSharpFilterInput>
  childrenMarkdownRemark?: Maybe<MarkdownRemarkFilterListInput>
  childMarkdownRemark?: Maybe<MarkdownRemarkFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type FileGroupConnection = {
  __typename?: 'FileGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<FileEdge>
  nodes: Array<File>
  pageInfo: PageInfo
  field: Scalars['String']
  fieldValue?: Maybe<Scalars['String']>
}

export type FileSortInput = {
  fields?: Maybe<Array<Maybe<FileFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type FloatQueryOperatorInput = {
  eq?: Maybe<Scalars['Float']>
  ne?: Maybe<Scalars['Float']>
  gt?: Maybe<Scalars['Float']>
  gte?: Maybe<Scalars['Float']>
  lt?: Maybe<Scalars['Float']>
  lte?: Maybe<Scalars['Float']>
  in?: Maybe<Array<Maybe<Scalars['Float']>>>
  nin?: Maybe<Array<Maybe<Scalars['Float']>>>
}

export enum ImageCropFocus {
  Center = 'CENTER',
  North = 'NORTH',
  Northeast = 'NORTHEAST',
  East = 'EAST',
  Southeast = 'SOUTHEAST',
  South = 'SOUTH',
  Southwest = 'SOUTHWEST',
  West = 'WEST',
  Northwest = 'NORTHWEST',
  Entropy = 'ENTROPY',
  Attention = 'ATTENTION'
}

export enum ImageFit {
  Cover = 'COVER',
  Contain = 'CONTAIN',
  Fill = 'FILL',
  Inside = 'INSIDE',
  Outside = 'OUTSIDE'
}

export enum ImageFormat {
  NoChange = 'NO_CHANGE',
  Auto = 'AUTO',
  Jpg = 'JPG',
  Png = 'PNG',
  Webp = 'WEBP',
  Avif = 'AVIF'
}

export enum ImageLayout {
  Fixed = 'FIXED',
  FullWidth = 'FULL_WIDTH',
  Constrained = 'CONSTRAINED'
}

export enum ImagePlaceholder {
  DominantColor = 'DOMINANT_COLOR',
  TracedSvg = 'TRACED_SVG',
  Blurred = 'BLURRED',
  None = 'NONE'
}

export type ImageSharp = Node & {
  __typename?: 'ImageSharp'
  fixed?: Maybe<ImageSharpFixed>
  fluid?: Maybe<ImageSharpFluid>
  gatsbyImageData: Scalars['JSON']
  original?: Maybe<ImageSharpOriginal>
  resize?: Maybe<ImageSharpResize>
  id: Scalars['ID']
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type ImageSharpFixedArgs = {
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  base64Width?: Maybe<Scalars['Int']>
  jpegProgressive?: Maybe<Scalars['Boolean']>
  pngCompressionSpeed?: Maybe<Scalars['Int']>
  grayscale?: Maybe<Scalars['Boolean']>
  duotone?: Maybe<DuotoneGradient>
  traceSVG?: Maybe<Potrace>
  quality?: Maybe<Scalars['Int']>
  jpegQuality?: Maybe<Scalars['Int']>
  pngQuality?: Maybe<Scalars['Int']>
  webpQuality?: Maybe<Scalars['Int']>
  toFormat?: Maybe<ImageFormat>
  toFormatBase64?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars['String']>
  rotate?: Maybe<Scalars['Int']>
  trim?: Maybe<Scalars['Float']>
}

export type ImageSharpFluidArgs = {
  maxWidth?: Maybe<Scalars['Int']>
  maxHeight?: Maybe<Scalars['Int']>
  base64Width?: Maybe<Scalars['Int']>
  grayscale?: Maybe<Scalars['Boolean']>
  jpegProgressive?: Maybe<Scalars['Boolean']>
  pngCompressionSpeed?: Maybe<Scalars['Int']>
  duotone?: Maybe<DuotoneGradient>
  traceSVG?: Maybe<Potrace>
  quality?: Maybe<Scalars['Int']>
  jpegQuality?: Maybe<Scalars['Int']>
  pngQuality?: Maybe<Scalars['Int']>
  webpQuality?: Maybe<Scalars['Int']>
  toFormat?: Maybe<ImageFormat>
  toFormatBase64?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars['String']>
  rotate?: Maybe<Scalars['Int']>
  trim?: Maybe<Scalars['Float']>
  sizes?: Maybe<Scalars['String']>
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type ImageSharpGatsbyImageDataArgs = {
  layout?: Maybe<ImageLayout>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  aspectRatio?: Maybe<Scalars['Float']>
  placeholder?: Maybe<ImagePlaceholder>
  blurredOptions?: Maybe<BlurredOptions>
  tracedSVGOptions?: Maybe<Potrace>
  formats?: Maybe<Array<Maybe<ImageFormat>>>
  outputPixelDensities?: Maybe<Array<Maybe<Scalars['Float']>>>
  breakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>
  sizes?: Maybe<Scalars['String']>
  quality?: Maybe<Scalars['Int']>
  jpgOptions?: Maybe<JpgOptions>
  pngOptions?: Maybe<PngOptions>
  webpOptions?: Maybe<WebPOptions>
  avifOptions?: Maybe<AvifOptions>
  transformOptions?: Maybe<TransformOptions>
  backgroundColor?: Maybe<Scalars['String']>
}

export type ImageSharpResizeArgs = {
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  quality?: Maybe<Scalars['Int']>
  jpegQuality?: Maybe<Scalars['Int']>
  pngQuality?: Maybe<Scalars['Int']>
  webpQuality?: Maybe<Scalars['Int']>
  jpegProgressive?: Maybe<Scalars['Boolean']>
  pngCompressionLevel?: Maybe<Scalars['Int']>
  pngCompressionSpeed?: Maybe<Scalars['Int']>
  grayscale?: Maybe<Scalars['Boolean']>
  duotone?: Maybe<DuotoneGradient>
  base64?: Maybe<Scalars['Boolean']>
  traceSVG?: Maybe<Potrace>
  toFormat?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars['String']>
  rotate?: Maybe<Scalars['Int']>
  trim?: Maybe<Scalars['Float']>
}

export type ImageSharpConnection = {
  __typename?: 'ImageSharpConnection'
  totalCount: Scalars['Int']
  edges: Array<ImageSharpEdge>
  nodes: Array<ImageSharp>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  group: Array<ImageSharpGroupConnection>
}

export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  field: ImageSharpFieldsEnum
}

export type ImageSharpEdge = {
  __typename?: 'ImageSharpEdge'
  next?: Maybe<ImageSharp>
  node: ImageSharp
  previous?: Maybe<ImageSharp>
}

export enum ImageSharpFieldsEnum {
  FixedBase64 = 'fixed___base64',
  FixedTracedSvg = 'fixed___tracedSVG',
  FixedAspectRatio = 'fixed___aspectRatio',
  FixedWidth = 'fixed___width',
  FixedHeight = 'fixed___height',
  FixedSrc = 'fixed___src',
  FixedSrcSet = 'fixed___srcSet',
  FixedSrcWebp = 'fixed___srcWebp',
  FixedSrcSetWebp = 'fixed___srcSetWebp',
  FixedOriginalName = 'fixed___originalName',
  FluidBase64 = 'fluid___base64',
  FluidTracedSvg = 'fluid___tracedSVG',
  FluidAspectRatio = 'fluid___aspectRatio',
  FluidSrc = 'fluid___src',
  FluidSrcSet = 'fluid___srcSet',
  FluidSrcWebp = 'fluid___srcWebp',
  FluidSrcSetWebp = 'fluid___srcSetWebp',
  FluidSizes = 'fluid___sizes',
  FluidOriginalImg = 'fluid___originalImg',
  FluidOriginalName = 'fluid___originalName',
  FluidPresentationWidth = 'fluid___presentationWidth',
  FluidPresentationHeight = 'fluid___presentationHeight',
  GatsbyImageData = 'gatsbyImageData',
  OriginalWidth = 'original___width',
  OriginalHeight = 'original___height',
  OriginalSrc = 'original___src',
  ResizeSrc = 'resize___src',
  ResizeTracedSvg = 'resize___tracedSVG',
  ResizeWidth = 'resize___width',
  ResizeHeight = 'resize___height',
  ResizeAspectRatio = 'resize___aspectRatio',
  ResizeOriginalName = 'resize___originalName',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type ImageSharpFilterInput = {
  fixed?: Maybe<ImageSharpFixedFilterInput>
  fluid?: Maybe<ImageSharpFluidFilterInput>
  gatsbyImageData?: Maybe<JsonQueryOperatorInput>
  original?: Maybe<ImageSharpOriginalFilterInput>
  resize?: Maybe<ImageSharpResizeFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type ImageSharpFilterListInput = {
  elemMatch?: Maybe<ImageSharpFilterInput>
}

export type ImageSharpFixed = {
  __typename?: 'ImageSharpFixed'
  base64?: Maybe<Scalars['String']>
  tracedSVG?: Maybe<Scalars['String']>
  aspectRatio?: Maybe<Scalars['Float']>
  width: Scalars['Float']
  height: Scalars['Float']
  src: Scalars['String']
  srcSet: Scalars['String']
  srcWebp?: Maybe<Scalars['String']>
  srcSetWebp?: Maybe<Scalars['String']>
  originalName?: Maybe<Scalars['String']>
}

export type ImageSharpFixedFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>
  tracedSVG?: Maybe<StringQueryOperatorInput>
  aspectRatio?: Maybe<FloatQueryOperatorInput>
  width?: Maybe<FloatQueryOperatorInput>
  height?: Maybe<FloatQueryOperatorInput>
  src?: Maybe<StringQueryOperatorInput>
  srcSet?: Maybe<StringQueryOperatorInput>
  srcWebp?: Maybe<StringQueryOperatorInput>
  srcSetWebp?: Maybe<StringQueryOperatorInput>
  originalName?: Maybe<StringQueryOperatorInput>
}

export type ImageSharpFluid = {
  __typename?: 'ImageSharpFluid'
  base64?: Maybe<Scalars['String']>
  tracedSVG?: Maybe<Scalars['String']>
  aspectRatio: Scalars['Float']
  src: Scalars['String']
  srcSet: Scalars['String']
  srcWebp?: Maybe<Scalars['String']>
  srcSetWebp?: Maybe<Scalars['String']>
  sizes: Scalars['String']
  originalImg?: Maybe<Scalars['String']>
  originalName?: Maybe<Scalars['String']>
  presentationWidth: Scalars['Int']
  presentationHeight: Scalars['Int']
}

export type ImageSharpFluidFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>
  tracedSVG?: Maybe<StringQueryOperatorInput>
  aspectRatio?: Maybe<FloatQueryOperatorInput>
  src?: Maybe<StringQueryOperatorInput>
  srcSet?: Maybe<StringQueryOperatorInput>
  srcWebp?: Maybe<StringQueryOperatorInput>
  srcSetWebp?: Maybe<StringQueryOperatorInput>
  sizes?: Maybe<StringQueryOperatorInput>
  originalImg?: Maybe<StringQueryOperatorInput>
  originalName?: Maybe<StringQueryOperatorInput>
  presentationWidth?: Maybe<IntQueryOperatorInput>
  presentationHeight?: Maybe<IntQueryOperatorInput>
}

export type ImageSharpGroupConnection = {
  __typename?: 'ImageSharpGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<ImageSharpEdge>
  nodes: Array<ImageSharp>
  pageInfo: PageInfo
  field: Scalars['String']
  fieldValue?: Maybe<Scalars['String']>
}

export type ImageSharpOriginal = {
  __typename?: 'ImageSharpOriginal'
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  src?: Maybe<Scalars['String']>
}

export type ImageSharpOriginalFilterInput = {
  width?: Maybe<FloatQueryOperatorInput>
  height?: Maybe<FloatQueryOperatorInput>
  src?: Maybe<StringQueryOperatorInput>
}

export type ImageSharpResize = {
  __typename?: 'ImageSharpResize'
  src?: Maybe<Scalars['String']>
  tracedSVG?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  aspectRatio?: Maybe<Scalars['Float']>
  originalName?: Maybe<Scalars['String']>
}

export type ImageSharpResizeFilterInput = {
  src?: Maybe<StringQueryOperatorInput>
  tracedSVG?: Maybe<StringQueryOperatorInput>
  width?: Maybe<IntQueryOperatorInput>
  height?: Maybe<IntQueryOperatorInput>
  aspectRatio?: Maybe<FloatQueryOperatorInput>
  originalName?: Maybe<StringQueryOperatorInput>
}

export type ImageSharpSortInput = {
  fields?: Maybe<Array<Maybe<ImageSharpFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type IntQueryOperatorInput = {
  eq?: Maybe<Scalars['Int']>
  ne?: Maybe<Scalars['Int']>
  gt?: Maybe<Scalars['Int']>
  gte?: Maybe<Scalars['Int']>
  lt?: Maybe<Scalars['Int']>
  lte?: Maybe<Scalars['Int']>
  in?: Maybe<Array<Maybe<Scalars['Int']>>>
  nin?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type Internal = {
  __typename?: 'Internal'
  content?: Maybe<Scalars['String']>
  contentDigest: Scalars['String']
  description?: Maybe<Scalars['String']>
  fieldOwners?: Maybe<Array<Maybe<Scalars['String']>>>
  ignoreType?: Maybe<Scalars['Boolean']>
  mediaType?: Maybe<Scalars['String']>
  owner: Scalars['String']
  type: Scalars['String']
}

export type InternalFilterInput = {
  content?: Maybe<StringQueryOperatorInput>
  contentDigest?: Maybe<StringQueryOperatorInput>
  description?: Maybe<StringQueryOperatorInput>
  fieldOwners?: Maybe<StringQueryOperatorInput>
  ignoreType?: Maybe<BooleanQueryOperatorInput>
  mediaType?: Maybe<StringQueryOperatorInput>
  owner?: Maybe<StringQueryOperatorInput>
  type?: Maybe<StringQueryOperatorInput>
}

export type JpgOptions = {
  quality?: Maybe<Scalars['Int']>
  progressive?: Maybe<Scalars['Boolean']>
}

export type JsonQueryOperatorInput = {
  eq?: Maybe<Scalars['JSON']>
  ne?: Maybe<Scalars['JSON']>
  in?: Maybe<Array<Maybe<Scalars['JSON']>>>
  nin?: Maybe<Array<Maybe<Scalars['JSON']>>>
  regex?: Maybe<Scalars['JSON']>
  glob?: Maybe<Scalars['JSON']>
}

export enum MarkdownExcerptFormats {
  Plain = 'PLAIN',
  Html = 'HTML',
  Markdown = 'MARKDOWN'
}

export type MarkdownHeading = {
  __typename?: 'MarkdownHeading'
  id?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  depth?: Maybe<Scalars['Int']>
}

export type MarkdownHeadingFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  value?: Maybe<StringQueryOperatorInput>
  depth?: Maybe<IntQueryOperatorInput>
}

export type MarkdownHeadingFilterListInput = {
  elemMatch?: Maybe<MarkdownHeadingFilterInput>
}

export enum MarkdownHeadingLevels {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6'
}

export type MarkdownRemark = Node & {
  __typename?: 'MarkdownRemark'
  id: Scalars['ID']
  frontmatter?: Maybe<MarkdownRemarkFrontmatter>
  excerpt?: Maybe<Scalars['String']>
  rawMarkdownBody?: Maybe<Scalars['String']>
  fileAbsolutePath?: Maybe<Scalars['String']>
  fields?: Maybe<MarkdownRemarkFields>
  html?: Maybe<Scalars['String']>
  htmlAst?: Maybe<Scalars['JSON']>
  excerptAst?: Maybe<Scalars['JSON']>
  headings?: Maybe<Array<Maybe<MarkdownHeading>>>
  timeToRead?: Maybe<Scalars['Int']>
  tableOfContents?: Maybe<Scalars['String']>
  wordCount?: Maybe<MarkdownWordCount>
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type MarkdownRemarkExcerptArgs = {
  pruneLength?: Maybe<Scalars['Int']>
  truncate?: Maybe<Scalars['Boolean']>
  format?: Maybe<MarkdownExcerptFormats>
}

export type MarkdownRemarkExcerptAstArgs = {
  pruneLength?: Maybe<Scalars['Int']>
  truncate?: Maybe<Scalars['Boolean']>
}

export type MarkdownRemarkHeadingsArgs = {
  depth?: Maybe<MarkdownHeadingLevels>
}

export type MarkdownRemarkTableOfContentsArgs = {
  absolute?: Maybe<Scalars['Boolean']>
  pathToSlugField?: Maybe<Scalars['String']>
  maxDepth?: Maybe<Scalars['Int']>
  heading?: Maybe<Scalars['String']>
}

export type MarkdownRemarkConnection = {
  __typename?: 'MarkdownRemarkConnection'
  totalCount: Scalars['Int']
  edges: Array<MarkdownRemarkEdge>
  nodes: Array<MarkdownRemark>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  group: Array<MarkdownRemarkGroupConnection>
}

export type MarkdownRemarkConnectionDistinctArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkEdge = {
  __typename?: 'MarkdownRemarkEdge'
  next?: Maybe<MarkdownRemark>
  node: MarkdownRemark
  previous?: Maybe<MarkdownRemark>
}

export type MarkdownRemarkFields = {
  __typename?: 'MarkdownRemarkFields'
  slug?: Maybe<Scalars['String']>
  oldSlug?: Maybe<Scalars['String']>
  folder?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  githubLink?: Maybe<Scalars['String']>
}

export enum MarkdownRemarkFieldsEnum {
  Id = 'id',
  FrontmatterTitle = 'frontmatter___title',
  FrontmatterDate = 'frontmatter___date',
  FrontmatterDescription = 'frontmatter___description',
  FrontmatterAuthor = 'frontmatter___author',
  FrontmatterTags = 'frontmatter___tags',
  FrontmatterDraft = 'frontmatter___draft',
  FrontmatterHeroSourceInstanceName = 'frontmatter___hero___sourceInstanceName',
  FrontmatterHeroAbsolutePath = 'frontmatter___hero___absolutePath',
  FrontmatterHeroRelativePath = 'frontmatter___hero___relativePath',
  FrontmatterHeroExtension = 'frontmatter___hero___extension',
  FrontmatterHeroSize = 'frontmatter___hero___size',
  FrontmatterHeroPrettySize = 'frontmatter___hero___prettySize',
  FrontmatterHeroModifiedTime = 'frontmatter___hero___modifiedTime',
  FrontmatterHeroAccessTime = 'frontmatter___hero___accessTime',
  FrontmatterHeroChangeTime = 'frontmatter___hero___changeTime',
  FrontmatterHeroBirthTime = 'frontmatter___hero___birthTime',
  FrontmatterHeroRoot = 'frontmatter___hero___root',
  FrontmatterHeroDir = 'frontmatter___hero___dir',
  FrontmatterHeroBase = 'frontmatter___hero___base',
  FrontmatterHeroExt = 'frontmatter___hero___ext',
  FrontmatterHeroName = 'frontmatter___hero___name',
  FrontmatterHeroRelativeDirectory = 'frontmatter___hero___relativeDirectory',
  FrontmatterHeroDev = 'frontmatter___hero___dev',
  FrontmatterHeroMode = 'frontmatter___hero___mode',
  FrontmatterHeroNlink = 'frontmatter___hero___nlink',
  FrontmatterHeroUid = 'frontmatter___hero___uid',
  FrontmatterHeroGid = 'frontmatter___hero___gid',
  FrontmatterHeroRdev = 'frontmatter___hero___rdev',
  FrontmatterHeroIno = 'frontmatter___hero___ino',
  FrontmatterHeroAtimeMs = 'frontmatter___hero___atimeMs',
  FrontmatterHeroMtimeMs = 'frontmatter___hero___mtimeMs',
  FrontmatterHeroCtimeMs = 'frontmatter___hero___ctimeMs',
  FrontmatterHeroAtime = 'frontmatter___hero___atime',
  FrontmatterHeroMtime = 'frontmatter___hero___mtime',
  FrontmatterHeroCtime = 'frontmatter___hero___ctime',
  FrontmatterHeroBirthtime = 'frontmatter___hero___birthtime',
  FrontmatterHeroBirthtimeMs = 'frontmatter___hero___birthtimeMs',
  FrontmatterHeroBlksize = 'frontmatter___hero___blksize',
  FrontmatterHeroBlocks = 'frontmatter___hero___blocks',
  FrontmatterHeroPublicUrl = 'frontmatter___hero___publicURL',
  FrontmatterHeroChildrenImageSharp = 'frontmatter___hero___childrenImageSharp',
  FrontmatterHeroChildrenImageSharpGatsbyImageData = 'frontmatter___hero___childrenImageSharp___gatsbyImageData',
  FrontmatterHeroChildrenImageSharpId = 'frontmatter___hero___childrenImageSharp___id',
  FrontmatterHeroChildrenImageSharpChildren = 'frontmatter___hero___childrenImageSharp___children',
  FrontmatterHeroChildImageSharpGatsbyImageData = 'frontmatter___hero___childImageSharp___gatsbyImageData',
  FrontmatterHeroChildImageSharpId = 'frontmatter___hero___childImageSharp___id',
  FrontmatterHeroChildImageSharpChildren = 'frontmatter___hero___childImageSharp___children',
  FrontmatterHeroChildrenMarkdownRemark = 'frontmatter___hero___childrenMarkdownRemark',
  FrontmatterHeroChildrenMarkdownRemarkId = 'frontmatter___hero___childrenMarkdownRemark___id',
  FrontmatterHeroChildrenMarkdownRemarkExcerpt = 'frontmatter___hero___childrenMarkdownRemark___excerpt',
  FrontmatterHeroChildrenMarkdownRemarkRawMarkdownBody = 'frontmatter___hero___childrenMarkdownRemark___rawMarkdownBody',
  FrontmatterHeroChildrenMarkdownRemarkFileAbsolutePath = 'frontmatter___hero___childrenMarkdownRemark___fileAbsolutePath',
  FrontmatterHeroChildrenMarkdownRemarkHtml = 'frontmatter___hero___childrenMarkdownRemark___html',
  FrontmatterHeroChildrenMarkdownRemarkHtmlAst = 'frontmatter___hero___childrenMarkdownRemark___htmlAst',
  FrontmatterHeroChildrenMarkdownRemarkExcerptAst = 'frontmatter___hero___childrenMarkdownRemark___excerptAst',
  FrontmatterHeroChildrenMarkdownRemarkHeadings = 'frontmatter___hero___childrenMarkdownRemark___headings',
  FrontmatterHeroChildrenMarkdownRemarkTimeToRead = 'frontmatter___hero___childrenMarkdownRemark___timeToRead',
  FrontmatterHeroChildrenMarkdownRemarkTableOfContents = 'frontmatter___hero___childrenMarkdownRemark___tableOfContents',
  FrontmatterHeroChildrenMarkdownRemarkChildren = 'frontmatter___hero___childrenMarkdownRemark___children',
  FrontmatterHeroChildMarkdownRemarkId = 'frontmatter___hero___childMarkdownRemark___id',
  FrontmatterHeroChildMarkdownRemarkExcerpt = 'frontmatter___hero___childMarkdownRemark___excerpt',
  FrontmatterHeroChildMarkdownRemarkRawMarkdownBody = 'frontmatter___hero___childMarkdownRemark___rawMarkdownBody',
  FrontmatterHeroChildMarkdownRemarkFileAbsolutePath = 'frontmatter___hero___childMarkdownRemark___fileAbsolutePath',
  FrontmatterHeroChildMarkdownRemarkHtml = 'frontmatter___hero___childMarkdownRemark___html',
  FrontmatterHeroChildMarkdownRemarkHtmlAst = 'frontmatter___hero___childMarkdownRemark___htmlAst',
  FrontmatterHeroChildMarkdownRemarkExcerptAst = 'frontmatter___hero___childMarkdownRemark___excerptAst',
  FrontmatterHeroChildMarkdownRemarkHeadings = 'frontmatter___hero___childMarkdownRemark___headings',
  FrontmatterHeroChildMarkdownRemarkTimeToRead = 'frontmatter___hero___childMarkdownRemark___timeToRead',
  FrontmatterHeroChildMarkdownRemarkTableOfContents = 'frontmatter___hero___childMarkdownRemark___tableOfContents',
  FrontmatterHeroChildMarkdownRemarkChildren = 'frontmatter___hero___childMarkdownRemark___children',
  FrontmatterHeroId = 'frontmatter___hero___id',
  FrontmatterHeroParentId = 'frontmatter___hero___parent___id',
  FrontmatterHeroParentChildren = 'frontmatter___hero___parent___children',
  FrontmatterHeroChildren = 'frontmatter___hero___children',
  FrontmatterHeroChildrenId = 'frontmatter___hero___children___id',
  FrontmatterHeroChildrenChildren = 'frontmatter___hero___children___children',
  FrontmatterHeroInternalContent = 'frontmatter___hero___internal___content',
  FrontmatterHeroInternalContentDigest = 'frontmatter___hero___internal___contentDigest',
  FrontmatterHeroInternalDescription = 'frontmatter___hero___internal___description',
  FrontmatterHeroInternalFieldOwners = 'frontmatter___hero___internal___fieldOwners',
  FrontmatterHeroInternalIgnoreType = 'frontmatter___hero___internal___ignoreType',
  FrontmatterHeroInternalMediaType = 'frontmatter___hero___internal___mediaType',
  FrontmatterHeroInternalOwner = 'frontmatter___hero___internal___owner',
  FrontmatterHeroInternalType = 'frontmatter___hero___internal___type',
  FrontmatterNavId = 'frontmatter___navId',
  FrontmatterSeoImageSourceInstanceName = 'frontmatter___seoImage___sourceInstanceName',
  FrontmatterSeoImageAbsolutePath = 'frontmatter___seoImage___absolutePath',
  FrontmatterSeoImageRelativePath = 'frontmatter___seoImage___relativePath',
  FrontmatterSeoImageExtension = 'frontmatter___seoImage___extension',
  FrontmatterSeoImageSize = 'frontmatter___seoImage___size',
  FrontmatterSeoImagePrettySize = 'frontmatter___seoImage___prettySize',
  FrontmatterSeoImageModifiedTime = 'frontmatter___seoImage___modifiedTime',
  FrontmatterSeoImageAccessTime = 'frontmatter___seoImage___accessTime',
  FrontmatterSeoImageChangeTime = 'frontmatter___seoImage___changeTime',
  FrontmatterSeoImageBirthTime = 'frontmatter___seoImage___birthTime',
  FrontmatterSeoImageRoot = 'frontmatter___seoImage___root',
  FrontmatterSeoImageDir = 'frontmatter___seoImage___dir',
  FrontmatterSeoImageBase = 'frontmatter___seoImage___base',
  FrontmatterSeoImageExt = 'frontmatter___seoImage___ext',
  FrontmatterSeoImageName = 'frontmatter___seoImage___name',
  FrontmatterSeoImageRelativeDirectory = 'frontmatter___seoImage___relativeDirectory',
  FrontmatterSeoImageDev = 'frontmatter___seoImage___dev',
  FrontmatterSeoImageMode = 'frontmatter___seoImage___mode',
  FrontmatterSeoImageNlink = 'frontmatter___seoImage___nlink',
  FrontmatterSeoImageUid = 'frontmatter___seoImage___uid',
  FrontmatterSeoImageGid = 'frontmatter___seoImage___gid',
  FrontmatterSeoImageRdev = 'frontmatter___seoImage___rdev',
  FrontmatterSeoImageIno = 'frontmatter___seoImage___ino',
  FrontmatterSeoImageAtimeMs = 'frontmatter___seoImage___atimeMs',
  FrontmatterSeoImageMtimeMs = 'frontmatter___seoImage___mtimeMs',
  FrontmatterSeoImageCtimeMs = 'frontmatter___seoImage___ctimeMs',
  FrontmatterSeoImageAtime = 'frontmatter___seoImage___atime',
  FrontmatterSeoImageMtime = 'frontmatter___seoImage___mtime',
  FrontmatterSeoImageCtime = 'frontmatter___seoImage___ctime',
  FrontmatterSeoImageBirthtime = 'frontmatter___seoImage___birthtime',
  FrontmatterSeoImageBirthtimeMs = 'frontmatter___seoImage___birthtimeMs',
  FrontmatterSeoImageBlksize = 'frontmatter___seoImage___blksize',
  FrontmatterSeoImageBlocks = 'frontmatter___seoImage___blocks',
  FrontmatterSeoImagePublicUrl = 'frontmatter___seoImage___publicURL',
  FrontmatterSeoImageChildrenImageSharp = 'frontmatter___seoImage___childrenImageSharp',
  FrontmatterSeoImageChildrenImageSharpGatsbyImageData = 'frontmatter___seoImage___childrenImageSharp___gatsbyImageData',
  FrontmatterSeoImageChildrenImageSharpId = 'frontmatter___seoImage___childrenImageSharp___id',
  FrontmatterSeoImageChildrenImageSharpChildren = 'frontmatter___seoImage___childrenImageSharp___children',
  FrontmatterSeoImageChildImageSharpGatsbyImageData = 'frontmatter___seoImage___childImageSharp___gatsbyImageData',
  FrontmatterSeoImageChildImageSharpId = 'frontmatter___seoImage___childImageSharp___id',
  FrontmatterSeoImageChildImageSharpChildren = 'frontmatter___seoImage___childImageSharp___children',
  FrontmatterSeoImageChildrenMarkdownRemark = 'frontmatter___seoImage___childrenMarkdownRemark',
  FrontmatterSeoImageChildrenMarkdownRemarkId = 'frontmatter___seoImage___childrenMarkdownRemark___id',
  FrontmatterSeoImageChildrenMarkdownRemarkExcerpt = 'frontmatter___seoImage___childrenMarkdownRemark___excerpt',
  FrontmatterSeoImageChildrenMarkdownRemarkRawMarkdownBody = 'frontmatter___seoImage___childrenMarkdownRemark___rawMarkdownBody',
  FrontmatterSeoImageChildrenMarkdownRemarkFileAbsolutePath = 'frontmatter___seoImage___childrenMarkdownRemark___fileAbsolutePath',
  FrontmatterSeoImageChildrenMarkdownRemarkHtml = 'frontmatter___seoImage___childrenMarkdownRemark___html',
  FrontmatterSeoImageChildrenMarkdownRemarkHtmlAst = 'frontmatter___seoImage___childrenMarkdownRemark___htmlAst',
  FrontmatterSeoImageChildrenMarkdownRemarkExcerptAst = 'frontmatter___seoImage___childrenMarkdownRemark___excerptAst',
  FrontmatterSeoImageChildrenMarkdownRemarkHeadings = 'frontmatter___seoImage___childrenMarkdownRemark___headings',
  FrontmatterSeoImageChildrenMarkdownRemarkTimeToRead = 'frontmatter___seoImage___childrenMarkdownRemark___timeToRead',
  FrontmatterSeoImageChildrenMarkdownRemarkTableOfContents = 'frontmatter___seoImage___childrenMarkdownRemark___tableOfContents',
  FrontmatterSeoImageChildrenMarkdownRemarkChildren = 'frontmatter___seoImage___childrenMarkdownRemark___children',
  FrontmatterSeoImageChildMarkdownRemarkId = 'frontmatter___seoImage___childMarkdownRemark___id',
  FrontmatterSeoImageChildMarkdownRemarkExcerpt = 'frontmatter___seoImage___childMarkdownRemark___excerpt',
  FrontmatterSeoImageChildMarkdownRemarkRawMarkdownBody = 'frontmatter___seoImage___childMarkdownRemark___rawMarkdownBody',
  FrontmatterSeoImageChildMarkdownRemarkFileAbsolutePath = 'frontmatter___seoImage___childMarkdownRemark___fileAbsolutePath',
  FrontmatterSeoImageChildMarkdownRemarkHtml = 'frontmatter___seoImage___childMarkdownRemark___html',
  FrontmatterSeoImageChildMarkdownRemarkHtmlAst = 'frontmatter___seoImage___childMarkdownRemark___htmlAst',
  FrontmatterSeoImageChildMarkdownRemarkExcerptAst = 'frontmatter___seoImage___childMarkdownRemark___excerptAst',
  FrontmatterSeoImageChildMarkdownRemarkHeadings = 'frontmatter___seoImage___childMarkdownRemark___headings',
  FrontmatterSeoImageChildMarkdownRemarkTimeToRead = 'frontmatter___seoImage___childMarkdownRemark___timeToRead',
  FrontmatterSeoImageChildMarkdownRemarkTableOfContents = 'frontmatter___seoImage___childMarkdownRemark___tableOfContents',
  FrontmatterSeoImageChildMarkdownRemarkChildren = 'frontmatter___seoImage___childMarkdownRemark___children',
  FrontmatterSeoImageId = 'frontmatter___seoImage___id',
  FrontmatterSeoImageParentId = 'frontmatter___seoImage___parent___id',
  FrontmatterSeoImageParentChildren = 'frontmatter___seoImage___parent___children',
  FrontmatterSeoImageChildren = 'frontmatter___seoImage___children',
  FrontmatterSeoImageChildrenId = 'frontmatter___seoImage___children___id',
  FrontmatterSeoImageChildrenChildren = 'frontmatter___seoImage___children___children',
  FrontmatterSeoImageInternalContent = 'frontmatter___seoImage___internal___content',
  FrontmatterSeoImageInternalContentDigest = 'frontmatter___seoImage___internal___contentDigest',
  FrontmatterSeoImageInternalDescription = 'frontmatter___seoImage___internal___description',
  FrontmatterSeoImageInternalFieldOwners = 'frontmatter___seoImage___internal___fieldOwners',
  FrontmatterSeoImageInternalIgnoreType = 'frontmatter___seoImage___internal___ignoreType',
  FrontmatterSeoImageInternalMediaType = 'frontmatter___seoImage___internal___mediaType',
  FrontmatterSeoImageInternalOwner = 'frontmatter___seoImage___internal___owner',
  FrontmatterSeoImageInternalType = 'frontmatter___seoImage___internal___type',
  Excerpt = 'excerpt',
  RawMarkdownBody = 'rawMarkdownBody',
  FileAbsolutePath = 'fileAbsolutePath',
  FieldsSlug = 'fields___slug',
  FieldsOldSlug = 'fields___oldSlug',
  FieldsFolder = 'fields___folder',
  FieldsTags = 'fields___tags',
  FieldsGithubLink = 'fields___githubLink',
  Html = 'html',
  HtmlAst = 'htmlAst',
  ExcerptAst = 'excerptAst',
  Headings = 'headings',
  HeadingsId = 'headings___id',
  HeadingsValue = 'headings___value',
  HeadingsDepth = 'headings___depth',
  TimeToRead = 'timeToRead',
  TableOfContents = 'tableOfContents',
  WordCountParagraphs = 'wordCount___paragraphs',
  WordCountSentences = 'wordCount___sentences',
  WordCountWords = 'wordCount___words',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type MarkdownRemarkFieldsFilterInput = {
  slug?: Maybe<StringQueryOperatorInput>
  oldSlug?: Maybe<StringQueryOperatorInput>
  folder?: Maybe<StringQueryOperatorInput>
  tags?: Maybe<StringQueryOperatorInput>
  githubLink?: Maybe<StringQueryOperatorInput>
}

export type MarkdownRemarkFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  frontmatter?: Maybe<MarkdownRemarkFrontmatterFilterInput>
  excerpt?: Maybe<StringQueryOperatorInput>
  rawMarkdownBody?: Maybe<StringQueryOperatorInput>
  fileAbsolutePath?: Maybe<StringQueryOperatorInput>
  fields?: Maybe<MarkdownRemarkFieldsFilterInput>
  html?: Maybe<StringQueryOperatorInput>
  htmlAst?: Maybe<JsonQueryOperatorInput>
  excerptAst?: Maybe<JsonQueryOperatorInput>
  headings?: Maybe<MarkdownHeadingFilterListInput>
  timeToRead?: Maybe<IntQueryOperatorInput>
  tableOfContents?: Maybe<StringQueryOperatorInput>
  wordCount?: Maybe<MarkdownWordCountFilterInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type MarkdownRemarkFilterListInput = {
  elemMatch?: Maybe<MarkdownRemarkFilterInput>
}

export type MarkdownRemarkFrontmatter = {
  __typename?: 'MarkdownRemarkFrontmatter'
  title?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['Date']>
  description?: Maybe<Scalars['String']>
  author?: Maybe<Scalars['String']>
  tags?: Maybe<Scalars['String']>
  draft?: Maybe<Scalars['Boolean']>
  hero?: Maybe<File>
  navId?: Maybe<Scalars['String']>
  seoImage?: Maybe<File>
}

export type MarkdownRemarkFrontmatterDateArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type MarkdownRemarkFrontmatterFilterInput = {
  title?: Maybe<StringQueryOperatorInput>
  date?: Maybe<DateQueryOperatorInput>
  description?: Maybe<StringQueryOperatorInput>
  author?: Maybe<StringQueryOperatorInput>
  tags?: Maybe<StringQueryOperatorInput>
  draft?: Maybe<BooleanQueryOperatorInput>
  hero?: Maybe<FileFilterInput>
  navId?: Maybe<StringQueryOperatorInput>
  seoImage?: Maybe<FileFilterInput>
}

export type MarkdownRemarkGroupConnection = {
  __typename?: 'MarkdownRemarkGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<MarkdownRemarkEdge>
  nodes: Array<MarkdownRemark>
  pageInfo: PageInfo
  field: Scalars['String']
  fieldValue?: Maybe<Scalars['String']>
}

export type MarkdownRemarkSortInput = {
  fields?: Maybe<Array<Maybe<MarkdownRemarkFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type MarkdownWordCount = {
  __typename?: 'MarkdownWordCount'
  paragraphs?: Maybe<Scalars['Int']>
  sentences?: Maybe<Scalars['Int']>
  words?: Maybe<Scalars['Int']>
}

export type MarkdownWordCountFilterInput = {
  paragraphs?: Maybe<IntQueryOperatorInput>
  sentences?: Maybe<IntQueryOperatorInput>
  words?: Maybe<IntQueryOperatorInput>
}

/** Node Interface */
export type Node = {
  id: Scalars['ID']
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type NodeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type NodeFilterListInput = {
  elemMatch?: Maybe<NodeFilterInput>
}

export type PngOptions = {
  quality?: Maybe<Scalars['Int']>
  compressionSpeed?: Maybe<Scalars['Int']>
}

export type PageInfo = {
  __typename?: 'PageInfo'
  currentPage: Scalars['Int']
  hasPreviousPage: Scalars['Boolean']
  hasNextPage: Scalars['Boolean']
  itemCount: Scalars['Int']
  pageCount: Scalars['Int']
  perPage?: Maybe<Scalars['Int']>
  totalCount: Scalars['Int']
}

export type Potrace = {
  turnPolicy?: Maybe<PotraceTurnPolicy>
  turdSize?: Maybe<Scalars['Float']>
  alphaMax?: Maybe<Scalars['Float']>
  optCurve?: Maybe<Scalars['Boolean']>
  optTolerance?: Maybe<Scalars['Float']>
  threshold?: Maybe<Scalars['Int']>
  blackOnWhite?: Maybe<Scalars['Boolean']>
  color?: Maybe<Scalars['String']>
  background?: Maybe<Scalars['String']>
}

export enum PotraceTurnPolicy {
  TurnpolicyBlack = 'TURNPOLICY_BLACK',
  TurnpolicyWhite = 'TURNPOLICY_WHITE',
  TurnpolicyLeft = 'TURNPOLICY_LEFT',
  TurnpolicyRight = 'TURNPOLICY_RIGHT',
  TurnpolicyMinority = 'TURNPOLICY_MINORITY',
  TurnpolicyMajority = 'TURNPOLICY_MAJORITY'
}

export type Query = {
  __typename?: 'Query'
  file?: Maybe<File>
  allFile: FileConnection
  directory?: Maybe<Directory>
  allDirectory: DirectoryConnection
  site?: Maybe<Site>
  allSite: SiteConnection
  sitePage?: Maybe<SitePage>
  allSitePage: SitePageConnection
  imageSharp?: Maybe<ImageSharp>
  allImageSharp: ImageSharpConnection
  markdownRemark?: Maybe<MarkdownRemark>
  allMarkdownRemark: MarkdownRemarkConnection
  siteBuildMetadata?: Maybe<SiteBuildMetadata>
  allSiteBuildMetadata: SiteBuildMetadataConnection
  sitePlugin?: Maybe<SitePlugin>
  allSitePlugin: SitePluginConnection
  staticImage?: Maybe<StaticImage>
  allStaticImage: StaticImageConnection
}

export type QueryFileArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  gid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  publicURL?: Maybe<StringQueryOperatorInput>
  childrenImageSharp?: Maybe<ImageSharpFilterListInput>
  childImageSharp?: Maybe<ImageSharpFilterInput>
  childrenMarkdownRemark?: Maybe<MarkdownRemarkFilterListInput>
  childMarkdownRemark?: Maybe<MarkdownRemarkFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllFileArgs = {
  filter?: Maybe<FileFilterInput>
  sort?: Maybe<FileSortInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryDirectoryArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  gid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllDirectoryArgs = {
  filter?: Maybe<DirectoryFilterInput>
  sort?: Maybe<DirectorySortInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QuerySiteArgs = {
  buildTime?: Maybe<DateQueryOperatorInput>
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>
  port?: Maybe<IntQueryOperatorInput>
  host?: Maybe<StringQueryOperatorInput>
  flags?: Maybe<SiteFlagsFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllSiteArgs = {
  filter?: Maybe<SiteFilterInput>
  sort?: Maybe<SiteSortInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QuerySitePageArgs = {
  path?: Maybe<StringQueryOperatorInput>
  component?: Maybe<StringQueryOperatorInput>
  internalComponentName?: Maybe<StringQueryOperatorInput>
  componentChunkName?: Maybe<StringQueryOperatorInput>
  matchPath?: Maybe<StringQueryOperatorInput>
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>
  pluginCreator?: Maybe<SitePluginFilterInput>
  pluginCreatorId?: Maybe<StringQueryOperatorInput>
  componentPath?: Maybe<StringQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  context?: Maybe<SitePageContextFilterInput>
}

export type QueryAllSitePageArgs = {
  filter?: Maybe<SitePageFilterInput>
  sort?: Maybe<SitePageSortInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryImageSharpArgs = {
  fixed?: Maybe<ImageSharpFixedFilterInput>
  fluid?: Maybe<ImageSharpFluidFilterInput>
  gatsbyImageData?: Maybe<JsonQueryOperatorInput>
  original?: Maybe<ImageSharpOriginalFilterInput>
  resize?: Maybe<ImageSharpResizeFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllImageSharpArgs = {
  filter?: Maybe<ImageSharpFilterInput>
  sort?: Maybe<ImageSharpSortInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryMarkdownRemarkArgs = {
  id?: Maybe<StringQueryOperatorInput>
  frontmatter?: Maybe<MarkdownRemarkFrontmatterFilterInput>
  excerpt?: Maybe<StringQueryOperatorInput>
  rawMarkdownBody?: Maybe<StringQueryOperatorInput>
  fileAbsolutePath?: Maybe<StringQueryOperatorInput>
  fields?: Maybe<MarkdownRemarkFieldsFilterInput>
  html?: Maybe<StringQueryOperatorInput>
  htmlAst?: Maybe<JsonQueryOperatorInput>
  excerptAst?: Maybe<JsonQueryOperatorInput>
  headings?: Maybe<MarkdownHeadingFilterListInput>
  timeToRead?: Maybe<IntQueryOperatorInput>
  tableOfContents?: Maybe<StringQueryOperatorInput>
  wordCount?: Maybe<MarkdownWordCountFilterInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllMarkdownRemarkArgs = {
  filter?: Maybe<MarkdownRemarkFilterInput>
  sort?: Maybe<MarkdownRemarkSortInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QuerySiteBuildMetadataArgs = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  buildTime?: Maybe<DateQueryOperatorInput>
}

export type QueryAllSiteBuildMetadataArgs = {
  filter?: Maybe<SiteBuildMetadataFilterInput>
  sort?: Maybe<SiteBuildMetadataSortInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QuerySitePluginArgs = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  resolve?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>
  nodeAPIs?: Maybe<StringQueryOperatorInput>
  browserAPIs?: Maybe<StringQueryOperatorInput>
  ssrAPIs?: Maybe<StringQueryOperatorInput>
  pluginFilepath?: Maybe<StringQueryOperatorInput>
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>
}

export type QueryAllSitePluginArgs = {
  filter?: Maybe<SitePluginFilterInput>
  sort?: Maybe<SitePluginSortInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryStaticImageArgs = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
}

export type QueryAllStaticImageArgs = {
  filter?: Maybe<StaticImageFilterInput>
  sort?: Maybe<StaticImageSortInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type Site = Node & {
  __typename?: 'Site'
  buildTime?: Maybe<Scalars['Date']>
  siteMetadata?: Maybe<SiteSiteMetadata>
  port?: Maybe<Scalars['Int']>
  host?: Maybe<Scalars['String']>
  flags?: Maybe<SiteFlags>
  id: Scalars['ID']
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SiteBuildTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type SiteBuildMetadata = Node & {
  __typename?: 'SiteBuildMetadata'
  id: Scalars['ID']
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  buildTime?: Maybe<Scalars['Date']>
}

export type SiteBuildMetadataBuildTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type SiteBuildMetadataConnection = {
  __typename?: 'SiteBuildMetadataConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteBuildMetadataEdge>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  group: Array<SiteBuildMetadataGroupConnection>
}

export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataEdge = {
  __typename?: 'SiteBuildMetadataEdge'
  next?: Maybe<SiteBuildMetadata>
  node: SiteBuildMetadata
  previous?: Maybe<SiteBuildMetadata>
}

export enum SiteBuildMetadataFieldsEnum {
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type',
  BuildTime = 'buildTime'
}

export type SiteBuildMetadataFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  buildTime?: Maybe<DateQueryOperatorInput>
}

export type SiteBuildMetadataGroupConnection = {
  __typename?: 'SiteBuildMetadataGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteBuildMetadataEdge>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  field: Scalars['String']
  fieldValue?: Maybe<Scalars['String']>
}

export type SiteBuildMetadataSortInput = {
  fields?: Maybe<Array<Maybe<SiteBuildMetadataFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteConnection = {
  __typename?: 'SiteConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteEdge>
  nodes: Array<Site>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  group: Array<SiteGroupConnection>
}

export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  field: SiteFieldsEnum
}

export type SiteEdge = {
  __typename?: 'SiteEdge'
  next?: Maybe<Site>
  node: Site
  previous?: Maybe<Site>
}

export enum SiteFieldsEnum {
  BuildTime = 'buildTime',
  SiteMetadataTitle = 'siteMetadata___title',
  SiteMetadataDescription = 'siteMetadata___description',
  SiteMetadataAuthor = 'siteMetadata___author',
  SiteMetadataContactEmail = 'siteMetadata___contact___email',
  SiteMetadataContactPhone = 'siteMetadata___contact___phone',
  SiteMetadataSiteUrl = 'siteMetadata___siteUrl',
  SiteMetadataLogo = 'siteMetadata___logo',
  SiteMetadataSocialFacebook = 'siteMetadata___social___facebook',
  SiteMetadataSocialForum = 'siteMetadata___social___forum',
  SiteMetadataSocialGithub = 'siteMetadata___social___github',
  SiteMetadataSocialLinkedin = 'siteMetadata___social___linkedin',
  SiteMetadataSocialStackoverflow = 'siteMetadata___social___stackoverflow',
  SiteMetadataSocialTwitter = 'siteMetadata___social___twitter',
  SiteMetadataSocialYoutube = 'siteMetadata___social___youtube',
  SiteMetadataTeam = 'siteMetadata___team',
  SiteMetadataTeamKey = 'siteMetadata___team___key',
  SiteMetadataTeamName = 'siteMetadata___team___name',
  SiteMetadataTeamImage = 'siteMetadata___team___image',
  SiteMetadataTeamTitle = 'siteMetadata___team___title',
  SiteMetadataTeamBio = 'siteMetadata___team___bio',
  SiteMetadataTeamExternal = 'siteMetadata___team___external',
  SiteMetadataTeamSocialTwitter = 'siteMetadata___team___social___twitter',
  SiteMetadataTeamSocialLinkedin = 'siteMetadata___team___social___linkedin',
  SiteMetadataTeamSocialEmail = 'siteMetadata___team___social___email',
  SiteMetadataEvents = 'siteMetadata___events',
  SiteMetadataEventsTitle = 'siteMetadata___events___title',
  SiteMetadataEventsDescription = 'siteMetadata___events___description',
  SiteMetadataEventsMonth = 'siteMetadata___events___month',
  SiteMetadataEventsDay = 'siteMetadata___events___day',
  SiteMetadataEventsTime = 'siteMetadata___events___time',
  SiteMetadataEventsLocationLine1 = 'siteMetadata___events___locationLine1',
  SiteMetadataEventsLocationLine2 = 'siteMetadata___events___locationLine2',
  SiteMetadataEventsUrl = 'siteMetadata___events___url',
  SiteMetadataRedirects = 'siteMetadata___redirects',
  SiteMetadataRedirectsFrom = 'siteMetadata___redirects___from',
  SiteMetadataRedirectsTo = 'siteMetadata___redirects___to',
  SiteMetadataRedirectsPermanent = 'siteMetadata___redirects___permanent',
  Port = 'port',
  Host = 'host',
  FlagsPreserveWebpackCache = 'flags___PRESERVE_WEBPACK_CACHE',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SiteFilterInput = {
  buildTime?: Maybe<DateQueryOperatorInput>
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>
  port?: Maybe<IntQueryOperatorInput>
  host?: Maybe<StringQueryOperatorInput>
  flags?: Maybe<SiteFlagsFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type SiteFlags = {
  __typename?: 'SiteFlags'
  PRESERVE_WEBPACK_CACHE?: Maybe<Scalars['Boolean']>
}

export type SiteFlagsFilterInput = {
  PRESERVE_WEBPACK_CACHE?: Maybe<BooleanQueryOperatorInput>
}

export type SiteGroupConnection = {
  __typename?: 'SiteGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteEdge>
  nodes: Array<Site>
  pageInfo: PageInfo
  field: Scalars['String']
  fieldValue?: Maybe<Scalars['String']>
}

export type SitePage = Node & {
  __typename?: 'SitePage'
  path: Scalars['String']
  component: Scalars['String']
  internalComponentName: Scalars['String']
  componentChunkName: Scalars['String']
  matchPath?: Maybe<Scalars['String']>
  isCreatedByStatefulCreatePages?: Maybe<Scalars['Boolean']>
  pluginCreator?: Maybe<SitePlugin>
  pluginCreatorId?: Maybe<Scalars['String']>
  componentPath?: Maybe<Scalars['String']>
  id: Scalars['ID']
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  context?: Maybe<SitePageContext>
}

export type SitePageConnection = {
  __typename?: 'SitePageConnection'
  totalCount: Scalars['Int']
  edges: Array<SitePageEdge>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  group: Array<SitePageGroupConnection>
}

export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  field: SitePageFieldsEnum
}

export type SitePageContext = {
  __typename?: 'SitePageContext'
  currentPage?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  numPages?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
  slug?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  total?: Maybe<Scalars['Int']>
  tag?: Maybe<Scalars['String']>
  author?: Maybe<Scalars['String']>
  next?: Maybe<SitePageContextNext>
  previous?: Maybe<SitePageContextPrevious>
  related?: Maybe<Array<Maybe<SitePageContextRelated>>>
}

export type SitePageContextFilterInput = {
  currentPage?: Maybe<IntQueryOperatorInput>
  limit?: Maybe<IntQueryOperatorInput>
  numPages?: Maybe<IntQueryOperatorInput>
  skip?: Maybe<IntQueryOperatorInput>
  slug?: Maybe<StringQueryOperatorInput>
  tags?: Maybe<StringQueryOperatorInput>
  total?: Maybe<IntQueryOperatorInput>
  tag?: Maybe<StringQueryOperatorInput>
  author?: Maybe<StringQueryOperatorInput>
  next?: Maybe<SitePageContextNextFilterInput>
  previous?: Maybe<SitePageContextPreviousFilterInput>
  related?: Maybe<SitePageContextRelatedFilterListInput>
}

export type SitePageContextNext = {
  __typename?: 'SitePageContextNext'
  fields?: Maybe<SitePageContextNextFields>
}

export type SitePageContextNextFields = {
  __typename?: 'SitePageContextNextFields'
  slug?: Maybe<Scalars['String']>
  oldSlug?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePageContextNextFieldsFilterInput = {
  slug?: Maybe<StringQueryOperatorInput>
  oldSlug?: Maybe<StringQueryOperatorInput>
  tags?: Maybe<StringQueryOperatorInput>
}

export type SitePageContextNextFilterInput = {
  fields?: Maybe<SitePageContextNextFieldsFilterInput>
}

export type SitePageContextPrevious = {
  __typename?: 'SitePageContextPrevious'
  fields?: Maybe<SitePageContextPreviousFields>
}

export type SitePageContextPreviousFields = {
  __typename?: 'SitePageContextPreviousFields'
  slug?: Maybe<Scalars['String']>
  oldSlug?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePageContextPreviousFieldsFilterInput = {
  slug?: Maybe<StringQueryOperatorInput>
  oldSlug?: Maybe<StringQueryOperatorInput>
  tags?: Maybe<StringQueryOperatorInput>
}

export type SitePageContextPreviousFilterInput = {
  fields?: Maybe<SitePageContextPreviousFieldsFilterInput>
}

export type SitePageContextRelated = {
  __typename?: 'SitePageContextRelated'
  title?: Maybe<Scalars['String']>
  href?: Maybe<Scalars['String']>
}

export type SitePageContextRelatedFilterInput = {
  title?: Maybe<StringQueryOperatorInput>
  href?: Maybe<StringQueryOperatorInput>
}

export type SitePageContextRelatedFilterListInput = {
  elemMatch?: Maybe<SitePageContextRelatedFilterInput>
}

export type SitePageEdge = {
  __typename?: 'SitePageEdge'
  next?: Maybe<SitePage>
  node: SitePage
  previous?: Maybe<SitePage>
}

export enum SitePageFieldsEnum {
  Path = 'path',
  Component = 'component',
  InternalComponentName = 'internalComponentName',
  ComponentChunkName = 'componentChunkName',
  MatchPath = 'matchPath',
  IsCreatedByStatefulCreatePages = 'isCreatedByStatefulCreatePages',
  PluginCreatorParentId = 'pluginCreator___parent___id',
  PluginCreatorParentParentId = 'pluginCreator___parent___parent___id',
  PluginCreatorParentParentChildren = 'pluginCreator___parent___parent___children',
  PluginCreatorParentChildren = 'pluginCreator___parent___children',
  PluginCreatorParentChildrenId = 'pluginCreator___parent___children___id',
  PluginCreatorParentChildrenChildren = 'pluginCreator___parent___children___children',
  PluginCreatorParentInternalContent = 'pluginCreator___parent___internal___content',
  PluginCreatorParentInternalContentDigest = 'pluginCreator___parent___internal___contentDigest',
  PluginCreatorParentInternalDescription = 'pluginCreator___parent___internal___description',
  PluginCreatorParentInternalFieldOwners = 'pluginCreator___parent___internal___fieldOwners',
  PluginCreatorParentInternalIgnoreType = 'pluginCreator___parent___internal___ignoreType',
  PluginCreatorParentInternalMediaType = 'pluginCreator___parent___internal___mediaType',
  PluginCreatorParentInternalOwner = 'pluginCreator___parent___internal___owner',
  PluginCreatorParentInternalType = 'pluginCreator___parent___internal___type',
  PluginCreatorChildren = 'pluginCreator___children',
  PluginCreatorChildrenId = 'pluginCreator___children___id',
  PluginCreatorChildrenParentId = 'pluginCreator___children___parent___id',
  PluginCreatorChildrenParentChildren = 'pluginCreator___children___parent___children',
  PluginCreatorChildrenChildren = 'pluginCreator___children___children',
  PluginCreatorChildrenChildrenId = 'pluginCreator___children___children___id',
  PluginCreatorChildrenChildrenChildren = 'pluginCreator___children___children___children',
  PluginCreatorChildrenInternalContent = 'pluginCreator___children___internal___content',
  PluginCreatorChildrenInternalContentDigest = 'pluginCreator___children___internal___contentDigest',
  PluginCreatorChildrenInternalDescription = 'pluginCreator___children___internal___description',
  PluginCreatorChildrenInternalFieldOwners = 'pluginCreator___children___internal___fieldOwners',
  PluginCreatorChildrenInternalIgnoreType = 'pluginCreator___children___internal___ignoreType',
  PluginCreatorChildrenInternalMediaType = 'pluginCreator___children___internal___mediaType',
  PluginCreatorChildrenInternalOwner = 'pluginCreator___children___internal___owner',
  PluginCreatorChildrenInternalType = 'pluginCreator___children___internal___type',
  PluginCreatorInternalContent = 'pluginCreator___internal___content',
  PluginCreatorInternalContentDigest = 'pluginCreator___internal___contentDigest',
  PluginCreatorInternalDescription = 'pluginCreator___internal___description',
  PluginCreatorInternalFieldOwners = 'pluginCreator___internal___fieldOwners',
  PluginCreatorInternalIgnoreType = 'pluginCreator___internal___ignoreType',
  PluginCreatorInternalMediaType = 'pluginCreator___internal___mediaType',
  PluginCreatorInternalOwner = 'pluginCreator___internal___owner',
  PluginCreatorInternalType = 'pluginCreator___internal___type',
  PluginCreatorResolve = 'pluginCreator___resolve',
  PluginCreatorName = 'pluginCreator___name',
  PluginCreatorVersion = 'pluginCreator___version',
  PluginCreatorPluginOptionsPlugins = 'pluginCreator___pluginOptions___plugins',
  PluginCreatorPluginOptionsPluginsResolve = 'pluginCreator___pluginOptions___plugins___resolve',
  PluginCreatorPluginOptionsPluginsId = 'pluginCreator___pluginOptions___plugins___id',
  PluginCreatorPluginOptionsPluginsName = 'pluginCreator___pluginOptions___plugins___name',
  PluginCreatorPluginOptionsPluginsVersion = 'pluginCreator___pluginOptions___plugins___version',
  PluginCreatorPluginOptionsPluginsNodeApIs = 'pluginCreator___pluginOptions___plugins___nodeAPIs',
  PluginCreatorPluginOptionsPluginsBrowserApIs = 'pluginCreator___pluginOptions___plugins___browserAPIs',
  PluginCreatorPluginOptionsPluginsSsrApIs = 'pluginCreator___pluginOptions___plugins___ssrAPIs',
  PluginCreatorPluginOptionsPluginsPluginFilepath = 'pluginCreator___pluginOptions___plugins___pluginFilepath',
  PluginCreatorPluginOptionsPath = 'pluginCreator___pluginOptions___path',
  PluginCreatorPluginOptionsName = 'pluginCreator___pluginOptions___name',
  PluginCreatorPluginOptionsGoogleFamilies = 'pluginCreator___pluginOptions___google___families',
  PluginCreatorPluginOptionsIsTsx = 'pluginCreator___pluginOptions___isTSX',
  PluginCreatorPluginOptionsJsxPragma = 'pluginCreator___pluginOptions___jsxPragma',
  PluginCreatorPluginOptionsAllExtensions = 'pluginCreator___pluginOptions___allExtensions',
  PluginCreatorPluginOptionsSourceMap = 'pluginCreator___pluginOptions___sourceMap',
  PluginCreatorPluginOptionsAutoLabel = 'pluginCreator___pluginOptions___autoLabel',
  PluginCreatorPluginOptionsLabelFormat = 'pluginCreator___pluginOptions___labelFormat',
  PluginCreatorPluginOptionsCssPropOptimization = 'pluginCreator___pluginOptions___cssPropOptimization',
  PluginCreatorPluginOptionsBase64Width = 'pluginCreator___pluginOptions___base64Width',
  PluginCreatorPluginOptionsStripMetadata = 'pluginCreator___pluginOptions___stripMetadata',
  PluginCreatorPluginOptionsDefaultQuality = 'pluginCreator___pluginOptions___defaultQuality',
  PluginCreatorPluginOptionsFailOnError = 'pluginCreator___pluginOptions___failOnError',
  PluginCreatorPluginOptionsOffsetY = 'pluginCreator___pluginOptions___offsetY',
  PluginCreatorPluginOptionsClassName = 'pluginCreator___pluginOptions___className',
  PluginCreatorPluginOptionsReplacementsAndroidVersion = 'pluginCreator___pluginOptions___replacements___ANDROID_VERSION',
  PluginCreatorPluginOptionsReplacementsAndroidTrayVersion = 'pluginCreator___pluginOptions___replacements___ANDROID_TRAY_VERSION',
  PluginCreatorPluginOptionsWrapperStyle = 'pluginCreator___pluginOptions___wrapperStyle',
  PluginCreatorPluginOptionsMaxWidth = 'pluginCreator___pluginOptions___maxWidth',
  PluginCreatorPluginOptionsLinkImagesToOriginal = 'pluginCreator___pluginOptions___linkImagesToOriginal',
  PluginCreatorPluginOptionsShowCaptions = 'pluginCreator___pluginOptions___showCaptions',
  PluginCreatorPluginOptionsMarkdownCaptions = 'pluginCreator___pluginOptions___markdownCaptions',
  PluginCreatorPluginOptionsSizeByPixelDensity = 'pluginCreator___pluginOptions___sizeByPixelDensity',
  PluginCreatorPluginOptionsQuality = 'pluginCreator___pluginOptions___quality',
  PluginCreatorPluginOptionsWithWebp = 'pluginCreator___pluginOptions___withWebp',
  PluginCreatorPluginOptionsTracedSvg = 'pluginCreator___pluginOptions___tracedSVG',
  PluginCreatorPluginOptionsLoading = 'pluginCreator___pluginOptions___loading',
  PluginCreatorPluginOptionsDisableBgImageOnAlpha = 'pluginCreator___pluginOptions___disableBgImageOnAlpha',
  PluginCreatorPluginOptionsDisableBgImage = 'pluginCreator___pluginOptions___disableBgImage',
  PluginCreatorPluginOptionsNoInlineHighlight = 'pluginCreator___pluginOptions___noInlineHighlight',
  PluginCreatorPluginOptionsQuery = 'pluginCreator___pluginOptions___query',
  PluginCreatorPluginOptionsFeeds = 'pluginCreator___pluginOptions___feeds',
  PluginCreatorPluginOptionsFeedsQuery = 'pluginCreator___pluginOptions___feeds___query',
  PluginCreatorPluginOptionsFeedsOutput = 'pluginCreator___pluginOptions___feeds___output',
  PluginCreatorPluginOptionsFeedsTitle = 'pluginCreator___pluginOptions___feeds___title',
  PluginCreatorPluginOptionsId = 'pluginCreator___pluginOptions___id',
  PluginCreatorPluginOptionsIncludeInDevelopment = 'pluginCreator___pluginOptions___includeInDevelopment',
  PluginCreatorPluginOptionsDefaultDataLayerType = 'pluginCreator___pluginOptions___defaultDataLayer___type',
  PluginCreatorPluginOptionsRouteChangeEventName = 'pluginCreator___pluginOptions___routeChangeEventName',
  PluginCreatorPluginOptionsPrefixes = 'pluginCreator___pluginOptions___prefixes',
  PluginCreatorPluginOptionsSiteUrl = 'pluginCreator___pluginOptions___siteUrl',
  PluginCreatorPluginOptionsStartUrl = 'pluginCreator___pluginOptions___start_url',
  PluginCreatorPluginOptionsBackgroundColor = 'pluginCreator___pluginOptions___background_color',
  PluginCreatorPluginOptionsThemeColor = 'pluginCreator___pluginOptions___theme_color',
  PluginCreatorPluginOptionsDisplay = 'pluginCreator___pluginOptions___display',
  PluginCreatorPluginOptionsIcon = 'pluginCreator___pluginOptions___icon',
  PluginCreatorPluginOptionsLegacy = 'pluginCreator___pluginOptions___legacy',
  PluginCreatorPluginOptionsThemeColorInHead = 'pluginCreator___pluginOptions___theme_color_in_head',
  PluginCreatorPluginOptionsCacheBustingMode = 'pluginCreator___pluginOptions___cache_busting_mode',
  PluginCreatorPluginOptionsCrossOrigin = 'pluginCreator___pluginOptions___crossOrigin',
  PluginCreatorPluginOptionsIncludeFavicon = 'pluginCreator___pluginOptions___include_favicon',
  PluginCreatorPluginOptionsCacheDigest = 'pluginCreator___pluginOptions___cacheDigest',
  PluginCreatorPluginOptionsWorkboxConfigRuntimeCaching = 'pluginCreator___pluginOptions___workboxConfig___runtimeCaching',
  PluginCreatorPluginOptionsOutput = 'pluginCreator___pluginOptions___output',
  PluginCreatorPluginOptionsExclude = 'pluginCreator___pluginOptions___exclude',
  PluginCreatorPluginOptionsCreateLinkInHead = 'pluginCreator___pluginOptions___createLinkInHead',
  PluginCreatorPluginOptionsBucketName = 'pluginCreator___pluginOptions___bucketName',
  PluginCreatorPluginOptionsProtocol = 'pluginCreator___pluginOptions___protocol',
  PluginCreatorPluginOptionsHostname = 'pluginCreator___pluginOptions___hostname',
  PluginCreatorPluginOptionsGenerateMatchPathRewrites = 'pluginCreator___pluginOptions___generateMatchPathRewrites',
  PluginCreatorPluginOptionsPathCheck = 'pluginCreator___pluginOptions___pathCheck',
  PluginCreatorNodeApIs = 'pluginCreator___nodeAPIs',
  PluginCreatorBrowserApIs = 'pluginCreator___browserAPIs',
  PluginCreatorSsrApIs = 'pluginCreator___ssrAPIs',
  PluginCreatorPluginFilepath = 'pluginCreator___pluginFilepath',
  PluginCreatorPackageJsonName = 'pluginCreator___packageJson___name',
  PluginCreatorPackageJsonDescription = 'pluginCreator___packageJson___description',
  PluginCreatorPackageJsonVersion = 'pluginCreator___packageJson___version',
  PluginCreatorPackageJsonMain = 'pluginCreator___packageJson___main',
  PluginCreatorPackageJsonLicense = 'pluginCreator___packageJson___license',
  PluginCreatorPackageJsonDependencies = 'pluginCreator___packageJson___dependencies',
  PluginCreatorPackageJsonDependenciesName = 'pluginCreator___packageJson___dependencies___name',
  PluginCreatorPackageJsonDependenciesVersion = 'pluginCreator___packageJson___dependencies___version',
  PluginCreatorPackageJsonDevDependencies = 'pluginCreator___packageJson___devDependencies',
  PluginCreatorPackageJsonDevDependenciesName = 'pluginCreator___packageJson___devDependencies___name',
  PluginCreatorPackageJsonDevDependenciesVersion = 'pluginCreator___packageJson___devDependencies___version',
  PluginCreatorPackageJsonPeerDependencies = 'pluginCreator___packageJson___peerDependencies',
  PluginCreatorPackageJsonPeerDependenciesName = 'pluginCreator___packageJson___peerDependencies___name',
  PluginCreatorPackageJsonPeerDependenciesVersion = 'pluginCreator___packageJson___peerDependencies___version',
  PluginCreatorPackageJsonKeywords = 'pluginCreator___packageJson___keywords',
  PluginCreatorId = 'pluginCreatorId',
  ComponentPath = 'componentPath',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type',
  ContextCurrentPage = 'context___currentPage',
  ContextLimit = 'context___limit',
  ContextNumPages = 'context___numPages',
  ContextSkip = 'context___skip',
  ContextSlug = 'context___slug',
  ContextTags = 'context___tags',
  ContextTotal = 'context___total',
  ContextTag = 'context___tag',
  ContextAuthor = 'context___author',
  ContextNextFieldsSlug = 'context___next___fields___slug',
  ContextNextFieldsOldSlug = 'context___next___fields___oldSlug',
  ContextNextFieldsTags = 'context___next___fields___tags',
  ContextPreviousFieldsSlug = 'context___previous___fields___slug',
  ContextPreviousFieldsOldSlug = 'context___previous___fields___oldSlug',
  ContextPreviousFieldsTags = 'context___previous___fields___tags',
  ContextRelated = 'context___related',
  ContextRelatedTitle = 'context___related___title',
  ContextRelatedHref = 'context___related___href'
}

export type SitePageFilterInput = {
  path?: Maybe<StringQueryOperatorInput>
  component?: Maybe<StringQueryOperatorInput>
  internalComponentName?: Maybe<StringQueryOperatorInput>
  componentChunkName?: Maybe<StringQueryOperatorInput>
  matchPath?: Maybe<StringQueryOperatorInput>
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>
  pluginCreator?: Maybe<SitePluginFilterInput>
  pluginCreatorId?: Maybe<StringQueryOperatorInput>
  componentPath?: Maybe<StringQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  context?: Maybe<SitePageContextFilterInput>
}

export type SitePageGroupConnection = {
  __typename?: 'SitePageGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<SitePageEdge>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  field: Scalars['String']
  fieldValue?: Maybe<Scalars['String']>
}

export type SitePageSortInput = {
  fields?: Maybe<Array<Maybe<SitePageFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SitePlugin = Node & {
  __typename?: 'SitePlugin'
  id: Scalars['ID']
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  resolve?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  pluginOptions?: Maybe<SitePluginPluginOptions>
  nodeAPIs?: Maybe<Array<Maybe<Scalars['String']>>>
  browserAPIs?: Maybe<Array<Maybe<Scalars['String']>>>
  ssrAPIs?: Maybe<Array<Maybe<Scalars['String']>>>
  pluginFilepath?: Maybe<Scalars['String']>
  packageJson?: Maybe<SitePluginPackageJson>
}

export type SitePluginConnection = {
  __typename?: 'SitePluginConnection'
  totalCount: Scalars['Int']
  edges: Array<SitePluginEdge>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  group: Array<SitePluginGroupConnection>
}

export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  field: SitePluginFieldsEnum
}

export type SitePluginEdge = {
  __typename?: 'SitePluginEdge'
  next?: Maybe<SitePlugin>
  node: SitePlugin
  previous?: Maybe<SitePlugin>
}

export enum SitePluginFieldsEnum {
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type',
  Resolve = 'resolve',
  Name = 'name',
  Version = 'version',
  PluginOptionsPlugins = 'pluginOptions___plugins',
  PluginOptionsPluginsResolve = 'pluginOptions___plugins___resolve',
  PluginOptionsPluginsId = 'pluginOptions___plugins___id',
  PluginOptionsPluginsName = 'pluginOptions___plugins___name',
  PluginOptionsPluginsVersion = 'pluginOptions___plugins___version',
  PluginOptionsPluginsPluginOptionsOffsetY = 'pluginOptions___plugins___pluginOptions___offsetY',
  PluginOptionsPluginsPluginOptionsClassName = 'pluginOptions___plugins___pluginOptions___className',
  PluginOptionsPluginsPluginOptionsWrapperStyle = 'pluginOptions___plugins___pluginOptions___wrapperStyle',
  PluginOptionsPluginsPluginOptionsMaxWidth = 'pluginOptions___plugins___pluginOptions___maxWidth',
  PluginOptionsPluginsPluginOptionsBackgroundColor = 'pluginOptions___plugins___pluginOptions___backgroundColor',
  PluginOptionsPluginsPluginOptionsLinkImagesToOriginal = 'pluginOptions___plugins___pluginOptions___linkImagesToOriginal',
  PluginOptionsPluginsPluginOptionsShowCaptions = 'pluginOptions___plugins___pluginOptions___showCaptions',
  PluginOptionsPluginsPluginOptionsMarkdownCaptions = 'pluginOptions___plugins___pluginOptions___markdownCaptions',
  PluginOptionsPluginsPluginOptionsSizeByPixelDensity = 'pluginOptions___plugins___pluginOptions___sizeByPixelDensity',
  PluginOptionsPluginsPluginOptionsQuality = 'pluginOptions___plugins___pluginOptions___quality',
  PluginOptionsPluginsPluginOptionsWithWebp = 'pluginOptions___plugins___pluginOptions___withWebp',
  PluginOptionsPluginsPluginOptionsTracedSvg = 'pluginOptions___plugins___pluginOptions___tracedSVG',
  PluginOptionsPluginsPluginOptionsLoading = 'pluginOptions___plugins___pluginOptions___loading',
  PluginOptionsPluginsPluginOptionsDisableBgImageOnAlpha = 'pluginOptions___plugins___pluginOptions___disableBgImageOnAlpha',
  PluginOptionsPluginsPluginOptionsDisableBgImage = 'pluginOptions___plugins___pluginOptions___disableBgImage',
  PluginOptionsPluginsPluginOptionsNoInlineHighlight = 'pluginOptions___plugins___pluginOptions___noInlineHighlight',
  PluginOptionsPluginsNodeApIs = 'pluginOptions___plugins___nodeAPIs',
  PluginOptionsPluginsBrowserApIs = 'pluginOptions___plugins___browserAPIs',
  PluginOptionsPluginsSsrApIs = 'pluginOptions___plugins___ssrAPIs',
  PluginOptionsPluginsPluginFilepath = 'pluginOptions___plugins___pluginFilepath',
  PluginOptionsPath = 'pluginOptions___path',
  PluginOptionsName = 'pluginOptions___name',
  PluginOptionsGoogleFamilies = 'pluginOptions___google___families',
  PluginOptionsIsTsx = 'pluginOptions___isTSX',
  PluginOptionsJsxPragma = 'pluginOptions___jsxPragma',
  PluginOptionsAllExtensions = 'pluginOptions___allExtensions',
  PluginOptionsSourceMap = 'pluginOptions___sourceMap',
  PluginOptionsAutoLabel = 'pluginOptions___autoLabel',
  PluginOptionsLabelFormat = 'pluginOptions___labelFormat',
  PluginOptionsCssPropOptimization = 'pluginOptions___cssPropOptimization',
  PluginOptionsBase64Width = 'pluginOptions___base64Width',
  PluginOptionsStripMetadata = 'pluginOptions___stripMetadata',
  PluginOptionsDefaultQuality = 'pluginOptions___defaultQuality',
  PluginOptionsFailOnError = 'pluginOptions___failOnError',
  PluginOptionsOffsetY = 'pluginOptions___offsetY',
  PluginOptionsClassName = 'pluginOptions___className',
  PluginOptionsReplacementsAndroidVersion = 'pluginOptions___replacements___ANDROID_VERSION',
  PluginOptionsReplacementsAndroidTrayVersion = 'pluginOptions___replacements___ANDROID_TRAY_VERSION',
  PluginOptionsWrapperStyle = 'pluginOptions___wrapperStyle',
  PluginOptionsMaxWidth = 'pluginOptions___maxWidth',
  PluginOptionsBackgroundColor = 'pluginOptions___backgroundColor',
  PluginOptionsLinkImagesToOriginal = 'pluginOptions___linkImagesToOriginal',
  PluginOptionsShowCaptions = 'pluginOptions___showCaptions',
  PluginOptionsMarkdownCaptions = 'pluginOptions___markdownCaptions',
  PluginOptionsSizeByPixelDensity = 'pluginOptions___sizeByPixelDensity',
  PluginOptionsQuality = 'pluginOptions___quality',
  PluginOptionsWithWebp = 'pluginOptions___withWebp',
  PluginOptionsTracedSvg = 'pluginOptions___tracedSVG',
  PluginOptionsLoading = 'pluginOptions___loading',
  PluginOptionsDisableBgImageOnAlpha = 'pluginOptions___disableBgImageOnAlpha',
  PluginOptionsDisableBgImage = 'pluginOptions___disableBgImage',
  PluginOptionsNoInlineHighlight = 'pluginOptions___noInlineHighlight',
  PluginOptionsQuery = 'pluginOptions___query',
  PluginOptionsFeeds = 'pluginOptions___feeds',
  PluginOptionsFeedsQuery = 'pluginOptions___feeds___query',
  PluginOptionsFeedsOutput = 'pluginOptions___feeds___output',
  PluginOptionsFeedsTitle = 'pluginOptions___feeds___title',
  PluginOptionsId = 'pluginOptions___id',
  PluginOptionsIncludeInDevelopment = 'pluginOptions___includeInDevelopment',
  PluginOptionsDefaultDataLayerType = 'pluginOptions___defaultDataLayer___type',
  PluginOptionsDefaultDataLayerValuePlatform = 'pluginOptions___defaultDataLayer___value___platform',
  PluginOptionsRouteChangeEventName = 'pluginOptions___routeChangeEventName',
  PluginOptionsPrefixes = 'pluginOptions___prefixes',
  PluginOptionsSiteUrl = 'pluginOptions___siteUrl',
  PluginOptionsStartUrl = 'pluginOptions___start_url',
  PluginOptionsThemeColor = 'pluginOptions___theme_color',
  PluginOptionsDisplay = 'pluginOptions___display',
  PluginOptionsIcon = 'pluginOptions___icon',
  PluginOptionsLegacy = 'pluginOptions___legacy',
  PluginOptionsThemeColorInHead = 'pluginOptions___theme_color_in_head',
  PluginOptionsCacheBustingMode = 'pluginOptions___cache_busting_mode',
  PluginOptionsCrossOrigin = 'pluginOptions___crossOrigin',
  PluginOptionsIncludeFavicon = 'pluginOptions___include_favicon',
  PluginOptionsCacheDigest = 'pluginOptions___cacheDigest',
  PluginOptionsWorkboxConfigRuntimeCaching = 'pluginOptions___workboxConfig___runtimeCaching',
  PluginOptionsWorkboxConfigRuntimeCachingHandler = 'pluginOptions___workboxConfig___runtimeCaching___handler',
  PluginOptionsOutput = 'pluginOptions___output',
  PluginOptionsExclude = 'pluginOptions___exclude',
  PluginOptionsCreateLinkInHead = 'pluginOptions___createLinkInHead',
  PluginOptionsBucketName = 'pluginOptions___bucketName',
  PluginOptionsProtocol = 'pluginOptions___protocol',
  PluginOptionsHostname = 'pluginOptions___hostname',
  PluginOptionsGenerateMatchPathRewrites = 'pluginOptions___generateMatchPathRewrites',
  PluginOptionsPathCheck = 'pluginOptions___pathCheck',
  NodeApIs = 'nodeAPIs',
  BrowserApIs = 'browserAPIs',
  SsrApIs = 'ssrAPIs',
  PluginFilepath = 'pluginFilepath',
  PackageJsonName = 'packageJson___name',
  PackageJsonDescription = 'packageJson___description',
  PackageJsonVersion = 'packageJson___version',
  PackageJsonMain = 'packageJson___main',
  PackageJsonLicense = 'packageJson___license',
  PackageJsonDependencies = 'packageJson___dependencies',
  PackageJsonDependenciesName = 'packageJson___dependencies___name',
  PackageJsonDependenciesVersion = 'packageJson___dependencies___version',
  PackageJsonDevDependencies = 'packageJson___devDependencies',
  PackageJsonDevDependenciesName = 'packageJson___devDependencies___name',
  PackageJsonDevDependenciesVersion = 'packageJson___devDependencies___version',
  PackageJsonPeerDependencies = 'packageJson___peerDependencies',
  PackageJsonPeerDependenciesName = 'packageJson___peerDependencies___name',
  PackageJsonPeerDependenciesVersion = 'packageJson___peerDependencies___version',
  PackageJsonKeywords = 'packageJson___keywords'
}

export type SitePluginFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  resolve?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>
  nodeAPIs?: Maybe<StringQueryOperatorInput>
  browserAPIs?: Maybe<StringQueryOperatorInput>
  ssrAPIs?: Maybe<StringQueryOperatorInput>
  pluginFilepath?: Maybe<StringQueryOperatorInput>
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>
}

export type SitePluginGroupConnection = {
  __typename?: 'SitePluginGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<SitePluginEdge>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  field: Scalars['String']
  fieldValue?: Maybe<Scalars['String']>
}

export type SitePluginPackageJson = {
  __typename?: 'SitePluginPackageJson'
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  main?: Maybe<Scalars['String']>
  license?: Maybe<Scalars['String']>
  dependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDependencies>>>
  devDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDevDependencies>>>
  peerDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonPeerDependencies>>>
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePluginPackageJsonDependencies = {
  __typename?: 'SitePluginPackageJsonDependencies'
  name?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDependenciesFilterInput>
}

export type SitePluginPackageJsonDevDependencies = {
  __typename?: 'SitePluginPackageJsonDevDependencies'
  name?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>
}

export type SitePluginPackageJsonFilterInput = {
  name?: Maybe<StringQueryOperatorInput>
  description?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
  main?: Maybe<StringQueryOperatorInput>
  license?: Maybe<StringQueryOperatorInput>
  dependencies?: Maybe<SitePluginPackageJsonDependenciesFilterListInput>
  devDependencies?: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>
  peerDependencies?: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>
  keywords?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonPeerDependencies = {
  __typename?: 'SitePluginPackageJsonPeerDependencies'
  name?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>
}

export type SitePluginPluginOptions = {
  __typename?: 'SitePluginPluginOptions'
  plugins?: Maybe<Array<Maybe<SitePluginPluginOptionsPlugins>>>
  path?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  google?: Maybe<SitePluginPluginOptionsGoogle>
  isTSX?: Maybe<Scalars['Boolean']>
  jsxPragma?: Maybe<Scalars['String']>
  allExtensions?: Maybe<Scalars['Boolean']>
  sourceMap?: Maybe<Scalars['Boolean']>
  autoLabel?: Maybe<Scalars['String']>
  labelFormat?: Maybe<Scalars['String']>
  cssPropOptimization?: Maybe<Scalars['Boolean']>
  base64Width?: Maybe<Scalars['Int']>
  stripMetadata?: Maybe<Scalars['Boolean']>
  defaultQuality?: Maybe<Scalars['Int']>
  failOnError?: Maybe<Scalars['Boolean']>
  offsetY?: Maybe<Scalars['Int']>
  className?: Maybe<Scalars['String']>
  replacements?: Maybe<SitePluginPluginOptionsReplacements>
  wrapperStyle?: Maybe<Scalars['String']>
  maxWidth?: Maybe<Scalars['Int']>
  backgroundColor?: Maybe<Scalars['String']>
  linkImagesToOriginal?: Maybe<Scalars['Boolean']>
  showCaptions?: Maybe<Scalars['Boolean']>
  markdownCaptions?: Maybe<Scalars['Boolean']>
  sizeByPixelDensity?: Maybe<Scalars['Boolean']>
  quality?: Maybe<Scalars['Int']>
  withWebp?: Maybe<Scalars['Boolean']>
  tracedSVG?: Maybe<Scalars['Boolean']>
  loading?: Maybe<Scalars['String']>
  disableBgImageOnAlpha?: Maybe<Scalars['Boolean']>
  disableBgImage?: Maybe<Scalars['Boolean']>
  noInlineHighlight?: Maybe<Scalars['Boolean']>
  query?: Maybe<Scalars['String']>
  feeds?: Maybe<Array<Maybe<SitePluginPluginOptionsFeeds>>>
  id?: Maybe<Scalars['String']>
  includeInDevelopment?: Maybe<Scalars['Boolean']>
  defaultDataLayer?: Maybe<SitePluginPluginOptionsDefaultDataLayer>
  routeChangeEventName?: Maybe<Scalars['String']>
  prefixes?: Maybe<Array<Maybe<Scalars['String']>>>
  siteUrl?: Maybe<Scalars['String']>
  start_url?: Maybe<Scalars['String']>
  background_color?: Maybe<Scalars['String']>
  theme_color?: Maybe<Scalars['String']>
  display?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  legacy?: Maybe<Scalars['Boolean']>
  theme_color_in_head?: Maybe<Scalars['Boolean']>
  cache_busting_mode?: Maybe<Scalars['String']>
  crossOrigin?: Maybe<Scalars['String']>
  include_favicon?: Maybe<Scalars['Boolean']>
  cacheDigest?: Maybe<Scalars['String']>
  workboxConfig?: Maybe<SitePluginPluginOptionsWorkboxConfig>
  output?: Maybe<Scalars['String']>
  exclude?: Maybe<Array<Maybe<Scalars['String']>>>
  createLinkInHead?: Maybe<Scalars['Boolean']>
  bucketName?: Maybe<Scalars['String']>
  protocol?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  generateMatchPathRewrites?: Maybe<Scalars['Boolean']>
  pathCheck?: Maybe<Scalars['Boolean']>
}

export type SitePluginPluginOptionsDefaultDataLayer = {
  __typename?: 'SitePluginPluginOptionsDefaultDataLayer'
  type?: Maybe<Scalars['String']>
  value?: Maybe<SitePluginPluginOptionsDefaultDataLayerValue>
}

export type SitePluginPluginOptionsDefaultDataLayerFilterInput = {
  type?: Maybe<StringQueryOperatorInput>
  value?: Maybe<SitePluginPluginOptionsDefaultDataLayerValueFilterInput>
}

export type SitePluginPluginOptionsDefaultDataLayerValue = {
  __typename?: 'SitePluginPluginOptionsDefaultDataLayerValue'
  platform?: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsDefaultDataLayerValueFilterInput = {
  platform?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsFeeds = {
  __typename?: 'SitePluginPluginOptionsFeeds'
  query?: Maybe<Scalars['String']>
  output?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsFeedsFilterInput = {
  query?: Maybe<StringQueryOperatorInput>
  output?: Maybe<StringQueryOperatorInput>
  title?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsFeedsFilterListInput = {
  elemMatch?: Maybe<SitePluginPluginOptionsFeedsFilterInput>
}

export type SitePluginPluginOptionsFilterInput = {
  plugins?: Maybe<SitePluginPluginOptionsPluginsFilterListInput>
  path?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  google?: Maybe<SitePluginPluginOptionsGoogleFilterInput>
  isTSX?: Maybe<BooleanQueryOperatorInput>
  jsxPragma?: Maybe<StringQueryOperatorInput>
  allExtensions?: Maybe<BooleanQueryOperatorInput>
  sourceMap?: Maybe<BooleanQueryOperatorInput>
  autoLabel?: Maybe<StringQueryOperatorInput>
  labelFormat?: Maybe<StringQueryOperatorInput>
  cssPropOptimization?: Maybe<BooleanQueryOperatorInput>
  base64Width?: Maybe<IntQueryOperatorInput>
  stripMetadata?: Maybe<BooleanQueryOperatorInput>
  defaultQuality?: Maybe<IntQueryOperatorInput>
  failOnError?: Maybe<BooleanQueryOperatorInput>
  offsetY?: Maybe<IntQueryOperatorInput>
  className?: Maybe<StringQueryOperatorInput>
  replacements?: Maybe<SitePluginPluginOptionsReplacementsFilterInput>
  wrapperStyle?: Maybe<StringQueryOperatorInput>
  maxWidth?: Maybe<IntQueryOperatorInput>
  backgroundColor?: Maybe<StringQueryOperatorInput>
  linkImagesToOriginal?: Maybe<BooleanQueryOperatorInput>
  showCaptions?: Maybe<BooleanQueryOperatorInput>
  markdownCaptions?: Maybe<BooleanQueryOperatorInput>
  sizeByPixelDensity?: Maybe<BooleanQueryOperatorInput>
  quality?: Maybe<IntQueryOperatorInput>
  withWebp?: Maybe<BooleanQueryOperatorInput>
  tracedSVG?: Maybe<BooleanQueryOperatorInput>
  loading?: Maybe<StringQueryOperatorInput>
  disableBgImageOnAlpha?: Maybe<BooleanQueryOperatorInput>
  disableBgImage?: Maybe<BooleanQueryOperatorInput>
  noInlineHighlight?: Maybe<BooleanQueryOperatorInput>
  query?: Maybe<StringQueryOperatorInput>
  feeds?: Maybe<SitePluginPluginOptionsFeedsFilterListInput>
  id?: Maybe<StringQueryOperatorInput>
  includeInDevelopment?: Maybe<BooleanQueryOperatorInput>
  defaultDataLayer?: Maybe<SitePluginPluginOptionsDefaultDataLayerFilterInput>
  routeChangeEventName?: Maybe<StringQueryOperatorInput>
  prefixes?: Maybe<StringQueryOperatorInput>
  siteUrl?: Maybe<StringQueryOperatorInput>
  start_url?: Maybe<StringQueryOperatorInput>
  background_color?: Maybe<StringQueryOperatorInput>
  theme_color?: Maybe<StringQueryOperatorInput>
  display?: Maybe<StringQueryOperatorInput>
  icon?: Maybe<StringQueryOperatorInput>
  legacy?: Maybe<BooleanQueryOperatorInput>
  theme_color_in_head?: Maybe<BooleanQueryOperatorInput>
  cache_busting_mode?: Maybe<StringQueryOperatorInput>
  crossOrigin?: Maybe<StringQueryOperatorInput>
  include_favicon?: Maybe<BooleanQueryOperatorInput>
  cacheDigest?: Maybe<StringQueryOperatorInput>
  workboxConfig?: Maybe<SitePluginPluginOptionsWorkboxConfigFilterInput>
  output?: Maybe<StringQueryOperatorInput>
  exclude?: Maybe<StringQueryOperatorInput>
  createLinkInHead?: Maybe<BooleanQueryOperatorInput>
  bucketName?: Maybe<StringQueryOperatorInput>
  protocol?: Maybe<StringQueryOperatorInput>
  hostname?: Maybe<StringQueryOperatorInput>
  generateMatchPathRewrites?: Maybe<BooleanQueryOperatorInput>
  pathCheck?: Maybe<BooleanQueryOperatorInput>
}

export type SitePluginPluginOptionsGoogle = {
  __typename?: 'SitePluginPluginOptionsGoogle'
  families?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePluginPluginOptionsGoogleFilterInput = {
  families?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsPlugins = {
  __typename?: 'SitePluginPluginOptionsPlugins'
  resolve?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  pluginOptions?: Maybe<SitePluginPluginOptionsPluginsPluginOptions>
  nodeAPIs?: Maybe<Array<Maybe<Scalars['String']>>>
  browserAPIs?: Maybe<Array<Maybe<Scalars['String']>>>
  ssrAPIs?: Maybe<Array<Maybe<Scalars['String']>>>
  pluginFilepath?: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsPluginsFilterInput = {
  resolve?: Maybe<StringQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
  pluginOptions?: Maybe<SitePluginPluginOptionsPluginsPluginOptionsFilterInput>
  nodeAPIs?: Maybe<StringQueryOperatorInput>
  browserAPIs?: Maybe<StringQueryOperatorInput>
  ssrAPIs?: Maybe<StringQueryOperatorInput>
  pluginFilepath?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsPluginsFilterListInput = {
  elemMatch?: Maybe<SitePluginPluginOptionsPluginsFilterInput>
}

export type SitePluginPluginOptionsPluginsPluginOptions = {
  __typename?: 'SitePluginPluginOptionsPluginsPluginOptions'
  offsetY?: Maybe<Scalars['Int']>
  className?: Maybe<Scalars['String']>
  replacements?: Maybe<SitePluginPluginOptionsPluginsPluginOptionsReplacements>
  wrapperStyle?: Maybe<Scalars['String']>
  maxWidth?: Maybe<Scalars['Int']>
  backgroundColor?: Maybe<Scalars['String']>
  linkImagesToOriginal?: Maybe<Scalars['Boolean']>
  showCaptions?: Maybe<Scalars['Boolean']>
  markdownCaptions?: Maybe<Scalars['Boolean']>
  sizeByPixelDensity?: Maybe<Scalars['Boolean']>
  quality?: Maybe<Scalars['Int']>
  withWebp?: Maybe<Scalars['Boolean']>
  tracedSVG?: Maybe<Scalars['Boolean']>
  loading?: Maybe<Scalars['String']>
  disableBgImageOnAlpha?: Maybe<Scalars['Boolean']>
  disableBgImage?: Maybe<Scalars['Boolean']>
  noInlineHighlight?: Maybe<Scalars['Boolean']>
}

export type SitePluginPluginOptionsPluginsPluginOptionsFilterInput = {
  offsetY?: Maybe<IntQueryOperatorInput>
  className?: Maybe<StringQueryOperatorInput>
  replacements?: Maybe<SitePluginPluginOptionsPluginsPluginOptionsReplacementsFilterInput>
  wrapperStyle?: Maybe<StringQueryOperatorInput>
  maxWidth?: Maybe<IntQueryOperatorInput>
  backgroundColor?: Maybe<StringQueryOperatorInput>
  linkImagesToOriginal?: Maybe<BooleanQueryOperatorInput>
  showCaptions?: Maybe<BooleanQueryOperatorInput>
  markdownCaptions?: Maybe<BooleanQueryOperatorInput>
  sizeByPixelDensity?: Maybe<BooleanQueryOperatorInput>
  quality?: Maybe<IntQueryOperatorInput>
  withWebp?: Maybe<BooleanQueryOperatorInput>
  tracedSVG?: Maybe<BooleanQueryOperatorInput>
  loading?: Maybe<StringQueryOperatorInput>
  disableBgImageOnAlpha?: Maybe<BooleanQueryOperatorInput>
  disableBgImage?: Maybe<BooleanQueryOperatorInput>
  noInlineHighlight?: Maybe<BooleanQueryOperatorInput>
}

export type SitePluginPluginOptionsPluginsPluginOptionsReplacements = {
  __typename?: 'SitePluginPluginOptionsPluginsPluginOptionsReplacements'
  ANDROID_VERSION?: Maybe<Scalars['String']>
  ANDROID_TRAY_VERSION?: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsPluginsPluginOptionsReplacementsFilterInput = {
  ANDROID_VERSION?: Maybe<StringQueryOperatorInput>
  ANDROID_TRAY_VERSION?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsReplacements = {
  __typename?: 'SitePluginPluginOptionsReplacements'
  ANDROID_VERSION?: Maybe<Scalars['String']>
  ANDROID_TRAY_VERSION?: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsReplacementsFilterInput = {
  ANDROID_VERSION?: Maybe<StringQueryOperatorInput>
  ANDROID_TRAY_VERSION?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsWorkboxConfig = {
  __typename?: 'SitePluginPluginOptionsWorkboxConfig'
  runtimeCaching?: Maybe<
    Array<Maybe<SitePluginPluginOptionsWorkboxConfigRuntimeCaching>>
  >
}

export type SitePluginPluginOptionsWorkboxConfigFilterInput = {
  runtimeCaching?: Maybe<SitePluginPluginOptionsWorkboxConfigRuntimeCachingFilterListInput>
}

export type SitePluginPluginOptionsWorkboxConfigRuntimeCaching = {
  __typename?: 'SitePluginPluginOptionsWorkboxConfigRuntimeCaching'
  handler?: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsWorkboxConfigRuntimeCachingFilterInput = {
  handler?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsWorkboxConfigRuntimeCachingFilterListInput = {
  elemMatch?: Maybe<SitePluginPluginOptionsWorkboxConfigRuntimeCachingFilterInput>
}

export type SitePluginSortInput = {
  fields?: Maybe<Array<Maybe<SitePluginFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteSiteMetadata = {
  __typename?: 'SiteSiteMetadata'
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  author?: Maybe<Scalars['String']>
  contact?: Maybe<SiteSiteMetadataContact>
  siteUrl?: Maybe<Scalars['String']>
  logo?: Maybe<Scalars['String']>
  social?: Maybe<SiteSiteMetadataSocial>
  team?: Maybe<Array<Maybe<SiteSiteMetadataTeam>>>
  events?: Maybe<Array<Maybe<SiteSiteMetadataEvents>>>
  redirects?: Maybe<Array<Maybe<SiteSiteMetadataRedirects>>>
}

export type SiteSiteMetadataContact = {
  __typename?: 'SiteSiteMetadataContact'
  email?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
}

export type SiteSiteMetadataContactFilterInput = {
  email?: Maybe<StringQueryOperatorInput>
  phone?: Maybe<StringQueryOperatorInput>
}

export type SiteSiteMetadataEvents = {
  __typename?: 'SiteSiteMetadataEvents'
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  month?: Maybe<Scalars['String']>
  day?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['String']>
  locationLine1?: Maybe<Scalars['String']>
  locationLine2?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type SiteSiteMetadataEventsFilterInput = {
  title?: Maybe<StringQueryOperatorInput>
  description?: Maybe<StringQueryOperatorInput>
  month?: Maybe<StringQueryOperatorInput>
  day?: Maybe<StringQueryOperatorInput>
  time?: Maybe<StringQueryOperatorInput>
  locationLine1?: Maybe<StringQueryOperatorInput>
  locationLine2?: Maybe<StringQueryOperatorInput>
  url?: Maybe<StringQueryOperatorInput>
}

export type SiteSiteMetadataEventsFilterListInput = {
  elemMatch?: Maybe<SiteSiteMetadataEventsFilterInput>
}

export type SiteSiteMetadataFilterInput = {
  title?: Maybe<StringQueryOperatorInput>
  description?: Maybe<StringQueryOperatorInput>
  author?: Maybe<StringQueryOperatorInput>
  contact?: Maybe<SiteSiteMetadataContactFilterInput>
  siteUrl?: Maybe<StringQueryOperatorInput>
  logo?: Maybe<StringQueryOperatorInput>
  social?: Maybe<SiteSiteMetadataSocialFilterInput>
  team?: Maybe<SiteSiteMetadataTeamFilterListInput>
  events?: Maybe<SiteSiteMetadataEventsFilterListInput>
  redirects?: Maybe<SiteSiteMetadataRedirectsFilterListInput>
}

export type SiteSiteMetadataRedirects = {
  __typename?: 'SiteSiteMetadataRedirects'
  from?: Maybe<Scalars['String']>
  to?: Maybe<Scalars['String']>
  permanent?: Maybe<Scalars['Boolean']>
}

export type SiteSiteMetadataRedirectsFilterInput = {
  from?: Maybe<StringQueryOperatorInput>
  to?: Maybe<StringQueryOperatorInput>
  permanent?: Maybe<BooleanQueryOperatorInput>
}

export type SiteSiteMetadataRedirectsFilterListInput = {
  elemMatch?: Maybe<SiteSiteMetadataRedirectsFilterInput>
}

export type SiteSiteMetadataSocial = {
  __typename?: 'SiteSiteMetadataSocial'
  facebook?: Maybe<Scalars['String']>
  forum?: Maybe<Scalars['String']>
  github?: Maybe<Scalars['String']>
  linkedin?: Maybe<Scalars['String']>
  stackoverflow?: Maybe<Scalars['String']>
  twitter?: Maybe<Scalars['String']>
  youtube?: Maybe<Scalars['String']>
}

export type SiteSiteMetadataSocialFilterInput = {
  facebook?: Maybe<StringQueryOperatorInput>
  forum?: Maybe<StringQueryOperatorInput>
  github?: Maybe<StringQueryOperatorInput>
  linkedin?: Maybe<StringQueryOperatorInput>
  stackoverflow?: Maybe<StringQueryOperatorInput>
  twitter?: Maybe<StringQueryOperatorInput>
  youtube?: Maybe<StringQueryOperatorInput>
}

export type SiteSiteMetadataTeam = {
  __typename?: 'SiteSiteMetadataTeam'
  key?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  bio?: Maybe<Scalars['String']>
  external?: Maybe<Scalars['Boolean']>
  social?: Maybe<SiteSiteMetadataTeamSocial>
}

export type SiteSiteMetadataTeamFilterInput = {
  key?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  image?: Maybe<StringQueryOperatorInput>
  title?: Maybe<StringQueryOperatorInput>
  bio?: Maybe<StringQueryOperatorInput>
  external?: Maybe<BooleanQueryOperatorInput>
  social?: Maybe<SiteSiteMetadataTeamSocialFilterInput>
}

export type SiteSiteMetadataTeamFilterListInput = {
  elemMatch?: Maybe<SiteSiteMetadataTeamFilterInput>
}

export type SiteSiteMetadataTeamSocial = {
  __typename?: 'SiteSiteMetadataTeamSocial'
  twitter?: Maybe<Scalars['String']>
  linkedin?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type SiteSiteMetadataTeamSocialFilterInput = {
  twitter?: Maybe<StringQueryOperatorInput>
  linkedin?: Maybe<StringQueryOperatorInput>
  email?: Maybe<StringQueryOperatorInput>
}

export type SiteSortInput = {
  fields?: Maybe<Array<Maybe<SiteFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export enum SortOrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StaticImage = Node & {
  __typename?: 'StaticImage'
  id: Scalars['ID']
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  sourceInstanceName?: Maybe<Scalars['String']>
  relativePath?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  prettySize?: Maybe<Scalars['String']>
  modifiedTime?: Maybe<Scalars['Date']>
  accessTime?: Maybe<Scalars['Date']>
  changeTime?: Maybe<Scalars['Date']>
  birthTime?: Maybe<Scalars['Date']>
  root?: Maybe<Scalars['String']>
  dir?: Maybe<Scalars['String']>
  base?: Maybe<Scalars['String']>
  ext?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  absolutePath?: Maybe<Scalars['String']>
  relativeDirectory?: Maybe<Scalars['String']>
  dev?: Maybe<Scalars['Int']>
  mode?: Maybe<Scalars['Int']>
  nlink?: Maybe<Scalars['Int']>
  uid?: Maybe<Scalars['Int']>
  rdev?: Maybe<Scalars['Int']>
  blksize?: Maybe<Scalars['Int']>
  ino?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Int']>
  blocks?: Maybe<Scalars['Int']>
  atimeMs?: Maybe<Scalars['Float']>
  mtimeMs?: Maybe<Scalars['Float']>
  ctimeMs?: Maybe<Scalars['Float']>
  birthtimeMs?: Maybe<Scalars['Float']>
  atime?: Maybe<Scalars['Date']>
  mtime?: Maybe<Scalars['Date']>
  ctime?: Maybe<Scalars['Date']>
  birthtime?: Maybe<Scalars['Date']>
}

export type StaticImageModifiedTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type StaticImageAccessTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type StaticImageChangeTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type StaticImageBirthTimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type StaticImageAtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type StaticImageMtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type StaticImageCtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type StaticImageBirthtimeArgs = {
  formatString?: Maybe<Scalars['String']>
  fromNow?: Maybe<Scalars['Boolean']>
  difference?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
}

export type StaticImageConnection = {
  __typename?: 'StaticImageConnection'
  totalCount: Scalars['Int']
  edges: Array<StaticImageEdge>
  nodes: Array<StaticImage>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  group: Array<StaticImageGroupConnection>
}

export type StaticImageConnectionDistinctArgs = {
  field: StaticImageFieldsEnum
}

export type StaticImageConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  field: StaticImageFieldsEnum
}

export type StaticImageEdge = {
  __typename?: 'StaticImageEdge'
  next?: Maybe<StaticImage>
  node: StaticImage
  previous?: Maybe<StaticImage>
}

export enum StaticImageFieldsEnum {
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type',
  SourceInstanceName = 'sourceInstanceName',
  RelativePath = 'relativePath',
  Extension = 'extension',
  PrettySize = 'prettySize',
  ModifiedTime = 'modifiedTime',
  AccessTime = 'accessTime',
  ChangeTime = 'changeTime',
  BirthTime = 'birthTime',
  Root = 'root',
  Dir = 'dir',
  Base = 'base',
  Ext = 'ext',
  Name = 'name',
  AbsolutePath = 'absolutePath',
  RelativeDirectory = 'relativeDirectory',
  Dev = 'dev',
  Mode = 'mode',
  Nlink = 'nlink',
  Uid = 'uid',
  Rdev = 'rdev',
  Blksize = 'blksize',
  Ino = 'ino',
  Size = 'size',
  Blocks = 'blocks',
  AtimeMs = 'atimeMs',
  MtimeMs = 'mtimeMs',
  CtimeMs = 'ctimeMs',
  BirthtimeMs = 'birthtimeMs',
  Atime = 'atime',
  Mtime = 'mtime',
  Ctime = 'ctime',
  Birthtime = 'birthtime'
}

export type StaticImageFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
}

export type StaticImageGroupConnection = {
  __typename?: 'StaticImageGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<StaticImageEdge>
  nodes: Array<StaticImage>
  pageInfo: PageInfo
  field: Scalars['String']
  fieldValue?: Maybe<Scalars['String']>
}

export type StaticImageSortInput = {
  fields?: Maybe<Array<Maybe<StaticImageFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type StringQueryOperatorInput = {
  eq?: Maybe<Scalars['String']>
  ne?: Maybe<Scalars['String']>
  in?: Maybe<Array<Maybe<Scalars['String']>>>
  nin?: Maybe<Array<Maybe<Scalars['String']>>>
  regex?: Maybe<Scalars['String']>
  glob?: Maybe<Scalars['String']>
}

export type TransformOptions = {
  grayscale?: Maybe<Scalars['Boolean']>
  duotone?: Maybe<DuotoneGradient>
  rotate?: Maybe<Scalars['Int']>
  trim?: Maybe<Scalars['Float']>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
}

export type WebPOptions = {
  quality?: Maybe<Scalars['Int']>
}
