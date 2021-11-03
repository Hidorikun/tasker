CREATE TABLE `team_user` (
    `user_id` bigint NOT NULL,
    `team_id` bigint NOT NULL,
    PRIMARY KEY (`user_id`,`team_id`),
    KEY `FKiuwi96twuthgvhnarqj34mnjv` (`team_id`),
    CONSTRAINT `FK6w6lkqjk13n0nmf4jbnb3d376` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `FKiuwi96twuthgvhnarqj34mnjv` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
