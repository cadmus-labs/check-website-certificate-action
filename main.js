/*
 * Cadmus Labs - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Cadmus Labs.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Cadmus Labs.
 *
 * Website: https://cadmus-labs.github.io
 *
 * © 2023 Cadmus Labs. All rights reserved.
 */

const core = require("@actions/core");
const http = require("@actions/http-client");

const websiteOracleHost = "website-oracle.p.rapidapi.com";

try {
  const apiKey = core.getInput("apiKey");
  const host = core.getInput("host");

  const client = new http.HttpClient("website-oracle");
  const endpointUrl = "https://" + websiteOracleHost + "/certificate";
  console.log("Sending request to Website Oracle (" + endpointUrl + ")");
  client
    .postJson(
      endpointUrl,
      {
        host: host,
      },
      {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": websiteOracleHost,
      },
    )
    .then((response) => {
      const apiStatusCode = response.statusCode;
      const verification = response.result?.verification;
      console.log(
        "Received response from Website Oracle (statusCode: " +
          apiStatusCode +
          ")",
      );
      if (
        (apiStatusCode - (apiStatusCode % 100)) / 100 === 2 &&
        verification !== undefined
      ) {
        console.log();
        if (verification.isValid) {
          console.log(
            "✅ Certificate valid on host: " +
              host +
              " at " +
              verification.timestamp,
          );
        } else {
          core.setFailed(
            "❌ Certificate verification failed at " +
              verification.timestamp +
              ": " +
              verification.errorMessage,
          );
        }
      } else {
        core.setFailed(
          "Error response from Website Oracle: " +
            response.result?.errorMessage,
        );
      }
    })
    .catch((error) => {
      core.setFailed("Failed to call Website Oracle: " + error.message);
    });
} catch (error) {
  core.setFailed("Action execution failed: " + error.message);
}
