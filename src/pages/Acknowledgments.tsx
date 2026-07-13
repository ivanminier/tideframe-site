import { Meta } from '../components/Meta'

export function Acknowledgments() {
  return (
    <>
      <Meta
        title="Acknowledgments — Tideframe Labs"
        description="Third-party open-source software used by Modeboard."
      />
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Modeboard</p>
          <h1>Acknowledgments</h1>
          <p className="lede">Third-party open-source software used by Modeboard.</p>
        </div>
      </section>
      <div className="prose container narrow">
        <h2>Sparkle</h2>
        <p>
          Modeboard uses{' '}
          <a href="https://sparkle-project.org/" target="_blank" rel="noopener noreferrer">
            Sparkle
          </a>{' '}
          to check for and install app updates. Sparkle is an independent open-source project distributed under
          the MIT License.
        </p>
        <p>Sparkle is distributed under the MIT License:</p>
        <pre className="license-block">
          {`Copyright © the Sparkle Project contributors.

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`}
        </pre>
        <p className="fine-print">
          For the complete license and contributor information, see{' '}
          <a href="https://github.com/sparkle-project/Sparkle/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
            Sparkle's LICENSE file on GitHub
          </a>
          . The same license text is also included within the Modeboard app itself.
        </p>
      </div>
    </>
  )
}
