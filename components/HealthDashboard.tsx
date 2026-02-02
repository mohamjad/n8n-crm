'use client'

import React, { useMemo } from 'react'
import { AlertTriangle, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import { getClientHealthData, getKPIs } from '../data/mockData'
import { ClientHealth, RiskTier } from '../types'

export default function HealthDashboard() {
  const accounts = React.useMemo(() => getClientHealthData(), [])
  const kpis = React.useMemo(() => getKPIs(), [])

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
        <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
        <p className="text-gray-600 mt-1">Client health scores and risk monitoring</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Accounts at Risk"
          value={kpis.accountsAtRisk.toString()}
          icon={AlertTriangle}
          color="red"
        />
        <KPICard
          title="MRR at Risk"
          value={`$${(kpis.mrrAtRisk / 1000).toFixed(1)}k`}
          icon={DollarSign}
          color="orange"
        />
        <KPICard
          title="Trending Down"
          value={kpis.accountsTrendingDown.toString()}
          icon={TrendingDown}
          color="yellow"
        />
        <KPICard
          title="Expansion Opportunities"
          value={kpis.expansionOpportunities.toString()}
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Health Dashboard Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Client Health Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage Δ 7d</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets 14d</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Touch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expansion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={account.account_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{account.account_name}</div>
                    <div className="text-xs text-gray-500">{account.account_id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.plan_tier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${account.mrr.toLocaleString()}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getHealthScoreColor(account.health_score)}`}>
                    {account.health_score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskTierColor(account.risk_tier)}`}>
                      {account.risk_tier}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${account.last_7d_usage_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {account.last_7d_usage_change >= 0 ? '+' : ''}{account.last_7d_usage_change.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.tickets_last_14d}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.avg_response_time.toFixed(1)}h</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPaymentStatusColor(account.last_payment_status)}`}>
                    {account.last_payment_status.charAt(0).toUpperCase() + account.last_payment_status.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(account.last_touch_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {account.expansion_signal ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate" title={account.recommended_action}>
                      {account.recommended_action}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value, icon: Icon, color }: {
  title: string
  value: string
  icon: any
  color: 'red' | 'orange' | 'yellow' | 'green'
}) {
  const colorClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}
