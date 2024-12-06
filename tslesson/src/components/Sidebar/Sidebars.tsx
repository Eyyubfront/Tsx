
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div style={{ width: '200px', padding: '20px', backgroundColor: '#f4f4f4',position:"absolute",left:0 }}>
      <h3>Sidebar</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
