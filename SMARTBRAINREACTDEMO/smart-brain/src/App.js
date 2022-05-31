import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/signIn/signIn';

const USER_ID = 'gwartney';
const PAT = '94dc68e4922549ef9d628f6f02422e9c';
const APP_ID = '3c8f1a359e4041459755dc70c934e664';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';

class App  extends Component{

  constructor(){

    super();

    this.state = {
      input:'',
      imageUrl:'',
      box:{},
      route:'signIn'
      
    }
  }



 onInputChange  = (event)=>{
    this.setState({input:event.target.value})
 }

 calculateFaceLocation = (response)=>{
     const clarifaiFace =  response.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage');
     const width = Number(image.width);
     const height = Number(image.height);
     return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
     }

}

displayFaceBox = (box)=>{
  
  this.setState({box:box});
}
 


onSubmit = () => {
  this.setState({imageUrl:this.state.input})
   
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": this.state.input
                }
            }
        }
    ]
});

const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
  .then(response => response.json())
  .then(result =>this.displayFaceBox(this.calculateFaceLocation(result)))
  .catch(error => console.log('error', error));
 
 
   
 
}

onRouteChange = (route)=>{
  this.setState({route:route});
}
  render(){
    return(
    <div className="App">
    <Navigation onRouteChange={this.onRouteChange}/> 
     { this.state.route === 'signIn'
        ?<SignIn onRouteChange={this.onRouteChange} />
        : <div>
           <Logo/>
           <Rank/>
           <ImageLinkForm 
           onInputChange={this.onInputChange} 
           onSubmit={this.onSubmit}
           />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>  
 
          </div>
     }
        
    </div>
    )
  };
}

export default App;
