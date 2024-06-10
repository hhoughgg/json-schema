import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Schema, Validator } from '../src';


describe('check json schema arrow extensions work', () => {
  it("should validate int8 type", () => {
    const schema: Schema = {
      type: 'object',
      required: [],
      properties: {
        int8: { type: 'int8' },
      }
    };

    const validator = new Validator(schema, '2019-09', true)
    const result1 = validator.validate({
      int8: 10,
    });
    const result2 = validator.validate({
      int8: -500,
    });
    const result3 = validator.validate({
      int8: 51852,
    });
    const result4 = validator.validate({
      int8: 'fail',
    });

    expect(result1.valid, 'int8 valid when in range').equals(true)
    expect(result2.valid, 'int8 invalid when out of negative range').equals(false)
    expect(result3.valid, 'int8 invalid when out of positive range').equals(false)
    expect(result4.valid, 'int8 invalid when not a number').equals(false)
  })

  it("should validate float64 type", () => {
    const schema: Schema = {
      type: 'object',
      required: [],
      properties: {
        float64: { type: 'float64' },
      }
    };

    const validator = new Validator(schema, '2019-09', true)
    const result1 = validator.validate({
      float64: 10.842848298,
    });
    const result2 = validator.validate({
      float64: -500.878885,
    });
    const result3 = validator.validate({
      float64: 51852,
    });
    const result4 = validator.validate({
      float64: 'fail',
    });

    expect(result1.valid, 'float64 valid when in range').equals(true)
    expect(result2.valid, 'float64 valid when negative').equals(true)
    expect(result3.valid, 'float64 valid without floating point').equals(true)
    expect(result4.valid, 'float64 invalid when not a number').equals(false)
  })

  it("should validate timestamp_millis type", () => {
    const schema: Schema = {
      type: 'object',
      required: [],
      properties: {
        timestamp: { type: 'timestamp_millis' },
      }
    };

    const validator = new Validator(schema, '2019-09', true);
    const result1 = validator.validate({
      timestamp: 10353,
    });
    const result2 = validator.validate({
      timestamp: -500,
    });
    const result3 = validator.validate({
      timestamp: 5185253533,
    });
    const result4 = validator.validate({
      timestamp: 'fail',
    });

    expect(result1.valid, 'timestamp_millis valid when positive').equals(true)
    expect(result2.valid, 'timestamp_millis valid when negative').equals(true)
    expect(result3.valid, 'timestamp_millis valid when a large number').equals(true)
    expect(result4.valid, 'timestamp_millis invalid when not a number').equals(false)
  })

  it("should validate decimal type", () => {
    // need to add some more tests here to make sure precision and scale are actually valid
    // arrow supports decimal 128 and 256 - how does this translate to precision & scale
    const schema: Schema = {
      type: 'object',
      required: [],
      properties: {
        decimal: {
          type: 'decimal',
          precision: 10,
          scale: 0
        },
      }
    };

    const invalidSchema: Schema = {
      type: 'object',
      required: [],
      properties: {
        decimal: {
          type: 'decimal',
        },
      }
    };

    const validator = new Validator(schema, '2019-09', true);
    const invalidValidator = new Validator(invalidSchema, '2019-09', true);

    const result1 = validator.validate({
      decimal: 10,
    });
    const result2 = validator.validate({
      decimal: 'hello',
    });
    const result3 = validator.validate({
      decimal: '285893939361211',
    });
    const result4 = invalidValidator.validate({
      decimal: '285893939361211',
    });

    expect(result1.valid, 'decimal must be a string').equals(false)
    expect(result2.valid, 'decimal string must be a valid number').equals(false)
    expect(result3.valid, 'decimal string is a valid number').equals(true)
    expect(result4.valid, 'decimal schema with missing precision and scale should fail').equals(false)
  })
})

