package com.diy4rent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diy4rent.backend.model.Reserva;
import com.diy4rent.backend.model.Usuario;
import com.diy4rent.backend.repository.ReservaRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/")
public class ReservaController {
	
	@Autowired
	private ReservaRepository reservaRepository;
	
	@GetMapping("reservas")
	public List<Reserva> getReservas(){
		return this.reservaRepository.findAll();
	}
	
	@PostMapping("reservas")
	public ResponseEntity<?> guardarReserva(@RequestBody Reserva reserva){
		Reserva reservaGuardada = reservaRepository.save(reserva);
		return ResponseEntity.ok(reservaGuardada);
	}
	
	@DeleteMapping("reservas/{id}")
	public ResponseEntity<Reserva> delete(@PathVariable long id){
		reservaRepository.deleteById(id);
		return ResponseEntity.ok().body(null);
	}
	
	@PutMapping("reservas/{id}")
	public ResponseEntity<Reserva> update(@RequestBody Reserva newReserva, @PathVariable long id){
		return reservaRepository.findById(id).map(reserva -> {
			reserva.setIsValorado(newReserva.getIsValorado());
			reservaRepository.save(reserva);
			return ResponseEntity.ok().body(reserva);
		}).orElse(new ResponseEntity<Reserva>(HttpStatus.NOT_FOUND));
	}
}
