import Image from 'next/image'
import { partyConfig } from '@/lib/party-config'

type BrandMarkProps = {
  size?: 'hero' | 'persistent'
}

export function BrandMark({ size = 'hero' }: BrandMarkProps) {
  const accessibleName = partyConfig.logoSrc
    ? 'Original Diwali logo'
    : 'Original Diwali logo asset not attached'

  return (
    <div className={`brand-mark brand-mark--${size}`}>
      {partyConfig.logoSrc ? (
        <Image
          src={partyConfig.logoSrc}
          alt="Original Diwali logo"
          fill
          priority={size === 'hero'}
          sizes={size === 'hero' ? '(max-width: 640px) 150px, 210px' : '84px'}
          className="brand-mark__image"
        />
      ) : (
        <div className="brand-mark__placeholder" role="img" aria-label={accessibleName}>
          {size === 'persistent' ? (
            <span>Logo TBD</span>
          ) : (
            <>
              <span>Original Diwali logo</span>
              <span>asset not attached</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
