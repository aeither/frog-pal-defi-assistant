// latest deployment 0xB5c2E15d54FB6ACC53e8269eB53f34D00F221101

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;

contract Leaderboard {
  address owner;
  uint256 leaderboardLength = 20;

  struct User {
    address user;
    uint256 score;
  }
  mapping(uint256 => User) public leaderboard;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(owner == msg.sender, 'Sender not authorized');
    _;
  }

  function addScore(
    address user,
    uint256 score
  ) public onlyOwner returns (bool) {
    if (leaderboard[leaderboardLength - 1].score >= score) return false;

    for (uint256 i = 0; i < leaderboardLength; i++) {
      if (leaderboard[i].score < score) {
        User memory currentUser = leaderboard[i];
        for (uint256 j = i + 1; j < leaderboardLength + 1; j++) {
          User memory nextUser = leaderboard[j];
          leaderboard[j] = currentUser;
          currentUser = nextUser;
        }

        leaderboard[i] = User({user: user, score: score});
        delete leaderboard[leaderboardLength];
        return true;
      }
    }

    return false;
  }

  function getAll() public view returns (User[] memory) {
    User[] memory ret = new User[](leaderboardLength);
    for (uint256 i = 0; i < leaderboardLength; i++) {
      ret[i] = leaderboard[i];
    }
    return ret;
  }
}
