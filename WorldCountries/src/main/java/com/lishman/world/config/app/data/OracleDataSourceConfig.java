package com.lishman.world.config.app.data;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@PropertySource("classpath:data/jdbc-${database:dev}.properties")
public class OracleDataSourceConfig {
    
    @Autowired private Environment env;
    
    @Bean(destroyMethod="close")
    public DataSource dataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(env.getProperty("jdbc.driverClassName"));
        dataSource.setUrl(env.getProperty("jdbc.url"));
        dataSource.setUsername(env.getProperty("jdbc.username"));
        dataSource.setPassword(env.getProperty("jdbc.password"));
        dataSource.setMaxActive(env.getProperty("dbcp.maxActive", Integer.class));
        dataSource.setMaxIdle(env.getProperty("dbcp.maxIdle", Integer.class));
        dataSource.setMaxWait(env.getProperty("dbcp.maxWait", Long.class));
        return dataSource;
    }
 
}