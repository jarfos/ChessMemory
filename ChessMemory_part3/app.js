// konstruktor obiektu 'komorka'
function Komorka(id) {
    this.id = id;       // identyfikator (wspolrzedne)
    this.t;             // element tXY z szachownicy (wewnatrz pliku SVG)
    this.r;             // element rXY z szachownicy
    this.figura = '';   // wartość figury (jedna z liter: 'HWSGhwsg')
    this.show = 0;      // czy pokazujemy zawartość komórki
    this.bicia = [];    // lista pól, które bije figura ustawiona w tej komórce
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

// obsługa kliknięcia komórki
Komorka.prototype.klik = function() {
    // gdy figura już jest odkryta to nic nie robimy
    if (this.show === 1) return;

    // uruchomienie stopera
    if (gra.licznikKlikniec === 0) {
        gra.stoper.uruchom();
    }

    // zwiększamy licznik kliknięć o 1
    gra.zwiekszLicznik();
    
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

        // jeśli figury do siebie pasują oraz jest bicie...
        if ((gra[fig1].figura === gra[fig2].figura) && (gra[fig1].bicia.indexOf(fig2) >= 0)) {
            // ... to figury do siebie pasują, więc zwiększamy licznik figur
            gra.zwiekszFigury();
        } else {
            // ... w przeciwnym razie ukrywamy obydwie figury
            setTimeout(function(){
                gra[fig1].pokaz_figure(0);
                gra[fig2].pokaz_figure(0);
            }, 1000);
        }
    }

    // zatrzymanie stopera
    if (gra.licznikFigur === 64) {
        gra.stoper.zatrzymaj();
    }
}

// konstruktor obiektu 'gra'
function Gra() {
    var cols = '_ABCDEFGH';
    var rows = '_12345678';
    var XY;

    this.zaznaczona = '00';

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

                // przypisanie pól bicia dla danej figury
                this[XY].bicia = bicia[figury[j-1][i-1].toLowerCase()][XY].split('_');

                // inicjalnie wszystkie figury powinny być ukryte
                this[XY].pokaz_figure(0);

                // obsługa kliknięcia komórki
                this[XY].r.onclick = this[XY].klik.bind(this[XY]);
            }
        }
    }
}

// funkcja zwracająca losowy element tablicy
Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}

// funkcja usuwa wskazany element z tablicy (pierwszy znaleziony)
Array.prototype.remove = function(element) {
    var i = this.indexOf(element);
    if (i >= 0) this.splice(i, 1);
}

