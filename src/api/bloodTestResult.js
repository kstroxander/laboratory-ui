import client from "./client";

const resolveRisks = (data) => client.post('/blood-test-results/resolve', data);

export default {
    resolveRisks
};