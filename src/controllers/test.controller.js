import * as testService from "../services/test.service.js";

export async function getAll(req, res) {
    const data = await testService.getAll();
    res.send(data);
}
