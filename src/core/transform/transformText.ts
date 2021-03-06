import { handleBracket } from './handleBracket'
import { normalize, transformFns } from './transformFn'
import { MAX_DEPTH } from '@/util/shared'
import type { DataItem, FormulaItem } from '@/types'

export function transformText(text: string, formulas: FormulaItem[], data: DataItem[]) {
  let formulaDepth = MAX_DEPTH
  while (
    formulas.some(formula => text.includes(formula.code))
    && formulaDepth--
  ) {
    // eslint-disable-next-line prefer-const
    for (let { code, formula } of formulas) {
      formula = `(${formula})`
      text = text.replaceAll(code, formula)
    }
  }
  if (formulaDepth === 0)
    throw new Error('too deep')

  text = normalize(text)
  text = handleBracket(text)
  transformFns.forEach(fn => {
    let textDepth = MAX_DEPTH
    let last = 'DEFAULT'
    while (last !== text && textDepth > 0) {
      last = text
      text = fn(text)
      textDepth--
    }
  })

  for (const { code, dataId } of data)
    text = text.replaceAll(code, dataId)

  return text
}
