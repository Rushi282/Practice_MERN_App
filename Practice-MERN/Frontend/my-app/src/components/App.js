import { Outlet } from "react-router-dom"
import Header from "./Header"

function App() {
    return (
        <div className="container">
            <Header />
            <br />
            <h1>Doctor and Patient Registration System</h1>
            {/* <Content />
            <Patient /> */}
            <Outlet />
        </div>
    )
}

export default App
