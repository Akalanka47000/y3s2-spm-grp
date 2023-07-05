import { Joi } from 'celebrate';

class Base {
  static get schema() {
    return {
      HOST: Joi.string().optional(),
      PORT: Joi.number().optional(),
      JWT_SECRET: Joi.string().required(),
      ACCESS_TOKEN_EXPIRY: Joi.string().optional(),
      REFRESH_TOKEN_EXPIRY: Joi.string().optional(),
      USER_SERVICE_BASE_URL: Joi.string().required(),
    };
  }
  static get values() {
    return {
      HOST: process.env.HOST ?? 'localhost',
      PORT: process.env.PORT ?? 2001,
      JWT_SECRET: process.env.JWT_SECRET,
      ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY ?? '1h',
      REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY ?? '1d',
      USER_SERVICE_BASE_URL: process.env.USER_SERVICE_BASE_URL,
    };
  }
}

const config = Base.values;

const { error } = Joi.object(Base.schema).validate(config);

if (error) {
  console.error(`Environment validation failed. \nDetails - ${error.details[0].message}\nExiting...`)
  process.exit(1);
}

export default config;