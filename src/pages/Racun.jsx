import { formatCijena, formatDatum, nocenja } from '../constants'
import { useLista } from '../hooks'
import ApartmanService from '../services/ApartmanService'
import GostService from '../services/GostService'
import RezervacijaService from '../services/RezervacijaService'

export default function Racun({ sifra, idi }) {

    const rezervacije = useLista(RezervacijaService)
    const apartmani = useLista(ApartmanService)
    const gosti = useLista(GostService)

    if (!rezervacije.ucitano) return <p className="prigusen">Učitavanje...</p>
    const r = rezervacije.stavke.find((x) => x.sifra === Number(sifra))
    if (!r) return <p>Rezervacija nije pronađena. <button className="veza" onClick={() => idi('rezervacije')}>Natrag</button></p>

    const a = apartmani.stavke.find((x) => x.sifra === r.apartmanSifra)
    const g = gosti.stavke.find((x) => x.sifra === r.gostSifra)
    const noci = nocenja(r.dolazak, r.odlazak)

    return (
        <article>
            <div className="glava bez-ispisa">
                <button className="veza" onClick={() => idi('rezervacije')}>← Rezervacije</button>
                <button className="gumb" onClick={() => window.print()}>Spremi kao PDF / ispis</button>
            </div>
            <div className="kutija racun">
                <h1>Račun za smještaj br. {r.sifra}</h1>
                <p className="prigusen">Datum izdavanja: {formatDatum(new Date().toISOString().slice(0, 10))}</p>
                <p><b>Gost:</b> {g ? `${g.ime} ${g.prezime}` : '—'}</p>
                <p><b>Apartman:</b> {a?.naziv ?? '—'}</p>
                <p><b>Razdoblje:</b> {formatDatum(r.dolazak)} – {formatDatum(r.odlazak)} ({noci} noći), {r.gosti} gostiju</p>
                <p className="cijena veliko">Ukupno: {formatCijena(r.cijena)}</p>
                <p>Stanje plaćanja: <b>{r.placeno ? 'Plaćeno' : 'Nije plaćeno'}</b></p>
            </div>
        </article>
    )
}
