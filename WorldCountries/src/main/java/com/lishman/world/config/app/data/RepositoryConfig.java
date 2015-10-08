package com.lishman.world.config.app.data;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.lishman.world.repository.RepositoryPackage;

@Configuration
@EnableJpaRepositories(basePackageClasses=RepositoryPackage.class)
public class RepositoryConfig {
 
}