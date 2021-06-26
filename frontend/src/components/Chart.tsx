import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { LOAD_DATA, All_DeviceId, All_SerialNumbers, LOAD_SN, LOAD_DI, LOAD_SN_DI } from "../queries/Queries";
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Chart.css';

const state = {
  labels: [] as any,
  datasets: [] as any,
  options: {
    title: {
      display: true,
      text: 'Wattage vs Time for electrical consumption for a group of homes ',
      fontSize: 20
    },
    scales: {
      x: [{
        type: 'time',
        time: {
          unit: 'hour',
          stepSize: 3, // I'm using 3 hour intervals here
          tooltipFormat: 'HH:mm',
        },
        ticks: {
          major: {
            enabled: true, 
            fontStyle: 'bold', 
            fontSize: 14 
          },
        },
      }],
      y: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        },
      }]
    }
  }
}

const legend = {
  display: true,
  position: 'right'
};

const options = {
  title: {
    display: true,
    text: 'Wattage vs Time for electrical consumption for a group of homes ',
    fontSize: 20
  },
  scales: {
    xAxes: [{
      type: 'time',
      time: {
        unit: 'hour',
        stepSize: 3, 
        tooltipFormat: 'HH:mm',
      },
      ticks: {
        major: {
          enabled: true,
          fontStyle: 'bold', 
          fontSize: 14 
        },
      },
    }],
    yAxes: [{
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Value'
      },
    }]
  }
};


