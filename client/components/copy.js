{
  /* <div
              className="hand"
              style={{display: 'flex', justifyContent: 'center'}}
            >
              <div
                className="hand"
                style={{
                  paddingTop: '2vh',
                  paddingBottom: '2vh',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingLeft: '3vh',
                  paddingRight: '3vh'
                }}
              >
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <Player
                    imgUrl={this.props.side.heroUrl}
                    player={this.props.player}
                    side="bottom"
                  />
                  {this.props.hand.map(card => {
                    return (
                      <Draw key={card._id}>
                        <Card
                          card={card}
                          key={card._id}
                          player="hero"
                          inHand={true}
                        />
                      </Draw>
                    )
                  })}
                </div>
                <Chat />
              </div>
            </div> */
}
