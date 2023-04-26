package com.diy4rent.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.diy4rent.backend.model.Herramienta;
import com.diy4rent.backend.model.Usuario;
import com.diy4rent.backend.repository.HerramientaRepository;
import com.diy4rent.backend.repository.UsuarioRepository;

@SpringBootApplication
public class Diy4rentBackendApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(Diy4rentBackendApplication.class, args);
	}
	
	@Autowired
	private HerramientaRepository herramientaRepository;
	
	@Autowired
	private UsuarioRepository  usuarioRepository;

	@Override
	public void run(String... args) throws Exception {
		this.herramientaRepository.save(new Herramienta("Pelacables con ajuste automático Weidmüller", "Pelacables", 2, 1, 2.50, "Con el alicate pelacables automático STRIPAX - 9005000000 de Weidmüller se pueden pelar fácilmente conductores de hilo fino o múltiple con sección desde 0,08 hasta 10 mm² hasta un largo máximo de 25 mm.", "https://media.automation24.com/Artikelbilder/Shop800px/102862_1.jpg"));
		this.herramientaRepository.save(new Herramienta("Taladro Bosch Home and Garden Universal Impact 800", "Taladro", 1, 1, 2.25, "El modelo Universal Impact 800 con la función Kickback Control de Bosch es versátil, potente y fácil de controlar", "https://m.media-amazon.com/images/I/61NVZe+YSyL._AC_SX679_.jpg"));
		this.herramientaRepository.save(new Herramienta("Sierra de cinta 350 W", "Sierra", 2, 2, 3.15, "Para madera dura y blanda, laminado o tablero de fibras. Sierra de cinta 350 W con mesa inclinable sin escalonamientos con sistema de sujeción rápida.", "https://www.lidl.es/media/product/0/0/5/5/1/2/1/sierra-de-cinta-zoom--1.jpg"));
		this.herramientaRepository.save(new Herramienta("Herramienta de crimpado", "Pelacables", 3, 3, 3.50, "Los casquillos disponibles en la gama de códigos de color francés en tamaños de 0,5 a 2,5 mm². Cada paquete de casquillos contiene 10 tiras de 50, con acción de alimentación automática que permite cortar, pelar y terminar cables.", "https://cdn.hoffmann-group.com/derivatives/32155/jpg_600/jpg_600_b729493.jpg"));
		this.herramientaRepository.save(new Herramienta("Taladro con cable STANLEY FATMAX", "Taladro", 2, 3, 4.50, "Taladro con cable STANLEY FATMAX FMEH850K-QS de 850 W + maletín. Dos velocidades. 3.100 r.p.m. Con función percutor.", "https://media.adeo.com/marketplace/LMES/16576154/3433269.jpeg?width=750&height=750&format=jpg&quality=80&fit=bounds"));
		this.herramientaRepository.save(new Herramienta("Pistola de silicona RS PRO 200ml", "Silicona", 1, 2, 2.10, "Estas pistolas dispensadoras de pegamento ligeras son ideales para aplicar cordones, y para trabajos de unión y reparación en entornos profesionales y de bricolaje. También son muy duraderas y tienen doble placa de sujeción y gatillo de acero.", "https://www.hafele.es/INTERSHOP/static/WFS/Haefele-HES-Site/-/Haefele/es_ES/pim/images/default/ppic-00713351.jpg"));
		this.herramientaRepository.save(new Herramienta("Engalletadora makita pj7000 701w", "Engalletadora", 1, 2, 5.70, "La engalletadora PJ7000 es una herramienta eléctrica diseñada exclusivamente para realizar un ensamblaje con galleta, un método moderno para ensamblar piezas de madera. Ajustes de precisión muy sencillos y rápidos.", "https://www.modregohogar.com/293087-thickbox_default/engalletadora-makita-pj7000-701w.jpg"));
		
		
		this.usuarioRepository.save(new Usuario("https://doomwiki.org/w/images/8/88/HugoMartin.png","Hugo", "@gmail.com", 23564, "@paypal.com", "c/Prado 27, Polan", "1234"));
		this.usuarioRepository.save(new Usuario("https://sr.uab.cat/wp-content/uploads/2021/04/vega-maria-jose.jpg","Marisol", "@gmail.com", 23564, "@paypal.com", "c/de Nápoles 8, Toledo", "1234"));
		this.usuarioRepository.save(new Usuario("https://thumbs.dreamstime.com/z/icono-del-usuario-avatar-young-lady-stock-%C3%ADcono-de-como-archivo-eps-233299415.jpg","María", "@gmail.com", 23564, "@paypal.com", "Av. Complutense, 30, 28040 Madrid", "1234"));
		this.usuarioRepository.save(new Usuario("https://s.hs-data.com/bilder/spieler/gross/242894.jpg","Josema", "@gmail.com", 23564, "@paypal.com", "c/de Jaén, Barcelona", "1234"));
		this.usuarioRepository.save(new Usuario("https://upload.wikimedia.org/wikipedia/commons/2/2b/Alonso_2016.jpg","Fernando", "@gmail.com", 23564, "@paypal.com", "Av Reina Victoria 41, Madrid", "1234"));
		
	}

}
