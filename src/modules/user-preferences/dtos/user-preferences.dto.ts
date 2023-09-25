import * as Joi from 'joi';

export type UserPreferencesBody = Partial<{
  toolsPreferences: {
    showCameraToolbar: boolean;
    showMaterialStackTool: boolean;
    showSelectionTool: boolean;
    showMaterialCallout: boolean;
    showReviewModeColorCallout: boolean;
  };
  favorites: Array<string>;
  recents: Array<string>;
  theme: string;
  regularLayout: object;
  currentWorkspace: string;
  inspectorLayout: object;
  uiPreferences: {
    viewportBackground: object;
    displaysEnvironment: boolean;
    outlineName: string;
    view3DStyle: boolean;
    flatShading: boolean;
    flatShadingThickness: string;
    socklinerMode: boolean;
    applyColorsToStitches: boolean;
    applyColorsToEdges: boolean;
  };
  hideLibraries: Array<string>;
  hidePalettes: Array<string>;
}>;

export const usersPreferencesBody = Joi.object<UserPreferencesBody>({
  toolsPreferences: Joi.object({
    showCameraToolbar: Joi.boolean(),
    showMaterialStackTool: Joi.boolean(),
    showSelectionTool: Joi.boolean(),
    showMaterialCallout: Joi.boolean(),
    showReviewModeColorCallout: Joi.boolean(),
  }).options({ allowUnknown: true, stripUnknown: true }),
  recents: Joi.array().items(Joi.string()).allow(null),
  favorites: Joi.array().items(Joi.string()).allow(null),
  theme: Joi.string().allow(null),
  regularLayout: Joi.object({}).options({ allowUnknown: true, stripUnknown: false }),
  currentWorkspace: Joi.string().allow(null),
  inspectorLayout: Joi.object({}).options({ allowUnknown: true, stripUnknown: false }),
  uiPreferences: Joi.object({
    viewportBackground: [
      Joi.string().allow(null),
      Joi.object({}).options({ allowUnknown: true, stripUnknown: false })
    ],
    environment: Joi.object({
      uri: Joi.string().allow(null)
    }).options({ allowUnknown: true, stripUnknown: false }),
    displaysEnvironment: Joi.boolean(),
    view3DStyle: Joi.boolean(),
    flatShading: Joi.boolean(),
    flatShadingThickness: Joi.string().allow(null),
    socklinerMode: Joi.boolean(),
    applyColorsToStitches: Joi.boolean(),
    applyColorsToEdges: Joi.boolean(),
  }).options({ allowUnknown: true, stripUnknown: true }),
  hideLibraries: Joi.array().items(Joi.string()).allow(null),
  hidePalettes: Joi.array().items(Joi.string()).allow(null)
})
  .options({ allowUnknown: true, stripUnknown: true })
  .required();

export type UserPreferencesParsed = {
  userId: string;
  data: UserPreferencesBody;
};
