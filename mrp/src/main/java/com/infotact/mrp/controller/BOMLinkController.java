package com.infotact.mrp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infotact.mrp.entity.BOMLink;
import com.infotact.mrp.service.BOMLinkService;

@RestController
@RequestMapping("/bomlinks")
public class BOMLinkController {

    @Autowired
    private BOMLinkService bomLinkService;

    @PostMapping
    public BOMLink saveBOMLink(@RequestBody BOMLink bomLink) {
        return bomLinkService.saveBOMLink(bomLink);
    }

    @GetMapping
    public List<BOMLink> getAllBOMLinks() {
        return bomLinkService.getAllBOMLinks();
    }
}