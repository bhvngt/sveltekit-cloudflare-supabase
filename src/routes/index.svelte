<script context="module">
	import { createClient } from '@supabase/supabase-js'

	let supabaseUrl = '';
	let supabaseKey = '';
	const db = createClient(supabaseUrl, supabaseKey)
	export async function load({fetch}) {
		const {data: users, error} = await db.from("users").select();
		return {props: {users}}
	}
</script>

<script lang="ts">
	export let users = [];
</script>

<h1 class="m-10 text-2xl">Welcome to SvelteKit</h1>
<p class="m-10">Visit <a class="text-blue-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
  documentation</p>
{#each users as u}
  <p>{u.id}</p>
{/each}
