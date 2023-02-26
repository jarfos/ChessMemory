Trzecia część z cyklu ChessMemory - losowe ustawienie figur.

# Część III – Generator losowy
Mamy już szachownicę, którą utworzyliśmy w pierwszej części, „silnik” gry też już działa, co zostało opisane w drugiej części. Pozostało tylko dostarczyć odpowiednich danych temu silnikowi, czyli napisać algorytm, który będzie losował inicjalne ustawienie figur na szachownicy.

Koncepcja algorytmu
Działanie algorytmu naśladuje w pewnym stopniu działanie człowieka. Zaczynamy od pustej szachownicy i pełnej listy dostępnych figur. Kolejność ustawiania figur może mieć znaczenie, więc – naśladując prawdopodobny wybór człowieka – zaczynamy od hetmanów. Co do pozostałych figur, nie ma pewności jaka kolejność jest najbardziej efektywna. Szczerze mówiąc, wypróbowałem wielu różnych kolejności i wyniki były na tyle rozbieżne, że nie wskazały jednoznacznie najlepszej. Zapewne do wiarygodnych wniosków można by dojść po przebadaniu wszystkich możliwości na próbce kilkuset tysięcy losowań. Ale przecież nie zamierzamy się doktoryzować, tylko napisać prosty generator losowy. Dlatego wybór kolejności ustawiania figur następuje w sposób ekspercki: najpierw hetmany, potem skoczki, następnie gońce i na końcu wieże. Oczywiście będziemy się posiłkować plikiem bicia.js, utworzonym w poprzedniej części.

Jak wspomniałem, na początku mamy do dyspozycji pustą szachownicę oraz listę dostępnych figur. Mamy też określoną kolejność ustawiania figur, czyli jest to lista odpowiednio posortowana. Na potrzeby algorytmu będziemy również przechowywać listę możliwych figur (czyli takich, które mogą zostać ustawione na danym polu) dla każdego pola oddzielnie. Każde pole szachownicy będzie mieć własną listę, która w trakcie trwania programu będzie się zmniejszać (będą z niej wykreślane kolejne elementy). Na początku (przed pierwszym krokiem) wszystkie pola na szachownicy potencjalnie mogą „przyjąć” dowolną figurę. W kolejnych krokach powtarzamy kilka czynności:

Dla kolejnej figury z listy dostępnych losujemy wolne pole na szachownicy. Wolne pole oznacza takie, na którym nie stoi żadna figura, a dana figura znajduje się na liście możliwych figur tego pola. Przypisujemy tę figurę do wylosowanego pola. Lista możliwych figur tego konkretnego pola odtąd przestaje mieć znaczenie, co jest zrozumiałe, ponieważ pole to właśnie zostało zajęte.
Drugą taką samą figurę musimy ustawić na wolnym polu (czyli niezajmowanym przez żadną figurę, oraz takim, które może daną figurę przyjąć), wylosowanym spośród dostępnych pól bicia pierwszej figury. Pola bicia weryfikujemy za pomocą pliku bicia.js.
Po ustawieniu obydwu figur wszystkie odpowiadające im pola bicia oznaczamy jako niemożliwe do przyjęcia kolejnej takiej figury. Czyli w praktyce dla wszystkich pól bicia usuwamy tę konkretną figurę z listy możliwych.
Powyższe kroki powtarzamy aż do wyczerpania wszystkich figur. W ten sposób zapełniamy całą szachownicę. Koniec.

Nie tak szybko…
Przed każdym losowaniem może się okazać, że lista wolnych pól spełniających wymagane warunki okaże się pusta, mimo że szachownica jeszcze nie została zapełniona. Może się tak stać w trzech przypadkach:

wszystkie niezajęte pola na szachownicy nie mogą już przyjąć danej figury (krok 1);
wszystkie pola bicia już są zajęte (krok 2);
wszystkie niezajęte pola bicia nie mogą przyjąć danej figury (krok 2).
W takim przypadku docieramy do „ślepej uliczki”, w której dalsze wykonanie algorytmu jest niemożliwe. W tym momencie powinniśmy cofnąć się o jeden krok i wypróbować kolejne losowanie. Ponadto, program musi działać tak, by dało się cofnąć o dowolną ilość kroków. Ślepe uliczki mogą bowiem „zaczynać” się wiele ruchów wcześniej, zanim dotrzemy do ostatniego pola. Przedstawiając to działanie za pomocą grafu, powiemy, że jeśli w danym rozgałęzieniu wszystkie liście drzewa okażą się nietrafione, musimy wrócić kilka poziomów wyżej, aby przejść do kolejnej gałęzi.
