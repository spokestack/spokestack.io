import { FixedObject } from 'gatsby-image'
import { MarkdownRemark } from './utils/graphql'
import { MutableRefObject } from 'react'

// Added by createPage to templates in gatsby-node.js
export interface PageContext {
  author: string
  currentPage: number
  limit: number
  next: MarkdownRemark
  numPages: number
  related: RelatedLink[]
  previous: MarkdownRemark
  skip: number
  slug: string
  tag: string
  tags: string[]
}

export interface RelatedLink {
  title: string
  href: string
}

export interface StickyLink {
  forceSelect?: boolean
  href: string
  matchHash?: boolean
  navId?: string
  ref?: MutableRefObject<HTMLElement>
  refSelector?: string
  section?: string
  title: string
}

export interface SharpImage {
  childImageSharp: { fixed: FixedObject }
}

/**
 * Remote types for the Spokestack API
 */
export interface Account {
  apiKeys: ApiKeySummary[]
  displayName: string
  id: string
  insertedAt: string
}

export interface AccountSummary {
  displayName: string
  id: string
  isInvite: boolean
}

export interface ApiKey {
  displayName: string
  id: string
  insertedAt: number
  key: string
  type: KeyType
}

export interface ApiKeySummary {
  displayName: string
  id: string
  insertedAt: number
  type: KeyType
}

export enum KeyType {
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST'
}

export interface NluModel {
  id: string
  insertedAt: number
  modelUrl: string
  name: string
  source: NluModelSource
  state: NluModelState
  updatedAt: number
}

export enum NluModelSource {
  ACCOUNT = 'ACCOUNT',
  SHARED = 'SHARED'
}

export enum NluModelState {
  PUBLISHED = 'PUBLISHED',
  PENDING = 'PENDING'
}

export interface NluResult {
  confidence: number
  intent: string
  slots: NluSlot[]
}

export interface NluSlot {
  confidence: number
  key: string
  text: string | null
  value: string
}

export interface SynthesisResult {
  url: string
}

export interface Voice {
  name: string
  description: string
}
