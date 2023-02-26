Pierwsza część z cyklu ChessMemory - utworzenie czcionki z figurami szachowymi.

# Część I – Szachownica i figury
## Przygotowanie szachownicy
Do przygotowania planszy do gry wykorzystamy darmowy program do edycji grafiki wektorowej, jakim jest Inkscape. Przy tworzeniu tego artykułu korzystałem z wersji 0.91 dla macOS. Program można pobrać ze strony https://inkscape.org/, gdzie znajdziemy również mnóstwo odnośników do materiałów dodatkowych, tutoriali, galerii i innych. Formatem plików obsługiwanym przez Inkscape jest skalowalna grafika wektorowa, czyli SVG (Scalable Vector Graphics). Są to zatem pliki tekstowe zgodne z XML, które w dobie HTML5 obsługiwane są właściwie przez wszystkie nowoczesne przeglądarki (czyli wyświetlane jako grafiki). Program Inkscape skupia pokaźną społeczność, która chętnie dzieli się swoimi pracami. Jednym z moich ulubionych jest kanał Nicka Saporito na YouTube: https://www.youtube.com/channel/UCEQXp_fcqwPcqrzNtWJ1w9w. Polecam go zwłaszcza początkującym użytkownikom, którzy dopiero zaczynają swoją przygodę z grafiką wektorową i zabawę z programem Inkscape.

Tworzymy nowy plik – w moim przypadku będzie to plik o nazwie chessmemory.svg. W menu Plik->Właściwości dokumentu (Shift+Ctrl+D) ustawiamy wymiary 500×500 pikseli. Rysowanie szachownicy zaczynamy od utworzenia obiektu typu Prostokąt. Najlepiej użyć do tego narzędzia dostępnego w menu po lewej stronie (lub po wciśnięciu klawisza F4). Na górze ekranu, tuż nad obszarem roboczym, pojawiają się dodatkowe opcje, właściwe dla wybranego narzędzia. Ustawiamy tam jednakową szerokość i wysokość: 50 pikseli. Do ustawienia koloru należy otworzyć panel Wypełnienie i kontur (Shift+Ctrl+F). Ja wybrałem kolor RGB: #883300. Ustawiamy go w zakładce Fill (jak widać, niektóre wersje Inkscape’a mają niepełne tłumaczenie). W zakładce Kontur klawiszem X ustawiamy brak koloru, czyli wyłączamy kontury.


W drugim kroku robimy duplikat utworzonego przed chwilą prostokąta przy pomocy skrótu (Ctrl+D) lub w menu Edycja->Powiel. Zduplikowany kwadrat pojawi się w tym samym miejscu, co poprzedni, więc należy je odpowiednio wyrównać względem siebie. W tym celu otwieramy panel Wyrównaj i rozmieść (Shift+Ctrl+A). Zaznaczamy obydwa kwadraty przy pomocy skrótu (Ctrl+A), a następnie przy pomocy odpowiednich opcji z grupy Wyrównaj układamy tak obydwa kwadraty, aby stykały się rogami, jak na rysunku. Musimy się upewnić, że wyrównujemy je względem siebie nawzajem, a nie względem strony czy rysunku. W moim przypadku wybrana jest opcja Ostatni zaznaczony, przy czym nie ma to większego znaczenia, w jakiej kolejności były zaznaczone, bo obydwa kwadraty są identyczne.


Mając obydwa kwadraty odpowiednio ustawione i zaznaczone, tworzymy z nich grupę (Ctrl+G). Od tej pory ta grupa będzie traktowana tak, jakby to był jeden obiekt. Wobec tego duplikujemy grupę (Ctrl+D), zaznaczamy wszystkie obiekty (Ctrl+A) i znowu wyrównujemy tak, aby obiekty stykały się krawędziami. Cały proces (grupowanie, powielanie, wyrównywanie) powtarzamy jeszcze raz, otrzymując osiem kwadratów. Całość znowu grupujemy. Jeśli obiekty w obszarze roboczym zajmują za dużo miejsca, przeskalowujemy obszar roboczy według uznania. Do tego służy narzędzie Zoom (F3), czyli lupka dostępna z lewej strony ekranu.


Otrzymaną grupę znowu duplikujemy i wyrównujemy tak, aby stykały się krawędziami, tylko tym razem jeden nad drugim. Całość jeszcze raz grupujemy, ponownie duplikujemy i po raz ostatni wyrównujemy, otrzymując wszystkie ciemne pola szachownicy. Na koniec zaznaczamy wszystkie utworzone obiekty i przekształcamy je w jedną ścieżkę. Robimy to przy pomocy opcji dostępnej w menu Ścieżka -> Połącz (Ctrl+K). W praktyce oznacza to, że w wynikowym pliku SVG mamy tylko jeden obiekt <path>, zamiast 32 obiektów <rectangle>. Oznacza to również, że parametry takie jak rozmiar, kolor wypełnienia, rodzaj konturu oraz wiele innych są teraz wspólne dla całego obiektu. Nie można ustawić innego koloru np. dla połowy kwadratów. Jasne pola naszej szachownicy będą więc osobnym obiektem.


