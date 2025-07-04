import { Schema as S } from "effect";

const DrugNameSchema = S.Union(
  S.Literal("Herbal Tea", "Fervex", "Magic Pill", "Dafalgan", "Doliprane"),
  S.String,
);

export const DrugSnapShotSchema = S.Struct({
  name: DrugNameSchema,
  expiresIn: S.Number,
  benefit: S.Number,
});

export const DrugSnaphotsSchema = S.parseJson(
  S.Struct({ result: S.Array(S.Array(DrugSnapShotSchema)) }),
  { space: 2 },
);
export type DrugName = typeof DrugNameSchema.Type;
export type DrugSnapShot = typeof DrugSnapShotSchema.Type;
