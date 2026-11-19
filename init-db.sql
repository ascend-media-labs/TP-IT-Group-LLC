-- TP IT Group Database Initialization Script for Laragon MySQL
CREATE DATABASE IF NOT EXISTS `tpitgroup_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `tpitgroup_db`;

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL DEFAULT 'Administrator',
  `role` VARCHAR(50) NOT NULL DEFAULT 'Super Admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Team Members Table
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `role` VARCHAR(150) NOT NULL,
  `sub_role` TEXT,
  `bio` TEXT,
  `image` VARCHAR(255),
  `department` VARCHAR(100),
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Clients Table
CREATE TABLE IF NOT EXISTS `clients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `src` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Enterprise Partner',
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Careers (Job Openings) Table
CREATE TABLE IF NOT EXISTS `careers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `dept` VARCHAR(100) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `type` VARCHAR(50) NOT NULL DEFAULT 'Full-time',
  `experience` VARCHAR(50) NOT NULL DEFAULT '3-5 years',
  `description` TEXT,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Default Admin User
INSERT INTO `admin_users` (`email`, `password`, `name`, `role`)
VALUES ('admin@tpitgroup.com', 'admin123', 'TP IT Admin', 'Super Admin')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Team Members
INSERT INTO `team_members` (`name`, `role`, `sub_role`, `bio`, `image`, `department`, `display_order`) VALUES
('Karthik Pushpa', 'CEO & Founder', '15+ Years in Enterprise IT Strategy, Cloud Transformations & Digital Transformation', 'Karthik guides TP IT Group\'s enterprise strategy, bringing business priorities together with cloud modernization and digital transformation.', '/team/karthik.jpg', 'TP IT Group LLC', 1),
('Gayathri Devi', 'Director of Operations', 'Ensures seamless project delivery and client satisfaction.', 'Gayathri brings structure to project operations, keeping delivery teams and client expectations aligned.', '/team/gayathri.jpg', 'Project & Operations', 2),
('Lakshmi Bhargavi', 'CTO', 'Cloud architecture expert with deep AWS, GCP and Azure expertise.', 'Lakshmi shapes the technical direction of cloud solutions across AWS, Google Cloud and Azure.', '/team/lakshmi.jpg', 'Cloud & Deep-Tech', 3),
('Sai Deepa', 'VP of Engineering', 'Leads our development teams across custom apps and ERP solutions.', 'Sai leads engineering across custom applications and ERP solutions, connecting technical teams with project goals.', '/team/sai-deepa.jpg', 'Engineering & Apps', 4),
('E S VIJAYAN', 'Director of Business Development', 'Ensures seamless project delivery, Business Growth and client satisfaction.', 'Vijayan connects business growth with client needs, helping shape conversations into focused project opportunities.', '/team/vijayan.jpg', 'Business & Growth', 5)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Clients
INSERT INTO `clients` (`name`, `src`, `category`, `display_order`) VALUES
('USAA', '/logos/usaa.png', 'Fortune 500', 1),
('Progressive', '/logos/progressive.png', 'Fortune 500', 2),
('Liberty Mutual', '/logos/libertymutual.png', 'Fortune 500', 3),
('United IT Solutions', '/logos/uniteditsolutions.png', 'Enterprise Partner', 4),
('Navy Federal', '/logos/navyfederal.png', 'Financial Services', 5),
('Miles IT', '/logos/milesit.png', 'Technology Partner', 6),
('CVS Health', '/logos/cvshealth.png', 'Healthcare & Retail', 7),
('Calvi Electric', '/logos/calvielectric.png', 'Engineering & Industrial', 8),
('Albertsons', '/logos/albertsons.png', 'Retail & Supply Chain', 9),
('Chase', '/logos/chase.png', 'Banking & Finance', 10),
('State Farm', '/logos/statefarm.png', 'Insurance & Financial', 11),
('GEICO', '/logos/geico.png', 'Insurance Services', 12),
('AAA', '/logos/aaa.png', 'Automotive & Travel', 13),
('PenFed', '/logos/penfed.png', 'Credit Union & Finance', 14),
('Capital One', '/logos/capitalone.png', 'Financial Technology', 15),
('Mizuho', '/logos/mizuho.png', 'Global Investment Banking', 16),
('Synechron', '/logos/synechron.png', 'Digital Transformation', 17),
('Persistent', '/logos/persistent.png', 'Digital Engineering', 18),
('Pennymac', '/logos/pennymac.png', 'Mortgage & Lending', 19),
('Signify Health', '/logos/signifyhealth.png', 'Healthcare Solutions', 20)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Careers Openings
INSERT INTO `careers` (`title`, `dept`, `location`, `type`, `experience`, `description`, `is_active`) VALUES
('Cloud Infrastructure Architect', 'Cloud Operations', 'Wilmington, DE / Hybrid', 'Full-time', '5-8 years', 'Lead enterprise cloud migrations across AWS, Azure, and Google Cloud with strong focus on Kubernetes, Terraform, and zero-trust network infrastructure.', 1),
('Senior SAP S/4HANA Consultant', 'Enterprise Solutions', 'Toronto, ON / Hybrid', 'Full-time', '6+ years', 'Architect and implement large-scale SAP S/4HANA transformations, modules integration (FI/CO, MM, SD), and enterprise process modernization.', 1),
('Full-Stack React & Node Engineer', 'Engineering', 'Hyderabad, India / Remote', 'Full-time', '3-5 years', 'Build scalable enterprise web applications, real-time dashboards, and microservices using TypeScript, React, Tailwind, and Node.js.', 1),
('FinTech Data Solutions Engineer', 'FinLabs', 'New York, NY / Hybrid', 'Full-time', '4-6 years', 'Design high-throughput financial data pipelines, risk analytics dashboards, and regulatory reporting integrations for Fortune 500 banks.', 1),
('AI & Automation Workflow Specialist', 'Digital Experience', 'Remote (Global)', 'Full-time', '2-4 years', 'Implement intelligent process automation, LLM workflows, custom AI agents, and RPA solutions to optimize operational efficiency.', 1),
('IT Talent & Workforce Specialist', 'Management', 'Wilmington, DE / On-site', 'Full-time', '3-5 years', 'Manage high-volume technical talent acquisition, client staffing engagements, contract-to-hire pipelines, and global candidate relationships.', 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);
