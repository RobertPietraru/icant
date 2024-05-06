<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Separator } from "$lib/components/ui/select";
	import type { PageData } from "./$types.js";
	import ProfileForm from "./profile-form.svelte";
	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Profile</h3>
		<p class="text-sm text-muted-foreground">Informatiile de aici sunt vizible pentru toti utilizatorii</p>
	</div>
	<ProfileForm data={data.form} />
	<Separator />
	<!-- profile deletion -->
	<form action="?/delete" method="POST">
		<Button type="submit" variant="outline" class="bg-red-500 text-white">Delete profile</Button>
	</form>
</div>