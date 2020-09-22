// CODE HERE

const usernameList = ['AlenaClayton', 'KaelynCline', 'MariahFarrell', 'ConnerHammond', 'HillaryBarton', 'GunnerGilmore', 'TurnerBowers', 'CodyLamb', 'DeanDawson', 'DaliaBerg', 'JosieDuran',
'KyanAshley', 'JakeHorn', 'HowardHuff', 'AlexisParker', 'KysonDoyle', 'RachelSingleton', 'JoyPaul', 'Rodrigo', 'JasmineCross'];

const commentList = ['Check this out!', 'Mood', 'Feeling this today', 'First post on Instagram!', 'What do you guys think?', 'Cop or pass?', 'Tag someone who would be into this', 
'This is hilarious!', 'This looks amazing!'];

const hashtagList = ['#love', '#instagood', '#potd', '#beautiful', '#tbt', '#happy', '#cute', '#smile', '#fashion', '#like4like', '#followme', '#style', '#nofilter', '#funny', '#amazing', 
'#goals', '#mood', '#awesome', '#best'];

const userImages = ['https://media.inquirer.com/storage/inquirer/projects/year-in-pictures-2019/photos/POY2019_RedC.JPG',
'https://images.befunky.com/wp/wp-2014-08-milky-way-1023340_1280.jpg?auto=format&fm=jpg&q=75&w=1184&ixlib=js-1.4.1',
'https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
'https://cdn.guidingtech.com/imager/assets/2019/05/227363/crop-picture-shapes-online-fi_4d470f76dc99e18ad75087b1b8410ea9.jpg?1559046829',
'https://cnet3.cbsistatic.com/img/sMJz61a5p3QEOwkK6aIT3R2skgw=/2019/08/15/5dda0e7e-8042-4317-9ee8-8256b04b5dda/samsung-galaxy-note-10-plus-13.jpg']

$(document).ready(() => {
  function updateHeart(heartId) {
    const heart = document.getElementById(heartId);
    heart.src = heart.src.includes('heartButton.png')
      ? './Images/likedHeart.png'
      : './Images/heartButton.png';
  }
  
  $.ajax({
    url: 'https://image-server-codesmith.firebaseapp.com/images',
    type: 'get',
    dataType: 'JSON',
    crossDomain: true,
    success: function(data) {
      data.forEach((imageSrc, i) => {
        const postPicId = `postPic${i}`;
        const heartId = `heart${i}`;
        const moreOptionsId = `moreOptions${i}`;
        const commentTextBoxId = `commentTextBox${i}`;
        const commentListClass = `commentList${i}`
        const formId = `form${i}`;
        const peopleWhoLikedPostId = `peopleWhoLikedPost${i}`;
        const infoAndCommentsId = `infoAndComments${i}`;
        if (!imageSrc.includes('fake')) {
          $('.feedbox').append(
            `<div class='feedposts' id='${postPicId}'>
                <img src='${imageSrc}' class="post" />
            </div>`
          );
        } else {
          $('.feedbox').append(
            `<div class="feedposts" id='${postPicId}'>
                <img src="./Images/Broken-images.png"  class="post" />
            </div>`
          );
        }

        $(`#${postPicId}`).append(
          `<div class="likebar">
              <img src="./Images/heartButton.png" id="${heartId}" />
              <div id="${peopleWhoLikedPostId}">
              </div>
              <img src="./Images/moreOptions.png" id="${moreOptionsId}" />
            </div>`
        );

        $(`#${postPicId}`).append(
          `<div id="${infoAndCommentsId}">
              <ul class="moreOptionsMenu">
                <li>Report</li>
                <li>Copy Link</li>
                <li>Share to...</li>
              </ul>
              <form id='${formId}'>
                <input id='${commentTextBoxId}' placeholder='Add a comment...'/>
              </form>
              <ul class='${commentListClass}'></ul>
            </div>`
        );


        $(`#${heartId}`).click(function() {
          updateHeart(heartId);
        });
        $(`#${postPicId} .post`).dblclick(function() {
          updateHeart(heartId);
        });


        $(`#${formId}`).bind('submit', function(e) {
          e.preventDefault();
          const [commentField] = this.elements;
          // console.log(commentField.value)
          $(`.${commentListClass}`).append(`<li style="font-family:sans-serif"><span id="usernameComment">marklee</span> ${commentField.value}</li>`);
          commentField.value = commentField.value.replace(`${commentField.value}`, "");
        });


        $(`#${moreOptionsId}`).click(function() {
          $('.moreOptionsMenu')
            .show()
            .on('mouseleave', function() {
              $('.moreOptionsMenu').hide();
            });
        });

        const randomizeAndGenerateLikes = array => {
          let currentIndex = array.length; let randomIndex; let tempValue;
          while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            tempValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = tempValue;
          }
          $(`#${peopleWhoLikedPostId}`).append(
            `<p>
            <span id="usernameComment">${array[0]}, ${array[1]}, ${array[2]}</span>
            and <span style="color:gray; font-weight:700">${Math.floor(Math.random() * 500)}</span> others liked this post.
            </p>`
          )
        };
        randomizeAndGenerateLikes(usernameList);


        const randomizeAndGeneratePostComments = (array1, array2, array3, array4) => {
          let randomNum1 = Math.floor(Math.random() * array1.length);
          let randomNum2 = Math.floor(Math.random() * array2.length);
          let randomNum3 = Math.floor(Math.random() * array3.length);
          let randomNum4 = Math.floor(Math.random() * array4.length);
          $(`#${infoAndCommentsId}`).append(
              `<div id="firstline">
              <img src="${array4[randomNum4]}" id="commentPicIcon">
              <p><span id="usernameComment">${array1[randomNum1]}</span>${array2[randomNum2]}</p>
              </div>
              <p id="hashtags">${array3[randomNum3]}</p>`
          )
        };
        randomizeAndGeneratePostComments(usernameList, commentList, hashtagList, userImages);

      });
    }
  });
});
