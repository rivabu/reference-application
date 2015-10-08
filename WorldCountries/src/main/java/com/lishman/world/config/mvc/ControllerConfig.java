package com.lishman.world.config.mvc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.lishman.world.controller.CountryController;

@Configuration
public class ControllerConfig {
    
    @Bean
    public CountryController countryController() {
        return new CountryController();
    }

}