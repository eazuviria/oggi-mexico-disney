import { useEffect, useState } from 'react'
interface IUseOnScreen {
  threshold: number
}
export function useOnScreen(
  options: IUseOnScreen
): [(element: HTMLDivElement) => void, boolean] {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, options)
    if (ref) {
      observer.observe(ref)
    }
    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
  }, [ref, options])
  return [setRef, visible]
}
