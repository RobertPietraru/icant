<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageData } from './$types';
	import { Description } from 'formsnap';
	import * as Form from '$lib/components/ui/form/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	export let link: string;
	export let id: string;
	var formLink = link;
	console.log(link);

	function updateLink() {
		console.log(formLink);
		if (!formLink) {
			return;
		}
		fetch(`/api/session/${id}/link`, {
			method: 'POST',

			body: JSON.stringify({
				link: formLink
			})
		})
			.then((res) => {
				if (res.ok) {
                    window.location.reload();
                    console.log('Link updated');
				} else {
					alert('A aparut o eroare la anularea sedintei');
				}
			})
			.catch((err) => {
				alert('A aparut o eroare la anularea sedintei');
			});
	}
</script>

<div class="w-full flex flex-row">
	<Input placeholder="Link Conectare" bind:value={formLink} />
	<Button class="ml-3" on:click={updateLink}>Modifica</Button>
</div>
