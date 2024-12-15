import { writable } from 'svelte/store';

export const isInstructionsOpen = writable(true);
export const isBonusOpen = writable(false);
export const currentRoadmapStep = writable(1);
