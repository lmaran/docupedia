import { lessonService } from "../services/lesson.service.js";

export const createGet = async (req, res) => {
    const data = {};
    res.render("lesson/lesson-create-or-edit", data);
};

export const createPost = async (req, res) => {
    const { name, description } = req.body;

    const lesson = {
        name,
        description,
    };

    await lessonService.insertOne(lesson);

    res.redirect(`/lectii`);
};

export const getAll = async (req, res) => {
    const lessons = await lessonService.getAll();
    const data = { lessons };

    //res.send(data);
    res.render("lesson/lesson-list", data);
};

export const getOneById = async (req, res) => {
    const lessonId = req.params.lessonId;
    const lesson = await lessonService.getOneById(lessonId);
    const data = { lesson };

    //res.send(data);
    res.render("lesson/lesson", data);
};

export const createOrEditGet = async (req, res) => {
    const lessonId = req.params.lessonId;
    const lesson = await lessonService.getOneById(lessonId);
    const data = { lesson };

    //res.send(data);
    res.render("lesson/lesson-create-or-edit", data);
};

export const createOrEditPost = async (req, res) => {
    const { name, description } = req.body;
    const _id = req.params.lessonId;

    const lesson = {
        name,
        description,
    };

    await lessonService.updateOne(_id, lesson);

    res.redirect(`/lectii`);
};

export const deleteOneById = async (req, res) => {
    const lessonId = req.params.lessonId;

    await lessonService.deleteOneById(lessonId);

    res.redirect(`/lectii`);
};
