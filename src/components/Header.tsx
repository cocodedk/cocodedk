import { Code2, ChevronRight } from 'lucide-react';
export function Header() {
  return (
    <header className="relative">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
          alt="Digital Technology Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 md:py-48">
        <div className="flex flex-col items-center text-left">
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="w-12 h-12 text-blue-400" />
            <span className="text-3xl font-bold">cocode.dk</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Fully Dedicated To{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              AI - First
            </span>
            {' '}Strategies
          </h1>
          <ul className="text-xl text-gray-300 mb-8 max-w-4xl leading-relaxed list-disc pl-5">
            <li>At CoCode.dk, we prioritize AI in everything we do.</li>
            <li>We solve logical challenges by integrating AI into existing systems.</li>
            <li>Need something new? We create AI-driven applications from the ground up.</li>
            <li>AI is at the core of every process, making workflows smarter and faster.</li>
            <li>Our focus: practical solutions that deliver real results.</li>
            <li>Over 25 years of experience, now fully dedicated to AI-first strategies.</li>
          </ul>
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 transition-colors px-8 py-3 rounded-full flex items-center gap-2">
              Get Started <ChevronRight className="w-5 h-5" />
            </button>
            <button className="border border-blue-400 hover:bg-blue-400/10 transition-colors px-8 py-3 rounded-full">
              View Our Work
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
