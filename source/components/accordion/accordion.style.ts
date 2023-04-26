import { cva } from 'class-variance-authority';


export const ItemStyle = cva([
	'collapse rounded-box collapse-arrow w-80 m-3',
	'radix-state-open:collapse-open radix-state-open:border radix-state-closed:collapse-close',
]);

export const HeaderStyle = cva([
	'collapse-title',
], {
	variants: {
		intent: {
			neutral: ['bg-neutral-focus', 'text-neutral-content'],
			primary: ['bg-primary-focus', 'text-primary-focus-content'],
			secondary: ['bg-secondary-focus', 'text-secondary-focus-content'],
		},
	},
	defaultVariants: { intent: 'neutral' },
});
export const ContentStyle = cva([
	'collapse-content p-4',
], {
	variants: {
		intent: {
			neutral: ['bg-neutral', 'text-neutral-content'],
			primary: ['bg-primary', 'text-primary-content'],
			secondary: ['bg-secondary', 'text-secondary-content'],
		},
	},
	defaultVariants: { intent: 'neutral' },
});
