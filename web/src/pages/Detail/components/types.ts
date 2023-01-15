import { type ActionType } from '@interfaces/action.type';
import { type IncomeTagId, type SpendingTagId } from '@interfaces/tag.type';

export type IRecordHeader = {
  type: ActionType;
  tagId: SpendingTagId | IncomeTagId;
  concurrency: number;
};

export type IRecordBody = {
  detail: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
};
