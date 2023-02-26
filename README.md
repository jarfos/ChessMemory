# Napiszmy prostą grę planszową...
Gra napisana w języku JavaScript, przy wykorzystaniu grafiki SVG.

ChessMemory jest prostą grą planszową, którą wymyśliłem i napisałem kiedyś w ramach zajęć z przedmiotu Podstawy Programowania, prowadzonych przeze mnie przez kilka semestrów na studiach podyplomowych.

Oczywiście nie wróżę tej grze wielkiego sukcesu komercyjnego, nie zamierzam jej jakoś szczególnie promować. Chodzi wyłącznie o wykorzystanie kilku narzędzi i napisanie paru linijek kodu. Może w ten sposób zainspiruję część początkujących programistów do realizacji własnych pomysłów, a przy okazji opiszę kilka zagadnień związanych z programowaniem...

## Zasady gry
ChessMemory czerpie z dwóch na pozór bardzo różnych od siebie gier: szachów oraz memory (stąd ta „oryginalna” nazwa). Zasady są bardzo podobne do memory, czyli chodzi o odkrywanie obrazków na planszy w taki sposób, żeby do siebie pasowały. Odkrycie dwóch różnych obrazków powoduje ich ponowne zakrycie, natomiast dwa identyczne obrazki pozostają do końca gry odkryte. Gra kończy się wtedy, gdy zostaną odkryte wszystkie obrazki na planszy. Chyba każdy grał kiedyś w jakąś odmianę tej popularnej gry. ChessMemory natomiast wprowadza kilka dodatkowych zasad:

* Planszą gry jest szachownica, a obrazkami cztery figury szachowe (hetman, wieża, goniec i skoczek).
* Każda figura może występować po 8 razy w dwóch różnych kolorach (białym i czarnym) – po cztery pary na kolor. Razem mamy 64 figury rozstawione na 64 polach szachownicy.
* Każda figura może mieć tylko jedną figurę do pary – musi być taka sama, mieć ten sam kolor oraz stać w „zasięgu” bicia swojej pary.
* Odkrycie dwóch identycznych figur w tym samym kolorze, lecz stojących na polach, które nie są „bite” przez drugą figurę, traktowane jest jak odkrycie dwóch różnych figur.

## Zawartość cyklu
W [pierwszej części](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part1) opisuję, jak stworzyć planszę do gry. Jest to szachownica przygotowana w programie Inkscape i zapisana jako plik SVG. Ponadto, również w Inkscape, przygotujemy 4 figury szachowe, z których następnie powstanie czcionka ```TrueType```. Wykorzystamy ją później jako „nośnik” glyphów.

W [drugiej części](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part2) piszemy program do rozstawiania figur na szachownicy, inicjację gry, wyświetlanie i ukrywanie figur. Dodatkową funkcjonalnością będzie podświetlanie pól bicia każdej figury. Poza tym dojdzie obsługa logiki gry oraz wyświetlanie wyników i czasu trwania gry.

W ostatniej, [trzeciej części](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part3) powstaje generator losowy inicjalnego rozstawienia figur na szachownicy, aby za każdym razem gra rozpoczynała się od nowo wylosowanego rozstawienia.

Zapraszam do lektury całego cyklu:
* [Część I](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part1)
* [Część II](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part2)
* [Część III](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part3)