export const Chart: React.FC = () => {


  const DIData = useQuery(All_DeviceId);
  const SNData = useQuery(All_SerialNumbers);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
      },
      selectEmpty: {
        marginTop: theme.spacing(1),
      },
    }),
  );

  const classes = useStyles();
  const [serialNumberMenu, setSerialNumberMenu] = React.useState([]);
  const [serialNumberFilter, setSerialNumberFilter] = React.useState<String>("None");
  const [deviceIdMenu, setdeviceIdMenu] = React.useState([]);
  const [deviceIdFilter, setdeviceIdFilter] = React.useState<String>("None");
  const [filterSelectedSN, setFilterSelectedSN] = React.useState<String>("None");
  const [filterSelectedDI, setFilterSelectedDI] = React.useState<String>("None");
  const [filterSelected, setFilterSelected] = React.useState<any>();
  const [loadingGraph, setLoadingGraph] = React.useState(false);
  const [loadingData, setLoadingData] = React.useState(false);

  const [allData, { called, loading, data }] = useLazyQuery(
    filterSelected, {
    variables: { serialNumber: serialNumberFilter, deviceId: deviceIdFilter },
  }
  );

  const handleChangeSN = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSerialNumberFilter(event.target.value as string);
    if (filterSelected === LOAD_DI) {
      if (event.target.value != "All") {
        setFilterSelected(LOAD_SN_DI);
      }
      setFilterSelectedSN("SN");
    }
    else if (event.target.value === "All") {
      //console.log("DI filter 2", filterSelectedDI);
      if (filterSelectedDI === "DI") {
        setFilterSelected(LOAD_DI);
        setFilterSelectedSN("All");
      }
      else {
        setFilterSelected(LOAD_DATA);
        setFilterSelectedSN("All");
      }
    }
    else {
      if (filterSelectedSN === "DI") {
        setFilterSelected(LOAD_SN_DI);
      }
      else {
        setFilterSelected(LOAD_SN);
        setFilterSelectedSN("SN");
      }

    }
    setLoadingGraph(false);
  };

  const handleChangeDI = (event: React.ChangeEvent<{ value: unknown }>) => {
    setdeviceIdFilter(event.target.value as string);

    if (filterSelected === LOAD_SN) {
      if (event.target.value != "All") {
        setFilterSelected(LOAD_SN_DI);
      }
      setFilterSelectedDI("DI");
    }
    else if (event.target.value === "All") {
      if (filterSelectedSN === "SN") {
        setFilterSelected(LOAD_SN);
        setFilterSelectedDI("All");
      }
      else {
        setFilterSelected(LOAD_DATA);
        setFilterSelectedDI("All");
      }
    }
    else {
      if (filterSelectedSN === "SN") {
        setFilterSelected(LOAD_SN_DI);
      }
      else {
        setFilterSelected(LOAD_DI);
        setFilterSelectedDI("DI");
      }

    }
    setLoadingGraph(false);
    setLoadingGraph(false);
  };

  useEffect(() => {
    //console.log(data);
    var menuSerialNumber = [] as any;
    menuSerialNumber.push(<MenuItem key="All" value="All"> All </MenuItem>)
    if (SNData.data) {
      //console.log(SNData.data.getAllSerialNumbers);
      SNData.data.getAllSerialNumbers.map((value: any) =>
        menuSerialNumber.push(<MenuItem key={value.serialNumber} value={value.serialNumber}> {value.serialNumber} </MenuItem>)
      )

      SNData.data.getAllSerialNumbers.map((value: any) =>
        state.datasets.push({
          label: value.serialNumber,
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        })
      )

      setSerialNumberMenu(menuSerialNumber)
      setLoadingData(true)
      setLoadingGraph(true);
    }
    console.log(state)
  }, [SNData])

  useEffect(() => {
    var menuDeviceId = [] as any;
    menuDeviceId.push(<MenuItem key="All" value="All"> All </MenuItem>)
    if (DIData.data) {
      //console.log(DIData.data.getAllDeviceId);
      DIData.data.getAllDeviceId.map((value: any) =>
        menuDeviceId.push(<MenuItem key={value.deviceId} value={value.deviceId}> {value.deviceId} </MenuItem>)
      )
      setdeviceIdMenu(menuDeviceId)
    }
  }, [DIData])

  useEffect(() => {

    if (filterSelected != undefined) {
      allData();
    }

  }, [filterSelected])


  useEffect(() => {
    console.log(data);
    console.log("DI filter ", filterSelectedDI);
    console.log("SN filter ", filterSelectedSN);
    if (data) {
      refactorData(data);
    }
  }, [data])


  function refactorData(data: any) {
    for (let i = 0; i < state.datasets.length; i++) {
      state.datasets[i].data = [] as any;
    }
    state.labels = [];

    var dataType = '' as any;
    if (filterSelected == LOAD_DATA) {
      dataType = data.shemddata;
    }
    else if (filterSelected == LOAD_SN) {
      dataType = data.filterSerialNumber;
    }
    else if (filterSelected == LOAD_DI) {
      dataType = data.filterDeviceId;
    }
    else if (filterSelected == LOAD_SN_DI) {
      dataType = data.filterBoth;
    }
    console.log("data before", data);
    console.log("datatype", dataType);
    for (let i = 0; i < dataType.length; i++) {

      for (let j = 0; j < state.datasets.length; j++) {
      
        if (state.datasets[j].label === dataType[i].serialNumber) {

          const values = {
            y: parseFloat(dataType[i].wattage),
            x: moment(dataType[i].dateTime).format('h:mm a')
          }
          state.datasets[j].data?.push(values)

        }
      }
    }
    console.log(state);
    setLoadingGraph(true);
  }

  if (loadingData) {
    return (
      <div className="mainContainer">
        <div className="buttonContainer">
          <div className="filterTitle">Filters</div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel >Serial Number</InputLabel>
            <Select
              labelId="SerialNumberLabel"
              id="SerialNumber"
              value={serialNumberFilter}
              onChange={handleChangeSN}
            >
              {serialNumberMenu}
            </Select>
          </FormControl>

          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel >Device Id</InputLabel>
            <Select
              labelId="deviceIdLabel"
              id="deviceId"
              value={deviceIdFilter}
              onChange={handleChangeDI}
            >
              {deviceIdMenu}
            </Select>
          </FormControl>
        </div>
        { loadingGraph ?
          <div className="graphContainer">
            <div className="graphTitle">Wattage vs Time for Electrical Consumption For a Group of Homes </div>
            <Line
            type='line'
            data={state}
            options={{
              title: {
                display: true,
                text: 'Wattage vs Time for electrical consumption for a group of homes ',
                fontSize: 20
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    unit: 'hour',
                    stepSize: 3, // I'm using 3 hour intervals here
                    tooltipFormat: 'HH:mm',
                  },
                  ticks: {
                    major: {
                      enabled: true, // <-- This is the key line
                      fontStyle: 'bold', //You can also style these values differently
                      fontSize: 14 //You can also style these values differently
                    },
                  },
                }],
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Value'
                  },
                }]
              }
            }}
          /></div> : <div className="loadingContainer"><div className="loadingTitle">Loading Data</div> <CircularProgress /></div>}

      </div>
    );
  }
  else {
    return (
      <div className="mainContainer">
        <div className="loadingContainer"><div className="loadingTitle">Loading Application</div> <CircularProgress /></div>
      </div>
    )
  }

}