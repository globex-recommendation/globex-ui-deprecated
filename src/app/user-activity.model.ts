export class UserActivityModel {
      idSite: string
      activity:
          {userId: number,
          url: string
          rand: string
          type: string}
      userInfo:
          {
            visitsCount: 1
            prevVisitTs: number
            firstVisitTs: number
            campaign: string
            localTime: string
            newVisit: 1
          }
      actionInfo:
          {search: string
          searchCat: string
        }
}


//{  "idSite": "globex-retail",  "activity": {    "userId": "7672a49e-9afc-498f-91bc-98f881179f2c",    "url": "https://globex-retail.com/product/12345/details",    "rand": "f65f3838-2aba-4778-a46b-3e5576c9034a",    "type": "like"  },  "userInfo": {    "visitsCount": 2,    "prevVisitTs": 1647337199,    "firstVisitTs":1647337199,    "campaign": "promo",    "newVisit": 1,    "localTime": "2022-03-16T10:39:59+0100"  },  "actionInfo": {    "productId": "b27290",    "search": "waterbottle",    "searchCat": "swag"  }}
