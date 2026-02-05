export type Tab = 'overview' | 'dashboard' | 'documentation'

export type RiskTier = 'Healthy' | 'Watch' | 'At-Risk' | 'Critical' | 'Expansion'

export interface ClientHealth {
  account_id: string
  account_name: string
  plan_tier: string
  mrr: number
  health_score: number
  risk_tier: RiskTier
  last_7d_usage_change: number
  tickets_last_14d: number
  avg_response_time: number
  last_payment_status: 'success' | 'failed' | 'pending' | 'refunded'
  last_touch_date: string
  expansion_signal: boolean
  recommended_action: string
  owner: string
  primary_risk_signal?: string
}
