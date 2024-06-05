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

    expect(result1.valid).equals(true)
    expect(result2.valid).equals(false)
    expect(result3.valid).equals(false)
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

