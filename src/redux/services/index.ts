import { ajax } from 'rxjs/ajax';

interface Options {
  headers: {
    'api-key': string;
  };
  mainURL: string;
}

const options: Options = {
  mainURL: 'https://dev.to/api',
  headers: {
    'api-key': require('../../../secrets.ts').DEV_API_KEY
  }
};

export default { ajax, options } as const;
