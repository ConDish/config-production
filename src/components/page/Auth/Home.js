import React, { Component } from 'react';
import axios from 'axios';
import hexRgb from 'hex-rgb';


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      config: {},
      value: {},
      msgAlert: ''
    }
    this._getConfig()
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  _getConfig = () => {
    // --- Site what use desblock with problems of CORB
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    // --- Site of aire mobile
    const url = "http://190.145.56.148:8090/confmobi/getConfi/prueba03";

     axios.get(proxyurl + url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
      .then(response => { return response.data })
      .then(config => this.setState({ config }))
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))


  }

  _getInputs = () => {

    const LIST = this.state.config.listPage

    // console.log(this.state.config);


    return LIST.map((item, index) => {
      return (

        <div className="col-md-12 mt-5 " key={index}>

          <h4 className="display-5 text-secondary">{item.descPage}</h4>

          <div className="col-md-12 mt-3 ">
            {item.listArea.map((list, index) => {
              return (
                <div className="col-md-12 mt-5" key={index}>

                  <h5 className="text-secondary">{list.descArea}</h5>

                  {list.listComp.map((list, index) => {

                    return (

                      <div key={index} className="form-group">



                        <label htmlFor="">{list.descComp}</label>
                        {
                          (!list.seleComp) ?

                            <input type="text" className="form-control" id={list.codeComp} aria-describedby="emailHelp" defaultValue={(list.labeComp) ? list.labeComp : list.valuComp}

                            />
                            :

                            <div>
                              {list.seleComp.map((list, index) => {



                                return (
                                  <input type="text" className="form-control" id={list.codeComp} aria-describedby="emailHelp" key={index} defaultValue={list.labeSeit} />
                                )

                              })}

                            </div>


                        }

                      </div>



                    )

                  })}

                </div>
              )

            })}
          </div>

        </div>

      )
    })

  }

  _getThemes = (item) => {

    const THEME = Object.values(this.state.config.theme);

    const LABEL = ['Color Primario', 'Color secundario', 'Color terciario']

    return THEME.map((item, index) => {
      return (
        <div className="col-md-12 mt-5" key={index} >
          <div key={index} className="form-group">
            <label>{LABEL[index]}</label>
            <input type="color" className="form-control" aria-describedby="emailHelp" key={index} defaultValue={item} />


          </div>


        </div>
      )
    })





  }


  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({ spinner: true })

    let config = this.state.config

    let child = [...event.target.parentNode.parentNode.parentNode.childNodes[0]]
    let theme = [...this.theme.children]

    // --- Keys of object 
    let pre = Object.keys(this.state.config.theme);

    // --- JSON of the gif
    let jsonGif = JSON.parse(config.imagGifs.imagCarg)

    // --- This is gifs array with thres camps of GIF CARG
    let imgCarg = [...jsonGif.layers]


    // --- Object of the theme
    let objTheme = {}

    // console.log(JSON.stringify(JSON.stringify(jsonGif)))

    

    let rgb = hexRgb(theme[0].childNodes[0].childNodes[1].value)


    let bols = jsonGif.layers.map((bols, index) => {

      bols.shapes[0].it[1].c.k[0] = rgb.red
      bols.shapes[0].it[1].c.k[1] = rgb.green
      bols.shapes[0].it[1].c.k[2] = rgb.blue

      return bols
      
    })

    jsonGif.layers = bols

    config.imagGifs.imagCarg = JSON.stringify(jsonGif);

    
    theme.map((item, index) => objTheme[pre[index]] = item.childNodes[0].childNodes[1].value)

    config.theme = objTheme   



    let data = child.map((item, index) => {
      return item.value
    })

    let i = 0;
    for (const prop in config.listPage) {

      for (const pre in config.listPage[prop].listArea)

        for (const pri in config.listPage[prop].listArea[pre].listComp)

          if (config.listPage[prop].listArea[pre].listComp[pri].seleComp) {

            for (const sele in config.listPage[prop].listArea[pre].listComp[pri].seleComp) {

              config.listPage[prop].listArea[pre].listComp[pri].seleComp[sele].labeSeit = data[i]
              // console.log(config.listPage[prop].listArea[pre].listComp[pri].seleComp[sele]);
              i++;
            }

          }
          else {
            (config.listPage[prop].listArea[pre].listComp[pri].labeComp) ?
              config.listPage[prop].listArea[pre].listComp[pri].labeComp = data[i] :
              config.listPage[prop].listArea[pre].listComp[pri].valuComp = data[i]
            i++;
          }

    }


    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://190.145.56.148:8090/confmobi/actucomo";

    axios.post(proxyurl + url, JSON.stringify(config), {
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-hola-request-id": "11111",
        "x-hola-unblocker-bext": "reqid 11111: proxy request, vpn is not allowed, before request, send headers, headers received, status: HTTP/1.1 201 Created"
      }
    })
      .then(res => {
        this.setState({ msgAlert: 'Save success', spinner: false }, () => {
          // --- Add classs when success response
          this.alert.classList.add('d-block', 'alert-success')
          // --- Use for up scroll when succes response
          window.scrollTo(0, 0)


        })

      })
      .catch(err => {
        this.setState({ msgAlert: 'An error occurred' }, () => {
          // --- Add classs when success response
          this.alert.classList.add('d-block', 'alert-danger')
          // --- Use for up scroll when succes response
          window.scrollTo(0, 0)
        })

      })


  }


  render() {

    const CONFIG = this.state.config


    if (JSON.stringify(this.state.config) !== '{}') {
      return (
        <div className="Home">
          <div className="container mt-3">
            <div className="col-md-12 text-center">
              <div className="jumbotron shadow-lg" style={{ background: '#3DA5E5' }}>
                <h1 className="display-4 text-light" >Configure your app AireMobile</h1>
              </div>
            </div>

            <div className="col-md-12 mt-3">


              <div className="col-md-12 text-center">
                <label className="col-sm col-form-label" style={{ fontSize: 19 }}>{CONFIG.author} </label>
              </div>
              <div className="col-md-12 mt-3">
                <div className="alert d-none" ref={(alert) => this.alert = alert}>
                  {this.state.msgAlert}
                </div>
              </div>
              <div className="col-md-12 mt-3">



                <form>


                  {this._getInputs()}

                  <div className="col-md-12 mt-5" >

                    <h2>Temas de la aplicacion</h2>

                    <div className="col-md-12" ref={(theme) => this.theme = theme}>

                      {this._getThemes()}

                    </div>


                  </div>




                </form>

                <div className="col-md-12 mt-5 d-flex justify-content-end ">

                  <div className="form-group">



                    <button className="btn btn-danger mr-2" id="delete">Eliminar cliente</button>
                    <button type="submit" className="btn btn-success" id="save" onClick={this.handleSubmit}>Guardar
                    {
                        (this.state.spinner) ?
                          <div className="spinner-border text-white spinner-border-sm ml-2" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                          : null
                      }

                    </button>

                  </div>

                </div>

              </div>



            </div>

          </div>
        </div>

      );
    } else {

      return (

        <div className="row justify-content-center align-items-center" style={{ height: '80vh' }}>


          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>


        </div >


      )

    }

  }
}

export default Home;
