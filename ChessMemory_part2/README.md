Druga część z cyklu ChessMemory - obsługa gry ze znanym początkowym ustawieniem figur na szachownicy.
# Część II – Mechanizm gry

W pierwszej części utworzyliśmy plik ```chessmemory.svg``` zawierający szachownicę gotową do wykorzystania w naszej grze oraz plik ```chesspieces.ttf``` z czcionką składającą się z utworzonych przez nas figur szachowych. Opisaliśmy również zasady gry oraz sposób, w jaki zamierzamy wyświetlać poszczególne figury i zaznaczać pola na szachownicy. W drugiej części zajmiemy się napisaniem prostego programu, który obsłuży grę ChessMemory.

## Osadzenie szachownicy w pliku HTML
Do wyświetlenia pliku SVG w przeglądarce nie potrzeba żadnych dodatkowych pluginów czy aplikacji. Wszystkie przeglądarki obecnie radzą sobie doskonale z tego typu grafiką. Można to zrobić na dwa sposoby:

* umieścić grafikę jako obrazek wewnątrz znacznika ```<img>``` ze źródłem w pliku zewnętrznym – taki sposób ma tę wadę, że plik SVG jest traktowany jak każdy inny statyczny obrazek i poza rozmiarem, ramką i kilkoma innymi parametrami, nie mamy większego wpływu na jego zawartość;
* umieścić grafikę wewnątrz znaczników ```<svg>``` – w ten sposób zapewniamy sobie dostęp do elementów w obrębie obiektu ```SVG```, ponieważ staje się on częścią składową struktury dokumentu ```HTML```.

Oczywiście bardziej interesująca jest druga opcja, o ile zależy nam na możliwości ingerencji w zawartość szachownicy.

