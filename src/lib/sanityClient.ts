import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-02-19'
const token = import.meta.env.VITE_SANITY_READ_TOKEN
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== 'false'

export const hasSanityConfig = Boolean(projectId && dataset)

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token: token || undefined,
      useCdn,
      perspective: token ? 'published' : undefined,
    })
  : null
