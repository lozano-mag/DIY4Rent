package com.diy4rent.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diy4rent.backend.model.Herramienta;

@Repository
public interface HerramientaRepository extends JpaRepository<Herramienta, Long>{

}
