<script lang="ts" context="module">
	import { z } from 'zod';
	export const listingFormSchema = z.object({
		title: z.string().min(2, 'Introduceti un titlu'),
		description: z.string().min(2, 'Introduceti o descriere'),
		session_price: z.number(),
		session_duration: z.number().min(15, 'Introduceti o durata')
	});
	export type ListingFormSchema = typeof listingFormSchema;
</script>

<script lang="ts">
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	export let data: SuperValidated<Infer<ListingFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(listingFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form
	method="POST"
	action="?/create"
	class="flex flex-col items-stretch space-y-8"
	use:enhance
	id="profile-form"
>
		<Form.Field {form} name="title">
			<Form.Control let:attrs>
				<Form.Label>Nume</Form.Label>
				<Input placeholder="Curs engleza incepatori" {...attrs} bind:value={$formData.title} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="description">
			<Form.Control let:attrs>
				<Form.Label>Prenume</Form.Label>
				<Input placeholder="Cursul va continue 4 module, in care vei invata sa spui cum te cheama" {...attrs} bind:value={$formData.description} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="session_price" inputmode="numeric">
			<Form.Control let:attrs>
				<Form.Label>session_price</Form.Label>
				<Textarea {...attrs} bind:value={$formData.session_price} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="session_duration" inputmode="numeric">
			<Form.Control let:attrs>
				<Form.Label>session_duration</Form.Label>
				<Textarea    {...attrs} bind:value={$formData.session_duration} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<div class="flex flex-row justify-center"><Form.Button>Creeaza profilul</Form.Button></div>
</form>
