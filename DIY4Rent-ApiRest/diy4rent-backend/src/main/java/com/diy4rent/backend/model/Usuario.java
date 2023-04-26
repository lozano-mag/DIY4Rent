package com.diy4rent.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String fotoUser;
	private String nombre;
	private String correo;
	private int telefono;
	private String correoPaypal;
	private String direccion;
	private String password;
	
	public Usuario(){
		
	}
	
	public Usuario(String nombre, String correo, int telefono, String correoPaypal, String direccion, String password) {
		super();
		this.nombre = nombre;
		this.correo = correo;
		this.telefono = telefono;
		this.correoPaypal = correoPaypal;
		this.direccion = direccion;
		this.password = password;
	}
	
	public Usuario(String fotoUser, String nombre, String correo, int telefono, String correoPaypal, String direccion, String password) {
		super();
		this.fotoUser = fotoUser;
		this.nombre = nombre;
		this.correo = correo;
		this.telefono = telefono;
		this.correoPaypal = correoPaypal;
		this.direccion = direccion;
		this.password = password;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFotoUser() {
		return fotoUser;
	}

	public void setFotoUser(String fotoUser) {
		this.fotoUser = fotoUser;
	}

	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCorreo() {
		return correo;
	}
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public int getTelefono() {
		return telefono;
	}
	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}
	public String getCorreoPaypal() {
		return correoPaypal;
	}
	public void setCorreoPaypal(String correoPaypal) {
		this.correoPaypal = correoPaypal;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	

}
