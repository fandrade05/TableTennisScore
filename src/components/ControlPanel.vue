<template>
	<table class="tablero">
		<tr>
			<th id="hJug" colspan="3" class="ui-corner-all ui-widget ui-widget-content">CARGAR JUGADORES</th>
			<th id="hTime" colspan="2" class="ui-corner-all ui-widget ui-widget-content">
				<span id="timer" :style="clock">{{ watch.ptime }}</span>
			</th>
		</tr>
		<tr id="fj1">
			<td id="colPU1" class="ui-spinner ui-corner-all ui-widget ui-widget-content">
				<a id="uj1" tabindex="-1" aria-hidden="true" class="ui-button ui-widget ui-spinner-button ui-spinner-up ui-corner-tr" role="button" @click="sumMarcador1">
					<span class="ui-button-icon fas fa-chevron-circle-up arrow"></span>
				</a>
				<a id="dj1" tabindex="-1" aria-hidden="true" class="ui-button ui-widget ui-spinner-button ui-spinner-down ui-corner-br" role="button" @click="resMarcador1">
					<span class="ui-button-icon fas fa-chevron-circle-down arrow"></span>
				</a>
			</td>
			<td class="ui-corner-all ui-widget ui-widget-content" style="border-radius: 0;">
				<input id="rJug1" type="text" v-model="jugador1" @keyup="soloLetras" :disabled="cargaTablero == true" for="btn1" class="textJug" autocomplete="off" placeholder="Nombre del 1° jugador" maxlength="30" size="50" required>
			</td>
			<td class="ui-corner-all ui-widget ui-widget-content" style="border-radius: 0;">
				<select id="sNac1" v-model="nac1" :disabled="cargaTablero == true" class="selNac">
					<option value="0" disabled selected>Nacionalidad</option>
					<option v-for="option in options" v-bind:key="sanearString(option)">
						{{option}}
					</option>
				</select>
			</td>
			<td id="timeOut1" class="ui-corner-all ui-widget ui-widget-content">
				<span id="txtTO1" v-if="stop1 != null">{{ cron1 }}</span>
				<button type="button" id="btnTO1" class="ui-widget-content" v-show="stop1 == null" :disabled="!btn1" @click="TimeOut1">
					TIME <br/> OUT
				</button>
			</td>
		</tr>
		<tr id="fj2">
			<td id="colPU2" class="ui-spinner ui-corner-all ui-widget ui-widget-content">
				<a id="uj2" tabindex="-1" aria-hidden="true" class="ui-button ui-widget ui-spinner-button ui-spinner-up ui-corner-tr" role="button" @click="sumMarcador2">
					<span class="ui-button-icon fas fa-chevron-circle-up arrow"></span>
				</a>
				<a id="dj2" tabindex="-1" aria-hidden="true" class="ui-button ui-widget ui-spinner-button ui-spinner-down ui-corner-br" role="button" @click="resMarcador2">
					<span class="ui-button-icon fas fa-chevron-circle-down arrow"></span>
				</a>
			</td>
			<td class="ui-corner-all ui-widget ui-widget-content">
				<input id="rJug2" type="text" v-model="jugador2" @keyup="soloLetras" :disabled="cargaTablero == true" class="textJug" autocomplete="off" placeholder="Nombre del 2° jugador" maxlength="30" size="50" required>
			</td>
			<td class="ui-corner-all ui-widget ui-widget-content">
				<select id="snac2" v-model="nac2" :disabled="cargaTablero == true" class="selNac">
					<option value="0" disabled selected>Nacionalidad</option>
					<option v-for="option in options" v-bind:key="sanearString(option)">
						{{option}}
					</option>
				</select>
			</td>
			<td id="timeOut2" class="ui-corner-all ui-widget ui-widget-content">
				<span id="txtTO2" v-show="stop2 != null">{{ cron2 }}</span>
					<button type="button" id="btnTO2" class="ui-widget-content" v-show="stop2 == null" :disabled="!btn2" @click="TimeOut2">
						TIME <br/> OUT
					</button>
			</td>
		</tr>
		<tr id="fj3">
			<td colspan="2" class="ui-corner-all ui-widget ui-widget-content">
				<span id="lset">SETS A JUGAR:</span>
					<select id="cantSet" v-model="cSets" class="selNac">
						<option :value="1">&nbsp;1&nbsp;</option>
						<option :value="3">&nbsp;3&nbsp;</option>
						<option :value="5">&nbsp;5&nbsp;</option>
						<option :value="7">&nbsp;7&nbsp;</option>
					</select>
			</td>
			<td colspan="2" class="ui-corner-all ui-widget ui-widget-content">
				<span id="lserve">AL SERVICIO:</span>
				<select id="serve" v-model="sorteo" :disabled="!isNacValid() || !isPlayerValid() || !cargaTablero" @change="tiempoDeJuego" class="selNac">
					<option selected :value="0">&nbsp;SORTEO&nbsp;</option>
					<option id="oj1" :value="1">{{ jugador1.trim() }}</option>
					<option id="oj2" :value="2">{{ jugador2.trim() }}</option>
				</select>
			</td>
		</tr>
		<tr>
			<td colspan="4" class="ui-corner-all ui-widget ui-widget-content">
				<span id="txtTO3" v-show="stop3 != null">{{ cron3 }}</span>
				<button type="button" id="btnTO3" class="ui-widget-content" v-show="stop3 == null" :disabled="!btn3" @click="BallTime">
					Tiempo de peloteo
				</button>
			</td>
		</tr>
		<tr>
			<td colspan="2" class="ui-corner-all ui-widget ui-widget-content cellsbtncards">
				<button type="submit" class="ui-widget-content btncards" @click="$emit(tarjetas.jug1 ++)">
					Tarjeta Jugador 1
				</button>
			</td>
			<td colspan="2" class="ui-corner-all ui-widget ui-widget-content cellsbtncards">
				<button type="button" class="ui-widget-content btncards" @click="$emit(tarjetas.jug2 ++)">
					Tarjeta Jugador 2
				</button>
			</td>
		</tr>
		<tr>
			<td id="ingJ1" colspan="2" class="ui-corner-all ui-widget ui-widget-content">
				<button type="submit" id="btn1" :disabled="!sortearPartido()" @click="$emit(comenzarPartido, jugador1, jugador2)">
					Ingresar
				</button>
			</td>
			<td id="lboton" colspan="2" class="ui-corner-all ui-widget ui-widget-content">
				<button type="button" id="cbutton" @click="limpiaTablero">
					Limpiar
				</button>
			</td>
		</tr>
	</table>
