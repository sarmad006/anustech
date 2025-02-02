'use client'

const Header = () => {
return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
    <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Logo" width={40} height={40}/>
        <span className="text-xl font-bold">Company Name</span>
    </div>
    <button 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => window.location.href = 'tel:+1234567890'}
    >
        Call Now
    </button>
    </header>
)
}

export default Header

