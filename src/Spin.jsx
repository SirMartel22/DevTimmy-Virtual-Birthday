import React from 'react';

class Spin extends React.Component {

        state = {
          name: "circle",
          isSpinning: false,
          finalRotation: 0
        }
        
        // Define the pages for each color number
        colorPages = {
          1: "/Gifts/Cake",
          2: "/Gifts/Candle",
          3: "/Gifts/Confetti",
          4: "/Gifts/Dancer",
          5: "/Gifts/Giftbox",
          6: "/Gifts/Karaoke",
          7: "/Gifts/Megaphone",
          8: "/Gifts/Meme",
          9: "/Gifts/Shout",
          10: "/Gifts/Superfan"
        }

      startRotation = () => {
        if (this.state.isSpinning) return; //prevent multiple spins

        // calculate random final rotation (multiple full spins + final position)
        const minSpins = 5; //minimum number of full rotations
        const maxSpins = 10; //maximum number of full rotations
        const spins = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins
        const finalAngle = Math.floor(Math.random() * 360); //Final Stopping Angle
        const totalRotation = (spins * 360) + finalAngle;

        this.setState({
          name: "circle start-rotate",
          isSpinning: true,
        });


        // Random spin duration between 2-6 seconds
        const spinDuration = Math.floor(Math.random() * 2000) + 1500;

        setTimeout(() => {
          this.setState({
            name: "circle start-rotate stop-rotate",
            isSpinning: false,
          });

          //Determine which section the arrow points to and redirect
          this.handleSpinResult(totalRotation)
        }, spinDuration);
  }
  
  handleSpinResult = (totalRotation) => {
    // Normalize the rotation 0-360 degrees
    const normalizedRotation = totalRotation % 360;


    // calculate which section the arrow points to
    //Each section is 36 degrees (360/10)
    //We need to account for the arrow pointing down and sections starting from top
    const adjustedAngle = (360 - normalizedRotation + 18) % 360; //+18 to center on sections
    const sectionIndex = Math.floor(adjustedAngle / 36);
    const selectedNumber = (sectionIndex % 10) + 1;

    // show alerts with selected page
    alert(`Hurray you won a wonderful gift for yourself ${this.colorPages[selectedNumber]}!`);

    //redirect to the corresponding page
    // this.props.history.push(this.colorPages[selectedNumber]);
    window.location.href = this.colorPages[selectedNumber];
    // setTimeout(() => {



    //   console.log(`Would redirect to: ${this.colorPages[selectedNumber]}}`)
    // }, 2000)
  }

  render() {
    return (
      <div style={{
        textAlign: 'center',
        padding: '20px',
      }}>
        <h2 style={{
          position: 'relative',
          display: 'inline-block',
          fontWeight: 'bold',
          fontSize: "180%",
          color: "#f5f5f5",
          marginBottom: "50px",
        }}>
          Spin and get a package for attending DevTimmy's Birthday Party
        </h2>

        <div style={{
          position: "relative",
          display: "inline-block"
        }}>
          {/* Arrow */}
          <div style={{
            width: "0",
            height: "0",
            borderLeft: '15px solid transparent',
            borderRight: "15px solid transparent",
            borderTop: "50px solid #f5f5f5",
            position: "absolute",
            left: "50%",
            top: "0",
            zIndex: 10,
            transform: 'translateX(-50)'
          }}>

          </div>

          {/* Spinner Wheel */}
          <ul className={this.state.name} style={{
            width: '18em',
            height: '18em',
            border: "1px solid #fff",
            position: 'relative',
            padding: 0,
            margin: "1em auto",
            borderRadius: '50%',
            listStyle: "none",
            overflow: "hidden"
          }}>
            {['Cake', "Candle", "Confetti", "Dancer", "Giftbox", "Karaoke", "Megaphone", "Meme", "Shout", "Superfan"].map((gift, index) => {
              const colors = ['violet', "blue", "yellow", "green", "orange", "#dda853", 'indigo', 'brown', "#00809d", "#ff8383"];
              const rotation = index * 36;

              return (
                <li key={gift} style={{
                  overflow: 'hidden',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '50%',
                  height: "50%",
                  transformOrigin: "0% 100%",
                  transform: `rotate(${rotation}deg) skewY(-60deg)`
                }}>
                  <div style={{
                    position: 'absolute',
                    left: "-100%",
                    width: '200%',
                    height: '200%',
                    textAlign: "center",
                    display: 'block',
                    transform: 'skewY(60deg) rotate(15deg)',
                    paddingTop: "20px",
                    cursor: 'pointer',
                    fontWeight: "bold",
                    fontSize: "18px",
                    backgroundColor: colors[index]
                  }}>
                    {gift}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* spin button  */}

          <button
            onClick={this.startRotation}
            disabled={this.state.isSpinning}
            style={{
              position: 'absolute',
              left: "50%",
              transform: "translateX(-50%)",
              width: '170px',
              height: '50px',
              backgroundColor: this.state.isSpinning ? '#ccc' : 'rgb(72, 129, 175)',
              borderRadius: '10px',
              marginTop: "20px",
              outline: "none",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              cursor: this.state.isSpinning ? 'not-allowed' : 'pointer'
            }}
          >
            {this.state.isSpinning ? 'Spinning...' : 'spin'}
          </button>
        </div>

        <style jsx>{`
          .start-rotate {
            animation: start-rotate 1s linear infinite;
          }
            @keyframes start-rotate {
              100% {
                transform: rotate(360deg);
              }
            }
        
            .stop-rotate {
              animation-play-state: paused;
            }
        
        `}

        </style>
      
      </div>
    );
  }
}

export default Spin;