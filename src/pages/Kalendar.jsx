import { useState } from 'react'
import { MJESECI, danas, iso } from '../constants'
import { useLista } from '../hooks'
import ApartmanService from '../services/ApartmanService'
import GostService from '../services/GostService'
import RezervacijaService from '../services/RezervacijaService'

export default function Kalendar({ idi }) {

    const pocetak = new Date()
    const [g, setG] = useState(pocetak.getFullYear())
    const [m, setM] = useState(pocetak.getMonth())
    const apartmani = useLista(ApartmanService)
    const rezervacije = useLista(RezervacijaService)
    const gosti = useLista(GostService)

    const brojDana = new Date(g, m + 1, 0).getDate()
    const dani = Array.from({ length: brojDana }, (_, i) => i + 1)

    const pomak = (d) => {
        const n = new Date(g, m + d, 1)
        setG(n.getFullYear()); setM(n.getMonth())
    }

    const gost = (sifra) => {
        const x = gosti.stavke.find((q) => q.sifra === sifra)
        return x ? `${x.ime} ${x.prezime}` : '—'
    }

    // rezervacije koje zauzimaju taj dan (dan odlaska je slobodan)
    const zauzeto = (apartmanSifra, datum) =>
        rezervacije.stavke.filter((r) => r.apartmanSifra === apartmanSifra && r.dolazak <= datum && datum < r.odlazak)

    return (
        <>
            <div className="glava">
                <h1>Kalendar rezervacija</h1>
                <div className="alat bez-razmaka">
                    <button className="gumb sporedni" onClick={() => pomak(-1)}>← Prethodni</button>
                    <b className="mjesec">{MJESECI[m]} {g}.</b>
                    <button className="gumb sporedni" onClick={() => pomak(1)}>Sljedeći →</button>
                    <button className="gumb sporedni" onClick={() => { setG(new Date().getFullYear()); setM(new Date().getMonth()) }}>Danas</button>
                </div>
            </div>

            <div className="kutija kalendar-omot">
                <table className="kalendar">
                    <thead>
                        <tr>
                            <th className="apartman-naslov">Apartman</th>
                            {dani.map((d) => <th key={d} className={iso(g, m, d) === danas() ? 'danas' : ''}>{d}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {apartmani.stavke.map((a) => (
                            <tr key={a.sifra}>
                                <td className="apartman-naslov"><span className="tocka" style={{ background: a.boja }} /> {a.naziv}</td>
                                {dani.map((d) => {
                                    const r = zauzeto(a.sifra, iso(g, m, d))
                                    const sukob = r.length > 1
                                    return (
                                        <td key={d} className={`dan ${r.length ? 'zauzet' : ''} ${sukob ? 'sukob' : ''}`}
                                            style={r.length && !sukob ? { background: a.boja } : undefined}
                                            title={r.length ? r.map((x) => `${gost(x.gostSifra)} (${x.dolazak} do ${x.odlazak})`).join('; ') : 'Slobodno'}
                                            onClick={() => idi('rezervacije')} />
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="prigusen">Obojeni dani su zauzeti, prazni su slobodni. Dan odlaska je slobodan za novi dolazak. Crveno označava dvostruku rezervaciju.</p>
        </>
    )
}
