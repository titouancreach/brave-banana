import { getInitialPharmacyState, runSimulation } from "./simulation.js";
import { Cause, Effect, Schema as S } from "effect";
import { FileSystem } from "@effect/platform";
import { DrugSnaphotsSchema } from "./Drug.js";
import { runEffect } from "./EffectRuntime.js";

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;

  const pharmacy = getInitialPharmacyState();
  const logs = runSimulation(pharmacy, 30);

  const encodedLog = yield* S.encode(DrugSnaphotsSchema)({ result: logs });

  yield* fs.writeFileString("output.json", `${encodedLog}\n`);
  yield* Effect.logInfo("Success");
}).pipe(
  Effect.catchAllCause((cause) => {
    return Effect.logError(Cause.pretty(cause));
  }),
);

runEffect(program);
