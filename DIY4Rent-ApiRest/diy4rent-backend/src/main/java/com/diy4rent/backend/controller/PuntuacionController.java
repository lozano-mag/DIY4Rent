package com.diy4rent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diy4rent.backend.repository.PuntuacionRepository;


import com.diy4rent.backend.model.Puntuacion;

@CrossOrigin(origins ="http://localhost:3000/")
@RestController
@RequestMapping("api/")
public class PuntuacionController {
    @Autowired
	private PuntuacionRepository puntuacionRepository;
	
	@GetMapping("puntuaciones")
	public List<Puntuacion> getPuntuaciones(){
		return this.puntuacionRepository.findAll();
	}
	
	@PutMapping("puntuaciones/{id}")
	public ResponseEntity<Puntuacion> update(@RequestBody Puntuacion newPuntuacion, @PathVariable long id){
		return puntuacionRepository.findById(id).map(puntuacion -> {
			puntuacion.setUserId(newPuntuacion.getUserId());
            puntuacion.setPuntuacion(newPuntuacion.getPuntuacion());
			puntuacionRepository.save(puntuacion);
			return ResponseEntity.ok().body(puntuacion);
		}).orElse(new ResponseEntity<Puntuacion>(HttpStatus.NOT_FOUND));
	}
	
}
