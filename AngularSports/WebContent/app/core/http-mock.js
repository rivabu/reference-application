(function() {
  'use strict'
  
  // Mocks calls to the server using the $httpBackend service
  
  var app = angular.module('app.core')
  app.requires.push('ngMockE2E');
  app.run(['$httpBackend', function($httpBackend) {
    
    var id = 1000;
    
    $httpBackend
      .whenGET('//localhost:8080/api/v1/sports')
      .respond([{"id":23,"name":"Trampolining"},{"id":14,"name":"Modern Pentathlon"},{"id":15,"name":"Rhythmic Gymnastics"},{"id":16,"name":"Rowing"},{"id":17,"name":"Sailing"},{"id":22,"name":"Tennis"},{"id":24,"name":"Triathlon"},{"id":25,"name":"Weightlifting"},{"id":3,"name":"Archery"},{"id":4,"name":"Athletics"},{"id":5,"name":"Badminton"},{"id":6,"name":"Boxing"},{"id":7,"name":"Canoeing"},{"id":8,"name":"Cycling"},{"id":9,"name":"Diving"},{"id":10,"name":"Equestrianism"},{"id":11,"name":"Fencing"},{"id":12,"name":"Gymnastics"},{"id":13,"name":"Judo"},{"id":18,"name":"Shooting"},{"id":19,"name":"Swimming"},{"id":20,"name":"Table Tennis"},{"id":21,"name":"Taekwondo"},{"id":26,"name":"Wrestling"}]); 
       
    $httpBackend
      .whenGET(/\/\/localhost:8080\/api\/v1\/sports\/3/)
      .respond({"id":3,"name":"Archery","events":[{"id":"55815669f215a4338026f5ed","name":"Men's Individual","sequence":1},{"id":"55815669f215a4338026f5ee","name":"Women's Individual","sequence":2}]});

    $httpBackend
      .whenGET(/\/\/localhost:8080\/api\/v1\/sports\/4/)
      .respond({"id":4,"name":"Athletics","events":[{"id":"55815669f215a4338026f5ef","name":"Men's 1,500 metres","sequence":5},{"id":"55815669f215a4338026f5f0","name":"Men's 10,000 metres","sequence":7},{"id":"55815669f215a4338026f5f1","name":"Men's 100 metres","sequence":1},{"id":"55815669f215a4338026f5f2","name":"Men's 110 metres Hurdles","sequence":9},{"id":"55815669f215a4338026f5f3","name":"Men's 20 kilometres Walk","sequence":12},{"id":"55815669f215a4338026f5f4","name":"Men's 200 metres","sequence":2},{"id":"55815669f215a4338026f5f5","name":"Men's 3,000 metres Steeplechase","sequence":11},{"id":"55815669f215a4338026f5f6","name":"Men's 400 metres","sequence":3},{"id":"55815669f215a4338026f5f7","name":"Men's 400 metres Hurdles","sequence":10},{"id":"55815669f215a4338026f5f8","name":"Men's 5,000 metres","sequence":6},{"id":"55815669f215a4338026f5f9","name":"Men's 50 kilometres Walk","sequence":13},{"id":"5581566af215a4338026f5fa","name":"Men's 800 metres","sequence":4},{"id":"5581566af215a4338026f5fb","name":"Men's Decathlon","sequence":22},{"id":"5581566af215a4338026f5fc","name":"Men's Discus Throw","sequence":19},{"id":"5581566af215a4338026f5fd","name":"Men's Hammer Throw","sequence":20},{"id":"5581566af215a4338026f5fe","name":"Men's High Jump","sequence":14},{"id":"5581566af215a4338026f5ff","name":"Men's Javelin Throw","sequence":21},{"id":"5581566af215a4338026f600","name":"Men's Long Jump","sequence":16},{"id":"5581566af215a4338026f601","name":"Men's Marathon","sequence":8},{"id":"5581566af215a4338026f602","name":"Men's Pole Vault","sequence":15},{"id":"5581566af215a4338026f603","name":"Men's Shot Put","sequence":18},{"id":"5581566af215a4338026f604","name":"Men's Triple Jump","sequence":17},{"id":"5581566af215a4338026f605","name":"Women's 1,500 metres","sequence":27},{"id":"5581566af215a4338026f606","name":"Women's 10,000 metres","sequence":29},{"id":"5581566af215a4338026f607","name":"Women's 100 metres","sequence":23},{"id":"5581566af215a4338026f608","name":"Women's 100 metres Hurdles","sequence":31},{"id":"5581566af215a4338026f609","name":"Women's 20 kilometres Walk","sequence":34},{"id":"5581566af215a4338026f60a","name":"Women's 200 metres","sequence":24},{"id":"5581566af215a4338026f60b","name":"Women's 3,000 metres","sequence":33},{"id":"5581566af215a4338026f60c","name":"Women's 400 metres","sequence":25},{"id":"5581566af215a4338026f60d","name":"Women's 400 metres Hurdles","sequence":32},{"id":"5581566af215a4338026f60e","name":"Women's 5,000 metres","sequence":28},{"id":"5581566af215a4338026f60f","name":"Women's 800 metres","sequence":26},{"id":"5581566af215a4338026f610","name":"Women's Discus Throw","sequence":40},{"id":"5581566af215a4338026f611","name":"Women's Hammer Throw","sequence":41},{"id":"5581566af215a4338026f612","name":"Women's Heptathlon","sequence":43},{"id":"5581566af215a4338026f613","name":"Women's High Jump","sequence":35},{"id":"5581566bf215a4338026f614","name":"Women's Javelin Throw","sequence":42},{"id":"5581566bf215a4338026f615","name":"Women's Long Jump","sequence":37},{"id":"5581566bf215a4338026f616","name":"Women's Marathon","sequence":30},{"id":"5581566bf215a4338026f617","name":"Women's Pole Vault","sequence":36},{"id":"5581566bf215a4338026f618","name":"Women's Shot Put","sequence":39},{"id":"5581566bf215a4338026f619","name":"Women's Triple Jump","sequence":38}]});
       
    $httpBackend
      .whenGET(/\/\/localhost:8080\/api\/v1\/sports\/5/)
      .respond({"id":5,"name":"Badminton","events":[{"id":"5581566bf215a4338026f61a","name":"Men's Single","sequence":1},{"id":"5581566bf215a4338026f61b","name":"Women's Singles","sequence":2}]});
       
    $httpBackend
      .whenGET(/\/\/localhost:8080\/api\/v1\/sports\/.*/)
      .respond({"id":99,"name":"Other","events":[{"id":"998","name":"Men's Single","sequence":1},{"id":"999","name":"Women's Singles","sequence":2}]});

    $httpBackend
      .whenPOST(/\/\/localhost:8080\/api\/v1\/sports\/.*/)
      .respond(function(method, url, data, headers) {
        return [200, {"id": id++, "name": JSON.parse(data).name, "sequence": id}, {}];
      });

    $httpBackend
      .whenPUT(/\/\/localhost:8080\/api\/v1\/sports\/.*/)
      .respond({});
      
    $httpBackend
      .whenDELETE(/\/\/localhost:8080\/api\/v1\/sports\/.*/)
      .respond({});  
      
    $httpBackend
      .whenGET('footer.html')
      .passThrough();        
      
  }]);
  
}());