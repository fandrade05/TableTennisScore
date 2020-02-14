<template>
	<table class="tablero">
		<tr>
			<th id="cfps" class="ui-corner-all ui-widget ui-widget-content" colspan="5">JUGADORES</th>
			<th id="hs1" class="ui-corner-all ui-widget ui-widget-content">1</th>
			<template v-if="sets >= 3">
				<th id="hs2" class="ui-corner-all ui-widget ui-widget-content">2</th>
				<th id="hs3" class="ui-corner-all ui-widget ui-widget-content">3</th>
				<template v-if="sets >= 5">
					<th id="hs4" class="ui-corner-all ui-widget ui-widget-content">4</th>
					<th id="hs5" class="ui-corner-all ui-widget ui-widget-content">5</th>
					<template v-if="sets == 7">
						<th id="hs6" class="ui-corner-all ui-widget ui-widget-content">6</th>
						<th id="hs7" class="ui-corner-all ui-widget ui-widget-content">7</th>
					</template>
				</template>
			</template>
			<th id="hcg" class="ui-corner-all ui-widget ui-widget-content">GAMES</th>
			<th id="hcs" class="ui-corner-all ui-widget ui-widget-content">SETS</th>
		</tr>
		<tr>
			<!--td id="banj1" class="ui-corner-all ui-widget ui-widget-content">
				<img id="nac1" v-if="cargaPais1" :src="cargaPais1" alt="nac1" class="img-rounded band">
			</td-->
			<td id="cj1" class="ui-corner-all ui-widget ui-widget-content">
				<span id="lj1" for="jug1">{{ nomjug1 }}</span>
			</td>
			<td id="csj1" class="ui-corner-all ui-widget ui-widget-content">
				<i id="saqJ1" class="fas fa-table-tennis" :style="serve1"></i>
			</td>
			<td id="ctout1" class="ui-corner-all ui-widget ui-widget-content">
				<i id="fto1" class="fas fa-square" :style="time1"></i>
			</td>
			<td id="card1" class="ui-corner-all ui-widget ui-widget-content">
				<i id="fault1" class="fas fa-square" :style="warn1"></i>
			</td>
			<td id="c1" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act1)">
				<SetBox :jys="j1s1" :sheet="activar(styleSet.Act1)" :value="marcarSet"></SetBox>
			</td>
			<template v-if="sets >= 3">
				<td id="c2" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act2)">
					<SetBox :jys="j1s2" :sheet="activar(styleSet.Act2)" :value="marcarSet"></SetBox>
				</td>
				<td id="c3" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act3)">
					<SetBox :jys="j1s3" :sheet="activar(styleSet.Act3)" :value="marcarSet"></SetBox>
				</td>
				<template v-if="sets >= 5">
					<td id="c4" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act4)">
						<SetBox :jys="j1s4" :sheet="activar(styleSet.Act4)" :value="marcarSet"></SetBox>
					</td>
					<td id="c5" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act5)">
						<SetBox :jys="j1s5" :sheet="activar(styleSet.Act5)" :value="marcarSet"></SetBox>
					</td>
					<template v-if="sets == 7">
						<td id="c6" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act6)">
							<SetBox :jys="j1s6" :sheet="activar(styleSet.Act6)" :value="marcarSet"></SetBox>
						</td>
						<td id="c7" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act7)">
							<SetBox :jys="j1s7" :sheet="activar(styleSet.Act7)" :value="marcarSet"></SetBox>
						</td>
					</template>
				</template>
			</template>
			<td id="colP1" class="ui-corner-all ui-widget ui-widget-content">
				<input id="jug1" type="text" autocomplete="off" class="punt" maxlength="2" size="2" :value="jug1" disabled/>
			</td>
			<td id="colSet1" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.ActGana1)">
				<span id="cantSet1">{{ cantSet1 }}</span>
			</td>
		</tr>
		<tr>
			<!--td id="banj2" class="ui-corner-all ui-widget ui-widget-content">
				<img id="nac2" v-if="cargaPais2" :src="cargaPais2" alt="nac2" class="img-rounded band">
			</td-->
			<td id="cj2" class="ui-corner-all ui-widget ui-widget-content">
				<span id="lj2" for="jug2">{{ nomjug2 }}</span>
			</td>
			<td id="csj2" class="ui-corner-all ui-widget ui-widget-content">
				<i id="saqJ2" class="fas fa-table-tennis" :style="serve2"></i>
			</td>
			<td id="ctout2" class="ui-corner-all ui-widget ui-widget-content">
				<i id="fto2" class="fas fa-square" :style="time2"></i>
			</td>
			<td id="card2" class="ui-corner-all ui-widget ui-widget-content">
				<i id="fault2" class="fas fa-square" :style="warn2"></i>
			</td>
			<td id="c8" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act8)">
				<SetBox :jys="j2s1" :sheet="activar(styleSet.Act8)"></SetBox>
				<!--span id="j2s1" :value="marcarSet">{{ j2s1 }}</span-->
			</td>
			<template v-if="sets >= 3">
				<td id="c9" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act9)">
					<SetBox :jys="j2s2" :sheet="activar(styleSet.Act9)"></SetBox>
				</td>
				<td id="c10" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act10)">
					<SetBox :jys="j2s3" :sheet="activar(styleSet.Act10)"></SetBox>
				</td>
				<template v-if="sets >= 5">
					<td id="c11" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act11)">
						<SetBox :jys="j2s4" :sheet="activar(styleSet.Act11)"></SetBox>
					</td>
					<td id="c12" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act12)">
						<SetBox :jys="j2s5" :sheet="activar(styleSet.Act12)"></SetBox>
					</td>
					<template v-if="sets == 7">
						<td id="c13" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act13)">
							<SetBox :jys="j2s6" :sheet="activar(styleSet.Act13)"></SetBox>
						</td>
						<td id="c14" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.Act14)">
							<SetBox :jys="j2s7" :sheet="activar(styleSet.Act14)"></SetBox>
						</td>
					</template>
				</template>
			</template>
			<td id="colP2" class="ui-corner-all ui-widget ui-widget-content">
				<input id="jug2" type="text" autocomplete="off" class="punt" maxlength="2" size="2" :value="jug2" disabled>
			</td>
			<td id="colSet2" class="ui-corner-all ui-widget ui-widget-content" :style="activar(styleSet.ActGana2)">
				<span id="cantSet2">{{ cantSet2 }}</span>
			</td>
		</tr>
	</table>   
