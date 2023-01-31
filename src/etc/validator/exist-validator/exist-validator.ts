import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { getConnection } from 'typeorm';

@Injectable()
export class ExistValidator implements ValidatorConstraintInterface {
    async validate(value: any, args:ValidationArguments){
        const find = {[args.constraints[1]]: args.value}
        const check = await getConnection().getRepository(args.constraints[0]).findOne(find)
        if(check) false
        return true
    }

    defaultMessage(args?: ValidationArguments): string {
        return `${args.property} ${args.value} has been used`
    }
}

export function IsExist(option:any, validationOption?: ValidationOptions){
    return function(object: any, propertyName: string){
        registerDecorator({
            name: 'IsExist',
            target: object.constructor,
            propertyName: propertyName,
            constraints: option,
            validator: validationOption,
            async: true
        })
    }
}