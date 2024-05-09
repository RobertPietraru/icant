<script lang="ts" context="module">
	import { string, z } from 'zod';
	export const signupFormSchema = z.object({
		email: z.string().min(0, 'Introduceti email-ul').email(),
		password: z.string().min(0, 'Introduceti parola')
	});

	export type SignupFormSchema = typeof signupFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card/index.js';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { root } from 'postcss';
	import { goto } from '$app/navigation';

	let isLoading = false;
	export let data: SuperValidated<Infer<SignupFormSchema>>;
	export let error: string | undefined;

	const form = superForm(data, {
		validators: zodClient(signupFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="grid gap-6 w-full  max-w-96 p-10">
	<Card.Title class="text-2xl mx-auto font-bold">Inregistrare</Card.Title>
	{#if error}
		<p class="font-bold text-red-500">{error}</p>
	{/if}
	<form method="POST" action="?/register">
		<div class="grid gap-2">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input placeholder="email@exemplu.com" {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input placeholder="Parola" {...attrs} bind:value={$formData.password} type="password" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					Inregistreaza-te
				{/if}
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground">Sau</span>
		</div>
	</div>
	<Button variant="outline" type="button" on:click={() => goto('/auth/signup')}>Logheaza-te</Button
	>
</Card.Root>