Tworzymy zatem nowy plik: [index.html](https://github.com/jarfos/ChessMemory/blob/jarfos-github-only/ChessMemory_part2/index.html), wewnątrz którego osadzamy obiekt SVG. Robimy to przez skopiowanie zawartości pliku [chessmemory.svg](https://github.com/jarfos/ChessMemory/blob/jarfos-github-only/ChessMemory_part1/chessmemory.svg) – a dokładniej tego, co się znajduje w obrębie znaczników ```<svg>``` – i wklejenie do nowo utworzonego pliku, wewnątrz znaczników ```<body>```. Po tej operacji plik powinien wyglądać mniej więcej tak:

```html
<!DOCTYPE html>
<html>
<head>
    <title>ChessMemory</title>
    <style>
        body {
            background-color: lightblue;
            font-family: verdana;
            text-align: center;
        }
        @font-face
            {font-family:chesspieces; src:url(chesspieces.ttf)}
    </style>
</head>
<body>
    <h2>ChessMemory (gra logiczna)</h2>
    <svg
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="svg2"
        viewBox="0 0 500 500"
        height="500"
        width="500">
        .
        .
        .
    </svg>
</body>
</html>
```

W miejscu kropek oczywiście znajduje się pozostała zawartość obiektu ```SVG```. Pominąłem ją ze względu na czytelność powyższego przykładu. Jak widać, dodałem też tytuł strony, podstawowy styl (czcionka, kolor tła, wyrównanie) oraz nagłówek. 

Bardzo ważne jest też wskazanie na plik czcionki [chesspieces.ttf](https://github.com/jarfos/ChessMemory/blob/jarfos-github-only/ChessMemory_part1/chesspieces.svg), bez którego nasza gra będzie wyświetlać litery: „h”, „w”, „s” i „g”, zamiast prawidłowych figur szachowych. Chyba, że naszą czcionkę wcześniej zainstalowaliśmy w systemie – co nie zmienia faktu, że gra wyświetlałaby się prawidłowo tylko na tym komputerze, na którym ją zainstalowano. Uruchomienie pliku index.html w przeglądarce powinno zakończyć się takim widokiem:


Warto zauważyć, że plik chessmemory.svg nie jest zoptymalizowany pod względem objętości. Na przykład program Inkscape dodaje do pliku SVG trochę nadmiarowych informacji, zawierających ustawienia własne, których nie potrzebujemy. W tym artykule nie będziemy się zajmować optymalizacją plików SVG, wspomnę tylko, że istnieje co najmniej kilka sposobów na ich „odchudzenie”, takich jak:

usunięcie zbędnych węzłów (musimy jednak poznać ich przeznaczenie i mieć pewność, że są rzeczywiście zbędne);
zaokrąglenie liczb do pełnych jedności – Inkscape domyślnie określa wszystkie współrzędne z dokładnością do 4 miejsc po przecinku, w niektórych programach dokładność dochodzi nawet do 7 miejsc po przecinku; w praktyce, jeśli posługujemy się jednostką piksela (px), często pominięcie ułamków gwarantuje wystarczającą dokładność;
usunięcie wszystkich „białych znaków”, czyli spacji, tabulacji, znaczników końca linii itp.
Można też posłużyć się jednym z wielu dostępnych narzędzi optymalizacyjnych, które łatwo znaleźć w sieci. W naszym przypadku plik SVG zajmuje ok. 100kB, co nie powinno stanowić żadnego problemu przy obecnych transferach. Jeśli jednak kogoś interesuje optymalizacja kodu, zachęcam do zapoznania się z zagadnieniem minifikacji (https://pl.wikipedia.org/wiki/Minifikacja).

Rozstawianie figur na szachownicy
W kolejnym kroku zajmiemy się rozstawieniem wszystkich figur na szachownicy, pamiętając o zasadach gry, opisanych w pierwszej części artykułu. Sposobów na ustawienie początkowe z pewnością jest wiele. Tutaj wykorzystamy jedno z możliwych ustawień, które symbolicznie zapisać można jako następujący ciąg znaków: 

HHSgwWsh_SgGHHWwh_WWshGsHH_sgwSgwhW_gwHGgghg_hSSswSsW_GGGWWhwG_SwsGhHSs
Ciąg wydaje się być skomplikowany, ale w rzeczywistości łatwo go odszyfrować. Każda litera odpowiada jednej figurze: (h)etman, (s)koczek, (w)ieża, (g)oniec. Wielkie litery odpowiadają figurom białym, małe natomiast oznaczają kolor czarny. Dodatkowo, ciąg jest podzielony na 8 części po 8 znaków, co odpowiada liczbie kolumn i rzędów szachownicy.

Poniższy fragment pokazuje część kodu, którą należy wstawić pomiędzy znacznikami: końca obiektu SVG (</svg>) oraz końca zawartości strony (</body>):

<script scr="app.js"></script>
<script>
var gra = new Gra();
gra.init('HHSgwWsh_SgGHHWwh_WWshGsHH_sgwSgwhW_gwHGgghg_hSSswSsW_GGGWWhwG_SwsGhHSs');
</script>
W pierwszej linijce znajduje się odnośnik do zewnętrznego pliku app.js, w którym będzie się znajdować cały kod obsługi gry. Umieścimy tam konstruktor obiektu Gra(), który w powyższym fragmencie jest wywoływany (na jego podstawie, przy pomocy polecenia new, tworzymy zmienną obiektową gra). Następnie wywołana zostaje metoda gra.init(), czyli w praktyce funkcja znajdująca się wewnątrz obiektu gra. Definicję tej funkcji za chwilę również umieścimy w pliku app.js. Pozostaje zatem przejść do nowego pliku app.js i uzupełnić brakujący kod:

// konstruktor obiektu 'komorka'
function Komorka(id) {
    this.id = id;       // identyfikator (wspolrzedne)
    this.t;             // element tXY z szachownicy (wewnatrz pliku SVG)
    this.r;             // element rXY z szachownicy
    this.figura = '';   // wartość figury (jedna z liter: 'HWSGhwsg')
    this.show = 0;      // czy pokazujemy zawartość komórki
}

// ustawianie figury na polu szachownicy
Komorka.prototype.ustaw = function(wartosc) {
    
    if (-1 === 'HWSGhwsg'.indexOf(wartosc)) throw('Nieprawidlowa figura!');
    
    // przypisanie wartości figury
    this.figura = wartosc;
    this.t.innerHTML = wartosc.toLowerCase();

    // jeśli wartością jest wielka litera, to ustawiamy kolor biały
    if (0 <= 'HWGS'.indexOf(wartosc)) {
        this.t.style.fill = '#fff';
    } else {
        this.t.style.fill = '#000';
    }
}

// zaznaczanie i ukrywanie figury (ustawianie widoczności pola tekstowego)
Komorka.prototype.pokaz_figure = function(widocznosc) {
    this.t.style.opacity = widocznosc;
    this.show = widocznosc;
}

// zaznaczanie i ukrywanie podswietlenia (ustawianie widoczności obramowania)
Komorka.prototype.pokaz_podswietlenie = function(widocznosc) {
    this.r.style.strokeOpacity = widocznosc;
    this.r.style.opacity = widocznosc;
}

// konstruktor obiektu 'gra'
function Gra() {
    var cols = '_ABCDEFGH';
    var rows = '_12345678';
    var XY;
  
    // inicjacja gry
    this.init = function(initBoard) {
        // utworzenie tablicy wierszy na podstawie parametru initBoard
        var figury = initBoard.split('_');

        //pętla w pętli
        for (var i = 1; i < cols.length; i++) {
            for (var j = 1; j < rows.length; j++) {
                
                // współrzędne komórki
                XY = cols[i] + rows[j];

                // utworzenie obiektu komórki
                this[XY] = new Komorka(XY);

                // powiązanie obiektów rXY i tXY z komórką XY
                this[XY].t = document.getElementById('t'+XY);
                this[XY].r = document.getElementById('r'+XY);

                // przypisanie wartości figury (wywołanie funkcji ustaw)
                this[XY].ustaw(figury[j-1][i-1]);

                // pokazanie wszystkich figur
                this[XY].pokaz_figure(1);
            }
        }
    }
}
Jak widać, plik app.js aktualnie zawiera pięć funkcji, z czego dwie są konstruktorami (Komorka() i Gra()), a trzy pozostałe są metodami obiektu komorka (ustaw(), pokaz_figure(), oraz pokaz_podswietlenie()). Przyjęło się, że funkcje będące konstruktorem oznaczamy wielką literą, aby odróżnić je od innych funkcji. Funkcję będącą konstruktorem obiektu można bowiem wywołać tak samo, jak każdą inną funkcję i nie jest to błędem. Różnica pojawia się dopiero wtedy, gdy przy wywołaniu funkcji użyjemy operatora new – wtedy funkcja ta zwróci nam zmienną obiektową.

Inicjalnie tworzymy obiekt gra, który zawiera metodę init(). To właśnie tę metodę wywołujemy jednorazowo, przekazując na wejściu ciąg znaków z zakodowanym rozstawieniem figur. Wewnątrz tej metody znajdziemy dwie pętle (jedną zagnieżdżoną w drugiej), w których kolumna po kolumnie, wiersz po wierszu, wykonujemy kolejno kilka czynności.

Ustalamy współrzędne aktualnej komórki i przypisujemy je do zmiennej XY. Pomagają nam w tym zmienne cols i rows. Zauważmy, że wszystkie trzy zmienne należą do właściwości obiektu gra.
Tworzymy instancję obiektu o nazwie zawierającej ustalone wcześniej współrzędne. W tym celu korzystamy z konstruktora Komorka(), zdefiniowanego wyżej w tym samym pliku. W wielu innych językach programowania powiedzielibyśmy, że utworzono obiekt klasy Komorka. Ponieważ jednak JavaScript nie używa klas, określenie takie byłoby niewłaściwe.
Następnie, wewnątrz nowo utworzonego obiektu, tworzymy zmienne t i r, do których przypisujemy wskazania na węzły tXY oraz rXY z przygotowanego wcześniej pliku SVG. W miejscu zmiennej XY oczywiście wstawione będą współrzędne komórki, dlatego przykładowo zmienna gra.A1.t będzie zawierać wskazanie na węzeł tA1, a np. zmienna gra.G8.r będzie wskazywać na węzeł rG8.
W kolejnym kroku, przy pomocy metody ustaw(), przypisujemy naszej komórce wartość figury odczytanej z ciągu wejściowego. Do tego celu używamy zmiennej tablicowej figury. W metodzie ustaw()znajdują się natomiast instrukcje przypisujące wartość figury odpowiedniej zmiennej oraz ustawiające kolor wyświetlanej figury.
Na koniec wywołujemy metodę pokaz_figure(), w której na razie przekazujemy parametr 1, aby zobaczyć, czy nasz kod zadziała prawidłowo i szachownica zapełni nam się figurami.
W efekcie, po odświeżeniu przeglądarki, powinien pojawić się taki widok:


Już na pierwszy rzut oka różnicę między metodą init() wewnątrz obiektu gra a metodami ustaw() i pokaz_figure() wewnątrz obiektów komórek. Te ostatnie nie są zadeklarowane bezpośrednio w konstruktorze Komorka(), lecz „piętro wyżej”, w jego prototypie. Dlaczego warto pisać w ten sposób? Warto, ponieważ gdybyśmy umieścili definicję tych metod bezpośrednio w obiektach, ich kod byłby powielony 64 razy, zajmując niepotrzebnie miejsce w pamięci komputera. Umieszczając definicje tych dwóch metod w prototypie, mamy pewność, że ich kod przechowywany jest w pamięci tylko raz. W przypadku metody init() nie ma znaczenia, gdzie umieścimy jej definicję, ponieważ obiekt gra jest utworzony tylko raz. Zatem cały jego kod, łącznie z metodą init(), również zajmuje tylko jedno miejsce w pamięci.

Zaznaczanie pól
Zajmijmy się teraz zaznaczaniem pól szachownicy. Rozpatrujemy dwa przypadki, które dla potrzeb tego artykułu nazwijmy „klikami”: parzystym i nieparzystym. Klik nieparzysty to np. pierwsze kliknięcie na pustej szachownicy, które odkrywa pierwszą figurę. Gdy jakaś figura jest już odkryta, ale nie ma jeszcze swojej „pary”, kolejne kliknięcie jest klikiem parzystym, ponieważ odkrywa drugą figurę w celu sprawdzenia, czy do siebie pasują. Następne jest znowu nieparzyste itd. Liczą się tylko kliknięcia na nieodkrytych polach szachownicy. Kliknięcie na dowolnym, pustym polu szachownicy, powinno wywołać następujące efekty:

na klikniętym polu pojawi się ukryta wcześniej, przypisana do niego figura,
pole to zostanie zaznaczone zieloną obwódką.
Dalsze efekty będą się różniły w zależności od rodzaju kliknięcia. Klik nieparzysty spowoduje, że dodatkowo podświetlą się wszystkie pola, które bije nowo odkryta figura (zajmiemy się tym w dalszej części). Klik parzysty natomiast:

powinien ukryć wszystkie pola bicia odkrytej wcześniej figury,
po drugie, z pewnym opóźnieniem (powiedzmy – po sekundzie), powinien ukryć obwódkę zaznaczenia z obydwu pól.
Następnie zweryfikujemy, czy obydwie odkryte figury do siebie pasują, czyli:

czy wartości figur są takie same,
czy kolory figur się zgadzają,
czy obie figury biją się nawzajem.
Jeśli wszystkie trzy warunki będą się zgadzać, obydwie figury pozostaną odkryte już do końca gry. W przeciwnym razie obie powinny zniknąć, czyli zostać z powrotem ukryte. Zaczynamy więc od obsłużenia zdarzenia onClick obiektów rXY, które specjalnie w tym celu wcześniej przygotowaliśmy. Najpierw tworzymy zmienną gra.zaznaczona wewnątrz obiektu gra, która będzie przechowywać informację o aktualnie zaznaczonej komórce:

this.zaznaczona = '00';
Następnie wiążemy zdarzenie onClick z nową metodą klik(), którą za chwilę uzupełnimy. Wiązanie to robimy wewnątrz opisanej wcześniej pętli. Pamiętamy też, aby zmienić inicjalne wyświetlanie figur – domyślnie powinny być ukryte:

// inicjalnie wszystkie figury powinny być ukryte
this[XY].pokaz_figure(0);

// obsługa kliknięcia komórki
this[XY].r.onclick = this[XY].klik.bind(this[XY]);
Metoda klik() natomiast będzie zawierać obsługę właściwą gry. Na razie jednak tylko wywołuje zaznaczenie komórki oraz ukrywa zaznaczenia z obydwu odkrytych wcześniej figur po upłynięciu sekundy od kliku parzystego:

// obsługa kliknięcia komórki
Komorka.prototype.klik = function() {
    // gdy figura już jest odkryta to nic nie robimy
    if (this.show === 1) return;

    // zaznaczamy pole XY i odkrywamy figurę
    this.pokaz_figure(1);
    this.pokaz_podswietlenie(1);

    // obsluga "właściwa" gry - logika kliknięć
    var fig1 = gra.zaznaczona;
    var fig2 = this.id;

    if (fig1 === '00') {
        // zaznaczenie pierwszej figury (klik nieparzysty)
        gra.zaznaczona = fig2;
    } else {        
        // zdejmujemy zaznaczenie obydwu figur
        setTimeout(function(){
            gra[fig1].pokaz_podswietlenie(0);
            gra[fig2].pokaz_podswietlenie(0);
        }, 1000);

        // "czyścimy" zaznaczenie figury
        gra.zaznaczona = '00';
    }
}
Jak widać, skorzystałem z instrukcji setTimeout(), w której ustawiłem czas opóźnienia na 1000 milisekund. Odświeżamy przeglądarkę i testujemy odkrywanie figur. Zaznaczenia znikają po sekundzie od odkrycia drugiej figury.


Zaznaczanie i ukrywanie pól bicia
W następnej kolejności zajmiemy się wyświetlaniem pól bicia każdej figury. Samo podświetlanie nie jest niczym skomplikowanym. Będziemy postępować analogicznie do zaznaczania klików, z tą różnicą, że tym razem będziemy zmieniać parametr wypełnienia pola, zamiast obwódki. Skąd jednak mamy wiedzieć, które pola podświetlić? Czy w dalszej części artykułu będziemy implementować skomplikowane algorytmy wyliczające na bieżąco, które pola powinny być podświetlone? Chociaż takie rozwiązanie jest kuszące, proponuję inne podejście. W oddzielnym pliku bicia.js zdefiniujemy wszystkie możliwe pola bicia dla każdej figury i każdego pola oddzielnie. Będzie to wymagało trochę żmudnej pracy przy inicjalnym wypełnieniu pliku danymi, jednak z punktu widzenia „elegancji” programu, to rozwiązanie wydaje mi się dużo bardziej przejrzyste. Plik bicia() wypełniamy według następującego schematu:

var bicia = {
    h: {
        A1: 'B1_C1_D1_E1_F1_G1_H1_A2_A3_A4_A5_A6_A7_A8_B2_C3_D4_E5_F6_G7_H8',
        A2: 'B2_C2_D2_E2_F2_G2_H2_A1_A3_A4_A5_A6_A7_A8_B1_B3_C4_D5_E6_F7_G8',
...
    },
    w: {
        A1: 'B1_C1_D1_E1_F1_G1_H1_A2_A3_A4_A5_A6_A7_A8',
        A2: 'B2_C2_D2_E2_F2_G2_H2_A1_A3_A4_A5_A6_A7_A8',
...
    },
    g: {
        A1: 'B2_C3_D4_E5_F6_G7_H8',
        A2: 'B1_B3_C4_D5_E6_F7_G8',
...
    },
    s: {
        A1: 'B3_C2',
        A2: 'B4_C1_C3',
...
    }
}
Zawartość pliku bicia.js stanowi obiekt bicia, który zawiera cztery inne obiekty: h,w,g,s, odpowiadające czterem figurom szachowym. Każdy z obiektów będzie zawierać 64 zmienne XY, reprezentujące wszystkie współrzędne na szachownicy. Pola bicia natomiast występują w ciągu tekstowym jako zbiór współrzędnych pooddzielanych znakiem podkreślenia. 

Powyższy fragment zawiera pola bicia tylko dwóch pól: A1 i A2. W miejscu kropek należy uzupełnić resztę pól szachownicy. Tę pracę trzeba wykonać uważnie, bo łatwo tu o pomyłkę. Jednak od razu widać pewne prawidłowości i powtarzające się fragmenty. Mając na przykład pola bicia hetmana, automatycznie uzyskujemy pola bicia wieży i gońca jako dwa rozdzielne podzbiory zbioru głównego. Przygotowanie całego pliku bicia.js wraz z przetestowaniem zajęło mi jedno popołudnie.

Na podstawie pliku bicia.js będziemy wypełniać tablicę pól bitych przez daną figurę, zajmującą komórkę o podanych współrzędnych. Zaczynamy od dodania w konstruktorze obiektu komorka zmiennej o nazwie bicia, reprezentującej tę tablicę:

this.bicia = [];    // lista pól, które bije figura ustawiona w tej komórce
Wypełnianie tablicy natomiast będzie się odbywać tuż po przypisaniu danej figury do komórki, czyli wewnątrz pętli inicjującej szachownicę, w metodzie init() obiektu gra:

// przypisanie pól bicia dla danej figury
this[XY].bicia = bicia[figury[j-1][i-1].toLowerCase()][XY].split('_');
Gdy już mamy do każdej komórki przypisaną listę pól, które bije stojąca na niej figura, wystarczy obsłużyć wyświetlanie pól bicia dla klików nieparzystych. W tym celu dodajemy dwie nowe metody w prototypie komórki:

// zaznaczanie i ukrywanie bicia (ustawianie widoczności wypełnienia)
Komorka.prototype.pokaz_bicie = function(widocznosc) {
    this.r.style.fillOpacity = 0.5 * widocznosc;
    this.r.style.opacity = widocznosc;
}


// ustawianie zaznaczenia bicia
Komorka.prototype.zaznacz_bicia = function(widocznosc) {
    for(i = 0; i < this.bicia.length; i++) {
        // pola bicia dotyczą tylko nieodkrytych komórek
        if (gra[this.bicia[i]].show == 0) {
            gra[this.bicia[i]].pokaz_bicie(widocznosc);
        }
    }
}
Jak widać, wyświetlenie pól bicia odbywa się poprzez ustawienie widoczności wypełnienia obiektu rXY na 50 procent, co daje wrażenie półprzezroczystości.

Teraz pozostaje tylko wywołać nowo dodaną metodę zaznacz_bicia() wewnątrz fragmentu kodu obsługującego klik nieparzysty (zaznaczenie) oraz parzysty (odznaczenie). Poza tym dodajemy też jedną linijkę kodu, która usuwa podświetlenie bicia na klikniętej komórce. Cała metoda klik() wygląda teraz następująco:

// obsługa kliknięcia komórki
Komorka.prototype.klik = function() {
    // gdy figura już jest odkryta to nic nie robimy
    if (this.show === 1) return;
    
    // ukrywamy bicie, odkrywamy figurę, oraz zaznaczamy pole XY
    this.pokaz_bicie(0);
    this.pokaz_figure(1);
    this.pokaz_podswietlenie(1);


    // obsluga "właściwa" gry - logika kliknięć
    var fig1 = gra.zaznaczona;
    var fig2 = this.id;
    if (fig1 === '00') {
        // zaznaczenie pierwszej figury (klik nieparzysty)
        gra.zaznaczona = fig2;


        // zaznaczenie pól bicia
        this.zaznacz_bicia(1);
    } else {
        // odznaczenie pól bicia
        gra[fig1].zaznacz_bicia(0);


        // zdejmujemy zaznaczenie obydwu figur
        setTimeout(function(){
            gra[fig1].pokaz_podswietlenie(0);
            gra[fig2].pokaz_podswietlenie(0);
        }, 1000);
 
        // "czyścimy" zaznaczenie figury
        gra.zaznaczona = '00';
    }
}
Gdy już mamy obsłużone zaznaczanie pól bicia, możemy przetestować, czy plik bicia.js jest wypełniony prawidłowo. Można to zrobić, wyświetlając po kolei wszystkie figury na wszystkich polach szachownicy. Znowu trochę żmudnej pracy, ale w ten sposób mamy pewność, że plik bicia.js nie zawiera błędów (w testach okazało się, że kilka chochlików przeoczyłem). W pliku index.html dodajemy odnośnik do pliku bicia.js oraz testowe wywołania funkcji init():

<script scr="bicia.js"></script>    
<script scr="app.js"></script>
<script>
  var gra = new Gra();
        //gra.init('HHSgwWsh_SgGHHWwh_WWshGsHH_sgwSgwhW_gwHGgghg_hSSswSsW_GGGWWhwG_SwsGhHSs');
        //gra.init('hhhhhhhh_hhhhhhhh_hhhhhhhh_hhhhhhhh_hhhhhhhh_hhhhhhhh_hhhhhhhh_hhhhhhhh
');
        //gra.init('gggggggg_gggggggg_gggggggg_gggggggg_gggggggg_gggggggg_gggggggg_gggggggg');
        //gra.init('wwwwwwww_wwwwwwww_wwwwwwww_wwwwwwww_wwwwwwww_wwwwwwww_wwwwwwww_wwwwwwww');
          gra.init('ssssssss_ssssssss_ssssssss_ssssssss_ssssssss_ssssssss_ssssssss_ssssssss');
</script>
Przykładowy test:


Ukrywanie niepasujących figur
Mamy już wyświetlanie figur, mamy zaznaczanie i odznaczanie pól, mamy też podświetlanie i ukrywanie pól bicia. Do w pełni działającej gry pozostało już tylko ukrywanie zaznaczonych figur, które do siebie nie pasują. Jak już wcześniej wspomniałem, aby to obsłużyć, musimy wykonać potrójne sprawdzenie:

czy wartości figur są takie same,
czy kolory figur się zgadzają,
czy obie figury biją się nawzajem.
Wszystkie trzy warunki muszą być spełnione, aby obydwie figury zostały odkryte. W przeciwnym razie obydwie figury powinny zostać ukryte sekundę po kliku parzystym, czyli równo z ukryciem podświetlenia figur. Powyższe warunki sprawdzamy dla kliku parzystego, w jednej instrukcji if, zawierającej iloczyn logiczny dwóch prostych warunków:

// jeśli figury do siebie pasują oraz jest bicie...
if ((gra[fig1].figura === gra[fig2].figura) && (gra[fig1].bicia.indexOf(fig2) >= 0)) {
    // ... to figury do siebie pasują
} else {
    // ... w przeciwnym razie ukrywamy obydwie figury
    setTimeout(function(){
        gra[fig1].pokaz_figure(0);
        gra[fig2].pokaz_figure(0);
    }, 1000);
}
Gotowe. Aplikacja działa prawidłowo, można już grać.

Dodatki
Jak przystało na grę logiczną, przydałby się jeszcze jakiś stoper. Poza tym dobrze by było zliczać wszystkie kliknięcia oraz pokazywać liczbę odkrytych figur. Dodajmy zatem te trzy elementy do naszej gry. W tym celu w pliku index.html wstawiamy prostą strukturę (tabelę), w której będziemy wyświetlać odpowiednie dane:

    <table align=center>
        <tr>
            <td>Licznik:</td><td><div id="dLicznik">0</div></td>
            <td>Czas:   </td><td><div id="dStoper"> 0</div></td>
            <td>Figury: </td><td><div id="dFigury"> 0</div></td>
        </tr>
    </table>
Następnie utworzymy obiekt stoper, którego konstruktor dodajemy do pliku app.js:

// konstruktor obiektu 'stoper'
function Stoper() {
    this.czasStartu;
    this.intervalID = 0;

    this.uruchom = function() {
        this.czasStartu = new Date();
        this.intervalID = setInterval(this.odswiez.bind(gra.stoper), 16);
    }

    this.odswiez = function() {
        var teraz = new Date();
        var roznica = teraz - this.czasStartu;
        document.getElementById('dStoper').innerHTML = Math.ceil(roznica/10)/100;
    }

    this.zatrzymaj = function() {
        clearInterval(this.intervalID);
    }
}
Obiekt stoper zawiera dwie zmienne: czasStartu oraz intervalID. Pierwsza służy do zapamiętania dokładnego czasu uruchomienia stopera, druga natomiast będzie zawierać informację o identyfikatorze interwału, czyli procesu uruchomionego w instrukcji setInterval(). W obiekcie tym znajdują się ponadto trzy metody służące do jego uruchomienia, odświeżenia oraz zatrzymania. W metodzie uruchom() ustawiamy proces, który co 16 milisekund będzie odświeżać wyświetlaną wartość stopera. Dlaczego akurat 16 milisekund, a nie mniej? Ponieważ ludzkie oko nie jest w stanie wychwycić zmian zachodzących szybciej i odświeżanie napisu np. co milisekundę nie miałoby sensu. Obiekt stoper będzie umiejscowiony wewnątrz obiektu gra, razem z licznikiem kliknięć oraz licznikiem odkrytych figur. Dodajemy zatem w konstruktorze gry następujący fragment:

    // obsługa licznika kliknięć
    this.licznikKlikniec = 0;
    this.zwiekszLicznik = function() {
        this.licznikKlikniec++;
        document.getElementById('dLicznik').innerHTML = this.licznikKlikniec;
    }

    // obsługa licznika figur
    this.licznikFigur = 0;
    this.zwiekszFigury = function() {
        this.licznikFigur += 2;
        document.getElementById('dFigury').innerHTML = this.licznikFigur;
    }

    // utworzenie obiektu stopera
    this.stoper = new Stoper();
Następnie, w metodzie klik() uruchamiamy stoper (tylko jeśli jest to pierwsze kliknięcie) oraz zwiększamy licznik kliknięć:

    // uruchomienie stopera
    if (gra.licznikKlikniec === 0) {
        gra.stoper.uruchom();
    }

    // zwiększamy licznik kliknięć o 1
    gra.zwiekszLicznik();
Zatrzymanie licznika natomiast umieszczamy na końcu metody klik() (pod warunkiem, że wszystkie 64 figury zostały już odkryte):

    // zatrzymanie stopera
    if (gra.licznikFigur === 16) {
        gra.stoper.zatrzymaj();
    }
Na koniec pozostało wywołanie zwiększenia licznika odkrytych figur, które powinno zostać umieszczone we fragmencie kodu odpowiadającego za sprawdzenie, czy figury do siebie pasują:

// ... to figury do siebie pasują, więc zwiększamy licznik figur
gra.zwiekszFigury();
Końcowy efekt prezentuje się następująco:


Jak widać, napisanie prostej gry nie stanowi zbyt wymagającego wyzwania. Plik app.js, czyli „silnik” gry zajmuje zaledwie 194 linie, przy czym można go jeszcze porządnie odchudzić, usuwając komentarze i białe znaki (wspomniana wcześniej minifikacja).

Co dalej?
Mechanizm gry jest już gotowy, ale żeby móc zagrać, potrzebujemy jeszcze generatora losowego inicjalnego ustawienia figur. Zajmiemy się tym w trzeciej części cyklu.
