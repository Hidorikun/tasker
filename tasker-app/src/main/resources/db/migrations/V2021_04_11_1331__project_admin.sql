CREATE TABLE `project_admin` (
    `project_id` bigint NOT NULL,
    `user_id` bigint NOT NULL,
    PRIMARY KEY (`project_id`,`user_id`),
    KEY `FKps4i8coybwsyghws4ulu3cnr3` (`user_id`),
    CONSTRAINT `FKhwqdy6kbc6g50o6dqig2g2hrd` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
    CONSTRAINT `FKps4i8coybwsyghws4ulu3cnr3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
