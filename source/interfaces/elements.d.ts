/**
 * Tipo para inferir uma children do React
 */
export type ReactChildren = React.ReactNode | React.ReactNode[];

/**
 * Abstração de tipo genérica para elementos Anchor
 * Simula o mesmo comportamento de *React.AnchorHTMLAttributes\<Type\>*
 *
 * @param Type Tipo genérico a ser aplicado no construtor
 *
 */
export type ReactAnchor<Type> = React.AnchorHTMLAttributes<Type>;

/**
 * Abstração de tipo genérica para elementos button
 * Simula o mesmo comportamento de *React.ButtonHTMLAttributes\<Type\>*
 *
 * @param Type Tipo genérico a ser aplicado no construtor
 */
export type ReactButton<Type> = React.ButtonHTMLAttributes<Type>;

/**
 * Abstração de tipo genérica para elementos de input
 * Simula o mesmo comportamento de *React.InputHTMLAttributes\<Type\>*
 *
 * @param Type Tipo genérico a ser aplicado no construtor
 */
export type ReactInput<Type> = React.InputHTMLAttributes<Type>;

/**
 * Abstração de tipo genérica para elementos svg
 * Simula o mesmo comportamento de *React.SVGProps\<Type\>*
 *
 * @param Type Tipo genérico a ser aplicado no construtor
 */
export type ReactSVG<Type> = React.SVGProps<Type>;
