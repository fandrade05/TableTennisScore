<template>
	<div class="container">
		<div class="row">
			<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
				<div class="card card-signin my-5">
					<div class="card-body">
						<div class="form-group row">
							<label for="selRegister" class="col-form-label font-weight-bold">Registrar:</label>
							<div class="col">
								<select id="selRegister" class="custom-select" v-model="register" autofocus>
									<option value="0" disabled selected>Selecione uno</option>
									<option value="1">Clubes</option>
									<option value="2">Jugadores</option>
								</select>
							</div>
						</div>
						<template v-if="register == 1">
							<h5 class="card-title text-center">Clubes</h5>
							<form class="form-signin" @submit.prevent="crearClub">
								<div class="form-label-group">
									<input type="text" id="ClubName" class="form-control" placeholder="Nombre del club" v-model="datosDeClub.name" required>
									<label for="ClubName">Club</label>
								</div>
								<div class="form-label-group">
									<div class="row">
										<div class="col-5">
											<input type="text" id="Address" class="form-control form-control-sm" placeholder="Dirección" v-model="datosDeClub.address" required>
										</div>
										<div class="col">
											<input type="number" id="NumberAddress" class="form-control form-control-sm" placeholder="Altura" v-model="datosDeClub.numberAddress" required>
										</div>
										<div class="col">
											<input type="text" id="CityAddress" class="form-control form-control-sm" placeholder="Ciudad" v-model="datosDeClub.cityAddress" required>
										</div>
									</div>
									<label for="Address">Datos de direcci&oacute;n</label>
								</div>
								<div class="form-label-group">
									<input type="text" id="FileImage" class="form-control" placeholder="Archivo imagen" v-model="text_img" required>
									<label for="FileImage">Archivo imagen</label>
								</div>
								<hr class="my-4">
								<button type="submit" class="btn btn-lg btn-primary btn-block text-uppercase">crear</button>
							</form>
						</template>
						<template  v-if="register == 2">
							<h5 class="card-title text-center">Jugadores</h5>
							<form class="form-signin" @submit.prevent="crearJugador">
								<div class="form-label-group">
									<div class="row">
										<div class="col">
											<input type="text" id="Name" class="form-control form-control-sm" placeholder="Nombre" v-model="datosDeJugador.firstName" required autofocus>
										</div>
										<div class="col">
											<input type="text" id="LastName" class="form-control form-control-sm" placeholder="Apellido" v-model="datosDeJugador.lastName" required>
										</div>
									</div>
									<label for="Name">Nombre y Apellido</label>
								</div>
								<div class="form-label-group">
									<input type="date" id="Birthday" class="form-control" max="2011-12-31" v-model="datosDeJugador.birthday" required>
									<label for="Birthday">Nacimiento</label>
								</div>
								<div class="form-label-group">
									<input type="number" id="Rating" class="form-control" min="0" v-model="datosDeJugador.rating" required>
									<label for="Rating">Puntaje</label>
								</div>
								<span>{{ categoria }}</span>
								<hr class="my-4">
								<button type="submit" class="btn btn-lg btn-primary btn-block text-uppercase">Crear</button>
							</form>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//var db = firebase.database();
	export default {
		name: 'Home',
		data () {
			return {
				register: 0,
				datosDeJugador: {
					firstName: '',
					lastName: '',
					birthday: '',
					rating: 0
				},
				datosDeClub: {
					name: '',
					address: '',
					numberAddress: '',
					cityAddress: '',
					shield: 'img/Teams/Shield_of_'
				},
				text_img: ''
			}
		},
		computed: {
			categoria: function () {
				if(this.datosDeJugador.rating == 0){
					return '';
				}
				else if(this.datosDeJugador.rating > -1 && this.datosDeJugador.rating < 200){
					return '7ma División';
				}
				else if(this.datosDeJugador.rating > 199 && this.datosDeJugador.rating < 400){
					return '6ta División';
				}
				else if(this.datosDeJugador.rating > 399 && this.datosDeJugador.rating < 600){
					return '5ta División';
				}
				else if(this.datosDeJugador.rating > 599 && this.datosDeJugador.rating < 800){
					return '4ta División';
				}
				else if(this.datosDeJugador.rating > 799 && this.datosDeJugador.rating < 1000){
					return '3ra División';
				}
				else if(this.datosDeJugador.rating > 999 && this.datosDeJugador.rating < 1200){
					return '2da División';
				}
				else{
					return '1ra División';
				}
			}
		},
		methods: {
			crearJugador: function () {
				db.ref('players/').push().set(
					this.datosDeJugador,
					function(error) {
						if (error) {
							console.log("No se guardó correctamente al jugador");
						}
						else {
							console.log("Jugador guardado correctamente");
						}
					}
				);
				if(db != null){
					this.datosDeJugador.firstName = '';
					this.datosDeJugador.lastName = '';
					this.datosDeJugador.birthday = '';
					this.datosDeJugador.rating = 0;
				}
			},
			crearClub: function () {
				this.datosDeClub.name = this.datosDeClub.name.trim();
				this.datosDeClub.address = this.datosDeClub.address.trim();
				this.datosDeClub.numberAddress = this.datosDeClub.numberAddress.trim();
				this.datosDeClub.cityAddress = this.datosDeClub.cityAddress.trim();
				this.datosDeClub.shield = this.datosDeClub.shield + this.text_img.replace(' ','_').trim() + '.png';
				db.ref('teams/').push().set(
					this.datosDeClub,
					function(error) {
					if (error) {
						console.log("No se guardó correctamente al club");
					}
					else {
						console.log("Club guardado correctamente");
					}
					}
				);
				if(db != null){
					this.datosDeClub.name = '';
					this.datosDeClub.address = '';
					this.datosDeClub.numberAddress = '';
					this.datosDeClub.cityAddress = '';
					this.datosDeClub.shield = 'img/Teams/Shield_of_';
					this.text_img = '';
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
