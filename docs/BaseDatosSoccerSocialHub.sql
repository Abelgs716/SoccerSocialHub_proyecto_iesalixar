-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema soccersocial
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema soccersocial
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `soccersocial` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `soccersocial` ;

-- -----------------------------------------------------
-- Table `soccersocial`.`evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccersocial`.`evento` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NOT NULL,
  `descripcion_larga` VARCHAR(255) NOT NULL,
  `estado` INT NOT NULL,
  `fecha_inicio_evento` DATETIME(6) NOT NULL,
  `id_creador` BIGINT NOT NULL,
  `imagen` TEXT NULL DEFAULT NULL,
  `max_personas` INT NOT NULL,
  `nombre_evento` VARCHAR(255) NOT NULL,
  `ubicacion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `soccersocial`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccersocial`.`usuario` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `estado` INT NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `nombre_usuario` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK5171l57faosmj8myawaucatdw` (`email` ASC) VISIBLE,
  UNIQUE INDEX `UKpuhr3k3l7bj71hb7hk7ktpxn0` (`nombre_usuario` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `soccersocial`.`evento_organizadores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccersocial`.`evento_organizadores` (
  `evento_id` BIGINT NOT NULL,
  `organizador_id` BIGINT NOT NULL,
  INDEX `FKp2n1y59mcxpyrhqno6g8kdwmj` (`organizador_id` ASC) VISIBLE,
  INDEX `FKmdntmoj7380u4gw9epbge399l` (`evento_id` ASC) VISIBLE,
  CONSTRAINT `FKmdntmoj7380u4gw9epbge399l`
    FOREIGN KEY (`evento_id`)
    REFERENCES `soccersocial`.`evento` (`id`),
  CONSTRAINT `FKp2n1y59mcxpyrhqno6g8kdwmj`
    FOREIGN KEY (`organizador_id`)
    REFERENCES `soccersocial`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `soccersocial`.`evento_usuarios_inscritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccersocial`.`evento_usuarios_inscritos` (
  `evento_id` BIGINT NOT NULL,
  `usuarios_inscritos_id` BIGINT NOT NULL,
  INDEX `FKfogw1r08q8kcppqx69tf88wfh` (`usuarios_inscritos_id` ASC) VISIBLE,
  INDEX `FKfsmd8fwbm5d7j67dafws7jyww` (`evento_id` ASC) VISIBLE,
  CONSTRAINT `FKfogw1r08q8kcppqx69tf88wfh`
    FOREIGN KEY (`usuarios_inscritos_id`)
    REFERENCES `soccersocial`.`usuario` (`id`),
  CONSTRAINT `FKfsmd8fwbm5d7j67dafws7jyww`
    FOREIGN KEY (`evento_id`)
    REFERENCES `soccersocial`.`evento` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `soccersocial`.`usuario_eventos_inscritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccersocial`.`usuario_eventos_inscritos` (
  `usuario_id` BIGINT NOT NULL,
  `eventos_inscritos_id` BIGINT NOT NULL,
  INDEX `FKbqnqu3mnxu39ikv9ee9j6m419` (`eventos_inscritos_id` ASC) VISIBLE,
  INDEX `FKihr9no8dv5dogldm4hq32smrs` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `FKbqnqu3mnxu39ikv9ee9j6m419`
    FOREIGN KEY (`eventos_inscritos_id`)
    REFERENCES `soccersocial`.`evento` (`id`),
  CONSTRAINT `FKihr9no8dv5dogldm4hq32smrs`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `soccersocial`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
