package com.diy4rent.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diy4rent.backend.model.Herramienta;
import com.diy4rent.backend.model.Usuario;
import com.diy4rent.backend.repository.UsuarioRepository;

@CrossOrigin(origins ="http://localhost:3000/")
@RestController
@RequestMapping("api/")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@GetMapping("usuarios")
	public List<Usuario> getUsuarios()
	{
		return this.usuarioRepository.findAll();
	}
	
	@PostMapping("usuarios")
	public ResponseEntity<?> guardarUsuario(@RequestBody Usuario usuario) {
		Usuario usuarioGuardado = usuarioRepository.save(usuario);
		return ResponseEntity.ok(usuarioGuardado);
	}
	
	@PutMapping("usuarios/{id}")
	public ResponseEntity<Usuario> update(@RequestBody Usuario newUsuario, @PathVariable long id){
		return usuarioRepository.findById(id).map(usuario -> {
			usuario.setCorreoPaypal(newUsuario.getCorreoPaypal());
			usuario.setCorreo(newUsuario.getCorreo());
			usuario.setDireccion(newUsuario.getDireccion());
			usuario.setNombre(newUsuario.getNombre());
			usuario.setPassword(newUsuario.getPassword());
			usuario.setTelefono(newUsuario.getTelefono());
			usuario.setFotoUser(newUsuario.getFotoUser());
			usuario.setLat(newUsuario.getLat());
			usuario.setLon(newUsuario.getLon());
			usuarioRepository.save(usuario);
			return ResponseEntity.ok().body(usuario);
		}).orElse(new ResponseEntity<Usuario>(HttpStatus.NOT_FOUND));
	}
	
}
