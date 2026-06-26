package com.infotact.mrp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MRPController {

    @GetMapping("/mrp/calculate")
    public String calculate() {
        return "MRP Calculation Completed";
    }
}