import * as Joi from "joi";

const JoiValidation = Joi.object({
  //Kafka
  KAFKA_HOST: Joi.string().required(),
  KAFKA_ID: Joi.string().required(),
  KAFKA_TOPIC: Joi.string().required(),
});

export default JoiValidation;