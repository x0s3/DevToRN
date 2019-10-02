import { ajax } from 'rxjs/ajax';

interface Options {
  mainURL: string;
}

const options: Options = {
  mainURL: 'https://dev.to/api'
};

export default { ajax, options } as const;
