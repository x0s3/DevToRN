import { combineEpics } from 'redux-observable';
import paEpics from './publishedArticles.epic';

export default combineEpics(...(Object as any).values(paEpics));
