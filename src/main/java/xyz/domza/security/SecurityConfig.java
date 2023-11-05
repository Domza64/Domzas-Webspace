package xyz.domza.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests( auth -> {
                    auth.requestMatchers("/admin").authenticated();
                    auth.requestMatchers("/api/remove-comment/**").authenticated();
                    auth.anyRequest().permitAll();
                })
                .csrf(csrf -> csrf.ignoringRequestMatchers("/submit-message"))
                .oauth2Login(withDefaults())
                .build();
    }
}
