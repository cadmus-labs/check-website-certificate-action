# Check Website Certificate

This action uses the website oracle to check the certificate of a website. It will fail if the certificate had expired so that you can detect it before end users are affected by them.

## Inputs

| Input    | Description                                                                                          | Default Value  |
| -------- | ---------------------------------------------------------------------------------------------------- | -------------- |
| `apiKey` | [API Key for Website Oracle](https://rapidapi.com/cadmus-labs-cadmus-labs-admin/api/website-oracle/) | N/A (Required) |
| `url`    | The hostname of the website of which the certificate should be checked                               | N/A (Required) |

Website Oracle is currently available through [Rapid API](https://rapidapi.com/cadmus-labs-cadmus-labs-admin/api/website-oracle/). Subscribe to the API and get a token from Rapid API which can be used to call the Website Oracle.

## Examples

Please us the `<VERSION>` with the exact version tag you wish to use.

```yaml
name: Check Certificate

on:
  workflow_run:
    workflows:
      - pages-build-deployment
    types:
      - completed
  schedule:
    - cron: 0 0 * * SUN

jobs:
  check-certificate:
    runs-on: ubuntu-latest
    name: Check Certificate
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
      - name: Check Website Certificate
        uses: cadmus-labs/check-website-certificate-action@<VERSION>
        with:
          apiKey: ${{ secrets.WEBSITE_ORACLE_API_KEY }}
          host: "cadmus-labs.github.io"
```
