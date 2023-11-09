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
export const checkUserName = async (urlUser) => {
  var user = Parse.User.current();
  console.log(user);
  if (user) {
    var fetchedUsername = await user.fetch().then(function(fetchedUser){
      return fetchedUser.getUsername();
    }, function(error){
      return null;
    });
  }
  console.log("actual username: ", fetchedUsername )
  if (fetchedUsername === urlUser){
    return true;
  }
  return false;
}

/*
const checkName = async () => {
  var user = Parse.User.current();
  console.log(user);
  if (user) {
    var fetchedName = await user.fetch().then(function(fetchedUser){
      return fetchedUser.get("firstName");
    }, function(error){
      return null;
    });
  }
  console.log("fetchedName: ", fetchedName);
  return fetchedName;
}
export const getName = async () => {
  let firstName = await checkName();
  return firstName;
}
*/
const checkName = async () => {
  var user = Parse.User.current();
  console.log(user);
  let fetchedName = null;

  if (user) {
    try {
      const fetchedUser = await user.fetch();
      fetchedName = fetchedUser.get("firstName");
    } catch (error) {
      fetchedName = null;
    }
  }

  console.log("fetchedName: ", fetchedName);
  return fetchedName || ''; // Return an empty string if fetchedName is null
};

export const getName = async () => {
  try {
    let firstName = await checkName();
    return firstName || ''; // Return an empty string if firstName is null
  } catch (error) {
    console.error("Error occurred: ", error);
    return ''; // Return an empty string in case of an error
  }
};

export const checkUser = () => {
  return Parse.User.current()?.authenticated;
}