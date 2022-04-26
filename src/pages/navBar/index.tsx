import React from 'react'
import { clearAllLocalStorage, exportLocalStroage, importFiles } from '@/core'
import { DATA_TAG, FORMULA_TAG } from '@/util/shared'
import type { DataItem, FormulaItem } from '@/types'
import './NavBar.css'

interface NavBarProps {
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>
  setFormulas: React.Dispatch<React.SetStateAction<FormulaItem[]>>
}

export default function NavBar(props: NavBarProps) {
  const { setData, setFormulas } = props
  const buttonClass = 'btn m-inline-2 h-8 text-15px'

  async function handleImportFiles(input: HTMLInputElement, tag: string) {
    const files = input.files
    if (files) {
      const { dataList, formulaList } = await importFiles(files, tag)
      setData(dataList)
      setFormulas(formulaList)
    }
  }

  function clear() {
    clearAllLocalStorage()
    setData([])
    setFormulas([])
  }

  return (
    <header className="wp-100 header">
      <div className="h-30px p-10px flex justify-between items-center ">
        <div className="flex items-center wp-70">
          <a
            className="icon-btn color-black h-7 w-7 i-carbon-logo-github"
            href="https://github.com/Cheng-DX/formula-editor-react"
            target="_blank"
            title="GitHub"
            rel="noreferrer"
          />
          <label htmlFor="uploadFile" className="position-relative">
            <button className={buttonClass}>Data</button>
            <input
              type="file"
              multiple
              accept=".json"
              className="file-input"
              onChange={e => handleImportFiles(e.target, DATA_TAG)}
            />
          </label>
          <label htmlFor="uploadFile" className="position-relative">
            <button className={buttonClass}>Formula</button>
            <input
              type="file"
              multiple
              accept=".json"
              className="file-input"
              onChange={e => handleImportFiles(e.target, FORMULA_TAG)}
            />
          </label>
          <button className={buttonClass} onClick={exportLocalStroage} >
            Export
          </button >
          {/* <button className={buttonClass} onClick={() => { useTips = !useTips }} >
          {tipsState}
        </button > */}
          {/* <button className={buttonClass} onClick={() => addPanelVisible = true} >
          Add
        </button > */}
        </div >
        <button
          className={buttonClass}
          onClick={() => clear()}
        >
          Delete
        </button >
      </div >
    </header >)
}
