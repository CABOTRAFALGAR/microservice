import * as Joi from 'joi';

export type UserProjectPreferencesBody = Partial<{
  renderingOptions: {
    showBackfacingFaces: boolean;
    enableSSAO: boolean;
    specShading: boolean;
    enableTweaksCW: boolean;
    enableTweaksMW: boolean;
  };
}>;
export const userProjectPreferencesBody = Joi.object<UserProjectPreferencesBody>({
  renderingOptions: Joi.object({
    showBackfacingFaces: Joi.boolean(),
    enableSSAO: Joi.boolean(),
    specShading: Joi.boolean(),
    enableTweaksCW: Joi.boolean(),
    enableTweaksMW: Joi.boolean()
  }).options({ allowUnknown: true, stripUnknown: false })
})
  .options({ allowUnknown: true, stripUnknown: false })
  .required();

export type FindProjectParams = { projectId: string };
export const findProjectParams = Joi.object<FindProjectParams>({
  projectId: Joi.string().required()
}).required().options({ stripUnknown: true });

export type UserProjectPreferencesParsed = {
  userId: string;
  projectId: string;
  data: UserProjectPreferencesBody
};
