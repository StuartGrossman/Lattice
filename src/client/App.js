import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = { data: null, movieSearchValue: ''}

  componentDidMount() {
    fetch('/api/getMovieList')
      .then(res => res.json())
      .then(data => this.setState({data: data.results}));
  }

  render() {
    const { data } = this.state;
    this.movieData = this.state.data
    var errorMessage;
    this.renderData;
    this.updateInputValue = (evt) => {
      if(evt.target.value){
        console.log(evt.target.value)

        this.setState({movieSearchValue: evt.target.value})
      }
    }

    this.lookUpMovie = () => {
      console.log('working')
      fetch(`/api/searchMovie/?value=${this.state.movieSearchValue}`, { method: 'POST' })

        .then(res => res.json())
        .then(result => this.checkData(result))

    }
    this.generateOptions = function ( object ) {
      return Object.keys(object).map( function( key ) {
        return {
        	value: key,
          data: {
            label: key + ' - ' + object[key]
          }
        };
      });
    }
    this.checkData = (data) => {
      //clears search bar
      console.log(data)
      this.clearForm();
      if(data.results === 'none'){
        console.log('no results found')
        errorMessage = "No movies found";
      }
      else{
        document.getElementById('popularMovieList').style.display = 'none';

        // var data =this.generateOptions(data)
        this.displaySingleMovie(data)
      }
    }

    this.displaySingleMovie = (data) => {
      this.singleMovieData = data;
      document.getElementById('singleMovie').innerHTML =
      data.title + ' ' + data.budget + ' ' + data.vote_average
      // this.singleMovieData = () =>{
      //   return (
      //     <div className="well row">
      //       <div className="col-md-12">
      //         <h1>{data.original_title}</h1>
      //       </div>
      //     </div>
      //   )
      //
      // }
      console.log(this.singleMovieData)
    }

    this.clearForm = () => {
      document.getElementById("searchBar").value = '';
    }

    this.lookUpSpecificMovie = (itemId) => {
      fetch(`/api/getMovieById/?value=${itemId}`, { method: 'POST' })

        .then(res => res.json())
        .then(result => this.checkData(result))

    }

      if(this.movieData){
        this.renderData = this.movieData.map((item) => {

          var imagePath = "https://image.tmdb.org/t/p/w370_and_h556_bestv2/" + item.backdrop_path
          return (
             <div key={item.id} className="row movieBlock">
               <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 textBlock">
                 <h2>{item.title}</h2>
                 <h4>{item.overview}</h4>
                 <button className="btn btn-warning" onClick={() => this.lookUpSpecificMovie(item.id)} >More Info</button>
               </div>
               <div>
                 <img className="image-responsive imageSize textBlock" src={imagePath}></img>
               </div>

             </div>
           );
        })
      }



    return (
       <div>
         <div className="row container-fluid">
           <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
             <h1>THE MOVIE DATABASE</h1>
             <h6>{errorMessage}</h6>
           </div>
           <div className="col-lg-5 col-md-5 col-sm-5 col-xs-9  titleBlock">
             <input className="form-control" id="searchBar" placeholder="Search a movie!" onChange={evt => this.updateInputValue(evt)}></input>
           </div>
           <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3  titleBlock">
             <button className="btn btn-primary" onClick={this.lookUpMovie}>Search!</button>
           </div>

         </div>
         <div id="popularMovieList">
           {this.renderData}
         </div>
         <div id="singleMovie">
           {this.singleMovieData}
         </div>
       </div>
   )
 }
}
