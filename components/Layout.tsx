import Footer from './Footer'
import LocaleSwitch from './LocaleSwitch'

const Layout = ({ children }) => {
  return (
    <div>
      <LocaleSwitch />
      {children}
    </div>
  )
}

export default Layout
