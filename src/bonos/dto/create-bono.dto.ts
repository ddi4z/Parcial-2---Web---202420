import { IsInt } from "class-validator";


export class CreateBonoDto {
  @IsInt()
  usuarioId;

  @IsInt()
  claseId;
}
