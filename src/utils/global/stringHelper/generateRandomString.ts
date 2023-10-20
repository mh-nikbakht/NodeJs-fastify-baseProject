import randomstring from "randomstring";

export const randomString = (length: number, isNumeric: boolean): string => {
  return randomstring.generate({
    length,
    charset: isNumeric ? "numeric" : "alphabetic",
  });
};
