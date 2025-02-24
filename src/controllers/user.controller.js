// import * as userService from "../services/user.service.js";
import { userService } from "../services/user.service.js";

export const getAll = async (req, res) => {
    const data = await userService.getAll();
    //const data = await userService.getOneByEmail("asd");

    // const data = await userService;
    console.log(data);
    // console.log(await data);
    // console.log(await data.getAll());
    // res.send(data);
    res.send("aaa");
};

export const getUser = (req, res) => {
    const userId = req.params.id;
    // Simulating a database call
    const user = { id: userId, name: "John Doe" };

    if (user.id == 999) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
};
