// import * as lessonRepository from "../repositories/lesson.repository.js";
import { lessonRepository } from "../repositories/lesson.repository.js";

export const lessonService = {
    getAll: async () => {
        return await lessonRepository.getAll();
    },

    getOneById: async (lessonId) => {
        return await lessonRepository.getOneById(lessonId);
    },

    insertOne: async (item) => {
        return await lessonRepository.insertOne(item);
    },

    updateOne: async (id, item) => {
        return await lessonRepository.updateOne(id, item);
    },

    deleteOneById: async (id) => {
        return await lessonRepository.deleteOneById(id);
    },
};
