<script lang="ts">
	import { Button } from "$lib/components/ui/button";

    	async function logout() {
		const res = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		/// reload page
		if (res.ok) {
			location.reload();
		} else {
			console.error('Failed to logout');
		}
	}
</script>
<header class="p-5">
	<div class="flex flex-row justify-between items-center">
		<a class="font-bold text-4xl text-blue-400" href="/">iCanT</a>
        <Button variant="ghost" on:click={logout}>Delogheaza-te</Button>
	</div>
</header>

<slot />