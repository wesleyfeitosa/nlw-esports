import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/covert-minutes-to-hour-string';

const app = express();
const prisma = new PrismaClient({
  log: ['query'],
});

app.use(express.json());
app.use(cors());

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          Ads: true,
        },
      },
    },
  });

  return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => {
  try {
    const gameId = request.params.id;
    const {
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel,
    } = request.body;

    const ad = await prisma.ad.create({
      data: {
        gameId,
        name,
        yearsPlaying,
        discord,
        weekDays: weekDays.join(','),
        hourStart: convertHourStringToMinutes(hourStart),
        hourEnd: convertHourStringToMinutes(hourEnd),
        useVoiceChannel,
      },
    });

    return response.status(201).json(ad);
  } catch (error) {
    return response
      .status(400)
      .json({ errorMessage: 'Não foi possível criar um novo ad!' });
  }
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId: string = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

app.get('/ads/:id/discord', async (request, response) => {
  try {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });

    return response.json({
      discord: ad.discord,
    });
  } catch (error) {
    return response
      .status(404)
      .json({ errorMessage: 'Discord não encontrado!' });
  }
});

app.listen(3333);
