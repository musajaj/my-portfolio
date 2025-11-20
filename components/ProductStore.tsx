
import React from 'react';
import { products } from '../lib/data';
import ProductCard from './ProductCard';

export default function ProductStore() {
  return (
    <section id="projects" className="py-24 px-4 relative z-10 bg-zinc-950/30 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            أنظمة رقمية <span className="text-blue-500">مُهندسة للنجاح.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            اختر الأداة التي تناسب طموحك. جميع القوالب مصممة بعناية وتشمل تحديثات مجانية مدى الحياة.
          </p>
        </div>

        {/* THE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="h-full">
               <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
