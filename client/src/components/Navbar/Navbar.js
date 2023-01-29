import '../Navbar/navbar.css'


export default function Navbar() {
    return (
      <nav className="nav">
        <a className="site-title">Localhost: 3181</a>
        <ul>
          <li>
            <a>Console</a>
            <a>Host</a>
          </li>
        </ul>
      </nav>
    )
  }