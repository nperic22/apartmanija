import { napraviServis } from './Kolekcija'

// Entitet 2: Gost (baza stalnih gostiju). Svi početni podaci su izmišljeni (demo).
export const gosti = [
    { sifra: 1, ime: 'Anna', prezime: 'Weber', telefon: '+49 000 000001', email: 'anna.weber@example.com', oib: '', jezik: 'Njemački', biljeska: 'Stalna gošća, voli mirne apartmane.' },
    { sifra: 2, ime: 'Luka', prezime: 'Marić', telefon: '091 000 0002', email: 'luka.maric@example.com', oib: '', jezik: 'Hrvatski', biljeska: '' },
    { sifra: 3, ime: 'Marco', prezime: 'Rossi', telefon: '+39 000 000003', email: 'marco.rossi@example.com', oib: '', jezik: 'Talijanski', biljeska: 'Dolazi s psom.' },
]

export default napraviServis('ar_gosti', gosti)
