'use client'

import React, { useState } from 'react'
import { getKPIs, getClientHealthData } from '../data/mockData'
import { RiskTier } from '../types'

export default function Overview() {
  const kpis = React.useMemo(() => getKPIs(), [])
  const accounts = React.useMemo(() => getClientHealthData(), [])
  const [showDetectionGaps, setShowDetectionGaps] = useState(false)
  
  const [showBlindSpots, setShowBlindSpots] = useState(false)
  
  const riskDistribution = React.useMemo(() => {
    const dist: Record<RiskTier, number> = {
      'Healthy': 0,
      'Watch': 0,
      'At-Risk': 0,
      'Critical': 0,
      'Expansion': 0,
    }
    accounts.forEach(account => {
      dist[account.risk_tier] = (dist[account.risk_tier] || 0) + 1
    })
    return dist
  }, [accounts])

  // Calculate risk drivers
  const usageDegradation = accounts.filter(a => a.last_7d_usage_change < -10).length
  const responseLatencyDrift = accounts.filter(a => a.avg_response_time > 12).length
  const paymentInstability = accounts.filter(a => a.last_payment_status === 'failed' || a.last_payment_status === 'pending').length
  
  const totalMRR = accounts.reduce((sum, a) => sum + a.mrr, 0)
  const revenueExposure = kpis.mrrAtRisk
  const upsellSuppression = accounts.filter(a => a.expansion_signal && (a.risk_tier === 'At-Risk' || a.risk_tier === 'Critical')).length

  return (
    <div className="space-y-6">
      {/* System Assessment */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Current system assessment</h2>
        <p className="text-gray-700 mb-2">
          Client health is degrading in a subset of accounts driven by declining usage and delayed responses. Payment failures are secondary effects, not primary causes.
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Confidence:</span> Moderate (signal coverage gaps in usage quality).
        </p>
      </div>

      {/* Primary Risk Drivers */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Primary risk drivers</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">Usage degradation</span>
            <span className="font-semibold text-gray-900">{usageDegradation} accounts</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">Response latency drift</span>
            <span className="font-semibold text-gray-900">{responseLatencyDrift} accounts</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-700">Payment instability</span>
            <span className="font-semibold text-gray-900">{paymentInstability} accounts</span>
          </div>
        </div>
      </div>

      {/* Secondary Effects */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Secondary effects</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">Revenue exposure</span>
            <span className="font-semibold text-gray-900">${(revenueExposure / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-700">Upsell suppression</span>
            <span className="font-semibold text-gray-900">{upsellSuppression} accounts</span>
          </div>
        </div>
      </div>

      {/* Detection Gaps */}
      <div className="bg-white rounded-lg shadow p-6">
        <button
          onClick={() => setShowDetectionGaps(!showDetectionGaps)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-lg font-semibold text-gray-900">Detection gaps</h2>
          <span className="text-gray-500">{showDetectionGaps ? '−' : '+'}</span>
        </button>
        {showDetectionGaps && (
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div>• Usage quality drift not tracked</div>
            <div>• No leading indicator for response-time fatigue</div>
            <div>• Payment failures detected only after retries exhausted</div>
          </div>
        )}
      </div>

      {/* Known Blind Spots */}
      <div className="bg-white rounded-lg shadow p-6 border border-yellow-200 bg-yellow-50">
        <button
          onClick={() => setShowBlindSpots(!showBlindSpots)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-lg font-semibold text-gray-900">Known blind spots</h2>
          <span className="text-gray-500">{showBlindSpots ? '−' : '+'}</span>
        </button>
        {showBlindSpots && (
          <div className="mt-4 text-sm text-gray-700">
            <p className="mb-2">Usage depth is inferred, not directly measured. Health score confidence is lower for low-touch accounts.</p>
            <p>Signal coverage gaps exist in usage quality metrics. Response time fatigue indicators require manual review.</p>
          </div>
        )}
      </div>

      {/* Risk Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk tier distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(['Healthy', 'Watch', 'At-Risk', 'Critical', 'Expansion'] as RiskTier[]).map((tier) => {
            const count = riskDistribution[tier] || 0
            const percentage = accounts.length > 0 ? (count / accounts.length) * 100 : 0
            const colors = {
              Healthy: 'bg-green-100 text-green-800',
              Watch: 'bg-yellow-100 text-yellow-800',
              'At-Risk': 'bg-orange-100 text-orange-800',
              Critical: 'bg-red-100 text-red-800',
              Expansion: 'bg-blue-100 text-blue-800',
            }
            
            return (
              <div key={tier} className="text-center">
                <div className={`${colors[tier]} rounded-lg p-4 mb-2`}>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm font-medium">{tier}</div>
                </div>
                <div className="text-xs text-gray-500">{percentage.toFixed(0)}%</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total accounts</h3>
          <div className="text-3xl font-bold text-gray-900">{accounts.length}</div>
          <div className="text-xs text-gray-500 mt-1">Active monitoring</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total MRR</h3>
          <div className="text-3xl font-bold text-gray-900">
            ${(totalMRR / 1000).toFixed(0)}k
          </div>
          <div className="text-xs text-gray-500 mt-1">Monthly recurring revenue</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Avg health score</h3>
          <div className="text-3xl font-bold text-gray-900">
            {accounts.length > 0 ? Math.round(accounts.reduce((sum, a) => sum + a.health_score, 0) / accounts.length) : 0}
          </div>
          <div className="text-xs text-gray-500 mt-1">Out of 100</div>
        </div>
      </div>
    </div>
  )
}
