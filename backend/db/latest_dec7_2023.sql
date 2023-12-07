-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 03:10 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chart`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_mapping`
--

CREATE TABLE `account_mapping` (
  `account_mapping_id` int(11) NOT NULL,
  `account_id` int(20) NOT NULL,
  `code` varchar(30) NOT NULL,
  `name` varchar(60) NOT NULL,
  `status` varchar(50) NOT NULL,
  `type` varchar(40) NOT NULL,
  `bank_acc_number` int(30) NOT NULL,
  `bank_acc_type` varchar(40) NOT NULL,
  `currency_code` varchar(20) NOT NULL,
  `reporting_code_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `external_system`
--

CREATE TABLE `external_system` (
  `system_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `metric`
--

CREATE TABLE `metric` (
  `metric_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `metric_type` varchar(20) DEFAULT NULL,
  `about` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metric`
--

INSERT INTO `metric` (`metric_name`, `description`, `metric_type`, `about`) VALUES
('Average creditors days', 'test descrip', '', ''),
('Average debtors days', 'qweqweqwe', '', ''),
('Average value of invoices', '', '', ''),
('Bank Balances', NULL, NULL, NULL),
('Cash received', '', '', ''),
('Cash spent', '', '', ''),
('Cash surplus (deficit)', '', '', ''),
('Closing bank balance', '', '', ''),
('Creditors', '', 'Amount', ''),
('Current Assets', 'test hello haha', NULL, NULL),
('Current assets to liabilities', '', '', ''),
('Debtors', '', 'Amount', ''),
('Direct costs', '', 'Amount', ''),
('Equity', 'test', NULL, NULL),
('Expenses', '', '', 'asdfasdf'),
('Gross profit (loss)', '', '', ''),
('Gross profit margin', 'test description', '', ''),
('Income', '', '', ''),
('Net assets', '', '', ''),
('Net profit margin', '', '', ''),
('Number of invoices issued', '', '', ''),
('Other Income', '', '', ''),
('Retained Earnings', 'test', NULL, NULL),
('Short term cash forecast', '', '', ''),
('Term assets to liabilities', '', '', ''),
('Year Earnings', 'year earnings description', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `metric_formula`
--

CREATE TABLE `metric_formula` (
  `formula_id` int(11) NOT NULL,
  `metric_name` varchar(255) NOT NULL,
  `system_id` int(11) NOT NULL,
  `api_endpoint` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `radar_chart`
--

CREATE TABLE `radar_chart` (
  `metrics_id` int(11) NOT NULL,
  `entity` varchar(50) NOT NULL,
  `cashflow_ratio` float NOT NULL,
  `gross_profit_margin` float NOT NULL,
  `liquidity_current_ratio` float NOT NULL,
  `liquidity_quick_ratio` float NOT NULL,
  `days_receivable` float NOT NULL,
  `days_payable` float NOT NULL,
  `days_inventory` float NOT NULL,
  `interest_cover` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `radar_chart`
--

INSERT INTO `radar_chart` (`metrics_id`, `entity`, `cashflow_ratio`, `gross_profit_margin`, `liquidity_current_ratio`, `liquidity_quick_ratio`, `days_receivable`, `days_payable`, `days_inventory`, `interest_cover`) VALUES
(1, 'SME A', 1.05, 2, 1.49, 1.34, 1.02, 0.7, 1.25, 1.35),
(2, 'Benchmark', 1, 1, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `company_name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `company_name`, `email`, `password`) VALUES
(1, 'test', 'test', 'testcompany', 'test@gmail.com', 'asdf123');

-- --------------------------------------------------------

--
-- Table structure for table `user_saved_metrics`
--

CREATE TABLE `user_saved_metrics` (
  `id` int(11) NOT NULL,
  `metric_name` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `value2` varchar(255) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_saved_metrics`
--

INSERT INTO `user_saved_metrics` (`id`, `metric_name`, `value`, `value2`, `type`) VALUES
(209, 'Retained Earnings', '-18.90', '', ''),
(210, 'Year Earnings', '3029.68', '', ''),
(213, 'Equity', '3010.78', '', ''),
(214, 'Income', '2067.60', '8710.89', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_mapping`
--
ALTER TABLE `account_mapping`
  ADD PRIMARY KEY (`account_mapping_id`);

--
-- Indexes for table `external_system`
--
ALTER TABLE `external_system`
  ADD PRIMARY KEY (`system_id`);

--
-- Indexes for table `metric`
--
ALTER TABLE `metric`
  ADD PRIMARY KEY (`metric_name`);

--
-- Indexes for table `metric_formula`
--
ALTER TABLE `metric_formula`
  ADD PRIMARY KEY (`formula_id`);

--
-- Indexes for table `radar_chart`
--
ALTER TABLE `radar_chart`
  ADD PRIMARY KEY (`metrics_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_saved_metrics`
--
ALTER TABLE `user_saved_metrics`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_mapping`
--
ALTER TABLE `account_mapping`
  MODIFY `account_mapping_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `external_system`
--
ALTER TABLE `external_system`
  MODIFY `system_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `metric_formula`
--
ALTER TABLE `metric_formula`
  MODIFY `formula_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `radar_chart`
--
ALTER TABLE `radar_chart`
  MODIFY `metrics_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_saved_metrics`
--
ALTER TABLE `user_saved_metrics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
