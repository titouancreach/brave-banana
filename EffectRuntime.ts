import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect, Layer } from "effect";

export const MainLayer = Layer.mergeAll(NodeFileSystem.layer);

export const runEffect = <T, E>(
  program: Effect.Effect<T, E, Layer.Layer.Success<typeof MainLayer>>,
) => {
  return NodeRuntime.runMain(program.pipe(Effect.provide(MainLayer)));
};
