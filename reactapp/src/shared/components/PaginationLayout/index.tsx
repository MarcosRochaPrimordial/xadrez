import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

export default class PaginationLayout extends Component<any> {
    render() {
        return (
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />

                <Pagination.Item active>{1}</Pagination.Item>

                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        );
    }
}