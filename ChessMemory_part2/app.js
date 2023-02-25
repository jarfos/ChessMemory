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