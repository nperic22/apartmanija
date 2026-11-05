import { useState } from 'react'
import CrudTablica from '../components/CrudTablica'
import { VRSTE_PODSJETNIKA, danas, formatDatum } from '../constants'
import { useLista } from '../hooks'
import PodsjetnikService from '../services/PodsjetnikService'

export default function Podsjetnici() {

    const podsjetnici = useLista(PodsjetnikService)
    const [samoOtvoreni, setSamoOtvoreni] = useState(false)

    const prikaz = podsjetnici.stavke
        .filter((p) => !samoOtvoreni || !p.gotovo)
        .sort((a, b) => Number(a.gotovo) - Number(b.gotovo) || a.datum.localeCompare(b.datum))

    async function prebaci(p) {
        await PodsjetnikService.promijeni(p.sifra, { gotovo: !p.gotovo })
        await podsjetnici.osvjezi()
    }

    return (
        <CrudTablica
            naslov="Podsjetnici"
            novi="Novi podsjetnik"
            servis={PodsjetnikService}
            stavke={prikaz}
            osvjezi={podsjetnici.osvjezi}
            prazno="Nema podsjetnika."
            alat={(
                <div className="alat">
                    <label className="kvacica-filtar">
                        <input type="checkbox" checked={samoOtvoreni} onChange={(e) => setSamoOtvoreni(e.target.checked)} />
                        Samo neobavljeni
                    </label>
                </div>
            )}
            fields={[
                { name: 'tekst', label: 'Podsjetnik', required: true },
                { name: 'vrsta', label: 'Vrsta', type: 'select', required: true, options: VRSTE_PODSJETNIKA.map((v) => ({ value: v, label: v })) },
                { name: 'datum', label: 'Datum', type: 'date', required: true, default: danas() },
                { name: 'gotovo', label: 'Obavljeno', type: 'checkbox' },
            ]}
            columns={[
                { render: (p) => <span className={!p.gotovo && p.datum < danas() ? 'kasni' : ''}>{formatDatum(p.datum)}</span>, label: 'Datum' },
                { render: (p) => <span className={p.gotovo ? 'precrtano' : ''}>{p.tekst}</span>, label: 'Podsjetnik' },
                { key: 'vrsta', label: 'Vrsta' },
                { render: (p) => <button className={p.gotovo ? 'oznaka ok' : 'oznaka'} onClick={() => prebaci(p)} title="Promijeni stanje">{p.gotovo ? 'Obavljeno' : 'Treba obaviti'}</button>, label: 'Stanje' },
            ]}
        />
    )
}
