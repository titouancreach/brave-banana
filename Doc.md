# Doc

## Step 1

Since the README mentions that the code needs refactoring, the first step is to add tests. These tests will ensure that we don’t break anything during the process.

I wrote a test for each business rule and also added a test that compares the result of our simulation with the contents of output.json. This helps catch any regressions.

At this point, there is some duplication in the code, but I'll address it in the next commits.

## Step 2

Another way to test the code is by adding types. My first idea was to convert the code to TypeScript. There is a scenario where it is acceptable, if the rest of the code is written in TypeScript, and `pharmacy.js` is still in js because we didn't take the time to convert it yet. This scenario usually happens during a big rewrite (JavaScript to TypeScript migration.)

However, in our case, there’s no evidence that the rest of the codebase uses TypeScript — everything appears to be written in JavaScript, and it all works as-is.

Additionally, the test instructions specify that we must stay compatible with the public API. This means:

- The file name must remain unchanged (e.g. pharmacy.js) to avoid breaking existing imports.
- Migrating the file to TypeScript would break compatibility for callers written in JavaScript.
- Alternatively, it would require an additional transpilation step to strip the types.

This looks like a decision we should make with the team.

So, there's a middle-ground solution using [@ts-check](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html). It allows us to check types without breaking any code that calls our code."

## Step 3

We are now pretty confident about refactoring the code. So let's identify the potential issue we want to address:

- **The business rules for updating drugs are all mixed together**, making it hard to test each rule in isolation. Nested ternaries also make the code harder to read and maintain.

  - We can break each rule into small functions and compose them to build more complex logic.

- **There are unnecessary side effects.**

  - We can refactor this into a pure (or mostly pure) function, which will make the behavior more predictable and easier to test.

- **There is duplication**, some of which I introduced in step one.

  - Refactoring how the simulation works will help eliminate this duplication.

- **Serialization is handled outside the domain model.**
  - We can move the serialization logic into the `Drug` class by implementing a standard `toJSON()` method.
    This keeps all related logic in one place and prevents exposing uncontrolled or unnecessary properties.

I'll use the "imperative shell, functional core" principle and try to isolate side effects.

## Step 4

We now want to implement the new drug, Dafalgan.
We'll start by writing the tests first (TDD), then proceed with the implementation.

## Final notes

- I chose **not** to migrate the codebase to TypeScript to avoid breaking the public API and any dependent services. Instead, I added TypeScript JSDoc comments (`@ts-check`) to enable type validation without altering file names or build steps. Note that the CI still checks the validity of the types.
- I didn't put too much effort in reorganizing the folder structure, as it's often subjective. The modular design makes it easy to refactor or move files later.
- There is a dedicated pull request for each step described in this document.
- Each commit follows a chronological narrative, reflecting the reasoning and decisions made along the way.
- I spent approximately **2h** on this assignment. (Note: commit timestamps may not accurately reflect this, as I worked on other tasks concurrently.)

Thanks in advance for taking the time to review this code. I'm looking forward to your feedback!
