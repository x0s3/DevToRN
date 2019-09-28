import { combineEpics } from 'redux-observable';
import publishedEpics from './publishedArticles.epic';

export default combineEpics(...(Object as any).values(publishedEpics));
