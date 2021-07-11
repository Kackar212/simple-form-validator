import { createFromPath, getFromPath, put } from './utilities';
import errorsMessages from './errors';

export default class Validator {
  constructor(errors) {
    this.errors = errors;
  }

  messages(errors) {
    this.errors = {
      ...this.errors,
      ...errors,
    }
  }

  validateValue(rules, value) {
    const errors = [];
    Object.entries(rules).forEach(([rule, args]) => {
      if (rule === 'one') return;
      if (!this[rule](value, ...args)) {
        errors.push(this.errors[rule](...args));
      }
      
      this.isValid = !errors.length;
      if (this.isAllValid === null || this.isAllValid) {
        this.isAllValid = this.isValid;
      }
    });

    return errors;
  }

  validate(values, schema) {
    this.isAllValid = null;

    const errors = {};
    Object.entries(schema).forEach(([name, rules]) => {
      createFromPath(name, [], errors);
      const vals = getFromPath(name, values);
      const isRequired = (rules.required || [])[0];
      const onlyFirstValid = (rules.one || [])[0];

      if (isRequired || vals) {
          this.isValid = true; 
          if (Array.isArray(vals)) {
            if (!vals.length) {
              return put(name, errors, (obj) => obj.push(this.validateValue(rules)));
            }

            for (const val of vals) {
              put(name, errors, obj => obj.push(this.validateValue(rules, val)));
              if (this.isValid && onlyFirstValid) {
                put(name, errors, []);
                break;
              }
            }
          } else {
            put(name, errors, (obj) => obj.push(...this.validateValue(rules, vals)));
          }
      }
    });
    return [errors, this.isAllValid];
  }

  extend(ruleName, func, error) {
    if (error) {
      this.errors[ruleName] = error;
    }

    this[ruleName] = fn;
  }

  required(value) {
    return !!value;
  }

  minLength(value, min) {
    return value.length >= min;
  }

  maxLength(value, max) {
    return value.length <= max;
  }

  isEmail(value) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+))*$/.test(value);
  }
}

const validator = new Validator(errorsMessages);
export const validateSchema = {
  create() {
    return {
      schema: {},
      add(names, rules) {
          names.forEach(name => {
            if (!this.schema[name]) {
              this.schema[name] = {};
            }
            
            Object
              .entries(rules)
              .map(([method, args]) => {
                if (args === undefined) args = [];
                if (!Array.isArray(args)) args = [args];
    
                this.schema[name][method] = args;
              });
          });
    
          return this;
      }
    }
  },
}
