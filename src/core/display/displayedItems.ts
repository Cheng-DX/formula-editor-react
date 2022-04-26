import { useEffect, useState } from 'react'
import { initLocalStorage } from '../state/localStorage'
import type { DataItem, FilterFn, FormulaItem } from '@/types'

export function useDisplayedItems() {
  const { dataList, formulaList } = initLocalStorage()

  const [data] = useState<DataItem[]>(dataList)
  const [formulas] = useState<FormulaItem[]>(formulaList)

  const [filterFn, setFilterFn] = useState<FilterFn>({
    data: () => true,
    formula: () => true,
  })
  const [displayedData, setDisplayedData] = useState<DataItem[]>([])
  const [displayedFormula, setDisplayedFormula] = useState<FormulaItem[]>([])

  useEffect(() => {
    setDisplayedFormula(formulas.filter(filterFn.formula))
  }, [formulas, filterFn])

  useEffect(() => {
    setDisplayedData(data.filter(filterFn.data))
  }, [data, filterFn])

  return {
    formulas,
    data,
    setFilterFn,
    displayedData,
    displayedFormula,
  }
}
