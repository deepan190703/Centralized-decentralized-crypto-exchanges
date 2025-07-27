"use client";
import { signIn, signOut, useSession } from "next-auth/react"
import { PrimaryButton, SecondaryButton } from "./Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Appbar = () => {
    const session = useSession();
    const router = useRouter();
    
    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push("/")}>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-sm">CE</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">CryptoExchange Pro</span>
                            </div>
                        </div>
                        
                        {/* Navigation Links */}
                        {session.data?.user && (
                            <nav className="hidden md:ml-10 md:flex md:space-x-8">
                                <button
                                    onClick={() => router.push("/dashboard")}
                                    className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                                >
                                    Dashboard
                                </button>
                                <button className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                    Markets
                                </button>
                                <button className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                    Trading
                                </button>
                                <button className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                    Portfolio
                                </button>
                            </nav>
                        )}
                    </div>

                    {/* Right side - User Menu */}
                    <div className="flex items-center space-x-4">
                        {session.data?.user ? (
                            <div className="flex items-center space-x-4">
                                {/* User Avatar and Info */}
                                <div className="flex items-center space-x-3">
                                    <Image
                                        src={session.data.user.image || '/default-avatar.png'}
                                        alt={session.data.user.name || 'User avatar'}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div className="hidden md:block">
                                        <div className="text-sm font-medium text-gray-900">
                                            {session.data.user.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {session.data.user.email}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Notifications */}
                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5V7a10 10 0 1 1 20 0v10z" />
                                    </svg>
                                </button>
                                
                                {/* Settings */}
                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                
                                {/* Logout */}
                                <SecondaryButton onClick={() => signOut()}>
                                    Logout
                                </SecondaryButton>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <SecondaryButton onClick={() => signIn()}>
                                    Sign In
                                </SecondaryButton>
                                <PrimaryButton onClick={() => signIn("google")}>
                                    Get Started
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}