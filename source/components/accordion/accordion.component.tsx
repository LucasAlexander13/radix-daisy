import { Accordion } from '@primitives/radix';
import { IAccordionProps } from './accordion.interface';
import { ItemStyle, HeaderStyle, ContentStyle } from './accordion.style';

export function AccordionComponent(props: IAccordionProps): JSX.Element {
	return (
		<Accordion.Root type='multiple' disabled={props.disabled}>
			{props.itens.map((item, index) => {
				return (
					<>
						<Accordion.Item className={ItemStyle()} value={`item-${index}`}>
							<Accordion.Trigger className={HeaderStyle({ intent: props.intent })}>
								{item.label}
							</Accordion.Trigger>
							<Accordion.Content className={ContentStyle({ intent: props.intent })}>
								{item.content}
							</Accordion.Content>
						</Accordion.Item>
					</>
				);
			})}
		</Accordion.Root>
	);
}
