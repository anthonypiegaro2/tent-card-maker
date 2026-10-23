import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

import setaLogo from "@/assets/seta-logo.svg"
import { Button } from "@/components/ui/button"

type CardData = { name: string; title: string; department: string }

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size))
  }
  return result
}

export function PrintCards({
  cards,
  canSubmit,
}: {
  cards: CardData[]
  canSubmit: boolean
}) {
  const printRef = useRef<HTMLDivElement>(null)
  const print = useReactToPrint({ contentRef: printRef })

  return (
    <>
      <Button type="button" onClick={print} disabled={!canSubmit}>
        Create Cards
      </Button>

      <div className="print-root" ref={printRef}>
        {chunk(cards, 2).map((pair, pageIndex) => (
          <section className="sheet" key={pageIndex}>
            {pair.map((card, cardIndex) => (
              <article className="card flex flex-col" key={`${pageIndex}-${cardIndex}`}>
                <div className="relative flex-1 rotate-180 border">
                  <img 
                    src={setaLogo}
                    alt="SETA"
                    className="absolute top-4 left-4 w-36"
                  />
                  <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-medium w-full text-center">{card.name}</p>
                  <h2 className="absolute bottom-4 left-4 text-sm font-semibold">{card.title}</h2>
                  <p className="absolute bottom-4 right-4 text-sm font-semibold">{card.department}</p>
                </div>
                <div className="relative flex-1 border">
                  <img 
                    src={setaLogo}
                    alt="SETA"
                    className="absolute top-4 left-4 w-36"
                  />
                  <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-medium w-full text-center">{card.name}</p>
                  <h2 className="absolute bottom-4 left-4 text-sm font-semibold">{card.title}</h2>
                  <p className="absolute bottom-4 right-4 text-sm font-semibold">{card.department}</p>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </>
  )
}
