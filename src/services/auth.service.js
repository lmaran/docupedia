import * as entityService from "./entity.service.js";

export const getSignupViewData = async (entityData, errors) => {
    const entityMeta = await entityService.getEntityMeta("user");

    return entityService.getFormData(entityMeta, "create", entityData, errors);
};

export const getUserSignupData = async (reqBody) => {
    const entityMeta = await entityService.getEntityMeta("user");
    const entityData = entityService.getEntityData(reqBody, entityMeta, "create");
    return entityData;
};

export const validate = async (entityData) => {
    const entityMeta = await entityService.getEntityMeta("user");
    return await entityService.validate(entityData, entityMeta, "create");
};
