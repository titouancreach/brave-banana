# Doc

# Step 1

Since the README mentions that the code needs refactoring, the first step is to add tests. These tests will ensure that we don’t break anything during the process.

I wrote a test for each business rule and also added a test that compares the result of our simulation with the contents of output.json. This helps catch any regressions.

At this point, there is some duplication in the code, but I'll address it in the next commits.
