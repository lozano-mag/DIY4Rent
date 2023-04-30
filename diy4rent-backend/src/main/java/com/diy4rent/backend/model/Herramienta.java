package com.diy4rent.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "herramientas")
public class Herramienta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String nombre;
	private String categoria;
	private int estadoDesgaste;
	private long userId;
	private long alqAct;
	private Double precio;
	private String descripcion;
	private String foto;
	
	public Herramienta() {
		
	}
	
	public Herramienta(String nombre, String categoria, int estadoDesgaste, long userId,Double precio,
			String descripcion, String foto) {
		super();
		this.nombre = nombre;
		this.categoria = categoria;
		this.estadoDesgaste = estadoDesgaste;
		this.userId = userId;
		this.precio = precio;
		this.descripcion = descripcion;
		this.foto = foto;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	
	public int getEstadoDesgaste() {
		return estadoDesgaste;
	}
	public void setEstadoDesgaste(int estadoDesgaste) {
		this.estadoDesgaste = estadoDesgaste;
	}
	
	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getAlqAct() {
		return alqAct;
	}
	public void setAlqAct(long alqAct) {
		this.alqAct = alqAct;
	}
	public Double getPrecio() {
		return precio;
	}
	public void setPrecio(Double precio) {
		this.precio = precio;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getFoto() {
		return foto;
	}
	public void setFoto(String foto) {
		this.foto = foto;
	}
	
	

}
