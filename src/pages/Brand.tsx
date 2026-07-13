import { Meta } from '../components/Meta'
import { SectionHeading } from '../components/SectionHeading'
import { siteConfig } from '../config'
import { useImageFallback } from '../hooks/useImageFallback'

const COLORS = [
  { name: 'Deep Tide', variable: '--tide', hex: '#102A43' },
  { name: 'Pacific Blue', variable: '--pacific', hex: '#2B6D93' },
  { name: 'Sea Glass', variable: '--glass', hex: '#65B7A6' },
  { name: 'Foam', variable: '--foam', hex: '#F7FAF9' },
  { name: 'Coastal Sand', variable: '--sand', hex: '#E8DDCD' },
  { name: 'Charcoal', variable: '--charcoal', hex: '#172026' },
  { name: 'Coral (accent)', variable: '--coral', hex: '#E8794F' },
] as const

function BrandAsset({
  src,
  alt,
  downloadName,
  dark = false,
}: {
  src: string
  alt: string
  downloadName: string
  dark?: boolean
}) {
  const { state, onLoad, onError } = useImageFallback()
  if (state === 'error') return null

  return (
    <div className="brand-asset">
      <div className={`brand-asset-preview${dark ? ' brand-asset-preview--dark' : ''}`}>
        <img src={src} alt={alt} onLoad={onLoad} onError={onError} />
      </div>
      {state === 'loaded' ? (
        <a className="text-link" href={src} download>
          Download {downloadName} <span>→</span>
        </a>
      ) : null}
    </div>
  )
}

export function Brand() {
  return (
    <>
      <Meta
        title="Brand — Tideframe Labs"
        description="Tideframe Labs brand assets: logo marks, colors, and naming guidelines."
      />
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Tideframe Labs</p>
          <h1>Brand</h1>
          <p className="lede">
            Marks, colors, and naming guidance for referring to Tideframe Labs and Modeboard accurately.
          </p>
        </div>
      </section>

      <section className="section brand-marks-section">
        <div className="container">
          <SectionHeading
            eyebrow="Marks"
            title="Logo marks"
            description="Download the approved files for press, reviews, and partner materials."
          />
          <div className="brand-assets-grid">
            <BrandAsset src="/tideframe-mark.svg" alt="Tideframe Labs mark" downloadName="mark (SVG)" />
            <BrandAsset
              src="/tideframe-mark-monochrome.svg"
              alt="Tideframe Labs monochrome mark"
              downloadName="monochrome mark (SVG)"
              dark
            />
            <BrandAsset
              src="/tideframe-icon-glossy.png"
              alt="Tideframe Labs glossy app icon"
              downloadName="glossy icon (PNG)"
            />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container narrow">
          <SectionHeading eyebrow="Description" title="How to describe the studio" />
          <p>{siteConfig.descriptor}</p>
          <p className="fine-print">
            Use this description, or a close paraphrase, when introducing Tideframe Labs in writing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHeading eyebrow="Naming" title="Approved naming" />
          <ul>
            <li>
              Refer to the studio as <strong>Tideframe Labs</strong>, not simply "Tideframe."
            </li>
            <li>
              Refer to the product as <strong>Modeboard</strong>, not "Mode Board" or "ModeBoard."
            </li>
            <li>Do not add a registration symbol to the Tideframe Labs or Modeboard names.</li>
            <li>Don't describe Modeboard as an Apple product, or as endorsed, certified, or reviewed by Apple.</li>
          </ul>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading eyebrow="Palette" title="Brand colors" />
          <div className="color-grid">
            {COLORS.map((color) => (
              <div className="color-swatch" key={color.variable}>
                <span className="color-swatch-chip" style={{ background: `var(${color.variable})` }} aria-hidden="true" />
                <p>{color.name}</p>
                <code>{color.hex}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHeading eyebrow="Usage" title="Permitted treatments" />
          <ul>
            <li>
              The mark may be scaled proportionally and placed on light or dark backgrounds using the version
              designed for that background.
            </li>
            <li>Keep clear space around the mark roughly equal to the height of the mark itself.</li>
            <li>Don't combine the mark with other logos, or place it inside a shape that isn't provided.</li>
          </ul>
        </div>
      </section>

      <section className="section cta">
        <div className="container centered">
          <p className="eyebrow">Questions</p>
          <h2>Need something not shown here?</h2>
          <p>
            Email <a href={`mailto:${siteConfig.generalEmail}`}>{siteConfig.generalEmail}</a>.
          </p>
        </div>
      </section>
    </>
  )
}
