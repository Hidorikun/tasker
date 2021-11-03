CREATE TABLE `user` (
    `id` bigint NOT NULL,
    `email` varchar(255) DEFAULT NULL,
    `first_name` varchar(40) DEFAULT NULL,
    `image` mediumblob,
    `last_name` varchar(20) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `username` varchar(40) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
    UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
