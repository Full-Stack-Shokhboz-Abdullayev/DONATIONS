import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';

export class CreateDonationDto {
  @ApiProperty({
    description: 'The amount of the donation',
    example: '40',
  })
  @Min(1, {
    message: 'Amount required',
  })
  amount: number;

  @ApiProperty({
    description: 'The currency of the donation',
    example: 'USD',
  })
  @IsString({
    message: 'Currency required',
  })
  currency: string;
}
