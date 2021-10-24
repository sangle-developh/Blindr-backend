const _ = require("underscore");

function getCouple(userOne, users) {
  for (let i = 0; i < users.length; i++) {
    // const [userTwo] = _.sample(users, [1]);
    const userTwo = users[i];

    if (
      userOne.gender === userTwo.interest ||
      userTwo.gender === userOne.interest
    ) {
      const matchScore = getMatchScore(userOne, userTwo);
      if (matchScore > 0) {
        //It's a match!
        return [userOne, userTwo];
      }
    }
  }
  return "No matches";
}

function getMatchScore(userOne, userTwo) {
  let matchScore = 0;
  const ageDifference = getAgeDifference(userOne, userTwo);
  const distance = getDistance(
    ...userOne.location.coordinates,
    ...userTwo.location.coordinates
  );
  if (ageDifference <= 5) {
    matchScore += 2;
    //continue to next round
  } else if (ageDifference > 5 && ageDifference <= 7) {
    matchScore++;
  } else {
    // return 0;
    matchScore--;
    //not a match -- stop the algorithm and get another random couple
  }
  if (distance <= 20) {
    matchScore += 2;
  } else if (distance > 20 && distance <= 40) {
    matchScore++;
  } else {
    //return 0;
    matchScore--;
    //not a match -- get another random couple
  }

  userOne.keywords.forEach((keyword) => {
    if (userTwo.includes(keyword)) matchScore++;
  });

  return matchScore;
}

// function getAge(birthDate) {
//   var today = new Date();
//   var age = today.getFullYear() - birthDate.getFullYear();
//   var m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// }

function getAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - new Date(birthday).getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getAgeDifference(userOne, userTwo) {
  return Math.abs(getAge(userOne.dob) - getAge(userTwo.dob));
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

function getAgeRange(ageRangeString) {
  return ageRangeString.split("-").map((str) => Number(str));
}

// console.log(
//   getCouple(
//     {
//       location: {
//         coordinates: [],
//       },
//       _id: "612d1252ef3a425a728d4865",
//       name: "Sang Le",
//       username: "lensang",
//       dob: "1997-09-22T07:00:00.000Z",
//       gender: "Male",
//       interest: "Female",
//       maxDistance: 5,
//       ageRange: "20-30",
//       keywords: [],
//       __v: 0,
//     },
//     [
//       {
//         location: {
//           coordinates: [],
//         },
//         _id: "612d1252ef3a425a728d4865",
//         name: "Sang Le",
//         username: "lensang",
//         dob: "1997-09-22T07:00:00.000Z",
//         gender: "Male",
//         interest: "Female",
//         maxDistance: 5,
//         ageRange: "20-30",
//         keywords: [],
//         __v: 0,
//       },
//       {
//         location: {
//           coordinates: [],
//         },
//         _id: "612d1278ef3a425a728d4867",
//         name: "Thanh Vuong",
//         username: "thanhvuong",
//         dob: "1999-01-10T08:00:00.000Z",
//         gender: "Male",
//         interest: "Female",
//         maxDistance: 5,
//         ageRange: "20-30",
//         keywords: [],
//         __v: 0,
//       },
//       {
//         location: {
//           coordinates: [],
//         },
//         _id: "616f9bf827f08a974c6f87ed",
//         name: "Monica Huynh",
//         username: "monica",
//         dob: "2011-01-01T08:00:00.000Z",
//         keywords: [],
//         __v: 0,
//         gender: "female",
//       },
//       {
//         location: {
//           coordinates: [],
//         },
//         _id: "6173879a692a5937b449bf4e",
//         name: "Han Dao",
//         username: "handao",
//         dob: "2003-01-16T07:00:00.000Z",
//         gender: "Female",
//         interest: "Male",
//         maxDistance: 5,
//         ageRange: "18-20",
//         keywords: [],
//         __v: 0,
//       },
//     ]
//   )
// );

module.exports = { getCouple };
