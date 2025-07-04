import { getInitialPharmacyState, runSimulation } from "./simulation.js";
import { describe, expect } from "vitest";
import { it } from "@effect/vitest";
import { Effect, Schema as S } from "effect";
import { FileSystem } from "@effect/platform";
import { NodeFileSystem } from "@effect/platform-node";
import { DrugSnaphotsSchema } from "./Drug.js";

describe("output.json regression", () => {
  it.effect("should match the committed output.json exactly", () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      const expected = yield* fs.readFileString("output.json");
      const pharmacy = getInitialPharmacyState();
      const logs = runSimulation(pharmacy, 30);
      const encodedLog = yield* S.encode(DrugSnaphotsSchema)({ result: logs });

      const encodedLogWithExtraNewline = `${encodedLog}\n`;

      expect(encodedLogWithExtraNewline).toEqual(expected);
    }).pipe(Effect.provide(NodeFileSystem.layer)),
  );
});
