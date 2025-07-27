"use client";

import { signIn, useSession } from "next-auth/react"
import { SecondaryButton } from "./Button"
import { useRouter } from "next/navigation";

export const Hero = () => {
    const session = useSession();
    const router = useRouter();

    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            {/* Main Hero Content */}
            <div className="text-center">
                <div className="text-6xl font-bold leading-tight">
                    <span className="text-gray-900">
                        Professional Cryptocurrency
                    </span>
                    <br />
                    <span className="text-blue-600"> 
                        Trading Platform
                    </span>
                </div>
                <div className="flex justify-center pt-8 text-xl text-gray-600 max-w-3xl mx-auto">
                    Advanced trading tools, real-time market data, and secure wallet management for the modern crypto trader.
                </div>
                <div className="flex justify-center pt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                    Trade with confidence using our professional-grade exchange platform with advanced order types and portfolio management.
                </div>
                
                <div className="pt-12 flex justify-center space-x-4">
                    {session.data?.user ? (
                        <SecondaryButton onClick={() => {
                            router.push("/dashboard");
                        }} className="text-lg px-8 py-4">
                            Open Trading Dashboard
                        </SecondaryButton>
                    ) : (
                        <SecondaryButton onClick={() => {
                            signIn("google");
                        }} className="text-lg px-8 py-4">
                            Start Trading with Google
                        </SecondaryButton>
                    )}
                </div>
            </div>

            {/* Feature Grid */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard 
                    icon="📊"
                    title="Advanced Trading"
                    description="Professional order book with limit, market, and stop orders"
                />
                <FeatureCard 
                    icon="📈"
                    title="Real-time Data"
                    description="Live market data and price charts for informed decisions"
                />
                <FeatureCard 
                    icon="🔐"
                    title="Secure Wallets"
                    description="Enterprise-grade security for your digital assets"
                />
                <FeatureCard 
                    icon="💼"
                    title="Portfolio Management"
                    description="Comprehensive portfolio tracking and analytics"
                />
            </div>

            {/* Stats Section */}
            <div className="mt-24 bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Platform Statistics</h2>
                    <p className="text-gray-600 mt-2">Join thousands of traders using our platform</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <StatCard value="$2.5B+" label="Total Volume Traded" />
                    <StatCard value="50,000+" label="Active Traders" />
                    <StatCard value="99.9%" label="Uptime" />
                    <StatCard value="24/7" label="Support" />
                </div>
            </div>

            {/* Security Features */}
            <div className="mt-24 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Built for Security & Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <SecurityFeature 
                        title="Multi-Signature Wallets"
                        description="Advanced cryptographic security for fund protection"
                    />
                    <SecurityFeature 
                        title="Cold Storage"
                        description="Majority of funds stored offline for maximum security"
                    />
                    <SecurityFeature 
                        title="Real-time Monitoring"
                        description="24/7 security monitoring and threat detection"
                    />
                </div>
            </div>
        </div>
    </div>
}

function FeatureCard({ icon, title, description }: { 
    icon: string; 
    title: string; 
    description: string; 
}) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{value}</div>
            <div className="text-gray-600 mt-1">{label}</div>
        </div>
    )
}

function SecurityFeature({ title, description }: { title: string; description: string }) {
    return (
        <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}