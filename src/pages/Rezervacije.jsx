import CrudTablica from '../components/CrudTablica'
import { formatCijena, formatDatum, nocenja } from '../constants'
import { useLista } from '../hooks'
import ApartmanService from '../services/ApartmanService'
import GostService from '../services/GostService'
import RezervacijaService from '../services/RezervacijaService'

export default function Rezervacije({ idi }) {

    const rezervacije = useLista(RezervacijaService)
    const apartmani = useLista(ApartmanService)
    const gosti = useLista(GostService)

    const apartman = (sifra) => apartmani.stavke.find((a) => a.sifra === sifra)
    const gost = (sifra) => {
        const x = gosti.stavke.find((q) => q.sifra === sifra)
        return x ? `${x.ime} ${x.prezime}` : '—'
    }
    const sortirane = [...rezervacije.stavke].sort((a, b) => b.dolazak.localeCompare(a.dolazak))

    function validate(v, uredjuje) {
        const g = {}
        if (v.odlazak <= v.dolazak) g.odlazak = 'Odlazak mora biti nakon dolaska.'
        const a = apartman(Number(v.apartmanSifra))
        if (a && Number(v.gosti) > a.kapacitet) g.gosti = `Apartman prima najviše ${a.kapacitet} gostiju.`
        if (!(Number(v.gosti) >= 1)) g.gosti = 'Unesite broj gostiju.'
        if (!(Number(v.cijena) >= 0)) g.cijena = 'Cijena ne može biti negativna.'
        // dvostruka rezervacija: isti apartman, preklapanje razdoblja
        const sukob = rezervacije.stavke.find((r) =>
            r.sifra !== uredjuje?.sifra && r.apartmanSifra === Number(v.apartmanSifra) && r.dolazak < v.odlazak && v.dolazak < r.odlazak)
        if (sukob && !g.odlazak) g.dolazak = `Dvostruka rezervacija: apartman je zauzet (${gost(sukob.gostSifra)}, ${formatDatum(sukob.dolazak)} do ${formatDatum(sukob.odlazak)}).`
        return g
    }

    return (
        <CrudTablica
            naslov="Rezervacije"
            novi="Nova rezervacija"
            servis={RezervacijaService}
            stavke={sortirane}
            osvjezi={rezervacije.osvjezi}
            prazno="Još nema rezervacija."
            validate={validate}
            fields={[
                { name: 'apartmanSifra', label: 'Apartman', type: 'select', asNumber: true, required: true, options: apartmani.stavke.map((a) => ({ value: a.sifra, label: a.naziv })) },
                { name: 'gostSifra', label: 'Gost', type: 'select', asNumber: true, required: true, options: gosti.stavke.map((x) => ({ value: x.sifra, label: `${x.ime} ${x.prezime}` })) },
                { name: 'dolazak', label: 'Dolazak', type: 'date', required: true },
                { name: 'odlazak', label: 'Odlazak', type: 'date', required: true },
                { name: 'gosti', label: 'Broj gostiju', type: 'number', required: true, default: 2 },
                { name: 'cijena', label: 'Ukupna cijena (€)', type: 'number', step: '0.01', required: true },
                { name: 'placeno', label: 'Plaćeno', type: 'checkbox' },
                { name: 'biljeska', label: 'Privatna bilješka', type: 'textarea' },
            ]}
            columns={[
                { render: (r) => `${formatDatum(r.dolazak)} – ${formatDatum(r.odlazak)}`, label: 'Razdoblje' },
                { render: (r) => `${nocenja(r.dolazak, r.odlazak)}`, label: 'Noći' },
                { render: (r) => <><span className="tocka" style={{ background: apartman(r.apartmanSifra)?.boja }} /> {apartman(r.apartmanSifra)?.naziv ?? '—'}</>, label: 'Apartman' },
                { render: (r) => gost(r.gostSifra), label: 'Gost' },
                { render: (r) => formatCijena(r.cijena), label: 'Cijena' },
                { render: (r) => <span className={r.placeno ? 'oznaka ok' : 'oznaka'}>{r.placeno ? 'Plaćeno' : 'Nije plaćeno'}</span>, label: 'Plaćanje' },
                { render: (r) => <button className="veza" onClick={() => idi('racun', r.sifra)}>Račun</button>, label: 'PDF' },
            ]}
        />
    )
}
