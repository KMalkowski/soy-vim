<script lang="ts">
	import { initVimMode } from 'monaco-vim';
	import type { Action } from 'svelte/action';
	import { editor, Position } from 'monaco-editor';
	import { dracula } from '$lib/themes/dracula';
	import '$lib/monaco-config';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	const { data } = $props();
	let currentChar = $state('');

	editor.defineTheme('dracula', dracula);
	let dialogOpen = $state(true);

	const mountEditor: Action = (node) => {
		$effect(() => {
			const editorInstance = editor.create(node, {
				language: 'javascript',
				automaticLayout: true,
				lineNumbers: 'relative',
				value: data.exercise.code || '',
				theme: 'dracula',
				fontSize: 20,
				foldingStrategy: 'indentation',
				minimap: { enabled: false },
				folding: true
			});

			editorInstance.trigger('editor', 'editor.action.formatDocument', null);
			const position = new Position(2, 8);
			editorInstance.setPosition(position);
			editorInstance.focus();

			const vimMode = initVimMode(
				editorInstance,
				document.getElementsByClassName('vim-status-bar')[0] as HTMLElement
			);

			editorInstance.onDidChangeCursorPosition((e) => {
				const model = editorInstance.getModel();
				if (model) {
					const position = editorInstance.getPosition();
					if (position) {
						const lineContent = model.getLineContent(position.lineNumber);
						currentChar = lineContent[position.column - 1] || '';
					}
				}
			});

			return () => {
				editorInstance.dispose();
				vimMode.dispose();
			};
		});
	};

	$effect(() => {
		if (currentChar === '#') {
			alert('o majn god, jestes glupi');
		}
	});
</script>

<div use:mountEditor class="editor"></div>
<div class="vim-status-bar"></div>

<Dialog.Root open={dialogOpen}>
	<Dialog.Content class="min-w-96">
		<Dialog.Header>
			<Dialog.Title>Instructions</Dialog.Title>
			<Dialog.Description>{@html data.exercise.instructions}</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer
			onclick={() => {
				dialogOpen = false;
			}}><Button>Let's go!</Button></Dialog.Footer
		>
	</Dialog.Content>
</Dialog.Root>

<!-- <p class="prose">
	First things first, one of the ways vim motions will make you faster is by removing the need of
	moving your hands away from your keyboard to edit code or move around the file tree 🤲. The most
	common example of that is picking your mouse to navigate to scroll / click on another place in
	your code. <br /><br />Let&apos;s fix this by learning the basics of the vim Normal mode which is
	used to move around the file. As you can see on the status bar on the bottom of the editor
	you&apos;re in the <span class="text-green-500">—NORMAL—</span> mode by default. Let&apos;s stay
	here and figure out how to be faster on the keyboard than with the mouse. Your first motions →
	<span class="text-orange-500">h,j,k,l</span>. Yes, moving your right hand to the arrow keys counts
	as moving away from the keyboard and makes you slower, boooo. Use these keys instead, go!
</p> -->

<style>
	.editor {
		height: calc(100vh - 3.5em);
		width: 100%;
	}

	.vim-status-bar {
		width: 100%;
		height: 1.5em;
		background: var(--background);
	}
</style>
