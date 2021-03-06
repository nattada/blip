/** @jsx React.DOM */
/**
 * Copyright (c) 2014, Tidepool Project
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 */

var React = window.React;
var _ = window._;

var PeopleList = React.createClass({
  propTypes: {
    people: React.PropTypes.array
  },

  render: function() {
    var peopleNodes = _.map(this.props.people, this.renderPeopleListItem);

    /* jshint ignore:start */
    return (
      <ul className="people-list list-group">
        {peopleNodes}
      </ul>
    );
    /* jshint ignore:end */
  },

  renderPeopleListItem: function(person, index) {
    var peopleListItemContent;
    var className = 'people-list-item list-group-item js-person';

    if (_.isEmpty(person)) {
      className = className + ' people-list-item-empty js-person-empty';
    }

    var fullName = this.getPersonFullName(person);
    /* jshint ignore:start */
    peopleListItemContent = (
      <div className="people-list-item-name">{fullName}</div>
    );
    /* jshint ignore:end */

    if (person.link) {
      className = className + ' people-list-item-with-link';
      /* jshint ignore:start */
      peopleListItemContent = (
        <a
          className="people-list-item-link list-group-item-link"
          href={person.link}>{peopleListItemContent}</a>
      );
      /* jshint ignore:end */
    }

    /* jshint ignore:start */
    return (
      <li key={person.id || index} className={className}>
        {peopleListItemContent}
      </li>
    );
    /* jshint ignore:end */
  },

  getPersonFullName: function(person) {
    if (_.isEmpty(person)) {
      return '';
    }
    return person.firstName + ' ' + person.lastName;
  }
});

module.exports = PeopleList;
