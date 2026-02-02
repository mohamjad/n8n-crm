'use client'

import React, { useState } from 'react'
import Overview from '../components/Overview'
import HealthDashboard from '../components/HealthDashboard'
import AlertsPlaybooks from '../components/AlertsPlaybooks'
import HowItWorks from '../components/HowItWorks'
import Sidebar from '../components/Sidebar'
import { Tab } from '../types'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  React.useEffect(() => {
    console.log('Home component mounted, activeTab:', activeTab)
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="lg:pl-64">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'dashboard' && <HealthDashboard />}
          {activeTab === 'alerts' && <AlertsPlaybooks />}
          {activeTab === 'how-it-works' && <HowItWorks />}
        </div>
      </main>
    </div>
  )
}
