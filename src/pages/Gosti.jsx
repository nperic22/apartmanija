import CrudTablica from '../components/CrudTablica'
import { EMAIL_RE, JEZICI } from '../constants'
import { useLista } from '../hooks'
import GostService from '../services/GostService'
import RezervacijaService from '../services/RezervacijaService'

export default function Gosti() {

    const gosti = useLista(GostService)
    const rezervacije = useLista(RezervacijaService)

    const brojBoravaka = (sifra) => rezervacije.stavke.filter((r) => r.gostSifra === sifra).length

    function validate(v) {
        const g = {}
        if (v.email && !EMAIL_RE.test(String(v.email).trim())) g.email = 'Unesite ispravan e-mail.'
        if (v.oib && !/^\d{11}$/.test(String(v.oib).trim())) g.oib = 'OIB mora imati 11 znamenki.'
        return g
    }

    return (
        <CrudTablica
            naslov="Baza gostiju"
            novi="Novi gost"
            servis={GostService}
            stavke={gosti.stavke}
            osvjezi={gosti.osvjezi}
            prazno="Još nema gostiju."
            validate={validate}
            fields={[
                { name: 'ime', label: 'Ime', required: true },
                { name: 'prezime', label: 'Prezime', required: true },
                { name: 'telefon', label: 'Telefon', required: true },
                { name: 'email', label: 'E-mail', type: 'email' },
                { name: 'oib', label: 'OIB (nije obavezno)' },
                { name: 'jezik', label: 'Preferirani jezik', type: 'select', required: true, default: 'Hrvatski', options: JEZICI.map((j) => ({ value: j, label: j })) },
                { name: 'biljeska', label: 'Bilješke', type: 'textarea' },
            ]}
            columns={[
                { render: (x) => `${x.ime} ${x.prezime}`, label: 'Gost' },
                { key: 'telefon', label: 'Telefon' },
                { render: (x) => x.email || '—', label: 'E-mail' },
                { key: 'jezik', label: 'Jezik' },
                { render: (x) => brojBoravaka(x.sifra), label: 'Boravaka' },
                { render: (x) => x.biljeska || '—', label: 'Bilješka' },
            ]}
            blokirajBrisanje={(x) => (brojBoravaka(x.sifra) > 0 ? 'Gost ima rezervacije i ne može se obrisati.' : null)}
        />
    )
}
