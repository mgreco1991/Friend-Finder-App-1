
var friendList = require("../data/friends");

module.exports = function(app) {


  app.get("/api/friends", function(req, res) {
    res.json(friendList);
  });


  app.post("/api/friends", function(req, res) {
    var compatibilityScore = 0; 
    var theBestScoreEver;
    var yourBae;
    for (var i = 0; i < friendList.length; i++){  
      for (var j = 0; j < req.body.scores.length; j++){
       compatibilityScore = compatibilityScore + Math.abs(req.body.scores - friendList[i].scores);
      }
      if (!theBestScoreEver){
        theBestScoreEver = compatibilityScore;
          yourBae = friendList[i];
      } else if (compatibilityScore < theBestScoreEver){
        theBestScoreEver = compatibilityScore;
        yourBae = friendList[i];
      }
      compatibilityScore = 0;
    }
    res.json(yourBae);
    friendList.push(req.body);
  });

};
