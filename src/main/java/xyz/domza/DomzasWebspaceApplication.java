package xyz.domza;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;
import java.util.*;

@SpringBootApplication
public class DomzasWebspaceApplication {
	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(DomzasWebspaceApplication.class);
		application.setDefaultProperties(getProperties());
		application.run(args);
	}

	// Very ugly temporary implementation! - !!These properties are loaded before application.properties!!
	private static Properties getProperties() {
		// Try to read db config from file
		Map<String, String> config = new LinkedHashMap<>();
		try {
			File configFile = new File(System.getProperty("user.home") + "/domzas-webspace.config");
			System.out.println(configFile);
			Scanner scanner = new Scanner(configFile);
			while (scanner.hasNextLine()) {
				String line = scanner.nextLine();
				if (line.contains("=")) {
					String[] arr = line.split("=");
					config.put(arr[0], arr[1]);
				} else {
					System.err.println("Config err on property: " + line);
				}
			}
		} catch (Exception e) {
			// File doesn't exist, so create it
			try {
				System.err.println("Config file not found!");
				File newConfigFile = new File(System.getProperty("user.home") + "/domzas-webspace.config");
				if (newConfigFile.createNewFile()) {
					System.out.println("Creating new config file: " + newConfigFile.getName());
				}
			} catch (IOException ex) {
				System.err.println("An error occurred while creating new config file.");
				ex.printStackTrace();
			}
		}
		Properties properties = new Properties();
		if (config.size() == 3) {
			String url = config.get("url");
			String username = config.get("username");
			String password = config.get("password");
			if (url == null || username == null || password == null) {
				System.err.println("Err in config file, not all elements, or too many elements specified");
			} else {
				properties.put("spring.datasource.url", url);
				properties.put("spring.datasource.username", username);
				properties.put("spring.datasource.password", password);
			}

		} else {
			System.err.println("Err in config file, not all elements, or too many elements specified");
		}
		return properties;
	}
}
