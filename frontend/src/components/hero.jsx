import { FileText, BotIcon as Robot } from "lucide-react"

export default function ResearchAI() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center">
          <Robot className="h-8 w-8 text-purple-500" />
          <span className="ml-2 text-xl font-bold">ResearchAI</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="hover:text-purple-400">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-purple-400">
            How it Works
          </a>
          <a href="#examples" className="hover:text-purple-400">
            Examples
          </a>
          <a href="#pricing" className="hover:text-purple-400">
            Pricing
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-white hover:text-purple-400">Sign In</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center">
        {/* Floating elements */}
        <div className="absolute -left-4 top-1/4 transform -rotate-12 opacity-30">
          <div className="bg-gray-900 rounded-lg p-4 w-16 h-20">
            <FileText className="text-purple-500 w-full h-full" />
          </div>
        </div>
        <div className="absolute right-10 bottom-1/4 transform rotate-12 opacity-30">
          <div className="bg-gray-900 rounded-lg p-4 w-20 h-24">
            <FileText className="text-purple-500 w-full h-full" />
          </div>
        </div>
        <div className="absolute right-20 top-20 transform rotate-6 opacity-30">
          <div className="bg-gray-900 rounded-lg p-4 w-16 h-16">
            <Robot className="text-purple-500 w-full h-full" />
          </div>
        </div>

        {/* Main content */}
        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl mb-6">
          Transform Your
          <br />
          Research with{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">AI Power</span>
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mb-12">
          Upload your research papers and let our AI transform them into engaging presentations, podcasts, and visual
          content.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
            <FileText className="h-5 w-5" />
            Upload Paper
          </button>
          <input
            type="text"
            placeholder="Search papers..."
            className="px-6 py-3 bg-white text-black rounded-md w-full md:w-64"
          />
        </div>

        {/* Large robot icon */}
        <div className="absolute right-10 bottom-0 opacity-70">
          <Robot className="h-32 w-32 text-purple-500" />
        </div>
      </main>
    </div>
  )
}

