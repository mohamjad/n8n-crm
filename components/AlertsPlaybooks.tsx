'use client'

import React from 'react'

export default function AlertsPlaybooks() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Failure Response</h1>
        <p className="text-gray-600 mt-1">Automated risk detection and intervention workflows</p>
      </div>

      {/* Intervention Types */}
      <div className="space-y-6">
        {/* Critical Risk Intervention */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Intervention Type A: Critical</h2>
            </div>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
              Critical
            </span>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Trigger Conditions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Failed payment detected</li>
              <li>Usage drop &gt; 20% in last 7 days</li>
              <li>Ticket spike (&gt;5 tickets in 14 days)</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Automated Actions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Slack alert sent to account owner</li>
              <li>Slack notification to CS team channel</li>
              <li>CRM task created: &quot;Intervene before renewal window&quot;</li>
              <li>Account tagged as &quot;Critical&quot; in dashboard</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start">
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Slack Message Example</div>
                <div className="bg-white rounded p-3 text-sm">
                  <div className="font-semibold text-red-600 mb-1">Critical Risk Alert</div>
                  <div className="text-gray-700 mb-2">
                    <strong>[REDACTED]</strong> ([REDACTED]) requires immediate attention:
                  </div>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Payment failed on last attempt</li>
                    <li>• Usage dropped 28.3% in last 7 days</li>
                    <li>• 8 support tickets in last 14 days</li>
                  </ul>
                  <div className="mt-2 text-gray-500 text-xs">
                    Recommended action: Intervene before renewal window
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Watchlist Intervention */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Intervention Type B: Watch</h2>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
              Watch
            </span>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Trigger Conditions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Usage declining 2+ weeks in a row</li>
              <li>Usage drop &gt; 10% week-over-week</li>
              <li>No critical payment issues</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Automated Actions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Slack digest notification (daily summary)</li>
              <li>Account tagged as &quot;Watch&quot; in dashboard</li>
              <li>CRM task created: &quot;Monitor — no action yet&quot;</li>
              <li>Added to weekly review list</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start">
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Slack Message Example</div>
                <div className="bg-white rounded p-3 text-sm">
                  <div className="font-semibold text-yellow-600 mb-1">Watchlist Alert</div>
                  <div className="text-gray-700 mb-2">
                    <strong>[REDACTED]</strong> ([REDACTED]) showing declining usage:
                  </div>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Usage down 8.2% in last 7 days</li>
                    <li>• Second consecutive week of decline</li>
                    <li>• 5 tickets in last 14 days</li>
                  </ul>
                  <div className="mt-2 text-gray-500 text-xs">
                    Recommended action: Monitor — no action yet
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Positive Deviation Intervention */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Intervention Type C: Positive Deviation</h2>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              Positive Signal
            </span>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Trigger Conditions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Usage up &gt; 20% in last 7 days</li>
              <li>Low ticket volume (&lt; 3 tickets in 14 days)</li>
              <li>High NPS score (&gt; 8) or positive sentiment</li>
              <li>Sustained growth trend</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Automated Actions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Slack notification to sales team</li>
              <li>CRM task created: &quot;Manual outreach recommended due to weak signal confidence&quot;</li>
              <li>Account tagged as &quot;Expansion&quot; in dashboard</li>
              <li>Added to QBR preparation list</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start">
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Slack Message Example</div>
                <div className="bg-white rounded p-3 text-sm">
                  <div className="font-semibold text-blue-600 mb-1">Positive Deviation Detected</div>
                  <div className="text-gray-700 mb-2">
                    <strong>[REDACTED]</strong> ([REDACTED]) showing sustained engagement increase:
                  </div>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Usage up 35.2% in last 7 days</li>
                    <li>• Only 1 ticket in last 14 days</li>
                    <li>• High engagement and satisfaction</li>
                  </ul>
                  <div className="mt-2 text-gray-500 text-xs">
                    Recommended action: Manual outreach recommended due to weak signal confidence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intervention Routing Logic */}
      <div className="bg-gray-50 rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Intervention Routing Logic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Critical &amp; At-Risk</h3>
            <p className="text-sm text-gray-600">
              Immediate Slack alerts + CRM tasks + Dashboard tagging. Escalated to account owner and CS manager.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Watch</h3>
            <p className="text-sm text-gray-600">
              Daily digest notifications + Dashboard tagging. Added to weekly review queue.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Positive Deviation</h3>
            <p className="text-sm text-gray-600">
              Sales team notifications + CRM tasks. Included in QBR preparation.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Healthy</h3>
            <p className="text-sm text-gray-600">
              No interventions. Included in weekly summary reports. Continue standard engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
