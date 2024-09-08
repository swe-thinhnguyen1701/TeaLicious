function Navbar({setCurrentPage}) {
    return (
        <nav>
            <ul>
                <li className="nav-link" onClick={() => {
                    setCurrentPage("BLACK TEA")
                }}><a href="#">BLACK TEA</a></li>
                <li className="nav-link" onClick={() => {
                    setCurrentPage("GREEN TEA")
                }}><a href="#">GREEN TEA</a></li>
                <li className="nav-link" onClick={() => {
                    setCurrentPage("OOLONG TEA")
                }}><a href="#">OOLONG TEA</a></li>
                <li className="nav-link" onClick={() => {
                    setCurrentPage("WHITE TEA")
                }}><a href="#">WHITE TEA</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;