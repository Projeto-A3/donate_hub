CREATE TABLE `users` 
(`id` varchar(36) NOT NULL,
`name` varchar(255) NOT NULL, 
`surname` varchar(255) NULL, 
`email` varchar(255) NOT NULL, 
`password` varchar(255) NOT NULL, 
`cpf_cnpj` varchar(255) NOT NULL, 
`phone` varchar(255) NOT NULL, 
`birthDate` date NULL, 
`status` int NOT NULL,
`type` enum ('doador', 'donatario', 'admin') NOT NULL, 
`dependents` int NULL,
`createdAt` datetime NOT NULL DEFAULT now(), 
`updatedAt` datetime NOT NULL DEFAULT now(),
UNIQUE INDEX `UQ_97672ac88f789774dd47f7c8be3` (`email`),
PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE `addresses` 
(`id` int NOT NULL AUTO_INCREMENT, 
`street` varchar(255) NOT NULL, 
`number` varchar(255) NOT NULL, 
`additionalDetails` varchar(255) NULL, 
`district` varchar(255) NOT NULL,
`city` varchar(255) NOT NULL, 
`state` varchar(255) NOT NULL, 
`zipCode` varchar(255) NOT NULL, 
`userId` varchar(255) NULL, 
CONSTRAINT `addressesUser` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, 
PRIMARY KEY (`id`)) ENGINE=InnoDB;       


CREATE TABLE `requests` 
(`id` int NOT NULL AUTO_INCREMENT, 
`title` varchar(255) NOT NULL, 
`description` varchar(255) NOT NULL,
`dueDate` datetime NOT NULL, 
`status` int NOT NULL DEFAULT '0', 
`doneeId` varchar(36) NULL, 
`donorId` varchar(36) NULL, 
UNIQUE INDEX `REL_c84002d3aa9ee5fde127223b13` (`doneeId`), `createdAt` datetime NOT NULL DEFAULT now(), `updatedAt` datetime NOT NULL DEFAULT now(),
CONSTRAINT `doneeRequest` FOREIGN KEY (`doneeId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `donorRequest` FOREIGN KEY (`donorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY (`id`)) ENGINE=InnoDB;
        
        
CREATE TABLE `administrators` 
(`id` int NOT NULL AUTO_INCREMENT, 
`email` varchar(255) NOT NULL, 
`password` varchar(255) NOT NULL, 
`type` enum ('doador', 'donatario', 'admin') NOT NULL DEFAULT 'doador',
PRIMARY KEY (`id`)) ENGINE=InnoDB;