// funkcja losująca inicjalne rozstawienie figur na szachownicy
Gra.prototype.losuj = function() {
    var wynik   = '';
    var cols    = '_ABCDEFGH';
    var rows    = '_12345678';
    var kolejka = 'HHHHhhhhSSSSssssGGGGggggWWWWwwww';
    var figury  = 'HhSsGgWw';
    var index   = 0;
    var zasieg  = [];
    var XY1     = '00';
    var XY2     = '00';
    var XY      = '00';
    
    function Pole() {
        this.figura = '0',
        this.mozliwe = []
    }
    
    function Plansza() {
        this.histXY1 = [];
        this.histXY2 = [];

        // utworzenie listy 64 pol
        for (var i = 1; i < cols.length; i++) {
            for (var j = 1; j < rows.length; j++) {
                
                // współrzędne komórki
                XY = cols[i] + rows[j];

                // utworzenie obiektu Pole
                this[XY] = new Pole();
                this[XY].mozliwe[0] = [];
                this[XY].mozliwe[0].push(...figury);
            }
        }

        // losowanie wolnego pola na planszy (warunek: niezajęte i mozliwe)
        this.losuj_pole = function(index = 0) {
            var wolne = [];

            // ustalenie listy wolnych pól na szachownicy
            for (var i = 1; i < cols.length; i++) {
                for (var j = 1; j < rows.length; j++) {
                    // współrzędne komórki
                    var XY = cols[i] + rows[j];
                    if ((this[XY].figura === '0') && (0 <= this[XY].mozliwe[index].indexOf(kolejka[index]))) {
                        wolne.push(XY);
                    }
                }
            }

            // nie ma więcej wolnych pól do zajęcia przez daną figurę
            if (wolne.length == 0) return '00';

            return wolne.random();
        }

        // losowanie pola z listy pól bicia (warunek: niezajęte i mozliwe)
        this.losuj_bicie = function(pole = '00', index = 0) {
            var wolne = [];
            var zasieg = bicia[kolejka[index].toLowerCase()][pole].split('_');

            // ustalenie listy wolnych pól spośród wszystkich pól bicia
            for (var i = 0; i < zasieg.length; i++) {
                if ((this[zasieg[i]].figura === '0') && (0 <= this[zasieg[i]].mozliwe[index].indexOf(kolejka[index]))) {
                    wolne.push(zasieg[i]);
                }
            }
            
            // nie ma więcej wolnych pól do zajęcia przez daną figurę
            if (wolne.length == 0) return '00';

            return wolne.random();
        }
    }

    // inicjacja planszy
    var plansza = new Plansza();

    // petla glowna funkcji losujacej
    do {
        // losowanie wolnego pola
        if (XY1 === '00') {
            XY1 = plansza.losuj_pole(index);
        }

        // jesli nie ma juz wolnego pola
        if (XY1 === '00') {
            // wycofujemy ostatnie dwie figury
            plansza[plansza.histXY1[index - 1]].figura = '0';
            plansza[plansza.histXY2[index - 1]].figura = '0';

            // pomniejszamy liste mozliwych dla poprzedniego kroku
            plansza[plansza.histXY2[index - 1]].mozliwe[index - 1].remove(kolejka[index - 1]);

            // ustawiamy wartosci obydwu pol
            XY1 = plansza.histXY1[index - 1];
            XY2 = '00';

            // czyscimy historie
            plansza.histXY1[index] = '00';
            plansza.histXY2[index] = '00';

            // i cofamy sie o jeden krok
            index--;
            continue;
        }

        // losowanie wolnego pola dla drugiej figury z pary
        XY2 = plansza.losuj_bicie(XY1, index);

        // jesli nie ma juz wolnego pola
        if (XY2 === '00') {
            // pomniejszamy liste mozliwych na polu XY1
            plansza[XY1].mozliwe[index].remove(kolejka[index]);

            // zerujemy pierwsze pole
            XY1 = '00';

            // czyscimy historie
            plansza.histXY1[index] = '00';
            plansza.histXY2[index] = '00';
            
            // i powtarzamy ten sam krok od poczatku
            continue;
        }

        // przypisanie figur do wylosowanych pol
        plansza[XY1].figura = kolejka[index];
        plansza[XY2].figura = kolejka[index];
        
        // odlozenie historii
        plansza.histXY1[index] = XY1;
        plansza.histXY2[index] = XY2;

        // przepisanie listy mozliwych pol do kolejnego kroku
        for (var i = 1; i < cols.length; i++) {
            for (var j = 1; j < rows.length; j++) {
                // współrzędne komórki
                XY = cols[i] + rows[j];
                plansza[XY].mozliwe[index + 1] = [];
                plansza[XY].mozliwe[index + 1].push(...plansza[XY].mozliwe[index]);
            }
        }

        // wyczyszczenie listy mozliwych dla pola XY1 i XY2 dla kolejnego kroku
        zasieg = bicia[kolejka[index].toLowerCase()][XY1].split('_');
        for (var i = 0; i < zasieg.length; i++) {
            plansza[zasieg[i]].mozliwe[index + 1].remove(kolejka[index]);
        }
        zasieg = bicia[kolejka[index].toLowerCase()][XY2].split('_');
        for (var i = 0; i < zasieg.length; i++) {
            plansza[zasieg[i]].mozliwe[index + 1].remove(kolejka[index]);
        }

        XY1 = '00';
        XY2 = '00';
        index++;
    } while (index < kolejka.length);

    //przepisanie planszy na ciąg figur do funkcji init()
    for (var i = 1; i < cols.length; i++) {
        for (var j = 1; j < rows.length; j++) {
            // współrzędne komórki
            XY = cols[i] + rows[j];
            wynik += plansza[XY].figura;
        }
        wynik += '_';
    }
    wynik = wynik.replace(/_$/,'');

    return wynik;
}