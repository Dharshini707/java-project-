package com.infotact.mrp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infotact.mrp.entity.BOMLink;
import com.infotact.mrp.repository.BOMLinkRepository;

@Service
public class BOMLinkService {

    @Autowired
    private BOMLinkRepository bomLinkRepository;

    public BOMLink saveBOMLink(BOMLink bomLink) {
        return bomLinkRepository.save(bomLink);
    }

    public List<BOMLink> getAllBOMLinks() {
        return bomLinkRepository.findAll();
    }
}