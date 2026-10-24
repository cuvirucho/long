import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { CartContext, cartReducer, createLineId, loadCart, saveCart } from './cartReducer.js'

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const [notice, setNotice] = useState(null)
  const noticeTimer = useRef(null)

  useEffect(() => {
    saveCart(items)
  }, [items])

  useEffect(() => () => clearTimeout(noticeTimer.current), [])

  const notify = useCallback((message) => {
    clearTimeout(noticeTimer.current)
    setNotice({ id: Date.now(), message })
    noticeTimer.current = setTimeout(() => setNotice(null), 3200)
  }, [])

  const addMenuItem = useCallback(
    (product, qty = 1) => {
      dispatch({
        type: 'add',
        item: {
          lineId: createLineId(),
          type: 'menu',
          productId: product.id,
          name: product.name,
          description: product.description,
          unitPriceCents: product.priceCents,
          qty,
        },
      })
      notify(`${product.name} se agregó a tu pedido`)
    },
    [notify],
  )

  const addCustomWrap = useCallback(
    (snapshot) => {
      dispatch({
        type: 'add',
        item: {
          lineId: createLineId(),
          type: 'custom',
          name: `Wrap personalizado (${snapshot.proteina.name})`,
          unitPriceCents: snapshot.totalCents,
          qty: 1,
          details: snapshot,
        },
      })
      notify('¡Tu wrap personalizado se agregó al pedido!')
    },
    [notify],
  )

  const value = useMemo(() => {
    const count = items.reduce((total, line) => total + line.qty, 0)
    const totalCents = items.reduce((total, line) => total + line.unitPriceCents * line.qty, 0)
    return {
      items,
      count,
      totalCents,
      isOpen,
      notice,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addMenuItem,
      addCustomWrap,
      increment: (lineId) => dispatch({ type: 'increment', lineId }),
      decrement: (lineId) => dispatch({ type: 'decrement', lineId }),
      remove: (lineId) => dispatch({ type: 'remove', lineId }),
      clear: () => dispatch({ type: 'clear' }),
      dismissNotice: () => setNotice(null),
    }
  }, [items, isOpen, notice, addMenuItem, addCustomWrap])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
