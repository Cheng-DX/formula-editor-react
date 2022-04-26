import type { DataItem, FormulaItem } from '@/types/dataTypes'
import { DATA_TAG, FORMULA_TAG } from '@/util/shared'

export function initLocalStorage() {
  const dataList: DataItem[] = []
  const formulaList: FormulaItem[] = []

  const dataLocalStorage = localStorage.getItem(DATA_TAG)
  if (dataLocalStorage)
    dataList.push(...JSON.parse(dataLocalStorage))
  else
    localStorage.setItem(DATA_TAG, JSON.stringify(dataList))

  const formulaLocalStorage = localStorage.getItem(FORMULA_TAG)
  if (formulaLocalStorage)
    formulaList.push(...JSON.parse(formulaLocalStorage))
  else
    localStorage.setItem(FORMULA_TAG, JSON.stringify(formulaList))

  return { dataList, formulaList }
}

export function storeItem(item: DataItem | FormulaItem, tag: string) {
  if (tag === DATA_TAG || tag === FORMULA_TAG) {
    if (!localStorage.getItem(tag)) {
      localStorage.setItem(tag, JSON.stringify([item]))
    }
    else {
      const array = JSON.parse(localStorage.getItem(tag) as string)
      array.push(item)
      localStorage.setItem(tag, JSON.stringify(array))
    }
  }
}

export function clearAllLocalStorage() {
  // eslint-disable-next-line no-alert
  // TODO: remove confirm
  const result = confirm(
    '即将清空所有本地存储,包括所有数据和公式,该操作无法撤回,确定吗?',
  )
  if (result) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key)
        localStorage.setItem(key, '[]')
    }
  }
}

export function exportLocalStroage() {
  _exportJSON(JSON.stringify(localStorage.getItem(DATA_TAG)), DATA_TAG)
  _exportJSON(JSON.stringify(localStorage.getItem(FORMULA_TAG)), FORMULA_TAG)
}

function _exportJSON(json: string, filename: string) {
  const a = document.createElement('a')
  a.href = `data:text/json;charset=utf-8,${encodeURIComponent(json)}`
  a.download = `${filename}.json`
  a.click()
}

export function importFiles(files: FileList, tag: string) {
  Array.from(files).forEach(async file => {
    const json = await file.text()
    let filename = file.name.slice(0, -5)
    if (!filename.endsWith(tag))
      filename += tag

    if (localStorage.getItem(filename)) {
      // eslint-disable-next-line no-alert
      // TODO: remove confirm
      const result = confirm(`${filename}已存在,覆盖(Y)或追加(N)`)
      if (result)
        localStorage.setItem(filename, json)
      else
        appendItem(filename, JSON.parse(json))
    }
    else {
      localStorage.setItem(filename, json)
    }
    return initLocalStorage()
  })
}

export function appendItem(tag: string, newItem: DataItem | FormulaItem) {
  const array = JSON.parse(localStorage.getItem(tag) as string)
  array.push(newItem)
  localStorage.setItem(tag, JSON.stringify(array))
}
