<script lang="ts">
	import UserSignupForm from './user-signup-form.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<UserSignupForm data={data.form} error={form?.message} />
