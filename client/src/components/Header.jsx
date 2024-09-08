import Navbar from "./Navbar";

function Header({setCurrentPage}) {
  return (
    <header className="header">
      <h2><span className="Tea">Tea</span><span>Licious</span></h2>
        <Navbar setCurrentPage={setCurrentPage}/>
    </header>
  )
}

export default Header;