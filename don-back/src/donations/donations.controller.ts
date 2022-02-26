import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../config/pipes/parse-object-id.pipe';
import { BASE_ROUTE } from './constants/donation.tokens';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Types } from 'mongoose';

@Controller(BASE_ROUTE)
@ApiTags('/' + BASE_ROUTE)
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post('donate')
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.donationsService.findOne(id);
  }
}