</template>

<script>
import ControlPanel from "./ControlPanel";
import SetBox from "./SetBox";

export default {
	name: 'ScoreBoard',
	/*props: {
		umpire: {
			cont1: Number,
			cont2: Number,
			cSets: Number,
			sorteo: Number,
			cargaTablero: Boolean,
			styleServe: String,
			defaultStyleMarks: String
		}
	},*/
    data () {
		return {
			sets: 7,
			nomjug1: 'Facu',
			nomjug2: 'Santi',
			serve1: 1,
			serve2: 2,
			time1: { color: 'white' },
			time2: { color: 'white' },
			warn1: { color: 'yellow' },
			warn2: { color: 'red' },
			marcarSet: 11,
			jug1: 5,
			jug2: 7,
			//Contador de cada set
			cantSet1: 0,
			cantSet2: 0,
			//Flags de cada set
			s1: false,
			s2: false,
			s3: false,
			s4: false,
			s5: false,
			s6: false,
			s7: false,
			//Puntos de cada set
			j1s1: 0,
			j1s2: 0,
			j1s3: 0,
			j1s4: 0,
			j1s5: 0,
			j1s6: 0,
			j1s7: 0,
			j2s1: 0,
			j2s2: 0,
			j2s3: 0,
			j2s4: 0,
			j2s5: 0,
			j2s6: 0,
			j2s7: 0,
			//Estilos por set
			styleSet: {
				fontWeight: 'bold',
				backgroundColor: 'grey',
				Act1: false,
				Act2: false,
				Act3: false,
				Act4: false,
				Act5: false,
				Act6: false,
				Act7: false,
				Act8: false,
				Act9: false,
				Act10: false,
				Act11: false,
				Act12: false,
				Act13: false,
				Act14: false,
				ActGana1: false,
				ActGana2: false
			},
			defaultStyleSet: {
				fontWeight: 'normal',
				backgroundColor: 'white'
			}
		}
	},
	components: {
		//ControlPanel,
		SetBox
	},
    /*computed: {
		jug1: function () {
			return this.umpire.cont1;
		},
		jug2: function () {
			return this.umpire.cont2;
		},
		marcarSet: function () {
			//EventBus.$emit('dash',this.);
			//Set 1
			if((this.umpire.cont1 >= 11 && (this.umpire.cont1 - this.umpire.cont2) >= 2) 
				&& this.s1 == false){
				this.j1s1 = this.umpire.cont1;
				this.j2s1 = this.umpire.cont2;
				this.umpire.cont1 = 0;
				this.umpire.cont2 = 0;
				this.cantSet1 ++;
				this.s1 = true;
				this.styleSet.Act1 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			else if((umpire.cont2 >= 11 && (this.umpire.cont2 - this.umpire.cont1) >= 2) && this.s1 == false){
				this.j1s1 = this.umpire.cont1;
				this.j2s1 = this.umpire.cont2;
				this.umpire.cont1 = 0;
				this.umpire.cont2 = 0;
				this.cantSet2 ++;
				this.s1 = true;
				this.styleSet.Act8 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			//Set 2
			else if((umpire.cont1 >= 11 && (umpire.cont1 - umpire.cont2) >= 2) && this.s2 == false){
				this.j1s2 = umpire.cont1;
				this.j2s2 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet1 ++;
				this.s2 = true;
				this.styleSet.Act2 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			else if((umpire.cont2 >= 11 && (umpire.cont2 - umpire.cont1) >= 2) && this.s2 == false){
				this.j1s2 = umpire.cont1;
				this.j2s2 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet2 ++;
				this.s2 = true;
				this.styleSet.Act9 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			//Set 3
			else if((umpire.cont1 >= 11 && (umpire.cont1 - umpire.cont2) >= 2) && this.s3 == false){
				this.j1s3 = umpire.cont1;
				this.j2s3 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet1 ++;
				this.s3 = true;
				this.styleSet.Act3 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			else if((umpire.cont2 >= 11 && (umpire.cont2 - umpire.cont1) >= 2) && this.s3 == false){
				this.j1s3 = umpire.cont1;
				this.j2s3 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet2 ++;
				this.s3 = true;
				this.styleSet.Act10 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			//Set 4
			else if((umpire.cont1 >= 11 && (umpire.cont1 - umpire.cont2) >= 2) && this.s4 == false){
				this.j1s4 = umpire.cont1;
				this.j2s4 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet1 ++;
				this.s4 = true;
				this.styleSet.Act4 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			else if((umpire.cont2 >= 11 && (umpire.cont2 - umpire.cont1) >= 2) && this.s4 == false){
				this.j1s4 = umpire.cont1;
				this.j2s4 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet2 ++;
				this.s4 = true;
				this.styleSet.Act11 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			//Set 5
			else if((umpire.cont1 >= 11 && (umpire.cont1 - umpire.cont2) >= 2) && this.s5 == false){
				this.j1s5 = umpire.cont1;
				this.j2s5 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet1 ++;
				this.s5 = true;
				this.styleSet.Act5 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			else if((umpire.cont2 >= 11 && (umpire.cont2 - umpire.cont1) >= 2) && this.s5 == false){
				this.j1s5 = umpire.cont1;
				this.j2s5 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet2 ++;
				this.s5 = true;
				this.styleSet.Act12 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			//Set 6
			else if((umpire.cont1 >= 11 && (umpire.cont1 - umpire.cont2) >= 2) && this.s6 == false){
				this.j1s6 = umpire.cont1;
				this.j2s6 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet1 ++;
				this.s6 = true;
				this.styleSet.Act6 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			else if((umpire.cont2 >= 11 && (umpire.cont2 - umpire.cont1) >= 2) && this.s6 == false){
				this.j1s6 = umpire.cont1;
				this.j2s6 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet2 ++;
				this.s6 = true;
				this.styleSet.Act13 = true;
				this.saquePorSet();
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			//Set 7
			else if((umpire.cont1 >= 11 && (umpire.cont1 - umpire.cont2) >= 2) && this.s7 == false){
				this.j1s7 = umpire.cont1;
				this.j2s7 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet1 ++;
				this.s7 = true;
				this.styleSet.Act7 = true;
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
			else if((umpire.cont2 >= 11 && (umpire.cont2 - umpire.cont1) >= 2) && this.s7 == false){
				this.j1s7 = umpire.cont1;
				this.j2s7 = umpire.cont2;
				umpire.cont1 = 0;
				umpire.cont2 = 0;
				this.cantSet2 ++;
				this.s7 = true;
				this.styleSet.Act14 = true;
				this.finDelPartido(this.cantSet1,this.cantSet2);
			}
		},
		sets: function () {
			return this.umpire.cSets;
		},
		serve1: function () {
			if(this.umpire.sorteo == 1){
				return this.umpire.styleServe;
			}
			else {
				return this.umpire.defaultStyleMarks;
			}
		},
		serve2: function () {
			if(this.umpire.sorteo == 2){
				return this.umpire.styleServe;
			}
			else {
				return this.umpire.defaultStyleMarks;
			}
		},
		nomjug1: function () {
			if (umpire.cargaTablero == true) {
				return umpire.jugador1;
			}
		},
		nomjug2: function () {
			if (umpire.cargaTablero == true) {
				return umpire.jugador2;
			}
		},
		time1: function () {
			if (umpire.used1 == true) {
				return umpire.styleTime;
			}
			else {
				return umpire.defaultStyleMarks;
			}
		},
		time2: function () {
			if (umpire.used2 == true) {
				return umpire.styleTime;
			}
			else {
				return umpire.defaultStyleMarks;
			}
		},
		warn1: function () {
			switch(umpire.tarjetas.jug1){
				case 0: return umpire.defaultStyleMarks; break;
				case 1: return umpire.styleYellowCard; break;
				case 2: return umpire.styleRedCard; break;
				default: umpire.tarjetas.jug1 = 0; return umpire.defaultStyleMarks; break;
			}
		},
		warn2: function () {
			switch(umpire.tarjetas.jug2){
				case 0: return umpire.defaultStyleMarks; break;
				case 1: return umpire.styleYellowCard; break;
				case 2: return umpire.styleRedCard; break;
				default: umpire.tarjetas.jug2 = 0; return umpire.defaultStyleMarks; break;
			}
		},
		/*cargaPais1: function () {
			if (umpire.cargaTablero == true) {
				pais1 = true;
				return 'img/Flag_of_' + umpire.nac1 + '.png';
			}
		},
		cargaPais2: function () {
			if (umpire.cargaTablero == true) {
				pais2 = true;
				return 'img/Flag_of_' + umpire.nac2 + '.png';
			}
		}
    },*/
    methods: {
		activar: function (a) {
			if(a == true){
				return this.styleSet;
			}
			else{
				return this.defaultStyleSet;
			}
		},
		/*finDelPartido: function (cs1,cs2) {
			switch(this.umpire.cSets){
				case 1:
					if(cs1 == 1){
						umpire.sorteo = 0;
						umpire.ganaSorteo = umpire.sorteo;
						this.styleSet.ActGana1 = true;
					}
					else if(cs2 == 1){
						umpire.sorteo = 0;
						umpire.ganaSorteo = umpire.sorteo;
						this.styleSet.ActGana2 = true;
					}
					break;
				case 3:
					if(cs1 == 2){
						umpire.sorteo = 0;
						umpire.ganaSorteo = umpire.sorteo;
						this.styleSet.ActGana1 = true;
					}
					else if(cs2 == 2){
						umpire.sorteo = 0;
						umpire.ganaSorteo = umpire.sorteo;
						this.styleSet.ActGana2 = true;
					}
					break;
				case 5:
					if(cs1 == 3){
						umpire.sorteo = 0;
						umpire.ganaSorteo = umpire.sorteo;
						this.styleSet.ActGana1 = true;
					}
					else if(cs2 == 3){
						umpire.sorteo = 0;
						umpire.ganaSorteo = umpire.sorteo;
						this.styleSet.ActGana2 = true;
					}
					break;
				case 7:
					if(cs1 == 4){
						umpire.sorteo = 0;
						umpire.ganaSorteo = umpire.sorteo;
						this.styleSet.ActGana1 = true;
					}
					else if(cs2 == 4){
						umpire.sorteo = 0;
						umpire.ganaSorteo = umpire.sorteo;
						this.styleSet.ActGana2 = true;
					}
					break;
			}
		},
		saquePorSet: function () {
			switch(umpire.ganaSorteo){
				case 1: umpire.sorteo = 2; break;
				case 2: umpire.sorteo = 1; break;
			}
			umpire.ganaSorteo = umpire.sorteo;
		},*/
		marcarSaque: function () {
			var sum = umpire.cont1 + umpire.cont2;
			var res = umpire.cont1 - umpire.cont2;
			if(sum != 0 && sum %2 == 0 && umpire.cont1 <= 10 && umpire.cont2 <= 10){
				if(umpire.sorteo == 1){
					umpire.sorteo = 2;
				}
				else{
					umpire.sorteo = 1;
				}
			}
			else if(umpire.cont1 >= 10 && umpire.cont2 >= 10 && res >= -1 && res <= 1){
				if(umpire.sorteo == 1){
					umpire.sorteo = 2;
				}
				else{
					umpire.sorteo = 1;
				}
			}
		}
	}
}
</script>

