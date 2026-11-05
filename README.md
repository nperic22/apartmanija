# Rezervacije apartmana

Aplikacija za iznajmljivače apartmana: kalendar rezervacija, baza gostiju, prihodi i ciljevi, PDF izvještaji i podsjetnici.

Autor: Nikola P.

## Entiteti (CRUD nad svima)

- **Apartman**: naziv, boja u kalendaru, kapacitet, cijena noćenja
- **Gost**: ime, prezime, telefon, e-mail, OIB (nije obavezan), preferirani jezik, bilješke
- **Rezervacija**: apartman, gost, dolazak, odlazak, broj gostiju, ukupna cijena, plaćeno (kvačica), privatna bilješka
- **Podsjetnik**: tekst, vrsta (check-in, čišćenje, popravak, praćenje plaćanja), datum, obavljeno (kvačica)

## Funkcije
- **Vizualni kalendar** svih rezervacija: svaki apartman ima svoju boju, slobodni termini su prazni, dvostruke rezervacije crvene.
- **Provjera dvostruke rezervacije** pri unosu i provjera kapaciteta apartmana.
- **Prihodi i ciljevi**: mjesečni cilj, primljeno i očekivano po mjesecu i apartmanu, traka napretka.
- **PDF**: izvještaj o prihodima i račun za rezervaciju (ispis preglednika, „Spremi kao PDF”).
- **Podsjetnici** s filtrom neobavljenih i bilješke uz svaku rezervaciju.

Početni podaci su izmišljeni (demo). Podaci se spremaju u `localStorage` preglednika.

## Tehnologije
React 19, Vite