Aby go uzyskać, można by zduplikować aktualnie zaznaczony obiekt i obrócić go o 90 stopni w lewo. Wydaje się to logiczne. Biorąc jednak pod uwagę, że im mniej skomplikowanych ścieżek, tym lepiej, zrobimy to sprytniej. Tworzymy zwykły prostokąt, ustawiając jego rozmiary na 400×400. W panelu Wypełnienie i kontur (Shift+Ctrl+F) ustawiamy jasny kolor. Ja wybrałem RGB: #ffdd88. Musimy go jeszcze przesunąć pod spód, aby nie przykrywał ciemnego obiektu, a jedynie stanowił jego tło. Na koniec wystarczy wyśrodkować obydwa obiekty względem siebie w pionie i w poziomie. Zrobimy to oczywiście za pomocą opcji w panelu Wyrównaj i rozmieść (Shift+Ctrl+A).



Jeśli ktoś ma ochotę, może poświęcić trochę czasu na dodanie współrzędnych pionowych i poziomych szachownicy. Nie będę opisywać krok po kroku całego procesu, zostawiając przyjemność rozwiązania tego zadania czytelnikom. Podpowiem tylko, że należy w tym celu wykorzystać narzędzie Tekst (F8) oraz znajomy już panel Wyrównaj i rozmieść. Jeśli chcemy, aby nasze współrzędne wyglądały inaczej niż w moim przykładzie, możemy wybrać typ i rozmiar czcionki (oraz parę innych ustawień) w panelu Tekst i czcionka (Shift+Ctrl+T).


Główna część szachownicy jest gotowa. Teraz zajmiemy się podświetlaniem poszczególnych pól. Będą dwa rodzaje podświetlania: zaznaczenie pola oraz wskazanie pól bicia. Uzyskamy to przez wyświetlenie kolorowej ramki oraz półprzezroczystego wypełnienia. Musimy utworzyć 64 identyczne kwadraty o rozmiarach 50×50. Zaczynamy od utworzenia jednego, a następnie postępujemy podobnie jak wcześniej, powtarzając te same czynności: grupowanie, powielanie, wyrównywanie. Na koniec otrzymujemy grupę 64 obiektów, ale tym razem nie łączymy ich w jedną ścieżkę, ponieważ później będziemy potrzebowali dostępu do każdego kwadratu oddzielnie. Ponadto musimy rozgrupować wszystkie dotychczas utworzone grupy. Mając ciągle zaznaczone wszystkie kwadraty, wciskamy kilka razy (Shift+Ctrl+G), aż znikną wszystkie grupy.


Następnie w panelu Wypełnienie i kontur ustawiamy kolor wypełnienia i kolor konturu – ja w obydwu miejscach użyłem koloru RGB: #00dd00. Grubość konturu ustawiamy w zakładce Styl konturu (ja wybrałem 4px). Dodatkowo wybrałem poziom przezroczystości (alfa) wypełnienia na #66. Ten parametr będzie ustawiany z poziomu JavaScriptu, więc w tej chwili jest nieistotny – pokazuje tylko, jak będzie wyglądało podświetlenie.


Mając wciąż zaznaczone wszystkie 64 kwadraty, dla własnej wygody tworzymy z nich grupę (Ctrl+G). Teraz trochę bardziej żmudna część. Chcemy, aby każdy z nowo utworzonych kwadratów miał rozpoznawalny identyfikator, żebyśmy mogli się do niego później „dostać” z poziomu JavaScriptu. Po otwarciu panelu Edytor XML (Shift+Ctrl+X) możemy wyedytować każdy obiekt z osobna. Panel ten podzielony jest na dwie części. Z lewej strony mamy do dyspozycji wszystkie węzły w strukturze XML naszego pliku. Z prawej – wszystkie atrybuty zaznaczonego węzła. Jednym z nich jest identyfikator (id), który po zaznaczeniu możemy zmienić w dolnej części panelu. Dla każdego z kwadratów ustawiamy identyfikatory składające się z przedrostka „r” (rectangle) oraz współrzędnych na szachownicy, tak jak w przykładzie widocznym na rysunku (rB8). Aby zatwierdzić zmianę, musimy wcisnąć klawisz Ustaw lub użyć skrótu (Ctrl+Enter). Teraz musimy tę czynność powtórzyć kilkadziesiąt razy, uważając, by nie pomylić współrzędnych. Nie mierzyłem czasu, ale zdaje się, że w moim przypadku nie trwało to dłużej niż 10 minut.


