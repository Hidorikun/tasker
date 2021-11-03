CREATE TABLE `project` (
    `id` bigint NOT NULL,
    `name` varchar(40) DEFAULT NULL,
    `short_description` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_3k75vvu7mevyvvb5may5lj8k7` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
