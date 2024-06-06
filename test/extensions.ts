import { expect } from 'chai';
import { describe, it } from 'mocha';
import { InstanceType, Validator } from '../src';


describe('check json schema arrow extensions work', () => {
  it("should validate int8 type", () => {
    const schema: { type: InstanceType, required: Array<string>, properties: any } = {
      type: 'object',
      required: [],
      properties: {
        int8: { type: 'int8' },
      }
    };

    const validator = new Validator(schema, '2019-09', true);
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

  it("should validate decimal type", () => {
    // need to add some more tests here to make sure precision and scale are actually valid
    // arrow supports decimal 128 and 256 - how does this translate to precision & scale
    const schema: { type: InstanceType, required: Array<string>, properties: any } = {
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

    const validator = new Validator(schema, '2019-09', true);
    const result1 = validator.validate({
      decimal: 10,
    });
    const result2 = validator.validate({
      decimal: 'hello',
    });
    const result3 = validator.validate({
      decimal: '285893939361211',
    });

    expect(result1.valid, 'decimal must be a string').equals(false)
    expect(result2.valid, 'decimal string must be a valid number').equals(false)
    expect(result3.valid, 'decimal string is a valid number').equals(true)
  })

  // it("should validate int16 type", () => {
  //   const schema: { type: InstanceType, required: Array<string>, properties: any } = {
  //     type: 'object',
  //     required: ['name', 'email', 'number', 'bool', 'int8'],
  //     properties: {
  //       name: { type: 'string' },
  //       email: { type: 'string', format: 'email' },
  //       number: { type: 'number' },
  //       bool: { type: 'boolean' },
  //       int8: { type: 'int8' },
  //     }
  //   };

  //   const validator = new Validator(schema, '2019-09', false);
  //   const result = validator.validate({
  //     name: 'hello',
  //     email: 5, // invalid type
  //     number: 'Hello', // invalid type
  //     bool: 'false', // invalid type
  //     int8: 10
  //   });

  //   expect(result.valid).equals(true)
  // })
})

