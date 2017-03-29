

var Sokoban = {
//variables

container: {},
listaMovimientos:  [],
mapa: [],

//metodos
dibujarMapa:   
				function (mapaADibujar){
					lineas = mapaADibujar.split("\n");
					for(i = 0 ; i < lineas.length ; i++){
					    elementofila = this.createElement("fila" + i);
						elementofila.css('clear', 'left')
						linea = lineas[i];
						for(j = 0; j < linea.length; j++){
							caracter = linea[j];
							this.agregarCaracterAMapa(i,j,caracter);
							elemento = this.mapa[i][j];
							elemento.addClass('casilla');
							elementofila.append(elemento);
						}
					this.container.append(elementofila);
					}

				},
createElement: 
				function (identificador, value) {
					return $('<div>', { id: identificador, text: value});
				},
agregarCaracterAMapa: 
				function (fila,columna, caracter){
					  if(typeof( this.mapa[fila])  ===  "undefined"){
						this.mapa[fila] = [];
					  }
					  this.mapa[fila][columna] = this.createElement("field_" + fila + "_" + columna, "");
					  if(caracter == '@'){
						this.mapa[fila][columna].addClass("casillaJugador");
					  }else if(caracter == ' '){
						this.mapa[fila][columna].addClass("casillaVacia");
					  }else if(caracter == '.'){
						this.mapa[fila][columna].addClass("casillaDestino");
					  }else if(caracter == '*'){
						this.mapa[fila][columna].addClass("casillaCaja");
					  }else if(caracter == 'X'){
						this.mapa[fila][columna].addClass("casillaPared");
					  }
				},
realizarMovimiento: function (movimiento){
						if(this.esPosible(movimiento)){
							coordenadasjug =this.buscaCoordenadasJugador();
							cordMov = this.buscaCoordenadasMovimiento(coordenadasjug,movimiento);
							casillaMov = this.buscaCasillaMovimiento(movimiento);
							if(casillaMov.hasClass("casillaCaja") || casilla.hasClass("casillaCajaEnDestino")){
								coordenadasSiguiente = this.buscaCoordenadasMovimiento(cordMov,movimiento);
								this.cambiarTipoCasilla(this.mapa[coordenadasSiguiente.fila][coordenadasSiguiente.columna]
									,"casillaCaja")
							}
							this.cambiarTipoCasilla(casillaMov
									,"casillaJugador")
							this.cambiarTipoCasilla(this.mapa[coordenadasjug.fila][coordenadasjug.columna]
									,"casillaVacia");
							return true;
						}
						return false;
					},
esPosible: 			function (movimiento){
							casilla = this.buscaCasillaMovimiento(movimiento);
								if(casilla == {}){
									return false;
								}
								if(casilla.hasClass("casillaVacia")  || casilla.hasClass("casillaDestino")){
									return true;
								}
								if(casilla.hasClass("casillaCaja") || casilla.hasClass("casillaCajaEnDestino")){
									coordenadasIniciales =this.buscaCoordenadasJugador();
									coordenadasmov = this.buscaCoordenadasMovimiento(coordenadasIniciales,movimiento);
									coordenadasSiguiente = this.buscaCoordenadasMovimiento(coordenadasmov,movimiento);
									casillaSiguiente = this.mapa[coordenadasSiguiente.fila][coordenadasSiguiente.columna];
									if(casillaSiguiente.hasClass("casillaVacia") || casillaSiguiente.hasClass("casillaDestino")){
										return true;
									}
								}
								return false;
					},
buscaCoordenadasJugador:
					function (){
							for(i = 0; i < this.mapa.length ; i++){
								fila = this.mapa[i];
								for(j = 0; j < fila.length ; j++){
									if(this.mapa[i][j].hasClass("casillaJugador") || 
										this.mapa[i][j].hasClass("casillaJugadorEnDestino")){
										return {fila: i, columna: j};
									}
								}
							}
							
					},
buscaCasillaMovimiento:
					function (movimiento){
							coordenadasIniciales =this.buscaCoordenadasJugador();
							coordenadas = this.buscaCoordenadasMovimiento(coordenadasIniciales, movimiento);
							fila = this.mapa[coordenadas.fila];
							if(typeof(fila)  !=  "undefined" && typeof(fila[coordenadas.columna]) != "undefined"){
								return this.mapa[coordenadas.fila][coordenadas.columna];
							}else{
								return {};
							}
							
					},
buscaCoordenadasMovimiento:
					function (coordenadasIniciales, movimiento){
							    coordenadas = coordenadasIniciales;
								if(movimiento == "abajo"){
									return {fila: coordenadas.fila +1, columna: coordenadas.columna};
								}
								if(movimiento == "arriba"){
									return {fila: coordenadas.fila -1, columna: coordenadas.columna};
								}							
								if(movimiento == "izq"){
									return {fila: coordenadas.fila, columna: coordenadas.columna -1};
								}							
								if(movimiento == "der"){
									return {fila: coordenadas.fila, columna: coordenadas.columna + 1};
								}
						
					},
cambiarTipoCasilla:
					function (casilla, nuvoTipo){
						if(casilla.hasClass("casillaDestino") ){
							if(nuvoTipo == "casillaJugador"){
								casilla.removeClass("casillaDestino");
								casilla.addClass("casillaJugadorEnDestino");
							}
							if(nuvoTipo == "casillaCaja"){
								casilla.removeClass("casillaDestino");
								casilla.addClass("casillaCajaEnDestino");
							}
						} else
						if(casilla.hasClass("casillaJugadorEnDestino") ){
							if(nuvoTipo == "casillaVacia"){
								casilla.removeClass("casillaJugadorEnDestino");
								casilla.addClass("casillaDestino");
							}
						} else
						if(casilla.hasClass("casillaCajaEnDestino") ){
							if(nuvoTipo == "casillaVacia"){
								casilla.removeClass("casillaCajaEnDestino");
								casilla.addClass("casillaDestino");
							}
							if(nuvoTipo == "casillaJugador"){
								casilla.removeClass("casillaCajaEnDestino");
								casilla.addClass("casillaJugadorEnDestino");
							}
						}else {
							casilla.removeClass("casillaVacia");
							casilla.removeClass("casillaJugador");
							casilla.removeClass("casillaCaja");
							casilla.removeClass("casillaCajaEnDestino");
							casilla.removeClass("casillaJugadorEnDestino");
							casilla.removeClass("casillaDestino");
							casilla.addClass(nuvoTipo);
						}

					}					
}

$.fn.sokoban = function(){

	Sokoban.container = this;
	Sokoban.dibujarMapa("" +
"         XXXX     \n" +
" XXXXXXXXX  XX    \n" +
"XX  *      * XXXXX\n" +
"X   XX XX   XX...X\n" +
"X X** * **X*XX...X\n" +
"X X    @  X   ...X\n" +
"X  *X XXX**   ...X\n" +
"X *  **  * XX....X\n" +
"XXX*       XXXXXXX\n" +
"  X  XXXXXXX      \n" +
"  XXXX            \n" +
						"");
						
						
						
						
};



