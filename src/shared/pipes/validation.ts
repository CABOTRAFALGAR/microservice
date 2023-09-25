import { BadRequestException, Body, Param, PipeTransform, Query } from '@nestjs/common';
import { ObjectSchema } from 'joi';

export class Schema<T> implements PipeTransform {
  public constructor(private readonly schema: ObjectSchema<T>) {}

  public transform(data: any): T {
    const { error, value } = this.schema.validate(data);

    if (error) {
      throw new BadRequestException(`Validation failed: ${ error.message }`);
    }

    return value;
  }
}

export const ParamSchema = <T>(schema: ObjectSchema<T>) => Param(new Schema(schema));

export const BodySchema = <T>(schema: ObjectSchema<T>) => Body(new Schema(schema));

export const QuerySchema = <T>(schema: ObjectSchema<T>) => Query(new Schema(schema));
