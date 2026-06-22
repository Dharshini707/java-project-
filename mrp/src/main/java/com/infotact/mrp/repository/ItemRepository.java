package com.infotact.mrp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infotact.mrp.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}