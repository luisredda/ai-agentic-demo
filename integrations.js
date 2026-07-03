"use strict";

const integrations = [
  {
    name: "Open-Meteo",
    description: "Public weather API used by optional demos.",
    requiresApiKey: false,
  },
];

function listIntegrations() {
  return integrations.map((integration) => ({
    name: integration.name,
    description: integration.description,
    requiresApiKey: integration.requiresApiKey,
  }));
}

if (require.main === module) {
  console.log(JSON.stringify(listIntegrations(), null, 2));
}

module.exports = { listIntegrations };
