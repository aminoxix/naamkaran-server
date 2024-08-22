import { WordedEnum } from '@prisma/client';

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
  return `I'd like a few ${worded.toLowerCase()}-word username. Here are some details about me to help create the coolest username possible. Please generate only usernames no other information.
Follow this principle:
- Fill any spaces with underscores.
- Use all lowercase.

  Name: ${name}
  My background: ${background}
  I love doing: ${hobby}
  Favorite animal: ${animal}
  My goal: ${aim}
`;
};
