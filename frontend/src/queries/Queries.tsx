import { gql } from '@apollo/client'

export const LOAD_DATA = gql`
# Write your query or mutation here
query{
  shemddata {
    serialNumber
    dateTime
    deviceId
    deviceName
    userDeviceName
    deviceType
    deviceMake
    deviceModel
    deviceLocation
    wattage
  }
}
`