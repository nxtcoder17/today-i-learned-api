import AuthModule from './auth';
import './db';
import { PostsModule } from './posts';

const modules = [AuthModule, PostsModule];

export async function loadModules(expressApp) {
  const p = modules.map(({ init }) => init(expressApp));
  return Promise.all(p);
}
