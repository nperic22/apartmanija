import { napraviServis } from './Kolekcija'

// Entitet 1: Apartman (svaki ima svoju boju u kalendaru). Svi početni podaci su izmišljeni (demo).
export const apartmani = [
    { sifra: 1, naziv: 'Apartman Sunce (demo)', boja: '#e07a1f', kapacitet: 4, cijenaNocenja: 70 },
    { sifra: 2, naziv: 'Apartman More (demo)', boja: '#0e7490', kapacitet: 2, cijenaNocenja: 55 },
    { sifra: 3, naziv: 'Apartman Maslina (demo)', boja: '#4d8f3a', kapacitet: 6, cijenaNocenja: 95 },
]

export default napraviServis('ar_apartmani', apartmani)
