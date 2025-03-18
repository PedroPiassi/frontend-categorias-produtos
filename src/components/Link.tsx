'use client'

// React Imports
import { forwardRef, useMemo } from 'react'
import type { ComponentProps, ForwardedRef, MouseEvent } from 'react'

// Next Imports
import type NextLink from 'next/link'

type Props = Omit<ComponentProps<typeof NextLink>, 'href' | 'onClick'> & {
  href?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const Link = (props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
  // Props
  const { href, onClick, ...rest } = props

  const hrefMemo = useMemo(() => {
    if (typeof href === undefined) {
      return ''
    }

    return href
  }, [href])

  return <></>
}

export default forwardRef(Link)
