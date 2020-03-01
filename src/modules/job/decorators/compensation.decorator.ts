import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export const IsGreaterThan = (property: string, validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
       registerDecorator({
           name: 'isGreaterThan',
           target: object.constructor,
           propertyName,
           constraints: [property],
           options: validationOptions,
           validator: {
               validate(value: number, args: ValidationArguments) {
                   const [relatedPropertyName] = args.constraints;
                   const relatedValue = (args.object as any)[relatedPropertyName];
                   return  typeof value === 'number' &&
                          typeof relatedValue === 'number' &&
                          value > relatedValue;
               },
           },
       });
  };
};
