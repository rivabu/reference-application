package com.journaldev.spring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler  {
	private static final Logger log = LoggerFactory.getLogger(RestResponseEntityExceptionHandler.class);

	/**
     * Handles exception for MissingParameterException
     * 
     * @param e the MissingParameterException
     * @return ResponseEntity<Errors>
     */

    @ExceptionHandler(MethodArgumentNotValidException.class)
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
    	BindingResult br = ex.getBindingResult();
		 Errors errors = new Errors();
	        ErrorDetail errorDetail = new ErrorDetail("101", br.getFieldError().getField(), br.getFieldError().getDefaultMessage());
	        errors.getErrorDetails().add(errorDetail);
	        //LOG.warn(messageErrorForLogging(e, errorDetail));

	        return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
	}
	
    



       
    }

