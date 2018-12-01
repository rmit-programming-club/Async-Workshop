function createWrapperFunction(print, func){                                    
  return () => {
    console.log(print);
    return func;
  }
}

function shuffle(a) {
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let prizes = shuffle(["Paperclip", "I love canada badge", "Paper", "Pencil", "Blue Socks",
              "A programming club t-shirt", "Bragging Rights", "Virginity",
              "A life", "Tom's Face", "Friends", "Parents who cared", "Cancer",
              "Beans", "Coal", "Strand of hair from Justin Beiber", "Student debt"]);

let length = prizes.length;


let finalPrize = () => () =>{
  console.log("A $20 Steam gift card congratulations!");
};

let parcel = finalPrize();

for(let i = 0; i < prizes.length; i++){
  parcel = createWrapperFunction(prizes[i], parcel) ;
}

module.exports = parcel;
