import React, { Component } from "react";
import { Pagination } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ApplicationState } from "../../../core/store";
import { Search } from "../../../core/store/ducks/Search/types";
import * as SearchActions from './../../../core/store/ducks/Search/actions';

interface IState {
    actualIndex: number;
}

interface StateProps {
    search: Search,
};

interface DispatchProps {
    paginateAction(pageStart: number, pageEnd: number): void;
};

type Props = StateProps & DispatchProps;

class PaginationLayout extends Component<Props, IState> {

    constructor(props: Props) {
        super(props);
    }

    state: IState = {
        actualIndex: 1,
    };

    componentDidUpdate(previousProps: Props) {
        if (previousProps.search.searchWord !== this.props.search.searchWord) {
            this.paginate(1);
        }
    }

    firstPage() {
        this.paginate(1);
    }

    previousPage() {
        const index = this.state.actualIndex - 1;
        this.paginate(index);
    }

    nextPage() {
        const index = this.state.actualIndex + 1;
        this.paginate(index);
    }

    lastPage(lastPage: number) {
        this.paginate(lastPage);
    }

    paginate(index: number) {
        const start = ((index - 1) * 10);
        const end = index * 10;
        this.props.paginateAction(start, end);
        this.setState(state => ({
            ...state,
            actualIndex: index,
        }));
    }

    render() {
        return (
            <Pagination>
                <Pagination.First disabled={this.state.actualIndex === 1} onClick={this.firstPage.bind(this)} />
                <Pagination.Prev disabled={this.state.actualIndex === 1} onClick={this.previousPage.bind(this)}/>

                <Pagination.Item active>{this.state.actualIndex}</Pagination.Item>

                <Pagination.Next onClick={this.nextPage.bind(this)}/>
            </Pagination>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    search: state.search.search
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...SearchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaginationLayout);