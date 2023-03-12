[ChessMemory](https://jarfos.github.io/ChessMemory/) - [Napiszmy prostą grę planszową...](https://github.com/jarfos/ChessMemory)

# Część III – Generator losowy
Mamy już szachownicę, którą utworzyliśmy w [pierwszej części](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part1), „silnik” gry też już działa, co zostało opisane w [drugiej części](https://github.com/jarfos/ChessMemory/tree/jarfos-github-only/ChessMemory_part2). Pozostało tylko dostarczyć odpowiednich danych temu silnikowi, czyli napisać algorytm, który będzie losował inicjalne ustawienie figur na szachownicy.

## Koncepcja algorytmu
Działanie algorytmu naśladuje w pewnym stopniu działanie człowieka. Zaczynamy od pustej szachownicy i pełnej listy dostępnych figur. Kolejność ustawiania figur może mieć znaczenie, więc – naśladując prawdopodobny wybór człowieka – zaczynamy od hetmanów. Co do pozostałych figur, nie ma pewności jaka kolejność jest najbardziej efektywna. Szczerze mówiąc, wypróbowałem wielu różnych kolejności i wyniki były na tyle rozbieżne, że nie wskazały jednoznacznie najlepszej. Zapewne do wiarygodnych wniosków można by dojść po przebadaniu wszystkich możliwości na próbce kilkuset tysięcy losowań. Ale przecież nie zamierzamy się doktoryzować, tylko napisać prosty generator losowy. Dlatego wybór kolejności ustawiania figur następuje w sposób ekspercki: najpierw hetmany, potem skoczki, następnie gońce i na końcu wieże. Oczywiście będziemy się posiłkować plikiem [bicia.js](https://github.com/jarfos/ChessMemory/blob/main/bicia.js), utworzonym w [poprzedniej części](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part2).

Jak wspomniałem, na początku mamy do dyspozycji pustą szachownicę oraz listę dostępnych figur. Mamy też określoną kolejność ustawiania figur, czyli jest to lista odpowiednio posortowana. Na potrzeby algorytmu będziemy również przechowywać listę możliwych figur (czyli takich, które mogą zostać ustawione na danym polu) dla każdego pola oddzielnie. Każde pole szachownicy będzie mieć własną listę, która w trakcie trwania programu będzie się zmniejszać (będą z niej wykreślane kolejne elementy). Na początku (przed pierwszym krokiem) wszystkie pola na szachownicy potencjalnie mogą „przyjąć” dowolną figurę. W kolejnych krokach powtarzamy kilka czynności:

1. Dla kolejnej figury z listy dostępnych losujemy wolne pole na szachownicy. Wolne pole oznacza pole niezajęte, na którego liście możliwych figur dana figura się znajduje. Przypisujemy tę figurę do wylosowanego pola. Lista możliwych figur tego konkretnego pola odtąd przestaje mieć znaczenie, co jest zrozumiałe, ponieważ pole to właśnie zostało zajęte.
2. Drugą taką samą figurę musimy ustawić na wolnym polu (czyli niezajmowanym przez żadną figurę, oraz takim, które może daną figurę przyjąć), wylosowanym spośród dostępnych pól bicia pierwszej figury.
3. Po ustawieniu obydwu figur wszystkie odpowiadające im pola bicia oznaczamy jako niemożliwe do przyjęcia kolejnej takiej figury. Czyli w praktyce dla wszystkich pól bicia usuwamy tę konkretną figurę z listy możliwych.

Powyższe kroki powtarzamy aż do wyczerpania wszystkich figur. W ten sposób zapełniamy całą szachownicę. Koniec.

## Nie tak szybko...
Przed każdym losowaniem może się okazać, że lista wolnych pól spełniających wymagane warunki będzie pusta, mimo że szachownica jeszcze nie została zapełniona. Może się tak stać w trzech przypadkach:

- wszystkie niezajęte pola na szachownicy nie mogą już przyjąć danej figury (krok 1);
- wszystkie pola bicia już są zajęte (krok 2);
- wszystkie niezajęte pola bicia nie mogą przyjąć danej figury (krok 2).

W takim przypadku docieramy do „ślepej uliczki”, w której dalsze wykonanie algorytmu jest niemożliwe. W tym momencie powinniśmy cofnąć się o jeden krok i wypróbować kolejne losowanie. Ponadto, program musi działać tak, by dało się cofnąć o dowolną ilość kroków. Ślepe uliczki mogą bowiem zaczynać się wiele ruchów wcześniej, zanim dotrzemy do ostatniego pola. Przedstawiając to działanie za pomocą grafu, powiemy, że jeśli w danym rozgałęzieniu wszystkie liście drzewa okażą się nietrafione, musimy wrócić kilka poziomów wyżej, aby przejść do kolejnej gałęzi.

<img width="1163" alt="tree_graph" src="https://user-images.githubusercontent.com/16913527/221419986-0b7dadd5-cf70-46a8-a800-ec73d2da61f1.png">
Rys 1. Przechodzenie przez wszystkie elementy grafu (czerwoną linią zaznaczono pierwsze kilkanaście kroków)

## Optymalizacja

Zanim przejdziemy do omówienia programu, chciałbym zwrócić uwagę na odświeżoną wersję pliku [index.html](https://github.com/jarfos/ChessMemory/blob/main/index.html), który został diametralnie „odchudzony”. Ze 120 kilobajtów w [poprzedniej wersji](https://github.com/jarfos/ChessMemory/blob/main/ChessMemory_part2/index.html)  (co nie było wcale przerażającą wielkością), jego objętość zmalała do zaledwie 16 kilobajtów. Skąd taka różnica? W 
[drugiej części cyklu](https://github.com/jarfos/ChessMemory/tree/main/ChessMemory_part2)
wspomniałem o możliwościach optymalizacji pliku SVG, z którego korzystamy do obsługi szachownicy. Przypomnę, że plik ten jest osadzony bezpośrednio w kodzie generowanej strony, jako węzeł `<svg>`. Pierwotnie plik SVG był utworzony za pomocą programu [Inkscape](https://inkscape.org), który ma możliwość zapisu w formacie „Zoptymalizowany SVG”. Plik zapisany w ten sposób ważył około 31 kilobajtów. Jednak najwięcej oszczędności uzyskałem, edytując ten sam plik za pomocą programu [Adobe Illustrator](https://www.adobe.com/pl/products/illustrator.html). Plik wyedytowany i zapisany za pomocą Illustratora zajmuje zaledwie 16kB.

Jak łatwo wydedukować po końcowych liniach pliku, funkcja `losuj()` zwraca łańcuch tekstowy będący odwzorowaniem rozmieszczenia figur na szachownicy. Jest on następnie przekazany do funkcji `init()` obiektu gra:

```html
<script>
    var gra = new Gra();
    gra.init(gra.losuj());
</script>
```

## Program właściwy
Plik [app.js](https://github.com/jarfos/ChessMemory/blob/main/ChessMemory_part3/app.js) również jest niewielki, bo zawiera zaledwie około 380 linii kodu (z czego znaczna część to komentarze i puste linie). Częściowo pokrywa się z
[poprzednią wersją pliku](https://github.com/jarfos/ChessMemory/blob/main/ChessMemory_part2/app.js).
Do obiektu `gra` dodana została funkcja `losuj()`.

Dla potrzeb działania algorytmu tworzymy obiekt `plansza`, którego konstruktorem jest funkcja `Plansza()`. Zawiera on między innymi 64 obiekty typu `Pole()`, służące do przechowywania informacji o stanie szachownicy w każdej chwili działania programu.

Obiekt `plansza` zawiera też dwie metody, które służą do losowania wolnych pól: `losuj_pole()` i `losuj_bicie()`. w obiekcie `plansza` umieściłem również dwie tablice: `histXY1` oraz `histXY2`. Będą one przechowywać informację o tym jakie pola szachownicy były wylosowane na każdym kroku algorytmu, przy czym jako pełny krok rozumiemy przejście przez dwa etapy:

1. Losowanie pola dla pierwszej figury z pary przy pomocy metody `losuj_pole()`. Lista wolnych pól ustalana jest w ten sposób, że pole nie może być zajęte przez żadną figurę, oraz dana figura może stanąć na tym polu. Ten drugi warunek weryfikujemy przez sprawdzenie, czy figura znajduje się w tablicy `możliwe[]` przypisanej do tego pola.

2. W drugiej kolejności wylosowanie wolnego pola przy pomocy metody `losuj_bicie()`. Tym razem Lista wolnych pól zawiera te pola, które nie są zajęte oraz znajdują się na liście pól bicia dla pola i figury z punktu 1.

## Algorytm
„Silnikiem” funkcji losującej, czyli główną częścią naszego algorytmu, jest pętla `do...while`, której liczba powtórzeń determinuje zawartość zmiennej `kolejka`. Jak widać, zmienna ta zawiera 32 symbole oznaczające ilość par figur szachowych. Przypomnę, że litery „h”, „s”, „g” i „w” oznaczają odpowiednio: `h`etmana, `s`koczka, `g`ońca i `w`ieżę. Wielka litera oznacza kolor biały, mała natomiast – czarny. Nasza pętla w najbardziej optymistycznej wersji (czyli wtedy, gdy nie trafimy na żadną „ślepą uliczkę”) wykona się 32 razy. Taki scenariusz jest jednak mało prawdopodobny, bo rzeczywista liczba powtórzeń zwykle jest znacznie większa. W praktyce pętla ta wykona się nawet kilka tysięcy razy.

Elementem sterującym liczbą powtórzeń pętli jest zmienna `index`. Zwiększa ona swoją wartość o jeden po każdym pełnym przebiegu pętli. Parę figur, która jest obsługiwana w aktualnym przebiegu pętli, odczytujemy ze wskazania `kolejka[index]`. W warunku `while(index < kolejka.length)` sprawdzamy, czy zmienna `index` nie osiągnęła wartości równej długości kolejki, co oznacza koniec algorytmu. Wewnątrz pętli mamy realizację pełnego kroku, opisanego powyżej – czyli losowanie pierwszego, a następnie drugiego pola dla aktualnej pary figur.

Najciekawsze jest to, co się dzieje, gdy funkcja `losuj_pole()` lub `losuj_bicie()` nie zwróci żadnego pola. Omówmy każdy z tych przypadków.

### Nie ma wolego pola dla pierwszej figury

Jeżeli funkcja `losuj_pole()` zwróci umowną, pustą wartość (dokładnie `‘00’`), oznacza to, że dla pierwszej figury z pary nie ma już wolnego miejsca na szachownicy. Wolnego, czyli takiego, które:
* nie jest zajęte
* nie koliduje z żadną inną taką samą figurą (nie leży w zasięgu jej bicia).

Jak wspomniałem, ten drugi warunek weryfikujemy przez sprawdzenie tablicy `możliwe[]` dla danego pola. Zauważmy jednak, że tablica ta zapisywana jest oddzielnie dla każdego kroku algorytmu, a sprawdzana jest przez odczyt tablicy z numerem indeksu: `możliwe[index]`. W ten sposób możemy w każdej chwili cofnąć się o dowolną liczbę kroków, żeby ponowić losowanie. Kiedy zatem nastąpi sytuacja, w której nie ma już gdzie postawić kolejnej pary figur, musimy wrócić do poprzedniego kroku. W tym celu wycofujemy z planszy parę figur ustawioną w poprzednim kroku:

```js
// wycofujemy ostatnie dwie figury
plansza[plansza.histXY1[index - 1]].figura = '0';
plansza[plansza.histXY2[index - 1]].figura = '0';
```

Następnie dla pola, które zawierało drugą figurę, usuwamy tę figurę z listy możliwych. Warto zauważyć, że ta zmiana dotyczy listy możliwych dla danego pola `(plansza.histXY2[index-1])`, dla danego kroku `(możliwe[index-1])` oraz dla danej figury `(kolejka[index-1])`. Wszystko to oczywiście dotyczy kroku oznaczonego numerem `index-1`.

```js
// pomniejszamy liste mozliwych dla poprzedniego kroku
plansza[plansza.histXY2[index - 1]].mozliwe[index - 1].remove(kolejka[index - 1]);
```

Co w ten sposób uzyskaliśmy? Krok `index-1` zostanie powtórzony, a dokładniej – powtórzymy losowanie drugiej figury. Jednak tym razem figura ta nie będzie mogła znaleźć się na polu, które było wylosowane poprzednio (aktualnie jest ono zapisane w zmiennej zawierającej historię losowań: `plansza.histXY2[index-1])`. Kilka kolejnych linijek kodu służy do przygotowania zmiennych przed powrotem do poprzedniego kroku:

```js
// ustawiamy wartosci obydwu pol
XY1 = plansza.histXY1[index - 1];
XY2 = '00';

// czyscimy historie
plansza.histXY1[index] = '00';
plansza.histXY2[index] = '00';

// i cofamy sie o jeden krok
index--;
continue;
```

Dlaczego w zmiennej `XY1` ustawiamy pole wylosowane w poprzednim kroku, mimo że usunęliśmy tę figurę z planszy? Ponieważ może się okazać, że wystarczy przestawić tylko drugą figurę. Pamiętajmy, że druga figura jest ustawiana na losowym polu spośród wszystkich wolnych pól bicia figury pierwszej. Czyli może ich być więcej niż jedno. Czemu nie mielibyśmy „wypróbować” wszystkich? A obie figury zostały usunięte z planszy, ponieważ po cofnięciu się o jeden krok może również się okazać, że wszystkie możliwości zostały wyczerpane i trzeba się cofnąć o kolejny. Dlatego też plansza jest zapełniana dopiero wtedy, gdy wylosujemy dwa pola dla obydwu figur, a nie tylko jednego. Dodatkowo, dla porządku czyścimy też historię, chociaż w tym kroku jest to nadmiarowe. Na koniec zmniejszamy o jeden wartość zmiennej `index` i przechodzimy do ponownego wykonania pętli instrukcją `continue`.

### Nie ma wolnego pola dla drugiej figury
Inaczej postępujemy, gdy funkcja `losuj_bicie()` nie zwróci żadnego wolnego pola bicia. Co się dzieje w takiej sytuacji? Tym razem chcemy cofnąć losowanie pierwszej figury, co możemy osiągnąć przez powtórzenie tego samego kroku. Tym razem więc nie zmienimy wartości zmiennej `index` przed wywołaniem instrukcji `continue`. Zanim do tego dojdziemy, najpierw pomniejszamy listę możliwych figur dla wylosowanego wcześniej pola. W ten sposób mamy pewność, że ponowne losowanie zwróci inne pole dla pierwszej figury (albo nie zwróci żadnego, co zostało opisane wcześniej). Następnie zerujemy pierwsze pole i dla porządku czyścimy historię. Jesteśmy gotowi do powtórzenia kroku.

```js
// pomniejszamy liste mozliwych na polu XY1
plansza[XY1].mozliwe[index].remove(kolejka[index]);

// zerujemy pierwsze pole
XY1 = '00';

// czyscimy historie
plansza.histXY1[index] = '00';
plansza.histXY2[index] = '00';
            
// i powtarzamy ten sam krok od poczatku
continue;
```

## Historia
Po skutecznym wylosowaniu obydwu pól możemy przypisać aktualną figurę do odpowiednich współrzędnych na planszy:

```js
// przypisanie figur do wylosowanych pol
plansza[XY1].figura = kolejka[index];
plansza[XY2].figura = kolejka[index];
```

Następnie zapisujemy wylosowane pola w tablicach zawierających historię wszystkich dotychczasowych par figur:

```js
// odlozenie historii
plansza.histXY1[index] = XY1;
plansza.histXY2[index] = XY2;
```

Te informacje będą wykorzystane przy wejściu w „ślepą uliczkę”, co zostało opisane powyżej. W dalszej części przygotowujemy się do przejścia do kolejnego kroku, czyli dla każdego pola na planszy przepisujemy wszystkie informacje zawarte w tablicach `mozliwe[]` z kroku `index` do kroku `index+1`:

```js
// przepisanie listy mozliwych pol do kolejnego kroku
for (var i = 1; i < cols.length; i++) {
    for (var j = 1; j < rows.length; j++) {
        // współrzędne komórki
        XY = cols[i] + rows[j];
        plansza[XY].mozliwe[index + 1] = [];
        plansza[XY].mozliwe[index + 1].push(...plansza[XY].mozliwe[index]);
    }
}
```

W tym celu korzystamy z notacji wielokropka `...`, czyli tzw. **składni rozwinięcia**, który w tym miejscu pomaga „przepchać” za pomocą instrukcji `push` wszystkie elementy tablicy zapisanej wewnątrz `mozliwe[index]`. Jak widać, jest to tablica dwuwymiarowa, gdzie pierwszy wymiar oznacza numer kroku algorytmu. To właśnie ta struktura, wraz z historią losowań (tablice `histXY1` oraz `histXY2`), odpowiada za prawidłowy wybór pól podczas losowania we wszystkich powtórzonych iteracjach algorytmu.

Dokładniej rzecz ujmując, historia losowań pomaga prawidłowo wycofywać poszczególne kroki, natomiast tablica `mozliwe[]` przypisana do każdego pola planszy i każdego kroku oddzielnie, pomaga prawidłowo „wypróbowywać” kolejne losowania. Na koniec jeszcze nie zapominamy pomniejszyć listy figur możliwych dla każdego pola z listy pól bicia obydwu wylosowanych pól. Oczywiście robimy to dla kroku `index+1`.

```js
// wyczyszczenie listy mozliwych dla pola XY1 i XY2 dla kolejnego kroku
zasieg = bicia[kolejka[index].toLowerCase()][XY1].split('_');
for (var i = 0; i < zasieg.length; i++) {
    plansza[zasieg[i]].mozliwe[index + 1].remove(kolejka[index]);
}
zasieg = bicia[kolejka[index].toLowerCase()][XY2].split('_');
for (var i = 0; i < zasieg.length; i++) {
    plansza[zasieg[i]].mozliwe[index + 1].remove(kolejka[index]);
}
```

Pętla kończy się wyczyszczeniem obydwu wylosowanych pól przed kolejnym krokiem, a na samym końcu – zwiększeniem indeksu o 1 (`index++`).

```js
XY1 = '00';
XY2 = '00';
index++;
```

## Podsumowanie
I to już koniec. Chyba nie było to zbyt trudne? W praktyce wystarczyło dobrze przemyśleć wszystkie kroki algorytmu, żeby znaleźć możliwie najprostsze rozwiązanie. Oczywiście łatwo jest powiedzieć, trudniej zrobić. Zapewniam, że opracowanie tej koncepcji zajęło mi znacznie dłużej, niż trwało napisanie tego artykułu. Sama implementacja również nie byłaby zbyt długa, jeśli nie liczyć frustrującej i mozolnej diagnozy błędów. Podczas pisania programu niestety popełniłem dwie banalne pomyłki, których wykrycie wymagało wielokrotnie „ręcznego” przejścia przez kilkadziesiąt iteracji algorytmu, co zajęło z przerwami kilka dni. Ostatecznie jednak cała gra nadal jest bardzo prosta, do czego nawiązuje tytuł całego cyklu: [Napiszmy prostą grę planszową...](https://github.com/jarfos/ChessMemory)
