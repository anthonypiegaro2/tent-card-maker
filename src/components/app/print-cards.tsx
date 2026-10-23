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
        {chunk(cards, 1).map((pair, pageIndex) => (
          <section className="sheet" key={pageIndex}>
            {pair.map((card, cardIndex) => (
              <article className="card flex flex-col" key={`${pageIndex}-${cardIndex}`}>
                <div className="flex-1 rotate-180 p-8">
                  <div className="w-full h-full p-1 border-t-1 border-l-1 border-black">
                    <div className="w-full h-full p-1 border-8 border-black">
                      <div className="w-full h-full border-b-1 border-r-1 border-black flex flex-col items-center">
                        <img 
                          src={setaLogo}
                          alt="SETA"
                          className="h-16 mb-5.5 mt-9"
                        />
                        <p className="font-serif text-6xl font-[500] w-full text-center mb-4">{card.name}</p>
                        <h2 className="font-serif text-3xl font-medium">{card.title}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-8">
                  <div className="w-full h-full p-1 border-t-1 border-l-1 border-black">
                    <div className="w-full h-full p-1 border-8 border-black">
                      <div className="w-full h-full border-b-1 border-r-1 border-black flex flex-col items-center">
                        <img 
                          src={setaLogo}
                          alt="SETA"
                          className="h-16 mb-5.5 mt-9"
                        />
                        <p className="font-serif text-6xl font-[500] w-full text-center mb-4">{card.name}</p>
                        <h2 className="font-serif text-3xl font-medium">{card.title}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </>
  )
}


// Version 1
{/* <div className="print-root" ref={printRef}> */}
  {/* {chunk(cards, 2).map((pair, pageIndex) => (
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
          </div>
          <div className="relative flex-1 border">
            <img 
              src={setaLogo}
              alt="SETA"
              className="absolute top-4 left-4 w-36"
            />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-medium w-full text-center">{card.name}</p>
            <h2 className="absolute bottom-4 left-4 text-sm font-semibold">{card.title}</h2>
          </div>
        </article>
      ))}
    </section>
  ))}
</div> */}
