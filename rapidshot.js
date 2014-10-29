function Player(){
  var player={
  hp: 5,
  ammo: 30
  };

this.getAmmo = function(){
  return player['ammo'];
  };
  
this.getHp = function(){
  return player['hp'];
  };
  
 this.setAmmo = function(number){
  player['ammo'] = number;
  };
 
this.setHp = function(number){
  player['hp'] = number;
  };
 
this.shoot = function(){
  if (player['ammo'] <= 0){
    return false;
  }
  player['ammo']-- ;
 };
 
this.reload = function(){
  player['ammo'] = 30;
  };

this.damaged = function(){
  player['hp'] --;
  }; 
}
 
function create() {
  return new Player();
}

module.exports = {
  create: create
};



















