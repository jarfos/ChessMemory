# Napiszmy prostą grę planszową...
Gra napisana w języku JavaScript, przy wykorzystaniu grafiki SVG.

## Wstęp
[ChessMemory](https://jarfos.github.io/ChessMemory/) jest prostą grą planszową, którą wymyśliłem i napisałem kiedyś w ramach zajęć z przedmiotu Podstawy Programowania.

Oczywiście nie wróżę tej grze wielkiego sukcesu komercyjnego, nie zamierzam jej jakoś szczególnie promować. Chodzi wyłącznie o wykorzystanie kilku narzędzi i napisanie paru linijek kodu. Może w ten sposób zainspiruję część początkujących programistów do realizacji własnych pomysłów, a przy okazji poruszę kilka zagadnień związanych z programowaniem...

## Zasady gry
[ChessMemory](https://jarfos.github.io/ChessMemory/) czerpie z dwóch na pozór bardzo różnych od siebie gier: szachów oraz memory (stąd ta „oryginalna” nazwa). Zasady są bardzo podobne do memory, czyli chodzi o odkrywanie obrazków na planszy w taki sposób, żeby do siebie pasowały. Odkrycie dwóch różnych obrazków powoduje ich ponowne zakrycie, natomiast dwa identyczne obrazki pozostają do końca gry odkryte. Gra kończy się wtedy, gdy zostaną odkryte wszystkie obrazki na planszy. Chyba każdy grał kiedyś w jakąś odmianę tej popularnej gry. ChessMemory natomiast wprowadza kilka dodatkowych zasad:

* Planszą gry jest szachownica, a obrazkami cztery figury szachowe (hetman, wieża, goniec i skoczek).
* Każda figura może występować po 8 razy w dwóch różnych kolorach (białym i czarnym) – po cztery pary na kolor. Razem mamy 64 figury rozstawione na 64 polach szachownicy.
* Każda figura może mieć tylko jedną figurę do pary – musi być taka sama, mieć ten sam kolor oraz stać w „zasięgu” bicia swojej pary.
* Odkrycie dwóch identycznych figur w tym samym kolorze, lecz stojących na polach, które nie są „bite” przez drugą figurę, traktowane jest jak odkrycie dwóch różnych figur.

## Zawartość
W [pierwszej części](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part1) opisuję, jak stworzyć planszę do gry. Jest to szachownica przygotowana w programie Inkscape i zapisana jako plik SVG. Ponadto, również w Inkscape, przygotujemy 4 figury szachowe, z których następnie powstanie czcionka TrueType. Wykorzystamy ją później jako „nośnik” glyphów.

[Druga część](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part2) zawiera silnik gry, czyli program do rozstawiania figur na szachownicy, inicjację gry, wyświetlanie i ukrywanie figur. Dodatkową funkcjonalnością jest podświetlanie pól bicia każdej figury. Poza tym dochodzi obsługa logiki gry oraz wyświetlanie wyników (licznik) i czasu trwania gry (stoper).

W ostatniej, [trzeciej części](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part3) powstaje generator losowy inicjalnego rozstawienia figur na szachownicy, aby za każdym razem gra rozpoczynała się od nowo wylosowanego rozstawienia.

## Zapraszam do lektury
* [Część   I: https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part1](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part1)
* [Część  II: https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part2](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part2)
* [Część III: https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part3](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part3)
