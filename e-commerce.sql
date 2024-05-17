-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 17, 2024 at 11:12 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `CartItems`
--

CREATE TABLE `CartItems` (
  `CartItemId` int NOT NULL,
  `ProductId` int NOT NULL,
  `Quantity` int NOT NULL,
  `Price` decimal(8,2) NOT NULL,
  `CartId` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `CartItems`
--

INSERT INTO `CartItems` (`CartItemId`, `ProductId`, `Quantity`, `Price`, `CartId`) VALUES
(32, 1, 1, 1500.00, 'f1dea111-93b3-4711-80a6-0ad04ba03fc6'),
(44, 25, 3, 6999.00, '61d6f6e8-7ef2-4e56-bada-1fad07f16fce');

-- --------------------------------------------------------

--
-- Table structure for table `Carts`
--

CREATE TABLE `Carts` (
  `CartId` char(36) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `CreateCartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Carts`
--

INSERT INTO `Carts` (`CartId`, `UserId`, `CreateCartDate`) VALUES
('0a0fd0e1-ed50-4636-a494-899a03bb8a71', NULL, '2024-05-04 16:54:08'),
('0c8a8f54-216f-48d7-a525-e135625adfb7', '485f6e7f-18bf-4c30-9c35-1f29b44f6a2d', '2024-05-12 16:00:12'),
('58b53c4d-e11d-464f-a0e0-c107661fdccf', '90f78c6f-e6d1-42ea-943a-0aaa3f7a3769', '2024-05-16 07:42:48'),
('61d6f6e8-7ef2-4e56-bada-1fad07f16fce', '9d424610-c36f-41c5-9b18-a3fd91e7c4dc', '2024-05-16 07:44:44'),
('67763a9b-20d3-4e8f-9c02-8df84893f3ab', NULL, '2024-05-08 13:22:00'),
('68dd92ed-3332-47f1-ae5f-9bd871e6f691', '485f6e7f-18bf-4c30-9c35-1f29b44f6a2d', '2024-05-17 04:33:05'),
('94b05cb4-1505-4435-be17-fb424746474a', '9d424610-c36f-41c5-9b18-a3fd91e7c4dc', '2024-05-10 20:01:43'),
('b8f91388-7946-4a33-a2f2-a43557229e51', 'dd8df97c-66d6-44fb-974f-82dd0add398a', '2024-05-16 08:00:10'),
('c06d8200-3331-43b8-ae43-6146d9b7503a', '90f78c6f-e6d1-42ea-943a-0aaa3f7a3769', '2024-05-17 04:30:21'),
('c1420f5a-e44c-4ed0-8eda-22e5ca6aa614', NULL, '2024-04-06 14:24:36'),
('c2c677a6-7ace-4ac8-893e-43de5f21564f', '485f6e7f-18bf-4c30-9c35-1f29b44f6a2d', '2024-05-16 07:46:51'),
('d1605b3d-f678-4211-a58e-22ca883b14d6', NULL, '2024-03-30 18:34:18'),
('db53d62c-4c69-4dc0-8430-02edd34e1973', NULL, '2024-03-30 18:11:16'),
('e5e874d3-4ed6-4d4e-91d1-38312504f425', NULL, '2024-03-30 18:50:51'),
('f1dea111-93b3-4711-80a6-0ad04ba03fc6', NULL, '2024-05-04 13:15:33');

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `CategoryId` int NOT NULL,
  `Name` enum('Meble kuchenne','Meble do sypialni','Meble do salonu','Meble do gabinetu') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`CategoryId`, `Name`) VALUES
(1, 'Meble kuchenne'),
(2, 'Meble do sypialni'),
(3, 'Meble do salonu'),
(4, 'Meble do gabinetu');

-- --------------------------------------------------------

--
-- Table structure for table `OrderDetails`
--

CREATE TABLE `OrderDetails` (
  `OrderDetailId` int NOT NULL,
  `OrderId` int DEFAULT NULL,
  `ProductId` int DEFAULT NULL,
  `Quantity` int NOT NULL,
  `UnitPrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `OrderDetails`
--

INSERT INTO `OrderDetails` (`OrderDetailId`, `OrderId`, `ProductId`, `Quantity`, `UnitPrice`) VALUES
(16, 16, 25, 1, 6999.00),
(17, 16, 23, 2, 399.00),
(18, 17, 22, 1, 499.00),
(19, 17, 23, 1, 399.00),
(20, 17, 24, 1, 4000.00),
(21, 18, 25, 1, 6999.00),
(22, 19, 1, 4, 2499.00),
(23, 20, 20, 1, 899.00),
(24, 21, 23, 1, 399.00);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `OrderId` int NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `OrderDate` datetime NOT NULL,
  `TotalPrice` decimal(10,2) NOT NULL,
  `Status` enum('Oczekuje na płatność','Opłacone','W trakcie realizacji','Wysłane','Zrealizowane','Anulowane') NOT NULL DEFAULT 'Oczekuje na płatność',
  `IsPickupInStore` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`OrderId`, `UserId`, `OrderDate`, `TotalPrice`, `Status`, `IsPickupInStore`) VALUES
(16, 'b8081415-5d5b-4307-95f6-d725887a27c6', '2024-05-16 07:43:17', 7896.00, 'W trakcie realizacji', 0),
(17, '90f78c6f-e6d1-42ea-943a-0aaa3f7a3769', '2024-05-16 07:45:07', 4997.00, 'Zrealizowane', 0),
(18, '9d424610-c36f-41c5-9b18-a3fd91e7c4dc', '2024-05-16 07:47:04', 7098.00, 'Wysłane', 0),
(19, 'dd8df97c-66d6-44fb-974f-82dd0add398a', '2024-05-16 08:08:19', 9996.00, 'W trakcie realizacji', 1),
(20, '9d424610-c36f-41c5-9b18-a3fd91e7c4dc', '2024-05-17 04:30:27', 998.00, 'Opłacone', 0),
(21, '90f78c6f-e6d1-42ea-943a-0aaa3f7a3769', '2024-05-17 04:33:11', 498.00, 'Oczekuje na płatność', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ProductImages`
--

CREATE TABLE `ProductImages` (
  `ImageId` int NOT NULL,
  `ProductId` int DEFAULT NULL,
  `ImagePath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ProductImages`
--

INSERT INTO `ProductImages` (`ImageId`, `ProductId`, `ImagePath`) VALUES
(1, 1, '/images/bed_1.jpeg'),
(2, 1, '/images/bed_2.jpeg'),
(3, 1, '/images/bed_3.jpeg'),
(4, 1, '/images/bed_4.jpeg'),
(24, 20, '/images/biurko_1.jpeg'),
(25, 20, '/images/biurko_2.jpeg'),
(26, 20, '/images/biurko_3.jpeg'),
(27, 20, '/images/biurko_4.jpeg'),
(31, 22, '/images/biurko1_1v2.jpg'),
(32, 22, '/images/biurko1_2v2.jpg'),
(33, 22, '/images/biurko1_3v2.jpg'),
(34, 23, '/images/krzeslo_biuro_1_1v2.jpg'),
(35, 23, '/images/krzeslo_biuro_1_2v2.jpg'),
(36, 23, '/images/krzeslo_biuro_1_3v2.jpg'),
(37, 24, '/images/sofa1_1v2.jpg'),
(38, 24, '/images/sofa1_2v2.jpg'),
(39, 24, '/images/sofa1_3v2.jpg'),
(40, 25, '/images/sofa2_1v2.jpg'),
(41, 25, '/images/sofa2_2v2.jpg'),
(42, 25, '/images/sofa2_3v2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `ProductId` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `CategoryId` int DEFAULT NULL,
  `DateAdded` datetime NOT NULL,
  `AmountAvailable` int NOT NULL,
  `Weight` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`ProductId`, `Name`, `Description`, `Price`, `CategoryId`, `DateAdded`, `AmountAvailable`, `Weight`) VALUES
(1, 'Łóżko tapicerowane', '<h2>Dwuosobowe Łóżko Tapicerowane - Komfort i Styl w Twojej Sypialni</h2>\r\n\r\n<p>Odkryj nowy wymiar komfortu i elegancji z naszym dwuosobowym łóżkiem tapicerowanym, zaprojektowanym z myślą o tych, którzy cenią sobie luksus i wygodę. To idealne połączenie funkcjonalności i nowoczesnego designu, które przemieni Twoją sypialnię w oazę relaksu i spokoju.</p>\r\n\r\n<h3>Wyjątkowy Komfort</h3>\r\n\r\n<p>Nasze dwuosobowe łóżko tapicerowane zostało wykonane z najwyższej jakości materiałów, zapewniających niezrównaną miękkość i wygodę. Grube, miękkie tapicerowanie nie tylko dodaje elegancji, ale również gwarantuje wygodny, regenerujący sen każdej nocy.</p>\r\n\r\n<h3>Solidna Konstrukcja</h3>\r\n\r\n<p>Stelaż łóżka został zaprojektowany z myślą o maksymalnej trwałości i stabilności. Solidna konstrukcja zapewnia bezpieczeństwo i trwałość użytkowania na lata, podczas gdy łatwy w montażu system sprawia, że łóżko jest gotowe do użytku w mgnieniu oka.</p>\r\n\r\n<h3>Design i Styl</h3>\r\n\r\n<p>Nowoczesny design naszego łóżka tapicerowanego wpisuje się w najnowsze trendy wnętrzarskie. Eleganckie linie, subtelne szycie i wysmakowane detale sprawiają, że łóżko jest prawdziwą ozdobą sypialni. Dostępne w różnych kolorach i wykończeniach, łatwo dopasujesz je do swojego indywidualnego stylu i dekoracji sypialni.</p>\r\n\r\n<h3>Praktyczność i Funkcjonalność</h3>\r\n\r\n<p>Dodatkowo, przemyślana konstrukcja łóżka oferuje praktyczne rozwiązania, takie jak pojemnik na pościel, zapewniając dodatkową przestrzeń do przechowywania. To idealne rozwiązanie do sypialni, gdzie każdy centymetr przestrzeni ma znaczenie.</p>\r\n\r\n<h3>Wymiary:</h3>\r\n\r\n<ul>\r\n  <li>Długość: 210 cm</li>\r\n  <li>Szerokość: 160 cm</li>\r\n  <li>Wysokość zagłówka: 110 cm</li>\r\n</ul>\r\n\r\n<p>Łóżko dostarczane jest z wygodnym, sprężynowym materacem, który idealnie komponuje się z konstrukcją łóżka, zapewniając optymalne wsparcie dla Twojego ciała.</p>\r\n\r\n<p><strong>Zapewnij sobie i swoim bliskim luksusowy odpoczynek, na który zasługujecie. Wybierz nasze dwuosobowe łóżko tapicerowane i ciesz się nie tylko pięknym wnętrzem, ale przede wszystkim komfortowym snem każdej nocy.</strong></p>\r\n', 2499.00, 2, '2024-03-18 07:01:37', 11, 50),
(20, 'Biurko gabinetowe', 'Bardzo fajne biurko do gabinetu. Elegancki i nowoczesny kolor.', 899.00, 4, '2024-03-22 07:19:58', 4, 20),
(22, 'Biurko z forniru', '<h1>Biurko z forniru, litego drewna jesionowego</h1>\n<p>Stwórz swój własny kącik pracy, dbając jednocześnie o harmonię i ekologię w swoim domu. Nasze biurko to połączenie elegancji i funkcjonalności, wykonane z litego drewna jesionowego i rattanu, które wprowadzą naturalny urok do Twojej przestrzeni.</p>\n<h2>Solidna Konstrukcja:</h2>\n<p>Biurko to nie tylko estetyka, ale także solidność i wygodne użytkowanie. Dzięki konstrukcji z litego drewna jesionowego i wytrzymałemu rattanowi, biurko jest trwałe i stabilne. Jego przestronny blat daje Ci dużo miejsca do pracy, pozwalając swobodnie organizować swoje dokumenty i akcesoria biurowe.</p>\n<h2>Funkcjonalne Detale:</h2>\n<p>Szczególną uwagę zwróciliśmy na funkcjonalność biurka. Wyposażone w praktyczną szufladę otwieraną na zatrzask oraz regulowane nóżki, zapewnia ono idealne dopasowanie do Twoich potrzeb i preferencji. Dodatkowe miejsce do przechowywania na dolnej półce ułatwia utrzymanie porządku w Twoim kąciku pracy, umożliwiając sprawną organizację wszystkich niezbędnych rzeczy.</p>\n<h2>Zdrowa Planeta, Zdrowe Materiały:</h2>\n<p>Projekt Kave Cares to nie tylko design, to także troska o środowisko. Biurko wykonane jest z drewna o niskiej emisji formaldehydu, co sprawia, że dbasz nie tylko o swój kącik pracy, ale także o planetę.</p>\n<h3>Wymiary:</h3>\n<ul>\n    <li>Wysokość: 89 cm</li>\n    <li>Szerokość: 105 cm</li>\n    <li>Głębokość: 62 cm</li>\n    <li>Waga produktu: 30,2 kg</li>\n</ul>\n', 499.00, 4, '2024-05-13 17:25:54', 20, 30),
(23, 'Krzesło biurowe', '<h1>Krzesło biurowe jasnoszare</h1>\n<p>Z dumą prezentujemy krzesło biurowe, które nie tylko rewolucjonizuje Twoje doświadczenie pracy, ale także dodaje elegancji i funkcjonalności Twojemu biuru. Zaprojektowane z myślą o maksymalnym komforcie i wygodzie, to krzesło zapewni Ci niezrównany komfort przez cały dzień pracy.</p>\n<h2>Wyrafinowany Design, Niezrównana Wygoda:</h2>\n<p>Krzesło biurowe w jasnoszarym kolorze to połączenie stylowego designu z innowacyjnymi rozwiązaniami ergonomicznymi. Wyposażone w podłokietniki, wysokie oparcie i tapicerkę łatwą w czyszczeniu, zapewnia ono nie tylko wsparcie dla Twojego ciała, ale także łatwe utrzymanie w czystości. Dzięki tapicerce easy clean, krzesło jest odporne na plamy, co sprawia, że utrzymanie go w nienagannej kondycji jest szybkie i łatwe.</p>\n<h2>Funkcjonalność i Dopasowanie:</h2>\n<p>Krzesło biurowe to nie tylko wyraziste wzornictwo, ale także wszechstronne rozwiązania funkcjonalne. Wyposażone w obrotowe siedzisko, regulację wysokości oraz stalową konstrukcję w matowym czarnym wykończeniu, zapewnia ono pełną swobodę ruchu i dostosowanie do indywidualnych preferencji. Dodatkowo, kółka bezpieczne dla parkietu gwarantują płynne przemieszczanie się po pomieszczeniu bez ryzyka uszkodzeń podłogi.</p>\n<h2>Różnorodność i Wybór:</h2>\n<p>Krzesło biurowe dostępne jest w różnych wykończeniach, aby idealnie dopasować się do Twojego gustu i stylu wnętrza. Ten model stworzony jest z myślą o użytku domowym, jednak jego wszechstronne możliwości sprawiają, że idealnie sprawdzi się również w biurze czy gabinetach. Wybierz kolor, który najlepiej podkreśli charakter Twojej przestrzeni i ciesz się niezrównanym komfortem pracy.</p>\n<h3>Wymiary:</h3>\n<ul>\n    <li>Wysokość: 81 cm - 88 cm</li>\n    <li>Szerokość: 64 cm</li>\n    <li>Głębokość: 64 cm</li>\n    <li>Waga produktu: 9,1 kg</li>\n</ul>\n', 399.00, 4, '2024-05-14 07:56:19', 23, 9),
(24, 'Sofa modułowa', '<h1>Sofa modułowa aksamitna prawostronna 4-osobowa</h1>\n<p>Witaj w świecie luksusowego komfortu z naszą Sofą Modułową Aksamitną Prawostronną dla czterech osób. Ta elegancka sofa wyróżnia się luksusową aksamitną tkaniną, która nie tylko zachwyca delikatnym połyskiem, ale także zapewnia niezrównaną trwałość i wytrzymałość dzięki testowi Martindale’a z wynikiem 100 000 cykli. Wykonana z 100% poliestru, ta miękka i jedwabista w dotyku tkanina jest nie tylko przyjemna dla skóry, ale także odporna na ścieranie.</p>\n\n<h2>Design i Styl:</h2>\n<p>Nasza sofa to połączenie elegancji i funkcjonalności. Luksusowa aksamitna tkanina nadaje jej wyjątkowy urok, a długie włosie sprawia, że kolor zmienia się w zależności od padającego światła, dodając niepowtarzalnego efektu wizualnego. Dzięki swoim wymiarom i wygodzie, doskonale pasuje zarówno do nowoczesnych, jak i klasycznych wnętrz, tworząc atmosferę relaksu i elegancji.</p>\n\n<h2>Czyszczenie i Konserwacja:</h2>\n<p>Aby zachować piękno i trwałość naszej sofy, zalecamy delikatne czyszczenie za pomocą miękkiej szczotki, unikając silnych tarcia i gwałtownych ruchów. Tkaniny nie można prać w pralce ani odkurzać. Elementy metalowe i drewniane należy chronić przed długotrwałym kontaktem z wodą i czyszczeniem za pomocą neutralnych detergentów. W przypadku zabrudzeń, zalecamy usuwanie ich delikatnymi, kolistymi ruchami, unikając energicznego pocierania. Przed rozpoczęciem czyszczenia zaleca się przeprowadzenie testu na niewidocznej części mebla, aby uniknąć uszkodzeń tkaniny.</p>\n\n<h3>Wymiary:</h3>\n<ul>\n    <li>Długość: 282 cm</li>\n    <li>Szerokość: 94 cm</li>\n    <li>Wysokość: 63 cm</li>\n    <li>Wysokość podłokietnika: 54 cm</li>\n    <li>Szerokość podłokietnika: 20 cm</li>\n    <li>Szerokość siedziska: 252 cm</li>\n    <li>Wysokość siedziska: 39 cm</li>\n    <li>Wysokość oparcia (od siedziska do szczytu): 27 cm</li>\n    <li>Waga: 72 kg</li>\n</ul>\n\n<p>Przekonaj się sam o wyjątkowym komforcie i stylu naszej sofy modułowej, która stanie się nieodłącznym elementem Twojego wnętrza.</p>\n\n<p><strong>Cena: 4000zł</strong></p>\n', 4000.00, 3, '2024-05-14 07:58:04', 4, 72),
(25, 'Sofa skórzana', '<h1>Sofa skórzana brązowa 3-osobowa</h1>\n<p>Zapraszamy do odkrycia luksusu i wygody z naszą Sofą 3-osobową Skórzaną w kolorze brązowym. Ta niezwykle elegancka sofa to idealne połączenie nowoczesnego designu z funkcjonalnością. Dzięki regulowanemu zagłówkowi, który ma aż 6 różnych pozycji, możesz dostosować go do własnych preferencji, zapewniając sobie idealne wsparcie dla głowy podczas relaksu. Szerokie i głębokie siedzisko sprawia, że nawet długie godziny spędzone na sofy będą niezwykle komfortowe.</p>\n\n<h2>Ekskluzywna Jakość i Ponadczasowy Styl</h2>\n<p>Zapraszamy do odkrycia luksusu i wygody z naszą Sofą 3-osobową Skórzaną w kolorze brązowym. Ta niezwykle elegancka sofa to idealne połączenie nowoczesnego designu z funkcjonalnością. Dzięki regulowanemu zagłówkowi, który ma aż 6 różnych pozycji, możesz dostosować go do własnych preferencji, zapewniając sobie idealne wsparcie dla głowy podczas relaksu. Szerokie i głębokie siedzisko sprawia, że nawet długie godziny spędzone na sofy będą niezwykle komfortowe.</p>\n\n<h2>Wysoka Jakość Wykonania</h2>\n<p>Przód sofy wykonany jest z naturalnej skóry, co nadaje jej wyjątkowego uroku i elegancji, podczas gdy boczne elementy pokryte są wysokiej jakości skórą syntetyczną, zapewniając łatwą pielęgnację i trwałość. Smukłe metalowe nóżki dodają lekkości całej konstrukcji, jednocześnie podkreślając piękno złotego brązu, w którym utrzymane jest obicie sofy.</p>\n\n<h2>Ponadczasowy Styl</h2>\n<p>Ta sofa nie tylko doskonale wpisuje się w różnorodne aranżacje wnętrz, od tradycyjnych po industrialne, ale także emanuje ponadczasowym stylem, który przetrwa wiele lat bez utraty swojego uroku. Zapewnij sobie niezrównany komfort i elegancję z naszą Sofą 3-osobową Skórzaną, która stanie się nieodłącznym elementem Twojego salonu, będąc zarazem miejscem relaksu i centrum uwagi w Twoim domu.</p>\n\n<h3>Wymiary</h3>\n<ul>\n    <li>Wysokość: 93 cm</li>\n    <li>Szerokość: 203 cm</li>\n    <li>Głębokość: 98 cm</li>\n    <li>Grubość siedziska: 19 cm</li>\n    <li>Wysokość siedziska: 45 cm</li>\n    <li>Wysokość nóżek: 15 cm</li>\n    <li>Wysokość podłokietników: 61 cm</li>\n    <li>Poduszki: 55 x 79 cm</li>\n    <li>Powierzchnia siedziska: 158 x 55 cm</li>\n    <li>Gęstość pianki: 25 kg/m³</li>\n</ul>\n', 6999.00, 3, '2024-05-14 08:00:32', 2, 60);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserId` char(36) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Roles` varchar(255) NOT NULL DEFAULT 'CUSTOMER',
  `City` varchar(50) NOT NULL,
  `PostalCode` varchar(6) NOT NULL,
  `Street` varchar(50) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `PhoneNumber` varchar(15) NOT NULL,
  `TermsAccepted` tinyint(1) NOT NULL
) ;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserId`, `FirstName`, `LastName`, `Email`, `Password`, `Roles`, `City`, `PostalCode`, `Street`, `Address`, `PhoneNumber`, `TermsAccepted`) VALUES
('485f6e7f-18bf-4c30-9c35-1f29b44f6a2d', 'Paweł', 'Staniul', 'pawel@gmail.com', '$2a$08$6EdwJlclWta3qYLBtZ3IDO1Caw4hAN2VUDn7ycm4XeEaXwIhgPyM.', 'Admin', 'Tulce', '63-004', 'Fajna', '1', '500-147-053', 1),
('90f78c6f-e6d1-42ea-943a-0aaa3f7a3769', 'Barbara', 'Sławińska', 'barbara@gmail.com', '$2a$08$8lDRVFk.sme/POgQI1YG1uUnAwqbDo9kgeWhcbjo9JVIDL7oRMKou', 'Client', 'Poznań', '60-112', 'Kolorowa', '4', '555-666-777', 1),
('9d424610-c36f-41c5-9b18-a3fd91e7c4dc', 'Anna', 'Sroka', 'anna@gmail.com', '$2a$08$lb67afUyuodXF.aI5TJtqOt1vWKUv6blubbo6PatrzG1jGJJftthW', 'Client', 'Poznań', '61-000', 'Ładna', '1', '111-222-333', 1),
('b8081415-5d5b-4307-95f6-d725887a27c6', 'Justyna', 'Szofińska', 'justyna@gmail.com', '$2a$08$dsXjS8jH.k94fIy28/HAB.8scvdOmYkGduHQcSawtBK44UqDfZKq2', 'Client', 'Poznań', '61-111', 'Szkolna', '2', '444-555-666', 1),
('dd8df97c-66d6-44fb-974f-82dd0add398a', 'Piotr', 'Kośmider', 'piot@gmail.com', '$2a$08$ZMTB6p6LGUcrjhSR4MER6OyTd8eImoRYd74quktzZUJn6XyG20aOS', 'Client', 'Poznań', '60-688', 'os.Jana III Sobieskiego', '9/9', '501505899', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CartItems`
--
ALTER TABLE `CartItems`
  ADD PRIMARY KEY (`CartItemId`),
  ADD KEY `IX_CartItems_ProductId` (`ProductId`),
  ADD KEY `IX_CartItems_CartId` (`CartId`);

--
-- Indexes for table `Carts`
--
ALTER TABLE `Carts`
  ADD PRIMARY KEY (`CartId`),
  ADD KEY `fk_carts_users` (`UserId`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indexes for table `OrderDetails`
--
ALTER TABLE `OrderDetails`
  ADD PRIMARY KEY (`OrderDetailId`),
  ADD KEY `OrderId` (`OrderId`),
  ADD KEY `OrderDetails_ibfk_2` (`ProductId`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`OrderId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `ProductImages`
--
ALTER TABLE `ProductImages`
  ADD PRIMARY KEY (`ImageId`),
  ADD KEY `ProductImages_ibfk_1` (`ProductId`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`ProductId`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CartItems`
--
ALTER TABLE `CartItems`
  MODIFY `CartItemId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `CategoryId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `OrderDetails`
--
ALTER TABLE `OrderDetails`
  MODIFY `OrderDetailId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `OrderId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `ProductImages`
--
ALTER TABLE `ProductImages`
  MODIFY `ImageId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `ProductId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CartItems`
--
ALTER TABLE `CartItems`
  ADD CONSTRAINT `FK_CartItems_Carts_CartId` FOREIGN KEY (`CartId`) REFERENCES `Carts` (`CartId`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_CartItems_Products_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `Products` (`ProductId`) ON DELETE CASCADE;

--
-- Constraints for table `Carts`
--
ALTER TABLE `Carts`
  ADD CONSTRAINT `fk_carts_users` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `OrderDetails`
--
ALTER TABLE `OrderDetails`
  ADD CONSTRAINT `OrderDetails_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `Orders` (`OrderId`),
  ADD CONSTRAINT `OrderDetails_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `Products` (`ProductId`);

--
-- Constraints for table `ProductImages`
--
ALTER TABLE `ProductImages`
  ADD CONSTRAINT `ProductImages_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `Products` (`ProductId`);

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `Categories` (`CategoryId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
