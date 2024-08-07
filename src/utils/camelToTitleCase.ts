export const camelToTitleCase = (inputString: string): string => {
  const titleCaseString = inputString.replace(/(\w)([A-Z])/g, '$1 $2');
  return titleCaseString.charAt(0).toUpperCase() + titleCaseString.slice(1);
};
