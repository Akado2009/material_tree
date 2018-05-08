import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import lightGreen from 'material-ui/colors/lightGreen'
import orange from 'material-ui/colors/orange'


const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: orange,
  },
  typography: {
    fontSize: 12
  }
})

const data = [
    {
        "id": 1,
        "name": "GEO",
        "platforms": [
            {
                "id": 1,
                "name": "A-MEXP-2072",
                "database": "GEO",
                "series_count": 7,
                "sample_count": 418
            },
            {
                "id": 10,
                "name": "GPL11154",
                "database": "GEO",
                "series_count": 1,
                "sample_count": 2
            },
            {
                "id": 8,
                "name": "GPL570",
                "database": "GEO",
                "series_count": 1,
                "sample_count": 4
            },
            {
                "id": 3,
                "name": "GPL7202",
                "database": "GEO",
                "series_count": 3,
                "sample_count": 8
            },
            {
                "id": 11,
                "name": "GPL7350",
                "database": "GEO",
                "series_count": 1,
                "sample_count": 0
            },
            {
                "id": 2,
                "name": "GPL8234",
                "database": "GEO",
                "series_count": 1,
                "sample_count": 11
            },
            {
                "id": 4,
                "name": "GPL96",
                "database": "GEO",
                "series_count": 1,
                "sample_count": 30
            }
        ]
    },
    {
        "id": 2,
        "name": "TCGA",
        "platforms": [
            {
                "id": 17,
                "name": "RNA_seq",
                "database": "TCGA",
                "series_count": 34,
                "sample_count": 11284
            }
        ]
    },
    {
        "id": 3,
        "name": "Pax-db",
        "platforms": [
            {
                "id": 19,
                "name": "LC-MS/MS",
                "database": "Pax-db",
                "series_count": 148,
                "sample_count": 148
            }
        ]
    },
    {
        "id": 4,
        "name": "Methylome",
        "platforms": [
            {
                "id": 20,
                "name": "GPL13534",
                "database": "Methylome",
                "series_count": 1,
                "sample_count": 9
            }
        ]
    }
]

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App data={data}/>
  </MuiThemeProvider>,
  document.getElementById('root')
)
