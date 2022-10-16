//*This project was performed following "https://reactjs.org/tutorial/tutorial.html" for this first commit, for commits after the first changes are made on my own.
//*Challenges presented fo the end of this game are:
//*1. Display the location for each move in the format (col, row) in the move history list.
//*2. Bold the currently selected item in the move list.
//*3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
//*4. Add a toggle button that lets you sort the moves in either ascending or descending order.
//*5. When someone wins, highlight the three squares that caused the win.
//*6. When no one wins, display a message about the result being a draw.
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// //This component just renders a button called "Square", this class will be replaced by a function component to be able to manage more easily
// class Square extends React.Component {
//     constructor(props) { //this constructor allows the state of the square to be saved and changed upon click
//         super(props); //On JS, we need to ALWAYS call the "super(props)" when we define a constructor on a subclass of React
//         this.state = {
//             value: null,
//         };
//     }
//     render() {
//         return ( 
//             // <button className="square" onClick={function() { console.log('click'); }}> {/*Here, when the button is clicked, a console log appear saying "Click", this is achieved through the event listener "onClick={}" and assigning a function to it to console log. */} 
//             // {this.props.value} {/*This line makes the property value from the button to be shown on top of button*/}
//             // <button className="square" onClick={ () => this.setState({value : 'X'})}> {/* Here, when the button is clicked, the State of the button is set to be an "X" upon click, through an arrow function*/}
//             // {this.state.value} {/*This line makes the state value from the button to be shown on top of button*/}
//             <button className="square" onClick={ () => this.props.onClick()}> {/*The setState propertie is changed to props.onClick() to be able to hear an event Click from it father (board)*/}
//             {this.props.value} {/*We return to the previos this.props.value to show the information from */}
//             </button>
//         );
//     }
// }
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function calculateWinner(squares) { //This is a function to evaluate if there is a winner for tic tac toe
    const lines = [ //Here is defined all the possibilities to declare a winner, 3 in a row of the same sign
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) { //here the possibilities array will be read from start to end to determine if there is a winner
        const [a, b, c] = lines[i]; //here just takes position of each posibilitiy to determine a winner and split them into individual variables
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { //here the state of the square on each position is evaluated and if it is the same a winner is found and returned
            return squares[a];
        }
    }
    return null;
}

