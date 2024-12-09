<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import X from 'lucide-svelte/icons/x';

	let { children, data } = $props();
	let isOpen = $state(true);
</script>

<Sidebar.Provider
	open={isOpen}
	onOpenChange={(o) => {
		isOpen = o;
	}}
>
	<Sidebar.Root>
		<Sidebar.Header>
			<Sidebar.Group
				onclick={() => {
					isOpen = false;
				}}
				class="cursor-pointer"
			>
				<Sidebar.GroupLabel>Close sidebar</Sidebar.GroupLabel>
				<Sidebar.GroupAction title="Close">
					<X /> <span class="sr-only">Close</span>
				</Sidebar.GroupAction>
				<Sidebar.GroupContent />
			</Sidebar.Group>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="font-medium">Roadmap</Sidebar.MenuButton>
						{#if data.roadmap?.steps?.length}
							<Sidebar.MenuSub>
								{#each data.roadmap.steps as item (item.stepNumber)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton>
											{#snippet child({ props })}
												<a href={`/tutor/${data.roadmap?.id}?step=${item.stepNumber}`} {...props}
													>{item.exerciseId}</a
												>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						{/if}
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Footer />
	</Sidebar.Root>
	<main class="w-full overflow-hidden">
		<Sidebar.Trigger />

		{@render children?.()}
	</main>
</Sidebar.Provider>
