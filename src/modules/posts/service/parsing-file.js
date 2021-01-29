/* eslint-disable no-restricted-syntax */

import { getLogger } from '@commons/logger';

const logger = getLogger('parsing-file.js');

export async function markdownParser(buffer) {
  const content = buffer.toString();
  const lines = content.split('\n');

  let indexStart;
  let indexEnd;
  const data = lines.reduce(
    (acc, curr, i) => {
      const temp = {};
      let blog = '';
      if (/^---$/.test(curr)) {
        if (indexStart == null) {
          indexStart = i;
        } else if (!indexEnd) {
          indexEnd = i;
        }
      }
      if (indexStart != null && i > indexStart && (!indexEnd || i < indexEnd)) {
        const splits = lines[i].split(':');
        const key = splits[0];
        const value = splits.slice(1).join(':');
        temp[key] = value.trim();
        console.log(key, value);
      }

      if (indexEnd && i > indexEnd) {
        blog = lines[i];
      }
      return { ...acc, ...temp, content: [...acc.content, blog] };
    },
    { content: [] }
  );

  data.tags = 'tags' in data ? data.tags.split(',') : [];
  data.content = 'content' in data ? data.content.join('\n') : '';
  logger.info('Parsed Document: ', data);
  return data;
}
