import { getLogger } from '@commons/logger';
import mongoose from 'mongoose';

const logger = getLogger('db/index');
(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    logger.info(
      `Successfully connected to Mongo running @ ${process.env.DB_URL}`
    );
  } catch (arr) {
    logger.error(`Failed connecting to mongo runnning @ ${process.env.DB_URL}`);
  }
})();
