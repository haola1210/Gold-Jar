import { v4 as uuid } from 'uuid';

export const mockdata = [
  {
    key: 1,
    header: 'Tiền điện: 500k',
    description: '',
    type: 'INCOME',
  },
  {
    key: 2,
    header: 'Tiền nước: 500k',
    description: '',
    type: 'SPENDING',
  },
  {
    key: 3,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'INCOME',
  },
  {
    key: 4,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'INCOME',
  },
  {
    key: 5,
    header:
      'Tiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xeTiền sửa xe: 500k',
    description:
      'Đi giữa đàng thủng lốp Đi giữa đàng thủng lốpĐi giữa đàng thủng lốpĐi giữa đàng thủng lốpĐi giữa đàng thủng lốpĐi giữa đàng thủng lốpĐi giữa đàng thủng lốpĐi giữa đàng thủng lốpĐi giữa đàng thủng lốpĐi giữa đàng thủng lốp',
    type: 'SPENDING',
  },
  {
    key: 6,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'INCOME',
  },
  {
    key: 7,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'SPENDING',
  },
  {
    key: 8,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'SPENDING',
  },
  {
    key: 9,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'SPENDING',
  },
  {
    key: 10,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'INCOME',
  },
  {
    key: 11,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'SPENDING',
  },
  {
    key: 12,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'INCOME',
  },
  {
    key: 13,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'INCOME',
  },
  {
    key: 14,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'INCOME',
  },
  {
    key: 15,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'INCOME',
  },
  {
    key: 16,
    header: 'Tiền sửa xe: 500k',
    description: 'Đi giữa đàng thủng lốp',
    type: 'SPENDING',
  },
];

export const mockDataResponse = [
  {
    id: uuid(),
    type: 'SPENDING',
    subType: 'EXPENSE',
    concurrency: 100000,
    detail: 'đóng tiền nước',
  },
  {
    id: uuid(),
    type: 'SPENDING',
    subType: 'SAVING',
    concurrency: 100000,
    detail: 'nhặt được 100k nên bỏ zô tiết kiệm',
  },
  {
    id: uuid(),
    type: 'SPENDING',
    subType: 'ENJOYMENT',
    concurrency: 25000,
    detail: '3 tiếng ngồi net với bát mì tôm trứng',
  },
  {
    id: uuid(),
    type: 'INCOME',
    subType: 'SALARY',
    concurrency: 90000000,
    detail: 'Lương tháng 12 + 13 + 14, cty thưởng nhiều thích ghê',
  },
  {
    id: uuid(),
    type: 'SPENDING',
    subType: 'EXPENSE',
    concurrency: 1000000,
    detail: 'đi nhậu',
  },
  {
    id: uuid(),
    type: 'INCOME',
    subType: 'PARENT',
    concurrency: 10000000,
    detail: 'khen má đẹp má ting ting 10 củ hehe',
  },
];
