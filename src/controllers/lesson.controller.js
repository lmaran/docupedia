import * as lessonService from "../services/lesson.service.js";

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
    const isEditMode = !!lessonId;

    const data = { isEditMode };

    if (isEditMode) {
        const lesson = await lessonService.getOneById(lessonId);
        data.lesson = lesson;
    }

    //res.send(data);
    res.render("lesson/lesson-create-or-edit", data);
};

export const createOrEditPost = async (req, res) => {
    const { name, description } = req.body;
    const lessonId = req.params.lessonId;

    const isEditMode = !!lessonId;

    const lesson = {
        name,
        description,
    };

    let result;
    if (isEditMode) {
        lesson.id = lessonId;
        result = await lessonService.updateOne(lesson);
    } else {
        result = await lessonService.insertOne(lesson);
    }

    console.log(result);

    // if (!result.isValid) {
    //     // console.log(result);
    //     // console.log(lesson);
    //     // const data = { lesson };
    //     const formData = lessonService.getFormData(lesson, result.errors);
    //     console.log(formData);

    //     const data = { lesson: { name: formData.formFields[0].value, description: formData.formFields[1].value } };
    //     return res.render("lesson/lesson-create-or-edit", data);
    // }

    res.redirect(`/lectii`);
};

export const deleteOneById = async (req, res) => {
    const lessonId = req.params.lessonId;

    await lessonService.deleteOneById(lessonId);

    res.redirect(`/lectii`);
};
