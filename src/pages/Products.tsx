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
        description="Software from Tideframe Labs, an independent studio building thoughtful software for personal technology."
      />
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Tideframe Labs</p>
          <h1>Products</h1>
          <p className="lede">
            Everything Tideframe Labs currently makes, in one place. There is one product so far — more will
            appear here as they're ready, not before.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Available now"
            title="Modeboard"
            description="The studio's first application, currently in development for the Mac."
          />
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container narrow centered">
          <GlassPanel className="products-more-panel">
            <p className="eyebrow">More in development</p>
            <h2>Additional products aren't ready to announce yet.</h2>
            <p>
              Tideframe Labs is a small, independent studio. When a new product is ready to share — for iPhone,
              iPad, or elsewhere — it will appear on this page and in the changelog, not before.
            </p>
          </GlassPanel>
        </div>
      </section>
    </>
  )
}
