package com.lishman.world.config.mvc;

import java.util.Properties;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
@Import(ControllerConfig.class)
public class MvcConfig extends WebMvcConfigurerAdapter {
    
    @Autowired
    private RequestMappingHandlerAdapter requestMappingHandlerAdapter;

    @PostConstruct
    public void init() {
        requestMappingHandlerAdapter.setIgnoreDefaultModelOnRedirect(true);
    }
    
    // ---------------------------------------------------- Static Resources
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("/static/");
        registry.addResourceHandler("/css/**").addResourceLocations("/css/");
        registry.addResourceHandler("/images/**").addResourceLocations("/images/");
        registry.addResourceHandler("/js/**").addResourceLocations("/js/");
    }
    
    // ---------------------------------------------------- View Controller
    
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
      registry.addViewController("/").setViewName("home");
      registry.addViewController("home").setViewName("home");
    }      

    // ---------------------------------------------------- JSP

    @Bean
    public InternalResourceViewResolver internalResourceViewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/jsp/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }
    
    // ---------------------------------------------------- Exceptions

    @Bean
    public SimpleMappingExceptionResolver exceptionResolver() {
    
        Properties mappings = new Properties();
        mappings.setProperty("CountryNotFoundException", "error404");
    
        SimpleMappingExceptionResolver exceptionResolver = new SimpleMappingExceptionResolver();
        exceptionResolver.setExceptionMappings(mappings);
        exceptionResolver.setDefaultErrorView("error");
        exceptionResolver.setWarnLogCategory("com.lishman.world.MvcErrorLogger");
        return exceptionResolver;
    } 
    
    // ---------------------------------------------------- Messages
    
    @Bean
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource messages = new ResourceBundleMessageSource();
        messages.setBasename("/messages/validation");
        return messages;
    }   
}