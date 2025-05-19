import { useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import Approutes from "./routes/Approutes"


function App() {
  return (
    <div className="pt-16 min-h-screen">
      <Navbar/>
      <Approutes />
    </div>
  )
}

export default App