Ponieważ chcemy, aby nasza szachownica na początku była „czysta”, zerujemy poziomy alfa wypełnienia i konturów we wszystkich 64 kwadratach. I tu pomocna się okazuje grupa, którą wcześniej utworzyliśmy – wystarczy wskazać całą grupę, następnie ją „rozgrupować”, po czym w panelu Wypełnienie i kontrast ustawić przezroczystość obydwu na poziom zerowy. Zwróćmy uwagę, że zaznaczenia poszczególnych pól „wystają” kilka pikseli poza kwadraty szachownicy. Dzieje się tak dlatego, że po ustawieniu grubości konturów na 4 piksele całe obiekty nieznacznie zmieniły swój rozmiar. Na koniec znowu grupujemy wszystkie kwadraty – możliwe, że przyda się to w przyszłości.


Przygotowanie figur szachowych
Zostawiamy na razie plik chessmemory.svg, wrócimy do niego później. Teraz zajmiemy się figurami szachowymi. Tworzymy nowy plik – ja wybrałem nazwę chesspieces.svg. W menu Plik->Właściwości dokumentu (Shift+Ctrl+D) ustawiamy wymiary 1024×1024 piksele. Następnie, przy pomocy narzędzi do tworzenia obiektów, takich jak: okrąg, prostokąt, pióro, a także metod dostępnych w menu Ścieżka, tworzymy sylwetki naszych figur szachowych. Tego procesu nie będę dokładnie opisywać, ponieważ niniejszy artykuł znacznie by się rozrósł. Tworzenie obiektów wektorowych jest podstawową funkcjonalnością Inkscape’a i gorąco zachęcam do eksperymentowania we własnym zakresie. Jeśli kogoś ten artykuł zachęcił do rozpoczęcia swojej przygody z programem Inkscape, to tym bardziej namawiam do próby wytworzenia dokładnie takich kształtów figur, jakie sobie wymyślimy.


W moim przykładzie wszystkie figury będą mieć identyczną podstawę, złożoną z dwóch elementów: elipsy, oraz prostokąta z zaokrąglonymi górnymi rogami. Taki prostokąt można uzyskać np. przez rozcięcie na pół zwykłego prostokąta, ponieważ domyślnie zaokrąglanie rogów działa we wszystkich czterech rogach jednocześnie. Pozostałą część figury (na obrazku widać skoczka) utworzyłem przez edycję ścieżki jakiejś figury początkowej. Na przykład „głowę” skoczka uzyskałem modyfikując zwykłą elipsę przy pomocy narzędzia Edycja węzłów (F2).


Bardzo ważne: każda utworzona w ten sposób figura musi być zapisana jako jedna ścieżka (węzeł path w pliku SVG). Ścieżki te posłużą potem do wygenerowania czcionki TrueType, a zatem nie mogą zawierać grup, obiektów różnych typów, itp. Dlatego też nasze figury będą miały zawsze tylko jeden kolor. Ścieżki ponadto powinny być tak zdefiniowane, aby nie zawierały nadmiarowych węzłów – zwykle jeden odcinek linii (zakrzywionej lub tym bardziej prostej) wymaga tylko dwóch węzłów: początkowego i końcowego.


Jak widać, utworzenie figury szachowej może być bardzo łatwe. Czasem wystarczy kilka kształtów geometrycznych poustawiać w równej odległości względem siebie, po czym połączyć je w jeden obiekt przy pomocy polecenia w menu Ścieżka->Suma (Ctrl++).


Wszystkie figury tworzymy w jednym pliku. Każda figura w odrębnej (jednej) ścieżce. Moje figury prezentują się następująco:


Tworzenie czcionki
Zanim zajmiemy się tworzeniem czcionki, najpierw upewnijmy się, że każda z utworzonych figur ma jednakową wysokość, równą 1024 piksele. Czcionka będzie składać się ze znaków, które będą „prezentowane” na tle obszaru roboczego strony. Jeśli nie widać konturów strony, możemy włączyć ich widoczność w ustawieniach Plik -> Właściwości dokumentu… Do utworzenia pierwszego znaku z figury wybieramy skoczka.

Wyrównujemy go do środka względem strony w pionie i poziomie. Jeśli jego wysokość jest inna, niż 1024, czyli wysokość naszej strony, to zmieniamy jego wysokość w górnym panelu, zaznaczając kłódkę zachowania proporcji.


Teraz utworzymy naszą czcionkę. W tym celu otwieramy panel  Edytor czcionek SVG… dostępny w menu Tekst. Przyciskiem New dodajemy nową czcionkę, po czym ustawiamy jej nazwę – w naszym przypadku chesspieces.


