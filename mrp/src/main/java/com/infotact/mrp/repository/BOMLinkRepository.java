package com.infotact.mrp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infotact.mrp.entity.BOMLink;

public interface BOMLinkRepository extends JpaRepository<BOMLink, Long> {
}