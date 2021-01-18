import { httpHandler } from '@commons/http-handler';
import { Router } from 'express';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import { postsService } from '../service';
import { markdownParser } from '../service/parsing-file';

export const tilRouter = Router();

const FILE_KEY = 'blog-post';

tilRouter.post(
  '/upload',
  httpHandler(async (req, res) => {
    const file = req.files[FILE_KEY];
    if (!file) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'No File Uploaded with correct field'
      );
    }
    res.send('File Uploaded');

    const blogJson = await markdownParser(file.data);
    await postsService.addRecord(blogJson);
  })
);

tilRouter.get(
  '/',
  httpHandler(async (req, res) => {
    const { query } = req.query;
    const results = await postsService.fetchRecords(query);
    res.send(results);
  })
);

tilRouter.get(
  '/tags/:tag',
  httpHandler(async (req, res) => {
    const { tag } = req.params;
    const results = await postsService.fetchByTag(tag);
    res.send(results);
  })
);

tilRouter.get(
  '/id/:record_id',
  httpHandler(async (req, res) => {
    const { record_id: recordId } = req.params;
    const result = await postsService.getRecord(recordId);
    res.send(result);
  })
);

tilRouter.put(
  '/id/:record_id',
  httpHandler(async (req, res) => {
    const { record_id: recordId } = req.params;
    const file = req.files[FILE_KEY];
    const blogJson = await markdownParser(file.data);
    const result = await postsService.updateRecord({
      id: recordId,
      data: blogJson,
    });
    res.send(result);
  })
);

tilRouter.delete(
  '/id/:record_id',
  httpHandler(async (req, res) => {
    const { record_id: recordId } = req.params;
    await postsService.deleteRecord(recordId);
    res.send(StatusCodes.OK);
  })
);
