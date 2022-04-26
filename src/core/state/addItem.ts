import { appendItem } from './localStorage'
import type { AddItem } from '@/types'

export function addFormula(item: AddItem) {
  const newFormula = {
    formulaId: item.code,
    formula: item.target,
    name: item.name,
    code: item.code,
  }
  appendItem('formula', newFormula)
  return newFormula
}

export function addData(item: AddItem) {
  const newData = {
    dataId: item.target,
    code: item.code,
    name: item.name,
    unit: '-',
  }
  appendItem('info', newData)
  return newData
}
