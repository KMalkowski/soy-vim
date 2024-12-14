<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import X from 'lucide-svelte/icons/x';
	import Info from 'lucide-svelte/icons/info';
	import Gift from 'lucide-svelte/icons/gift';
	import { isInstructionsOpen, isBonusOpen } from './tutor-store';
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
												<a
													href={`/tutor/${data.roadmap?.id}?step=${item.stepNumber}`}
													onclick={() => ($isInstructionsOpen = true)}>{item.exercise?.title}</a
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
		<div class="flex items-center justify-between">
			<Sidebar.Trigger />
			<div class="flex gap-2">
				<Button
					size="sm"
					class="gap-2"
					onclick={() => {
						isInstructionsOpen.update((o) => !o);
					}}
				>
					<Info /> Show instructions
				</Button>
				<Button
					size="sm"
					variant="outline"
					class="gap-2"
					onclick={() => {
						isBonusOpen.update((o) => !o);
					}}
				>
					<Gift /> Show bonus
				</Button>
			</div>
			<a href="/">
				<Button variant="outline" size="sm" class="gap-2">
					<X /> Close Editor
				</Button>
			</a>
		</div>
		{@render children?.()}
	</main>
</Sidebar.Provider>
