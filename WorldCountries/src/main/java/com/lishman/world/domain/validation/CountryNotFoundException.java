package com.lishman.world.domain.validation;

import org.springframework.dao.EmptyResultDataAccessException;

public class CountryNotFoundException extends EmptyResultDataAccessException {

    private static final int EXPECTED_SIZE = 1;

    public CountryNotFoundException(String msg) {
        super(msg, EXPECTED_SIZE);
    }

}