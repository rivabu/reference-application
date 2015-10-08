package com.lishman.world.service;

import java.util.List;

import com.lishman.world.domain.Country;

public interface WorldService {
    
    // Country

    public List<Country> findAllCountries();

    public Country findCountryById(int countryId);

    public Country findCountryByName(String countryName);
    
    public Country findCountryByNameIgnoreCase(String countryName);

    public Country saveCountry(Country country);

    public void deleteCountry(Country country);

}


