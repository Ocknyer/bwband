export const TICKETS = 100;
export const TICKET_PRICE = 8000;

export const noticeData = [
  '공연은 전석 스탠딩으로 진행됩니다. (현장 선착순 입장)',
  '입장 시 손목띠를 나눠드립니다. 분실 시 재발급이 어려우니 주의 부탁드립니다.',
  '공연 시작 24시간 전부터 취소시 환불이 불가능합니다.',
  '공연장 안에서 물이나 커피 등 음료를 제외한 음식물 섭취는 제한됩니다.',
  '공연장 안에 물품을 보관할 장소가 없습니다. 겉옷과 소지품 분실에 유의하시기 바랍니다.',
  '출연진을 위한 선물이나 꽃다발 등은 본인이 소지 후, 공연 종료 시 전달하여야 합니다. (공연장 측의 방침으로, 별도 보관 및 사전 전달이 불가능합니다.)',
];

export const place = {
  id: 1,
  title: '장소',
  content: '홍대 스윙홀(서울 마포구 동교로 162-5 지하 1층)',
};

export const date = {
  title: '일시',
  content: '2025년 1월 4일 오후 6시',
};

export const price = {
  title: '티켓',
  content: `${TICKET_PRICE.toLocaleString()}₩`,
};

export const capacity = {
  title: '수용인원',
  content: '전석 스탠딩/100명',
};
