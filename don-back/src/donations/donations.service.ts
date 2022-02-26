import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from './entities/donation.entity';
import { Types } from 'mongoose';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<Donation>,
  ) {}
  async create(createDonationDto: CreateDonationDto) {
    const donation = await this.donationModel.create(createDonationDto);

    if (!donation) {
      throw new BadRequestException('Donation not created');
    }
    return { message: 'Thank you for your donation!' };
  }

  async findAll() {
    return { data: await this.donationModel.find() };
  }

  async findOne(id: Types.ObjectId) {
    return { data: await this.donationModel.findById(id) };
  }
}
