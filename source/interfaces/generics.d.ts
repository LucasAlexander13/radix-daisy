/**
 * Generic type for argument functions
 */
export type GenericProps = (...args: any[]) => any;

/**
 * Defines the required props to be passed to CVA.
 */
export type ClassProps<T> = Concrete<T> & { className: string }

/**
 * Generates a typing with all properties as value form.
 * @param Type - Type or interface to be treated
 *
 * @example
 * type Keys<{ name: string, age?: number }>
 * => new 'name' | 'age'
 */
export type Keys<Type> = keyof Type;

/**
 * Maps properties and their values.
 * @param Type - Type or interface to be treated
 *
 * @example
 * type Mapped<{ name: string, age?: number }>
 * => new { name: string, age?: number | undefined }
 */
export type Mapped<Type> = {
	[Property in Keys<Type>]: Type[Property]
};

/**
 * Applies a homogeneous typing for all properties.
 * @param Type - Type or interface to be treated
 * @param ValueType - Type or interface to assign to properties
 *
 * @example
 * type Change<{ name: string, age?: number }, boolean>
 * => new { name: boolean, age?: boolean | undefined }
 */
export type Change<Type, ValueType> = {
	[Property in Keys<Type>]: ValueType
};

/**
 * Joins two types through a union.
 * @param Type - Type or interface to be treated
 * @param Other - Type or interface for union
 *
 * @example
 * type Union<{ name: string, age?: number }, { id: number }>
 * => new { name: string, age?: number | undefined, id: number }
 */
export type Union<Type, Other> = Type & Other

/**
 * Changes all properties declared as readonly.
 * @param Type - Type or interface to be treated
 *
 * @example
 * type Mutable<{ name: string, age?: number, readonly id: number }>
 * => new { name: string, age?: number | undefined, id: number }
 */
export type Mutable<Type> = {
	-readonly [Property in Keys<Type>]: Type[Property]
};

/**
 * Transforms all optional properties into required.
 * @param Type - Type or interface to be treated
 *
 * @example
 * type Concrete<{ name: string, age?: number }>
 * => new { name: string, age: number }
 */
export type Concrete<Type> = {
	[Property in Keys<Type>]-?: Exclude<Type[Property], null | undefined>
};

/**
 * Defines a list that must have more than one item.
 * @param Type - Typing applied to list elements.
 * @param Length - (Optional) Number of fixed elements in the list.
 *
 * @example
 * type FixedArray<string>
 * => new [string, ...string[]]
 *
 * type FixedArray<number[], 3>
 * => new [number[], number[], number[]]
 */
export type FixedArray<Type, Length extends number = never> =
Type extends any ?
	[Length] extends [never] ?
		[Type, ...Type[]]
	: [Type, ...Type[]] & { length: Length }
: never;

/**
 * Validates whether the given type is `never` in order to apply the replacer or the value.
 * @param Type - Type or interface to be verified.
 * @param Replacer - (Optional: `never`) Type to be applied if `Type` is `never`.
 * @param Value - (Optional: `Type`) Type to be applied if `Type` is not `never`.
 *
 * @example // without additional arguments
 * type NeverReplacer<{ name: string, age: number }> =
 * if ([{ name: string, age?: number }] extends [never]) {
 *    => new never
 * } else {
 *    => new { name: string, age?: number }
 * }
 *
 * @example // with replacer (second argument)
 * type NeverReplacer<{ name: string, age: number }, string> =
 * if ([{ name: string, age?: number }] extends [never]) {
 *    => new string
 * } else {
 *    => new { name: string, age?: number }
 * }
 *
 * @example // with value (third argument)
 * type NeverReplacer<{ name: string, age: number }, never, number> =
 * if ([{ name: string, age?: number }] extends [never]) {
 *    => new never
 * } else {
 *    => new number
 * }
 *
 * @example // with replacer and value (both arguments)
 * type NeverReplacer<{ name: string, age: number }, string, number> =
 * if ([{ name: string, age?: number }] extends [never]) {
 *    => new string
 * } else {
 *    => new number
 * }
 */
