CREATE TABLE `sprint` (
    `id` bigint NOT NULL,
    `name` varchar(30) DEFAULT NULL,
    `number` bigint DEFAULT NULL,
    `team_id` bigint DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FKjucyh79ooyrnfnt30s0u76os8` (`team_id`),
    CONSTRAINT `FKjucyh79ooyrnfnt30s0u76os8` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
