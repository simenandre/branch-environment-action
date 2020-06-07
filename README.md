# Branch-based Environment Variable Action

This Github Actions parses environment variables into one variable based on what branch the workflow is running on.

## Usage

```yaml
jobs:
  up:
    name: Important Stuff
    runs-on: ubuntu-latest
    steps:
    ...
      - uses: cobraz/branch-environment-action@master
        with:
            name: MASTER_KEY
        env:
          DEVELOP_MASTER_KEY: ${{ secrets.DEVELOP_MASTER_KEY }}
          MASTER_MASTER_KEY: ${{ secrets.MASTER_MASTER_KEY }}
          NEXT_MASTER_KEY: ${{ secrets.NEXT_MASTER_KEY }}
      - run: ./do-something-important $MASTER_KEY
    ...
```

PS: The branch name will be _uppercased_ eg. `master` will be transformed to `MASTER`.
