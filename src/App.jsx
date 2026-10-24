import CartDrawer from './components/CartDrawer.jsx'
import CreateWrapBanner from './components/CreateWrapBanner.jsx'
import FeatureStrip from './components/FeatureStrip.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import LocationSection from './components/LocationSection.jsx'
import MenuSection from './components/MenuSection.jsx'
import Navbar from './components/Navbar.jsx'
import Toast from './components/Toast.jsx'
import WrapBuilder from './components/WrapBuilder.jsx'
import { CartProvider } from './context/CartContext.jsx'

export default function App() {
  return (
    <CartProvider>
      <a className="skip-link" href="#menu">Saltar al menú</a>
      <Navbar />
      <main>
        <Hero />
        <FeatureStrip />
        <MenuSection />
        <CreateWrapBanner />
        <LocationSection />
      </main>
      <Footer />
      <WrapBuilder />
      <CartDrawer />
      <Toast />
    </CartProvider>
  )
}
