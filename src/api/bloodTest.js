import client from "./client";

const getOne = (id) => client.get(`/blood-tests/${id}`);
const getAll = (params) => client.get('/blood-tests', {params});
const create = (data) => client.post('/blood-tests', data);

export default {
    getOne,
    getAll,
    create
};