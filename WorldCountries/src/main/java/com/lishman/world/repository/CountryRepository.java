package com.lishman.world.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lishman.world.domain.Country;

public interface CountryRepository extends JpaRepository<Country, Integer> {
    
    public Country findByName(String countryName);
    
    @Query("select c from Country c where lower(c.name) = lower(:countryName)")
    public Country findByNameIgnoreCase(@Param("countryName") String countryName);


}