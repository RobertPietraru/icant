<script lang="ts">
	import UserLoginForm from './user-login-form.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<UserLoginForm data={data.form} error={form?.message} />
