import * as lessonService from "../services/lesson.service.js";
import * as lessonViewDataProvider from "../viewDataProviders/lesson.view-data-provider.js";

export const getAll = async (req, res) => {
    const data = await lessonViewDataProvider.getListVD();

    //res.send(data);
    res.render("lesson/lesson-list", data);
};

export const getOneById = async (req, res) => {
    const lessonId = req.params.lessonId;

    const data = await lessonViewDataProvider.getReadVD(lessonId);

    //res.send(data);
    res.render("lesson/lesson-read", data);
};

export const createOrEditGet = async (req, res) => {
    const lessonId = req.params.lessonId;

    const formData = await lessonViewDataProvider.getFormData(lessonId);

    //res.send(data);
    res.render("lesson/lesson-create-or-edit", formData);
};

export const createOrEditPost = async (req, res) => {
    const lessonId = req.params.lessonId;
    const isEditMode = !!lessonId;

    const lesson = {
        name: req.body.name,
        description: req.body.description,
    };

    let result;
    if (isEditMode) {
        lesson.id = lessonId;
        result = await lessonService.updateOne(lesson);
    } else {
        result = await lessonService.insertOne(lesson);
    }
    if (!result.isValid) {
        const formData = await lessonViewDataProvider.getFormData(lessonId, result.errors, lesson);
        return res.render("lesson/lesson-create-or-edit", formData);
    }

    res.redirect(`/lectii`);
};

export const deleteOneById = async (req, res) => {
    const lessonId = req.params.lessonId;

    await lessonService.deleteOneById(lessonId);

    res.redirect(`/lectii`);
};
