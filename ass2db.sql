-- MySQL dump 10.13  Distrib 8.0.46, for macos15 (arm64)
--
-- Host: localhost    Database: ass1db
-- ------------------------------------------------------
-- Server version	9.7.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'c8a71472-3f86-11f1-b06d-b7da231e2c86:1-122';

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,'Yochi','Income',300,'Yochi','Salary & Wages','2026-05-20','ella'),(2,'Gong Grocer','Expense',4.79,'Gong Grocer','Groceries','2026-04-15','ella'),(3,'Koithe','Expense',8.28,'Koithe','Eating & Drinking Out','2026-04-15','ella'),(4,'Transport NSW','Expense',11.38,'Transport NSW','Transport','2026-04-15','ella'),(5,'Yochi','Income',500,'Yochi','Salary & Wages','2026-04-16','ella'),(6,'ALDI','Expense',16.21,'ALDI','Groceries','2026-04-16','ella'),(8,'Woolworths Metro','Expense',24.2,'Woolworths Metro','Groceries','2026-04-17','ella'),(10,'Freo','Expense',7.43,'Freo','Eating & Drinking Out','2026-05-22','sarah'),(11,'Transport NSW','Expense',4.62,'Transport NSW','Transport','2026-05-22','sarah'),(13,'Coles','Expense',3.5,'Coles','Groceries','2026-05-27','ella');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'admin','admin@test.com','$2b$12$ohZqou0Y16bXF/G7mWEbCe5FW3jzmxWRPqno.DrHWr8qAii5RWhxu','admin'),(5,'ella','ella@test.com','$2b$12$uP2XED0qZJpiVbdQ/Q9fnOFGEJ3gGzUAz.j0YaCnSMW5EyUWxUn8O','user'),(6,'sarah','sarah@test.com','$2b$12$.C94IOgUA/SEAoIeyIJdDupbZMqESX740Ejs7rJQtq2SQz/y4OTcm','user'),(8,'shaunn','shaun@testt.com','$2b$12$RcAFI0aqyflWlfRp/aH/Bu9cs8reLQCZ/oPD6Q4IDIIaXvk2l1sbm','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useractivity`
--

DROP TABLE IF EXISTS `useractivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useractivity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useractivity`
--

LOCK TABLES `useractivity` WRITE;
/*!40000 ALTER TABLE `useractivity` DISABLE KEYS */;
INSERT INTO `useractivity` VALUES (1,'admin','login','User logged in','2026-05-26'),(2,'ella','login','User logged in','2026-05-26'),(3,'ella','Update an expense','Updated expense ID: 26','2026-05-26'),(4,'admin','login','User logged in','2026-05-26'),(5,'ella','login','User logged in','2026-05-26'),(6,'ella','login','User logged in','2026-05-26'),(7,'admin','login','User logged in','2026-05-26'),(8,'ella','login','User logged in','2026-05-26'),(9,'ella','login','User logged in','2026-05-26'),(10,'admin','login','User logged in','2026-05-26'),(11,'ella','login','User logged in','2026-05-26'),(12,'admin','login','User logged in','2026-05-26'),(13,'admin','login','User logged in','2026-05-26'),(14,'ella','login','User logged in','2026-05-26'),(15,'admin','login','User logged in','2026-05-26'),(16,'ella','login','User logged in','2026-05-26'),(17,'ella','login','User logged in','2026-05-26'),(18,'admin','login','User logged in','2026-05-26'),(19,'admin','login','User logged in','2026-05-26'),(20,'ella','login','User logged in','2026-05-26'),(21,'ella','login','User logged in','2026-05-26'),(22,'ella','login','User logged in','2026-05-26'),(23,'ella','login','User logged in','2026-05-26'),(24,'ella','Create a new expense','Created expense: Yochi','2026-05-26'),(25,'ella','Create a new expense','Created expense: Gong Grocer','2026-05-26'),(26,'ella','Create a new expense','Created expense: Koithe','2026-05-26'),(27,'ella','Create a new expense','Created expense: Transport NSW','2026-05-26'),(28,'ella','Create a new expense','Created expense: Yochi','2026-05-26'),(29,'ella','Create a new expense','Created expense: ALDI','2026-05-26'),(30,'ella','Create a new expense','Created expense: Tong Li Supermarket','2026-05-26'),(31,'ella','Create a new expense','Created expense: Woolworths Metro','2026-05-26'),(32,'ella','Create a new expense','Created expense: ','2026-05-26'),(33,'ella','Delete an expense','Deleted expense ID: 9','2026-05-26'),(34,'sarah','register','User registered a new account','2026-05-26'),(35,'sarah','login','User logged in','2026-05-26'),(36,'admin','login','User logged in','2026-05-26'),(37,'ella','login','User logged in','2026-05-26'),(38,'ella','login','User logged in','2026-05-26'),(39,'admin','login','User logged in','2026-05-26'),(40,'sarah','login','User logged in','2026-05-26'),(41,'sarah','Create a new expense','Created expense: Freo','2026-05-26'),(42,'sarah','Create a new expense','Created expense: Transport NSW','2026-05-26'),(43,'ella','login','User logged in','2026-05-26'),(44,'admin','login','User logged in','2026-05-26'),(45,'ella','login','User logged in','2026-05-26'),(46,'admin','login','User logged in','2026-05-26'),(47,'ella','login','User logged in','2026-05-26'),(48,'sarah','login','User logged in','2026-05-26'),(49,'sarah','login','User logged in','2026-05-26'),(50,'ella','login','User logged in','2026-05-26'),(51,'admin','login','User logged in','2026-05-26'),(52,'ella','login','User logged in','2026-05-26'),(53,'admin','login','User logged in','2026-05-26'),(54,'ella','login','User logged in','2026-05-26'),(55,'admin','login','User logged in','2026-05-26'),(56,'ella','Login','User logged in','2026-05-26'),(57,'ella','Login','User logged in','2026-05-26'),(58,'ella','Login','User logged in','2026-05-26'),(59,'ella','Login','User logged in','2026-05-26'),(60,'admin','Login','User logged in','2026-05-26'),(61,'ella','Login','User logged in','2026-05-26'),(62,'admin','Login','User logged in','2026-05-26'),(63,'admin','Login','User logged in','2026-05-26'),(64,'ella','Login','User logged in','2026-05-26'),(65,'sarah','Login','User logged in','2026-05-26'),(66,'Shaun','Register','User registered a new account','2026-05-26'),(67,'shaunn','Register','User registered a new account','2026-05-26'),(68,'shaunn','Login','User logged in','2026-05-26'),(69,'ella','Login','User logged in','2026-05-27'),(70,'ella','Create a new expense','Created expense: Coles','2026-05-27'),(71,'ella','Delete an expense','Deleted expense ID: 7','2026-05-27'),(72,'ella','Update an expense','Updated expense ID: 5','2026-05-27'),(73,'admin','Login','User logged in','2026-05-27'),(74,'ella','Login','User logged in','2026-05-27'),(75,'ella','Create a new expense','Created expense: Coles','2026-05-27'),(76,'ella','Update an expense','Updated expense ID: 12','2026-05-27'),(77,'ella','Delete an expense','Deleted expense ID: 12','2026-05-27'),(78,'admin','Login','User logged in','2026-05-27'),(79,'ella','Login','User logged in','2026-05-27'),(80,'ella','Create a new expense','Created expense: Woolworths Metro','2026-05-27'),(81,'ella','Update an expense','Updated expense ID: 14','2026-05-27'),(82,'ella','Delete an expense','Deleted expense ID: 14','2026-05-27'),(83,'admin','Login','User logged in','2026-05-27'),(84,'ella','Login','User logged in','2026-05-27'),(85,'ella','Create a new expense','Created expense: Yochi','2026-05-27'),(86,'ella','Update an expense','Updated expense ID: 15','2026-05-27'),(87,'ella','Delete an expense','Deleted expense ID: 15','2026-05-27'),(88,'admin','Login','User logged in','2026-05-27'),(89,'ella','Login','User logged in','2026-05-27'),(90,'ella','Create a new expense','Created expense: KFC Broadway','2026-05-27'),(91,'ella','Update an expense','Updated expense ID: 16','2026-05-27'),(92,'ella','Delete an expense','Deleted expense ID: 16','2026-05-27'),(93,'admin','Login','User logged in','2026-05-27');
/*!40000 ALTER TABLE `useractivity` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-27 19:16:03
