import client from "./client";

const getAll = () => client.get("/measurable-properties");

export default {
    getAll
};