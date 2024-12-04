<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>ViMotion</title>
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
							href="/tutor"
							class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg"
						>
							Start Learning
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
