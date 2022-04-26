import { useEffect, useState } from 'react'
import { initLocalStorage } from '../state/localStorage'
import type { DataItem, FilterFn, FormulaItem } from '@/types'

export function useDisplayedItems() {
  const { dataList, formulaList } = initLocalStorage()

  const [data, setData] = useState<DataItem[]>(dataList)
  const [formula, setFormula] = useState<FormulaItem[]>(formulaList)

  const [filterFn, setFilterFn] = useState<FilterFn>({
    data: () => true,
    formula: () => true,
  })
  const [displayedData, setDisplayedData] = useState<DataItem[]>([])
  const [displayedFormula, setDisplayedFormula] = useState<FormulaItem[]>([])

  useEffect(() => {
    setDisplayedFormula(formula.filter(filterFn.formula))
  }, [formula, filterFn])

  useEffect(() => {
    setDisplayedData(data.filter(filterFn.data))
  }, [data, filterFn])

  return {
    setData,
    setFormula,
    setFilterFn,
    displayedData,
    displayedFormula,
  }
}
