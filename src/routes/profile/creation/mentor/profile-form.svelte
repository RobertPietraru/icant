<script lang="ts" context="module">
	import { z } from 'zod';
	export const profileFormSchema = z.object({
		last_name: z.string().min(2, 'Introduceti un nume'),
		first_name: z.string().min(2, 'Introduceti un prenume'),
		gender: z.string().min(1, 'Introduceti un gen').default('male'),
		bio: z.string().min(4, 'Introduceti un bio').max(160)
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	export let data: SuperValidated<Infer<ProfileFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(profileFormSchema)
	});

	const { form: formData, enhance } = form;

	$: selectedGender = {
		label: $formData.gender == 'female' ? 'Femeie' : 'Barbat',
		value: $formData.gender
	};
</script>

<form
	method="POST"
	action="?/create"
	class="flex flex-col items-stretch space-y-8"
	use:enhance
	id="profile-form"
>
		<Form.Field {form} name="last_name">
			<Form.Control let:attrs>
				<Form.Label>Nume</Form.Label>
				<Input placeholder="Popescu" {...attrs} bind:value={$formData.last_name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="first_name">
			<Form.Control let:attrs>
				<Form.Label>Prenume</Form.Label>
				<Input placeholder="Ion" {...attrs} bind:value={$formData.first_name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="gender">
			<Form.Control let:attrs>
				<Form.Label>Gen</Form.Label>
				<Select.Root
					selected={selectedGender}
					onSelectedChange={(s) => {
						s && ($formData.gender = s.value);
					}}
				>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Selecteaza ceva" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="male" label="Barbat" />
						<Select.Item value="female" label="Femeie" />
					</Select.Content>
				</Select.Root>
				<input hidden name={attrs.name} bind:value={$formData.gender} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="bio">
			<Form.Control let:attrs>
				<Form.Label>Bio</Form.Label>
				<Textarea {...attrs} bind:value={$formData.bio} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="flex flex-row justify-center"><Form.Button>Creeaza profilul</Form.Button></div>
</form>
