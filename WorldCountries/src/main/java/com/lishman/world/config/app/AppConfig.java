package com.lishman.world.config.app;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import com.lishman.world.config.app.data.JpaConfig;
import com.lishman.world.config.app.data.OracleDataSourceConfig;
import com.lishman.world.config.app.data.RepositoryConfig;

@Configuration
@Import(value={JpaConfig.class,
               OracleDataSourceConfig.class,
               RepositoryConfig.class,
               ServiceConfig.class,})
public class AppConfig {
}