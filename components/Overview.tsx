'use client'

import React from 'react'
import { AlertTriangle, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import { getKPIs, getClientHealthData } from '../data/mockData'
import { RiskTier } from '../types'

export default function Overview() {
  const kpis = React.useMemo(() => getKPIs(), [])
  const accounts = React.useMemo(() => getClientHealthData(), [])
  
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

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">Client Health Monitoring</h1>
        <p className="text-xl text-blue-100 mb-6">
          Churn Risk Alerts and Health Score Monitoring in n8n
        </p>
        <p className="text-blue-100 mb-6 max-w-3xl">
          A production-ready n8n automation that monitors client health signals across revenue, 
          usage, and support, computes risk scores, and routes alerts and summaries to Slack, 
          Notion, and dashboards.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {['n8n', 'Stripe', 'HubSpot/CRM', 'Zendesk/Intercom', 'Product Events API', 'Slack Alerts', 'Scoring Model', 'Run Logs'].map((badge) => (
            <span key={badge} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {badge}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            View Workflow Schematic
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors">
            View Health Score Schema
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Accounts at Risk"
          value={kpis.accountsAtRisk.toString()}
          subtitle={`${riskDistribution['At-Risk'] || 0} At-Risk, ${riskDistribution['Critical'] || 0} Critical`}
          icon={AlertTriangle}
          color="red"
        />
        <KPICard
          title="MRR at Risk"
          value={`$${(kpis.mrrAtRisk / 1000).toFixed(1)}k`}
          subtitle={`${((kpis.mrrAtRisk / accounts.reduce((sum, a) => sum + a.mrr, 0)) * 100).toFixed(1)}% of total MRR`}
          icon={DollarSign}
          color="orange"
        />
        <KPICard
          title="Trending Down"
          value={kpis.accountsTrendingDown.toString()}
          subtitle="Usage declining 7d"
          icon={TrendingDown}
          color="yellow"
        />
        <KPICard
          title="Expansion Opportunities"
          value={kpis.expansionOpportunities.toString()}
          subtitle="Ready for upsell"
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Risk Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Distribution</h2>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Accounts</h3>
          <div className="text-3xl font-bold text-gray-900">{accounts.length}</div>
          <div className="text-sm text-gray-500 mt-2">Active monitoring</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total MRR</h3>
          <div className="text-3xl font-bold text-gray-900">
            ${(accounts.reduce((sum, a) => sum + a.mrr, 0) / 1000).toFixed(0)}k
          </div>
          <div className="text-sm text-gray-500 mt-2">Monthly recurring revenue</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Avg Health Score</h3>
          <div className="text-3xl font-bold text-gray-900">
            {accounts.length > 0 ? Math.round(accounts.reduce((sum, a) => sum + a.health_score, 0) / accounts.length) : 0}
          </div>
          <div className="text-sm text-gray-500 mt-2">Out of 100</div>
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value, subtitle, icon: Icon, color }: {
  title: string
  value: string
  subtitle?: string
  icon: any
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue'
}) {
  const colorClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}
