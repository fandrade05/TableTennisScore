//Componente global
<template>
    <input class="setX" type="text" :style="ColorSet" :value="Nro" maxlength="2" size="1" disabled/>
</template>

<script>
export default {
    name: 'SetBox',
    props: ['jys', 'sheet'],
    computed: {
		Nro: function () {
			return this.jys;
		},
		ColorSet: function () {
			return this.sheet;
		}
	}
}
</script>