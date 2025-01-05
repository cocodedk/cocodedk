import { services } from '../data/services';
import { Link } from 'react-router-dom';

export function Services() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/70 transition-colors">
              <Icon className={`w-12 h-12 ${service.color} mb-4`} />
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${service.color}`} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              {service.path && (
                <Link 
                  to={service.path}
                  className={`inline-flex items-center text-sm font-semibold ${service.color} hover:opacity-80`}
                >
                  Learn More →
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}