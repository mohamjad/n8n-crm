'use client'

import React from 'react'

export default function Documentation() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
        <p className="text-gray-600 mt-1">System architecture, risk detection, and intervention workflows</p>
      </div>

      {/* System Architecture */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">System Architecture</h2>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="border-l-4 border-gray-300 pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Scheduled Data Collection</h3>
            <p className="text-gray-700">
              Every morning at 8:00 AM, the automation workflow triggers. It pulls the current active customer 
              list from CRM or billing system, segments accounts by plan tier, owner, and region, then prepares 
              parallel API requests to all connected systems.
            </p>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-gray-300 pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Parallel Signal Collection</h3>
            <p className="text-gray-700 mb-2">
              The system executes parallel API pulls from multiple sources:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Billing (Stripe):</strong> MRR, failed payments, refunds, downgrades, cancellations</li>
              <li><strong>CRM (HubSpot/Salesforce):</strong> Last touch, stage changes, open tasks</li>
              <li><strong>Support (Zendesk/Intercom):</strong> Ticket count, response time, sentiment, unresolved backlog</li>
              <li><strong>Usage (Product Events API):</strong> Weekly active users, feature adoption, usage drop-off</li>
              <li><strong>Optional:</strong> NPS/CSAT scores and trends</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-gray-300 pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Data Normalization &amp; Feature Engineering</h3>
            <p className="text-gray-700">
              Raw data from different sources is normalized into a canonical client-health schema. 
              Feature engineering computes deltas (week-over-week changes) and trend indicators 
              (declining usage, ticket spikes, payment failures).
            </p>
          </div>

          {/* Step 4 */}
          <div className="border-l-4 border-gray-300 pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Risk Scoring Engine</h3>
            <p className="text-gray-700 mb-2">
              The system computes a health score (0-100) using weighted signals:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Billing risk:</strong> Failed payments, downgrades, refund activity</li>
              <li><strong>Usage risk:</strong> WAU drop, feature adoption decline</li>
              <li><strong>Support risk:</strong> Ticket spike, negative sentiment, backlog</li>
              <li><strong>Engagement risk:</strong> No CRM touches, missed QBRs</li>
              <li><strong>Expansion signals:</strong> Sustained usage growth, new seats, high NPS</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Scores are mapped into risk tiers: <strong>Healthy</strong> / <strong>Watch</strong> / 
              <strong> At-Risk</strong> / <strong>Critical</strong> / <strong>Expansion</strong>
            </p>
          </div>

          {/* Step 5 */}
          <div className="border-l-4 border-gray-300 pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Decision Router &amp; Alerts</h3>
            <p className="text-gray-700 mb-2">
              Based on risk tier and trigger conditions, the system routes accounts to appropriate actions:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Critical/At-Risk:</strong> Immediate Slack alerts to owner + CS team, CRM tasks created</li>
              <li><strong>Watch:</strong> Daily digest notifications, dashboard tagging</li>
              <li><strong>Expansion:</strong> Sales team notifications, upsell tasks</li>
              <li><strong>Healthy:</strong> Included in weekly summaries only</li>
            </ul>
          </div>

          {/* Step 6 */}
          <div className="border-l-4 border-gray-300 pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">6. Dashboard Updates &amp; Logging</h3>
            <p className="text-gray-700">
              Health scores and risk tiers are written to dashboard storage (Notion/Airtable/Sheets/Postgres). 
              Weekly summaries compile changes, risks, and opportunities. All runs are logged with audit trails, 
              execution times, and error alerts for monitoring and troubleshooting.
            </p>
          </div>
        </div>
      </div>

      {/* Failure Response Workflows */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Failure Response Workflows</h2>

        <div className="space-y-6">
          {/* Critical Risk Intervention */}
          <div className="border-l-4 border-red-500 pl-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Intervention Type A: Critical</h3>
              </div>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                Critical
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Trigger Conditions:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Failed payment detected</li>
                <li>Usage drop &gt; 20% in last 7 days</li>
                <li>Ticket spike (&gt;5 tickets in 14 days)</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Automated Actions:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Slack alert sent to account owner</li>
                <li>Slack notification to CS team channel</li>
                <li>CRM task created: &quot;Intervene before renewal window&quot;</li>
                <li>Account tagged as &quot;Critical&quot; in dashboard</li>
              </ul>
            </div>
          </div>

          {/* Watchlist Intervention */}
          <div className="border-l-4 border-yellow-500 pl-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Intervention Type B: Watch</h3>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                Watch
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Trigger Conditions:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Usage declining 2+ weeks in a row</li>
                <li>Usage drop &gt; 10% week-over-week</li>
                <li>No critical payment issues</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Automated Actions:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Slack digest notification (daily summary)</li>
                <li>Account tagged as &quot;Watch&quot; in dashboard</li>
                <li>CRM task created: &quot;Monitor — no action yet&quot;</li>
                <li>Added to weekly review list</li>
              </ul>
            </div>
          </div>

          {/* Positive Deviation Intervention */}
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Intervention Type C: Positive Deviation</h3>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                Positive Signal
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Trigger Conditions:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Usage up &gt; 20% in last 7 days</li>
                <li>Low ticket volume (&lt; 3 tickets in 14 days)</li>
                <li>High NPS score (&gt; 8) or positive sentiment</li>
                <li>Sustained growth trend</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Automated Actions:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Slack notification to sales team</li>
                <li>CRM task created: &quot;Manual outreach recommended due to weak signal confidence&quot;</li>
                <li>Account tagged as &quot;Expansion&quot; in dashboard</li>
                <li>Added to QBR preparation list</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Intervention Routing Logic */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Intervention Routing Logic</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Critical &amp; At-Risk</h4>
              <p className="text-sm text-gray-700">
                Immediate Slack alerts + CRM tasks + Dashboard tagging. Escalated to account owner and CS manager.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Watch</h4>
              <p className="text-sm text-gray-700">
                Daily digest notifications + Dashboard tagging. Added to weekly review queue.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Positive Deviation</h4>
              <p className="text-sm text-gray-700">
                Sales team notifications + CRM tasks. Included in QBR preparation.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Healthy</h4>
              <p className="text-sm text-gray-700">
                No interventions. Included in weekly summary reports. Continue standard engagement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring Model */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Scoring Model</h2>
        <p className="text-gray-700 mb-6">
          Scores are computed using weighted signals and trend deltas, then mapped into tiers with thresholds.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Risk Factors (Negative Impact)</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Billing:</strong> Failed payment (-20), Refund (-15), Downgrade (-10)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Usage:</strong> WAU drop &gt;20% (-15), Feature adoption decline (-10)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Support:</strong> Ticket spike &gt;5 (-10), Negative sentiment (-15), Backlog &gt;7 days (-10)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Engagement:</strong> No CRM touch &gt;30 days (-10), Missed QBR (-5)</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Positive Signals (Score Boost)</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Usage:</strong> Sustained growth &gt;20% (+10), New feature adoption (+5)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Support:</strong> Low ticket volume (&lt;3) (+5), Fast response (&lt;2h) (+5)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Engagement:</strong> Recent CRM touch (+5), QBR scheduled (+5)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Expansion:</strong> High NPS (&gt;8) (+10), Seat growth (+5)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Risk Tier Thresholds</h4>
          <div className="grid grid-cols-5 gap-2 text-sm">
            <div className="text-center">
              <div className="font-semibold text-green-600">80-100</div>
              <div className="text-gray-700">Healthy</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-600">Expansion</div>
              <div className="text-gray-700">Growth signals</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-yellow-600">60-79</div>
              <div className="text-gray-700">Watch</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-orange-600">40-59</div>
              <div className="text-gray-700">At-Risk</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-red-600">0-39</div>
              <div className="text-gray-700">Critical</div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Reliability */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Production Reliability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Retry Logic</h3>
            <p className="text-sm text-gray-700">
              Automatic retry for 429/5xx errors with exponential backoff. Handles API rate limits gracefully.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Idempotent Writes</h3>
            <p className="text-sm text-gray-700">
              All writes use (date, account_id) keys to prevent duplicates. Safe to rerun workflows.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Central Run Logging</h3>
            <p className="text-sm text-gray-700">
              Every execution logged with runId, counts, durations, and error context for audit trails.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Drift Detection</h3>
            <p className="text-sm text-gray-700">
              Monitors for missing data or sudden schema changes. Alerts on anomalies automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
