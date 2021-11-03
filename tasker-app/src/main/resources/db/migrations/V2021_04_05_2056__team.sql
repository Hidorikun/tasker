CREATE TABLE `team` (
    `id` bigint NOT NULL,
    `name` varchar(40) DEFAULT NULL,
    `short_description` varchar(100) DEFAULT NULL,
    `project_id` bigint DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_UNIQUE` (`name`),
    KEY `FKp6ovpc4soflfcjbafch33w2ky` (`project_id`),
    CONSTRAINT `FKp6ovpc4soflfcjbafch33w2ky` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
