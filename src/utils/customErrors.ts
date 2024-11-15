export const customErrors = async (err: any, defaultMessage: string) => {
  if (err.message) {
    return err.message;
  } else if (err.errors.messages) {
    const errors = err.errors.messages;
    return errors[0];
  } else {
    return defaultMessage;
  }  
};
