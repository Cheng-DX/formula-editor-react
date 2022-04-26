import { useState } from 'react'
// import type { DataItem, FilterFn, FormulaItem } from '@/types'

export function useTips() {
  return useState(false)
}
// export const [addPanelVisible, setAddPanelVisible] = useState(false)

// export const [data, setData] = useState<DataItem[]>()
// export const [formulas, setFormulas] = useState<FormulaItem[]>()

// export const [filterFn, setFilterFn] = useState<FilterFn>({
//   data: () => true,
//   formula: () => true,
// })
