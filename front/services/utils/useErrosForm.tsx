export const useErrorsForm = ({
  response,
  setExternalErrors,
}: {
  response: any;
  setExternalErrors: any;
}) => {
  if (response.errors) {
    const formattedErrors = Object.fromEntries(
      Object.entries(response.errors).map(([field, messages]) => [
        field,
        Array.isArray(messages) ? messages.join(", ") : messages,
      ]),
    );

    setExternalErrors(formattedErrors);
  }
};
