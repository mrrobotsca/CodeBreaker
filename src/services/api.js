// Fake user database
const USERS_DB = [
  {
    id: "1",
    username: "player1",
    password: "password1",
    avatarUrl:"https://media-exp2.licdn.com/dms/image/C5603AQHM_sz48NjlrA/profile-displayphoto-shrink_400_400/0/1576223053481?e=1660780800&v=beta&t=twP3X8vjrm1KDceBVT3sNFEGnN9eWpihkgdm28tfdCw",
    firstName:"Omid"
  },
  {
    id: "2",
    username: "player2",
    password: "password2",
    avatarUrl:"https://media-exp2.licdn.com/dms/image/C5603AQFD65H52S0qVQ/profile-displayphoto-shrink_400_400/0/1517566681811?e=1660780800&v=beta&t=DlTXgkYwlWm5i7TRItkBVsej6a0hQpwE47P_SqjWdpk",
    firstName:"Gui"
  },
  {
    id: "3",
    username: "player3",
    password: "password3",
    avatarUrl:"https://media-exp2.licdn.com/dms/image/C5603AQETaRs_hQgaXQ/profile-displayphoto-shrink_400_400/0/1654838625738?e=1660780800&v=beta&t=HKyGze_fPeSSfF8ebB-u7-A8pYe1Z8lOsbNc0ATcfUw",
    firstName:"Alex"
  },
];

// Fake API call that should be triggered when the login form is submitted
// Should return the user
export const loginUser = ({ username, password }) =>
  new Promise((resolve, reject) => {
    let user=USERS_DB.find(user => user?.username === username)
    setTimeout(() => {
      try {
        if(user && user.password===password)
          resolve(user)
        else if(user && user.password!==password ){
          reject(new Error("Bad credentials"));
        }
        else{
          reject(new Error("User Not found"));
        }
      } catch (error) {
        console.error('loginUser', error.message);
      }
    }, 1000);
});

// Should return the user info havin user id as input 
export const getUserInfo = (userId) =>
  new Promise((resolve, reject) => {
    let user=USERS_DB.find(user => user?.id === userId)
    try {
      if(user)
        resolve(user)
      else{
        reject(new Error("UserNotfond"));
      }
    } catch (error) {
      console.error('getUserInfo', error.message);
    }
  });
