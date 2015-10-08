package com.lishman.world.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lishman.world.domain.Country;
import com.lishman.world.domain.validation.CountryNotFoundException;
import com.lishman.world.repository.CountryRepository;

@Service
@Transactional
public class WorldServiceImpl implements WorldService {
    
    @Autowired private CountryRepository countryRepository;
    
    // --------------------------------------------------- Country

    @Override
    public List<Country> findAllCountries() {
        return countryRepository.findAll();
    }
    
    @Override
    public Country findCountryById(int countryId) {
        Optional<Country> country = Optional.ofNullable(countryRepository.findOne(countryId));
        if (! country.isPresent()) {
            throw new CountryNotFoundException(String.format("Country %s does not exist.", countryId));
        }
        return country.get();
    }

    @Override
    public Country findCountryByName(String countryName) {
        return countryRepository.findByName(countryName);
    }

    @Override
    public Country findCountryByNameIgnoreCase(String countryName) {
        return countryRepository.findByNameIgnoreCase(countryName);
    }

    @Override
    public Country saveCountry(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public void deleteCountry(Country country) {
        countryRepository.delete(country);
    }
}