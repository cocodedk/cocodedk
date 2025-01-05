import { cases } from '../data/cases';

export function CaseStudies() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {cases.map((case_) => (
          <div key={case_.title} className="group relative overflow-hidden rounded-xl">
            <img
              src={case_.image}
              alt={case_.title}
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold mb-2">{case_.title}</h3>
              <p className="text-blue-400 mb-2">{case_.client}</p>
              <p className="text-gray-300">{case_.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}