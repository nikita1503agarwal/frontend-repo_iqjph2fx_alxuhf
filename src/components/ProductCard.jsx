export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white/70 backdrop-blur rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        <img src={(product.images && product.images[0]) || 'https://images.unsplash.com/photo-1610248381701-4b4e8a5fb50a'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black text-sm">Add to cart</button>
        </div>
      </div>
    </div>
  )
}
