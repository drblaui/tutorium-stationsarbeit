<script setup lang="ts">
	import { useSupabaseStore } from '@/store/supabase';
	import { ref } from 'vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();
	let target  = ref(Array.isArray(route.params.letter) ? route.params.letter[0] : route.params.letter);
	
	const supabase = useSupabaseStore();
	const strengths = (await supabase.select("strength", target.value))?.map((s: any) => s.strength);
	const examples = (await supabase.select("example", target.value))?.map((s:any) => s.example);
</script>
<template>
	<v-container>
		<v-row v-if="!target">
			<v-col v-for="n in 6">
				<router-link :to="`/results/${ String.fromCharCode(64 + n) }`" class="text-decoration-none">
					<v-card>
						<v-card-title class="text-center">
							{{ String.fromCharCode(64 + n) }}
						</v-card-title>
					</v-card>
				</router-link>
			</v-col>
		</v-row>
		<v-row v-else>
			<v-col cols="auto">
				<router-link to="/results/">
					<v-btn icon="mdi-arrow-left"/>
				</router-link>
			</v-col>
			<v-col>
				<v-list>
					<v-list-subheader>Stärken</v-list-subheader>
					<v-list-item v-for="item in strengths">
						<template v-slot:prepend>
							<v-icon icon="mdi-circle-small" />
						</template>
						{{ item }}
					</v-list-item>
					<v-list-subheader>Beispiele</v-list-subheader>
					<v-list-item v-for="item in examples">
						<template v-slot:prepend>
							<v-icon icon="mdi-circle-small" />
						</template>
						{{ item }}
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
	</v-container>
</template>