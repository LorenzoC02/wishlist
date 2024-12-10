package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // Define the security filter chain (for HTTP security configurations)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .requestMatchers("/auth/**").permitAll() // Use .requestMatchers() instead of .antMatchers()
                .anyRequest().authenticated()  // Apply authentication to all other URLs
            .and()
            .httpBasic()  // Enable basic authentication
            .and()
            .csrf().disable();  // Disable CSRF protection for simplicity (should be revisited for production)

        return http.build();  // Build and return the SecurityFilterChain
    }

    // Define a custom UserDetailsService Bean
    @Bean
    public UserDetailsService userDetailsService() {
        // Create a UserDetails object with a hardcoded user, and return it
        UserDetails user = User.withUsername("user")
                .password(passwordEncoder().encode("password"))  // Encode password
                .roles("USER")
                .build();

        return username -> {
            if ("user".equals(username)) {
                return user;  // Return the user details if the username matches
            }
            throw new IllegalArgumentException("User not found");
        };
    }

    // Define the PasswordEncoder Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Use BCryptPasswordEncoder for secure password encoding
    }
}