</template>

<script>
import ScoreBoard from './ScoreBoard';

export default {
	name: 'ControlPanel',
	props: {
		count1: 0,
		count2: 0,
		sets: 3,
		player1: '',
		player2: '',
		country1: '0',
		country2: '0',
		sort: 0,
		winSort: 0,
		targets: {
			jug1: 0,
			jug2: 0
		},
	},
    data () {
		return {
			//Variables Match time
			watch: {
				exe: null,
				show: false,
				thour: 0,
				tmin: 0,
				tsec: 0,
				phour: '00',
				pmin: '00',
				psec: '00',
				ptime: '00:00:00'
			},
			//Variables Timeout y tiempo de calentamiento
			btn1: true,
			btn2: true,
			btn3: true,
			used1: false,
			used2: false,
			stop1: null,
			stop2: null,
			stop3: null,
			min: 1,
			sec: 0,
			min2: 2,
			sec2: 0,
			cron1: '01:00',
			cron2: '01:00',
			cron3: '02:00',
			//Variables Jugadores, puntos, sets y saque
			cargaTablero: false,
			cont1: 0,
			cont2: 0,
			cSets: 3,
			jugador1: '',
			jugador2: '',
			nac1: '0',
			nac2: '0',
			sorteo: 0,
			ganaSorteo: 0,
			tarjetas: {
				jug1: 0,
				jug2: 0
			},
			defaultStyleMarks: {
				color: 'transparent'
			},
			styleClock: {
				color: 'black'
			},
			styleServe: {
				color: 'grey'
			},
			styleTime: {
				color: 'white'
			},
			styleYellowCard: {
				color: 'yellow'
			},
			styleRedCard: {
				color: 'red'
			},
			options: [
				'Afganistán','Albania','Alemania','Andorra','Antigua y Barbuda','Arabia Saudita','Argelia',
				'Argentina','Aruba','Armenia','Australia','Austria','Bahamas','Bangladés','Barbados','Bélgica','Belice',
				'Bielorrusia','Bolivia','Bosnia y Herzegovina','Brasil','Bulgaria','Canadá','Chile','China','Chipre',
				'Colombia','Corea del Norte','Corea del Sur','Costa de Marfil','Costa Rica','Croacia','Cuba','Dinamarca',
				'Dominica','Ecuador','Egipto','El Salvador','Emiratos Árabes Unidos','Eslovaquia','Eslovenia','España',
				'Estados Unidos','Estonia','Filipinas','Finlandia','Francia','Georgia','Ghana','Grecia','Granada',
				'Guatemala','Guayana Francesa','Guyana','Haití','Honduras','Hungría','India','Indonesia','Islandia',
				'Irlanda','Israel','Italia','Jamaica','Japón','Kazajistán','Letonia','Liechtenstein','Lituania',
				'Luxemburgo','Macedonia','Malasia','Malta','México','Micronesia','Moldavia','Mónaco','Mongolia',
				'Montenegro','Nicaragua','Nigeria','Noruega','Nueva Zelanda','Países Bajos','Panamá','Paraguay','Perú',
				'Polonia','Portugal','Puerto Rico','Qatar','Reino Unido','República Checa','República Dominicana',
				'Rumania','Rusia','Samoa','San Marino','Santa Lucía','Serbia','Sierra Leona','Singapur','Sri Lanka',
				'Sudáfrica','Suecia','Suiza','Surinam','Taiwán','Tailandia','Tayikistán','Trinidad y Tobago','Tonga',
				'Turquía','Ucrania','Uruguay','Uzbekistán','Vaticano','Venezuela','Vietnam','Yemen'
			]
		}
    },
    computed: {
		clock: function () {
			if (this.watch.show == true) {
				return this.styleClock;
			}
			else {
				return this.defaultStyleMarks;
			}
		}
    },
    methods: {
		sumMarcador1: function () {
			if (this.cargaTablero == true) {
				if (this.cont1 >= 0 && this.cont1 <= 99) {
					this.cont1 ++;
				}
				dash.marcarSaque();
			}
		},
		sumMarcador2: function () {
			if (this.cargaTablero == true) {
				if (this.cont2 >= 0 && this.cont2 <= 99) {
					this.cont2 ++;
				}
				dash.marcarSaque();
			}
		},
		resMarcador1: function () {
			if (this.cargaTablero == true) {
				if (this.cont1 != 0) {
					this.cont1 --;
				}
			}
		},
		resMarcador2: function () {
			if (this.cargaTablero == true) {
				if (this.cont2 != 0) {
					this.cont2 --;
				}
			}
		},
		isPlayerValid: function () {
			return this.jugador1 != "" && this.jugador2 != "";
		},
		isNacValid: function () {
			return this.nac1 != 0 && this.nac2 != 0;
		},
		sortearPartido: function () {
			return this.isPlayerValid() == true && this.isNacValid() == true;
		},
		comenzarPartido: function () {
			this.cargaTablero = true;
			this.jugador1 = this.jugador1.trim();
			this.jugador2 = this.jugador2.trim().toUpperCase();
		},
		limpiaTablero: function () {
			//Valores por defecto del tablero
			this.cargaTablero = false;
			this.cont1 = 0;
			this.cont2 = 0;
			this.cSets = 3;
			this.jugador1 = '';
			this.jugador2 = '';
			this.nac1 = '0';
			this.nac2 = '0';
			this.sorteo = 0;
			this.tarjetas.jug1 = 0;
			this.tarjetas.jug2 = 0;
			this.ganaSorteo = 0;
			//Vuelve a cero el reloj del juego
			clearInterval (this.watch.exe);
			this.watch.exe = null;
			this.watch.show = false;
			this.watch.phour = '00';
			this.watch.pmin = '00';
			this.watch.psec = '00';
			this.watch.ptime = '00:00:00';
			this.watch.tsec = 0;
			//Marca de timeout pedido
			this.btn1 = true;
			this.btn2 = true;
			this.used1 = false;
			this.used2 = false;
			//Estilos por defecto
			dash.styleSet.Act1 = false;
			dash.styleSet.Act2 = false;
			dash.styleSet.Act3 = false;
			dash.styleSet.Act4 = false;
			dash.styleSet.Act5 = false;
			dash.styleSet.Act6 = false;
			dash.styleSet.Act7 = false;
			dash.styleSet.Act8 = false;
			dash.styleSet.Act9 = false;
			dash.styleSet.Act10 = false;
			dash.styleSet.Act11 = false;
			dash.styleSet.Act12 = false;
			dash.styleSet.Act13 = false;
			dash.styleSet.Act14 = false;
			dash.styleSet.ActGana1 = false;
			dash.styleSet.ActGana2 = false;
			//Vuelve a cero los sets
			dash.cantSet1 = 0;
			dash.cantSet2 = 0;
			dash.s1 = false;
			dash.s2 = false;
			dash.s3 = false;
			dash.s4 = false;
			dash.s5 = false;
			dash.s6 = false;
			dash.s7 = false;
			dash.j1s1 = 0;
			dash.j1s2 = 0;
			dash.j1s3 = 0;
			dash.j1s4 = 0;
			dash.j1s5 = 0;
			dash.j1s6 = 0;
			dash.j1s7 = 0;
			dash.j2s1 = 0;
			dash.j2s2 = 0;
			dash.j2s3 = 0;
			dash.j2s4 = 0;
			dash.j2s5 = 0;
			dash.j2s6 = 0;
			dash.j2s7 = 0;
		},
		tiempoDeJuego: function () {
			this.ganaSorteo = this.sorteo;
			this.watch.show = true;
			this.watch.exe = setInterval( () => {
				if (this.sorteo != 0) {
					if (this.watch.tsec >= 0 && this.watch.tsec < 59) {
						this.watch.tsec ++;
						if (this.watch.tsec < 10) {
							this.watch.psec = '0' + this.watch.tsec.toString();
						}
						else {
							this.watch.psec = this.watch.tsec.toString();
						}
					}
					else if (this.watch.tsec == 59) {
						this.watch.tsec = 0;
						this.watch.psec = '0' + this.watch.tsec.toString();
						this.watch.tmin ++;
						if (this.watch.tmin < 10) {
							this.watch.pmin = '0' + this.watch.tmin.toString();
						}
						else if (this.watch.tmin >= 10 && this.watch.tmin < 59) {
							this.watch.pmin = this.watch.tmin.toString();
						}
						else if (this.watch.tmin == 59) {
							this.watch.tmin = 0;
							this.watch.pmin = '0' + this.watch.tmin.toString();
							this.watch.thour ++;
							if (this.watch.thour < 10) {
								this.watch.phour = '0' + this.watch.thour.toString();
							}
							else if (this.watch.thour >= 10 && this.watch.thour <= 59) {
								this.watch.phour = this.watch.thour.toString();
							}
						}
					}
				}
				else {
					clearInterval (this.watch.exe);
					this.watch.exe = null;
				}
				this.watch.ptime = this.watch.phour + ':' + this.watch.pmin + ":" + this.watch.psec;
			}, 1000);
		},
		TimeOut1: function () {
			this.btn2 = false;
				this.stop1 = setInterval ( () => {
					if (this.min == 1 && this.sec == 0) {
						this.min = 0;
						this.sec = 59;
						this.cron1 = '0' + this.min.toString() + ':' + this.sec.toString();
					}
					else if (this.min == 0 && this.sec > 10 && this.sec <= 59) {
						this.sec --;
						this.cron1 = '0' + this.min.toString() + ':' + this.sec.toString();
					}
					else if (this.min == 0 && this.sec > 0 && this.sec <= 10) {
						this.sec --;
						this.cron1 = '0' + this.min.toString() + ':' + '0' + this.sec.toString();
					}
					else {
						clearInterval(this.stop1);
						this.stop1 = null;
						this.cron1 = '01:00';
						this.min = 1;
						this.sec = 0;
						this.used1 = true;
						this.btn1 = false;
						if(this.used2 != true){
							this.btn2 = true;
						}
					}
				}, 1000);
		},
		TimeOut2: function () {
			this.btn1 = false;
			this.stop2 = setInterval ( () => {
				if (this.min == 1 && this.sec == 0) {
					this.min = 0;
					this.sec = 59;
					this.cron2 = '0' + this.min.toString() + ':' + this.sec.toString();
				}
				else if (this.min == 0 && this.sec > 10 && this.sec <= 59) {
					this.sec --;
					this.cron2 = '0' + this.min.toString() + ':' + this.sec.toString();
				}
				else if (this.min == 0 && this.sec > 0 && this.sec <= 10) {
					this.sec --;
					this.cron2 = '0' + this.min.toString() + ':' + '0' + this.sec.toString();
				}
				else {
					clearInterval(this.stop2);
					this.stop2 = null;
					this.cron2 = '01:00';
					this.min = 1;
					this.sec = 0;
					this.used2 = true;
					if(this.used1 != true){
						this.btn1 = true;
					}
					this.btn2 = false;
				}
			}, 1000);
		},
		BallTime: function () {
			this.stop3 = setInterval ( () => {
				if(this.min2 == 2 && this.sec2 == 0) {
					this.min2 = 1;
					this.sec2 = 59;
					this.cron3 = '0' + this.min2.toString() + ':' + this.sec2.toString();
				}
				else if (this.min2 == 1 && this.sec2 > 10 && this.sec2 <= 59) {
					this.sec2 --;
					this.cron3 = '0' + this.min2.toString() + ':' + this.sec2.toString();
				}
				else if (this.min2 == 1 && this.sec2 > 0 && this.sec2 <= 10) {
					this.sec2 --;
					this.cron3 = '0' + this.min2.toString() + ':' + '0' + this.sec2.toString();
				}
				else if (this.min2 == 1 && this.sec2 == 0) {
					this.min2 = 0;
					this.sec2 = 59;
					this.cron3 = '0' + this.min2.toString() + ':' + this.sec2.toString();
				}
				else if (this.min2 == 0 && this.sec2 > 10 && this.sec2 <= 59) {
					this.sec2 --;
					this.cron3 = '0' + this.min2.toString() + ':' + this.sec2.toString();
				}
				else if (this.min2 == 0 && this.sec2 > 0 && this.sec2 <= 10) {
					this.sec2 --;
					this.cron3 = '0' + this.min2.toString() + ':' + '0' + this.sec2.toString();
				}
				else {
					clearInterval(this.stop3);
					this.stop3 = null;
					this.cron3 = '02:00';
					this.min2 = 2;
					this.sec2 = 0;
					this.btn3 = false;
				}
			}, 1000);
		},
		sanearString: function (str){
			str = str.toString().replace(/ /g,"_").replace(/ç/g,"c").replace(/Ç/g,"C").replace(/ñ/g,"n").replace(/Ñ/g,"N")
			.replace(/á|à|ä|â|ª/g,"a").replace(/Á|À|Â|Ä/g,"A").replace(/é|è|ë|ê/g,"e").replace(/É|È|Ê|Ë/g,"E").replace(/í|ì|ï|î/g,"i")
			.replace(/Í|Ì|Ï|Î/g,"I").replace(/ó|ò|ö|ô/g,"o").replace(/Ó|Ò|Ö|Ô/g,"O").replace(/ú|ù|ü|û/g,"u").replace(/Ú|Ù|Û|Ü/g,"U");
			return str;
		},
		soloLetras: function (e){
			switch(event.key){
				case "@":
				case "<":
				case ">":
				case "¡":
				case "!":
				case "#":
				case "$":
				case "%":
				case "&":
				case "/":
				case "\\":
				case "{":
				case "}":
				case "[":
				case "]":
				case "(":
				case ")":
				case "=":
				case "¿":
				case "?":
				case "°":
				case "|":
				case "¬":
				case '"':
				case "'":
				case ".":
				case ":":
				case ",":
				case ";":
				case "+":
				case "*":
				case "~":
				case "-":
				case "_":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
				case "0":
					this.jugador1 = this.jugador1.replace(event.key,"");
					this.jugador2 = this.jugador2.replace(event.key,"");
					break;
				case "Backspace":
				case " ":
					this.jugador1 = this.jugador1.replace(event.key,event.key);
					this.jugador2 = this.jugador2.replace(event.key,event.key);
					break;
				default:
					this.jugador1 = this.jugador1.toUpperCase();
					this.jugador2 = this.jugador2.toUpperCase();
					break;
			}
		}
	}
}
</script>

