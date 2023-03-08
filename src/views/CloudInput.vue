<script setup lang="ts">
	import { ref } from 'vue';
	import { useRoute } from 'vue-router';
	
  const route = useRoute();
	let target  = ref(Array.isArray(route.params.name) ? route.params.name[0] : route.params.name);

	const mapping = {
		A: "Unvorsichtigkeit unter Zeitdruck",
		B: "Beibehalten eines einmal eingeschlagenen Weges, Unlust die Strategie zu ändern, Konservatismus im Planen",
		C: "Fehlendes Gespür für die Dynamik eines Systems. Keine Betrachtung von relativen Werten sondern nur von absoluten Werten. Nichtverstehen von exponentiellem Verhalten.",
		D: "Theoretisches, aber nicht eigenständig erfahrenes Wissen führt nicht immer zu entsprechenden Handlungen. Oft kommen diese erst, wenn „etwas passiert ist“ oder das theoretische Wissen praktisch durchgespielt wurde.",
		E: "Falsches Erhöhen von einzelnen Erfahrungen zu allgemeinen Handlungsleitlinien, obwohl wichtige Ausnahmen zu bedenken wären. Gleichzeitig Versuch, Erlerntes nicht nur unter den exakten Vorbedingungen anzuwenden, sondern auch unter lediglich ähnlichen Bedingungen.",
		F: "Simples Ursachen-Wirkungs-Denken: Eine Ursache hat genau eine Wirkung und jede Wirkung hat genau eine Ursache. Missachten von Nebenwirkungen."
	}

	const strength = ref("");
	const example = ref("");
	const prev = String.fromCharCode(64 + ((parseInt(target.value, 36) - 9) - 1));
	const next = String.fromCharCode(64 + ((parseInt(target.value, 36) - 9) + 1));

	function send(type: string, event: MouseEvent) {
		let payload = type == "strength" ? strength.value : example.value;
		(event.currentTarget as Element)?.classList.remove("mdi-send");
		(event.currentTarget as Element)?.classList.add("mdi-check");
		setTimeout(() => {
			console.log("foo");
			console.log(event);
			(event.target as Element)?.classList.remove("mdi-check");
			(event.target as Element)?.classList.add("mdi-send");
		}, 2000);
		if(type == "strength") strength.value = "";
		else example.value = "";
	}
</script>
<template>
	<div class="text-h1" v-if="!(target in mapping)">Nothing here.</div>
	<v-container v-else>
		<v-row>
			<v-col align="center" :class="(mapping[target].length > 105) ? 'text-h6' : 'text-h4'">
				{{ mapping[target] }}
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-text-field
					v-model="strength"
					label="Stärke"
					hint="Kontext in dem die Schwäche eine Stärke sein kann" 
					append-inner-icon="mdi-send"
					@click:append-inner="send('strength', $event)"
					clearable/>
			</v-col>
			<v-col>
				<v-text-field
					v-model="example"
					label="Softwareentwicklung"
					hint="Beispiel aus der Softwareentwicklung" 
					append-inner-icon="mdi-send"
					@click:append-inner="send('example', $event)"
					clearable/>
			</v-col>
		</v-row>
		<v-row>
			<v-col align="center" class="font-italic text-disabled">
				(mit Enter wird abgesendet)
			</v-col>
		</v-row>
		<v-row justify="space-around">
			<v-col cols="auto" v-if="parseInt(target, 36) - 9 > 1" justify="start" align-self="start">
				<router-link :to="`/input/${prev}`">
					<v-btn
						prepend-icon="mdi-arrow-left">
						{{ prev }}
					</v-btn>
				</router-link>
			</v-col>
			<v-col cols="auto" v-if="parseInt(target, 36) - 9 < 6" align-self="end">
				<router-link :to="`/input/${next}`">
					<v-btn
						append-icon="mdi-arrow-right">
						{{ next }}
					</v-btn>
				</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>