import { ReactButton } from '@interfaces/elements';
import { BaseProps } from '@interfaces/generics';
import { VariantProps } from 'class-variance-authority';
import { HeaderStyle, ContentStyle } from './accordion.style';

export type Variances = VariantProps<typeof HeaderStyle> & VariantProps<typeof ContentStyle>
export type Attributes = ReactButton<HTMLButtonElement>;

export interface IAccordionProps extends BaseProps<Attributes, Variances, never> {
	itens: {
		label: React.ReactNode, // TODO: implementar label-component
		content: React.ReactNode | React.ReactNode[],
	}[]
	disabled?: boolean,
}
