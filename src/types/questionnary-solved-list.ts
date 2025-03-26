import { z } from "zod";

// Subschemas
const federateUnitSchema = z.object({
  acronym: z.string(),
  name: z.string(),
});

const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  federateUnit: federateUnitSchema,
});

const neighborhoodSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const streetTypeSchema = z.object({
  acronym: z.string(),
  name: z.string(),
});

const streetSchema = z.object({
  id: z.number(),
  name: z.string(),
  streetType: streetTypeSchema,
});

const addressSchema = z.object({
  id: z.number(),
  cep: z.string(),
  street: streetSchema,
  neighborhood: neighborhoodSchema,
  city: citySchema,
});

const specificAddressSchema = z.object({
  number: z.string(),
  complement: z.string(),
  address: addressSchema,
});

const phoneSchema = z.object({
  number: z.string(),
  ddd: z.object({ ddd: z.number() }),
  ddi: z.object({ ddi: z.number() }),
});

const cpfSchema = z.object({ cpf: z.string() });

const genderSchema = z.object({
  acronym: z.string(),
  description: z.string(),
});

const studentSchema = z.object({
  id: z.number(),
  name: z.string(),
  specificAddress: specificAddressSchema,
  phoneList: z.array(phoneSchema),
  mainEmail: z.string(),
  recoveryEmail: z.string(),
  cpf: cpfSchema,
  gender: genderSchema,
  birthDate: z.string(),
});

const questionAlternativeSchema = z.object({
  id: z.number(),
  statement: z.string(),
  isCorrect: z.boolean(),
});

const questionDifficultyLevelSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

const subjectTopicSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  subject: subjectSchema,
});

const questionSchema = z.object({
  id: z.number(),
  applicationDate: z.string(),
  isGeneratedByAi: z.boolean(),
  name: z.string(),
  statementImageUrl: z.string(),
  statementImageLegend: z.string(),
  statement: z.string(),
  quantityOfCorrectAnswers: z.number(),
  quantityOfWrongAnswers: z.number(),
  quantityOfTries: z.number(),
  explanation: z.string(),
  videoExplanationUrl: z.string(),
  questionAlternativeList: z.array(questionAlternativeSchema),
  questionDifficultyLevel: questionDifficultyLevelSchema,
  subject: subjectSchema,
  subjectTopicList: z.array(subjectTopicSchema),
});

const questionnaireSchema = z.object({
  id: z.number(),
  name: z.string(),
  viewCounter: z.number(),
  questionList: z.array(questionSchema),
  isPublic: z.boolean(),
  student: studentSchema,
});

const solvedQuestionSchema = z.object({
  id: z.number(),
  isCorrect: z.boolean(),
  startDateTime: z.string(),
  endDateTime: z.string(),
  questionAlternative: questionAlternativeSchema,
  question: questionSchema,
});

export const solvedQuestionnaireResponseItemSchema = z.object({
  id: z.number(),
  startDateTime: z.string(),
  endDateTime: z.string(),
  quantityOfCorrectAnswers: z.number(),
  questionnaire: questionnaireSchema,
  solvedQuestionList: z.array(solvedQuestionSchema),
});

export const solvedQuestionnaireResponseSchema = z.array(solvedQuestionnaireResponseItemSchema);

export type SolvedQuestionnaireResponse = z.infer<typeof solvedQuestionnaireResponseSchema>;
export type SolvedQuestionnaireResponseItem = z.infer<typeof solvedQuestionnaireResponseItemSchema>;
