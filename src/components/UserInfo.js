import React from "react";
import styled from "styled-components";
const Avatar = styled.address`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  cursor: pointer;

  &::before {
    content: ${({ avatar, children }) =>
      avatar ? '""' : `"${children?.charAt(0)}"`};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    padding: 0.5rem;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.05);
    background-image: url(${({ avatar }) => avatar});
    background-size: cover;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
  }

`;

function UserInfo({ name, avatar }) {
  return <Avatar avatar={avatar}>{name}</Avatar>;
}

export default UserInfo;