//3 is the lowest 13 is the highest
//no aces or 2's
//jokers are

import { useEffect, useState } from 'react'

const values = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

function valueFilter(value: number) {
  switch (value) {
    case 11:
      return 'J'
    case 12:
      return 'Q'
    case 13:
      return 'K'
    default:
      return value
  }
}

export default function App() {
  const [history, setHistory] = useState<number[]>([])
  const [total, setTotal] = useState(0)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    console.log(initialLoad)
    if (initialLoad) {
      const unmarshalledState = localStorage.getItem('five_crowns_state')
      if (!unmarshalledState) return
      const fiveCrownsState = JSON.parse(unmarshalledState)
      if (!fiveCrownsState) return
      if (fiveCrownsState.history && fiveCrownsState.total) {
        console.log(fiveCrownsState)
        setHistory(fiveCrownsState.history)
        setTotal(fiveCrownsState.total)
      }
      setInitialLoad(false)
    } else {
      localStorage.setItem(
        'five_crowns_state',
        JSON.stringify({
          history,
          total,
        }),
      )
    }
  }, [history, total, initialLoad])

  return (
    <main className="w-screen h-screen">
      <div className="flex flex-col justify-around h-full items-center relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 max-h-[100px] overflow-y-scroll w-[80px] flex justify-center items-center flex-col">
          {history.map((el, index) => (
            <div key={index}>{el}</div>
          ))}
        </div>
        <div className="text-5xl mt-20">{total}</div>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {values.map((value, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded active:bg-blue-400 transition-colors w-20 h-20 flex items-center justify-center"
              onClick={() => {
                setHistory([...history, value])
                setTotal(total + value)
              }}
            >
              {valueFilter(value)}
            </button>
          ))}
          <button
            className="bg-red-500 text-white font-medium py-2 px-4 rounded active:bg-red-400 transition-colors w-20 h-20 flex items-center justify-center text-xl"
            onClick={() => {
              setTotal(0)
              setHistory([])
            }}
          >
            Clear
          </button>
          <button
            className="bg-emerald-500 text-white font-medium py-2 px-4 rounded active:bg-red-400 transition-colors w-20 h-20 flex items-center justify-center text-xl"
            onClick={() => {
              setTotal(history.length ? total - history[history.length - 1] : 0)
              setHistory(history.slice(0, history.length - 1))
            }}
          >
            Undo
          </button>
        </div>
      </div>
    </main>
  )
}
