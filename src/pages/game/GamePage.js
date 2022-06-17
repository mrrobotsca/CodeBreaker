import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { COLORS,randomInArray } from "../../utils";
import { useDispatch, useSelector } from '../../redux/store';
import { addGuessedBlocs,resetGuessedBlocs } from '../../redux/slices/blocs';
import useCountdown from '../../hooks/useCountdown';
import useModalToggle from '../../hooks/useModalToggle';
import useAuth from '../../hooks/useAuth';
import ConfettiShow from "../../components/Confetti";
import Modal from "../../components/Modal";
import UserInfo from "../../components/UserInfo"


const initialGuess = [ null,null,null,null,null];
/**
 * Note: A user should only be able to access this page if they are logged in
 *
 * This boilerplate does not include the randomly generated code at all.
 * It only shows an example of how to create a "guess" for the code and some basic UI to support it.
 *
 * An example code would be [red, red, blue, yellow, green], the user then would want to guess those colors in row.
 * If one of the colors they guess is correct and in the right position, they should be shown.
 */
function GamePage() {
  // Local States
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [intialColors, setInitialColors] = useState([])
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [isDisplayed, setIsDisplayed] = useState(false);
  // Redux States
  const { guessedBlocs } = useSelector((state) => state.blocs);
  // Hooks
  const {countdown,stopProcess,resteCountDown} = useCountdown(new Date());
  const [open, setOpen] = useModalToggle(false)
  const { user,logout } = useAuth();

  // Redux dispacher
  const dispatch = useDispatch();

  const onNewGame = () => {
    const randomColors = [...Array(5)].map((_, index) =>randomInArray(COLORS) );
    setInitialColors(randomColors)
    setCurrentGuess(initialGuess);
    dispatch(resetGuessedBlocs())
    setIsDisplayed(false);
    resteCountDown()
  };

  useEffect(()=>{
    onNewGame()

  },[])

  const onGuessCode = () => {

     let guessedBloc= intialColors.map((item, idx) => {
        var temp = Object.assign({});;
        if (item=== currentGuess[idx]) {
          temp['isGuessed'] = true;
        }else{
          temp['isGuessed'] = false
        }
        temp.color = currentGuess[idx]

        return temp;
      })

    dispatch(addGuessedBlocs(guessedBloc))
    const isBelowThreshold = (currentValue) => currentValue.isGuessed;
    if(guessedBloc.every(isBelowThreshold)){
      stopProcess()
      setIsDisplayed(true);
      setOpen(true);
    }
    // TODO: Finish scoring a guess. Compare colors to the generate code and let uses know if the guessed right. Keep track of previous guesses.
  };

  const onSelectColor = (color) => () => setSelectedColor(color);

  const onGuessColor = (index) => () => {
    setCurrentGuess(
      currentGuess.map((guess, idx) => (idx === index ? selectedColor : guess))
    );

  };

  const onLogout = () => {
    logout()
  };

  return (
    <>
      <Header>
        <UserInfo 
        name={user?.firstName}
        avatar={user?.avatarUrl}
        />
        <h1 className="mb-0">Code Breaker</h1>
        <ControlButton variant="light" onClick={onLogout}>
          Logout
        </ControlButton>
      </Header>
      <Container>
        {isDisplayed && <ConfettiShow run={false} />}
        <GameColumn>
          <div className="d-flex pt-3 align-items-center">
            <Button variant="secondary" disabled={isDisplayed} onClick={onGuessCode}>Guess</Button>
            <div className="d-flex px-3">
              <GuessBlock color={currentGuess[0]} onClick={onGuessColor(0)} />
              <GuessBlock color={currentGuess[1]} onClick={onGuessColor(1)} />
              <GuessBlock color={currentGuess[2]} onClick={onGuessColor(2)} />
              <GuessBlock color={currentGuess[3]} onClick={onGuessColor(3)} />
              <GuessBlock color={currentGuess[4]} onClick={onGuessColor(4)} />
            </div>
          </div>
          <GuessColumn>
          {guessedBlocs.map((block,index)=>(
            <div key={index} className="d-flex px-3 py-3">
              {block.map((color,index)=>(<GuessBlock key={index} color={color.color} isGuessed={color.isGuessed} />))}
            </div>
            ))}
          </GuessColumn>
          {/* TODO: List out previous guesses  */}
        </GameColumn>
        <ControlsColumn>
          {COLORS.map((color) => (
            <ColorChoice
              color={color}
              key={color}
              active={selectedColor === color}
              onClick={onSelectColor(color)}
            />
          ))}
          <TimeDisplay>{countdown.minutes}:{countdown.seconds}</TimeDisplay>
          <ControlButton className="mb-3" onClick={onNewGame}>
            Start New Game
          </ControlButton>

        </ControlsColumn>
        <Modal showModal={open} toggle={setOpen} time={countdown}/>
      </Container>
    </>
  );
}

export default GamePage;

// styles

const Header = styled.header`
  text-transform: uppercase;
  color: var(--secondary);
  background: var(--light);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
  text-align: center;
  border-bottom: 1px solid var(--secondary);
  padding: 1rem;

  & > h1 {
    font-size: 2rem;
  }
`;

const Container = styled.div`
  margin: 1rem auto;
  display: flex;
  width: 40rem;
`;

const GameColumn = styled.div`
  margin-right: 3rem;
`;

const GuessColumn = styled.div`
  display:flex;
  flex-direction:column;
  align-items: flex-end;
  justify-content: space-between;
  

`;

const ControlsColumn = styled.div`
  width: 10rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  max-height: 15rem;
`;

const ColorChoice = styled.div`
  border-radius: 4px;
  background: ${(props) => props.color};
  width: 100%;
  height: 3.5rem;
  border: ${(props) => (props.active ? "4px solid var(--dark)" : "none")};
  cursor: pointer;
`;

const GuessBlock = styled.div`
  border: ${(props) => (props.color ? "none" : "2px dashed #eee")};
  border-radius: 4px;
  height: 3rem;
  width: 3rem;
  margin: 0 0.5rem;
  background: ${(props) => (props.color ? props.color : "white")};
  ${({ isGuessed }) =>isGuessed && 'border:solid 5px green' };
  cursor: pointer;
`;

const TimeDisplay = styled.p`
  text-align: center;
  grid-column: span 2;
  color: var (--secondary);
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 0rem;
`;

const ControlButton = styled(Button)`
  grid-column: span 2;
`;
