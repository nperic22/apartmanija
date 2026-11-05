export const IME_APLIKACIJE = 'Rezervacije apartmana'
export const AUTOR = 'Nikola Perić'

export const STRANICE = [
    { id: 'kalendar', naziv: 'Kalendar', izbornik: true },
    { id: 'rezervacije', naziv: 'Rezervacije', izbornik: true },
    { id: 'gosti', naziv: 'Gosti', izbornik: true },
    { id: 'apartmani', naziv: 'Apartmani', izbornik: true },
    { id: 'podsjetnici', naziv: 'Podsjetnici', izbornik: true },
    { id: 'prihodi', naziv: 'Prihodi', izbornik: true },
    { id: 'racun', naziv: 'Račun', izbornik: false },
]

export const JEZICI = ['Hrvatski', 'Engleski', 'Njemački', 'Talijanski', 'Slovenski', 'Ostalo']
export const VRSTE_PODSJETNIKA = ['Check-in', 'Čišćenje', 'Popravak', 'Praćenje plaćanja', 'Ostalo']
export const MJESECI = ['siječanj', 'veljača', 'ožujak', 'travanj', 'svibanj', 'lipanj', 'srpanj', 'kolovoz', 'rujan', 'listopad', 'studeni', 'prosinac']

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// 2027-02-14 -> 14. 02. 2027.
export const formatDatum = (d) => (d ? d.split('-').reverse().join('. ') + '.' : '')

export const formatCijena = (c) =>
    new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(c)

export const danas = () => new Date().toISOString().slice(0, 10)

// broj noćenja između dva datuma
export const nocenja = (od, do_) => Math.round((new Date(do_) - new Date(od)) / 86400000)

// datum u obliku 2026-10-05 iz godine, mjeseca (0-11) i dana
export const iso = (g, m, d) => `${g}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

// ključ mjeseca za grupiranje, npr. 2026-10
export const mjesecKljuc = (datum) => datum.slice(0, 7)
