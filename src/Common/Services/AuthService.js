import Parse from "parse";

export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);
  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

//Figure out some way to
export const doUserLogIn = async function (currUser) {
  // Note that these values come from state variables that we've declared before
  const user = new Parse.User();

  console.log("current user: ", currUser);
  user.set("password", currUser.password);
  user.set("username", currUser.email);
    
  return user.logIn(user.email, user.password).then((currUserSaved) => {
    return currUserSaved;
  })
  .catch((error) => {
    alert(`Error: ${error.message}`)
  });
  // You can redirect or perform any action after successful login.
};

//need to modify check user to check if the user is only viewing pages they're allowed to see
export const checkUser = () => {
  var user = Parse.User.current()
  var fetchedUsername = user.fetch().then(function(fetchedUser){
    return fetchedUser.getUsername();
  }, function(error){
    return null;
  });
  return Parse.User.current()?.authenticated;
}