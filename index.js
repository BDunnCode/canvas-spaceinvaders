// Gives us a way to grab the select the canvas
const canvas = document.querySelector('canvas')
// Sets the canvas to use it's built-in methods within a 2d context
const c = canvas.getContext('2d')

// Grabs what I assume is a canvas object, and then sets it's width to be equal to the 
// window's width. What is written below is equivalent to window.innerHeight, but the window.
// prefix can be omitted.
canvas.width = innerWidth
canvas.height = innerHeight

//This is effectively a blueprint that can be used to repeatedly create
//player objects.
class Player {

  // The constructor function for the creation of the object. Note that there's a curly bracket
  // that creates a separation before the draw method is created.
  constructor() {

  // Sets the x and y coordinates relative to the pixels of the window. I believe that in canvas
  // this starts at 0,0 in the top left corner.

  
    //With that same corner reference point and a velocity value that corner reference point 
    //can be moved around the canvas as it is redrawn. The velocity value attached to x or y
    //should denote how many pixels are moved each time, presumably this would be pixels moved per
    //animation loop call.
    this.velocity = {
      x: 0,
      y: 0
    }

    // This is the one bit that still vexes me somewhat. It's a class constructor
    // attached to a variable as a handle, and it then grabs that object and sets its source 
    // to be come from the image file in the root directory. Maybe this seems weird because I'm 
    // anticipating that more images will be made for the other objects, and I don't understand how
    // they'll be attached to the others?

    const image = new Image()
    image.src = './img/spaceship.png'
    // This is an event listener set as a property on the image instance object. 
    // As I'm writing this comment, the image that successfully displayed prior, no longer does. 
    // Most of these issues are going to come down to loading.

    image.onload = () => {
      const scale = .15
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height -20
      }  
    }
  }

  //This gives the Player class instance the draw method.

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    if (this.image)
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
  }
}

//Calls the player constuctor to create the object, and then calls it's draw method to display it
//visually.
const player = new Player()
player.draw()

// This below is the animation loop that is drawing the game objects
// over and over again. Currently, it's drawing the black the background to the 
// canvas, and then drawing the player.

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.draw()
}

//Calls the animation loop function 
animate()

