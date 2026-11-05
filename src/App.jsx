import { AUTOR, IME_APLIKACIJE, STRANICE } from './constants'
import { useRuta } from './hooks'
import Apartmani from './pages/Apartmani'
import Gosti from './pages/Gosti'
import Kalendar from './pages/Kalendar'
import Podsjetnici from './pages/Podsjetnici'
import Prihodi from './pages/Prihodi'
import Racun from './pages/Racun'
import Rezervacije from './pages/Rezervacije'

function App() {
  const { stranica, param, idi } = useRuta(STRANICE)

  return (
    <>
      <header className="zaglavlje bez-ispisa">
        <button className="logo" onClick={() => idi('kalendar')}>
          {IME_APLIKACIJE}
          <span className="autor">{AUTOR}</span>
        </button>
        <nav className="izbornik">
          {STRANICE.filter((s) => s.izbornik).map((s) => (
            <button key={s.id} className={s.id === stranica ? 'aktivna' : ''} onClick={() => idi(s.id)}>
              {s.naziv}
            </button>
          ))}
        </nav>
      </header>

      <main className="sadrzaj">
        {stranica === 'rezervacije' ? <Rezervacije idi={idi} />
          : stranica === 'gosti' ? <Gosti />
          : stranica === 'apartmani' ? <Apartmani />
          : stranica === 'podsjetnici' ? <Podsjetnici />
          : stranica === 'prihodi' ? <Prihodi />
          : stranica === 'racun' ? <Racun sifra={param} idi={idi} />
          : <Kalendar idi={idi} />}
      </main>

      <footer className="podnozje bez-ispisa">&copy; {IME_APLIKACIJE}</footer>
    </>
  )
}

export default App
