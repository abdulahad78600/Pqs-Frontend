import { Link } from 'react-router-dom'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'

export default function NotFound() {
  return (
    <section className="relative min-h-[60vh] grid place-items-center">
      <AmbientBackdrop />
      <div className="container-page relative text-center">
        <div className="font-display gold-text text-8xl md:text-9xl">404</div>
        <h2 className="mt-4 h-display text-3xl md:text-4xl">Page not found.</h2>
        <p className="mt-3 text-sand-50/60 max-w-md mx-auto">The page you requested has moved or no longer exists.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-primary">Return home</Link>
          <Link to="/funds" className="btn-ghost">View funds</Link>
        </div>
      </div>
    </section>
  )
}
