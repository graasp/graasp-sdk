/**
 * This code was adapted from the `validator.js` package
 * https://github.com/validatorjs/validator.js/tree/master
 */
import { countChars, merge } from './utils.js';

const upperCaseRegex = /^[A-Z]$/;
const lowerCaseRegex = /^[a-z]$/;
const numberRegex = /^\d$/;
const symbolRegex = /^[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./\\ ]$/;

const defaultOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
};
type PasswordOptions = typeof defaultOptions;

type PasswordAnalysis = {
  length: number;
  uniqueChars: number;
  uppercaseCount: number;
  lowercaseCount: number;
  numberCount: number;
  symbolCount: number;
};

/* Return information about a password */
function analyzePassword(password: string): PasswordAnalysis {
  const charMap = countChars(password);
  const analysis = {
    length: password.length,
    uniqueChars: Object.keys(charMap).length,
    uppercaseCount: 0,
    lowercaseCount: 0,
    numberCount: 0,
    symbolCount: 0,
  };
  Object.keys(charMap).forEach((char) => {
    /* istanbul ignore else */
    if (upperCaseRegex.test(char)) {
      analysis.uppercaseCount += charMap[char];
    } else if (lowerCaseRegex.test(char)) {
      analysis.lowercaseCount += charMap[char];
    } else if (numberRegex.test(char)) {
      analysis.numberCount += charMap[char];
    } else if (symbolRegex.test(char)) {
      analysis.symbolCount += charMap[char];
    }
  });
  return analysis;
}

function scorePassword(
  analysis: PasswordAnalysis,
  scoringOptions: PasswordOptions,
): number {
  let points = 0;
  points += analysis.uniqueChars * scoringOptions.pointsPerUnique;
  points +=
    (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;
  if (analysis.lowercaseCount > 0) {
    points += scoringOptions.pointsForContainingLower;
  }
  if (analysis.uppercaseCount > 0) {
    points += scoringOptions.pointsForContainingUpper;
  }
  if (analysis.numberCount > 0) {
    points += scoringOptions.pointsForContainingNumber;
  }
  if (analysis.symbolCount > 0) {
    points += scoringOptions.pointsForContainingSymbol;
  }
  return points;
}

/**
 * Score the password based on the requirements
 * @param str input password string
 * @param options define password requirements that need to be met
 * @returns the password score
 */
export function getPasswordScore(
  str: string,
  options: Partial<PasswordOptions>,
): number {
  const analysis = analyzePassword(str);
  const newOptions = merge(options || {}, defaultOptions);
  return scorePassword(analysis, newOptions);
}

/**
 * Validate if password follows the requirements
 * @param str input password string
 * @param options defines requirements to be met by the password
 * @returns whether the password is strong according to the requirements
 */
export function isStrongPassword(
  str: string,
  options: Partial<PasswordOptions>,
) {
  const analysis = analyzePassword(str);
  const newOptions = merge(options || {}, defaultOptions);
  return (
    analysis.length >= newOptions.minLength &&
    analysis.lowercaseCount >= newOptions.minLowercase &&
    analysis.uppercaseCount >= newOptions.minUppercase &&
    analysis.numberCount >= newOptions.minNumbers &&
    analysis.symbolCount >= newOptions.minSymbols
  );
}
