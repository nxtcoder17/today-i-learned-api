import assert from 'assert';
import { PostsDBModule } from '../models';

const service = {};

service.addRecord = async (data) => {
  if ('date' in data) {
    const r = await service.fetchRecords({ date: data.date });
    if (r.length > 0) {
      assert(r.length === 1);
      return service.updateRecord({ id: r[0]._id, data });
    }
  }
  return PostsDBModule.posts.create(data);
};

service.fetchRecords = async (query = {}) => PostsDBModule.posts.find(query);

service.fetchByTag = async (tag) => PostsDBModule.posts.find({ tags: tag });

service.getRecord = async (id) => PostsDBModule.posts.findById(id);

service.updateRecord = async ({ id, data }) =>
  PostsDBModule.posts.updateOne({ _id: id }, data, {
    new: true,
  });

service.deleteRecord = async (id) => PostsDBModule.posts.deleteOne({ _id: id });

export const postsService = service;
