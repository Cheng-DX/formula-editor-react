import { useDisplayedItems } from '@/core'
import EditPanel from '@/pages/editPanel'
import NavBar from '@/pages/navBar'
import './App.css'

export default function App() {
  const { displayedData, displayedFormula, setFilterFn, formulas, data, setData, setFormulas } = useDisplayedItems()

  return (
    <div className="app">
      <NavBar setData={setData} setFormulas={setFormulas} />
      <EditPanel
        displayedData={displayedData}
        displayedFormula={displayedFormula}
        formulas={formulas}
        data={data}
        setFilterFn={setFilterFn} />
    </div>
  )
}

