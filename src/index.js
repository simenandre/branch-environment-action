const core = require("@actions/core");

const run = () => {
  const variableName = core.getInput("name", {
    required: true,
  });

  const rawBranchName = process.env.GITHUB_REF;

  if (!rawBranchName) {
    throw new Error("Was not able to get branchName");
  }

  const branchName = rawBranchName.replace("refs/heads/", "").toUpperCase();

  core.exportVariable(variableName, process.env[`${branchName}_${variableName}`]);
};

run();
