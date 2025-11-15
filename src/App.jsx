import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/katanas`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleAdd = (p) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === p.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }
      return [...prev, { ...p, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const handleCheckout = async () => {
    try {
      const payload = {
        customer_name: 'Guest',
        email: 'guest@example.com',
        address: '123 Blade St, Edo',
        items: cart.map((i) => ({
          product_id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          subtotal: i.price * i.quantity,
        })),
      }
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Order placed successfully! Order ID: ' + data.id)
        setCart([])
        setCartOpen(false)
      } else {
        setMessage('Checkout failed: ' + (data.detail || 'Unknown error'))
      }
    } catch (e) {
      setMessage('Checkout error: ' + e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-100">
      <Header cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} onCartClick={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">Finely Forged Katanas</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Premium hand-forged blades crafted with tradition and precision. Explore our curated selection of katanas for collectors and practitioners alike.</p>
        </section>

        {message && (
          <div className="mb-6 p-3 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">{message}</div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </main>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
    </div>
  )
}

export default App
