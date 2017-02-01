import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let pins = [
      {id: 11, name: 'testons', lat : 43.629512, lng: 1.380005, description: 'Mr. Nice', adress : 'test', timstamp: "1485694929002", photoUrl:'http://andyshora.com/img/pages/promise1.png', moderated : true},
      {id: 12, name: 'testons', lat : 43.6268456, lng: 1.4588197, description: 'Narco', adress : 'test', timstamp: "1485694929002"},
      {id: 13, name: 'testons', lat : 43.6311479, lng: 1.4390679, description: 'Bombasto', adress : 'test', timstamp: "1485694929002", moderated : true},
      {id: 14, name: 'testons', lat : 43.5431781, lng: 1.4597102, description: 'Celeritas', adress : 'test', timstamp: "1485694929002", moderated : true},
      {id: 15, name: 'testons', lat : 43.5804955, lng: 1.396453, description: 'Magneta', adress : 'test', timstamp: "1485694929002", moderated : true},
    ];
    // let users =[
    //   {id:0, name:'Really Smart'},
    //   {id:1, name:'Super Flexible'},
    //   {id:2, name:'Super Hot'},
    //   {id:3, name:'Weather Changer'},
    // ];
    let comments =[
      {description: "yesy", idPin: 15, timestamp: 1485706545451, moderated : false},
      {description: "Le truc n'est pas dans un bon état et plein de pluie.", idPin: 15, timestamp: 1485706550160, moderated : true},
      {description: "super bon état, s'il vous plait laissezmoi le canapé!!", idPin: 15, timestamp: 1485706545452, moderated : true}
    ];
    return {pins, comments};
  }
}
