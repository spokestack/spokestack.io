import { Mdx } from './utils/graphql'

export interface Link {
  title: string
  href: string
}

// Added by createPage to templates in gatsby-node.js
export interface PageContext {
  author: string
  currentPage: number
  dev: boolean
  limit: number
  next: Mdx
  numPages: number
  related: {
    blog: Link[]
    docs: Link[]
    tutorials: Link[]
  }
  previous: Mdx
  skip: number
  slug: string
  tag: string
  tags: string[]
  total: number
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
  modelUrl?: string
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
