import { IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class createCategory {
    @Expose()
    @IsString()
    public name?: string

    @Expose()
    @IsNumber()
    public age?: number
}