<h1>Projekt E-commerce - Zadanie z przedmiotu JavaScript</h1>

<h2>Opis Projektu</h2>
<p>
Projekt ten jest zadaniem zaliczeniowym z przedmiotu JavaScript na kierunku informatyka, III rok, V semestr, studia niestacjonarne. Celem jest zbudowanie prostej aplikacji e-commerce z użyciem Angulara do frontendu i Node.js do backendu. Aplikacja łączy się z bazą danych MySQL za pomocą usług Docker i umożliwia zarządzanie zamówieniami, klientami oraz produktami.
</p>

<h2>Użyte Technologie</h2>
<ul>
    <li><strong>Frontend:</strong> Angular</li>
    <li><strong>Backend:</strong> Node.js (Express.js)</li>
    <li><strong>Baza danych:</strong> MySQL</li>
    <li><strong>Inne:</strong> Docker, phpMyAdmin</li>
</ul>

<h2>Struktura Projektu</h2>
<ul>
    <li><code>frontend/</code>: Zawiera aplikację Angular.</li>
    <li><code>backend/</code>: Zawiera API Node.js.</li>
    <li><code>docker-compose.yml</code>: Konfiguracja usług MySQL i phpMyAdmin.</li>
</ul>

<h2>Wymagania</h2>
<ul>
    <li>Node.js (wersja 14 lub nowsza)</li>
    <li>Docker</li>
    <li>Docker Compose</li>
</ul>

<h2>Instalacja i Konfiguracja</h2>

<h3>1. Sklonuj Repozytorium</h3>
<pre><code>
git clone https://github.com/Pawel88PL/angular-node.js
cd angular-node.js
</code></pre>

<h3>2. Konfiguracja Usług Docker</h3>
<ul>
    <li>Upewnij się, że Docker jest włączony.</li>
    <li>Przejdź do katalogu<code>backend</code></li>
    <li>Uruchom kontener docker:</li>
</ul>
<pre><code>
cd backend
docker-compose up -d
</code></pre>

<p>
Uzyskaj dostęp do phpMyAdmin pod <a href="http://localhost:8080">http://localhost:8080</a>, używając:
<ul>
    <li>Nazwa użytkownika: <code>root</code></li>
    <li>Hasło: <code>root</code></li>
</ul>
</p>

<h3>3. Konfiguracja Backend</h3>
<ul>
    <li>Przejdź do katalogu <code>backend</code>:</li>
</ul>
<pre><code>
cd backend
</code></pre>
<ul>
    <li>Zainstaluj zależności:</li>
</ul>
<pre><code>
npm install
</code></pre>
<ul>
    <li>Uruchom serwer backend:</li>
</ul>
<pre><code>
npm start
</code></pre>

<h3>4. Konfiguracja Frontend</h3>
<ul>
    <li>Przejdź do katalogu <code>frontend</code>:</li>
</ul>
<pre><code>
cd ../frontend
</code></pre>
<ul>
    <li>Zainstaluj zależności:</li>
</ul>
<pre><code>
npm install
</code></pre>
<ul>
    <li>Uruchom serwer frontend:</li>
</ul>
<pre><code>
ng serve --open
</code></pre>

<h3>Dostęp do Aplikacji</h3>
<p>
Odwiedź <a href="http://localhost:4200">http://localhost:4200</a>, aby uzyskać dostęp do interfejsu użytkownika.
</p>

<h3>Dodatkowe Informacje</h3>
<ul>
    <li>Serwer backend łączy się z bazą danych MySQL uruchomioną na Dockerze.</li>
    <li>phpMyAdmin jest dostępny do zarządzania bazą danych i testowania zapytań.</li>
    <li>Paski postępu, statusy zamówień i inne funkcje zostały zaimplementowane przy użyciu komponentów Angular Material.</li>
</ul>