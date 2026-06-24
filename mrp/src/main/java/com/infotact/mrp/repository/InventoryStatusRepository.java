package com.infotact.mrp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infotact.mrp.entity.InventoryStatus;

public interface InventoryStatusRepository
        extends JpaRepository<InventoryStatus, Long> {
}