//This component render the full board to play tic tac toe
class Board extends React.Component { //This function cast the board into an array of arrays
    // //This constructor is removed because the father (game) is the one that is going to handle props
    // constructor(props) { //This constructor is to be able to asign state to each child component (square) 
    //     super(props); //Always with the constructor, we place the "super(props)" as it is a child class from React
    //     this.state = { //define the state of the board
    //         squares : Array(9).fill(null), //here we prefill the state of each child square with a null value
    //         xIsNext : true, //this key is added to specify that "X" will alway be the first player on the game, this will be changed everytime upon click on squares with the handleClick function below
    //     };
    // }
    // //This function is also removed because the father (game) is th eone that is going to handle the clicks
    // handleClick(i) { //This function defines the new state of each of the squares of the board
    //     const squares = this.state.squares.slice(); //this defines a new array that copies the previous state of the board squares states array
    //     // squares[i] = 'X'; //This line is change to the line below to be able to determine what players turn is
    //     if (calculateWinner(squares) || squares[i]) { //this blocks the game to be played anymore if there is a winner or if a square is already clicked
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O'; //the combination of "?" and ":" is a way of defining what will be the state according to turn in the game, if this.state.xIsNext is true then the value for the state will be 'X', if it is false then the value for the state will be 'O'
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext, //This key is added to change the player each time a click is made
    //     });
    // }
    renderSquare(i) { //this function have one parameter that gives the position of the square button on the board
        // return <Square value={i} />//this line sets the property value of the square to the given parameter when casted;
        // return (<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>); //this line sets the property state based on the father properties defined above when casted; a new function is added to be called upon click to be able to change the father property state when square (son) is clicked.
        return (<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>); //this line replace the previous as it is going to receive the information from the father through the properties, so the state for the squares and the handleClick function should be modified to include the props from the father
    }
    render() {
        // //The next lines are moved from this component (son) to the father in order to be rendered from there
        // const winner = calculateWinner(this.state.squares); //the function to determine the winner is called on every change made
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); //here we add the same ternary operator defined on the handleClick function to show the user what will be the next sign to appear on screen
        // }
        return (
            <div>
                {/* <div className="status">{status}</div> this line is also removed as the status is being rendered from tyhe father */}
                {/* First row of the board */}
                <div className="board-row">
                    {this.renderSquare(0)} 
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                {/* Second row of the board */}
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                {/* Third row of the board */}
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) { //This constructor is to be able to asign state to each child component (board and square) 
        super(props);
        this.state = {
            history : [{
                squares : Array(9).fill(null), 
            }],
            stepNumber : 0, //this step is to define which movement are we in any moment.
            xIsNext : true,
        };
    }
    handleClick(i) { //This function defines the new state of each of the squares of the board
        const history = this.state.history.slice(0, this.state.stepNumber + 1); //this line is added to be able to determine the history of movements, the ".slice()" method is also added to copy the history and not change it as it is but now we add parameter to make sure that when a movement is done after we go back on time, the history represents the new reality of the game
        const current = history[history.length - 1]; //this line is added to specify that the last movement from history is the current one where the states for each square is going to be rendered
        const squares = current.squares.slice(); //this defines a new array that copies the last state of the board squares (same as the "current" states) states array,
        // squares[i] = 'X'; //This line is change to the line below to be able to determine what players turn is
        if (calculateWinner(squares) || squares[i]) { //this blocks the game to be played anymore if there is a winner or if a square is already clicked
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //the combination of "?" and ":" is a way of defining what will be the state according to turn in the game, if this.state.xIsNext is true then the value for the state will be 'X', if it is false then the value for the state will be 'O'
        this.setState({
            history: history.concat([{ //here we add each of the new states to the property history
                squares: squares,
            }]),
            stepNumber : history.length, //this line makes the step number to be updated on every movement (succesful click)
            xIsNext: !this.state.xIsNext, //This key is added to change the player each time a click is made
        });
    }
    jumpTo(step) { //This function specifies to what movement we wish to return and also sets the value of the next player according to the rules defined previously
        this.setState({ //renders the state of the game to the specified movement
            stepNumber : step, //defines the movement to go
            xIsNext : (step % 0) === 0, //defines the player next to go accorginto the movement to go
        });
    }
    render() {
        const history = this.state.history; //defines a variable that adds the history for the game
        // const current = history[history.length - 1]; // the last movement from the history is the current movement rendered on the screen
        const current = history[this.state.stepNumber]; //this line replaces the above one because we want teh game to render always the the movement from the stepNumber, either if it is the last from the normal game or if it is reffered from any button from the "jumpTo" function.
        const winner = calculateWinner(current.squares); //the function to determine the winner is called on every change made
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player:'+ (this.state.xIsNext? 'X' : 'O'); //here we add the same ternary operator defined on the handleClick function to show the user what will be the next sign to appear on screen
        }
        //The following lines just add the history of the movements (states from the history) and renders them on screen
        const moves = history.map((step, move) => { //here "step" references the current value of history, and "move" references the index of the current value of history
            const desc = move ?
                'Go to move # ' + move :
                'Go to game start';
            return ( //for each element in the history array, a new "li" element is created which containe a button, this button have a "onClick" handler that calls a function "jumpTo()" taht will allow us to set the game to a previous state (from the history array)
                    <li key={move}> {/*The "key" is used to identify each of the elements on a dynamic list */}
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/> {/*Here is specified that the propertie squates of the board is the same as the current move and the onClick function is added to this father*/}
                </div>
                <div className="game-info">
                    <div>{status}</div> {/*just display the status from the father*/}
                    <ol>{moves}</ol> {/* here we reference the "moves" variable created on the block avobe to be able to effectively render the dynamic list on screen*/}
                </div>
            </div>
        );
    }
}
  
  // ========================================
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);


//*Please see below the full code without comments
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// function Square(props) {
//     return (
//         <button className="square" onClick={props.onClick}>
//             {props.value}
//         </button>
//     );
// }
// function calculateWinner(squares) {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//             return squares[a];
//         }
//     }
//     return null;
// }
// class Board extends React.Component {
//     renderSquare(i) {
//         return (<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>);
//     }
//     render() {
//         return (
//             <div>
//                 <div className="board-row">
//                     {this.renderSquare(0)} 
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         );
//     }
// }
// class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             history : [{
//                 squares : Array(9).fill(null), 
//             }],
//             stepNumber : 0,
//             xIsNext : true,
//         };
//     }
//     handleClick(i) {
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         this.setState({
//             history: history.concat([{
//                 squares: squares,
//             }]),
//             stepNumber : history.length,
//             xIsNext: !this.state.xIsNext,
//         });
//     }
//     jumpTo(step) {
//         this.setState({
//             stepNumber : step,
//             xIsNext : (step % 0) === 0,
//         });
//     }
//     render() {
//         const history = this.state.history;
//         const current = history[this.state.stepNumber];
//         const winner = calculateWinner(current.squares);
//         let status;
//         if (winner) {
//             status = 'Winner: ' + winner;
//         } else {
//             status = 'Next player:'+ (this.state.xIsNext? 'X' : 'O');
//         }
//         const moves = history.map((step, move) => {
//             const desc = move ?
//                 'Go to move # ' + move :
//                 'Go to game start';
//             return (
//                     <li key={move}>
//                         <button onClick={() => this.jumpTo(move)}>{desc}</button>
//                     </li>
//             );
//         });
//         return (
//             <div className="game">
//                 <div className="game-board">
//                     <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
//                 </div>
//                 <div className="game-info">
//                     <div>{status}</div>
//                     <ol>{moves}</ol>
//                 </div>
//             </div>
//         );
//     }
// } 
//   // ========================================  
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);