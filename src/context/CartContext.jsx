import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { CartContext, cartReducer, createLineId, loadCart, saveCart } from './cartReducer.js'

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
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
    (snapshot, name) => {
      dispatch({
        type: 'add',
        item: {
          lineId: createLineId(),
          type: 'custom',
          name: name
            ? `Wrap ${name}`
            : `Wrap personalizado (${snapshot.proteina.map((option) => option.name).join(' + ')})`,
          unitPriceCents: snapshot.totalCents,
          qty: 1,
          details: snapshot,
        },
      })
      notify(name ? `${name} se agregó a tu pedido` : '¡Tu wrap personalizado se agregó al pedido!')
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
      isBuilderOpen,
      openBuilder: () => setIsBuilderOpen(true),
      closeBuilder: () => setIsBuilderOpen(false),
      addMenuItem,
      addCustomWrap,
      notify,
      increment: (lineId) => dispatch({ type: 'increment', lineId }),
      decrement: (lineId) => dispatch({ type: 'decrement', lineId }),
      remove: (lineId) => dispatch({ type: 'remove', lineId }),
      clear: () => dispatch({ type: 'clear' }),
      dismissNotice: () => setNotice(null),
    }
  }, [items, isOpen, isBuilderOpen, notice, addMenuItem, addCustomWrap, notify])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