Następnie, w zakładce Glify dodajemy nowy znak (glif), uzupełniamy odpowiadający tekst, wpisując literkę „s”, na koniec wciskamy klawisz Pobierz ścieżki z zaznaczonych obiektów… Oczywiście w tym czasie musi być zaznaczona ścieżka naszego skoczka. Na dole możemy podejrzeć jak się prezentuje nowo utworzony znak, wypróbowując go w polu Podgląd tekstu.


W ten sam sposób postępujemy z pozostałymi figurami, pamiętając, aby w chwili utworzenia nowego glifu każda z nich miała jednakową wysokość (1024 piksele) oraz była wyśrodkowana względem strony w pionie i poziomie. Figurę wieży przypisujemy literce „w”, hetmana literce „h”, a gońca przypisujemy literce „g”.


Gotowe. Tak przygotowany plik posiada definicję czcionki, którą następnie możemy skonwertować do pliku TTF, czyli czcionki TrueType. Ja w tym celu używam darmowego narzędzia OnlineFontConverter, dostępnego pod adresem https://onlinefontconverter.com/. Wystarczy wskazać plik SVG, oraz wybrać docelowy format, czyli w naszym przypadku ttf, a po konwersji możemy ją ściągnąć i zapisać na dysku. Tak przygotowaną czcionkę możemy zainstalować w systemie i używać w różnych programach. Teraz możemy dokończyć pracę nad szachownicą…

Ułożenie figur na szachownicy
Wracamy z powrotem do pliku chessmemory.svg. Szachownica jest gotowa, ale nie ma jeszcze na niej żadnych figur. Dlatego na każdym polu musimy utworzyć obiekt typu tekstowego, w którym pojawi się jakaś figura szachowa. Na początku wstawimy do niego hetmana, który jest najszerszy i najlepiej się go wyrównuje. Tworzymy obiekt tekstowy, który zawiera jedną literkę „h”, wyświetloną za pomocą nowo utworzonej czcionki. Rozmiar tekstu ustawiamy na 32 oraz wyrównanie do środka.


Żeby mieć pewność, że figura będzie równo ułożona względem pola A8, w edytorze XML odnajdujemy obiekt typu Rectangle o nazwie rA8. Z przytrzymanym shiftem zaznaczamy naszego hetmana. Następnie w panelu Wyrównaj i rozmieść (Shift+Ctrl+A) wyrównujemy obydwa obiekty względem największego w pionie i poziomie.


Następnie zaznaczamy samego hetmana i robimy jego duplikat (Ctrl+D). Wyrównujemy go analogicznie, względem obiektu rH8. Jeszcze sześć duplikatów i mamy pierwszą linię. Pierwszy i ostatni hetman są już na swoich pozycjach.


Pozostałe figury wyrównujemy w następujący sposób: zaznaczamy wszystkie 8 hetmanów w taki sposób, aby ostatnim zaznaczonym elementem był hetman z pola A8 lub H8. Można to uzyskać zaznaczając całą grupę, a następnie z wciśniętym klawiszem (Shift) odznaczyć ostatnią figurę i z powrotem ją zaznaczyć. Następnie wyrównujemy dolne krawędzie wszystkich zaznaczonych obiektów względem ostatniego zaznaczonego, po czym rozmieszczamy je równomiernie przy pomocy opcji Rozmieść środki obiektów w równych odstępach w poziomie.


Duplikujemy całą linię i przenosimy nowo utworzoną grupę do wiersza 7. Jeśli to zrobimy z wciśniętym klawiszem (Ctrl), wyrównanie w pionie będzie zachowane. W poziomie natomiast wystarczy, że zaznaczamy obiekt rA7, następnie z wciśniętym klawiszem (Shift) zaznaczymy wszystkie hetmany z linii 7. Na tak przygotowanym zestawie robimy wyrównanie środków obiektów w poziomie względem pierwszego zaznaczonego (czyli kwadratu). W podobny sposób wypełniamy pozostałe linie, aż zapełni się cała szachownica.


W kolejnym kroku znowu czeka nas nieco żmudnej pracy, ponieważ musimy zmienić nazwy wszystkich 64 obiektów tekstowych, w których znajdują się nasze figury. Podobnie jak w przypadku nazw pól szachownicy (rA1-rH8), nazwy obiektów tekstowych wypełniamy w edytorze XML, stosując analogiczny schemat (tA1-tH8).

Ostatnią czynnością jest ukrycie wszystkich widocznych figur, czyli ustawienie parametru Opacity (%) na 0. W ten sposób nasza szachownica zawsze inicjalnie będzie wyświetlać się jako pusta. Można jeszcze utworzyć grupę zawierającą wszystkie figury dla przejrzystości pliku SVG.

W tej części to wszystko.

Obydwa pliki SVG z dzisiejszego artykułu oraz wynikowy plik TTF dostępne są w repozytorium Github.

Zapraszam do lektury kolejnego artykułu, w którym nareszcie zajmiemy się programowaniem 🙂
