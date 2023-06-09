import React from 'react';
import { Image } from "react-native";

export type RandomBackgroundIconsProps = {
  noOfRows: number;
  noOfColumns: number;
}

const backgroundIconProvider = (index: number) => {
  switch(index) {
    case 0:
      return require('@assets/images/background/wifi.png');
    case 1:
      return require('@assets/images/background/mobile.png');
    case 2:
      return require('@assets/images/background/laptop.png');
    case 3:
      return require('@assets/images/background/small-mobile.png');
    default:
      return require('@assets/images/background/wifi.png')
  }
}


export const RandomBackgroundIcons = ({
  noOfRows,
  noOfColumns,
}: RandomBackgroundIconsProps) => {
  return (<>
    {
      Array.from(Array(noOfRows).keys()).map((rValue, row) => {
        return Array.from(Array(noOfColumns).keys()).map((cValue, column) => {
          return <Image
          key={rValue + cValue}
          source={backgroundIconProvider((row + column)%4)}
          style={{
            position: 'absolute',
            left: row * 85,
            top: column * 80,
            zIndex: -1
          }}
        />
        })
      }) 
    }
  </>)
}