package com.lishman.world.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "CTRY")
public class Country {

    @Id
    @Column(name = "CTRY_ID")
    //mysql
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    // needed for oracle
    //    @GeneratedValue(generator = "CountrySeq", 
	//                    strategy = GenerationType.SEQUENCE)
	//    @SequenceGenerator(name = "CountrySeq", 
	//                       sequenceName = "CTRY_SEQ", 
	//                       allocationSize = 1)    
    private Integer id;

    @Column(name = "CTRY_NAME")
    @NotEmpty
    private String name;

    @Column(name = "CTRY_AREA")
    @NotNull
    @Min(1)
    private Integer area;

    @Column(name = "CTRY_POP")
    @NotNull
    @Min(1)
    private Long population;
    
    public Country() {
    }

    public Country(String name, Integer area, Long population) {
        setName(name);
        setArea(area);
        setPopulation(population);
    }

    public boolean isNewCountry() {
        return id == null;
    }

    public void setId(Integer id) {
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

    public void setArea(Integer area) {
        this.area = area;
    }

    public Integer getArea() {
        return area;
    }

    public void setPopulation(Long population) {
        this.population = population;
    }

    public Long getPopulation() {
        return population;
    }
}