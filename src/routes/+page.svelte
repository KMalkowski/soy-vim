<script lang="ts">
	// import Counter from './Counter.svelte';s
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<svelte:head>
	<title>Soy Vim</title>
	<meta
		name="description"
		content="Learn Vim motions in a guided way and enhance your productivity today."
	/>
</svelte:head>

<section>
	<div class="relative">
		<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div class="text-center">
				<h2 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
					<span class="block">Supercharge Your</span>
					<span class="block text-indigo-600">Text Editing Speed</span>
				</h2>
				<p
					class="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
				>
					Master Vim motions in for your existing workflow with our interactive learning platform.
					Start with the essentials and progress to advanced techniques at your own pace.
				</p>
				<div class="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
					<div class="rounded-md shadow">
						<a
							href="/tutor/1?step=1"
							class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg"
						>
							Start Learning
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<h2
		class="mt-10 w-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 sm:max-w-[70%]"
	>
		What's this Soy Vim about?
	</h2>

	<Accordion.Root type="single" class="w-full sm:max-w-[70%]">
		<Accordion.Item value="item-4">
			<Accordion.Trigger>
				It's for devs who just want to code faster and not spend hours tunig their setup.
			</Accordion.Trigger>
			<Accordion.Content>
				Let's make a minimalistic todo list of things you need to have to use vim motions. The goal
				is to make it have the least friction possible to use vim motions efficiently.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-1">
			<Accordion.Trigger
				>You don't have to leave your lovely vs code / cursor to use vim.</Accordion.Trigger
			>
			<Accordion.Content
				>Just install a plugin and you're good to go. Optionally change a couple of settings on your
				computer for better experience.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger
				>Soy vim has a built in editor that you can use to practice your motions.</Accordion.Trigger
			>
			<Accordion.Content>
				Yep, you can check if you like the motions right here right now and implement them in your
				workflow later when you're ready.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger>
				You can learn the motions in a guided way, with a step by step approach and a clear roadmap.
			</Accordion.Trigger>
			<Accordion.Content>
				Forget figuring out which motions to learn first. Just follow the roadmap and you'll be
				ready to go.
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>

	<!-- <Counter /> -->
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
