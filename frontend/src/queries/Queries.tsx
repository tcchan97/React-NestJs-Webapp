import { gql } from '@apollo/client'

export const LOAD_DATA = gql`
# Write your query or mutation here
query{
  shemddata {
    serialNumber
    dateTime
    deviceId
    wattage
  }
}
`

export const LOAD_SN  = gql`
# Write your query or mutation here
query($serialNumber: String!){
  filterSerialNumber(serialNumber: $serialNumber) {
    serialNumber
    dateTime
    deviceId
    wattage
  }
}
`

export const LOAD_DI  = gql`
# Write your query or mutation here
query($deviceId: String!){
  filterDeviceId( deviceId: $deviceId) {
    serialNumber
    dateTime
    deviceId
    wattage
  }
}
`

export const LOAD_SN_DI  = gql`
# Write your query or mutation here
query($serialNumber: String!, $deviceId: String!){
  filterBoth(serialNumber: $serialNumber, deviceId: $deviceId) {
    serialNumber
    dateTime
    deviceId
    wattage
  }
}
`


export const All_SerialNumbers = gql`
# Write your query or mutation here
query{
  getAllSerialNumbers {
    serialNumber
  }
}
`



export const All_DeviceId = gql`
# Write your query or mutation here
query{
  getAllDeviceId {
    deviceId
  }
}
`