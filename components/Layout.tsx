import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout({ children }) {
  return (
    <div className="bg-slate-100">
      {/* <Navbar /> */}
      <div className="min-h-screen mx-auto xl:w-[92%] 2xl:w-[1600px] pb-7">
        {children}
      </div>
      <Footer />
    </div>
  )
}
