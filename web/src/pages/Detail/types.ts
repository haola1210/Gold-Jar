import { type SpendingTagId, type IncomeTagId } from '@interfaces/tag.type';
import { type ActionType } from '@interfaces/action.type';
export type SpeOrIncDTO = {
  id: string;
  type: ActionType;
  subType: SpendingTagId | IncomeTagId;
  concurrency: number;
  detail: string;
};