export type NeverReplacer<Type, Replacer = never, Value = Type> =
	[Type] extends [never] ? Replacer : Value
;

/**
 * Allows creating a custom type according to control properties, also defining extra properties for each case.
 *
 * @param Type - Base interface to obtain dynamic properties.
 * @param Key - Property of `Type` to be validated as truthy.
 * @param TrueProps - Type applied if `Key` is `true`.
 * @param FalseProps - Type applied if `Key` is `false`.
 *
 * @example
 * interface IUser {
 *     name: string
 *     age?: number
 *     employee?: boolean
 *     id: number
 * }
 *
 * const user: Exclusive<IUser, 'employee',
 *     { name: string, employee: boolean, salary: number, id: number },
 *     { name: string, age?: number, salary?: never, id?: never }
 * >
 *
 * if (IUser['employee'] extends [true]) {
 *    => { name: string, employee: boolean, salary: number, id: number }
 * } else {
 *    => { name: string, age?: number, salary?: never, id?: never }
 * }
 */
export type Exclusive<Type, Props extends keyof Type, TrueProps, FalseProps> =
	Type[Props] extends false | null | undefined | '' | 0 | -0 | NaN ? FalseProps : TrueProps
;

/**
 * Typing to be extended by styled components with CVA.
 * Creates an object containing properties useful for visualization and handling of props.
 *
 * @param Attributes - React's default typing for HTML attributes.
 * @param Variances - CVA's default typing for variants.
 * @param Children - (Optional) overrides the number of children.
 *
 * @returns Object containing the following properties:
 *
 * - **attributes**: attributes that can be passed to the element.
 * - **children**: receives the ReactNode passed to the component.
 * - **styles**: receives a string to apply custom styles.
 * - **...**: attributes that serve as CVA's own arguments.
 *
 * @example
 * type Attributes = ReactButton<HTMLButtonElement>
 * type Variances = VariantProps<typeof ButtonStyle>;
 *
 * interface IButtonProps extends BaseProps<Attributes, Variances> = {
 *     attributes?: attributes specific to the <button> tag.
 *     children?: JSX children placed inside the component.
 *     class?: string containing custom tailwind properties.
 *     ... // properties that can be passed to CVA.
 *     ...props // other props passed within the interface.
 * }
 *
 * | // It's possible to use only one of the arguments or none.
 *
 * type BaseProps<never, Variances> // no HTML attributes.
 * type BaseProps<Attributes, never> // no CVA styling.
 * type BaseProps // no CVA styling and no HTML attributes.
 *
 * | // if no arguments are passed to the type:
 * type BaseProps = {
 *     children?: React.ReactNode | React.ReactNode[]
 *     class?: string
 * }
 *
 * | // if the third argument is passed, applies to children:
 * type BaseProps<never, never, FixedArray<React.ReactNode, 2>> = {
 *     children?: [React.ReactNode, React.ReactNode]
 *     class?: string
 * }
 *
 * | // interesting values for the third argument:
 * never // defines components without children (self-closing tags)
 * JSX.Element | string // exactly one child is required
 * FixedArray<JSX.Element> // more than one child is required
 * FixedArray<JSX.Element, 3> // exactly three children are required
 *
 */
export type BaseProps<Attributes = never, Variances = never, Children = ReactChildren> =
	NeverReplacer<Variances,
		NeverReplacer<Attributes,
			// no Attributes and no Variances
			{
				children?: NeverReplacer<Children>
				class?: string
			},
			// with Attributes and no Variances
			{
				attributes?: Attributes
				children?: NeverReplacer<Children>
				class?: string
			}
		>,
		NeverReplacer<Attributes,
			// no Attributes and with Variances
			{
				children?: NeverReplacer<Children>
				class?: string
			} & Variances,
			// with Attributes and with Variances
			{
				attributes?: Attributes
				children?: NeverReplacer<Children>
				class?: string
			} & Variances
		>
	>
;
