<script>
    import { ingredients } from "$lib/stores/useless";
</script>

<div>
	<p>Ingrédients</p>
</div>
<div>
	<table>
		<thead>
			<tr>
				<th>Ingrédient</th>
			</tr>
		</thead>
		<tbody>
			{#each $ingredients as ingredient}
				<tr>
					<td>{ingredient.nom}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
