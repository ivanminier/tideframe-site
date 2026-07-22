import { GlassPanel } from '../components/GlassPanel'
import { Meta } from '../components/Meta'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { products } from '../data/products'
import { getRouteMeta } from '../data/routeMeta'

const meta = getRouteMeta('/products')

export function Products() {
  return (
    <>
      <Meta title={meta.title} description={meta.description} />
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
            eyebrow={`Modeboard ${products[0].release.version} · Available for Mac`}
            title="Modeboard for Mac"
            description="One profile. Your whole Mac, ready. Switch the settings that shape your Mac together, then return to the right setup whenever your day changes."
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
            <p>Modeboard is the first of more thoughtful Mac tools from Tideframe Labs.</p>
          </GlassPanel>
        </div>
      </section>
    </>
  )
}
