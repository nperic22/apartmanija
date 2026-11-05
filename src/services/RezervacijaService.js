import { napraviServis } from './Kolekcija'

// Entitet 3: Rezervacija (apartman + gost + razdoblje). Početni podaci su demo.
export const rezervacije = [
    { sifra: 1, apartmanSifra: 1, gostSifra: 1, dolazak: '2026-10-03', odlazak: '2026-10-09', gosti: 3, cijena: 420, placeno: true, biljeska: 'Dolazak oko 16 sati.' },
    { sifra: 2, apartmanSifra: 2, gostSifra: 2, dolazak: '2026-10-12', odlazak: '2026-10-15', gosti: 2, cijena: 165, placeno: true, biljeska: '' },
    { sifra: 3, apartmanSifra: 3, gostSifra: 3, dolazak: '2026-10-25', odlazak: '2026-11-02', gosti: 5, cijena: 760, placeno: false, biljeska: 'Ostatak plaćanja pri dolasku.' },
    { sifra: 4, apartmanSifra: 1, gostSifra: 2, dolazak: '2026-11-05', odlazak: '2026-11-08', gosti: 2, cijena: 210, placeno: false, biljeska: '' },
]

export default napraviServis('ar_rezervacije', rezervacije)
