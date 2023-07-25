const validateRequest = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    const errorMessage = error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '');
    return errorMessage;
  }
  return;
};

export default validateRequest;
