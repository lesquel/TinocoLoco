export const construcUrl = ({ options }: { options: any }) => {
  let url = "?";

  for (const [key, value] of Object.entries(options)) {
    if (value) {
      url += `${key}=${value}&`;
    }
  }

  return url;
};
