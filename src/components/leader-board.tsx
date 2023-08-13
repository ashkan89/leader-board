import React from 'react'
import PropTypes from 'prop-types'

function LeaderBoard(props: any) {
    return (
        <div className="container">
            <div className="topLeadersList">
                {props.items.map((leader: any, index: number) => (
                    <div className="leader" key={leader.id}>
                        {index + 1 <= 3 && (
                            <div className="containerImage">
                                <img className="image" loading="lazy" src={leader.image} alt='' />
                                <div className="crown">
                                    <svg
                                        id="crown1"
                                        fill="#0f74b5"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 50"
                                    >
                                        <polygon
                                            className="cls-1"
                                            points="12.7 50 87.5 50 100 0 75 25 50 0 25.6 25 0 0 12.7 50"
                                        />
                                    </svg>
                                </div>
                                <div className="leaderName">{leader.name}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="playerslist">
                <div className="table">
                    <div>#</div>
                    <div>Name</div>
                    <div>LVL</div>
                    <div>XP</div>
                    <div>
                        Coins
                    </div>
                    <div>
                        Likes
                    </div>
                    <div>
                        Pass
                    </div>
                    <div>
                        Resources
                    </div>
                </div>
                <div className="list">
                    {props.items.map((leader: any, index: number) => (
                        <div className={`player ${index === 9 ? 'sticky' : ''}`} key={leader.id}>
                            <span> {index + 1}</span>
                            <div className="user">
                                <img className="image" src={leader.image} alt='' />
                                <span> {leader.name} </span>
                            </div>
                            <span> {leader.level} </span>
                            <span> {leader.xp} </span>
                            <span> {leader.coins} </span>
                            <span> {leader.love} </span>
                            <span> {leader.beacons} </span>
                            <span> {leader.resources} </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

LeaderBoard.propTypes = {
    items: []
}

export default LeaderBoard
