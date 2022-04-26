import { useState } from 'react'
import EmptyPanel from '@/components/EmptyPanel'
import { transformText, updateFilterFn } from '@/core'
import type { DataItem, FilterFn, FormulaItem } from '@/types'
import './EditPanel.css'

interface EditPanelProps {
  setFilterFn: React.Dispatch<React.SetStateAction<FilterFn>>
  displayedData: DataItem[]
  displayedFormula: FormulaItem[]
  data: DataItem[]
  formulas: FormulaItem[]
}

export default function EditPanel(props: EditPanelProps) {
  const {
    setFilterFn,
    displayedData,
    displayedFormula,
    data,
    formulas,
  } = props
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  function insert(code: string) {
    setInput(input => input + code)
  }
  function onInput(text: string) {
    setInput(text)
    setFilterFn(updateFilterFn(text))
    const result = transformText(text, formulas, data)
    setOutput(result)
  }

  let dataPanel = null
  if (displayedData.length > 0) {
    dataPanel = (
      <div className="mt-10px wp-95">
        {displayedData.map(item => (
          <div
            key={item.code}
            className="cursor-pointer
            flex-center
            p-10px
            border
            border-gray-300
            r-5
            data-card"
            onClick={() => insert(item.code)}
          >
            <span className="data-card-item">{item.dataId}</span>
            <span className="data-card-item">{item.code}</span>
            <span className="data-card-item__name">{item.name}</span>
          </div>
        ))}
      </div >
    )
  }
  else {
    dataPanel = (<EmptyPanel text="No data" />)
  }

  let formulaPanel = null
  if (displayedFormula.length > 0) {
    formulaPanel = (<div className="mt-10px wp-95">
      {displayedFormula.map(item => (
        <div
          key={item.code}
          className="flex
          flex-col
          justify-around
          border
          r-5
          formula-card"
          style={{ border: '1px solid #167f9f' }}
        >
          <div className="cursor-pointer title" onClick={() => insert(item.code)}>
            <span className="p-5px scroll-x">{item.code}</span>
            <span className="p-5px scroll-x">{`(${item.name})`}</span>
          </div>

          <span className="p-1 mt-10px scroll-x" >
            {item.formula}
          </span>
        </div>
      ))}
    </div >
    )
  }
  else {
    formulaPanel = (<EmptyPanel text="No formula" />)
  }
  return (
    <div className="main">
      <div className="flex hp-100">
        <div className="flex hp-100 wp-25 color-white flex-col items-center scroll-y">
          {dataPanel}
        </div>
        <div className="flex flex-col items-center flex-grow m-10px r-10">
          <textarea value={input} className="area" onChange={e => onInput(e.target.value)} />
          <div>
            <button className="btn bg-red hover:bg-red-500 h-30px">
              Clear
            </button>
          </div>
          <textarea value={output} className="area" onChange={e => setOutput(e.target.value)} />
        </div>
        <div className="flex hp-100 wp-25 flex-col items-center scroll-y">
          {formulaPanel}
        </div>
      </div>
    </div>
  )
}
