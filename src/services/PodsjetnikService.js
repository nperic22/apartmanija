import { napraviServis } from './Kolekcija'

// Entitet 4: Podsjetnik (check-in, čišćenje, popravci, praćenje plaćanja). Početni podaci su demo.
export const podsjetnici = [
    { sifra: 1, tekst: 'Očistiti Apartman Maslina nakon odlaska gostiju', datum: '2026-11-02', vrsta: 'Čišćenje', gotovo: false },
    { sifra: 2, tekst: 'Naplatiti ostatak za rezervaciju Maslina', datum: '2026-11-02', vrsta: 'Praćenje plaćanja', gotovo: false },
    { sifra: 3, tekst: 'Popraviti klima-uređaj u Apartmanu More', datum: '2026-10-20', vrsta: 'Popravak', gotovo: true },
]

export default napraviServis('ar_podsjetnici', podsjetnici)
