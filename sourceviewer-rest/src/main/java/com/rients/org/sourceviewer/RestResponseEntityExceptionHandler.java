package com.rients.org.sourceviewer;

import org.codehaus.jackson.JsonParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	/**
	 * Handles exception for MissingParameterException
	 * 
	 * @param e
	 *            the MissingParameterException
	 * @return ResponseEntity<Errors>
	 */

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status,
			WebRequest request) {

		BindingResult br = ex.getBindingResult();
		Errors errors = new Errors();
		ErrorDetail errorDetail = new ErrorDetail("101", br.getFieldError().getField(), br.getFieldError().getDefaultMessage());
		errors.getErrorDetails().add(errorDetail);

		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status,
			WebRequest request) {
		Errors errors = new Errors();

		Throwable mostSpecificCause = ex.getMostSpecificCause();

		if ((mostSpecificCause instanceof JsonParseException)) {
			ErrorDetail errorDetail = new ErrorDetail("102", "", ex.getMessage());
			errors.getErrorDetails().add(errorDetail);
		}
		return new ResponseEntity<Object>(errors, headers, status);
	}
}
