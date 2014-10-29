var playerModel = require('../rapidshot.js');
var assert = require('chai').assert;
  
describe('ammo', function () {
  describe('ammo tests', function () {
    var player;
    
    beforeEach(function () {
      player = playerModel.create();
    });

    it('initial ammo 30', function () {
      assert.equal(player.getAmmo(), 30);
    });
    it('initial hp must be 5', function () {
     assert.equal(player.getHp(), 5);
    });
    it('should set hp X', function () {
     player.setHp(1);
     assert.equal(player.getHp(), 1);
    });
    it('should set ammo 3', function () {
      player.setAmmo(3);
      assert.equal(player.getAmmo(), 3);
    });
    it('should substract ammo -1', function () {
      player.shoot();
      assert.equal(player.getAmmo(), 29);
    });
    it('if ammo <0 should return false', function () {
      player.setAmmo(0);
      player.shoot();
      assert.equal(player.getAmmo(), false);
    });
    it('should return to the initial ammo value', function () {
      player.reload();
      assert.equal(player.getAmmo(), 30);
    });
     it('should substract hp -1', function () {
     player.damaged();
     assert.equal(player.getHp(), 4);
    });
  });
});

