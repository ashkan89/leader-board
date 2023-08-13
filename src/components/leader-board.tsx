import React, { useEffect, useRef, useState } from 'react'

function LeaderBoard(props: any) {
    const [items, setItems] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const page = useRef(0);
    const finishLoading = useRef(false);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const handleScroll = () => {
        if (listRef?.current?.clientHeight! + listRef?.current?.scrollTop! !== listRef?.current?.scrollHeight || isLoading) {
            return;
        }

        fetchData();
    };

    useEffect(() => {
        listRef?.current?.addEventListener('scroll', handleScroll);
        return () => listRef?.current?.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    const fetchData = () => {
        if (finishLoading.current) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const pageSize = props.boardItems.length - page.current * props.pageSize < props.pageSize ? props.boardItems.length - page.current * props.pageSize : props.pageSize;

            if (pageSize < props.pageSize) {
                finishLoading.current = true;
            }

            const data = props.boardItems.slice(page.current * props.pageSize, page.current * props.pageSize + pageSize);
            setItems((prevItems: any) => [...prevItems, ...data]);
            page.current++;
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="topLeadersList">
                {items.map((leader: any, index: number) => (
                    <div className="leader" key={index}>
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
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </div>

            <div className="playerslist">
                <div className="table">
                    <div>#</div>
                    <div>Name</div>
                    <div>LVL</div>
                    <div>XP</div>
                    <div>Coins</div>
                    <div>Likes</div>
                    <div>Pass</div>
                    <div>Resources</div>
                </div>
                <div className="list" ref={listRef}>
                    {items.map((leader: any, index: number) => (
                        <div className={`player ${index === 9 ? 'sticky' : ''}`} key={index}>
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

export default LeaderBoard
