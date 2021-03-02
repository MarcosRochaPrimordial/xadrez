import React, { useState, useEffect, useRef } from "react";
import { Pagination } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { ApplicationState } from "../../../core/store";
import { Search } from "../../../core/store/ducks/Search/types";
import * as SearchActions from './../../../core/store/ducks/Search/actions';
import { usePrevious } from './../../utils/UsePrevious';

interface StateProps {
    search: Search,
};

interface DispatchProps {
    paginateAction(pageStart: number, pageEnd: number): void;
};

interface OwnProps {
    data: any[];
}

type Props = StateProps & DispatchProps & OwnProps;

const PaginationLayout = (props: Props) => {
    const [actualIndex, setActualIndex] = useState(1);
    const { paginateAction, data, search } = props;
    const prevSearch = usePrevious<Search>(search);
    useEffect(() => {
        if (prevSearch && prevSearch.searchWord !== search.searchWord) {
            paginate(1);
        }
    });

    const firstPage = () => {
        paginate(1);
    }

    const previousPage = () => {
        const index = actualIndex - 1;
        paginate(index);
    }

    const nextPage = () => {
        const index = actualIndex + 1;
        paginate(index);
    }

    const paginate = (index: number) => {
        const start = ((index - 1) * 10);
        const end = index * 10;
        paginateAction(start, end);
        setActualIndex(index);
    }

    return (
        <Pagination>
            <Pagination.First disabled={actualIndex === 1} onClick={firstPage.bind(this)} />
            <Pagination.Prev disabled={actualIndex === 1} onClick={previousPage.bind(this)} />

            <Pagination.Item active>{actualIndex}</Pagination.Item>

            <Pagination.Next disabled={data.length < 10} onClick={nextPage.bind(this)} />
        </Pagination>
    );
}

const mapStateToProps = (state: ApplicationState) => ({
    search: state.search.search
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...SearchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaginationLayout);