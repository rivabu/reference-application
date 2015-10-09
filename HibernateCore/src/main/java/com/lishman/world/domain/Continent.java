package com.lishman.world.domain;

import java.util.HashSet;
import java.util.Set;

public class Continent {

    private Integer id;
    private String name;
    private Set<Country> countries = new HashSet<Country>();

    private void setId(Integer id) {
        this.id = id;
    }
    
    public Integer getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setCountries(Set<Country> countries) {
        this.countries = countries;
    }
    
    public Set<Country> getCountries() {
        return countries;
    }

    public void addCountry(Country country) {
        country.setContinent(this);
        getCountries().add(country);
    }

    public String toString() {
        return getName();
    }
}
