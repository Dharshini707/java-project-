package com.infotact.mrp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infotact.mrp.entity.BOMLink;
import com.infotact.mrp.repository.BOMLinkRepository;

@Service
public class MRPService {

    @Autowired
    private BOMLinkRepository bomLinkRepository;

    public void traverseBOM(Long parentItemId) {

        List<BOMLink> links =
                bomLinkRepository.findByParentItemId(parentItemId);

        for (BOMLink link : links) {

            System.out.println(
                    "Child Item ID: "
                    + link.getChildItemId()
                    + " Quantity: "
                    + link.getQuantity()
            );

            traverseBOM(link.getChildItemId());
        }
    }
    public void explodeBOM(Long parentItemId, int requiredQty) {

        List<BOMLink> links =
                bomLinkRepository.findByParentItemId(parentItemId);

        for (BOMLink link : links) {

            int totalQty = link.getQuantity() * requiredQty;

            System.out.println(
                    "Child Item ID: "
                    + link.getChildItemId()
                    + " Required Quantity: "
                    + totalQty
            );

            explodeBOM(link.getChildItemId(), totalQty);
        }
    }

}