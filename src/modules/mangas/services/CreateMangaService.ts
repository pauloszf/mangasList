import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import Manga from "../typeorm/entities/Manga";
import { MangaRepository } from "../typeorm/repositories/MangaRepository";

interface IRequest {
  mangaName: string;
  cap: number;
}

class CreateMangaService {
  public async execute({mangaName, cap}: IRequest) : Promise<Manga>{
    const mangaExists = await MangaRepository.findByName(mangaName);

    if(mangaExists) {
        throw new AppError('There is alredy one manga with this name');
    }

    //const redisCache = new RedisCache();

    const manga = MangaRepository.create({
      mangaName,
      cap
    });

    await RedisCache.invalidate('api-MANGA_LIST');

    await MangaRepository.save(manga);

    return(manga);
  }
}

export default CreateMangaService;
