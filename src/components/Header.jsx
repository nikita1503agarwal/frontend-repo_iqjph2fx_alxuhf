import { ShoppingCart } from 'lucide-react'

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🗡️</span>
          <span className="text-xl font-extrabold tracking-tight">Katana Forge</span>
        </a>
        <button onClick={onCartClick} className="relative inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition">
          <ShoppingCart size={20} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-0.5">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}
