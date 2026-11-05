import CrudTablica from '../components/CrudTablica'
import { formatCijena } from '../constants'
import { useLista } from '../hooks'
import ApartmanService from '../services/ApartmanService'
import RezervacijaService from '../services/RezervacijaService'

export default function Apartmani() {

    const apartmani = useLista(ApartmanService)
    const rezervacije = useLista(RezervacijaService)

    const brojRezervacija = (sifra) => rezervacije.stavke.filter((r) => r.apartmanSifra === sifra).length

    return (
        <CrudTablica
            naslov="Apartmani"
            novi="Novi apartman"
            servis={ApartmanService}
            stavke={apartmani.stavke}
            osvjezi={apartmani.osvjezi}
            prazno="Još nema apartmana."
            validate={(v) => {
                const g = {}
                if (!(Number(v.kapacitet) >= 1)) g.kapacitet = 'Kapacitet mora biti barem 1.'
                if (!(Number(v.cijenaNocenja) > 0)) g.cijenaNocenja = 'Cijena noćenja mora biti veća od 0.'
                return g
            }}
            fields={[
                { name: 'naziv', label: 'Naziv apartmana', required: true },
                { name: 'boja', label: 'Boja u kalendaru', type: 'color', required: true, default: '#0e7490' },
                { name: 'kapacitet', label: 'Kapacitet (gostiju)', type: 'number', required: true, default: 4 },
                { name: 'cijenaNocenja', label: 'Cijena noćenja (€)', type: 'number', step: '0.01', required: true },
            ]}
            columns={[
                { render: (a) => <><span className="tocka" style={{ background: a.boja }} /> {a.naziv}</>, label: 'Apartman' },
                { key: 'kapacitet', label: 'Kapacitet' },
                { render: (a) => formatCijena(a.cijenaNocenja), label: 'Noćenje' },
                { render: (a) => brojRezervacija(a.sifra), label: 'Rezervacija' },
            ]}
            blokirajBrisanje={(a) => (brojRezervacija(a.sifra) > 0 ? 'Apartman ima rezervacije i ne može se obrisati.' : null)}
        />
    )
}
