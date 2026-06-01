import { Menu, X } from "lucide-react";
import { useState } from "react"

export default function Navbar() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
    return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
                <div className="flex items-center space-x-1 group cursor-pointer">
                    <span className="text-lg sm:text-xl md:text-2xl font-medium">
                        <span className="text-teal-400">&lt;</span>
                        <span className="text-white">Code</span>
                        <span className="text-gray-500">by</span>
                        <span className="text-purple-400">Jo</span>
                        <span className="text-teal-400">/&gt;</span>
                    </span>
                </div>

                {/*Nav Links*/}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <a 
                        href="#features" 
                        className="text-gray-300 hover:text-white text-sm lg:text-base"
                    >
                        Features
                    </a>
                    <a 
                        href="#pricing" 
                        className="text-gray-300 hover:text-white text-sm lg:text-base"
                    >
                        Pricing
                    </a>
                    <a href="#testimonials" className="text-gray-300 hover:text-white text-sm lg:text-base">
                        Testimonials
                    </a>
                </div>
                <button 
                    className="md:hidden p-2 text-gray-300 hover:text-white"
                    onClick={()=> setMobileMenuIsOpen((prev) => !prev)}
                >{mobileMenuIsOpen ? ( 
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
                </button>
            </div>
        </div>
        {mobileMenuIsOpen && 
            <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 animate-in slide-in-from-top duration-300">
                <div className="px-4 py-5 space-y-2">
                    <a
                        href="#features"
                        onClick={() => setMobileMenuIsOpen(false)}
                        className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
                    >
                        Features
                    </a>

                    <a
                        href="#pricing"
                        onClick={() => setMobileMenuIsOpen(false)}
                        className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
                    >
                        Pricing
                    </a>

                    <a
                        href="#testimonials"
                        onClick={() => setMobileMenuIsOpen(false)}
                        className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
                    >
                        Testimonials
                    </a>
                </div>
            </div>
        }
    </nav>
    )
}