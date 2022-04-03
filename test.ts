import { Expose, instanceToPlain, plainToInstance } from "class-transformer";
import { IsInt, IsNumber, IsString, Max, Min, validate, ValidationError } from "class-validator";
import 'reflect-metadata';

let body = {
    name: "Edy Koffi",
    age: "14",
    ecole: {
        name: "Esatic",
        local: "Treichville"
    }
}

class Category {
    @Expose()
    @IsString()
    public name?: string

    @Expose()
    @IsString()
    public age?: number

    @Expose()
    @IsString()
    public local?: string
}

const dtoObj = plainToInstance(Category, body, {enableImplicitConversion: true, excludeExtraneousValues: true })
console.log(dtoObj);

validate(dtoObj, { skipMissingProperties: false })
    .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
            const dtoErrors = errors.map((error: ValidationError) =>
                (Object as any).values(error.constraints)).join(", ");
            console.log(dtoErrors);

        } else {
            let object = instanceToPlain(dtoObj, {  exposeUnsetFields: false })
            console.log(object);
        }
    }
    );
