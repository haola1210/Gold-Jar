/* eslint-disable max-len */
import type { IncomeTag } from '@interfaces/tag.type';
import { IncomeTagId } from '@interfaces/tag.type';

export const incomeList: IncomeTag[] = [
  {
    id: IncomeTagId.SALARY,
    title: 'LƯƠNG',
    description:
      'Chồi non háo hức đang đợi mưa, rất giống em đợi lương. Lương ơi hãy về nhanh lên, cháy túi đến nơi rồi...',
    color: 'bg-red-400',
    activeColor: 'bg-red-600',
    outlineColor: 'outline-red-400',
  },
  {
    id: IncomeTagId.SUB_JOB,
    title: 'NGHỀ TAY TRÁI',
    // eslint-disable-next-line max-len
    description:
      'Nguồn tiền từ các công việc khác ngoài công việc chính. "Chỉ có lao động mới đem lại giá trị thặng dư"',
    color: 'bg-yellow-400',
    activeColor: 'bg-yellow-600',
    outlineColor: 'outline-yellow-400',
  },
  {
    id: IncomeTagId.PARENT,
    title: 'BU TA CHI',
    // eslint-disable-next-line max-len
    description: 'Bu = Bố, Ta = Tui, Chi = Cho :) \n Lâu lâu được cho tiền thiệc là zui xướng',
    color: 'bg-teal-400',
    activeColor: 'bg-teal-600',
    outlineColor: 'outline-teal-400',
  },
  {
    id: IncomeTagId.UN_INVESTMENT,
    title: 'GIẢM ĐẦU TƯ',
    // eslint-disable-next-line max-len
    description:
      'Bạn không nên rút tiền từ việc đầu tư mà nên tái đầu tư. Tuy nhiên đôi khi không thể tránh được!',
    color: 'bg-violet-400',
    activeColor: 'bg-violet-600',
    outlineColor: 'outline-violet-400',
  },
  {
    id: IncomeTagId.LOTERY,
    title: 'THẦN TÀI ĐẾN',
    // eslint-disable-next-line max-len
    description:
      'Trúng số à? Xin chân thành chúc mừng bạn vì bạn sắp có nhiều a/e họ hàng xa. Hãy sử dụng tiền thông minh nhé!',
    color: 'bg-green-400',
    activeColor: 'bg-green-600',
    outlineColor: 'outline-green-400',
  },
];
