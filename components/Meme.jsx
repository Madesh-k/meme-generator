import React from "react"

export default function Meme() {
    const [meme,setMeme] = React.useState({
     topText: "",
     bottomText:"",
     randomImage:"https://i.imgflip.com/1tl71a.jpg"
    }) 
 
    const [allMemes,setAllMemes] = React.useState([])
    
    React.useEffect(() =>{
      fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then( data => setAllMemes(data.data.memes))
    })

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme( prevMeme => {
          return {...prevMeme,randomImage:url}
        })
    } 
    // form Validation for topText and bottomText handling every change in text
    function handleChange(event){
       const {name,value} = event.target 
      setMeme((prevMeme => ({
        ...prevMeme,[name]:value
      })))
    }

    return(
        <main>
            <div className="form">
             <label htmlFor="top-text">Top text</label>
              <input 
                id="top-text"
                type= "text"
                placeholder="Top input"
                className="form-input"
                name="topText"
                value={meme.topText}
                onChange={handleChange}
              />
             <label htmlFor="bottom-text">Button text</label> 
              <input 
                id="bottom-text"
                type="text" 
                placeholder="Bottom input"
                className="form-input"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
              />
             
             <button className="form-button" onClick= {getMemeImage}>Get a new meme image 🖼</button>
            </div> 
            <div className="meme">
                <img src={meme.randomImage} className="meme-image" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
        
    )
}