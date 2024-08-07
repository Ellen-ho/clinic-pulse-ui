export const toSentenceCaseFormat = (underscoreUpperCase: string): string => {
    return underscoreUpperCase
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b(\w)/g, (s) => s.toUpperCase());
};
