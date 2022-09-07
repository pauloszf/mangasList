import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import MangaListController from '../controllers/MangaListController';

const mangaListRouter = Router();
const mangaListController = new MangaListController();

mangaListRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  mangaListController.show
);

mangaListRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      mangas: Joi.required(),
    },
  }),
  mangaListController.create
);

export default mangaListRouter;