<style scoped>
	table{margin: auto;}
	tr,th{text-align: center;}
	#banj1{height: 30px;width: 40px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;}
	#banj2{height: 30px;width: 40px;border-top-left-radius: 0px;}
	#banj1,#banj2,#csj1,#csj2,#ctout1,#ctout2{border-right: none;}
	#cfps{border-bottom-left-radius: 0px;}
	#hcs,#colSet1,#hTime{border-bottom-right-radius: 0px;}
	#colSet1,#colSet2{border-top-right-radius: 0px;}
	#c1,#c2,#c3,#c4,#c5,#c6,#c7,#c8,#c9,#c10,#c11,#c12,#c13,#c14,#colP1,#uj1,#dj1,
	#colP2,#uj2,#dj2,#hs1,#hs2,#hs3,#hs4,#hs5,#hs6,#hs7,#hcg,#timeOut1{border-radius: 0;}
	#cantSet,#serve{text-align: center;}
	#cbutton,#btn1{background-color: gold;border: none;font-weight: bold;text-decoration: none;outline: none;width: 100%;}
	#btnTO3{background-color: #b20a0a;border: none;color: #102c59;font-weight: bold;text-decoration: none;outline: none;width: 100%;}
	#cj1,#cj2,#banj1,#banj2,#hJug{border-top-right-radius: 0px;border-bottom-right-radius: 0px;}
	#hJug{border-bottom-left-radius: 0px;}
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
	