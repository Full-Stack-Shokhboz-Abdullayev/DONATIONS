import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './config/filters/exception.filter';
import { AppConfigModule } from './config/app-config.module';
import { DonationsModule } from './donations/donations.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './config/interceptors/transform.interceptor';

@Module({
  imports: [AppConfigModule, DonationsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
