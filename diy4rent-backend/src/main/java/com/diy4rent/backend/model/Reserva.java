package com.diy4rent.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "reservas")
public class Reserva {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private long herramientaId;
	private long usuarioReservado;
	private int diaIni;
	private int mesIni;
	private int anoIni;
	private int diaFin;
	private int mesFin;
	private int anoFin;
	private boolean isValorado;
	
	public Reserva() {
		super();
	}
	
	public Reserva(boolean isValorado) {
		super();
		this.isValorado = isValorado;
	}

	public Reserva(long herramientaId, long usuarioReservado, int diaIni, int mesIni, int anoIni, int diaFin,
			int mesFin, int anoFin) {
		super();
		this.herramientaId = herramientaId;
		this.usuarioReservado = usuarioReservado;
		this.diaIni = diaIni;
		this.mesIni = mesIni;
		this.anoIni = anoIni;
		this.diaFin = diaFin;
		this.mesFin = mesFin;
		this.anoFin = anoFin;
		this.isValorado = false;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public long getHerramientaId() {
		return herramientaId;
	}

	public void setHerramientaId(long herramientaId) {
		this.herramientaId = herramientaId;
	}

	public long getUsuarioReservado() {
		return usuarioReservado;
	}
	public void setUsuarioReservado(long usuarioReservado) {
		this.usuarioReservado = usuarioReservado;
	}

	public int getDiaIni() {
		return diaIni;
	}

	public void setDiaIni(int diaIni) {
		this.diaIni = diaIni;
	}

	public int getMesIni() {
		return mesIni;
	}

	public void setMesIni(int mesIni) {
		this.mesIni = mesIni;
	}

	public int getAnoIni() {
		return anoIni;
	}

	public void setAnoIni(int anoInt) {
		this.anoIni = anoInt;
	}

	public int getDiaFin() {
		return diaFin;
	}

	public void setDiaFin(int diaFin) {
		this.diaFin = diaFin;
	}

	public int getMesFin() {
		return mesFin;
	}

	public void setMesFin(int mesFin) {
		this.mesFin = mesFin;
	}

	public int getAnoFin() {
		return anoFin;
	}

	public void setAnoFin(int anoFin) {
		this.anoFin = anoFin;
	}

	public boolean getIsValorado() {
		return isValorado;
	}

	public void setIsValorado(boolean isValorado) {
		this.isValorado = isValorado;
	}
	
	
	
}
