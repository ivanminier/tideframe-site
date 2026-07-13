import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Modeboard } from './pages/Modeboard'
import { Products } from './pages/Products'
import { Brand } from './pages/Brand'
import { Acknowledgments } from './pages/Acknowledgments'
import { About, Changelog, NotFound, Privacy, Support, Terms } from './pages/InfoPages'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="modeboard" element={<Modeboard />} />
        <Route path="support" element={<Support />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="changelog" element={<Changelog />} />
        <Route path="about" element={<About />} />
        <Route path="brand" element={<Brand />} />
        <Route path="acknowledgments" element={<Acknowledgments />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
