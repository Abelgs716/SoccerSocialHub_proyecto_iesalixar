package com.project.SoccerSocialClub.SoccerSocialClub;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;
import java.nio.file.Paths;

@SpringBootApplication
public class SoccerSocialClubApplication {

	public static void main(String[] args) {
		if (System.getenv("AWS_EXECUTION_ENV") == null) {
			int maxDepth = 5;
			Optional<Path> envPathOptional = findEnvFile(Paths.get("").toAbsolutePath(), maxDepth);
			if (envPathOptional.isPresent()) {
				Path envPath = envPathOptional.get();
				Dotenv dotenv = Dotenv.configure().directory(envPath.getParent().toString()).load();
				dotenv.entries().forEach(entry -> {
					System.setProperty(entry.getKey(), entry.getValue());
				});
			} else {
				System.out.println(".env file not found!");
			}
		}

		SpringApplication.run(SoccerSocialClubApplication.class, args);
	}

	private static Optional<Path> findEnvFile(Path startPath, int maxDepth) {
		Path currentPath = startPath;
		int depth = 0;
		while (currentPath != null && depth <= maxDepth) {
			Path envFile = currentPath.resolve(".env");
			if (Files.exists(envFile)) {
				return Optional.of(envFile);
			}
			currentPath = currentPath.getParent();
			depth++;
		}
		return Optional.empty();
	}
}