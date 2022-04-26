import EditPanel from '@/pages/editPanel'
import './App.css'

export default function App() {
  return (
    <div className="root">
      <div className="h-50px header">
        Header
      </div>
      <div className="mt-50px main">
        <EditPanel />
      </div>
    </div>
  )
}

