import React from 'react'

const NavigationBar = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    return (
        <header className="fixed top-0 w-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg z-50">
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
                <div className="flex items-center gap-2">
                    <img
                        src="./logo.png"
                        alt="TCU LOGO"
                        className="w-17 h-17 rounded-full"
                    />
                    <h1 className="text-xl font-bold">Taguig City University</h1>
                </div>
                <div className="flex items-center">
                    <ul className="hidden md:flex items-center space-x-1">
                    {[
                        { href: "/", label: "Home"},
                        { href: "#about", label: "About" },
                        { href: "#programs", label: "Programs" },
                        { href: "#admissions", label: "Admissions" },
                        { href: "#campus", label: "Campus Life" },
                        { href: "#contact", label: "Contact" }
                    ].map((item, index) => (
                        <li key={item.href}>
                        <a 
                            href={item.href} 
                            className={`flex items-center hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors duration-200
                            ${index === 0 ? 'bg-white/10' : ''}`}
                        >
                            {item.icon && <span className="mr-1.5">{item.icon}</span>}
                            {item.label}
                        </a>
                        </li>
                    ))}
                    </ul>
                    <div className="ml-4 pl-4 border-l border-white/20">
                    <a 
                        href="/profile" 
                        className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors duration-200"
                    >
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user?.fullName || 'AA'
                            )}&background=dc2626&color=fff&bold=true`}                        
                            alt="Profile"
                            className="w-6 h-6 rounded-full border border-white/50"
                        />
                        <span className="text-sm font-medium">Profile</span>
                    </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavigationBar