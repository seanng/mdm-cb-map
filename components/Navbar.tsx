export function Navbar() {
  return (
    <header className="z-navigation bg-gray-800">
      <div className="flex justify-between items-center h-navbar-height px-3 xl:px-[4%]">
        <Logo />
        <div />
      </div>
    </header>
  )
}

function Logo() {
  return <div className="text-white">LOGO</div>
}
