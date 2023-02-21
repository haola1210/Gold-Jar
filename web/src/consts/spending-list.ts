/**
 * Title: string,
 * description: sring,
 * color: tailwind color
 * activeColor: tailwind color (color + 200)
 * outlineColor: tailwind color ({color}-400)
 */
import type { SpendingTag } from '@interfaces/tag.type';
import { SpendingTagId } from '@interfaces/tag.type';

export const spendingList: SpendingTag[] = [
  {
    id: SpendingTagId.EXPENSE,
    title: 'CHI TIÊU',
    description: 'Các chi trả cho các nhu cầu thiết yếu, sinh hoạt hàng ngày của cuộc sống.',
    color: 'bg-red-400',
    activeColor: 'bg-red-600',
    outlineColor: 'outline-red-400',
  },
  {
    id: SpendingTagId.SAVING,
    title: 'TIẾT KIỆM',

    description:
      'Tiết kiệm cho những mục tiêu dài hạn, lớn hạn như mua xe, mua nhà, sinh em bé, thực hiện ước mơ...',
    color: 'bg-yellow-400',
    activeColor: 'bg-yellow-600',
    outlineColor: 'outline-yellow-400',
  },
  {
    id: SpendingTagId.EDUCATION,
    title: 'GIÁO DỤC',

    description:
      'Dành tiền cho việc học thêm, trau dồi kiển thức của bạn thân, mua sách, tham gia các khóa học, đào tạo...',
    color: 'bg-teal-400',
    activeColor: 'bg-teal-600',
    outlineColor: 'outline-teal-400',
  },
  {
    id: SpendingTagId.ENJOYMENT,
    title: 'HƯỞNG THỤ',

    description:
      'Khoản tiền dành cho việc hưởng thụ, mua sắm xa xỉ, chăm lo cho bản thân, làm những việc mới mẻ, tăng cường trải nghiệm...',
    color: 'bg-violet-400',
    activeColor: 'bg-violet-600',
    outlineColor: 'outline-violet-400',
  },
  {
    id: SpendingTagId.INVESTMENT,
    title: 'ĐẦU TƯ',

    description:
      'Hãy đầu tư để tạo ra thu nhập thụ động như gửi tiết kiệm, đầu tư chứng khoán hay bất động sản, góp vốn kinh doanh...',
    color: 'bg-green-400',
    activeColor: 'bg-green-600',
    outlineColor: 'outline-green-400',
  },
  {
    id: SpendingTagId.DONATION,
    title: 'TỪ THIỆN',

    description:
      'Khoản tiền bạn sử dụng để làm từ thiện, giúp đỡ cộng đồng, người thân, bạn bè những hoàn cảnh khó khăn...',
    color: 'bg-sky-400',
    activeColor: 'bg-sky-600',
    outlineColor: 'outline-sky-400',
  },
];

export const spendingMapper = spendingList.reduce((mapper, item) => {
  mapper[item.id] = item;
  return mapper;
}, {} as Record<SpendingTagId, SpendingTag>);
