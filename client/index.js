// CODE HERE

let attempt = 3;

const userAndPass = {
  marklee: {
    password: "marklee123",
    profilePic:
      "https://cdn3.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumb900.jpg",
  },
  coffeecup: {
    password: "black",
    profilePic:
      "https://i.etsystatic.com/17433093/r/il/0e4f0e/1497321794/il_570xN.1497321794_i7l1.jpg",
  },
  phone: {
    password: "keyswallet",
    profilePic:
      "https://itsallprettyfunny.files.wordpress.com/2018/11/img_0096.jpg?w=550",
  },
  keyboard: {
    password: "taptaptap",
    profilePic:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQ052?wid=4000&hei=1800&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1495129815011",
  },
  mouse: {
    password: "squeak",
    profilePic:
      "https://cdn.branchcms.com/m0abYprOvY-1063/images/blog/mouse-trap.jpg",
  },
};

let user;

const validate = () => {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  for (let key in userAndPass) {
    if (username === key && password === userAndPass[key].password) {
      alert(`Welcome, ${username}!`);
      window.location = "feed.html";
      user = username;
      return false;
    }
  }
  if (!username) {
    alert("Please enter a username.");
  } else if (!password) {
    alert("Please enter a password.");
  } else {
    attempt--;
    alert(`Wrong username and/or password. 
        You have ${attempt} attempts remaining!`);
    if (attempt === 0) {
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.getElementById("submit").disabled = true;
      return false;
    }
  }
};

let passwordInput = document.getElementById("password");

// passwordInput.addEventListener('keyup', function(e) {
//     if (e.keyCode === 13) {
//         e.preventDefault();
//         validate();
//     }
// })
