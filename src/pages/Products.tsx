import { GlassPanel } from '../components/GlassPanel'
import { Meta } from '../components/Meta'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { products } from '../data/products'

export function Products() {
  return (
    <>
      <Meta
        title="Products — Tideframe Labs"
        description="Mac software from Tideframe Labs, an independent studio based in Vermont."
      />
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Tideframe Labs</p>
          <h1>Products</h1>
          <p className="lede">
            Tideframe Labs builds focused software for the Mac, starting with Modeboard.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Coming soon"
            title="Modeboard"
            description="One profile. Your whole Mac, ready. Modeboard is being prepared for macOS 15 and later."
          />
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="section compact-section">
        <div className="container narrow centered">
          <GlassPanel className="products-more-panel">
            <p className="eyebrow">What comes next</p>
            <h2>New products will be announced when they are ready.</h2>
            <p>For now, Tideframe Labs is focused on preparing Modeboard for a careful public release.</p>
          </GlassPanel>
        </div>
      </section>
    </>
  )
}