<style scoped>
	h1 {
		font-size: 18px;
		font-weight: bold;
	}
	table {
		margin: auto;
	}
	tr,th {
		text-align: center;
	}
	#banj1 {
		height: 30px;
		width: 40px;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}
	#banj2 {
		height: 30px;
		width: 40px;
		border-top-left-radius: 0px;
	}
	#banj1,#banj2,#csj1,#csj2,#ctout1,#ctout2 {
		border-right: none;
	}
	#cfps {
		border-bottom-left-radius: 0px;
	}
	#hcs,#colSet1,#hTime{border-bottom-right-radius: 0px;}
	#colSet1,#colSet2{border-top-right-radius: 0px;}
	#c1,#c2,#c3,#c4,#c5,#c6,#c7,#c8,#c9,#c10,#c11,#c12,#c13,#c14,#colP1,#uj1,#dj1,
	#colP2,#uj2,#dj2,#hs1,#hs2,#hs3,#hs4,#hs5,#hs6,#hs7,#hcg,#timeOut1{border-radius: 0;}
	#cantSet,#serve{text-align: center;}
	#cbutton,#btn1 {
		background-color: gold;
		border: none;
		font-weight: bold;
		text-decoration: none;
		outline: none;
		width: 100%;
	}
	#btnTO3 {
		background-color: #b20a0a;
		border: none;
		color: #102c59;
		font-weight: bold;
		text-decoration: none;
		outline: none;
		width: 100%;
	}
	#cj1,#cj2,#banj1,#banj2,#hJug {
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}
	#hJug {
		border-bottom-left-radius: 0px;
	}
	#cj1,#cj2,#csj1,#csj2,#hTime,#ctout1,#ctout2,#card1,#card2{border-left: none;border-top-left-radius: 0px;border-bottom-left-radius: 0px;}
	#colSet1,#colSet2,#hcs{border-top-left-radius: 0px;border-bottom-left-radius: 0px;}
	#csj1,#csj2,#cfps,#ctout1,#ctout2{border-top-right-radius: 0px;border-bottom-right-radius: 0px;}
	#cj1,#csj1,#banj1,#ctout1,#card1{background-color: #102c59;}
	#cj2,#csj2,#banj2,#ctout2,#card2{background-color: #b20a0a;}
	#cj1,#cj2{color: white;}
	#cj1,#cj2{border-right: none;text-align: left;}
	#colP1,#colP2{display: table-cell;width: 20px;}
	#colPU1,#colPU2{border-radius: 0;height: 52px;width: 50px;}
	#dj1:active,#dj2:active,#uj1:active,#uj2:active{background-color: grey;}
	#fj1 td{border-bottom-left-radius: 0px;border-bottom-right-radius: 0px;}
	#fj2 td,#fj3 td{border-radius: 0;}
	#foot{vertical-align: baseline;}
	#fto1,#fto2,#fault1,#fault2{margin-top: 3px;}
	#hs1,#hs3,#hs5,#hs7,#uj1,#uj2{background-color: #102c59;color: white;text-align: center;}
	#hs2,#hs4,#hs6,#dj1,#dj2{background-color: #b20a0a;color: white;text-align: center;}
	#lboton,#ingJ1{background-color: gold;border-top-left-radius: 0px;border-top-right-radius: 0px;}
	#ingJ1 button{text-decoration: none;}
	#lj1,#lj2{margin-left: 5px;margin-right: 5px;}
	#lserve,#lset{font-size: 14px;font-weight: bold;}
	#saqJ1,#saqJ2,#fto1,#fto2,#fault1,#fault2{margin-left: 5px;margin-right: 5px;}
	#uj1,#uj2,#dj1,#dj2{padding-left: 0px;padding-right: 3px;padding-top: 3px;width: 100%;}
	/*#txtTO1,#txtTO2,#timer{font-family: digi;}*/
	#txtTO1,#txtTO2{color: gold;font-weight: bold;}
	#txtTO3{color: #102c59;font-weight: bold;}
	#btnTO1,#btnTO2{border: none;color: white;font-weight: bold;height: 100%;outline: none;}
	#timeOut1,#btnTO1{background-color: #102c59;}
	#timeOut2,#btnTO2{background-color: #b20a0a;}
	.arrow{color: gold;margin-left: 2px;padding-left: 3px;}
	.arrow:hover{color: white;}
	.band{margin-left: 3px;margin-right: 3px;height: 98%;width: 98%;}
	.btncards {background-color: #102c59;border: none;color: white;font-weight: bold;text-decoration: none;outline: none;width: 100%;}
	.cellbtncards {background-color: #102c59;border-top-left-radius: 0px;border-top-right-radius: 0px;text-decoration: none;}
	.selNac,.textJug{border: none;border-radius: 4px;height: 30px;padding-left: 3px;font-size: 14px;}
	.tablero{border-spacing: 0px;font-size: 16px;}
	.timeFree{color: transparent;}
	.timeUsed{color: gold;}
	.punt,.setX{border: none;background-color: transparent;color: black;text-align: center;vertical-align: middle;}
	.setWin{background-color: grey; font-weight: bold;}
	.setLose{background-color: white; font-weight: normal;}
</style>

/*Componente global
var PieDePagina = Vue.component('pie-de-pagina', {
	template: `
	<footer id="piePag" class="container-fluid footer text-center">
		<span>
			Copyright &copy; <time>{{fecha}}</time>. Todos los derechos reservados.
		</span>
		<br/>
		<p>
			<span id="foot" class="glyphicon glyphicon-envelope">
			</span> E-mail: <a href="mailto:natafa89@gmail.com">natafa89@gmail.com</a>
			<br/>
			Tenis de Mesa/Table Tennis
		</p>
	</footer>`,
	data: function () {
		return {
			fecha: new Date().toISOString().slice(0,4)
		}
	}
});*/