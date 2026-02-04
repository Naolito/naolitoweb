/**
 * Network speed detection utilities for adaptive upload configuration
 */

type NetworkSpeedTier = 'slow' | 'medium' | 'fast' | 'very-fast'

interface NetworkSpeedInfo {
  tier: NetworkSpeedTier
  estimatedMbps: number
  recommendedChunkSize: number
}

// Chunk sizes based on network speed
// Note: Cloudflare Stream requires minimum 5,242,880 bytes (5 MB) per chunk
const CHUNK_SIZES: Record<NetworkSpeedTier, number> = {
  slow: 5 * 1024 * 1024,      // 5 MB for < 5 Mbps (Cloudflare minimum)
  medium: 6 * 1024 * 1024,    // 6 MB for 5-20 Mbps
  fast: 8 * 1024 * 1024,      // 8 MB for 20-50 Mbps
  'very-fast': 10 * 1024 * 1024, // 10 MB for > 50 Mbps
}

const getTierFromMbps = (mbps: number): NetworkSpeedTier => {
  if (mbps < 5) return 'slow'
  if (mbps < 20) return 'medium'
  if (mbps < 50) return 'fast'
  return 'very-fast'
}

/**
 * Detect network speed using Navigator.connection API (if available)
 * Falls back to a conservative estimate
 */
export const detectNetworkSpeed = (): NetworkSpeedInfo => {
  // Try to use Network Information API
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection

  if (connection?.downlink) {
    const mbps = connection.downlink
    const tier = getTierFromMbps(mbps)
    return {
      tier,
      estimatedMbps: mbps,
      recommendedChunkSize: CHUNK_SIZES[tier],
    }
  }

  // Conservative default: assume medium speed
  return {
    tier: 'medium',
    estimatedMbps: 10,
    recommendedChunkSize: CHUNK_SIZES.medium,
  }
}

/**
 * Calculate optimal chunk size based on measured upload speed
 */
export const getAdaptiveChunkSize = (measuredSpeedMbps: number): number => {
  const tier = getTierFromMbps(measuredSpeedMbps)
  return CHUNK_SIZES[tier]
}

/**
 * Format speed for display
 */
export const formatSpeed = (bytesPerSecond: number): string => {
  const mbps = (bytesPerSecond * 8) / (1024 * 1024)
  if (mbps >= 1) {
    return `${mbps.toFixed(1)} Mbps`
  }
  const kbps = (bytesPerSecond * 8) / 1024
  return `${kbps.toFixed(0)} Kbps`
}

/**
 * Format ETA for display
 */
export const formatEta = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds <= 0) return ''

  if (seconds < 60) {
    return `~${Math.ceil(seconds)}s restantes`
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.ceil(seconds % 60)

  if (minutes < 60) {
    if (remainingSeconds > 0) {
      return `~${minutes}m ${remainingSeconds}s restantes`
    }
    return `~${minutes} min restantes`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `~${hours}h ${remainingMinutes}m restantes`
}

// TypeScript interface for Network Information API
interface NetworkInformation {
  downlink?: number
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g'
  rtt?: number
  saveData?: boolean
}
