package com.lishman.world.config.app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.lishman.world.service.WorldService;
import com.lishman.world.service.WorldServiceImpl;

@Configuration
public class ServiceConfig {
    
    @Bean
    public WorldService worldService() {
        return new WorldServiceImpl();
    }
    
}