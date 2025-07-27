"use client"
import { useState } from "react"
import { PrimaryButton, SecondaryButton } from "./Button"

interface SecuritySettings {
  twoFactorEnabled: boolean
  withdrawalConfirmation: boolean
  sessionTimeout: number
  trustedDevices: number
}

export function SecurityCenter() {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    withdrawalConfirmation: true,
    sessionTimeout: 30,
    trustedDevices: 1
  })
  
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [qrCodeUrl] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==") // Placeholder

  const handleToggleTwoFactor = () => {
    if (!settings.twoFactorEnabled) {
      setShowTwoFactorSetup(true)
    } else {
      // Disable 2FA
      setSettings(prev => ({ ...prev, twoFactorEnabled: false }))
    }
  }

  const handleVerifyTwoFactor = () => {
    if (verificationCode.length === 6) {
      setSettings(prev => ({ ...prev, twoFactorEnabled: true }))
      setShowTwoFactorSetup(false)
      setVerificationCode("")
      alert("Two-factor authentication enabled successfully!")
    } else {
      alert("Please enter a valid 6-digit code")
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Security Center</h2>
        
        {/* Security Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SecurityStatusCard 
            title="2FA Status"
            status={settings.twoFactorEnabled ? "Enabled" : "Disabled"}
            statusColor={settings.twoFactorEnabled ? "green" : "red"}
          />
          <SecurityStatusCard 
            title="Withdrawal Confirm"
            status={settings.withdrawalConfirmation ? "Required" : "Disabled"}
            statusColor={settings.withdrawalConfirmation ? "green" : "yellow"}
          />
          <SecurityStatusCard 
            title="Session Timeout"
            status={`${settings.sessionTimeout} min`}
            statusColor="blue"
          />
          <SecurityStatusCard 
            title="Trusted Devices"
            status={`${settings.trustedDevices} device(s)`}
            statusColor="blue"
          />
        </div>

        {/* Two-Factor Authentication */}
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
              <p className="text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded text-sm font-medium ${
                settings.twoFactorEnabled 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <SecondaryButton onClick={handleToggleTwoFactor}>
                {settings.twoFactorEnabled ? 'Disable' : 'Enable'}
              </SecondaryButton>
            </div>
          </div>
          
          {showTwoFactorSetup && (
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-4">Setup Two-Factor Authentication</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    1. Download an authenticator app like Google Authenticator or Authy
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    2. Scan this QR code with your authenticator app
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32 mx-auto bg-white border" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    3. Enter the 6-digit code from your authenticator app
                  </p>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-center text-xl font-mono tracking-widest mb-4"
                    maxLength={6}
                  />
                  <div className="space-x-3">
                    <PrimaryButton onClick={handleVerifyTwoFactor}>
                      Verify & Enable
                    </PrimaryButton>
                    <SecondaryButton onClick={() => setShowTwoFactorSetup(false)}>
                      Cancel
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Withdrawal Confirmation */}
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Withdrawal Confirmation</h3>
              <p className="text-gray-600">Require email confirmation for all withdrawals</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.withdrawalConfirmation}
                onChange={(e) => setSettings(prev => ({ ...prev, withdrawalConfirmation: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Session Settings */}
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Session Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={480}>8 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Active Sessions
              </label>
              <div className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
                <span>Current device</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Security Recommendations</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-3 ${settings.twoFactorEnabled ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Enable two-factor authentication
            </li>
            <li className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-3 ${settings.withdrawalConfirmation ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              Enable withdrawal confirmations
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Use strong, unique passwords
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Regularly review account activity
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function SecurityStatusCard({ title, status, statusColor }: {
  title: string
  status: string
  statusColor: 'green' | 'red' | 'yellow' | 'blue'
}) {
  const colorClasses = {
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
    yellow: 'text-yellow-600 bg-yellow-50',
    blue: 'text-blue-600 bg-blue-50'
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="text-sm text-gray-600">{title}</div>
      <div className={`mt-1 px-2 py-1 rounded text-sm font-medium ${colorClasses[statusColor]}`}>
        {status}
      </div>
    </div>
  )
}