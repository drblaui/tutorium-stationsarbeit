import { defineStore } from 'pinia'
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL || "", import.meta.env.VITE_SUPABASE_KEY || "");

export const useSupabaseStore = defineStore({
  id: 'supabase',
	actions: {
		async insert(type: string, data:string, letter: string) {
			let obj = type == "strength" ? {strength: data, letter: letter} : {example: data, letter: letter};
			const { error } = await supabase.from(type + 's').insert(obj);
			return !error;
		},
		async select(type:string, letter?: string) {
			if(letter) {
				const { data, error } = await supabase.from(type + 's').select(type).eq('letter', letter);
				if(!error) return data;
			}
			const { data, error } = await supabase.from(type + 's').select(type);
			if(!error) return data
		}
	}
})
