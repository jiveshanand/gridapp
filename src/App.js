import React from 'react';
import './App.css';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const GridBox = styled.div`
  height: 100px;
  width:  ${props => `${props.width}px`};
  border: 1px dashed black;
  margin-right: 5px;
  margin-left: 5px;
`;
const GridBox1 = styled.div`
  height: 100px;
  width:  ${props => `${props.width}px`};
  border: 1px soli black;
  background: darkcyan;
  margin-right: 5px;
  margin-left: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MainContainer = styled.div`
  margin-top: 20px;
`;

const ElementsContainer = styled.div`
  margin: 20px;
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function App() {
  const [box, setBox] = React.useState(0);
  const [boxCountArray, setBoxCountArray] = React.useState([]);
  const [availableBoxes, setAvailableBoxes] = React.useState([]);
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const [columnCount, setColumnCount] = React.useState('');

  
  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleChange = (event) => {
    setColumnCount(event.target.value);
  };

  const addBox = (uniqueBox) => {
    setAvailableBoxes([...availableBoxes, uniqueBox]);
    setBoxCountArray([...availableBoxes, uniqueBox]);
  }

  const handleAddBox = () => {
    if ((box + 1) <= columnCount ) {
      setBox(box+1);
      addBox(box+1);
    }
  }

  const handleRemoveBox = (boxToRemove) => {
    setBox(box-1);
    availableBoxes.pop();
    const array = boxCountArray.filter(item => {
      return item !== boxToRemove
    });
    setAvailableBoxes([...availableBoxes]);
    setBoxCountArray([...array]);
  }

  const handleReset = () => {
    setBox(0);
    setBoxCountArray([]);
    setAvailableBoxes([]);
    setColumnCount('');
  }
  
  return (
    <MainContainer>
      <div style={{display: 'flex', justifyContent: 'center', pointer: 'cursor', fontSize: '25px'}}>
        <Typography 
          sx={{align: 'center'}}
          varient="h4"
          fontWeight= '600'
          fontSize="32px"
        >
                Data Grid Application
        </Typography>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', pointer: 'cursor', fontSize: '25px'}}>
        <ElementsContainer>
            <Stack spacing={4} direction="row">
              <Dropdown
                columnCount={columnCount}
                setColumnCount={setColumnCount}
                handleChange={handleChange}/>
              <Button variant="contained" onClick={() => handleAddBox()}>Add Box</Button>
              <Button variant="contained" onClick={() => handleReset()}>Reset Grid</Button>
            </Stack>
        </ElementsContainer>
      </div>
      <Container>
        {
          [...Array(columnCount).keys()].map((item, index) => {
            if (availableBoxes.length >= index+1) {
              return (
                <GridBox1 onClick = {() => handleRemoveBox(index + 1)} width={(windowDimensions.width - (columnCount*10 + 30)) / columnCount}>
                  <div style={{display: 'flex', justifyContent: 'flex-end', cursor: 'pointer', color: 'white', margin: '5px'}}>
                    <span>X</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'center', pointer: 'cursor', color: 'white', fontSize: '25px'}}>
                    {boxCountArray[index]}
                  </div>
                </GridBox1>
              )
            }
            return (
              <>
                {columnCount && <GridBox width={(windowDimensions.width - (columnCount*10 + 30)) / columnCount} />}
              </>
            );
          })
        }
      </Container>
    </MainContainer>
  );
}

export default App;

