import { Length } from "class-validator";

export default class AreaDto {

    id: number;

    /**
   * @example "Pontiank"
   */
    @Length(0, 20)
    area: string;
}