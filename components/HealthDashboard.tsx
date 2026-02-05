'use client'

import React, { useMemo } from 'react'
import { getClientHealthData } from '../data/mockData'
import { ClientHealth, RiskTier } from '../types'

export default function HealthDashboard() {
  const accounts = React.useMemo(() => getClientHealthData(), [])

  const getRiskTierColor = (tier: RiskTier) => {
    const colors = {
      Healthy: 'bg-green-100 text-green-800',
      Watch: 'bg-yellow-100 text-yellow-800',
      'At-Risk': 'bg-orange-100 text-orange-800',
      Critical: 'bg-red-100 text-red-800',
      Expansion: 'bg-blue-100 text-blue-800',
    }
    return colors[tier]
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 font-semibold'
    if (score >= 60) return 'text-yellow-600 font-semibold'
    if (score >= 40) return 'text-orange-600 font-semibold'
    return 'text-red-600 font-semibold'
  }

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      success: 'text-green-600',
      failed: 'text-red-600',
      pending: 'text-yellow-600',
      refunded: 'text-orange-600',
    }
    return colors[status as keyof typeof colors] || 'text-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System State</h1>
        <p className="text-gray-600 mt-1">Account risk triage and operational status</p>
      </div>

      {/* Account Risk Triage Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Account Risk Triage</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Risk Signal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage Δ 7d</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change Over Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Meaningful Signal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets 14d</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mitigation Path</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Owner</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => {
                const lastSignalDate = new Date(account.last_touch_date)
                const daysSinceSignal = Math.floor((Date.now() - lastSignalDate.getTime()) / (1000 * 60 * 60 * 24))
                const lastSignalText = daysSinceSignal === 0 ? 'Today' : daysSinceSignal === 1 ? '1 day ago' : `${daysSinceSignal} days ago`
                
                return (
                  <tr key={account.account_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{account.account_name}</div>
                      <div className="text-xs text-gray-500">{account.account_id}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getHealthScoreColor(account.health_score)}`}>
                      {account.health_score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskTierColor(account.risk_tier)}`}>
                        {account.risk_tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs">{account.primary_risk_signal || 'No primary signal'}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${account.last_7d_usage_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {account.last_7d_usage_change >= 0 ? '+' : ''}{account.last_7d_usage_change.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex flex-col">
                        <span>Usage: {account.last_7d_usage_change >= 0 ? '+' : ''}{account.last_7d_usage_change.toFixed(1)}%</span>
                        <span className="text-xs text-gray-500">Response: {account.avg_response_time.toFixed(1)}h avg</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {lastSignalText}
                      <div className="text-xs text-gray-500 mt-0.5">
                        {new Date(account.last_touch_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.tickets_last_14d}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.avg_response_time.toFixed(1)}h</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPaymentStatusColor(account.last_payment_status)}`}>
                      {account.last_payment_status.charAt(0).toUpperCase() + account.last_payment_status.slice(1)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="truncate" title={account.recommended_action}>
                        {account.recommended_action}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{account.plan_tier}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{account.owner}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
