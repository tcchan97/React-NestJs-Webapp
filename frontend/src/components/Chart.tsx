import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useQuery, gql} from '@apollo/client'
import {LOAD_DATA} from "../queries/Queries"


const state = {
  labels: ['January', 'February', 'March',
    'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
       data: [65, 59, 80, 81, 56]
    },
    {
      label: 'test',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'red',
      borderWidth: 2,
      data: [65, 59, 80, 10, 56]
    }
  ]
}



export const Chart: React.FC = () => {

  const {error, loading, data } = useQuery(LOAD_DATA)



  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 50,
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
  }),
);

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  //const [chartData, setChartData] = React.useState([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  useEffect(() => {
    console.log(data.shemddata);
  }, [data])

  return (
    <div className="mainContainer">
        <div className="buttonContainer">
        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
            <Select
              labelId="Select Label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
            <Select
              labelId="Select Label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
         
        </div>
       
      <Line
        type='line'
        data={state}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  );
}