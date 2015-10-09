package com.lishman.world.domain;

import java.util.Date;
 
public class Country {

    private Integer id;
    private String name;
    private int area;
    private long population;
    private Date populationUpdatedOn;
    private int rank;
    private String currency;

    private Continent continent;
    
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

    public void setArea(int area) {
        this.area = area;
    }

    public int getArea() {
        return area;
    }

    public void setPopulation(long population) {
        this.population = population;
    }

    public long getPopulation() {
        return population;
    }

    public void setPopulationUpdatedOn(Date populationUpdatedOn) {
        this.populationUpdatedOn = populationUpdatedOn;
    }

    public Date getPopulationUpdatedOn() {
        return populationUpdatedOn;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getRank() {
        return rank;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCurrency() {
        return currency;
    }

    public void setContinent(Continent continent) {
        this.continent = continent;
    }

    public Continent getContinent() {
        return continent;
    }

    public String toString() {
        return getName();
    }
}