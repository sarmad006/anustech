import { HardHat } from 'lucide-react'

export default function Loading(): React.ReactElement {
return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
    <div className="text-center space-y-4">
        {/* Animated Hardhat Icon */}
        <div className="animate-bounce">
        <HardHat className="w-16 h-16 text-blue-600 mx-auto" />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900">
        טוען...
        </h2>
        <p className="text-gray-600">
        אנחנו מכינים את העמוד עבורכם
        </p>
        
        {/* Loading Spinner */}
        <div className="relative w-24 h-24 mx-auto mt-4">
        <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Safety Message */}
        <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg inline-block mt-6">
        <p className="flex items-center gap-2 justify-center">
            <HardHat className="w-4 h-4 text-blue-600" />
            <span>בטיחות מעל הכל - אנחנו מוודאים שהכל תקין</span>
        </p>
        </div>
    </div>
    </div>
)
}

