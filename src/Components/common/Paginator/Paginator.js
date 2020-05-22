import React, {useState, useEffect} from 'react';
import classes from './Paginator.module.css';

const Paginator = ({totalUsersCount, pageSize, onPageChanged, currentPage, portionSize}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    let [searchPageNumber, setSearchPageNumber] = useState();
    const search = (e) => {
        let value = e.currentTarget.value;
        setSearchPageNumber(+value);
    }

    return (
        <div className={classes.pagination}>
            <div className={classes.paginationPages}>
                <button disabled={portionNumber === 1} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>
                    Prev
                </button>
                {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber).map((page) => {
                    return <div onClick={() => {
                        onPageChanged(page)
                    }} className={currentPage === page && classes.selected} key={page}>{page}</div>
                })}
                <button disabled={portionNumber === portionCount} onClick={() => setPortionNumber(portionNumber + 1)}>
                    Next
                </button>
            </div>
            <div className={classes.searchContainer}>
                <input type="text" placeholder='page...' onChange={search} value={searchPageNumber}/>
                <button onClick={() => {
                    onPageChanged(searchPageNumber)
                }}>Search
                </button>
            </div>
        </div>
    )


}

export default Paginator;
