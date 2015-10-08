package com.lishman.world.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.lishman.world.domain.Country;
import com.lishman.world.service.WorldService;

@Controller
@RequestMapping("/countries")
@SessionAttributes(types=Country.class)
public class CountryController {
    
    @Autowired private WorldService worldService;
    
    @InitBinder
    public void initBinder(WebDataBinder dataBinder) {
        dataBinder.setAllowedFields("name", 
                                    "area",
                                    "population"); 
        dataBinder.registerCustomEditor(String.class, new StringTrimmerEditor(false));        
    }

    @RequestMapping(method=RequestMethod.GET)
    public ModelAndView getCountries() {
        List<Country> countries = worldService.findAllCountries();
        return new ModelAndView("country-list", "countries", countries);
    }
    
    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public String getCountry(@PathVariable("id") int countryId,
                             @RequestParam(value="for-update", defaultValue="false") boolean forUpdate,
                             Model model) { 

        Country country = worldService.findCountryById(countryId);
        model.addAttribute(country);
        return forUpdate ? "country-edit" : "country-details";
    }
    
    @RequestMapping(value="/blank", method=RequestMethod.GET)
    public String getBlankCountry(Model model) {
        model.addAttribute(new Country());
        return "country-edit";
    }
    
    @RequestMapping(params="create", method=RequestMethod.POST)
    public String createCountry(@Valid Country country, 
                                BindingResult result,
                                SessionStatus status,
                                RedirectAttributes redirectAttributes) {

        if (result.hasErrors()) {
            return "country-edit";
        }
        
        Country savedCountry = worldService.saveCountry(country);
        status.setComplete();
        
        redirectAttributes.addFlashAttribute("msg", String.format("Country '%s' added successfully", country.getName()));
        
        return "redirect:countries/" + savedCountry.getId();
    }
    
    @RequestMapping(params="update", method=RequestMethod.POST)
    public String updateCountry(@Valid Country country, 
                                BindingResult result,
                                SessionStatus status,
                                RedirectAttributes redirectAttributes) {

        if (result.hasErrors()) {
            return "country-edit";
        }
        
        Country savedCountry = worldService.saveCountry(country);
        status.setComplete();
        
        redirectAttributes.addFlashAttribute("msg", String.format("Country '%s' updated successfully", country.getName()));
        
        return "redirect:countries/" + savedCountry.getId();
    }
    
    @RequestMapping(params="delete", method=RequestMethod.POST)
    public String deleteCountry(@ModelAttribute("country") Country country, 
                                SessionStatus status,
                                RedirectAttributes redirectAttributes) {
    
        worldService.deleteCountry(country);
        status.setComplete();
        
        redirectAttributes.addFlashAttribute("msg", String.format("Country '%s' removed successfully", country.getName()));
        
        return "redirect:countries";
    }
        
}