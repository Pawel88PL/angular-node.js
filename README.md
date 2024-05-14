# Projekt E-commerce - Zadanie z przedmiotu JavaScript

## Opis Projektu

Projekt ten jest zadaniem zaliczeniowym z przedmiotu JavaScript na kierunku informatyka, III rok, V semestr, studia niestacjonarne. Celem jest zbudowanie prostej aplikacji e-commerce z użyciem Angulara do frontendu i Node.js do backendu. Aplikacja łączy się z bazą danych MySQL za pomocą usług Docker i umożliwia zarządzanie zamówieniami, klientami oraz produktami.


## Użyte Technologie
<ul>
    <li><strong>Frontend:</strong> Angular</li>
    <li><strong>Backend:</strong> Node.js (Express.js)</li>
    <li><strong>Baza danych:</strong> MySQL</li>
    <li><strong>Inne:</strong> Docker, phpMyAdmin</li>
</ul>

## Struktura Projektu
<ul>
    <li><code>frontend/</code>: Zawiera aplikację Angular.</li>
    <li><code>backend/</code>: Zawiera API Node.js.</li>
    <li><code>docker-compose.yml</code>: Konfiguracja usług MySQL i phpMyAdmin.</li>
</ul>

## Wymagania
<ul>
    <li>Node.js (wersja 14 lub nowsza)</li>
    <li>Docker</li>
    <li>Docker Compose</li>
</ul>

## Instalacja i Konfiguracja

### 1. Sklonuj Repozytorium
<pre><code>
git clone https://github.com/Pawel88PL/angular-node.js
cd angular-node.js
</code></pre>

### 2. Konfiguracja Usług Docker
<ul>
    <li>Upewnij się, że Docker jest włączony.</li>
    <li>Przejdź do katalogu<code>backend</code></li>
    <li>Uruchom kontener docker:</li>
</ul>

<pre><code>
cd backend
docker-compose up -d
</code></pre>


Uzyskaj dostęp do phpMyAdmin pod <a href="http://localhost:8080">http://localhost:8080</a>, używając:
<ul>
    <li>Nazwa użytkownika: <code>admin</code></li>
    <li>Hasło: <code>root</code></li>
    <li>Stwórz strukturę bazy danych - otwórz zakładkę <code>SQL</code></li>
    <li>Wklej wyespotowaną bazę danych z pliku <code>e-commerce.sql</code><li>
</ul>

### 3. Konfiguracja Backend
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

### 4. Konfiguracja Frontend
<ul>
    <li>Otwórz nowe okno terminala <code>Terminal -> New Terminal</code>:</li>
    <li>Przejdź do katalogu <code>frontend</code>:</li>
</ul>
<pre><code>
cd angular-node.js/frontend
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