import { PropType } from 'vue';

type RequiredProp<T> = {
  type: PropType<T>;
  required: true;
  validator?(value: unknown): boolean;
};

type DefaultedProp<T> = {
  type: PropType<T>;
  default: T;
  validator?(value: unknown): boolean;
};

export const defineStringLiteralType = <LiteralType extends string>(
  allKeys: readonly LiteralType[],
): RequiredProp<LiteralType> => ({
  type: (String as unknown) as PropType<LiteralType>,
  required: true,
  validator: (value) => {
    const asKey = value as LiteralType;
    return allKeys.includes(asKey);
  },
});

export const defineStringLiteralTypeWithDefault = <LiteralType extends string>(
  allKeys: readonly LiteralType[],
  defaultValue: LiteralType,
): DefaultedProp<LiteralType> => ({
  type: (String as unknown) as PropType<LiteralType>,
  default: defaultValue,
  validator: (value) => {
    const asKey = value as LiteralType;
    return allKeys.includes(asKey);
  },
});

export const defineObjectType = <ObjectType>(): RequiredProp<ObjectType> => ({
  type: Object as PropType<ObjectType>,
  required: true,
});

export const defineNumberType = (): RequiredProp<number> => ({
  type: Number,
  required: true,
});

export const defineBooleanType = (defaultValue: boolean): DefaultedProp<boolean> => ({
  type: Boolean,
  default: defaultValue,
});
