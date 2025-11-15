export default function CartDrawer({ open, items, onClose, onCheckout }) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <img src={(item.images && item.images[0]) || 'https://images.unsplash.com/photo-1610248381701-4b4e8a5fb50a'} alt={item.name} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                </div>
                <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        <div className="p-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Total</span>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="w-full px-4 py-3 rounded-md bg-gray-900 text-white hover:bg-black">Checkout</button>
        </div>
      </div>
    </div>
  )
}
