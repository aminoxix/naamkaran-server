import { ChildEnum, WordedEnum } from '@prisma/client';

export const favPrompt = ({
  name,
  background,
  hobby,
  animal,
  aim,
  worded,
}: {
  aim: string;
  name: string;
  hobby: string;
  animal: string;
  background: string;
  worded: WordedEnum;
}) => {
  return `I'd like a ${worded.toLowerCase()}-word name. Here are some details about me to help create the coolest username possible. Please generate only usernames no other information.
Follow this principle:
- Fill any spaces with underscores.
- Use all lowercase.

  Name: ${name}
  My goal: ${aim}
  I love doing: ${hobby}
  Favorite animal: ${animal}
  My background: ${background}
`;
};

export const comboPrompt = ({
  partner1,
  partner2,
  gender,
}: {
  partner1: string;
  partner2: string;
  gender: ChildEnum;
}) => {
  return `I'd like to generate all valid possible child names based on the partners' names that have meaningful interpretations. Could you please provide a list of ${gender.toLowerCase()} child names along with their meanings only?
Note:
- Don't generate any other cover information
- Every possibilities deserves a new line

  Partner 1 First Name: ${partner1}
  Partner 2 First Name: ${partner2}
`;
};
