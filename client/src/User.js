/*
User displays the title, contents, and edit date of an user passed
down in its props.

props:
user: User to display
*/
/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserContainer = styled.div`
  margin: 40px;
`;

const UserTitle = styled.h3``;
const UserText = styled.div``;


// User PropType used repeatedly in application, export to DRY it up
export const UserShape = PropTypes.shape({
user_name: PropTypes.string,
zipcode: PropTypes.string,
best1: PropTypes.string,
best2: PropTypes.string,
best3: PropTypes.string,
best4: PropTypes.string,
best5: PropTypes.string,
best6: PropTypes.string,
best7: PropTypes.string,
best8: PropTypes.string,
best9: PropTypes.string,
best10: PropTypes.string,
});

const User = props => {
  // Example of "nested destructuring"
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  const {
user: { user_name, zipcode, best1, best2, best3, best4, best5, best6, best7, best8, best9, best10 }
  } = props;

  return (
    <UserContainer>
      <UserTitle>{user_name}</UserTitle>
      <UserText>{zipcode}{best1}{best2}{best3}{best4}{best5}{best6}{best7}{best8}{best9}{best10}</UserText>
      
    </UserContainer>
  );
};

User.propTypes = {
  user: UserShape.isRequired
};

export default User;