package com.diy4rent.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diy4rent.backend.model.Puntuacion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diy4rent.backend.model.Puntuacion;

@Repository
public interface PuntuacionRepository extends JpaRepository<Puntuacion, Long>{
    
}
