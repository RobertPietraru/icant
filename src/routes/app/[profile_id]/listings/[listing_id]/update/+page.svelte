<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Separator } from "$lib/components/ui/select";
	import type { PageData } from "./$types.js";
	import ListingUpdateForm from "./ListingUpdateForm.svelte";
	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Anunt nou</h3>
		<p class="text-sm text-muted-foreground">Creeaza un anunt pentru un curs</p>
	</div>
	<Separator />
	<ListingUpdateForm data={data.form} />
</div>