import * as lessonService from "../services/lesson.service.js";

export const getReadVD = async (lessonId) => {
    const lesson = await lessonService.getOneById(lessonId);

    const data = { lesson };

    return data;
};

export const getCreateOrEditVD = async (lessonId) => {
    const isEditMode = !!lessonId;
    const data = { isEditMode };

    if (isEditMode) {
        const lesson = await lessonService.getOneById(lessonId);
        data.lesson = lesson;
    }

    return data;
};

export const getListVD = async () => {
    const lessons = await lessonService.getAll();
    const data = { lessons };

    return data;
};
