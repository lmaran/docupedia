import { userRepository } from "../repositories/user.repository.js";

export const userService = {
    getAll: async () => {
        return await userRepository.getAll();
    },
};
