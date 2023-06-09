SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema porcontec
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema porcontec
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `porcontec` DEFAULT CHARACTER SET utf8 ;
USE `porcontec` ;

-- -----------------------------------------------------
-- Table `porcontec`.`section`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `porcontec`.`section` (
  `id_section` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id_section`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `porcontec`.`question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `porcontec`.`question` (
  `id_question` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(45) NOT NULL,
  `section_question` INT NOT NULL,
  PRIMARY KEY (`id_question`),
  INDEX `fk_question_section1_idx` (`section_question` ASC) VISIBLE,
  CONSTRAINT `fk_question_section1`
    FOREIGN KEY (`section_question`)
    REFERENCES `porcontec`.`section` (`id_section`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `porcontec`.`options`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `porcontec`.`options` (
  `id_option` INT NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(15) NOT NULL,
  `required` BIT NULL,
  PRIMARY KEY (`id_option`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `porcontec`.`answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `porcontec`.`answer` (
  `id_answer` INT NOT NULL AUTO_INCREMENT,
  `options_answer` INT NOT NULL,
  `question_answer` INT NOT NULL,
  PRIMARY KEY (`id_answer`, `options_answer`, `question_answer`),
  INDEX `fk_answer_options1_idx` (`options_answer` ASC) VISIBLE,
  INDEX `fk_answer_question1_idx` (`question_answer` ASC) VISIBLE,
  CONSTRAINT `fk_answer_options1`
    FOREIGN KEY (`options_answer`)
    REFERENCES `porcontec`.`options` (`id_option`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_answer_question1`
    FOREIGN KEY (`question_answer`)
    REFERENCES `porcontec`.`question` (`id_question`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `porcontec`.`options_has_question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `porcontec`.`options_has_question` (
  `options_id_option` INT NOT NULL,
  `question_id_question` INT NOT NULL,
  PRIMARY KEY (`options_id_option`, `question_id_question`),
  INDEX `fk_options_has_question_question1_idx` (`question_id_question` ASC) VISIBLE,
  INDEX `fk_options_has_question_options_idx` (`options_id_option` ASC) VISIBLE,
  CONSTRAINT `fk_options_has_question_options`
    FOREIGN KEY (`options_id_option`)
    REFERENCES `porcontec`.`options` (`id_option`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_options_has_question_question1`
    FOREIGN KEY (`question_id_question`)
    REFERENCES `porcontec`.`question` (`id_question`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;