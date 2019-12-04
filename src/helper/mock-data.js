import mockjs, { Random } from 'mockjs'

export class CustomerFactory {
  static generate() {
    return mockjs.mock({
      'data|20': [{
        'id|1-20': 1,
        'phone|12300000000-12399999999': 1,
        'name|1': '@first @last',
        // 'age|18-80': 1,
        // 'sex|1': () => Random.pick(['male','female']),
        // 'image|1': () => Random.dataImage(),
        'totalTime|1': () => Random.natural(0,152),
        'totalWork|1': () => Random.natural(1,40),
        'totalCancel|1': () => Random.natural(1,20),
      }]
    });
  }
}

export const Customer = [
    {
        id: 1,
        name: 'Ngô Trọng Tuyên',
        phone: '0345081945',
        image: 'http://images.summitmedia-digital.com/cosmo/images/2018/11/27/blackpink-lisa-1543288094.jpg'
    },
    {
        id: 2,
        name: 'Nguyễn Văn A',
        phone: '0123456789',
        image: 'https://znews-photo.zadn.vn/w660/Uploaded/lqmctqvp/2019_09_03/unnamed.jpg'
    },
    {
        id: 3,
        name: 'Hoàng Tuệ B',
        phone: '0918887774',
        image: 'https://media.laodong.vn/Storage/NewsPortal/2019/11/19/766929/Lisa-Plo_Rdyz.jpg'
    },
    {
        id: 4,
        name: 'Nguyễn Hoàng Z',
        phone: '0311111115',
        image: 'https://file.tinnhac.com/resize/600x-/music/2019/01/08/20190108163811-0b1f.jpg'
    },
    {
        id: 5,
        name: 'Phạm Bạch C',
        phone: '0885288522',
        image: 'https://media.vietstarusa.com/resize/863x486/files/news/2019/10/01/lisa-blackpink-la-ngoi-sao-co-luong-fan-quoc-te-hung-hau-nhat-han-quoc-112605.jpg'
    },
    {
        id: 6,
        name: 'Từ Thiên D',
        phone: '0565656566',
        image: 'https://i.pinimg.com/originals/7a/7f/c4/7a7fc4559e7e0c5994b1c20c97d371a1.jpg'
    },
];

export const History = [
    {
        id: 0,
        customer: Customer[0],
        totalTime: 112,
        totalWork: 54,
        totalCancel: 2,
    },
    {
        id: 1,
        customer: Customer[1],
        totalTime: 11,
        totalWork: 5,
        totalCancel: 0,
    },
    {
        id: 2,
        customer: Customer[2],
        totalTime: 32,
        totalWork: 21,
        totalCancel: 11,
    },
    {
        id: 3,
        customer: Customer[3],
        totalTime: 82,
        totalWork: 40,
        totalCancel: 5,
    },
    {
        id: 4,
        customer: Customer[4],
        totalTime: 284,
        totalWork: 101,
        totalCancel: 0,
    },
    {
        id: 5,
        customer: Customer[5],
        totalTime: 69,
        totalWork: 30,
        totalCancel: 1,
    }
];