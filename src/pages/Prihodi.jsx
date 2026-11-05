import { useState } from 'react'
import { MJESECI, formatCijena, mjesecKljuc } from '../constants'
import { useLista } from '../hooks'
import ApartmanService from '../services/ApartmanService'
import RezervacijaService from '../services/RezervacijaService'

const KLJUC_CILJA = 'ar_cilj'

const procitajCilj = () => {
    try { return Number(localStorage.getItem(KLJUC_CILJA)) || 3000 } catch { return 3000 }
}

export default function Prihodi() {

    const sada = new Date()
    const [g, setG] = useState(sada.getFullYear())
    const [m, setM] = useState(sada.getMonth())
    const [cilj, setCilj] = useState(procitajCilj)
    const apartmani = useLista(ApartmanService)
    const rezervacije = useLista(RezervacijaService)

    const kljuc = `${g}-${String(m + 1).padStart(2, '0')}`
    const uMjesecu = rezervacije.stavke.filter((r) => mjesecKljuc(r.dolazak) === kljuc)
    const primljeno = uMjesecu.filter((r) => r.placeno).reduce((z, r) => z + r.cijena, 0)
    const ocekivano = uMjesecu.filter((r) => !r.placeno).reduce((z, r) => z + r.cijena, 0)
    const postotak = Math.min(100, Math.round((primljeno / cilj) * 100))

    const promijeniCilj = (v) => {
        const n = Number(v)
        setCilj(n > 0 ? n : 0)
        try { localStorage.setItem(KLJUC_CILJA, String(n > 0 ? n : 0)) } catch { /* localStorage nije dostupan */ }
    }
    const pomak = (d) => {
        const n = new Date(g, m + d, 1)
        setG(n.getFullYear()); setM(n.getMonth())
    }

    return (
        <>
            <div className="glava bez-ispisa">
                <h1>Prihodi i ciljevi</h1>
                <div className="alat bez-razmaka">
                    <button className="gumb sporedni" onClick={() => pomak(-1)}>← Prethodni</button>
                    <b className="mjesec">{MJESECI[m]} {g}.</b>
                    <button className="gumb sporedni" onClick={() => pomak(1)}>Sljedeći →</button>
                    <button className="gumb" onClick={() => window.print()}>PDF izvještaj</button>
                </div>
            </div>
            <h1 className="ispis-samo">Izvještaj o prihodima: {MJESECI[m]} {g}.</h1>

            <div className="kutije">
                <div className="kutija statistika"><b>{formatCijena(primljeno)}</b><span>Primljeno</span></div>
                <div className="kutija statistika"><b>{formatCijena(ocekivano)}</b><span>Očekuje se (neplaćeno)</span></div>
                <div className="kutija statistika">
                    <label className="cilj">Mjesečni cilj (€)
                        <input type="number" value={cilj} onChange={(e) => promijeniCilj(e.target.value)} />
                    </label>
                </div>
            </div>

            <h2>Napredak prema cilju: {postotak} %</h2>
            <div className="napredak"><div style={{ width: `${postotak}%` }} /></div>
            <p className="prigusen">{cilj > 0 ? `Do cilja nedostaje ${formatCijena(Math.max(0, cilj - primljeno))}.` : 'Postavite mjesečni cilj.'}</p>

            <h2>Po apartmanima</h2>
            <div className="kutija tablica-omot">
                <table>
                    <thead><tr><th>Apartman</th><th>Rezervacija</th><th>Primljeno</th><th>Očekuje se</th></tr></thead>
                    <tbody>
                        {apartmani.stavke.map((a) => {
                            const r = uMjesecu.filter((x) => x.apartmanSifra === a.sifra)
                            return (
                                <tr key={a.sifra}>
                                    <td><span className="tocka" style={{ background: a.boja }} /> {a.naziv}</td>
                                    <td>{r.length}</td>
                                    <td>{formatCijena(r.filter((x) => x.placeno).reduce((z, x) => z + x.cijena, 0))}</td>
                                    <td>{formatCijena(r.filter((x) => !x.placeno).reduce((z, x) => z + x.cijena, 0))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
