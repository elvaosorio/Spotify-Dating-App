/*Editor implements a form for creating a new user or editing an existinguser.
props:
user: The user to be edited [optional]
complete: A callback to add or save user
The complete callback should have one optional argument. Calling complete
with no arguments cancels the operation. Otherwise complete is invoked with
the user object to be added or updated.
*/
/* eslint-disable */

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { UserShape } from "./User";

const EditorContainer = styled.div`
    margin: 40px;
`;

/* eslint-disable no-unused-vars */
const Editor = ({ user, complete }) => {
  const [username, setUsername] = useState(user ? user.user_name : "");
  const [zipcode, setZipcode] = useState(user ? user.zipcode : "");
  const [best1, setbest1] = useState(user ? user.best1 : "");
  const [best2, setbest2] = useState(user ? user.best2 : "");
  const [best3, setbest3] = useState(user ? user.best3 : "");
  const [best4, setbest4] = useState(user ? user.best4 : "");
  const [best5, setbest5] = useState(user ? user.best5 : "");
  const [best6, setbest6] = useState(user ? user.best6 : "");
  const [best7, setbest7] = useState(user ? user.best7 : "");
  const [best8, setbest8] = useState(user ? user.best8 : "");
  const [best9, setbest9] = useState(user ? user.best9 : "");
  const [best10, setbest10] = useState(user ? user.best10 : "");
  /* eslint-disable no-unused-vars */
  const constructUser = () => ({
    user_name: username,
    zipcode: zipcode,
    best1: best1,
    best2: best2,
    best3: best3,
    best4: best4,
    best5: best5,
    best6: best6,
    best7: best7,
    best8: best8,
    best9: best9,
    best10: best10 //edited: new Date().toISOString()
  });

  return (
    <EditorContainer>
            <div>               </div>
          
    </EditorContainer>
  );
}; // type="button" // onClick={() => { //  complete(constructUser()); // }} //   value="Save" //   />
//<input
Editor.propTypes = {
  user: UserShape,
  complete: PropTypes.func.isRequired
};

Editor.defaultProps = {
  user: null
};

export default Editor;
