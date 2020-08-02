import React, { Component } from 'react';
import PropTypes from 'prop-types'; // or PropTypes = require('prop-types');
import classnames from 'classnames';
import Ionicon from 'react-ionicons';

import './Pagination.css';
class Pagination extends Component {
  constructor(props) {
    super(props);

    const { margin, page,totalRecords, pageSize } = props;
    const count = Math.ceil(totalRecords / pageSize);
    const startPage = page > margin ? page - margin : 1;
    const endPage = page + margin > count ? count : page + margin;
    this.state = {
      startPage,
      endPage,
      count,
    };


    this.onPageChange = this.onPageChange.bind(this);
    this.goFirstPage = this.goFirstPage.bind(this);
    this.goLastPage = this.goLastPage.bind(this);
    this.goPrevPage = this.goPrevPage.bind(this);
    this.goNextPage = this.goNextPage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log("newProps", newProps);
    if (newProps === this.props) return;
    const { margin, page, totalRecords, pageSize } = newProps;
    const count = Math.ceil(totalRecords / pageSize);
    console.log("count", count);
    const startPage = page > margin ? page - margin : 1;
    const endPage = page + margin > count ? count : page + margin;
    this.setState({ startPage, endPage, count });
  }

  onPageChange(event) {
    const index =
      Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
    this.props.onPageChange(index + this.state.startPage);
  }

  goFirstPage() {
    this.props.onPageChange(1);
  }

  goLastPage() {
    this.props.onPageChange(this.state.count);
  }

  goPrevPage() {
    this.props.onPageChange(this.props.page - 1);
  }

  goNextPage() {
    this.props.onPageChange(this.props.page + 1);
  }

  findPageRange = (currentPage) => {
    const { pageSize = 10 } = this.props;
    let startPage = ((currentPage - 1) * pageSize) + 1;
    let endPage = currentPage * pageSize;
    if (endPage > this.props.totalRecords) {
      let remainCounts = this.props.totalRecords % pageSize;
      endPage = ((currentPage - 1) * pageSize) + remainCounts;
    }
    let range = `${startPage}-${endPage}`
    return range;
  }

  render() {
    const { startPage, endPage, count } = this.state;
    console.log("count", count);
    const { page, margin } = this.props;
    const pages = [];
    const range = this.findPageRange(this.props.page);
    const firstPage = page - margin > 1 ?
      (
        <div
          className="pagination-button pagination-go-first"
          onClick={this.goFirstPage}
          role="presentation"
        >1
        </div>
      ) :
      null;

    const lastPage = page + margin < count ?
      (
        <div
          className="pagination-button pagination-go-last"
          onClick={this.goLastPage}
          role="presentation"
        >{count}
        </div>
      ) :
      null;

    const prevPage = page === 1 ? null :
      (
        <div
          className="pagination-button"
          onClick={this.goPrevPage}
          role="presentation"
        >
          <Ionicon icon="ios-arrow-back" fontSize="24px" color="#757575" />
        </div>
      );

    const nextPage = page === count ? null :
      (
        <div
          className="pagination-button"
          onClick={this.goNextPage}
          role="presentation"
        >
          <Ionicon icon="ios-arrow-forward" fontSize="24px" color="#757575" />
        </div>
      );

    if (endPage !== 1) {
      for (let i = startPage; i <= endPage; i++) {
        pages.push(<li
          key={i}
          onClick={this.onPageChange}
          role="presentation"
          className={classnames('pagination-list-item', 'pagination-button', {
            active: i === this.props.page,
          })}
        >
          {i}
        </li>);
      }
    }

    return (
      <div id="pagination-container">
        <div id="pagination">
          <div style={{ lineHeight: '30px' }}>
            <span className="showing-text">Showing</span>
            <span className="range">{' '}{range}</span>
          </div>
          {prevPage}
          {firstPage}
          <ul id="pagination-list">
            {pages}
          </ul>
          {lastPage}
          {nextPage}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  margin: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  // count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
};

export default Pagination;
